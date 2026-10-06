// Server-side SVG -> PNG rasterizer (no browser, no canvas).
// Uses @resvg/resvg-js so the same certificate that renders on the web can be turned into a
// flat image from the terminal — for Etsy listing samples AND for fulfilling orders.
//
// Fonts: any .ttf/.otf dropped in scripts/natal/fonts/ is loaded (we bundle Cinzel so the
// display type matches the intended design instead of falling back to Georgia). System fonts
// stay enabled so the serif body text (Georgia) still resolves. The zodiac/planet symbols are
// vector paths (see glyphs.ts), so they are font-independent and always crisp.
import { Resvg } from "@resvg/resvg-js";
import { readdirSync } from "node:fs";
import { join } from "node:path";

function bundledFonts(): string[] {
  try {
    const dir = join("scripts", "natal", "fonts");
    return readdirSync(dir).filter((f) => /\.(ttf|otf)$/i.test(f)).map((f) => join(dir, f));
  } catch { return []; }
}
const FONT_FILES = bundledFonts();

export function rasterizeSvgToPng(svg: string, widthPx: number): Buffer {
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: widthPx },
    font: {
      loadSystemFonts: true,
      fontFiles: FONT_FILES,
      defaultFontFamily: "Georgia",
      serifFamily: "Georgia",
    },
  });
  return Buffer.from(resvg.render().asPng());
}
