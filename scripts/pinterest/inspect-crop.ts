// One-off: render crops of the pin SVG at output resolution to verify sharpness.
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";

const HERE = dirname(fileURLToPath(import.meta.url));
const FONTS = [
  join(HERE, "fonts", "Cinzel-Regular.ttf"),
  join(HERE, "fonts", "Cinzel-Bold.ttf"),
  join(HERE, "fonts", "CormorantGaramond-Medium.ttf"),
  join(HERE, "fonts", "CormorantGaramond-MediumItalic.ttf"),
];
const svg = readFileSync(join(HERE, "out", "natal-pin-nebula.svg"), "utf8");

for (const [name, crop] of [
  ["crop-headline.png", { left: 200, top: 60, right: 1800, bottom: 640 }],
  ["crop-cta.png", { left: 400, top: 2300, right: 1600, bottom: 2950 }],
] as const) {
  const r = new Resvg(svg, {
    fitTo: { mode: "width", value: 2000 },
    font: { fontFiles: FONTS, loadSystemFonts: true, defaultFontFamily: "Cinzel" },
    crop,
  });
  writeFileSync(join(HERE, "out", name), r.render().asPng());
  console.log("✓", name);
}
