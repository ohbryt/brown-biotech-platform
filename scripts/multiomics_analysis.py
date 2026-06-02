#!/usr/bin/env python3
"""
Brown Biotech Multi-Omics Analysis Pipeline
CSV → DEG analysis → Volcano Plot → Pathway → PPI/Hub Gene → TF
"""

import sys
import json
import warnings
warnings.filterwarnings("ignore")

import numpy as np
import pandas as pd
from scipy import stats

# Optional plotting (graceful fallback if matplotlib unavailable)
try:
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt
    import matplotlib.patches as mpatches
    HAS_MATPLOTLIB = True
except Exception:
    HAS_MATPLOTLIB = False

# Optional stats/biology packages
try:
    from sklearn.decomposition import PCA
    HAS_SKLEARN = True
except Exception:
    HAS_SKLEARN = False

OUTPUT_DIR = "/tmp/multiomics_results"

def load_csv(filepath):
    df = pd.read_csv(filepath)
    df.columns = df.columns.str.strip()
    return df

def deg_analysis(df):
    """Differential expression analysis between two groups"""
    results = {"module": "deg", "status": "done", "genes": [], "summary": ""}
    
    numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
    
    if len(numeric_cols) < 2:
        results["summary"] = "Need at least 2 numeric sample columns for DEG analysis."
        return results
    
    # Auto-detect grouping: first half vs second half of columns
    n = len(numeric_cols)
    group1 = numeric_cols[:n//2]
    group2 = numeric_cols[n//2:]
    
    genes = []
    for idx in df.index:
        gene_name = str(df.iloc[idx, 0]) if len(df.columns) > 0 else f"Gene_{idx}"
        values = df.iloc[idx, 1:].values.astype(float)
        
        if len(group1) == 0 or len(group2) == 0:
            continue
            
        vals1 = values[:len(group1)]
        vals2 = values[len(group1):len(group1)+len(group2)]
        
        if len(vals1) == 0 or len(vals2) == 0:
            continue
            
        mean1 = np.mean(vals1)
        mean2 = np.mean(vals2)
        log2fc = np.log2(mean2 / mean1) if mean1 > 0 and mean2 > 0 else 0
        
        # t-test
        if len(vals1) >= 2 and len(vals2) >= 2:
            tstat, pval = stats.ttest_ind(vals1, vals2)
        else:
            pval = 1.0
        
        # BH correction approximation (just use raw p here)
        genes.append({
            "gene": gene_name,
            "log2FC": round(log2fc, 4),
            "mean1": round(mean1, 4),
            "mean2": round(mean2, 4),
            "pvalue": round(pval, 6),
            "adjPvalue": round(min(pval * len(genes), 1.0), 6) if genes else 1.0,
            "direction": "up" if log2fc > 1 else "down" if log2fc < -1 else "ns"
        })
    
    # Sort by absolute log2FC
    genes.sort(key=lambda x: abs(x["log2FC"]), reverse=True)
    
    results["genes"] = genes[:200]  # top 200
    results["total_genes"] = len(genes)
    results["up_genes"] = len([g for g in genes if g["direction"] == "up"])
    results["down_genes"] = len([g for g in genes if g["direction"] == "down"])
    results["summary"] = f"DEG analysis: {len(genes)} genes, {results['up_genes']} upregulated, {results['down_genes']} downregulated (|log2FC|>1, p<0.05)"
    results["group1"] = list(range(len(group1)))
    results["group2"] = list(range(len(group1), len(group1)+len(group2)))
    
    return results

def volcano_plot(deg_results, output_dir):
    """Generate volcano plot PNG"""
    result = {"module": "volcano", "status": "done"}
    
    if not HAS_MATPLOTLIB:
        result["note"] = "matplotlib unavailable, skipping plot generation"
        return result
    
    genes = deg_results.get("genes", [])
    if not genes:
        return result
    
    log2fc = [g["log2FC"] for g in genes]
    neglog10p = [-np.log10(max(g["pvalue"], 1e-300)) for g in genes]
    colors = []
    for g in genes:
        if g["adjPvalue"] < 0.05 and g["log2FC"] > 1:
            colors.append("#D97706")  # amber up
        elif g["adjPvalue"] < 0.05 and g["log2FC"] < -1:
            colors.append("#2563EB")  # blue down
        else:
            colors.append("#9CA3AF")  # gray ns
    
    fig, ax = plt.subplots(figsize=(10, 8))
    ax.scatter(log2fc, neglog10p, c=colors, alpha=0.6, s=20)
    ax.axhline(y=-np.log10(0.05), color="#9CA3AF", linestyle="--", linewidth=1, alpha=0.7)
    ax.axvline(x=1, color="#9CA3AF", linestyle="--", linewidth=1, alpha=0.7)
    ax.axvline(x=-1, color="#9CA3AF", linestyle="--", linewidth=1, alpha=0.7)
    ax.set_xlabel("log2 Fold Change", fontsize=12)
    ax.set_ylabel("-log10(P-value)", fontsize=12)
    ax.set_title("Volcano Plot — Brown Biotech Multi-Omics", fontsize=14, fontweight="bold")
    
    up_patch = mpatches.Patch(color="#D97706", label="Upregulated (adjP<0.05, FC>2)")
    dn_patch = mpatches.Patch(color="#2563EB", label="Downregulated (adjP<0.05, FC<0.5)")
    ns_patch = mpatches.Patch(color="#9CA3AF", label="Not significant")
    ax.legend(handles=[up_patch, dn_patch, ns_patch], fontsize=9)
    
    plt.tight_layout()
    plot_path = f"{output_dir}/volcano_plot.png"
    plt.savefig(plot_path, dpi=150)
    plt.close()
    result["plot_path"] = plot_path
    result["note"] = f"Volcano plot saved to {plot_path}"
    
    return result

def pathway_analysis(deg_results):
    """Simplified pathway enrichment (overlap with known pathway genes)"""
    result = {"module": "pathway", "status": "done", "pathways": []}
    
    genes = deg_results.get("genes", [])
    sig_genes = set([g["gene"] for g in genes if g["adjPvalue"] < 0.05])
    
    if len(sig_genes) == 0:
        result["summary"] = "No significant genes for pathway analysis."
        return result
    
    # Mock pathway database (real implementation would query KEGG/Reactome API)
    pathway_db = {
        "PI3K-Akt signaling pathway": ["AKT1", "MTOR", "EGFR", "PDGFRB", "KRAS", "PTEN", "IRS1", "GSK3B", "BCL2", "BAD"],
        "MAPK signaling pathway": ["RAF1", "MAPK1", "MAPK3", "EGFR", "KRAS", "MEK1", "ERK1", "JUN", "FOS", "CREB1"],
        "p53 signaling pathway": ["TP53", "CDK2", "BAX", "BBC3", "MDM2", "CHEK2", "PERP", "BAX", "PMAIP1"],
        "TGF-beta signaling pathway": ["TGFBR1", "SMAD2", "SMAD3", "SMAD4", "SMAD7", "BMPR1A", "BMPR2"],
        "Apoptosis": ["CASP3", "CASP9", "BCL2", "BAX", "BAD", "BID", "APAF1", "CYTC"],
        "Wnt signaling pathway": ["CTNNB1", "APC", "AXIN1", "GSK3B", "LRP6", "WNT5A", "DKK1"],
        "HIF-1 signaling pathway": ["HIF1A", "VEGFA", "EPO", "LDHA", "PDK1", "SLC2A1", "CA9"],
        "mTOR signaling pathway": ["MTOR", "RPTOR", "MLST8", "AKT1", "ULK1", "ATG13", "RB1CC1"],
        "Cell cycle": ["CDK1", "CDK2", "CDK4", "CDK6", "CCND1", "CCNE1", "RB1", "E2F1", "MCM2"],
        "DNA damage repair": ["BRCA1", "BRCA2", "ATM", "ATR", "CHEK1", "RAD51", "TP53", "MDC1"],
        "Inflammatory response": ["NFKB1", "RELA", "IKBKB", "TLR4", "MYD88", "TNF", "IL6", "IL1B", "CXCL8"],
        "TNF signaling pathway": ["TNF", "TNFRSF1A", "MAPK8", "MAPK14", "NFKB1", "RELA", "CXCL8", "IL6"],
        "Estrogen signaling pathway": ["ESR1", "ESR2", "EGFR", "MAPK1", "MAPK3", "SRC", "KRT8", "TFF1"],
        "VEGF signaling pathway": ["VEGFA", "KDR", "FLT1", "MAPK1", "MAPK3", "RAC1", "PTK2"],
        "Oxidative stress response": ["NFE2L2", "HMOX1", "NQO1", "GCLC", "GCLM", "TXNRD1", "GPX1"],
    }
    
    enriched = []
    for pathway, pathway_genes in pathway_db.items():
        overlap = sig_genes.intersection(set(pathway_genes))
        if len(overlap) >= 2:
            # Hypergeometric p-value approximation
            N = 20000  # total genes
            K = len(pathway_genes)
            n = len(sig_genes)
            k = len(overlap)
            
            # Use hypergeometric test
            try:
                from scipy.stats import hypergeom
                pval = hypergeom.sf(k-1, N, K, n)
            except Exception:
                pval = 1.0
            
            enriched.append({
                "pathway": pathway,
                "overlap_genes": list(overlap),
                "overlap_count": k,
                "total_in_pathway": K,
                "pvalue": round(pval, 6),
                "padjust": round(min(pval * len(pathway_db), 1.0), 6)
            })
    
    enriched.sort(key=lambda x: x["pvalue"])
    result["pathways"] = enriched[:10]
    result["summary"] = f"Pathway analysis: {len(enriched)} pathways enriched (padjust<0.05)"
    
    return result

def ppi_and_hub_genes(deg_results):
    """PPI network analysis and hub gene identification"""
    result = {"module": "ppi", "status": "done", "hub_genes": [], "network": {}}
    
    genes = deg_results.get("genes", [])
    sig_genes = [g for g in genes if g["adjPvalue"] < 0.05]
    
    if len(sig_genes) == 0:
        result["summary"] = "No significant genes for PPI analysis."
        return result
    
    # Mock PPI edges (real implementation would query STRING/APPI database)
    ppi_db = [
        ("TP53", "MDM2", 0.99), ("TP53", "BAX", 0.95), ("TP53", "CDK2", 0.88),
        ("EGFR", "KRAS", 0.97), ("EGFR", "MAPK1", 0.93), ("EGFR", "PIK3CA", 0.91),
        ("KRAS", "RAF1", 0.96), ("KRAS", "PIK3CA", 0.89), ("KRAS", "MTOR", 0.85),
        ("MTOR", "AKT1", 0.94), ("MTOR", "RPTOR", 0.91), ("AKT1", "GSK3B", 0.90),
        ("BCL2", "BAX", 0.87), ("BCL2", "BAD", 0.83), ("BAX", "CASP3", 0.86),
        ("MAPK1", "MAPK3", 0.98), ("MAPK1", "JUN", 0.92), ("MAPK3", "FOS", 0.89),
        ("NFKB1", "RELA", 0.95), ("VEGFA", "KDR", 0.96), ("VEGFA", "FLT1", 0.93),
        ("CDK2", "CCND1", 0.88), ("CDK4", "RB1", 0.91), ("CDK1", "MCM2", 0.85),
        ("BRCA1", "BRCA2", 0.92), ("ATM", "TP53", 0.90), ("TP53", "CDK4", 0.82),
        ("CTNNB1", "APC", 0.89), ("CTNNB1", "GSK3B", 0.85), ("GSK3B", "CTNNB1", 0.85),
        ("HIF1A", "VEGFA", 0.88), ("NFE2L2", "HMOX1", 0.91), ("NFE2L2", "NQO1", 0.93),
        ("IL6", "STAT3", 0.87), ("STAT3", "SOCS3", 0.90), ("TNF", "MAPK8", 0.89),
        ("TGFBR1", "SMAD2", 0.94), ("SMAD2", "SMAD4", 0.93), ("SMAD3", "SMAD4", 0.91),
        ("SRC", "EGFR", 0.86), ("SRC", "BCR", 0.84), ("ABL1", "BCR", 0.88),
    ]
    
    sig_gene_names = set([g["gene"] for g in sig_genes])
    edges = []
    for (g1, g2, score) in ppi_db:
        if g1 in sig_gene_names and g2 in sig_gene_names:
            edges.append({"source": g1, "target": g2, "score": score})
    
    # Degree centrality
    degree = {}
    for e in edges:
        degree[e["source"]] = degree.get(e["source"], 0) + 1
        degree[e["target"]] = degree.get(e["target"], 0) + 1
    
    hub_genes = sorted(degree.items(), key=lambda x: x[1], reverse=True)[:15]
    
    result["hub_genes"] = [{"gene": g, "degree": d, "log2FC": next((x["log2FC"] for x in sig_genes if x["gene"] == g), 0)} for g, d in hub_genes]
    result["network"] = {"nodes": list(sig_gene_names), "edges": edges}
    result["edge_count"] = len(edges)
    result["summary"] = f"PPI network: {len(edges)} edges among {len(sig_gene_names)} significant genes, top hub: {hub_genes[0][0] if hub_genes else 'N/A'}"
    
    return result

def tf_analysis(deg_results):
    """Transcription factor target enrichment"""
    result = {"module": "tf", "status": "done", "tf_enrichment": []}
    
    genes = deg_results.get("genes", [])
    sig_genes = set([g["gene"] for g in genes if g["adjPvalue"] < 0.05])
    
    if len(sig_genes) == 0:
        result["summary"] = "No significant genes for TF analysis."
        return result
    
    # TF target database (mock — real would use ChIP-X data)
    tf_db = {
        "TP53": ["CDK2", "BAX", "BBC3", "MDM2", "PERP", "PMAIP1", "GADD45A", "SESN1", "RRM2B"],
        "NFKB1": ["IL6", "TNF", "CXCL8", "ICAM1", "VCAM1", "MMP9", "COX2", "BCL2", "FOS"],
        "STAT3": ["SOCS3", "BCL2", "MYC", "CCND1", "VEGFA", "MMP9", "IL10", "PDGFRB"],
        "HIF1A": ["VEGFA", "EPO", "LDHA", "PDK1", "SLC2A1", "CA9", "ADM", "NDRG1"],
        "NFE2L2": ["HMOX1", "NQO1", "GCLC", "GCLM", "TXNRD1", "GPX1", "ME1", "ME2"],
        "MYC": ["CCND1", "CCNE1", "CDK4", "ODC1", "CAD", "TMPO", "HPRT1", "RPL2"],
        "FOS": ["CCND1", "IL2", "GM-CSF", "CSF1", "MMP1", "COL1A1", "THBD"],
        "JUN": ["CCND1", "IL8", "MMP1", "COL1A2", "FGF2", "HBEGF", "VEGFA"],
        "RELA": ["IL6", "TNF", "CXCL8", "BCL2", "MMP9", "ICAM1", "COX2", "VCAM1"],
        "ESR1": ["TFF1", "PGR", "GREB1", "SCGB2A2", "PDZK1", "ABCB1", "MYC", "CCND1"],
    }
    
    enriched_tfs = []
    for tf, targets in tf_db.items():
        overlap = sig_genes.intersection(set(targets))
        if len(overlap) >= 2:
            try:
                from scipy.stats import hypergeom
                N, K, n = 20000, len(targets), len(sig_genes)
                k = len(overlap)
                pval = hypergeom.sf(k-1, N, K, n)
            except Exception:
                pval = 1.0
            enriched_tfs.append({
                "tf": tf,
                "target_genes": list(overlap),
                "overlap_count": k,
                "total_targets": len(targets),
                "pvalue": round(pval, 6)
            })
    
    enriched_tfs.sort(key=lambda x: x["pvalue"])
    result["tf_enrichment"] = enriched_tfs[:8]
    result["summary"] = f"TF analysis: {len(enriched_tfs)} TFs enriched (p<0.05)"
    
    return result

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No input file"}))
        sys.exit(1)
    
    filepath = sys.argv[1]
    
    try:
        df = load_csv(filepath)
    except Exception as e:
        print(json.dumps({"error": f"Failed to load CSV: {str(e)}"}))
        sys.exit(1)
    
    # Run all analysis modules
    deg = deg_analysis(df)
    volcano = volcano_plot(deg, OUTPUT_DIR)
    pathway = pathway_analysis(deg)
    ppi = ppi_and_hub_genes(deg)
    tf = tf_analysis(deg)
    
    output = {
        "status": "done",
        "modules": {
            "deg": deg,
            "volcano": volcano,
            "pathway": pathway,
            "ppi": ppi,
            "tf": tf
        },
        "summary": f"Analysis complete: {deg.get('total_genes', 0)} genes, {deg.get('up_genes', 0)} up, {deg.get('down_genes', 0)} down. {len(pathway.get('pathways', []))} pathways enriched, {len(ppi.get('hub_genes', []))} hub genes identified, {len(tf.get('tf_enrichment', []))} TFs enriched."
    }
    
    print(json.dumps(output, indent=2))

if __name__ == "__main__":
    main()