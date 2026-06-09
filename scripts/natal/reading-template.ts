// Assembles the reading: real facts from astrology.ts, phrased via the variant banks in
// data.ts, with every choice made deterministically from a seed of the birth details
// (rng.ts). No AI, no Math.random — same details always produce the same reading, and the
// chosen theme can never change a word.
import type { BirthInput, NatalChart } from "./natal-chart";
import { computeMetrics, numWord, ASPECT_VERB, type ChartMetrics } from "./astrology";
import {
  SIGN_VIBES, SIGN_BLURBS, PLANET_THEMES, HOUSE_THEMES,
  ELEMENT_PROFILE, MODALITY_PROFILE, POLARITY_PROFILE,
  ASPECT_NOTES, RETROGRADE_NOTES, STELLIUM_NOTES, OPENERS, LUCKY_TOYS,
  SIGNATURE_LINES,
} from "./data";
import { seedFromInput, pickFor, pickN } from "./rng";

export interface Reading {
  title: string;
  cosmicSnapshot: string;
  // short captions (used on the certificate Big Three cards)
  sunNote: string;
  moonNote: string;
  risingNote: string;
  // section bodies
  sun: string;
  moon: string;
  rising: string;
  elementalNature: string;
  operatingStyle: string;
  chartRuler: string | null;     // null when birth time unknown
  loveAndPlay: string;
  standoutAspect: string;
  quirk: string | null;          // stellium / retrograde flourish when present
  luckyToy: string;
  starRating: number;            // 1-5, deterministic
  cosmicSignature: string;       // the memorable closing line
  metrics: ChartMetrics;         // exposed so the UI can show element/modality badges
}

export function buildReading(pet: BirthInput, chart: NatalChart): Reading {
  const seed = seedFromInput(pet);
  const m = computeMetrics(chart);
  const name = pet.name.trim();
  const species = pet.species.toLowerCase();
  const breedBit = pet.breed.trim() ? pet.breed.trim() + " " : "";
  const vars = { name, species };

  const sun = chart.sun.sign, moon = chart.moon.sign;
  const rising = chart.ascendant?.sign ?? null;

  // ---- short vibes (also the certificate captions) ----
  const sunNote = pickFor(seed, "vibe.sun." + sun, SIGN_VIBES[sun]);
  const moonNote = pickFor(seed, "vibe.moon." + moon, SIGN_VIBES[moon]);
  const risingNote = rising ? pickFor(seed, "vibe.rising." + rising, SIGN_VIBES[rising]) : "add birth time to reveal";

  // ---- cosmic snapshot ----
  const opener = fill(pickFor(seed, "snapshot.opener", OPENERS), vars);
  const cosmicSnapshot =
    `${opener} As a ${breedBit}${species} with the Sun in ${sun}, the Moon in ${moon}` +
    (rising ? `, and ${rising} rising` : "") +
    `, they're ${sunNote} with a heart that's ${moonNote}.`;

  // ---- Big Three sections (pronouns here; the name is anchored elsewhere) ----
  const sunSec = `☉ Sun in ${sun} — their ${PLANET_THEMES.Sun}. ${cap(pickFor(seed, "blurb.sun." + sun, SIGN_BLURBS[sun]))}`;
  const moonSec = `☽ Moon in ${moon} — ${PLANET_THEMES.Moon}. Underneath it all, they're ${pickFor(seed, "blurb.moon." + moon, SIGN_BLURBS[moon])}`;
  const risingSec = rising
    ? `↑ ${rising} Rising — the first impression they make. ${cap(pickFor(seed, "blurb.rising." + rising, SIGN_BLURBS[rising]))}`
    : `↑ Rising — unknown ✦ Add ${name}'s birth time to unlock the Ascendant, the houses, and the chart ruler — the full picture of how they meet the world.`;

  // ---- elemental nature (real: weighted element balance) ----
  const el = m.element;
  let elementalNature = `${el.dominant} is the loudest element here — they're ${pickFor(seed, "element." + el.dominant, ELEMENT_PROFILE[el.dominant].dominant)}`;
  if (el.lacking && el.lacking !== el.dominant) {
    elementalNature += ` There's barely a trace of ${el.lacking}, leaving them ${pickFor(seed, "element.lack." + el.lacking, ELEMENT_PROFILE[el.lacking].lacking)}`;
  }

  // ---- operating style (real: modality balance + polarity) ----
  const md = m.modality;
  let operatingStyle = `Mostly ${md.dominant} — they're ${pickFor(seed, "modality." + md.dominant, MODALITY_PROFILE[md.dominant].dominant)}`;
  const polKey = m.polarity.balanced ? "balanced" : m.polarity.leaning;
  const polBank = polKey === "Yang" ? POLARITY_PROFILE.Yang : polKey === "Yin" ? POLARITY_PROFILE.Yin : POLARITY_PROFILE.balanced;
  operatingStyle += ` On balance, they're ${pickFor(seed, "polarity", polBank)}`;

  // ---- chart ruler (real: ruler of the rising sign) ----
  let chartRuler: string | null = null;
  if (m.chartRuler) {
    const cr = m.chartRuler;
    const houseBit = cr.house ? `, sitting in the house of ${HOUSE_THEMES[cr.house]}` : "";
    chartRuler = `Their chart ruler is ${cr.planet} — it governs that ${chart.ascendant!.sign} rising — now placed in ${cr.sign}${houseBit}. Think of it as the quiet engine behind everything they do.`;
  }

  // ---- love & play (Venus + Mars) — the mid-reading name anchor ----
  const mars = chart.placements.find((p) => p.body === "Mars")!;
  const venus = chart.placements.find((p) => p.body === "Venus")!;
  // When Mars and Venus share a sign, draw two *distinct* variants so the line doesn't echo.
  let marsVibe: string, venusVibe: string;
  if (mars.sign === venus.sign) {
    const [a, b] = pickN(seed, "vibe.loveplay." + mars.sign, SIGN_VIBES[mars.sign], 2);
    marsVibe = a; venusVibe = b ?? a;
  } else {
    marsVibe = pickFor(seed, "vibe.mars." + mars.sign, SIGN_VIBES[mars.sign]);
    venusVibe = pickFor(seed, "vibe.venus." + venus.sign, SIGN_VIBES[venus.sign]);
  }
  const loveAndPlay =
    `♂ Mars in ${mars.sign} powers the play style${mars.house ? ` (loudest in ${HOUSE_THEMES[mars.house]})` : ""} — at full tilt they're ${marsVibe}. ` +
    `♀ Venus in ${venus.sign} runs the affection, and in love ${name} is ${venusVibe}.`;

  // ---- standout aspect (real: tightest by orb) ----
  let standoutAspect: string;
  if (m.aspects.length) {
    const a = m.aspects[0];
    const pairKey = [a.a, a.b].sort().join("-");
    const note = ASPECT_NOTES.byPair[pairKey]
      ? pickFor(seed, "aspect.pair." + pairKey, ASPECT_NOTES.byPair[pairKey])
      : pickFor(seed, "aspect." + (a.hard ? "hard" : "soft"), a.hard ? ASPECT_NOTES.hard : ASPECT_NOTES.soft);
    standoutAspect = `${cap(a.a)} ${ASPECT_VERB[a.type] ?? a.type} ${cap(a.b)} (orb ${a.orb.toFixed(1)}°) — ${note}`;
  } else {
    standoutAspect = `${name}'s planets mostly keep to themselves — few tight aspects, which tends to make for an uncomplicated, easygoing temperament.`;
  }

  // ---- quirk: a stellium or retrograde flourish, when the chart has one ----
  let quirk: string | null = null;
  if (m.stelliums.length) {
    const s = m.stelliums[0];
    const where = s.kind === "sign" ? s.where : `the ${ordinal(Number(s.where))} house`;
    quirk = `Stellium alert — ${numWord(s.planets.length)} planets crowded into ${where} (${s.planets.join(", ")}). ${pickFor(seed, "stellium", STELLIUM_NOTES)}`;
  } else {
    const r = m.retrogrades.find((x) => RETROGRADE_NOTES[x]);
    if (r) quirk = `They were ${pickFor(seed, "retro." + r, RETROGRADE_NOTES[r])}`;
  }

  // ---- closing signature (the memorable line) ----
  const sig = m.signature;
  const cosmicSignature = fill(pickFor(seed, "signature." + sig.type, SIGNATURE_LINES[sig.type]), {
    name, descriptor: sig.descriptor, detail: sig.detail,
  });

  return {
    title: `${name}'s Natal Chart`,
    cosmicSnapshot,
    sunNote, moonNote, risingNote,
    sun: sunSec, moon: moonSec, rising: risingSec,
    elementalNature, operatingStyle, chartRuler,
    loveAndPlay, standoutAspect, quirk,
    luckyToy: `Lucky toy: ${pickFor(seed, "toy." + sun, LUCKY_TOYS[sun])}.`,
    starRating: 5,    // every pet is a 5-star pet — this is a keepsake, never a verdict
    cosmicSignature,
    metrics: m,
  };
}

// ---- small text helpers ----
function fill(t: string, vars: Record<string, string>): string {
  return t.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");
}
function cap(s: string): string { return s.charAt(0).toUpperCase() + s.slice(1); }
function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"], v = n % 100;
  return n + (s[(v - 20) % 10] ?? s[v] ?? s[0]);
}
