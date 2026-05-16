# Brown Biotech Research Watcher Spec

## Goal
Create a weekly dataset watcher for the professor's research axis:
- aging
- fibrosis
- metabolism
- single-cell / spatial
- clinical translation

The watcher should surface datasets that are immediately useful, QC-able, and compatible with the Brown Biotech evidence stack.

## Sources to scan
### Daily
- Hugging Face Datasets
- bioRxiv New Results
- Zenodo Communities

### 2–3 times per week
- GEO DataSets
- cellxgene Discover
- Human Cell Atlas Data Portal

### AI / protein design
- OpenFold GitHub
- RFdiffusion GitHub

## Query families
### A. Aging / Sarcopenia / Muscle
- sarcopenia single-cell
- aging muscle atlas
- frailty multi-omics
- muscle fibrosis spatial transcriptomics
- skeletal muscle aging Visium
- human aging cohort metabolomics

### B. Fibrosis / MASH / Lung
- fibroblast atlas
- FAP spatial transcriptomics
- MASH liver atlas
- lung fibrosis single-cell
- fibrosis perturb-seq
- extracellular matrix multiomics

### C. Cancer metabolism / mitochondria
- OXPHOS dependency CRISPR
- mitochondrial vulnerability atlas
- tumor metabolism single-cell
- metabolic flux transcriptome
- ferroptosis atlas

### D. Spatial / imaging
- Xenium atlas
- CosMx dataset
- Visium HD
- multiplex imaging spatial
- spatial metabolomics

### E. Protein design / AI
- RFdiffusion dataset
- protein cofold
- enzyme design benchmark
- ProteinGym
- OpenFold weights

## What to check
### Must-have
- license clean
- raw or semi-raw files available
- metadata dictionary present
- sample / donor annotations present
- coordinate or raw image included for spatial data
- assay-linked labels present for protein design

### Strong positive signals
- perturb-seq
- paired scRNA + ATAC
- spatial + clinical outcome
- longitudinal intervention
- CRISPR dependency linkage
- imaging aligned with transcriptome
- metabolism tracer linkage

### Risk signals
- metadata missing
- donor count < 3
- processed only, no raw
- cell type source unclear
- non-commercial restriction
- giant CSV dump only

## Scoring
Use a simple 10-point rule.

### Add points
- license clean: +2
- H5AD / Zarr / Parquet: +2
- single-cell + spatial paired: +3
- perturbation included: +3
- longitudinal: +2
- human cohort: +2

### Subtract points
- batch effect severe: -2
- metadata poor: -3

### Action thresholds
- **7+** → ingest immediately
- **4–6** → QC then store
- **3 or below** → archive only

## QC notebook minimum
1. load
2. schema check
3. metadata summary
4. cell / gene QC
5. batch visualization
6. quick UMAP
7. toy DEG
8. export parquet / zarr

## Output format
Each dataset hit should include:
- title
- source
- license
- modality
- key metadata
- raw file availability
- immediate-experiment score
- why it matters
- next action

## Weekly schedule
- **Monday 06:00 KST**: scan + score + classify
- **Wednesday**: benchmark top 3
- **Friday**: worth-integrating report

## Why this fits Brown Biotech
This gives the research team a repeatable evidence pipeline: discover → score → QC → ingest → brief.
