// The "real info" layer: standard Western-astrology derivations over a computed chart.
// Everything here is FACT, derived only from the placements — name-independent and
// identical for a given chart. The reading-template phrases these facts; it never
// invents a placement the chart doesn't have.
//
// Techniques (all standard; see plan sources):
//  - element / modality / polarity balance with a weighted tally (luminaries + Asc
//    count more than outer planets)
//  - chart ruler = ruler of the Ascendant sign
//  - dominant planet via a weighted point score (rulerships + dignity + aspects)
//  - stelliums (3+ in a sign or house), retrogrades, and aspects ranked by orb
//  - a single "signature": the rarest / most defining feature of the chart

import type { NatalChart, Aspect } from "./natal-chart";
import type { SignName } from "./data";

export type Element = "Fire" | "Earth" | "Air" | "Water";
export type Modality = "Cardinal" | "Fixed" | "Mutable";
export type Polarity = "Yang" | "Yin";

export interface SignInfo {
  element: Element;
  modality: Modality;
  polarity: Polarity;     // Fire/Air = Yang (outward), Earth/Water = Yin (inward)
  ruler: string;          // modern ruling planet (label, e.g. "Mars")
  rulerTrad: string;      // traditional ruling planet
}

// Canonical, textbook sign attributes.
export const SIGN_INFO: Record<SignName, SignInfo> = {
  Aries:       { element: "Fire",  modality: "Cardinal", polarity: "Yang", ruler: "Mars",    rulerTrad: "Mars" },
  Taurus:      { element: "Earth", modality: "Fixed",    polarity: "Yin",  ruler: "Venus",   rulerTrad: "Venus" },
  Gemini:      { element: "Air",   modality: "Mutable",  polarity: "Yang", ruler: "Mercury", rulerTrad: "Mercury" },
  Cancer:      { element: "Water", modality: "Cardinal", polarity: "Yin",  ruler: "Moon",    rulerTrad: "Moon" },
  Leo:         { element: "Fire",  modality: "Fixed",    polarity: "Yang", ruler: "Sun",     rulerTrad: "Sun" },
  Virgo:       { element: "Earth", modality: "Mutable",  polarity: "Yin",  ruler: "Mercury", rulerTrad: "Mercury" },
  Libra:       { element: "Air",   modality: "Cardinal", polarity: "Yang", ruler: "Venus",   rulerTrad: "Venus" },
  Scorpio:     { element: "Water", modality: "Fixed",    polarity: "Yin",  ruler: "Pluto",   rulerTrad: "Mars" },
  Sagittarius: { element: "Fire",  modality: "Mutable",  polarity: "Yang", ruler: "Jupiter", rulerTrad: "Jupiter" },
  Capricorn:   { element: "Earth", modality: "Cardinal", polarity: "Yin",  ruler: "Saturn",  rulerTrad: "Saturn" },
  Aquarius:    { element: "Air",   modality: "Fixed",    polarity: "Yang", ruler: "Uranus",  rulerTrad: "Saturn" },
  Pisces:      { element: "Water", modality: "Mutable",  polarity: "Yin",  ruler: "Neptune", rulerTrad: "Jupiter" },
};

// Weight a body contributes to the element/modality tally. Luminaries + Ascendant are
// the loudest voices in a chart; outer planets (generational) the quietest.
const BODY_WEIGHT: Record<string, number> = {
  Sun: 3, Moon: 3, Ascendant: 3,
  Mercury: 2, Venus: 2, Mars: 2,
  Jupiter: 1, Saturn: 1, Uranus: 1, Neptune: 1, Pluto: 1,
};

const NUM_WORD = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
export const numWord = (n: number): string => NUM_WORD[n] ?? String(n);

export interface Balance<K extends string> {
  counts: Record<K, number>;   // weighted
  pct: Record<K, number>;      // share of total, 0-1
  dominant: K;
  dominantPct: number;
  lacking: K | null;           // present but very weak, or entirely absent
  strong: boolean;             // dominant share >= 0.5 (a defining emphasis)
}

export interface AspectRanked extends Aspect {
  hard: boolean;               // conjunction/square/opposition vs trine/sextile
}

export type SignatureType =
  | "stellium" | "tightAspect" | "elementDominant" | "modalityDominant"
  | "retrograde" | "bigThree";

export interface Signature {
  type: SignatureType;
  descriptor: string;          // raw fact, e.g. "four planets stacked in Leo"
  detail: string;              // a short pet-agnostic gloss of what it means
}

export interface ChartMetrics {
  element: Balance<Element>;
  modality: Balance<Modality>;
  polarity: { yang: number; yin: number; leaning: Polarity; balanced: boolean };
  chartRuler: { planet: string; sign: SignName; house: number | null } | null;
  dominantPlanet: { planet: string; score: number };
  stelliums: { kind: "sign" | "house"; where: string; planets: string[] }[];
  retrogrades: string[];       // planet labels, e.g. ["Mercury", "Saturn"]
  aspects: AspectRanked[];     // tightest first
  signature: Signature;
}

const HARD = new Set(["conjunction", "square", "opposition"]);
const PERSONAL = new Set(["Sun", "Moon", "Mercury", "Venus", "Mars"]);

// Aspect name as a relational verb ("Moon conjunct Mars", not "Moon conjunction Mars").
export const ASPECT_VERB: Record<string, string> = {
  conjunction: "conjunct", opposition: "opposite", square: "square", trine: "trine", sextile: "sextile",
};

function balance<K extends string>(counts: Record<K, number>): Balance<K> {
  const keys = Object.keys(counts) as K[];
  const total = keys.reduce((s, k) => s + counts[k], 0) || 1;
  const pct = {} as Record<K, number>;
  for (const k of keys) pct[k] = counts[k] / total;
  let dominant = keys[0];
  for (const k of keys) if (counts[k] > counts[dominant]) dominant = k;
  let least = keys[0];
  for (const k of keys) if (counts[k] < counts[least]) least = k;
  const lacking = pct[least] <= 0.12 ? least : null;
  return { counts, pct, dominant, dominantPct: pct[dominant], lacking, strong: pct[dominant] >= 0.5 };
}

export function computeMetrics(chart: NatalChart): ChartMetrics {
  // ---- bodies we tally: the 10 planets (+ Ascendant when the time is known) ----
  const tallyBodies: { label: string; sign: SignName }[] = chart.placements.map((p) => ({ label: p.body, sign: p.sign }));
  if (chart.ascendant) tallyBodies.push({ label: "Ascendant", sign: chart.ascendant.sign });

  // ---- element / modality / polarity balance (weighted) ----
  const eCounts: Record<Element, number> = { Fire: 0, Earth: 0, Air: 0, Water: 0 };
  const mCounts: Record<Modality, number> = { Cardinal: 0, Fixed: 0, Mutable: 0 };
  let yang = 0, yin = 0;
  for (const b of tallyBodies) {
    const w = BODY_WEIGHT[b.label] ?? 1;
    const info = SIGN_INFO[b.sign];
    eCounts[info.element] += w;
    mCounts[info.modality] += w;
    if (info.polarity === "Yang") yang += w; else yin += w;
  }
  const element = balance(eCounts);
  const modality = balance(mCounts);
  const polarity = { yang, yin, leaning: (yang >= yin ? "Yang" : "Yin") as Polarity, balanced: Math.abs(yang - yin) <= 1 };

  // ---- chart ruler (ruler of the rising sign) ----
  let chartRuler: ChartMetrics["chartRuler"] = null;
  if (chart.ascendant) {
    const rulerLabel = SIGN_INFO[chart.ascendant.sign].ruler;
    const rp = chart.placements.find((p) => p.body === rulerLabel);
    if (rp) chartRuler = { planet: rulerLabel, sign: rp.sign, house: rp.house };
  }

  // ---- dominant planet (weighted point score) ----
  const aspectCountByLabel: Record<string, number> = {};
  for (const a of chart.aspects) {
    aspectCountByLabel[cap(a.a)] = (aspectCountByLabel[cap(a.a)] ?? 0) + 1;
    aspectCountByLabel[cap(a.b)] = (aspectCountByLabel[cap(a.b)] ?? 0) + 1;
  }
  const sunSign = chart.sun.sign, moonSign = chart.moon.sign;
  let dom = { planet: "Sun", score: -Infinity };
  for (const p of chart.placements) {
    let score = 0;
    if (p.body === "Sun") score += 3;
    if (p.body === "Moon") score += 3;
    if (chartRuler && p.body === chartRuler.planet) score += 5;           // rules the Ascendant
    if (p.body === SIGN_INFO[sunSign].ruler) score += 3;                  // rules the Sun sign
    if (p.body === SIGN_INFO[moonSign].ruler) score += 3;                 // rules the Moon sign
    if (SIGN_INFO[p.sign].ruler === p.body) score += 3;                   // in domicile (own sign)
    score += aspectCountByLabel[p.body] ?? 0;                             // well-aspected = loud
    if (score > dom.score) dom = { planet: p.body, score };
  }

  // ---- stelliums (3+ in a sign, or 3+ in a house) ----
  const stelliums: ChartMetrics["stelliums"] = [];
  const bySign: Record<string, string[]> = {};
  for (const p of chart.placements) (bySign[p.sign] ??= []).push(p.body);
  for (const [sign, planets] of Object.entries(bySign)) if (planets.length >= 3) stelliums.push({ kind: "sign", where: sign, planets });
  if (chart.hasTime) {
    const byHouse: Record<number, string[]> = {};
    for (const p of chart.placements) if (p.house) (byHouse[p.house] ??= []).push(p.body);
    for (const [house, planets] of Object.entries(byHouse)) if (planets.length >= 3) stelliums.push({ kind: "house", where: house, planets });
  }
  stelliums.sort((a, b) => b.planets.length - a.planets.length);

  // ---- retrogrades ----
  const retrogrades = chart.placements.filter((p) => p.retrograde).map((p) => p.body);

  // ---- aspects ranked tight-first ----
  const aspects: AspectRanked[] = [...chart.aspects]
    .map((a) => ({ ...a, hard: HARD.has(a.type) }))
    .sort((x, y) => x.orb - y.orb);

  return {
    element, modality, polarity, chartRuler,
    dominantPlanet: { planet: dom.planet, score: dom.score },
    stelliums, retrogrades, aspects,
    signature: pickSignature({ element, modality, stelliums, retrogrades, aspects, chart }),
  };
}

// The single most distinctive feature, by rarity priority. Returned as raw facts; the
// reading-template wraps these in the warm/cheeky closing line.
function pickSignature(x: {
  element: Balance<Element>; modality: Balance<Modality>;
  stelliums: ChartMetrics["stelliums"]; retrogrades: string[];
  aspects: AspectRanked[]; chart: NatalChart;
}): Signature {
  const { element, modality, stelliums, retrogrades, aspects, chart } = x;

  if (stelliums.length) {
    const s = stelliums[0];
    const where = s.kind === "sign" ? `in ${s.where}` : `in the ${ordinal(Number(s.where))} house`;
    return {
      type: "stellium",
      descriptor: `${numWord(s.planets.length)} planets stacked ${where}`,
      detail: `a rare pile-up of energy all pointing the same direction`,
    };
  }

  const tight = aspects.find((a) => a.orb < 2);
  if (tight) {
    return {
      type: "tightAspect",
      descriptor: `${cap(tight.a)} ${ASPECT_VERB[tight.type] ?? tight.type} ${cap(tight.b)}`,
      detail: tight.hard ? `two forces locked together, all friction and fuel` : `two planets in easy, lifelong agreement`,
    };
  }

  if (element.strong) {
    return {
      type: "elementDominant",
      descriptor: `a ${element.dominant}-dominant chart`,
      detail: ELEMENT_GLOSS[element.dominant],
    };
  }
  if (modality.strong) {
    return {
      type: "modalityDominant",
      descriptor: `an overwhelmingly ${modality.dominant} chart`,
      detail: MODALITY_GLOSS[modality.dominant],
    };
  }

  const rxPersonal = retrogrades.find((r) => PERSONAL.has(r));
  if (rxPersonal) {
    return {
      type: "retrograde",
      descriptor: `${rxPersonal} retrograde`,
      detail: `a mind that runs its own way around the track`,
    };
  }

  // Fallback: the Big Three.
  const rising = chart.ascendant ? `, ${chart.ascendant.sign} rising` : "";
  return {
    type: "bigThree",
    descriptor: `a ${chart.sun.sign} Sun with a ${chart.moon.sign} Moon${rising}`,
    detail: `the exact recipe that makes them, them`,
  };
}

const ELEMENT_GLOSS: Record<Element, string> = {
  Fire: "pure spark, motion, and main-character energy",
  Earth: "grounded, sensory, and gloriously food-motivated",
  Air: "all curiosity, chatter, and busy little thoughts",
  Water: "deep feelings worn very close to the surface",
};
const MODALITY_GLOSS: Record<Modality, string> = {
  Cardinal: "the one who starts things",
  Fixed: "the one who will not be moved",
  Mutable: "the one who rolls with anything",
};

function cap(s: string): string { return s.charAt(0).toUpperCase() + s.slice(1); }
function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"], v = n % 100;
  return n + (s[(v - 20) % 10] ?? s[v] ?? s[0]);
}
