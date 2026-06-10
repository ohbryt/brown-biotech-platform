// src/lib/gem-depmap.ts
// GEM-DepMap integrated metabolic vulnerability analysis — TypeScript port.
//
// Data is pre-computed and baked into data/gem_depmap/lineages.json (130KB).
// This module provides synchronous lookup by cell line, lineage, or
// cancer-type query — no Python dependency needed at runtime.

import lineagesData from "@/data/gem_depmap/lineages.json";

interface Dependency {
  gene: string;
  score: number;
  pathway: string;
  druggable: boolean;
}

interface PathwayCount {
  pathway: string;
  n_essential: number;
  total: number;
  pct: number;
}

interface CellLine {
  depmap_id: string;
  name: string;
  primary_disease: string;
  lineage: string;
  n_genes_screened: number;
  n_top_essential: number;
  n_druggable_top20: number;
  top_dependencies: Dependency[];
  top_pathways: PathwayCount[];
}

interface Lineage {
  id: string;
  name: string;
  n_cell_lines: number;
  cell_lines: CellLine[];
}

interface LineagesDb {
  version: string;
  generated: string;
  source: string;
  methodology: string;
  lineages: Lineage[];
}

const db = lineagesData as LineagesDb;

// ---------------------------------------------------------------------------
// Lookup helpers
// ---------------------------------------------------------------------------
export function listLineages(): Array<{ id: string; name: string; n_cell_lines: number }> {
  return db.lineages.map((l) => ({
    id: l.id,
    name: l.name,
    n_cell_lines: l.n_cell_lines,
  }));
}

export function listCellLines(lineageId?: string): Array<{
  depmap_id: string;
  name: string;
  primary_disease: string;
  lineage: string;
}> {
  const out: Array<{ depmap_id: string; name: string; primary_disease: string; lineage: string }> = [];
  const lineages = lineageId ? db.lineages.filter((l) => l.id === lineageId) : db.lineages;
  for (const l of lineages) {
    for (const c of l.cell_lines) {
      out.push({
        depmap_id: c.depmap_id,
        name: c.name,
        primary_disease: c.primary_disease,
        lineage: c.lineage,
      });
    }
  }
  return out;
}

export function findCellLineByName(query: string): { cell: CellLine; lineage: Lineage } | null {
  const q = query.trim().toLowerCase();
  for (const lineage of db.lineages) {
    for (const cell of lineage.cell_lines) {
      if (
        cell.name.toLowerCase() === q ||
        cell.depmap_id.toLowerCase() === q.toLowerCase()
      ) {
        return { cell, lineage };
      }
    }
  }
  return null;
}

export function findCellLineByDisease(query: string): Array<{ cell: CellLine; lineage: Lineage }> {
  const q = query.trim().toLowerCase();
  const matches: Array<{ cell: CellLine; lineage: Lineage }> = [];
  for (const lineage of db.lineages) {
    for (const cell of lineage.cell_lines) {
      if (
        cell.primary_disease.toLowerCase().includes(q) ||
        lineage.name.toLowerCase().includes(q) ||
        lineage.id.toLowerCase().includes(q)
      ) {
        matches.push({ cell, lineage });
      }
    }
  }
  return matches;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------
export interface GemDepmapQuery {
  cell_line?: string | null;
  lineage_id?: string | null;
  disease?: string | null;
  top_n?: number; // default 15
}

export interface GemDepmapResult {
  query: GemDepmapQuery;
  matches: number;
  results: Array<{
    depmap_id: string;
    cell_line: string;
    primary_disease: string;
    lineage: string;
    n_druggable_top20: number;
    top_dependencies: Dependency[];
    top_pathways: PathwayCount[];
  }>;
  summary: {
    n_lineages: number;
    n_cell_lines: number;
    mean_druggable_top20: number;
    most_common_pathway: string;
  };
}

export function queryGemDepmap(input: GemDepmapQuery): GemDepmapResult {
  const topN = input.top_n || 15;
  const results: GemDepmapResult["results"] = [];

  if (input.cell_line) {
    const found = findCellLineByName(input.cell_line);
    if (found) {
      results.push({
        depmap_id: found.cell.depmap_id,
        cell_line: found.cell.name,
        primary_disease: found.cell.primary_disease,
        lineage: found.cell.lineage,
        n_druggable_top20: found.cell.n_druggable_top20,
        top_dependencies: found.cell.top_dependencies.slice(0, topN),
        top_pathways: found.cell.top_pathways,
      });
    }
  } else if (input.lineage_id) {
    const lineage = db.lineages.find((l) => l.id === input.lineage_id);
    if (lineage) {
      for (const cell of lineage.cell_lines) {
        results.push({
          depmap_id: cell.depmap_id,
          cell_line: cell.name,
          primary_disease: cell.primary_disease,
          lineage: cell.lineage,
          n_druggable_top20: cell.n_druggable_top20,
          top_dependencies: cell.top_dependencies.slice(0, topN),
          top_pathways: cell.top_pathways,
        });
      }
    }
  } else if (input.disease) {
    const found = findCellLineByDisease(input.disease);
    for (const f of found) {
      results.push({
        depmap_id: f.cell.depmap_id,
        cell_line: f.cell.name,
        primary_disease: f.cell.primary_disease,
        lineage: f.cell.lineage,
        n_druggable_top20: f.cell.n_druggable_top20,
        top_dependencies: f.cell.top_dependencies.slice(0, topN),
        top_pathways: f.cell.top_pathways,
      });
    }
  } else {
    // Default: return A549 (lung adenocarcinoma reference)
    const found = findCellLineByName("A549");
    if (found) {
      results.push({
        depmap_id: found.cell.depmap_id,
        cell_line: found.cell.name,
        primary_disease: found.cell.primary_disease,
        lineage: found.cell.lineage,
        n_druggable_top20: found.cell.n_druggable_top20,
        top_dependencies: found.cell.top_dependencies.slice(0, topN),
        top_pathways: found.cell.top_pathways,
      });
    }
  }

  // Compute summary stats across all matches
  const allCells = db.lineages.flatMap((l) => l.cell_lines);
  const pathwayCounts: Record<string, number> = {};
  for (const c of allCells) {
    for (const p of c.top_pathways) {
      if (p.pct >= 50) {
        pathwayCounts[p.pathway] = (pathwayCounts[p.pathway] || 0) + 1;
      }
    }
  }
  const sortedPathways = Object.entries(pathwayCounts).sort((a, b) => b[1] - a[1]);
  const mostCommonPathway = sortedPathways.length > 0 ? sortedPathways[0][0] : "n/a";

  return {
    query: input,
    matches: results.length,
    results,
    summary: {
      n_lineages: db.lineages.length,
      n_cell_lines: allCells.length,
      mean_druggable_top20: Math.round(
        (allCells.reduce((s, c) => s + c.n_druggable_top20, 0) / allCells.length) * 10
      ) / 10,
      most_common_pathway: mostCommonPathway,
    },
  };
}

// ---------------------------------------------------------------------------
// Database metadata
// ---------------------------------------------------------------------------
export function getDatabaseInfo() {
  return {
    version: db.version,
    generated: db.generated,
    source: db.source,
    methodology: db.methodology,
    n_lineages: db.lineages.length,
    n_cell_lines: db.lineages.reduce((s, l) => s + l.cell_lines.length, 0),
  };
}
