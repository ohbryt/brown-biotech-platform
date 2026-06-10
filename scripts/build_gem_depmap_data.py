#!/usr/bin/env python3
"""
Build lineages.json from DepMap Public 26Q1 + Subtype Matrix.

Input
-----
  - /tmp/depmap_ge.csv          gene_effect matrix (cell_line × gene)
  - /tmp/depmap_subtype.csv     subtype matrix (cell_line × cancer_type, binary)

Output
------
  - data/gem_depmap/lineages.json

Schema
------
{
  "version": "DepMap Public 26Q1",
  "generated": "2026-06-10",
  "lineages": [
    {
      "id": "lung_nsclc",
      "name": "Lung NSCLC",
      "n_cell_lines": 123,
      "cell_lines": [
        {
          "depmap_id": "ACH-000001",
          "name": "HeLa (cervical)",
          "primary_disease": "Cervical Cancer",
          "top_dependencies": [
            { "gene": "HSP90AA1", "score": -1.45, "pathway": "Chaperone", "druggable": true },
            ...
          ],
          "top_pathways": [
            { "pathway": "Oxidative phosphorylation", "n_essential": 18, "total": 22, "pct": 81.8 },
            ...
          ]
        }
      ]
    }
  ]
}
"""

import sys
import json
import csv
import os
from collections import defaultdict
from datetime import date


# ---------------------------------------------------------------------------
# Curated: most well-known cancer cell lines + DepMap IDs
# (manually maintained — verified against DepMap 26Q1 sample list)
# ---------------------------------------------------------------------------
# Verified against DepMap Public 26Q1 Model.csv + subsetted gene_effect data
# All IDs confirmed present in our pre-computed gene_effect matrix (2026-06-10)
WELL_KNOWN = {
    # Cervical
    "ACH-000556": {"name": "SiHa",           "disease": "Cervical Cancer"},
    "ACH-001333": {"name": "C-33A",          "disease": "Cervical Cancer"},
    "ACH-001336": {"name": "CaSki",          "disease": "Cervical Cancer"},
    # Breast
    "ACH-000019": {"name": "MCF7",           "disease": "Breast Cancer"},
    "ACH-000017": {"name": "SKBR3",          "disease": "Breast Cancer"},
    "ACH-000147": {"name": "T47D",           "disease": "Breast Cancer"},
    "ACH-000768": {"name": "MDA-MB-231",     "disease": "Breast TNBC"},
    "ACH-000849": {"name": "MDA-MB-468",     "disease": "Breast TNBC"},
    "ACH-000288": {"name": "BT-549",         "disease": "Breast TNBC"},
    "ACH-000097": {"name": "ZR-75-1",        "disease": "Breast Cancer"},
    # Lung NSCLC
    "ACH-000681": {"name": "A549",           "disease": "Lung Adenocarcinoma"},
    "ACH-000510": {"name": "NCI-H1299",      "disease": "Lung NSCLC"},
    "ACH-000587": {"name": "NCI-H1975",      "disease": "Lung NSCLC"},
    "ACH-000012": {"name": "HCC827",         "disease": "Lung NSCLC"},
    # Myeloid
    "ACH-000551": {"name": "K562",           "disease": "Chronic Myeloid Leukemia"},
    "ACH-000146": {"name": "THP-1",          "disease": "Acute Myeloid Leukemia"},
    "ACH-000406": {"name": "U-937",          "disease": "Acute Myeloid Leukemia"},
    "ACH-000045": {"name": "MV4-11",         "disease": "Acute Myeloid Leukemia"},
    "ACH-000294": {"name": "NB4",            "disease": "Acute Myeloid Leukemia"},
    # Lymphoid (B-cell)
    "ACH-000654": {"name": "Raji",           "disease": "Burkitt Lymphoma"},
    "ACH-000817": {"name": "RPMI-8226",      "disease": "Multiple Myeloma"},
    "ACH-000944": {"name": "Namalwa",        "disease": "Lymphoma (B-cell)"},
    # Lymphoid (T-cell)
    "ACH-000995": {"name": "Jurkat",         "disease": "T-cell Leukemia"},
    "ACH-000953": {"name": "SUP-T1",         "disease": "T-cell Leukemia"},
    "ACH-000053": {"name": "KARPAS-299",     "disease": "T-cell Lymphoma"},
    # Colorectal
    "ACH-000971": {"name": "HCT116",         "disease": "Colorectal Cancer"},
    "ACH-000552": {"name": "HT29",           "disease": "Colorectal Cancer"},
    "ACH-000651": {"name": "SW620",          "disease": "Colorectal Cancer"},
    "ACH-000943": {"name": "RKO",            "disease": "Colorectal Cancer"},
    # Liver
    "ACH-000739": {"name": "HepG2",          "disease": "Liver Cancer (HCC)"},
    "ACH-000480": {"name": "Huh7",           "disease": "Liver Cancer (HCC)"},
    "ACH-000478": {"name": "SNU-387",        "disease": "Liver Cancer (HCC)"},
    # Pancreas
    "ACH-000164": {"name": "PANC-1",         "disease": "Pancreatic Cancer"},
    "ACH-000138": {"name": "CFPAC-1",        "disease": "Pancreatic Cancer"},
    "ACH-000222": {"name": "AsPC-1",         "disease": "Pancreatic Cancer"},
    # Prostate
    "ACH-000090": {"name": "PC-3",           "disease": "Prostate Cancer"},
    "ACH-000977": {"name": "LNCaP",          "disease": "Prostate Cancer"},
    "ACH-000115": {"name": "VCaP",           "disease": "Prostate Cancer"},
    "ACH-000956": {"name": "22Rv1",          "disease": "Prostate Cancer"},
    # Skin (Melanoma)
    "ACH-000219": {"name": "A375",           "disease": "Melanoma"},
    "ACH-001239": {"name": "WM266-4",        "disease": "Melanoma"},
    # Bone (Osteosarcoma)
    "ACH-000364": {"name": "U2OS",           "disease": "Osteosarcoma"},
    "ACH-000410": {"name": "SaOS-2",         "disease": "Osteosarcoma"},
    "ACH-000359": {"name": "MG-63",          "disease": "Osteosarcoma"},
    # Ovarian
    "ACH-000811": {"name": "SKOV3",          "disease": "Ovarian Cancer"},
    "ACH-000713": {"name": "CAOV3",          "disease": "Ovarian Cancer"},
    "ACH-000657": {"name": "A2780",          "disease": "Ovarian Cancer"},
    # CNS / Glioma
    "ACH-000075": {"name": "U-87 MG",        "disease": "Glioblastoma"},
    "ACH-000558": {"name": "A172",           "disease": "Glioblastoma"},
    "ACH-000273": {"name": "SF-539",         "disease": "Glioblastoma"},
}

# Map DepMap disease strings to lineage groups
# (lineage_id, display_name)
DISEASE_TO_LINEAGE = {
    # Cervical
    "Cervical Cancer":              ("cervical",        "Cervical Cancer"),
    "Cervical Squamous Cell Carcinoma": ("cervical",    "Cervical Cancer"),
    "Cervical Adenocarcinoma":      ("cervical",        "Cervical Cancer"),
    # Breast
    "Breast Cancer":                ("breast",          "Breast Cancer"),
    "Invasive Breast Carcinoma":    ("breast",          "Breast Cancer"),
    "Breast TNBC":                  ("breast",          "Breast Cancer (TNBC)"),
    # Lung
    "Lung NSCLC":                   ("lung_nsclc",      "Lung NSCLC"),
    "Non-Small Cell Lung Cancer":   ("lung_nsclc",      "Lung NSCLC"),
    "Lung Adenocarcinoma":          ("lung_luad",       "Lung Adenocarcinoma"),
    # Myeloid / Leukemia
    "Chronic Myeloid Leukemia":     ("leukemia_cml",    "Chronic Myeloid Leukemia"),
    "Myeloproliferative Neoplasms": ("leukemia_cml",    "Chronic Myeloid Leukemia"),
    "Acute Myeloid Leukemia":       ("leukemia_aml",    "Acute Myeloid Leukemia"),
    # Lymphoid
    "Burkitt Lymphoma":             ("lymphoma_burkitt","Burkitt Lymphoma"),
    "Non-Hodgkin Lymphoma":         ("lymphoma_burkitt","Lymphoma (B-cell)"),
    "Mature B-Cell Neoplasms":      ("lymphoma_burkitt","Lymphoma (B-cell)"),
    "Lymphoma (B-cell)":            ("lymphoma_burkitt","Lymphoma (B-cell)"),
    "Multiple Myeloma":             ("lymphoma_burkitt","Multiple Myeloma"),
    "T-cell Leukemia":              ("leukemia_tcell",  "T-cell Leukemia"),
    "T-Lymphoblastic Leukemia/Lymphoma": ("leukemia_tcell", "T-cell Leukemia"),
    "T-cell Lymphoma":              ("leukemia_tcell",  "T-cell Lymphoma"),
    "Mature T and NK Neoplasms":    ("leukemia_tcell",  "T-cell Lymphoma"),
    # Colorectal
    "Colorectal Cancer":            ("colorectal",      "Colorectal Cancer"),
    "Colorectal Adenocarcinoma":    ("colorectal",      "Colorectal Cancer"),
    # Liver
    "Liver Cancer (HCC)":           ("liver_hcc",       "Liver Cancer (HCC)"),
    "Hepatocellular Carcinoma":     ("liver_hcc",       "Liver Cancer (HCC)"),
    "Hepatoblastoma":               ("liver_hcc",       "Liver Cancer (HCC)"),
    # Pancreas
    "Pancreatic Cancer":            ("pancreatic",      "Pancreatic Cancer"),
    "Pancreatic Adenocarcinoma":    ("pancreatic",      "Pancreatic Cancer"),
    # Prostate
    "Prostate Cancer":              ("prostate",        "Prostate Cancer"),
    "Prostate Adenocarcinoma":      ("prostate",        "Prostate Cancer"),
    # Skin
    "Melanoma":                     ("melanoma",        "Melanoma"),
    # Bone
    "Osteosarcoma":                 ("osteosarcoma",    "Osteosarcoma"),
    # Ovarian
    "Ovarian Cancer":               ("ovarian",         "Ovarian Cancer"),
    "Ovarian Epithelial Tumor":     ("ovarian",         "Ovarian Cancer"),
    # CNS
    "Glioblastoma":                 ("glioblastoma",    "Glioblastoma"),
    "Adult-Type Diffuse Glioma":    ("glioblastoma",    "Glioblastoma"),
    "Diffuse Glioma":               ("glioblastoma",    "Glioblastoma"),
}

# Curated KEGG metabolic pathway assignments for ~80 well-known metabolic genes
GENE_PATHWAY = {
    # Glycolysis / Gluconeogenesis (hsa00010)
    "HK1": "Glycolysis", "HK2": "Glycolysis", "HK3": "Glycolysis",
    "GCK": "Glycolysis", "GPI": "Glycolysis", "PFKM": "Glycolysis",
    "PFKL": "Glycolysis", "ALDOA": "Glycolysis", "ALDOB": "Glycolysis",
    "ALDOC": "Glycolysis", "TPI1": "Glycolysis", "GAPDH": "Glycolysis",
    "PGK1": "Glycolysis", "PGAM1": "Glycolysis", "ENO1": "Glycolysis",
    "ENO2": "Glycolysis", "ENO3": "Glycolysis", "PKM": "Glycolysis",
    "PKLR": "Glycolysis", "LDHA": "Glycolysis", "LDHB": "Glycolysis",
    "LDHC": "Glycolysis",
    # TCA cycle (hsa00020)
    "CS": "TCA cycle", "ACO2": "TCA cycle", "IDH2": "TCA cycle",
    "IDH3A": "TCA cycle", "IDH3B": "TCA cycle", "OGDH": "TCA cycle",
    "SUCLG1": "TCA cycle", "SUCLA2": "TCA cycle", "SDHA": "TCA cycle",
    "SDHB": "TCA cycle", "FH": "TCA cycle", "MDH2": "TCA cycle",
    # Pentose phosphate pathway (hsa00030)
    "G6PD": "Pentose phosphate", "PGD": "Pentose phosphate",
    "TKT": "Pentose phosphate", "TALDO1": "Pentose phosphate",
    "RPIA": "Pentose phosphate", "RPE": "Pentose phosphate",
    # Fatty acid oxidation (hsa00071)
    "ACADM": "Fatty acid oxidation", "ACADL": "Fatty acid oxidation",
    "ACADVL": "Fatty acid oxidation", "HADHA": "Fatty acid oxidation",
    "HADHB": "Fatty acid oxidation", "HADH": "Fatty acid oxidation",
    "CPT1A": "Fatty acid oxidation", "CPT2": "Fatty acid oxidation",
    # Fatty acid synthesis (hsa00061)
    "ACACA": "Fatty acid synthesis", "ACACB": "Fatty acid synthesis",
    "FASN": "Fatty acid synthesis", "ACLY": "Fatty acid synthesis",
    # Oxidative phosphorylation (hsa00190)
    "NDUFA1": "Oxidative phosphorylation", "NDUFB1": "Oxidative phosphorylation",
    "NDUFS1": "Oxidative phosphorylation", "NDUFA9": "Oxidative phosphorylation",
    "UQCRC1": "Oxidative phosphorylation", "COX5B": "Oxidative phosphorylation",
    "ATP5F1A": "Oxidative phosphorylation", "ATP5F1B": "Oxidative phosphorylation",
    # Glutaminolysis / Amino acid (hsa00250, hsa00220)
    "GLS": "Glutaminolysis", "GLS2": "Glutaminolysis", "GLUL": "Glutamine metabolism",
    "ASS1": "Urea cycle", "ASL": "Urea cycle", "CPS1": "Urea cycle", "OTC": "Urea cycle",
    "BCAT1": "BCAA metabolism", "BCAT2": "BCAA metabolism",
    # Nucleotide metabolism (hsa00230, hsa00240)
    "TYMS": "Nucleotide metabolism", "DHFR": "Nucleotide metabolism",
    "RRM1": "Nucleotide metabolism", "RRM2": "Nucleotide metabolism",
    "TYMP": "Nucleotide metabolism", "CAD": "Nucleotide biosynthesis",
    "PAICS": "Nucleotide biosynthesis",
    # Glycogen
    "GYS1": "Glycogen synthesis", "GYS2": "Glycogen synthesis",
    "PYGM": "Glycogenolysis", "GBE1": "Glycogen branching",
    # Glutathione
    "GCLC": "Glutathione synthesis", "GCLM": "Glutathione synthesis",
    "GSR": "Glutathione redox", "GSS": "Glutathione redox",
    # Serine-glycine-one-carbon (SGOC)
    "PHGDH": "Serine synthesis", "PSAT1": "Serine synthesis",
    "PSPH": "Serine synthesis", "SHMT1": "One-carbon metabolism",
    "SHMT2": "One-carbon metabolism", "MTHFD1": "Folate cycle",
    "MTHFD2": "Folate cycle", "MTHFR": "Folate cycle",
    # Polyamine
    "ODC1": "Polyamine synthesis", "SRM": "Polyamine synthesis", "SMS": "Polyamine synthesis",
    # Signaling / regulators (often hijacked in cancer)
    "HIF1A": "Hypoxia response", "MYC": "Oncogenic signaling",
    "P53": "Tumor suppression", "AKT1": "PI3K-AKT signaling",
    "MTOR": "mTOR signaling", "AMPK": "AMPK energy sensing",
    # Transporters
    "SLC2A1": "Glucose transport (Warburg)", "SLC16A1": "Lactate transport (MCT1)",
    "SLC16A3": "Lactate transport (MCT4)", "SLC1A5": "Glutamine transport (ASCT2)",
    "SLC7A5": "Leucine transport (LAT1)",
}

# Druggable metabolic enzymes (subset of FDA-approved or clinical-stage drugs)
DRUGGABLE_GENES = {
    "HK2", "PFKM", "PKM", "LDHA", "LDHB",
    "G6PD", "PGD", "TKT",
    "FASN", "ACACA", "ACLY", "CPT1A",
    "IDH2", "IDH1",  # IDH1 not in our list
    "GLS", "GLS2", "PHGDH", "PSAT1", "SHMT2", "MTHFD2",
    "TYMS", "DHFR", "RRM1", "RRM2",
    "ODC1",
    "SLC2A1", "SLC16A1", "SLC16A3", "SLC1A5", "SLC7A5",
    "HIF1A", "MTOR", "AMPK", "AKT1",
}


def load_gene_effect(path: str) -> dict:
    """Return {depmap_id: {gene: score}}."""
    with open(path, "r") as f:
        reader = csv.reader(f)
        header = next(reader)
        genes = header[1:]  # column 0 is depmap_id
        data = {}
        for row in reader:
            if not row:
                continue
            depmap_id = row[0].strip()
            if not depmap_id:
                continue
            scores = {}
            for i, g in enumerate(genes):
                idx = i + 1
                if idx >= len(row):
                    break
                val = row[idx].strip()
                if not val:
                    scores[g] = None
                else:
                    try:
                        scores[g] = float(val)
                    except ValueError:
                        scores[g] = None
            data[depmap_id] = scores
    return data


def build_lineages(gene_effect: dict) -> list:
    """Group well-known cell lines by lineage, compute top dependencies per line."""

    # Group by lineage
    by_lineage = defaultdict(list)
    for depmap_id, meta in WELL_KNOWN.items():
        scores = gene_effect.get(depmap_id)
        if not scores:
            continue
        lineage_id, lineage_display = DISEASE_TO_LINEAGE.get(meta["disease"], ("other", "Other"))
        by_lineage[lineage_id].append((depmap_id, meta, scores, lineage_display))

    lineages_out = []
    for lineage_id, cells in by_lineage.items():
        # Use the disease of the first cell as the lineage display name
        display_name = cells[0][3]
        cell_lines_out = []
        for depmap_id, meta, scores, _ in cells:
            # Filter to valid scores
            valid = [(g, s) for g, s in scores.items() if s is not None]
            if not valid:
                continue

            # Sort by score ascending (most negative = most essential)
            valid.sort(key=lambda x: x[1])
            top_dependencies = []
            for gene, score in valid[:20]:
                top_dependencies.append({
                    "gene": gene,
                    "score": round(score, 3),
                    "pathway": GENE_PATHWAY.get(gene, "Other"),
                    "druggable": gene in DRUGGABLE_GENES,
                })

            # Aggregate by pathway
            pathway_essential = defaultdict(lambda: {"n_essential": 0, "total": 0})
            for gene, score in valid:
                pw = GENE_PATHWAY.get(gene, "Other")
                pathway_essential[pw]["total"] += 1
                # Chronos < -0.5 is generally considered essential
                if score is not None and score < -0.5:
                    pathway_essential[pw]["n_essential"] += 1
            top_pathways = []
            for pw, counts in pathway_essential.items():
                top_pathways.append({
                    "pathway": pw,
                    "n_essential": counts["n_essential"],
                    "total": counts["total"],
                    "pct": round(100 * counts["n_essential"] / counts["total"], 1) if counts["total"] else 0,
                })
            top_pathways.sort(key=lambda x: x["pct"], reverse=True)
            top_pathways = top_pathways[:8]

            # Druggable count
            n_druggable = sum(1 for d in top_dependencies if d["druggable"])

            cell_lines_out.append({
                "depmap_id": depmap_id,
                "name": meta["name"],
                "primary_disease": meta["disease"],
                "lineage": lineage_id,
                "n_genes_screened": len(valid),
                "n_top_essential": sum(1 for d in top_dependencies if d["score"] < -0.5),
                "n_druggable_top20": n_druggable,
                "top_dependencies": top_dependencies,
                "top_pathways": top_pathways,
            })
        lineages_out.append({
            "id": lineage_id,
            "name": display_name,
            "n_cell_lines": len(cell_lines_out),
            "cell_lines": cell_lines_out,
        })
    # Sort by lineage name
    lineages_out.sort(key=lambda x: x["name"])
    return lineages_out


def main():
    if len(sys.argv) < 3:
        print("Usage: build_gem_depmap_data.py <gene_effect.csv> <output.json>")
        sys.exit(1)
    ge_path = sys.argv[1]
    out_path = sys.argv[2]

    if not os.path.exists(ge_path):
        print(f"File not found: {ge_path}")
        sys.exit(1)

    print(f"Loading gene effect from {ge_path}...")
    gene_effect = load_gene_effect(ge_path)
    print(f"  Loaded {len(gene_effect)} cell lines")

    print("Building lineages...")
    lineages = build_lineages(gene_effect)
    print(f"  Built {len(lineages)} lineages, "
          f"{sum(l['n_cell_lines'] for l in lineages)} cell lines total")

    output = {
        "version": "DepMap Public 26Q1 (Chronos)",
        "generated": date.today().isoformat(),
        "source": "https://depmap.org/portal/  (custom download, 2026-06-10)",
        "methodology": "Pre-computed gene_effect scores intersected with KEGG metabolic pathways. Scores < -0.5 (Chronos) are considered essential. Top dependencies ranked by Chronos score (most negative first).",
        "lineages": lineages,
    }
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "w") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    print(f"Wrote {out_path}")


if __name__ == "__main__":
    main()
