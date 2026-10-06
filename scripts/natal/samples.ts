// Generates the Etsy listing sample images: one example pet rendered in all three themes,
// as high-res PNGs suitable for uploading as storefront photos.
//   Run:  npx tsx scripts/natal/samples.ts
// Output: scripts/natal/out/sample-{nebula,aurora,ember}.png
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { computeNatalChart, type BirthInput } from "./natal-chart";
import { buildReading } from "./reading-template";
import { renderCertificateSVG, type ThemeName } from "./render-svg";
import { rasterizeSvgToPng } from "./raster";

// A friendly, realistic example pet. Austin coords + 09:30 birth time give a full chart
// (Ascendant + houses), so the sample shows every section the buyer will get.
const SAMPLE: BirthInput = {
  name: "Goldie",
  species: "dog",
  breed: "Golden Retriever",
  year: 2021, month: 7, day: 15,
  hour: 9, minute: 30,
  latitude: 30.2672, longitude: -97.7431, cityLabel: "Austin, USA",
};

const THEMES: ThemeName[] = ["nebula", "aurora", "ember"];
const WIDTH = 2000; // px on the short axis — Etsy recommends >= 2000px

function main() {
  const chart = computeNatalChart(SAMPLE);
  const reading = buildReading(SAMPLE, chart);
  const outDir = join("scripts", "natal", "out");
  mkdirSync(outDir, { recursive: true });

  for (const theme of THEMES) {
    const svg = renderCertificateSVG(SAMPLE, chart, reading, { theme });
    const png = rasterizeSvgToPng(svg, WIDTH);
    const file = join(outDir, `sample-${theme}.png`);
    writeFileSync(file, png);
    console.log(`  ✓ ${theme.padEnd(7)} -> ${file}  (${(png.length / 1024).toFixed(0)} KB)`);
  }
  console.log("\n  Open the three PNGs and check: serif text, zodiac/planet glyphs, nebula gradients, photo medallion ring.\n");
}

main();
