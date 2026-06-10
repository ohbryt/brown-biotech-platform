// src/lib/admet.ts
// ADMET prediction using openchemlib's MoleculeProperties + hand-rolled
// structural alerts via atom traversal.
//
// Strategy:
//   - Use MoleculeProperties (the GWT-exported class) for canonical
//     logP / HBA / HBD / TPSA / logS / rotatable bond count.
//   - Use atom traversal + simple bond-pattern checks for
//     structural alerts (hERG, PAINS).
//   - Apply Lipinski / Veber / Egan / BBB / Ghose rules on the
//     computed descriptors.

// @ts-ignore — openchemlib has no TypeScript default export
import OCL from "openchemlib";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface AdmetResult {
  name: string;
  smiles: string;
  canonical_smiles: string;
  valid: boolean;
  error?: string;
  descriptors: {
    mw: number;
    logp: number;
    hba: number;
    hbd: number;
    tpsa: number;
    rotb: number;
    aromatic_rings: number;
    heavy_atoms: number;
    formula: string;
    logS?: number;
  };
  rules: {
    lipinski: { pass: boolean; violations: string[] };
    veber: { pass: boolean; violations: string[] };
    egan: { pass: boolean; violations: string[] };
    bbb: { likely: boolean; reason: string };
    ghose: { pass: boolean };
  };
  alerts: {
    herg: { triggered: boolean; matches: string[] };
    pains: { triggered: boolean; matches: string[] };
  };
  risk_score: "low" | "medium" | "high";
}

export interface AdmetBatchInput {
  smiles: string[];
  names?: string[];
}

// ---------------------------------------------------------------------------
// Bond-centric molecule accessor (getAllConnAtoms returns count, not array)
// ---------------------------------------------------------------------------
interface MolView {
  mol: OCL.Molecule;
  nAtoms: number;
  nBonds: number;
  adj: number[][];
  bondOf: Record<string, number>;
  order: number[];
  isInRing: boolean[];
  ringAromatic: boolean[];
}

function view(mol: OCL.Molecule): MolView {
  const nAtoms = mol.getAllAtoms();
  const nBonds = mol.getAllBonds();
  const adj: number[][] = Array.from({ length: nAtoms }, () => []);
  const bondOf: Record<string, number> = {};
  const order: number[] = [];
  for (let i = 0; i < nBonds; i++) {
    const a = mol.getBondAtom(0, i);
    const b = mol.getBondAtom(1, i);
    adj[a].push(b);
    adj[b].push(a);
    bondOf[`${a}-${b}`] = i;
    order.push(mol.getBondOrder(i));
  }
  const isInRing = new Array<boolean>(nAtoms).fill(false);
  const ringAromatic = new Array<boolean>(nAtoms).fill(false);
  const ringSet = mol.getRingSet();
  if (ringSet) {
    const nR = ringSet.getSize();
    for (let r = 0; r < nR; r++) {
      const ringSize = ringSet.getRingSize(r);
      const ringAtoms: number[] = (ringSet.getRingAtoms(r) as number[]) || [];
      let aromaticRing = ringSize === 5 || ringSize === 6;
      for (let i = 0; i < ringAtoms.length && aromaticRing; i++) {
        const a = ringAtoms[i];
        const b = ringAtoms[(i + 1) % ringAtoms.length];
        const bi = bondOf[`${a}-${b}`];
        if (bi !== undefined) {
          if (order[bi] !== 1 && order[bi] !== 2) aromaticRing = false;
        }
      }
      for (const a of ringAtoms) {
        isInRing[a] = true;
        if (aromaticRing) ringAromatic[a] = true;
      }
    }
  }
  return { mol, nAtoms, nBonds, adj, bondOf, order, isInRing, ringAromatic };
}

// ---------------------------------------------------------------------------
// Structural alert detection (atom/bond traversal, no SMARTS needed)
// ---------------------------------------------------------------------------
function detectHergAlerts(v: MolView): string[] {
  const matches: string[] = [];
  // hERG: tertiary amine (protonatable, no amidic) + ≥2 aromatic rings
  let tertiaryAmines = 0;
  let aromaticRings = v.mol.getAromaticRingCount();
  for (let i = 0; i < v.nAtoms; i++) {
    if (v.mol.getAtomicNo(i) !== 7) continue;
    if (v.mol.getAtomCharge(i) >= 1) continue;
    if (v.mol.getImplicitHydrogens(i) !== 0) continue; // tertiary = H0
    // Check not amide/imine
    let isAmideOrImine = false;
    for (const n of v.adj[i]) {
      if (v.mol.getAtomicNo(n) === 6) {
        for (const nn of v.adj[n]) {
          if (v.mol.getAtomicNo(nn) === 8 && v.order[v.bondOf[`${n}-${nn}`]] === 2) {
            isAmideOrImine = true;
          }
        }
        if (v.order[v.bondOf[`${i}-${n}`]] === 2) isAmideOrImine = true;
        if (v.order[v.bondOf[`${i}-${n}`]] === 3) isAmideOrImine = true;
      }
    }
    if (!isAmideOrImine) tertiaryAmines++;
  }
  if (tertiaryAmines >= 1 && aromaticRings >= 2) {
    matches.push(`Tertiary amine (×${tertiaryAmines}) with ${aromaticRings} aromatic rings`);
  }
  if (aromaticRings >= 3) {
    matches.push(`High aromatic ring count (${aromaticRings}) — promiscuous binder risk`);
  }
  return matches;
}

function detectPainsAlerts(v: MolView): string[] {
  const matches: string[] = [];
  // Catechol / hydroquinone: 1,2 or 1,4 disubstituted benzene with OH/NH2
  const aromaticRingCount = v.mol.getAromaticRingCount();
  if (aromaticRingCount === 0) return matches;
  const ringSet = v.mol.getRingSet();
  if (!ringSet) return matches;
  const nR = ringSet.getSize();
  for (let r = 0; r < nR; r++) {
    const ringSize = ringSet.getRingSize(r);
    if (ringSize !== 6) continue;
    const ringAtoms: number[] = (ringSet.getRingAtoms(r) as number[]) || [];
    if (!ringAtoms.every((a) => v.ringAromatic[a])) continue;
    // Count polar substituents (OH or NH2 attached to ring)
    let polarSubs = 0;
    const polarIndices: number[] = [];
    for (const a of ringAtoms) {
      for (const n of v.adj[a]) {
        if (n < a) continue; // check once
        if (ringAtoms.includes(n)) continue;
        if (v.mol.getAtomicNo(n) === 8 && v.mol.getImplicitHydrogens(n) >= 1) {
          polarSubs++;
          polarIndices.push(a);
        }
        if (v.mol.getAtomicNo(n) === 7 && v.mol.getImplicitHydrogens(n) >= 2) {
          polarSubs++;
          polarIndices.push(a);
        }
      }
    }
    if (polarSubs >= 2) {
      // Check if ortho (1,2) or para (1,4) — if distance = 1 or 3
      const positions = polarIndices.map((a) => ringAtoms.indexOf(a)).sort((a, b) => a - b);
      let isOrthoOrPara = false;
      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          const diff = Math.abs(positions[i] - positions[j]);
          if (diff === 1 || diff === 3) isOrthoOrPara = true;
        }
      }
      if (isOrthoOrPara) matches.push(`Catechol/hydroquinone-like aromatic (${polarSubs} polar subs)`);
    }
  }
  // Naphthalene: 2 fused aromatic 6-rings
  let fusedAromatics = 0;
  for (let r = 0; r < nR; r++) {
    if (ringSet.getRingSize(r) === 6) {
      const ra: number[] = (ringSet.getRingAtoms(r) as number[]) || [];
      if (ra.every((a: number) => v.ringAromatic[a])) {
        // Check if shares atoms with another aromatic 6-ring
        for (let r2 = r + 1; r2 < nR; r2++) {
          if (ringSet.getRingSize(r2) !== 6) continue;
          const ra2: number[] = (ringSet.getRingAtoms(r2) as number[]) || [];
          if (!ra2.every((a: number) => v.ringAromatic[a])) continue;
          if (ra.filter((a: number) => ra2.includes(a)).length >= 2) {
            fusedAromatics++;
            break;
          }
        }
      }
    }
  }
  if (fusedAromatics >= 2) matches.push(`Polycyclic aromatic (${fusedAromatics} fused rings)`);

  return matches;
}

// ---------------------------------------------------------------------------
// Single-molecule analysis
// ---------------------------------------------------------------------------
function analyzeMolecule(smiles: string, name: string): AdmetResult {
  let mol: OCL.Molecule;
  try {
    mol = OCL.Molecule.fromSmiles(smiles);
  } catch (e: any) {
    return makeInvalid(name, smiles, `SMILES parse error: ${e.message || e}`);
  }
  if (!mol || mol.getAllAtoms() === 0) {
    return makeInvalid(name, smiles, "Empty molecule");
  }

  try {
    const v = view(mol);
    // MoleculeProperties gives the canonical logP/HBA/HBD/TPSA/logS
    let mp: any;
    try {
      mp = new OCL.MoleculeProperties(mol);
    } catch (e: any) {
      return makeInvalid(name, smiles, `MoleculeProperties error: ${e.message || e}`);
    }

    const mw = mol.getMolweight();
    const rotb = mol.getRotatableBondCount();
    const aromaticRings = mol.getAromaticRingCount();
    const heavyAtoms = v.nAtoms;
    const formula = mol.getMolecularFormula().formula;
    const canonical = mol.toSmiles();

    const logp = Math.round(mp.logP * 100) / 100;
    const hba = mp.acceptorCount;
    const hbd = mp.donorCount;
    const tpsa = Math.round(mp.polarSurfaceArea * 100) / 100;
    const logS = Math.round(mp.logS * 100) / 100;

    // Rules
    const lipinskiViolations: string[] = [];
    if (mw > 500) lipinskiViolations.push(`MW ${mw.toFixed(1)} > 500`);
    if (logp > 5) lipinskiViolations.push(`logP ${logp.toFixed(2)} > 5`);
    if (hba > 10) lipinskiViolations.push(`HBA ${hba} > 10`);
    if (hbd > 5) lipinskiViolations.push(`HBD ${hbd} > 5`);

    const veberViolations: string[] = [];
    if (rotb > 10) veberViolations.push(`RotB ${rotb} > 10`);
    if (tpsa > 140) veberViolations.push(`TPSA ${tpsa.toFixed(1)} > 140`);

    const eganViolations: string[] = [];
    if (logp < -1 || logp > 6) eganViolations.push(`logP ${logp.toFixed(2)} not in [-1, 6]`);
    if (tpsa > 131.6) eganViolations.push(`TPSA ${tpsa.toFixed(1)} > 131.6`);

    let bbb: { likely: boolean; reason: string };
    if (tpsa <= 90 && mw <= 400 && logp >= 1 && logp <= 4) {
      bbb = { likely: true, reason: "TPSA≤90, MW≤400, logP 1–4" };
    } else {
      const reasons: string[] = [];
      if (tpsa > 90) reasons.push(`TPSA ${tpsa.toFixed(1)} > 90`);
      if (mw > 400) reasons.push(`MW ${mw.toFixed(1)} > 400`);
      if (logp < 1 || logp > 4) reasons.push(`logP ${logp.toFixed(2)} outside 1–4`);
      bbb = { likely: false, reason: reasons.join("; ") || "Outside optimal BBB window" };
    }

    const ghosePass = mw >= 160 && mw <= 480 && logp >= -0.4 && logp <= 5.6 && heavyAtoms >= 20 && heavyAtoms <= 70;

    const hergMatches = detectHergAlerts(v);
    const painsMatches = detectPainsAlerts(v);

    let risk: "low" | "medium" | "high" = "low";
    let riskFactors = 0;
    if (lipinskiViolations.length >= 2) riskFactors += 2;
    else if (lipinskiViolations.length === 1) riskFactors += 1;
    if (veberViolations.length >= 1) riskFactors += 1;
    if (hergMatches.length >= 1) riskFactors += 1;
    if (painsMatches.length >= 1) riskFactors += 1;
    if (riskFactors >= 3) risk = "high";
    else if (riskFactors >= 1) risk = "medium";

    return {
      name,
      smiles,
      canonical_smiles: canonical,
      valid: true,
      descriptors: {
        mw: Math.round(mw * 100) / 100,
        logp,
        hba,
        hbd,
        tpsa,
        rotb,
        aromatic_rings: aromaticRings,
        heavy_atoms: heavyAtoms,
        formula,
        logS,
      },
      rules: {
        lipinski: { pass: lipinskiViolations.length === 0, violations: lipinskiViolations },
        veber: { pass: veberViolations.length === 0, violations: veberViolations },
        egan: { pass: eganViolations.length === 0, violations: eganViolations },
        bbb,
        ghose: { pass: ghosePass },
      },
      alerts: {
        herg: { triggered: hergMatches.length > 0, matches: hergMatches },
        pains: { triggered: painsMatches.length > 0, matches: painsMatches },
      },
      risk_score: risk,
    };
  } catch (e: any) {
    return makeInvalid(name, smiles, `Analysis error: ${e.message || e}`);
  }
}

function makeInvalid(name: string, smiles: string, error: string): AdmetResult {
  return {
    name,
    smiles,
    canonical_smiles: smiles,
    valid: false,
    error,
    descriptors: { mw: 0, logp: 0, hba: 0, hbd: 0, tpsa: 0, rotb: 0, aromatic_rings: 0, heavy_atoms: 0, formula: "" },
    rules: {
      lipinski: { pass: false, violations: ["Invalid"] },
      veber: { pass: false, violations: ["Invalid"] },
      egan: { pass: false, violations: ["Invalid"] },
      bbb: { likely: false, reason: "Invalid molecule" },
      ghose: { pass: false },
    },
    alerts: { herg: { triggered: false, matches: [] }, pains: { triggered: false, matches: [] } },
    risk_score: "high",
  };
}

// ---------------------------------------------------------------------------
// Batch API
// ---------------------------------------------------------------------------
export function runAdmetBatch(input: AdmetBatchInput): { results: AdmetResult[]; summary: any } {
  const { smiles, names = [] } = input;
  const results: AdmetResult[] = [];
  for (let i = 0; i < smiles.length; i++) {
    const name = names[i] || `mol_${i + 1}`;
    results.push(analyzeMolecule(smiles[i], name));
  }

  const valid = results.filter((r) => r.valid);
  const summary = {
    n_total: results.length,
    n_valid: valid.length,
    n_lipinski_pass: valid.filter((r) => r.rules.lipinski.pass).length,
    n_veber_pass: valid.filter((r) => r.rules.veber.pass).length,
    n_egan_pass: valid.filter((r) => r.rules.egan.pass).length,
    n_bbb_likely: valid.filter((r) => r.rules.bbb.likely).length,
    n_hERG_alert: valid.filter((r) => r.alerts.herg.triggered).length,
    n_PAIN_alert: valid.filter((r) => r.alerts.pains.triggered).length,
    n_high_risk: valid.filter((r) => r.risk_score === "high").length,
    mean_MW: valid.length ? Math.round((valid.reduce((s, r) => s + r.descriptors.mw, 0) / valid.length) * 10) / 10 : 0,
    mean_logP: valid.length ? Math.round((valid.reduce((s, r) => s + r.descriptors.logp, 0) / valid.length) * 100) / 100 : 0,
  };
  return { results, summary };
}
