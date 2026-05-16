# Brown Biotech research watcher — Friday worth-integrating report

**Axis:** aging–fibrosis–metabolism–single-cell/spatial–clinical translation
**Generated:** 2026-05-14T21:00:51.935935+00:00

## Top hits
### 1. longevity-db/human-muscle-aging-atlas-snRNAseq
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

### 2. tyang816/ProteinGym_v1
- Source: HF
- License: apache-2.0
- Modality: protein-design
- Score: 2/10
- Raw file availability: no
- Key metadata: {"id": "tyang816/ProteinGym_v1", "downloads": 43, "likes": 0, "tags": ["license:apache-2.0", "region:us"], "file_count": 0, "raw_files": [], "description": "📑 Github https://github.com/tyang816/ProtSSN 🙌 Citation Please cite our work if you have used our code or data for dry experiment testing/wet experiment directed evolution. We are pleased to see improvements in the subsequent work. @article{tan2023protssn, title={Semantical and Topological Protein Encoding Toward Enhanced Bioactivity and Thermostability}, author={Tan, Yang and Zhou, Bingxin and Zheng, Lirong and Fan, Guisheng and Hong, Liang}, journal={bioRxiv}… See the full description on the dataset page: https://huggingface.co/datasets/tyang816/ProteinGym_v1."}
- Why it matters: Archive-only signal for now: tyang816/ProteinGym_v1 does not clear the immediate intake threshold.
- Next action: Archive the hit and keep provenance for future search.
- Query: ProteinGym
- URL: https://huggingface.co/datasets/tyang816/ProteinGym_v1

### 3. OATML-Markslab/ProteinGym_v1
- Source: HF
- License: unknown
- Modality: protein-design
- Score: 2/10
- Raw file availability: no
- Key metadata: {"id": "OATML-Markslab/ProteinGym_v1", "downloads": 2176, "likes": 8, "tags": ["size_categories:1M<n<10M", "region:us", "biology", "deep-learning", "protein-fitness"], "file_count": 0, "raw_files": [], "description": "ProteinGym ProteinGym is a benchmark suite for evaluating protein fitness prediction and design models. It includes both substitution and indel mutations, a wide variety of experimentally assayed proteins, and clinically annotated mutations that are relevant to human disease. In total, ProteinGym includes nearly 3 million different mutations. Dataset Details ProteinGym is split into four separate benchmarks, based on the prediction target and the type of mutation… See the full description on the dataset page: https://huggingface.co/datasets/OATML-Markslab/ProteinGym_v1."}
- Why it matters: Archive-only signal for now: OATML-Markslab/ProteinGym_v1 does not clear the immediate intake threshold.
- Next action: Archive the hit and keep provenance for future search.
- Query: ProteinGym
- URL: https://huggingface.co/datasets/OATML-Markslab/ProteinGym_v1

## Query families

- sarcopenia single-cell
- aging muscle atlas
- frailty multi-omics
- muscle fibrosis spatial transcriptomics
- skeletal muscle aging Visium
- human aging cohort metabolomics
- fibroblast atlas
- FAP spatial transcriptomics
- MASH liver atlas
- lung fibrosis single-cell
- fibrosis perturb-seq
- extracellular matrix multiomics
- OXPHOS dependency CRISPR
- mitochondrial vulnerability atlas
- tumor metabolism single-cell
- metabolic flux transcriptome
- ferroptosis atlas
- Xenium atlas
- CosMx dataset
- Visium HD

## Thresholds
- 7+ → ingest immediately
- 4–6 → QC then store
- 3 or below → archive only
