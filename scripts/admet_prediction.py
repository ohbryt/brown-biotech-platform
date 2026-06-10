#!/usr/bin/env python3
"""
Brown Biotech ADMET Prediction Pipeline
========================================

Reference repos (all on github.com/topics/admet-prediction):
  - abinittio/Insilico-Drug-Discovery-Toolkit   GNN-based ADMET classifier
  - alchemia-db/alchemia                        Molecular DB
  - sachith345/mpox-therapeutic-target-discovery CADD pipeline

This implementation uses RDKit descriptor + curated SMARTS-based rules.
Runs in <1s per molecule, no ML dependencies required.

Input
-----
CSV file with one of:
  - column named "smiles" / "SMILES" / "Smiles"  (case-insensitive)
  - first column otherwise (treated as SMILES)

Or a single-column CSV with SMILES per row.

Output (JSON to stdout)
----------------------
{
  "module": "admet",
  "status": "done",
  "molecules": [
    {
      "id": 1,
      "name": "aspirin",
      "smiles": "CC(=O)OC1=CC=CC=C1C(=O)O",
      "valid": true,
      "descriptors": { "mw": 180.16, "logp": 1.31, "hba": 4, "hbd": 1, "tpsa": 63.6, "rotb": 3, "arom_rings": 1 },
      "rules": {
        "lipinski_violations": 0,
        "lipinski_pass": true,
        "veber_pass": true,
        "egan_pass": true,
        "bbb_likely": true,
        "herg_alert": false,
        "pains_alert": false,
        "cyp3a4_alert": false
      },
      "admet_risk": "low" | "moderate" | "high"
    },
    ...
  ],
  "summary": "Analyzed N molecules: X% Lipinski-compliant, Y% BBB-likely, Z hERG alerts, W PAINS alerts.",
  "summary_metrics": { "n": N, "lipinski_pass_pct": X, "bbb_pct": Y, "herg_alerts": Z, "pains_alerts": W }
}
"""

import sys
import json
import csv
import warnings
warnings.filterwarnings("ignore")

OUTPUT_DIR = "/tmp/multiomics_results"

try:
    from rdkit import Chem
    from rdkit.Chem import AllChem, Descriptors, Lipinski, rdMolDescriptors
    from rdkit.Chem.FilterCatalog import FilterCatalog, FilterCatalogParams
    HAS_RDKIT = True
except ImportError:
    HAS_RDKIT = False


# ---------------------------------------------------------------------------
# SMARTS panels (curated — not exhaustive but covers common liabilities)
# ---------------------------------------------------------------------------

HERG_ALERTS = [
    # Basic tertiary amines with aromatic proximity (hERG channel blockers)
    "[NX3;H2,H1;!$(NC=O);!$(N=*);!$(N#*);!$(N-*=[O,S,N])]1[CX4][CX4][NH]1",
    # Aryl piperidines / piperazines
    "c1ccc2c(c1)NCCN2",
    "[#6]N1CCN([#6])CC1",
]

CYP3A4_ALERTS = [
    # 1,2,4-triazole
    "c1nnc[nH]1",
    # imidazole with aryl
    "c1cnc[nH]1",
    # Common CYP3A4-metabolized motifs
    "[#6]~[#6](~[#8])~[#8]",
    # Furan
    "c1ccoc1",
]

BBB_LIKELY = "TPSA <= 90 and MW <= 400 and logP in 1..4"  # Egan / Clark combined


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def smi_has_match(smarts_pattern: str, smi: str) -> bool:
    """Check if SMARTS pattern matches a SMILES. Returns False on parse error."""
    try:
        pat = Chem.MolFromSmarts(smarts_pattern)
        mol = Chem.MolFromSmiles(smi)
        if pat is None or mol is None:
            return False
        return mol.HasSubstructMatch(pat)
    except Exception:
        return False


def load_smiles_from_csv(filepath: str):
    """Return list of (id, name_or_idx, smiles) tuples from a CSV."""
    rows = []
    with open(filepath, "r", newline="", encoding="utf-8") as f:
        reader = csv.reader(f)
        header = next(reader, None)
        if header is None:
            return rows

        # Lowercase header
        header_lower = [h.strip().lower() for h in header]

        # Find SMILES column
        smi_col = None
        name_col = None
        for i, h in enumerate(header_lower):
            if h in ("smiles", "smile", "smi"):
                smi_col = i
            elif h in ("name", "compound", "drug", "id"):
                name_col = i
        if smi_col is None:
            # Default to first column
            smi_col = 0

        for row_idx, row in enumerate(reader):
            if not row or len(row) <= smi_col:
                continue
            smi = row[smi_col].strip()
            if not smi or smi.lower() in ("smiles", "name", ""):
                continue
            name = ""
            if name_col is not None and name_col < len(row):
                name = row[name_col].strip()
            if not name:
                name = f"mol_{row_idx + 1}"
            rows.append((row_idx + 1, name, smi))
    return rows


def compute_admet(name: str, smi: str, idx: int) -> dict:
    """Compute ADMET properties for one SMILES. Returns dict."""
    if not HAS_RDKIT:
        return {
            "id": idx, "name": name, "smiles": smi, "valid": False,
            "error": "RDKit not available",
        }

    mol = Chem.MolFromSmiles(smi)
    if mol is None:
        return {
            "id": idx, "name": name, "smiles": smi, "valid": False,
            "error": "RDKit could not parse SMILES",
        }

    # ---- Descriptors ----
    mw = Descriptors.MolWt(mol)
    logp = Descriptors.MolLogP(mol)
    hba = Lipinski.NumHAcceptors(mol)
    hbd = Lipinski.NumHDonors(mol)
    tpsa = rdMolDescriptors.CalcTPSA(mol)
    rotb = Lipinski.NumRotatableBonds(mol)
    arom_rings = Lipinski.NumAromaticRings(mol)
    heavy_atoms = mol.GetNumHeavyAtoms()
    rings = rdMolDescriptors.CalcNumRings(mol)

    # ---- Rules ----
    # Lipinski Ro5
    lipinski_violations = sum([
        mw > 500,
        logp > 5,
        hbd > 5,
        hba > 10,
    ])
    lipinski_pass = lipinski_violations <= 1

    # Veber (oral bioavailability)
    veber_pass = rotb <= 10 and tpsa <= 140

    # Egan (absorption)
    egan_pass = tpsa <= 131.6 and logp >= -1 and logp <= 5.88

    # BBB likely (Egan's BBB subset)
    bbb_likely = tpsa <= 90 and mw <= 400 and 1 <= logp <= 4

    # hERG alerts
    herg_alert = any(smi_has_match(pat, smi) for pat in HERG_ALERTS)

    # CYP3A4 alerts
    cyp3a4_alert = any(smi_has_match(pat, smi) for pat in CYP3A4_ALERTS)

    # PAINS — use RDKit's curated PAINS catalog (A/B/C sets)
    pains_alert = False
    try:
        params = FilterCatalogParams()
        params.AddCatalog(FilterCatalogParams.FilterCatalogs.PAINS)
        catalog = FilterCatalog.FilterCatalog(params)
        pains_alert = catalog.HasMatch(mol)
    except Exception:
        pass

    # ---- Composite ADMET risk (heuristic) ----
    risk_score = 0
    if not lipinski_pass:
        risk_score += 2
    if not veber_pass:
        risk_score += 1
    if not egan_pass:
        risk_score += 1
    if herg_alert:
        risk_score += 2
    if pains_alert:
        risk_score += 2
    if cyp3a4_alert:
        risk_score += 1
    if risk_score >= 4:
        risk = "high"
    elif risk_score >= 2:
        risk = "moderate"
    else:
        risk = "low"

    return {
        "id": idx,
        "name": name,
        "smiles": smi,
        "valid": True,
        "descriptors": {
            "mw": round(mw, 2),
            "logp": round(logp, 2),
            "hba": hba,
            "hbd": hbd,
            "tpsa": round(tpsa, 1),
            "rotb": rotb,
            "arom_rings": arom_rings,
            "heavy_atoms": heavy_atoms,
            "rings": rings,
        },
        "rules": {
            "lipinski_violations": lipinski_violations,
            "lipinski_pass": lipinski_pass,
            "veber_pass": veber_pass,
            "egan_pass": egan_pass,
            "bbb_likely": bbb_likely,
            "herg_alert": herg_alert,
            "pains_alert": pains_alert,
            "cyp3a4_alert": cyp3a4_alert,
        },
        "admet_risk": risk,
    }


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    if not HAS_RDKIT:
        print(json.dumps({"module": "admet", "status": "error",
                          "error": "RDKit not available on server."}))
        sys.exit(1)

    if len(sys.argv) < 2:
        print(json.dumps({"module": "admet", "status": "error",
                          "error": "Usage: admet_prediction.py <csv_file>"}))
        sys.exit(1)

    csv_path = sys.argv[1]
    try:
        rows = load_smiles_from_csv(csv_path)
    except Exception as e:
        print(json.dumps({"module": "admet", "status": "error",
                          "error": f"Failed to read CSV: {e}"}))
        sys.exit(1)

    if not rows:
        print(json.dumps({"module": "admet", "status": "error",
                          "error": "No SMILES found in CSV. Provide a column named 'smiles' or use the first column."}))
        sys.exit(1)

    # Cap to first 100 to keep response size sane
    rows = rows[:100]

    molecules = []
    valid_count = 0
    lipinski_pass = 0
    bbb_count = 0
    herg_alerts = 0
    pains_alerts = 0
    risk_dist = {"low": 0, "moderate": 0, "high": 0}

    for idx, name, smi in rows:
        result = compute_admet(name, smi, idx)
        molecules.append(result)
        if result.get("valid"):
            valid_count += 1
            rules = result.get("rules", {})
            if rules.get("lipinski_pass"):
                lipinski_pass += 1
            if rules.get("bbb_likely"):
                bbb_count += 1
            if rules.get("herg_alert"):
                herg_alerts += 1
            if rules.get("pains_alert"):
                pains_alerts += 1
            risk_dist[result.get("admet_risk", "low")] = risk_dist.get(result.get("admet_risk", "low"), 0) + 1

    n = valid_count
    summary_metrics = {
        "n": n,
        "lipinski_pass_pct": round(100 * lipinski_pass / n, 1) if n else 0,
        "bbb_pct": round(100 * bbb_count / n, 1) if n else 0,
        "herg_alerts": herg_alerts,
        "pains_alerts": pains_alerts,
        "risk_distribution": risk_dist,
    }
    summary = (
        f"Analyzed {n} valid molecules from {len(rows)} rows. "
        f"Lipinski-compliant: {summary_metrics['lipinski_pass_pct']}%. "
        f"BBB-likely: {summary_metrics['bbb_pct']}%. "
        f"hERG alerts: {herg_alerts}. PAINS alerts: {pains_alerts}. "
        f"Risk distribution: {risk_dist}."
    )

    print(json.dumps({
        "module": "admet",
        "status": "done",
        "molecules": molecules,
        "summary": summary,
        "summary_metrics": summary_metrics,
    }, ensure_ascii=False))


if __name__ == "__main__":
    main()
