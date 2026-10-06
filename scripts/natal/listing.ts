// Generates the premium LISTING hero images:
//   listing-1-chart.png    — the visual chart (page 1 of the deliverable), gallery-presented
//   listing-2-reading.png  — an EXAMPLE of the written reading (page 2), gallery-presented
//
// The reading shown here is HAND-WRITTEN (not engine output) so it can never overlap a real
// customer's delivered reading — it's a bespoke sample purely for the storefront.
//   Run:  npx tsx scripts/natal/listing.ts
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { computeNatalChart, type BirthInput } from "./natal-chart";
import { buildReading } from "./reading-template";
import { renderCertificateSVG, type ThemeName } from "./render-svg";
import { renderReadingPageSVG, type ReadingContent } from "./render-reading";
import { rasterizeSvgToPng } from "./raster";

const GOLDIE: BirthInput = {
  name: "Goldie", species: "dog", breed: "Golden Retriever",
  year: 2021, month: 7, day: 15, hour: 9, minute: 30,
  latitude: 30.2672, longitude: -97.7431, cityLabel: "Austin, USA",
};
const THEME: ThemeName = "nebula";
const PX = "?auto=compress&cs=tinysrgb&w=760&h=760&fit=crop";
const GOLDIE_PHOTO = "https://images.pexels.com/photos/36608296/pexels-photo-36608296.jpeg" + PX;

// The other two themes — a cat for Aurora, a dog for Ember (shows both themes + both species).
const LUNA: BirthInput = {
  name: "Luna", species: "cat", breed: "Tabby",
  year: 2021, month: 3, day: 9, hour: 14, minute: 20,
  latitude: 51.5074, longitude: -0.1278, cityLabel: "London, UK",
};
const LUNA_PHOTO = "https://images.pexels.com/photos/19511759/pexels-photo-19511759.jpeg" + PX;
const ROCKY: BirthInput = {
  name: "Rocky", species: "dog", breed: "Terrier Mix",
  year: 2020, month: 11, day: 2, hour: 18, minute: 5,
  latitude: 40.7128, longitude: -74.006, cityLabel: "New York, USA",
};
const ROCKY_PHOTO = "https://images.pexels.com/photos/30798660/pexels-photo-30798660.jpeg" + PX;

// Hand-written, one-of-a-kind reading — matches Goldie's real placements (Cancer Sun, Virgo
// Moon, Leo Rising, Fire·Fixed·Inward, Sun trine Neptune) but the prose is bespoke.
const EXAMPLE_READING: ReadingContent = {
  name: "Goldie",
  subtitle: "Golden Retriever · Born July 15, 2021 · Austin, USA",
  starRating: 5,
  sections: [
    { heading: "Cosmic Snapshot",
      body: "There is a whole universe behind Goldie's eyes, and it runs entirely on love. Born under a tender Cancer Sun, sharpened by a Virgo Moon that misses nothing, and dressed in unmistakable Leo flair, she is equal parts cuddle, quiet critic, and main character." },
    { heading: "Sun in Cancer",
      body: "Home is her religion and you are its patron saint. She feels whatever the house feels, guards the people she loves like buried treasure, and would happily spend forever curled exactly where you are." },
    { heading: "Moon in Virgo",
      body: "Beneath the softness hides a small, devoted perfectionist. She keeps the schedule better than you do, notices the moment anything changes, and says \"I love you\" in tidy, precise, deeply considerate gestures." },
    { heading: "Leo Rising",
      body: "None of which stops the grand entrances. Goldie arrives like applause should follow, certain every room improves the instant she walks in, and the maddening part is that she is usually right." },
    { heading: "Elemental Nature — Fire · Fixed · Inward",
      body: "A spark of fire keeps her warm, bold, and a little theatrical; a fixed streak makes her loyalty absolute once it is given; and an inward current keeps the richest part of her in a soft, private, dreaming world." },
    { heading: "Love & Play",
      body: "She loves with her whole chest, plays like the stakes are cosmic, and forgives you before the apology is finished. Offer her warmth, a little ritual, and some adoration, and she will never let you doubt where you stand." },
  ],
  signature: "If you take away a single truth about Goldie, let it be this — Sun trine Neptune, an aspect this exact never arrives by accident.",
};

async function loadPhoto(url: string): Promise<string | undefined> {
  try {
    const res = await fetch(url, { redirect: "follow" });
    if (!res.ok) return undefined;
    const mime = res.headers.get("content-type") || "image/jpeg";
    const buf = Buffer.from(await res.arrayBuffer());
    return `data:${mime};base64,${buf.toString("base64")}`;
  } catch { return undefined; }
}

function sparkle(x: number, y: number, s: number, fill: string, op: number): string {
  const k = s * 0.28;
  return `<path d="M ${x},${y - s} C ${x + k},${y - k} ${x + k},${y - k} ${x + s},${y} C ${x + k},${y + k} ${x + k},${y + k} ${x},${y + s} C ${x - k},${y + k} ${x - k},${y + k} ${x - s},${y} C ${x - k},${y - k} ${x - k},${y - k} ${x},${y - s} Z" fill="${fill}" opacity="${op}"/>`;
}

// Float a page (chart or reading) as a premium framed print on a warm cream background.
function present(pageUri: string): string {
  const S = 2200, pH = 2030, pW = Math.round(pH * 820 / 1300);
  const x = (S - pW) / 2, y = (S - pH) / 2, crx = Math.round(40 * pW / 820);
  const gold = "#b07d2b";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}" font-family="Georgia, serif">
  <defs>
    <radialGradient id="cbg" cx="40%" cy="24%" r="100%"><stop offset="0%" stop-color="#faf3e6"/><stop offset="100%" stop-color="#e8d6ba"/></radialGradient>
    <radialGradient id="csun" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#d8b25a" stop-opacity="0.30"/><stop offset="100%" stop-color="#d8b25a" stop-opacity="0"/></radialGradient>
    <filter id="csh" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="34"/></filter>
  </defs>
  <rect width="${S}" height="${S}" fill="url(#cbg)"/>
  <circle cx="560" cy="120" r="560" fill="url(#csun)"/>
  ${sparkle(330, 470, 16, gold, 0.5)}${sparkle(1880, 560, 14, gold, 0.45)}${sparkle(300, 1640, 13, gold, 0.4)}${sparkle(1900, 1700, 16, gold, 0.45)}
  <rect x="${x + 18}" y="${y + 34}" width="${pW}" height="${pH}" rx="${crx}" fill="#2a1c34" opacity="0.30" filter="url(#csh)"/>
  <image x="${x}" y="${y}" width="${pW}" height="${pH}" href="${pageUri}"/>
  <rect x="${x}" y="${y}" width="${pW}" height="${pH}" rx="${crx}" fill="none" stroke="${gold}" stroke-width="3" opacity="0.45"/>
</svg>`;
}

const uri = (b: Buffer) => `data:image/png;base64,${b.toString("base64")}`;

async function presentedChart(outDir: string, pet: BirthInput, theme: ThemeName, photoUrl: string, file: string): Promise<Buffer> {
  const photo = await loadPhoto(photoUrl);
  const chart = computeNatalChart(pet);
  const reading = buildReading(pet, chart);
  const svg = renderCertificateSVG(pet, chart, reading,
    { theme, photoDataUri: photo, photoZoom: 1.12, photoFocusY: 0.42 });
  const png = rasterizeSvgToPng(svg, 1600);
  const hero = rasterizeSvgToPng(present(uri(png)), 2200);
  writeFileSync(join(outDir, file), hero);
  console.log(`  ✓ ${file.padEnd(24)} photo:${photo ? "ok" : "none"}  (${(hero.length / 1024).toFixed(0)} KB)`);
  return png; // raw chart for the theme-comparison image
}

// One image showing all three themes side by side with labels — so the carousel has a single
// clear "here are your options" photo instead of three near-identical lookalikes.
export function themesSvg(uris: string[]): string {
  const W = 2200, H = 1640, w = 660, h = Math.round(w * 1300 / 820);
  const cy = 880, cxs = [368, 1100, 1832];
  const labels = ["Nebula", "Aurora", "Ember"];
  const accents = ["#7b2ff7", "#14b8a6", "#f43f5e"];
  const card = (uri: string, cx: number) => {
    const pad = 16, mw = w + pad * 2, mh = h + pad * 2, crx = Math.round(40 * w / 820);
    return `<g transform="translate(${cx} ${cy})">`
      + `<rect x="${-mw / 2 + 8}" y="${-mh / 2 + 14}" width="${mw}" height="${mh}" rx="${crx + pad}" fill="#241634" opacity="0.28" filter="url(#tsh)"/>`
      + `<rect x="${-mw / 2}" y="${-mh / 2}" width="${mw}" height="${mh}" rx="${crx + pad}" fill="#ffffff"/>`
      + `<image x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" href="${uri}" preserveAspectRatio="xMidYMid slice"/>`
      + `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${crx}" fill="none" stroke="#b07d2b" stroke-width="2.5" opacity="0.85"/>`
      + `</g>`;
  };
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="Georgia, serif">
  <defs>
    <radialGradient id="cbg" cx="40%" cy="20%" r="100%"><stop offset="0%" stop-color="#faf3e6"/><stop offset="100%" stop-color="#e8d6ba"/></radialGradient>
    <filter id="tsh" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="22"/></filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#cbg)"/>
  <text x="${W / 2}" y="180" text-anchor="middle" font-family="'Cinzel', Georgia, serif" font-size="92" font-weight="bold" fill="#2c1b3d" letter-spacing="1" style="font-variant: small-caps;">Choose Your Theme</text>
  <text x="${W / 2}" y="244" text-anchor="middle" font-size="38" fill="#6a5570">One design, three cosmic palettes — you pick yours at checkout</text>
  ${uris.map((u, i) => card(u, cxs[i])).join("\n  ")}
  ${labels.map((l, i) => `<text x="${cxs[i]}" y="${cy + h / 2 + 92}" text-anchor="middle" font-family="'Cinzel', Georgia, serif" font-size="46" fill="${accents[i]}" letter-spacing="2" style="font-variant: small-caps;">${l}</text>`).join("\n  ")}
</svg>`;
}

async function main() {
  const outDir = join("scripts", "natal", "out");
  mkdirSync(outDir, { recursive: true });

  // Page 1 — the visual chart, one per theme (Cinzel display type via the bundled font).
  await presentedChart(outDir, GOLDIE, "nebula", GOLDIE_PHOTO, "listing-1-chart.png");

  // Page 2 — the WRITTEN reading (hand-written example, never overlaps real deliveries).
  const readingSvg = renderReadingPageSVG(EXAMPLE_READING, THEME);
  const readingHero = rasterizeSvgToPng(present(uri(rasterizeSvgToPng(readingSvg, 1600))), 2200);
  writeFileSync(join(outDir, "listing-2-reading.png"), readingHero);
  console.log(`  ✓ listing-2-reading.png    (${(readingHero.length / 1024).toFixed(0)} KB)`);

  // The other two theme options (buyers pick one at checkout).
  await presentedChart(outDir, LUNA, "aurora", LUNA_PHOTO, "listing-3-aurora.png");
  await presentedChart(outDir, ROCKY, "ember", ROCKY_PHOTO, "listing-4-ember.png");

  console.log("\n  Listing photos ready: 1 chart · 2 reading · 3 aurora · 4 ember.\n");
}

main().catch((e) => { console.error("  ✗", e.message); process.exit(1); });
