// Offline terminal harness for the reading engine. No API, no Stripe, no web.
// Run:  npx tsx scripts/natal/cli.ts
//       npx tsx scripts/natal/cli.ts --name Luna --species cat --breed Tabby --date 2022-03-09 --time 14:20 --city london
//       npx tsx scripts/natal/cli.ts --name Rex --species dog --date 2021-07-15 --city austin   (no --time => unknown)
//       npx tsx scripts/natal/cli.ts --svg --theme aurora --photo ./pic.jpg
//       npx tsx scripts/natal/cli.ts --fuzz 200      (coverage + determinism self-test)
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { computeNatalChart, type BirthInput } from "./natal-chart";
import { buildReading, type Reading } from "./reading-template";
import { renderCertificateSVG, type ThemeName } from "./render-svg";
import { SIGN_GLYPHS, PLANET_GLYPHS } from "./data";

// Small offline coordinate map — just for the terminal harness. The web app uses live
// Open-Meteo geocoding instead, so this stays out of the shared data bank.
const CITY: Record<string, { lat: number; long: number; label: string }> = {
  austin: { lat: 30.2672, long: -97.7431, label: "Austin, USA" },
  "new york": { lat: 40.7128, long: -74.006, label: "New York, USA" },
  "los angeles": { lat: 34.0522, long: -118.2437, label: "Los Angeles, USA" },
  london: { lat: 51.5074, long: -0.1278, label: "London, UK" },
  toronto: { lat: 43.6532, long: -79.3832, label: "Toronto, Canada" },
  sydney: { lat: -33.8688, long: 151.2093, label: "Sydney, Australia" },
  berlin: { lat: 52.52, long: 13.405, label: "Berlin, Germany" },
  paris: { lat: 48.8566, long: 2.3522, label: "Paris, France" },
  helsinki: { lat: 60.1699, long: 24.9384, label: "Helsinki, Finland" },
};

async function loadPhoto(arg?: string): Promise<string | undefined> {
  if (!arg || arg === "true") return undefined;
  if (/^https?:\/\//i.test(arg)) {
    const res = await fetch(arg);
    const buf = Buffer.from(await res.arrayBuffer());
    const mime = res.headers.get("content-type") || "image/jpeg";
    return `data:${mime};base64,${buf.toString("base64")}`;
  }
  const buf = readFileSync(arg);
  const ext = arg.split(".").pop()?.toLowerCase();
  const mime = ext === "png" ? "image/png" : ext === "webp" ? "image/webp" : "image/jpeg";
  return `data:${mime};base64,${buf.toString("base64")}`;
}

function parseArgs(argv: string[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith("--")) {
      const key = argv[i].slice(2);
      const val = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : "true";
      out[key] = val;
    }
  }
  return out;
}

function resolveCity(name: string) {
  const hit = CITY[name.trim().toLowerCase()];
  if (!hit) throw new Error(`Unknown city "${name}". CLI knows: ${Object.keys(CITY).join(", ")}.`);
  return hit;
}

function buildInput(args: Record<string, string>): BirthInput {
  const name = args.name ?? "Rex";
  const species = args.species ?? "dog";
  const breed = args.breed ?? "Golden Retriever";
  const dateStr = args.date ?? "2021-07-15";
  const timeStr = args.time ?? "09:30";
  const cityName = args.city ?? "austin";

  const [year, month, day] = dateStr.split("-").map(Number);
  const hasTime = "time" in args ? args.time !== "true" : true;
  const [hour, minute] = hasTime ? timeStr.split(":").map(Number) : [null, null];

  const city = resolveCity(cityName);
  return {
    name, species, breed, year, month, day,
    hour: hour as number | null, minute: minute as number | null,
    latitude: city.lat, longitude: city.long, cityLabel: city.label,
  };
}

function printChart(pet: BirthInput, chart: ReturnType<typeof computeNatalChart>, reading: Reading) {
  const line = "─".repeat(60);
  console.log(line);
  console.log(`  ${pet.name.toUpperCase()}  ·  ${pet.breed} ${pet.species}  ·  ${pet.cityLabel}`);
  console.log(`  Born ${pet.year}-${pad(pet.month)}-${pad(pet.day)}` +
    (chart.hasTime ? ` at ${pad(pet.hour!)}:${pad(pet.minute!)}` : "  (birth time unknown)"));
  console.log(line);
  console.log("  PLACEMENTS");
  for (const p of chart.placements) {
    const house = p.house ? `  house ${p.house}` : "";
    const retro = p.retrograde ? "  ℞" : "";
    console.log(`   ${PLANET_GLYPHS[p.body] ?? " "}  ${p.body.padEnd(9)} ${SIGN_GLYPHS[p.sign]} ${p.sign.padEnd(12)} ${p.degree.padEnd(8)}${house}${retro}`);
  }
  if (chart.ascendant) {
    console.log(`   Asc ${"Ascendant".padEnd(9)} ${SIGN_GLYPHS[chart.ascendant.sign]} ${chart.ascendant.sign.padEnd(12)} ${chart.ascendant.degree}`);
  } else {
    console.log("   Asc / Houses — unavailable (no birth time)");
  }
  // verification readout — the real, computed metrics
  const mx = reading.metrics;
  console.log(line);
  console.log("  CHART METRICS (the real, computed facts)");
  console.log(`   Element : dominant ${mx.element.dominant} ${(mx.element.dominantPct * 100).toFixed(0)}%` +
    (mx.element.lacking ? `, lacking ${mx.element.lacking}` : "") + (mx.element.strong ? "  [STRONG]" : ""));
  console.log(`   Modality: dominant ${mx.modality.dominant} ${(mx.modality.dominantPct * 100).toFixed(0)}%` + (mx.modality.strong ? "  [STRONG]" : ""));
  console.log(`   Polarity: ${mx.polarity.leaning}${mx.polarity.balanced ? " (balanced)" : ""}  ·  Dominant planet: ${mx.dominantPlanet.planet}`);
  if (mx.chartRuler) console.log(`   Chart ruler: ${mx.chartRuler.planet} in ${mx.chartRuler.sign}${mx.chartRuler.house ? ` (house ${mx.chartRuler.house})` : ""}`);
  if (mx.stelliums.length) console.log(`   Stellium: ${mx.stelliums.map((s) => `${s.planets.length} in ${s.where}`).join("; ")}`);
  if (mx.retrogrades.length) console.log(`   Retrograde: ${mx.retrogrades.join(", ")}`);
  if (mx.aspects.length) console.log(`   Tightest aspect: ${cap(mx.aspects[0].a)} ${mx.aspects[0].type} ${cap(mx.aspects[0].b)} (orb ${mx.aspects[0].orb.toFixed(2)}°)`);
  console.log(`   Signature: [${mx.signature.type}] ${mx.signature.descriptor}`);
  console.log(line);
}

function printReading(reading: Reading) {
  const stars = "★".repeat(reading.starRating) + "☆".repeat(5 - reading.starRating);
  console.log(`\n  ${reading.title}   ${stars}\n`);
  const wrap = (label: string, body: string | null) => {
    if (!body) return;
    console.log(`  ▸ ${label}`);
    console.log(reflow(body, 66, "    "));
    console.log("");
  };
  wrap("Cosmic Snapshot", reading.cosmicSnapshot);
  wrap("Sun", reading.sun);
  wrap("Moon", reading.moon);
  wrap("Rising", reading.rising);
  wrap("Elemental Nature", reading.elementalNature);
  wrap("How They Operate", reading.operatingStyle);
  wrap("Chart Ruler", reading.chartRuler);
  wrap("Love & Play", reading.loveAndPlay);
  wrap("Standout Aspect", reading.standoutAspect);
  wrap("Quirk", reading.quirk);
  console.log(`  ${reading.luckyToy}\n`);
  console.log("  ✦ COSMIC SIGNATURE");
  console.log(reflow(reading.cosmicSignature, 66, "    "));
  console.log("");
}

function pad(n: number): string { return String(n).padStart(2, "0"); }
function cap(s: string): string { return s.charAt(0).toUpperCase() + s.slice(1); }

function reflow(text: string, width: number, indent: string): string {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > width) { lines.push(cur); cur = w; }
    else { cur = (cur + " " + w).trim(); }
  }
  if (cur) lines.push(cur);
  return lines.map((l) => indent + l).join("\n");
}

// ---------- self-test: coverage + determinism ----------
const NAMES = ["Goldie", "Luna", "Milo", "Bella", "Ziggy", "Pixel", "Biscuit", "Nova"];
const SPECIES = ["dog", "cat"];
const BREEDS = ["", "Tabby", "Golden Retriever", "Corgi", "Siamese", "Mutt"];
const CITY_KEYS = Object.keys(CITY);

function randomInput(rnd: () => number): BirthInput {
  const c = CITY[CITY_KEYS[Math.floor(rnd() * CITY_KEYS.length)]];
  const hasTime = rnd() > 0.25; // exercise the unknown-time path ~25% of the time
  return {
    name: NAMES[Math.floor(rnd() * NAMES.length)],
    species: SPECIES[Math.floor(rnd() * SPECIES.length)],
    breed: BREEDS[Math.floor(rnd() * BREEDS.length)],
    year: 2008 + Math.floor(rnd() * 18),
    month: 1 + Math.floor(rnd() * 12),
    day: 1 + Math.floor(rnd() * 28),
    hour: hasTime ? Math.floor(rnd() * 24) : null,
    minute: hasTime ? Math.floor(rnd() * 60) : null,
    latitude: c.lat, longitude: c.long, cityLabel: c.label,
  };
}

const STRING_FIELDS: (keyof Reading)[] = [
  "title", "cosmicSnapshot", "sunNote", "moonNote", "risingNote",
  "sun", "moon", "rising", "elementalNature", "operatingStyle",
  "loveAndPlay", "standoutAspect", "luckyToy", "cosmicSignature",
];

function fuzz(n: number) {
  let seed = 1234567;
  const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
  let failures = 0;
  const sigSeen = new Set<string>();
  for (let i = 0; i < n; i++) {
    const pet = randomInput(rnd);
    const chart = computeNatalChart(pet);
    const r = buildReading(pet, chart);

    // coverage: no empty/undefined string fields; placeholders all filled
    for (const f of STRING_FIELDS) {
      const v = r[f] as unknown as string;
      if (!v || /undefined|\{[a-z]+\}/i.test(v)) {
        console.error(`  ✗ [${i}] field "${String(f)}" bad: ${JSON.stringify(v)}  (pet=${pet.name} ${pet.year}-${pet.month}-${pet.day})`);
        failures++;
      }
    }
    sigSeen.add(r.metrics.signature.type);

    // determinism: rebuilding the same input is byte-identical
    const again = buildReading(pet, computeNatalChart(pet));
    if (JSON.stringify(again) !== JSON.stringify(r)) {
      console.error(`  ✗ [${i}] NON-DETERMINISTIC for ${pet.name}`);
      failures++;
    }
  }
  console.log(`\n  Fuzz ${n} charts — signature types hit: ${[...sigSeen].sort().join(", ")}`);
  if (failures === 0) console.log(`  ✓ All ${n} charts fully covered, all placeholders filled, all deterministic.\n`);
  else { console.log(`  ✗ ${failures} problem(s) found.\n`); process.exitCode = 1; }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if ("fuzz" in args) {
    fuzz(Math.max(1, Number(args.fuzz === "true" ? 200 : args.fuzz) || 200));
    return;
  }

  const pet = buildInput(args);
  const chart = computeNatalChart(pet);
  const reading = buildReading(pet, chart);
  printChart(pet, chart, reading);
  printReading(reading);

  if ("svg" in args) {
    const photoDataUri = await loadPhoto(args.photo);
    const theme = (args.theme as ThemeName) ?? "nebula";
    const svg = renderCertificateSVG(pet, chart, reading, { photoDataUri, theme });
    const outDir = join("scripts", "natal", "out");
    mkdirSync(outDir, { recursive: true });
    const file = join(outDir, `${pet.name.toLowerCase().replace(/\s+/g, "-")}.svg`);
    writeFileSync(file, svg, "utf8");
    console.log(`  ✦ Saved certificate SVG → ${file} (theme: ${theme}${photoDataUri ? ", with photo" : ""})\n`);
  }
}

main();
