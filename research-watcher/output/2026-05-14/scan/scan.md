# Brown Biotech research watcher — Monday scan

**Axis:** aging–fibrosis–metabolism–single-cell/spatial–clinical translation
**Generated:** 2026-05-14T03:27:01.905645+00:00

## Top hits
### 1. Mapping the effects of plasma-mediated rejuvenation across brain regions
- Source: GEO
- License: NCBI public repository
- Modality: transcriptomics
- Score: 4/10
- Raw file availability: yes
- Key metadata: {"accession": "GSE175693", "taxon": "Mus musculus", "gds_type": "Expression profiling by high throughput sequencing", "sample_count": 96, "suppfile": "TXT", "pdat": "2026/05/01"}
- Why it matters: Promising but needs QC: Mapping the effects of plasma-mediated rejuvenation across brain regions shows transcriptomics signals and should be checked before ingestion.
- Next action: Run QC notebook, then decide whether to ingest.
- Query: aging muscle atlas
- URL: https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE175693

### 2. longevity-db/human-muscle-aging-atlas-snRNAseq
- Source: HF
- License: cc-by-4.0
- Modality: single-cell
- Score: 4/10
- Raw file availability: no
- Key metadata: {"id": "longevity-db/human-muscle-aging-atlas-snRNAseq", "downloads": 13, "likes": 0, "tags": ["annotations_creators:found", "multilinguality:monolingual", "source_datasets:original", "language:en", "license:cc-by-4.0", "size_categories:100K<n<1M", "format:parquet", "modality:tabular", "modality:text", "library:datasets", "library:dask", "library:mlcroissant", "library:polars", "region:us", "single-cell", "single-nucleus", "snRNA-seq", "scRNA-seq", "human", "skeletal-muscle", "aging", "longevity", "cell-atlas", "anndata", "gene-expression", "pca", "umap", "dimensionality-reduction", "cell-types", "biomarkers"], "file_count": 0, "raw_files": [], "description": "Human Skeletal Muscle Aging Atlas (sn/scRNA-seq) Dataset 1. Data Overview This dataset provides single-nucleus and single-cell RNA sequencing (sn/scRNA-seq) data specifically focusing on the human skeletal muscle across different age groups. It serves as a rich resource for investigating cell-type specific gene expression changes and cellular composition shifts that occur during the aging process in a critical human tissue. The original data was sourced from the Human… See the full description on the dataset page: https://huggingface.co/datasets/longevity-db/human-muscle-aging-atlas-snRNAseq."}
- Why it matters: Promising but needs QC: longevity-db/human-muscle-aging-atlas-snRNAseq shows single-cell signals and should be checked before ingestion.
- Next action: Run QC notebook, then decide whether to ingest.
- Query: aging muscle atlas
- URL: https://huggingface.co/datasets/longevity-db/human-muscle-aging-atlas-snRNAseq

## Query families

- aging muscle atlas

## Thresholds
- 7+ → ingest immediately
- 4–6 → QC then store
- 3 or below → archive only
