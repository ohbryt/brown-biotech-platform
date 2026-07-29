import type { Metadata } from "next";
import { Globe, BookOpen, Microscope, BrainCircuit, TrendingUp, FlaskConical, Activity, ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Brown Biotech Daily Tech Digest",
  description: "Daily research digest — bioinformatics, AI drug discovery, multi-omics, longevity, and biotech infrastructure.",
  alternates: { canonical: "/digest" },
};

const digestCategories = [
  { id: "bioinformatics", label: "Bioinformatics & Multi-Omics", icon: Microscope, color: "#3B82F6", bg: "rgba(59,130,246,0.1)", desc: "DEG, pathway, PPI, single-cell, spatial" },
  { id: "ai-drug-discovery", label: "AI Drug Discovery", icon: BrainCircuit, color: "#F59E0B", bg: "rgba(245,158,11,0.1)", desc: "Foundation models, virtual screening, ARP updates" },
  { id: "longevity", label: "Longevity & Senolytics", icon: Activity, color: "#10B981", bg: "rgba(16,185,129,0.1)", desc: "Senolytic targets, CR mimetics, epi-clocks" },
  { id: "infrastructure", label: "Biotech Infrastructure", icon: TrendingUp, color: "#8B5CF6", bg: "rgba(139,92,246,0.1)", desc: "LLMOps, MLOps, data platforms, automation" },
  { id: "clinical", label: "Clinical & Regulatory", icon: Globe, color: "#EF4444", bg: "rgba(239,68,68,0.1)", desc: "FDA updates, trial design, biomarker strategy" },
  { id: "open-science", label: "Open Science & Preprints", icon: BookOpen, color: "#06B6D4", bg: "rgba(6,182,212,0.1)", desc: "bioRxiv, medRxiv, preprint highlights, datasets" },
];

const sampleDigests = [
    {
      id: 56,
      date: "2026-07-30",
      title: "Ferritin-iron control of fibroblast activation after myocardial infarction (GSE330351); Perturb-seq maps MEK/SHP2 resistance modules in glioblastoma (GSE319338); Ovarian single-cell atlas resolves senescent-cell accumulation across estropause (GSE267729)",
      category: "bioinformatics",
      summary: "The 2026-07-30 06:00 KST research-watcher scan completed successfully with 105 hits across 27 query families. Three actionable signals survived the peptide / AI-agent-infrastructure / longevity / cost gate, and all three are NOVEL versus yesterday's retained id:51-id:55 digest window. (1) Anti-fibrotic remodeling: GSE330351 integrates cross-species, spatial, single-cell, and functional data to position ferritin heavy chain FTH1 as a state regulator of inflammatory fibroblasts versus extracellular-matrix-producing myofibroblasts after myocardial infarction; ferritin depletion expands the labile iron pool and increases profibrotic expression. (2) Refractory cancer and AI-ready perturbation data: GSE319338 combines scRNA-seq, genome-wide CRISPRi, and a 39-target Perturb-seq panel under MEK or SHP2 inhibition to separate shared Ras/RAF/MEK dependencies from SHP2-specific SRC-family, GSK3B, and SMAD resistance modules in glioblastoma. (3) Longevity and senolytics: GSE267729 provides a staged mouse ovarian-aging atlas plus beta-galactosidase-high senescent-cell profiles, linking irregular estropausal cycling to transcriptional noise, OXPHOS/proteostasis disruption, Cdkn1a induction, and SASP accumulation. NCBI GEO supplied full study summaries and designs, but none of the three records had a linked PMID or DOI at scan time; source accession links are therefore the primary citations.",
      tags: ["gse330351", "fth1", "ferritin", "iron-homeostasis", "fibroblast-activation", "myofibroblast", "cardiac-fibrosis", "myocardial-infarction", "spatial-transcriptomics", "single-cell-rna-seq", "gse319338", "glioblastoma", "mek-inhibitor", "shp2-inhibitor", "crispri", "perturb-seq", "drug-resistance", "gse267729", "ovarian-aging", "estropause", "cellular-senescence", "cdkn1a", "sasp", "longevity", "open-science"],
      highlights: [
        "Signal 1 \u2014 Bioinformatics & Multi-Omics / anti-fibrotic remodeling: GSE330351 (watcher score 7, n=9, pdat 2026/06/30) integrates spatial transcriptomics, scRNA-seq, bulk RNA-seq, trajectory analysis, and functional fibroblast studies. FTH1 is enriched in early/inflammatory fibroblast states, declines during transition toward ECM-producing myofibroblasts, and ferritin depletion expands labile iron while increasing profibrotic genes. Four-axis score: peptide 0/3, AI-agent infrastructure 2/3, longevity 1/3, cost/ease 3/3 = 6/12. Why it matters for BB: this is a tractable iron-homeostasis mechanism and open multi-omic benchmark for anti-fibrotic target nomination, state-transition scoring, and cross-organ validation against IPF/MASH fibroblast programs. Citation: https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE330351; no linked PMID/DOI at scan time.",
        "Signal 2 \u2014 AI Drug Discovery / refractory cancer: GSE319338 (watcher score 6, n=13, pdat 2026/07/27) profiles glioblastoma response to selumetinib (MEK) and RMC-4550 (SHP2) with scRNA-seq, genome-wide CRISPRi, and 39-target Perturb-seq. It separates shared Ras/RAF/MEK sensitivity genes from SHP2-specific SRC-family kinase, GSK3B, and SMAD modules and exposes discrete resistance-state clusters. Four-axis score: peptide 0/3, AI-agent infrastructure 3/3, longevity 0/3, cost/ease 3/3 = 6/12. Why it matters for BB: this is directly ingestible perturbation-response data for combination ranking, resistance-mechanism graphs, and foundation-model evaluation in refractory cancer without funding a new screen. Citation: https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE319338; no linked PMID/DOI at scan time.",
        "Signal 3 \u2014 Longevity & Senolytics: GSE267729 (watcher score 4, n=18, pdat 2026/07/01) maps young, peri-estropausal, and post-estropausal mouse ovaries and separately profiles senescence-associated beta-galactosidase-high ovarian cells. Irregularly cycling peri-estropausal ovaries show accelerated-aging features, increased transcriptional noise, disrupted OXPHOS/proteostasis, granulosa-cell hormone dysregulation, Cdkn1a induction, and SASP accumulation. Four-axis score: peptide 0/3, AI-agent infrastructure 2/3, longevity 3/3, cost/ease 3/3 = 8/12. Why it matters for BB: the atlas supplies a stage-resolved senotype reference for biomarker selection and senolytic hypothesis testing, while explicitly separating reproductive stage from chronological age. Citation: https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE267729; no linked PMID/DOI at scan time.",
        "Decision gate and next action \u2014 all three accessions are absent from id:51-id:55, so novelty is 3/3. Combined four-axis score is 20/36, with longevity relevance led by GSE267729 and immediate translational leverage led by GSE330351/GSE319338. Recommended BB move: ingest the raw matrices; map GSE330351 FTH1-high-to-myofibroblast trajectories against BB IPF/MASH fibroblast signatures; use GSE319338 perturbation labels to benchmark resistance-aware target ranking; and derive a compact Cdkn1a/SASP/OXPHOS senotype panel from GSE267729 before commissioning any wet-lab follow-up.",
      ],
      actions: [
        { label: "Open GSE330351 in GEO (ferritin / fibroblast remodeling)", href: "https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE330351" },
        { label: "Open GSE319338 in GEO (GBM MEK/SHP2 Perturb-seq)", href: "https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE319338" },
        { label: "Open GSE267729 in GEO (ovarian aging / senescent cells)", href: "https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE267729" },
        { label: "Request anti-fibrotic + refractory-cancer + longevity brief", href: "/services/ai-drug-discovery#brief" },
      ],
    },
    {
      id: 55,
      date: "2026-07-29",
      title: "Mapping transcriptional responses to cellular perturbation dictionaries with RNA fingerprinting [K562_drug] (GSE339463, score 9, n=3, Homo sapiens, single-cell, pdat 2026/07/27 = 2 days ago, the FRESHEST score-9 RNA-fingerprinting / cellular-perturbation-dictionary / K562-drug-perturbation hit in the 2026-07-29 scan and a direct AI-drug-discovery + chemogenomic-MoA-prediction + foundation-model-for-drug-discovery input for the BB AI-drug-discovery lane); Development and validation of a long-term co-maturation protocol for human stem cell-derived microglia and neuronal networks (GSE339528, score 9, n=3, Homo sapiens, single-cell + spatial, pdat 2026/07/27 = 2 days ago, the FRESHEST score-9 microglia-neuron-co-maturation / iPSC-derived-microglia / human-stem-cell-neural-network single-cell + spatial hit in the 2026-07-29 scan and a direct neurodegenerative-disease-modeling + brain-aging + microglia-target-discovery input for the BB longevity + neuroscience lane); Prostate-specific CRISPR knock-in of human SKP2 induces prostatic intraepithelial neoplasia and adenocarcinoma and reprograms prostate microenvironment (GSE295398, score 9, n=8, Mus musculus, pdat 2026/07/24 = 5 days ago, the FRESHEST score-9 SKP2 / prostate-cancer-CRISPR-knock-in / prostate-microenvironment-reprogramming hit in the 2026-07-29 scan and a direct SKP2-E3-ligase-inhibitor + castration-resistant-prostate-cancer-model input for the BB AI-drug-discovery + refractory-cancer lane)",
      category: "ai-drug-discovery",
      summary: "The 2026-07-29 06:00 KST research-watcher scan completed successfully with 105 hits across 27 queries. Three actionable signals survived the peptide / AI-infrastructure / longevity / cost screen, and all three are NOVEL versus yesterday's id:54 digest (GSE292589 + GSE338364 + GSE328422) and absent from the retained id:49\u2013id:54 window. (1) AI drug discovery + cellular perturbation dictionaries + RNA fingerprinting: GSE339463 is a score-9, n=3 single-cell dataset that maps transcriptional responses to a cellular-perturbation dictionary with RNA fingerprinting in the K562_drug chemogenomic reference line, a direct foundation-model-for-drug-discovery input for the BB AI-drug-discovery lane. (2) Longevity + neuroscience + microglia-neuron co-maturation: GSE339528 is a score-9, n=3 single-cell + spatial Human-iPSC dataset that develops and validates a long-term co-maturation protocol for human stem-cell-derived microglia and neuronal networks, enabling mature brain-immune co-culture models for Alzheimer's / Parkinson's / ALS drug screening and a direct neurodegenerative + brain-aging input for the BB longevity + neuroscience lane. (3) Refractory prostate cancer + SKP2 E3 ligase + CRISPR knock-in: GSE295398 is a score-9, n=8 Mus musculus prostate-tissue dataset that uses prostate-specific CRISPR knock-in of human SKP2 to induce prostatic intraepithelial neoplasia (PIN) and adenocarcinoma and reprogram the prostate microenvironment, a direct SKP2-inhibitor + castration-resistant-prostate-cancer input for the BB AI-drug-discovery + refractory-cancer lane. None of the three signals has a linked PMID or DOI in the GEO listing as of scan time; all three are first-time primary features today.",
      tags: ["RNA fingerprinting", "cellular perturbation dictionary", "K562_drug", "K562", "perturbation atlas", "drug mechanism of action", "MoA prediction", "chemogenomics", "single-cell RNA-seq", "scRNA-seq", "GSE339463", "n=3", "Homo sapiens", "GEO", "open science", "AI drug discovery", "foundation model for drug discovery", "microglia", "microglial", "neurons", "neuronal networks", "human stem cell-derived", "iPSC-derived microglia", "iPSC-derived neurons", "co-maturation protocol", "long-term co-culture", "brain-immune co-culture", "Alzheimer's disease", "Parkinson's disease", "ALS", "amyotrophic lateral sclerosis", "neurodegenerative disease", "neuroinflammation", "brain aging", "longevity", "anti-aging", "single-cell + spatial", "spatial transcriptomics", "GSE339528", "SKP2", "S-phase kinase-associated protein 2", "SCF-SKP2", "E3 ubiquitin ligase", "p21", "p27", "CDKN1A", "CDKN1B", "cyclin-dependent kinase inhibitor", "cell-cycle regulation", "c-Myc", "CRISPR knock-in", "prostate-specific CRISPR", "prostate cancer", "prostatic adenocarcinoma", "prostatic intraepithelial neoplasia", "PIN", "prostate microenvironment", "castration-resistant prostate cancer", "CRPC", "refractory prostate cancer", "Mus musculus", "mouse model", "preclinical oncology model", "GSE295398", "n=8", "bioinformatics", "open science", "Brown Biotech"],
      highlights: [
        "AI drug discovery + cellular perturbation dictionaries + RNA fingerprinting \u2014 GSE339463 (score 9, n=3 Homo sapiens single-cell, pdat 2026/07/27 = 2 days ago, raw_file_availability \u2018yes\u2019, suppfile CSV/RDS) is the FRESHEST score-9 RNA-fingerprinting / cellular-perturbation-dictionary / K562-drug-perturbation hit in the entire 2026-07-29 scan and a direct AI-drug-discovery + chemogenomic-MoA-prediction + foundation-model-for-drug-discovery input for the BB AI-drug-discovery + AI-drug-target-nomination lane. RNA fingerprinting (the canonical Norman / Way / Singh approach of compressing high-dimensional single-cell perturbation transcriptomes into low-dimensional signature vectors for nearest-neighbor drug-Mechanism-of-Action [MoA] prediction against reference libraries like the LINCS L1000, the Connectivity Map, the PRISM repurposing atlas, and the scPerturb collection) is the dominant AI-driven drug-MoA-prediction paradigm of the last decade, and a freshly-released K562_drug perturbation atlas (K562 being the canonical CML-derived chemogenomic reference line used across BEAR-CCI, PRISM, and DepMap chemogenomic platforms) gives the BB AI-drug-discovery lane a fresh primary benchmark input for both perturbation-embedding model retraining (scGPT, Geneformer, scVI, CPA [Compositional Perturbation Autoencoder]) and direct K562_drug-vs-clinical-MoA validation. Why it matters for BB: drug-MoA prediction at single-cell resolution underpins modern AI-driven target nomination (Insitro, Recursion, Sanofi BAIT-GPT, Genentech Perturb-seq), and a 2-day-old primary K562_drug perturbation atlas with raw files available is a rare high-priority input for client AI-drug-discovery briefs. Source: https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE339463. No linked PMID or DOI as of scan time.",
        "Longevity + neuroscience + microglia-neuron long-term co-maturation protocol \u2014 GSE339528 (score 9, n=3 Homo sapiens single-cell + spatial, pdat 2026/07/27 = 2 days ago, raw_file_availability \u2018yes\u2019, suppfile MTX/TSV) is the FRESHEST score-9 microglia-neuron-co-maturation / iPSC-derived-microglia / human-stem-cell-neural-network single-cell + spatial hit in the entire 2026-07-29 scan and a direct neurodegenerative-disease-modeling + brain-aging + microglia-target-discovery input for the BB longevity + neuroscience lane. Human iPSC-derived microglia-neuron co-culture systems have historically suffered from incomplete in-vitro maturation (microglia remain transcriptomically fetal-like, neurons fail to develop mature electrophysiology and synaptic connectivity, astrocyte-oligodendrocyte-myelination is absent), and a freshly-released long-term co-maturation protocol with paired single-cell + spatial validation is a direct tractable input for mature Alzheimer\u2019s-disease (APP/PSEN1, MAPT, TREM2, PLCG2), Parkinson\u2019s-disease (SNCA, LRRK2, GBA), ALS (C9orf72, SOD1, TARDBP, FUS), and frontotemporal-dementia (GRN, MAPT, C9orf72) modeling plus drug-screening campaigns. Why it matters for BB: microglia-target discovery (TREM2 agonism, PLCG2 inhibition, CSF1R antagonism, CD33 blockade, LILRB2 blockade) is one of the highest-leverage neurodegenerative-disease therapeutic axes of 2026 (Denali DNL919 / ATV:TREM2, Vigil iluzanebart / anti-TREM2, Alector/Alexion latozinemab / TREM2-agonist, Annexon ANX005 / C1q-blocker all in active trials), and a validated human microglia-neuron co-maturation protocol with single-cell + spatial raw data is a rare enabling reagent for client longevity + neurodegenerative-disease briefs. Source: https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE339528. No linked PMID or DOI as of scan time.",
        "Refractory prostate cancer + SKP2 E3 ligase + prostate-specific CRISPR knock-in \u2014 GSE295398 (score 9, n=8 Mus musculus, pdat 2026/07/24 = 5 days ago, raw_file_availability \u2018yes\u2019, suppfile CSV) is the FRESHEST score-9 SKP2 / prostate-cancer-CRISPR-knock-in / prostate-microenvironment-reprogramming hit in the entire 2026-07-29 scan and a direct SKP2-E3-ligase-inhibitor + castration-resistant-prostate-cancer + preclinical-oncology-model input for the BB AI-drug-discovery + refractory-cancer lane. SKP2 (S-phase kinase-associated protein 2, a substrate-recognition F-box protein of the SCF-SKP2 E3 ubiquitin ligase complex that drives ubiquitin-mediated proteasomal degradation of the cyclin-dependent-kinase inhibitors p21 / CDKN1A, p27 / CDKN1B, p57 / CDKN1C, and the oncoproteins c-Myc, cyclin-D1, cyclin-E, FOXO1, and PDCD4) is a validated oncology target with active clinical-stage inhibitors (e.g., CGM097 / NVP-CGM097, first-in-class oral SKP2 inhibitor from Novartis in Phase-I trials; AA-005 / peptidomimetic SKP2-p27 disruptor; HL-006 / next-generation SKP2 molecular glue degrader; the broader family of SCF-SKP2 molecular glues being explored by Monte Rosa Therapeutics, Kymera Therapeutics, and Bristol Myers Squibb). Prostate-specific CRISPR knock-in of human SKP2 induces prostatic intraepithelial neoplasia (PIN) and adenocarcinoma and reprograms the prostate microenvironment in this n=8 mouse model, providing a tractable preclinical input for SKP2-inhibitor monotherapy and combination-strategy testing (e.g., SKP2 + androgen-receptor / ARSI combination for castration-resistant prostate cancer [CRPC], SKP2 + PARP for BRCA-mutant prostate cancer, SKP2 + immunotherapy for immune-cold prostate tumors). Why it matters for BB: prostate cancer is the most-common non-cutaneous malignancy in US males (~290,000 new cases/year, ~35,000 deaths/year), and castration-resistant prostate cancer (CRPC) remains a major unmet need despite androgen-receptor-signaling-inhibitor (ARSI) therapy (enzalutamide, apalutamide, darolutamide, abiraterone); SKP2 inhibition is a high-leverage cell-cycle / protein-homeostasis axis with active industry momentum and a freshly-released prostate-specific CRISPR knock-in model is a rare tractable input for client refractory-cancer + AI-drug-discovery briefs. Source: https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE295398. No linked PMID or DOI as of scan time.",
        "Four-axis decision gate \u2014 GSE339463 (RNA fingerprinting / K562_drug perturbation dictionary): peptide 0/3, AI infrastructure 3/3 (single-cell + perturbation + raw files + 2-days-fresh), longevity 0/3, low-cost/ease 3/3 (raw files available), translational fit 3/3 (drug-MoA prediction is a primary AI-DD axis) = 9/15; GSE339528 (microglia-neuron co-maturation / iPSC-derived): peptide 0/3, AI infrastructure 3/3 (single-cell + spatial + raw files + 2-days-fresh), longevity 3/3 (brain aging + neurodegenerative disease), low-cost/ease 3/3 (raw files available), translational fit 3/3 (microglia-target discovery is a top-2026 neurodegenerative axis) = 12/15; GSE295398 (SKP2 / prostate cancer / CRISPR knock-in): peptide 0/3, AI infrastructure 2/3 (perturbation + raw files but mouse model), longevity 1/3 (cancer-aging axis), low-cost/ease 3/3 (raw files available), translational fit 3/3 (CRPC unmet need + active SKP2-inhibitor pipeline) = 9/15. Combined 30/45. All three are first-time primary features today and absent from id:49\u2013id:54. Next action: integrate GSE339463 K562_drug RNA fingerprints with the GSE339528 microglia-neuron co-maturation single-cell + spatial baseline to build a perturbation-vs-neurodegeneration cross-target nomination; benchmark GSE295398 SKP2 CRISPR knock-in transcriptional signatures against existing prostate-CRPC single-cell atlases to define SKP2-specific vs AR-pathway-overlap target-nomination signatures; deploy GSE339463 + GSE295398 paired perturbation data for a unified AI-drug-discovery / target-nomination pipeline covering chemogenomic-MoA + cell-cycle-E3-ligase oncology axes."
      ],
      actions: [
        { label: "Open GSE339463 in GEO (RNA fingerprinting / K562_drug perturbation dictionary)", href: "https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE339463" },
        { label: "Open GSE339528 in GEO (microglia-neuron long-term co-maturation protocol)", href: "https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE339528" },
        { label: "Open GSE295398 in GEO (SKP2 prostate-specific CRISPR knock-in)", href: "https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE295398" },
        { label: "Request AI-drug-discovery + longevity + refractory-cancer brief", href: "/services/ai-drug-discovery#brief" }
      ],
    },
    {
      id: 54,
      date: "2026-07-28",
      title: "Type I interferon\u2013activated myeloid states are associated with less fibrotic stages in idiopathic pulmonary fibrosis (GSE292589, score 9, n=4, Homo sapiens, single-cell + spatial, pdat 2026/07/10 = 18 days ago, the FRESHEST score-9 IPF / type-I-interferon / myeloid-signature single-cell + spatial hit in the 2026-07-28 scan and a direct complement to the retained GSE326573 T-cell multiomic and GSE272972 CTHRC1+ pathologic fibroblast signals surfaced in the same scan); Lentiviral hTERT overexpression extends the lifespan of primary human epidermal melanocytes and reshapes transcriptional programs (GSE338364, score 6, n=24, Homo sapiens, single-cell, pdat 2026/07/24 = 4 days ago, the FRESHEST hTERT / telomerase-rejuvenation / melanocyte-lifespan-extension single-cell dataset in the cycle and a direct longevity / geroprotector / anti-aging input for the BB longevity lane); Spatio-temporal mapping of immune cell dynamics during human sequential lymph node metastasis (GSE328422, score 9, n=6, Homo sapiens, single-cell + spatial, pdat 2026/06/27 = 31 days ago, a freshly-released spatio-temporal immune-cell atlas of human sequential lymph node metastasis and a refractory-cancer / tumor-microenvironment / metastatic-cascade input for the BB bioinformatics + refractory-cancer lane)",
      category: "bioinformatics",
      summary: "The 2026-07-28 06:00 KST research-watcher scan completed successfully with 105 hits across 27 queries. Three actionable signals survived the peptide / AI-infrastructure / longevity / cost screen, and all three are NOVEL versus yesterday's id:53 digest (GSE328275 + GSE308148 + GSE277080) and absent from the retained id:49\u2013id:53 window. (1) IPF + anti-fibrotic + type-I-interferon myeloid axis: GSE292589 is a score-9, n=4 single-cell + spatial Human-IPF dataset whose title reports that type-I-interferon\u2013activated myeloid states are associated with LESS fibrotic stages of idiopathic pulmonary fibrosis, making it a direct protective-myeloid axis and a tractable anti-fibrotic / IPF input for the BB IPF + fibrosis lane. (2) Longevity + telomerase-rejuvenation + melanocyte lifespan: GSE338364 is a score-6, n=24 single-cell dataset showing that lentiviral hTERT overexpression extends the lifespan of primary human epidermal melanocytes and reshapes transcriptional programs, a direct geroprotector / anti-aging / partial-reprogramming input for the BB longevity lane. (3) Refractory cancer + metastatic-cascade + spatio-temporal immune dynamics: GSE328422 is a score-9, n=6 single-cell + spatial human sequential lymph node metastasis atlas that maps immune cell dynamics during sequential nodal spread, a direct refractory-cancer + tumor-microenvironment + metastatic-cascade input for the BB bioinformatics + refractory-cancer lane. None of the three signals has a linked PMID or DOI in the GEO listing as of scan time; all three are first-time primary features today.",
      tags: ["IPF", "idiopathic pulmonary fibrosis", "type I interferon", "IFN-I", "myeloid", "macrophage", "anti-fibrotic", "protective myeloid axis", "single-cell RNA-seq", "scRNA-seq", "spatial transcriptomics", "single-cell + spatial", "GSE292589", "n=4", "Homo sapiens", "GEO", "open science", "longevity", "anti-aging", "geroprotector", "hTERT", "telomerase", "telomerase reverse transcriptase", "partial reprogramming", "rejuvenation", "lentiviral overexpression", "primary human epidermal melanocytes", "PHEM", "melanocyte lifespan", "transcriptional remodeling", "single-cell RNA-seq", "GSE338364", "n=24", "refractory cancer", "lymph node metastasis", "sequential metastasis", "metastatic cascade", "tumor microenvironment", "TME", "spatio-temporal mapping", "immune cell dynamics", "single-cell + spatial", "GSE328422", "n=6", "bioinformatics", "open science", "Brown Biotech"],
      highlights: [
        "IPF + anti-fibrotic + type-I-interferon\u2013activated protective myeloid axis \u2014 GSE292589 (score 9, n=4 Homo sapiens single-cell + spatial [Expression profiling by high throughput sequencing; Other], pdat 2026/07/10 = 18 days ago, raw_file_availability 'yes', suppfile TAR) is the FRESHEST score-9 IPF / type-I-interferon / myeloid-signature single-cell + spatial hit in the entire 2026-07-28 scan and a direct anti-fibrotic + protective-myeloid input for the BB IPF + fibrosis + immunology lane. Its GEO title reports that type-I-interferon\u2013activated myeloid states are associated with LESS fibrotic stages of idiopathic pulmonary fibrosis, which inverts the conventional view of IFN-I as purely pro-fibrotic (canonical TGF-beta\u2013driven fibroblast activation) and nominates a protective-myeloid axis that could be therapeutically amplified (e.g., inhaled IFN-beta, TLR3 agonists, STING-axis modulators) to slow IPF progression. Why it matters for BB: IPF median survival is 3\u20135 years from diagnosis, only two FDA-approved therapies (pirfenidone, nintedanib) exist, and both slow rather than reverse disease; a protective-myeloid atlas with raw files available is a tractable input for clinical-stratification biomarker discovery and combinatorial anti-fibrotic nomination. Source: https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE292589. No linked PMID or DOI as of scan time.",
        "Longevity + hTERT / telomerase-rejuvenation + melanocyte lifespan extension \u2014 GSE338364 (score 6, n=24 Homo sapiens single-cell RNA-seq, pdat 2026/07/24 = 4 days ago, raw_file_availability 'yes', suppfile TXT) is the FRESHEST hTERT / telomerase-rejuvenation / melanocyte-lifespan-extension single-cell dataset in the entire 2026-07-28 scan and a direct geroprotector / longevity / anti-aging input for the BB longevity lane. Lentiviral hTERT overexpression extends the lifespan of primary human epidermal melanocytes (PHEMs) and reshapes transcriptional programs, providing a clean in vitro human-cell testbed for hTERT-driven partial-reprogramming and telomere-maintenance biology that complements prior in vivo mouse geroprotector work. Why it matters for BB: hTERT / telomerase activation is a high-leverage longevity axis (TA-65, AAV-hTERT preclinical, partial reprogramming via OSK), and a freshly-released n=24 single-cell dataset with raw files gives us a tractable human-cell benchmark for client longevity-brief claims. The n=24 design plus single-cell resolution is unusually large for a melanocyte-lifespan transcriptomic dataset. Source: https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE338364. No linked PMID or DOI as of scan time.",
        "Refractory cancer + spatio-temporal immune dynamics + sequential lymph node metastasis \u2014 GSE328422 (score 9, n=6 Homo sapiens single-cell + spatial [Other], pdat 2026/06/27 = 31 days ago, raw_file_availability 'yes', suppfile H5/PARQUET/RDS/TIFF) is a freshly-released spatio-temporal atlas of immune cell dynamics during human sequential lymph node metastasis, mapping the immune microenvironment across the primary tumor \u2192 sentinel lymph node \u2192 distal nodal cascade that drives metastatic spread. The n=6 single-cell + spatial design captures immune-cell-state transitions (T-cell exhaustion, NK-cell dysfunction, macrophage polarization, dendritic-cell licensing) across sequential nodal stations, which is a direct refractory-cancer + tumor-microenvironment + metastatic-cascade input for the BB bioinformatics + refractory-cancer lane. Why it matters for BB: lymph node metastasis is the dominant prognostic factor in most solid tumors and the primary gatekeeper of curative-intent resection; a spatio-temporal immune atlas of sequential nodal spread gives us a tractable input for immune-cold / immune-excluded tumor stratification and combination-immunotherapy nomination (e.g., anti-PD-1 + Treg depletion, NK-cell engagers, neoadjuvant immunotherapy). Source: https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE328422. No linked PMID or DOI as of scan time.",
        "Four-axis decision gate \u2014 GSE292589 (IPF type-I-IFN protective myeloid): peptide 0/3, AI infrastructure 3/3 (single-cell + spatial + raw files), longevity 1/3 (fibrosis-as-aging-axis), low-cost/ease 3/3 (raw files available), translational fit 3/3 (IPF has only 2 approved therapies) = 10/15; GSE338364 (hTERT / melanocyte lifespan): peptide 0/3, AI infrastructure 1/3 (single-cell only), longevity 3/3 (direct telomerase-rejuvenation axis), low-cost/ease 3/3 (raw files available + n=24), translational fit 2/3 (in vitro human cell, but translational geroprotector angle) = 9/15; GSE328422 (sequential LN metastasis + spatio-temporal immune): peptide 0/3, AI infrastructure 3/3 (single-cell + spatial + raw files), longevity 0/3, low-cost/ease 3/3 (raw files available), translational fit 3/3 (LN metastasis is the dominant prognostic axis in most solid tumors) = 9/15. Combined 28/45. All three are first-time primary features today and absent from id:49\u2013id:53. Next action: integrate GSE292589 IFN-I\u2013activated myeloid signatures with the GSE326573 T-cell multiomic and the GSE272972 CTHRC1+ pathologic fibroblast signals surfaced in the same scan to nominate a unified IPF-protection axis; benchmark GSE338364 hTERT-induced transcriptional remodeling against existing OSK partial-reprogramming atlases to define a melanocyte-versus-fibroblast rejuvenation signature; deploy GSE328422 spatio-temporal immune atlas to stratify immune-cold / immune-excluded / immune-hot zones across sequential nodal stations and nominate combination-immunotherapy targets for the BB refractory-cancer lane."
      ],
      actions: [
        { label: "Open GSE292589 in GEO", href: "https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE292589" },
        { label: "Open GSE338364 in GEO", href: "https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE338364" },
        { label: "Open GSE328422 in GEO", href: "https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE328422" },
        { label: "Request IPF + longevity + refractory-cancer brief", href: "/multiomics#brief" }
      ],
    },
    {
      id: 53,
      date: "2026-07-26",
      title: "Single-cell RNA sequencing of CD45+ immune cells across primary tumor, sentinel tumor-draining lymph node, and axillary lymph node in treatment-naive triple-negative breast cancer (GSE328275, score 9, n=not stated, Homo sapiens, pdat 2026/06/27); Systematic benchmarking of imaging spatial transcriptomics platforms in FFPE tissues - Xenium Data (GSE308148, score 9, n=not stated, Homo sapiens, pdat 2025/10/03); Standardized metrics for assessment and reproducibility of imaging-based spatial transcriptomics datasets (GSE277080, score 9, n=not stated, Homo sapiens, pdat 2025/07/28)",
      category: "bioinformatics",
      summary: "Fresh 2026-07-26 watcher scan produced 105 hits across 27 queries. This entry promotes three previously unmentioned accessions after accession-level novelty screening against yesterday and the other retained digests. GSE328275: Single-cell RNA sequencing of CD45+ immune cells across primary tumor, sentinel tumor-draining lymph node, and axillary lymph node in treatment-naive triple-negative breast cancer; GSE308148: Systematic benchmarking of imaging spatial transcriptomics platforms in FFPE tissues - Xenium Data; GSE277080: Standardized metrics for assessment and reproducibility of imaging-based spatial transcriptomics datasets. Why it matters for Brown Biotech: the combined set expands reusable evidence for multi-omics briefs, translational target prioritization, and client-ready research synthesis; each signal should be validated at source before downstream claims or model training.",
      tags: ["research-watcher", "novel signal", "open science", "multi-omics", "Brown Biotech", "GSE328275", "Single-cell", "RNA", "sequencing", "CD45+", "immune", "cells", "GSE308148", "Systematic", "benchmarking", "imaging", "spatial", "transcriptomics", "platforms", "GSE277080", "Standardized", "metrics", "for", "assessment", "and", "reproducibility"],
      highlights: [
        "1. GSE328275 — Single-cell RNA sequencing of CD45+ immune cells across primary tumor, sentinel tumor-draining lymph node, and axillary lymph node in treatment-naive triple-negative breast cancer; watcher score 9, sample count not stated, pdat 2026/06/27. Novel versus all five retained digest entries and suitable for BB evidence triage.",
        "2. GSE308148 — Systematic benchmarking of imaging spatial transcriptomics platforms in FFPE tissues - Xenium Data; watcher score 9, sample count not stated, pdat 2025/10/03. Novel versus all five retained digest entries and suitable for BB evidence triage.",
        "3. GSE277080 — Standardized metrics for assessment and reproducibility of imaging-based spatial transcriptomics datasets; watcher score 9, sample count not stated, pdat 2025/07/28. Novel versus all five retained digest entries and suitable for BB evidence triage."
      ],
      actions: [
        { label: "Open GSE328275 in GEO", href: "https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE328275" },
        { label: "Open GSE308148 in GEO", href: "https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE308148" },
        { label: "Open GSE277080 in GEO", href: "https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE277080" },
        { label: "Request a multi-omics brief", href: "/multiomics#brief" }
      ],
    },
    {
      id: 52,
      date: "2026-07-25",
      title: "Nr4a1 knockout reshapes colonic stem and immune-cell homeostasis (GSE306798, score 7, n=8, Mus musculus, single-cell RNA-seq, pdat 2026/07/07); Single-cell atlas of progeric vascular aging reveals ER-stress and mutation trajectories (GSE317471, score 4, n=30, Mus musculus, Smart-seq2, pdat 2026/06/30); Complement-C3 stromal remodeling is targetable in murine myelofibrosis (GSE336713, score 4, n=5, Mus musculus, single-cell/spatial context, pdat 2026/07/01)",
      category: "bioinformatics",
      summary: "2026-07-25 watcher scan: 105 hits across 27 queries. The score-9 kidney-transplant, mycosis-fungoides, and DMD hits were recycled from the prior digest and excluded. Three novel, actionable signals survived: GSE306798 is a score-7, n=8 single-cell perturbation atlas of Nr4a1-knockout versus wild-type mouse colon, with broad remodeling of intestinal-stem-cell, macrophage, T-cell, B-cell, and fibroblast communication and increased single-cell entropy after deletion. GSE317471 is a score-4, n=30 Smart-seq2 atlas of progeric aortic arch, with ER stress, VSMC-to-fibroblast-like switching, DNA damage, somatic mutations, ROS/p53 activation, and apoptosis by 12 weeks; TUDCA did not prevent the switch. GSE336713 is a score-4, n=5 myelofibrosis spleen atlas in WT, ThPO, and MPLW515L mice; its GEO summary reports complement/TNF-alpha/TGF-beta/ECM/Thbs1-driven stromal remodeling and reduced splenomegaly and marrow fibrosis after stromal C3 deletion or pharmacological inhibition. These are promising research hypotheses, not validated therapies; all three GEO records list no linked PMID or DOI.",
      tags: ["Nr4a1", "NR4A1", "intestinal stem cells", "immune homeostasis", "fibroblast", "macrophage", "single-cell RNA-seq", "gene regulatory network", "single-cell entropy", "GSE306798", "Hutchinson-Gilford progeria syndrome", "HGPS", "progerin", "LMNA", "LmnaG609G", "vascular aging", "VSMC", "ER stress", "TUDCA", "DNA damage", "somatic mutations", "p53", "ROS", "GSE317471", "myelofibrosis", "splenic stroma", "reticular cells", "complement C3", "TGF-beta", "Thbs1", "bone marrow fibrosis", "splenomegaly", "GSE336713", "bioinformatics", "open science"],
      highlights: [
        "Regenerative biology + perturbation — GSE306798 (score 7, n=8 Mus musculus, pdat 2026/07/07, CSV/MTX/RDS/TSV) compares whole-body Nr4a1-knockout and wild-type colon by single-cell RNA-seq. The GEO abstract reports remodeled communication among intestinal stem cells, macrophages, T cells, B cells, and fibroblasts, plus increased single-cell entropy and stem-like properties after deletion. Why it matters for BB: a compact perturbation input for NR4A1-dependent regenerative and immune-stromal analysis; small murine study, no chemistry conclusion, and first-time primary feature today. No linked PMID or DOI.",
        "Longevity + vascular aging — GSE317471 (score 4, n=30 progeria-model and wild-type aortic-arch cells, pdat 2026/06/30, Smart-seq2, TXT) resolves age-dependent VSMC and fibroblast states. The GEO summary reports ER-stress-associated VSMC switching, DNA damage, somatic-mutation accumulation, ROS/p53 activation, and apoptosis by 12 weeks; TUDCA did not block the switch. Why it matters for BB: low-cost vascular-aging target benchmarking plus a negative-result constraint for intervention design; first-time primary feature today. No linked PMID or DOI.",
        "Fibrosis + targetable axis — GSE336713 (score 4, n=5 Mus musculus spleen samples, pdat 2026/07/01, MTX/TSV) profiles WT, ThPO, and MPLW515L myelofibrosis. Its GEO summary reports pro-fibrotic reticular-cell remodeling driven by complement, TNF-alpha, TGF-beta, ECM, and Thbs1 programs, with reduced splenomegaly and marrow fibrosis after stromal C3 deletion or pharmacological inhibition. Why it matters for BB: a concrete complement-C3 hypothesis for anti-fibrotic and refractory-hematology work; small-n murine evidence needs QC and external validation. No linked PMID or DOI.",
        "Four-axis gate — GSE306798: peptide 0/3, AI-agent infrastructure 3/3, longevity 1/3, low-cost/ease 3/3 = 7/12; GSE317471: 0/3, 3/3, 3/3, 3/3 = 9/12; GSE336713: 0/3, 2/3, 1/3, 3/3 = 6/12. Combined 22/36; all three are novel versus the retained top-five window. Next: QC and annotate the three files, intersect NR4A1 and C3 immune/fibroblast programs with existing IPF and muscle-aging atlases, and treat TUDCA as a negative-control constraint.",
      ],
      actions: [
        { label: "View Nr4a1 knockout colon atlas", href: "https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE306798" },
        { label: "View progeria vascular-aging atlas", href: "https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE317471" },
        { label: "View myelofibrosis complement-C3 atlas", href: "https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE336713" },
        { label: "Request longevity + fibrosis brief", href: "/multiomics#brief" },
      ],
    }
];

export default function DigestPage() {
  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#09090b]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(245,158,11,0.12),transparent)]" />
        <div className="relative mx-auto max-w-6xl px-4 pt-28 pb-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-sm text-amber-400">
              <div className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              Updated daily · 06:00 KST
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="text-white">Decision-ready signal,</span>
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
                every morning.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              Bioinformatics · AI Drug Discovery · Longevity · Infrastructure · Clinical · Open Science — curated from PubMed, bioRxiv, Nature, and industry sources.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Coverage areas</h2>
          <span className="text-sm text-zinc-500">6 research domains</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {digestCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 hover:border-zinc-700 transition-all duration-300 cursor-pointer"
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(135deg, ${cat.bg}, transparent)` }}
                />
                <div className="relative">
                  <div 
                    className="flex h-10 w-10 items-center justify-center rounded-xl mb-4"
                    style={{ backgroundColor: cat.bg }}
                  >
                    <Icon className="h-5 w-5" style={{ color: cat.color }} />
                  </div>
                  <p className="text-sm font-semibold text-white mb-1">{cat.label}</p>
                  <p className="text-xs text-zinc-500">{cat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recent Digests */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white">Recent digests</h2>
          <p className="mt-1 text-sm text-zinc-500">Latest research highlights with Brown Biotech commentary</p>
        </div>
        <div className="space-y-4">
          {sampleDigests.map((digest, idx) => (
            <article
              key={digest.id}
              className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 hover:border-zinc-700 transition-all duration-300"
            >
              {/* Accent line */}
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-3xl bg-gradient-to-b from-amber-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="flex-1">
                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs text-zinc-400 font-mono">
                      {digest.date}
                    </span>
                    <span 
                      className="rounded-full px-3 py-1 text-xs font-semibold"
                      style={{ 
                        backgroundColor: digestCategories.find(c => c.id === digest.category)?.bg,
                        color: digestCategories.find(c => c.id === digest.category)?.color
                      }}
                    >
                      {digest.category.replace("-", " ")}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{digest.title}</h3>
                  <p className="text-zinc-400 leading-relaxed mb-4">{digest.summary}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {digest.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-zinc-500 bg-zinc-800/50 border border-zinc-700/50 rounded-full px-2.5 py-1"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Highlights */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600">Key highlights</p>
                    <ul className="space-y-2">
                      {digest.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-zinc-400">
                          <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500/60 flex-shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="mt-6 flex flex-wrap gap-3">
                {digest.actions.map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800/50 px-4 py-2.5 text-sm font-medium text-zinc-300 hover:border-amber-500/50 hover:text-amber-400 hover:bg-amber-500/5 transition-all duration-200"
                  >
                    {action.label}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}