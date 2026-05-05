# Brown Biotech x NIH Human Multi-Omic Data Pack

## 1) Brown Biotech-relevant data source shortlist

| Source | Why it matters | Best use for Brown Biotech | Access | Notes |
|---|---|---|---|---|
| FaceBase | Human developmental and phenotype-linked multi-omic datasets | Discovery / genomics / phenotype-driven analysis | Summary-level free; individual-level controlled | Strong starting point for human multi-omic work |
| dbGaP | Human genotype + phenotype archive | Clinical / phenotype linkage, cohort discovery | Controlled access | Useful when phenotype-genotype pairing matters |
| GEO | Public functional genomics repository | Expression analysis, comparative studies | Public | Very useful for transcriptomics and curated gene expression |
| TCGA | Large cancer genomics resource | Oncology discovery, biomarker exploration | Public | Strong fit for Brown Biotech oncology-adjacent work |
| HTAN | 3D cancer atlas and molecular features | Tumor atlas / spatial-like discovery | Public | Good for advanced cancer-discovery narratives |
| PDC | Proteomic Data Commons | Proteomics-driven biomarker work | Public | Strong for proteomics service positioning |
| HMDB | Human metabolome database | Metabolomics and biomarker context | Public | Good for systems biology / biomarker support |
| eHOMD | Human oral microbiome database | Oral / aerodigestive microbiome work | Public | Useful if working on oral, salivary, or microbiome projects |
| Human Salivary Proteome | Saliva proteomics portal | Salivary diagnostics / biomarker discovery | Public | Strong fit for non-invasive diagnostic work |
| SalivaDB / SalivaTecDB | Salivary biomarker databases | Saliva biomarker panels | Public | Useful for diagnostics and translational work |
| cBioPortal | Cancer genomics portal | Cancer alteration / cohort interrogation | Public | Good for rapid exploratory analyses |
| Pharos | Druggable genome knowledge base | Target prioritization | Public | Useful for drug discovery and target assessment |
| EGA | Archive for identifiable human data | Controlled human data access | Controlled access | More relevant when handling sensitive research data |
| ProteomicsDB | Multi-omics and multi-organism resource | Protein-centric / multi-omics support | Public | Broad resource, helpful for exploratory analysis |
| SICCA | Sjögren’s research alliance | Autoimmune / oral health / salivary relevance | Public / controlled by resource | Good if Brown Biotech touches autoimmune or oral-health adjacent work |

## 2) Source-list copy for services pages

### For `genox-site`
**Official data sources and reference layers**
- Human multi-omic data: FaceBase, dbGaP, GEO, TCGA, HTAN, HMDB
- Proteomics: PDC, ProteomicsDB, Human Salivary Proteome
- Microbiome: eHOMD, SalivaDB / SalivaTecDB
- Disease and target context: Pharos, cBioPortal

**Copy block**
> We work from public and controlled-access human multi-omic sources where appropriate, including FaceBase, GEO, TCGA, dbGaP, PDC, HMDB, eHOMD, and related NIH-supported resources. The goal is to turn raw datasets into a clearer project scope, a stronger analysis path, and a more decision-ready next step.

### For `biostatx`
**Data and analysis inputs**
- GEO for expression studies
- dbGaP for phenotype-linked studies
- TCGA / cBioPortal for cancer-focused cohorts
- HMDB for metabolomics context
- PDC and ProteomicsDB for proteomics support

**Copy block**
> Brown Biotech biostatistics support can work across public and controlled-access human datasets, including GEO, dbGaP, TCGA, cBioPortal, HMDB, and proteomics resources such as PDC and ProteomicsDB. We focus on analysis clarity, interpretation, and decision-ready reporting.

## 3) Multi-omic data sourcing workflow

### Goal
Build a repeatable workflow that takes a project question and converts it into a scoped, source-backed, human-reviewed analysis brief.

### Workflow stages

#### Stage 1 — Intake
Collect:
- project goal
- disease / tissue / cohort
- desired modalities: transcriptomics, proteomics, metabolomics, microbiome, phenotype
- timeline
- output format
- access constraints

#### Stage 2 — Source selection
Map the project to the right source set:
- phenotype + human developmental questions → FaceBase, dbGaP
- expression analysis → GEO
- cancer genomics → TCGA, cBioPortal, HTAN
- proteomics → PDC, ProteomicsDB, salivary proteome resources
- metabolomics → HMDB
- oral / saliva / microbiome → eHOMD, SalivaDB

#### Stage 3 — Access check
Determine:
- public vs controlled access
- whether controlled-access data is actually needed
- whether the requested analysis can begin with public summary data

#### Stage 4 — Retrieval
Pull:
- dataset metadata
- study abstracts / descriptions
- sample counts
- modalities
- access notes
- relevant links

#### Stage 5 — Triage / relevance scoring
Score each dataset by:
- biological relevance
- cohort match
- modality fit
- access friction
- expected analytical value

#### Stage 6 — Human review
A human approves:
- final dataset shortlist
- scope boundaries
- any interpretation language
- whether controlled-access steps are worth it

#### Stage 7 — Analysis brief
Produce a concise brief with:
- selected datasets
- why they were chosen
- what they can answer
- known limitations
- recommended next analysis step

#### Stage 8 — Archive and reuse
Store in Notion:
- source list
- dataset shortlist
- chosen workflow
- output summary
- future reuse notes

### Operational principles
- Start with public data whenever possible
- Use controlled access only when the question truly needs it
- Keep output short and decision-oriented
- Human review before any external claim or client delivery
- Reuse prior shortlists to accelerate future projects

### Brown Biotech implementation suggestion
Use this as a **Discovery / Genomics / Biostatistics intake lane**:
1. client sends a question
2. system maps question to source classes
3. analyst or agent builds a shortlist
4. human approves scope
5. analysis begins
6. brief is delivered and archived in Notion

## Short recommendation
If Brown Biotech wants a practical first multi-omic lane, start with:
1. **GEO + dbGaP + FaceBase** for human data discovery
2. **TCGA + cBioPortal + HTAN** for cancer-oriented analysis
3. **PDC + ProteomicsDB + HMDB** for proteomics/metabolomics support
4. **eHOMD + Human Salivary Proteome** if working on oral / saliva / diagnostics
