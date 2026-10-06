/**
 * Social card generator for the Pet Natal Chart product.
 * Composes a rendered certificate into a marketing card and rasterizes at 2×.
 *
 * Formats:
 *   pinterest (default) — 1000×1500 design (2:3, Pinterest's recommended ratio) → 2000×3000 PNG
 *   twitter             — 1600×900 design (16:9, full timeline preview)        → 3200×1800 PNG
 *
 * Usage:
 *   npx tsx scripts/pinterest/pin-card.ts
 *   npx tsx scripts/pinterest/pin-card.ts --format twitter
 *   npx tsx scripts/pinterest/pin-card.ts --cert scripts/natal/out/ex-aurora.svg --out natal-pin-aurora.png
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import { renderGlyph } from "../natal/glyphs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");

const FONTS = [
  join(HERE, "fonts", "Cinzel-Regular.ttf"),
  join(HERE, "fonts", "Cinzel-Bold.ttf"),
  join(HERE, "fonts", "CormorantGaramond-Medium.ttf"),
  join(HERE, "fonts", "CormorantGaramond-MediumItalic.ttf"),
];

const SCALE = 2;
const SERIF_ITALIC = `font-style="italic" font-family="'Cormorant Garamond', Georgia, serif"`;

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

function rng(seed: number) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

// Paw watermark — same path as the site + certificate.
const PAW_PATH = "M32 38c-8 0-14 6-14 14 0 6 6 10 14 10s14-4 14-10c0-8-6-14-14-14zM14 28c-4 0-7 4-7 8s3 7 7 7 7-3 7-7-3-8-7-8zm36 0c-4 0-7 4-7 8s3 7 7 7 7-3 7-7-3-8-7-8zM22 12c-3 0-6 3-6 8s3 8 6 8 6-3 6-8-3-8-6-8zm20 0c-3 0-6 3-6 8s3 8 6 8 6-3 6-8-3-8-6-8z";

function paw(x: number, y: number, scale: number, rot: number, o: number): string {
  return `<g fill="#e8c976" transform="translate(${x},${y}) scale(${scale}) rotate(${rot} 32 32)" opacity="${o}"><path d="${PAW_PATH}"/></g>`;
}

// Four-point sparkle centered at (x,y).
function sparkle(x: number, y: number, r: number, fill: string, o: number): string {
  const s = r, k = r * 0.18;
  return `<path d="M ${x} ${y - s} C ${x + k} ${y - k}, ${x + k} ${y - k}, ${x + s} ${y} C ${x + k} ${y + k}, ${x + k} ${y + k}, ${x} ${y + s} C ${x - k} ${y + k}, ${x - k} ${y + k}, ${x - s} ${y} C ${x - k} ${y - k}, ${x - k} ${y - k}, ${x} ${y - s} Z" fill="${fill}" opacity="${o}"/>`;
}

function starfield(seed: number, n: number, w: number, h: number): string {
  const rnd = rng(seed);
  let out = "";
  for (let i = 0; i < n; i++) {
    const x = rnd() * w, y = rnd() * h;
    const r = 0.5 + rnd() * 1.2;
    const o = 0.15 + rnd() * 0.65;
    const gold = rnd() < 0.22;
    out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}" fill="${gold ? "#ffe9b8" : "#ffffff"}" opacity="${o.toFixed(2)}"/>`;
  }
  return out;
}

// Shared <defs> — sky/nebula/halo gradients, title + CTA fills, shadow blur.
const DEFS = `<defs>
    <radialGradient id="sky" cx="50%" cy="-8%" r="120%">
      <stop offset="0%" stop-color="#2a1450"/>
      <stop offset="45%" stop-color="#120a2e"/>
      <stop offset="100%" stop-color="#0a0a1f"/>
    </radialGradient>
    <radialGradient id="nebA" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#7b2ff7" stop-opacity="0.32"/>
      <stop offset="100%" stop-color="#7b2ff7" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="nebB" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#c026d3" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#c026d3" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="nebC" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#22d3ee" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="halo" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#b57bff" stop-opacity="0.40"/>
      <stop offset="60%" stop-color="#7b2ff7" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#7b2ff7" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="title" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#ffe1a0"/>
    </linearGradient>
    <linearGradient id="cta" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffe9b8"/>
      <stop offset="100%" stop-color="#f1c869"/>
    </linearGradient>
    <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="18"/>
    </filter>
  </defs>`;

// NOTE: text must stay pure-letter — any glyph missing from Cinzel makes resvg drop the
// whole line to a fallback font; all ornaments (✦ · ☉ ☽ ↑) are drawn as paths instead.

function eyebrow(cx: number, y: number): string {
  return `<text x="${cx - 24}" y="${y}" text-anchor="end" font-size="17" letter-spacing="7" fill="#e8c976" font-weight="400">REAL ASTROLOGY</text>
  <text x="${cx + 24}" y="${y}" text-anchor="start" font-size="17" letter-spacing="7" fill="#e8c976" font-weight="400">FOR DOGS &amp; CATS</text>
  <circle cx="${cx}" cy="${y - 6}" r="2.6" fill="#e8c976" opacity="0.8"/>
  ${sparkle(cx - 312, y - 6, 8, "#e8c976", 0.9)}
  ${sparkle(cx + 318, y - 6, 8, "#e8c976", 0.9)}`;
}

function headline(cx: number, y1: number, y2: number, s1: number, s2: number): string {
  return `<text x="${cx}" y="${y1}" text-anchor="middle" font-size="${s1}" font-weight="700" fill="url(#title)" letter-spacing="1">What&#8217;s Your Pet&#8217;s</text>
  <text x="${cx}" y="${y2}" text-anchor="middle" font-size="${s2}" font-weight="700" fill="url(#title)" letter-spacing="2">Zodiac Sign?</text>`;
}

function subline(cx: number, y: number, size = 27): string {
  return `<text x="${cx}" y="${y}" text-anchor="middle" font-size="${size}" fill="#c9bfee" ${SERIF_ITALIC}>Their real birth chart — calculated from the sky they were born under</text>`;
}

// SUN · MOON · RISING strip (icons drawn as paths, like the certificate).
function triadStrip(cx: number, y: number): string {
  const ty = y + 7; // text baseline
  let s = "";
  s += renderGlyph("Sun", cx - 236, y, 24, "#ffe9b8", { strokeWidth: 2 });
  s += `<text x="${cx - 211}" y="${ty}" font-size="20" letter-spacing="5" fill="#ffe9b8">SUN</text>`;
  s += `<circle cx="${cx - 116}" cy="${y}" r="3" fill="#e8c976" opacity="0.7"/>`;
  s += renderGlyph("Moon", cx - 65, y, 22, "#ffe9b8", { strokeWidth: 2 });
  s += `<text x="${cx - 40}" y="${ty}" font-size="20" letter-spacing="5" fill="#ffe9b8">MOON</text>`;
  s += `<circle cx="${cx + 79}" cy="${y}" r="3" fill="#e8c976" opacity="0.7"/>`;
  s += `<g stroke="#ffe9b8" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <path d="M ${cx + 129} ${y + 10} L ${cx + 129} ${y - 10} M ${cx + 122} ${y - 3} L ${cx + 129} ${y - 10} L ${cx + 136} ${y - 3}"/>
        </g>`;
  s += `<text x="${cx + 153}" y="${ty}" font-size="20" letter-spacing="5" fill="#ffe9b8">RISING</text>`;
  return s;
}

function ctaPill(cx: number, yTop: number): string {
  return `<g>
    <rect x="${cx - 230}" y="${yTop}" width="460" height="68" rx="34" fill="url(#cta)"/>
    <text x="${cx}" y="${yTop + 44}" text-anchor="middle" font-size="26" font-weight="700" fill="#120a2e" letter-spacing="2">REVEAL THEIR CHART</text>
    ${sparkle(cx - 192, yTop + 34, 9, "#120a2e", 0.95)}
    ${sparkle(cx + 192, yTop + 34, 9, "#120a2e", 0.95)}
  </g>`;
}

function footerLines(cx: number, y1: number, y2: number): string {
  return `<text x="${cx}" y="${y1}" text-anchor="middle" font-size="25" fill="#c9bfee" ${SERIF_ITALIC}>Printable keepsake — ready in 30 seconds</text>
  <text x="${cx}" y="${y2}" text-anchor="middle" font-size="19" letter-spacing="5" fill="#9d92c9">MYPAWADVISOR.COM</text>`;
}

// Certificate with halo, drop shadow, gold frame and corner sparkles. 820×1300 aspect.
function certificate(certDataUri: string, x: number, y: number, w: number, tilt: number): string {
  const h = Math.round((1300 / 820) * w);
  const ccx = x + w / 2, ccy = y + h / 2;
  return `<ellipse cx="${ccx}" cy="${ccy}" rx="${w * 0.78}" ry="${h * 0.62}" fill="url(#halo)"/>
  <g transform="rotate(${tilt} ${ccx} ${ccy})">
    <rect x="${x + 10}" y="${y + 22}" width="${w}" height="${h}" rx="14" fill="#000000" opacity="0.55" filter="url(#shadow)"/>
    <image href="${certDataUri}" x="${x}" y="${y}" width="${w}" height="${h}"/>
    <rect x="${x - 2}" y="${y - 2}" width="${w + 4}" height="${h + 4}" rx="10" fill="none" stroke="#e8c976" stroke-width="2.5" opacity="0.85"/>
  </g>
  ${sparkle(x - 8, y + 6, 16, "#ffe9b8", 0.95)}
  ${sparkle(x + w + 4, y + h - 30, 13, "#ffe9b8", 0.9)}`;
}

function rasterizeCert(certPath: string, widthPx: number): string {
  const svg = readFileSync(certPath, "utf8");
  const r = new Resvg(svg, {
    fitTo: { mode: "width", value: widthPx },
    font: { fontFiles: FONTS, loadSystemFonts: true, defaultFontFamily: "Cinzel" },
  });
  return `data:image/png;base64,${r.render().asPng().toString("base64")}`;
}

// ---------- 1000×1500 portrait (Pinterest) ----------
function buildPortrait(certDataUri: string): { svg: string; w: number; h: number } {
  const W = 1000, H = 1500;
  const cw = 560, ch = Math.round((1300 / 820) * cw);
  const cx = (W - cw) / 2, cy = 318;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="Cinzel, Georgia, serif">
  ${DEFS}
  <rect width="${W}" height="${H}" fill="url(#sky)"/>
  <ellipse cx="180" cy="380" rx="420" ry="320" fill="url(#nebA)"/>
  <ellipse cx="860" cy="900" rx="460" ry="380" fill="url(#nebB)"/>
  <ellipse cx="500" cy="1400" rx="520" ry="300" fill="url(#nebC)"/>
  ${starfield(77041, 150, W, H)}
  ${sparkle(108, 250, 13, "#ffe9b8", 0.9)}
  ${sparkle(905, 192, 9, "#ffffff", 0.75)}
  ${sparkle(940, 700, 12, "#ffe9b8", 0.65)}
  ${sparkle(60, 980, 9, "#ffe9b8", 0.55)}
  ${sparkle(514, 1248, 7, "#ffffff", 0.6)}
  ${paw(48, 86, 1.35, -18, 0.06)}
  ${paw(880, 300, 1.0, 20, 0.055)}
  ${paw(70, 1280, 1.15, 12, 0.055)}
  ${paw(890, 1180, 0.9, -14, 0.05)}

  ${eyebrow(W / 2, 92)}
  ${headline(W / 2, 166, 246, 60, 76)}
  ${subline(W / 2, 292)}
  ${certificate(certDataUri, cx, cy, cw, -2.5)}
  ${triadStrip(W / 2, cy + ch + 58)}
  ${ctaPill(W / 2, cy + ch + 96)}
  ${footerLines(W / 2, cy + ch + 204, cy + ch + 250)}
</svg>`;
  return { svg, w: W, h: H };
}

// ---------- 1600×900 landscape (Twitter/X timeline) ----------
function buildLandscape(certDataUri: string): { svg: string; w: number; h: number } {
  const W = 1600, H = 900;
  const tx = 500;                                  // text column center
  const cw = 480, ch = Math.round((1300 / 820) * cw); // 480×761
  const cx = 1020, cy = (H - ch) / 2;              // certificate block, right side

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="Cinzel, Georgia, serif">
  ${DEFS}
  <rect width="${W}" height="${H}" fill="url(#sky)"/>
  <ellipse cx="260" cy="240" rx="430" ry="300" fill="url(#nebA)"/>
  <ellipse cx="1380" cy="680" rx="460" ry="360" fill="url(#nebB)"/>
  <ellipse cx="780" cy="880" rx="520" ry="280" fill="url(#nebC)"/>
  ${starfield(90210, 170, W, H)}
  ${sparkle(96, 460, 12, "#ffe9b8", 0.85)}
  ${sparkle(870, 120, 9, "#ffffff", 0.75)}
  ${sparkle(1540, 200, 12, "#ffe9b8", 0.7)}
  ${sparkle(930, 780, 9, "#ffe9b8", 0.6)}
  ${sparkle(440, 560, 7, "#ffffff", 0.55)}
  ${paw(60, 60, 1.2, -18, 0.055)}
  ${paw(96, 730, 1.0, 14, 0.05)}
  ${paw(1490, 90, 0.95, 20, 0.05)}
  ${paw(1510, 740, 1.1, -12, 0.05)}

  ${eyebrow(tx, 178)}
  ${headline(tx, 262, 348, 58, 74)}
  ${subline(tx, 398, 25)}
  ${triadStrip(tx, 488)}
  ${ctaPill(tx, 552)}
  ${footerLines(tx, 692, 744)}
  ${certificate(certDataUri, cx, cy, cw, 2.5)}
</svg>`;
  return { svg, w: W, h: H };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const format = args.format ?? "pinterest";
  if (format !== "pinterest" && format !== "twitter") throw new Error(`Unknown --format "${format}" (pinterest | twitter)`);

  const certPath = join(ROOT, args.cert ?? join("scripts", "natal", "out", "ex-nebula.svg"));
  const outName = args.out ?? (format === "twitter" ? "natal-pin-twitter.png" : "natal-pin-nebula.png");
  const outDir = join(HERE, "out");
  mkdirSync(outDir, { recursive: true });

  console.log(`Rasterizing certificate: ${certPath}`);
  const certUri = rasterizeCert(certPath, 1400);

  const { svg, w, h } = format === "twitter" ? buildLandscape(certUri) : buildPortrait(certUri);
  writeFileSync(join(outDir, outName.replace(/\.png$/, ".svg")), svg, "utf8");

  console.log(`Rendering ${format} card at ${w * SCALE}×${h * SCALE}…`);
  const r = new Resvg(svg, {
    fitTo: { mode: "width", value: w * SCALE },
    font: { fontFiles: FONTS, loadSystemFonts: true, defaultFontFamily: "Cinzel" },
  });
  const png = r.render().asPng();
  const outPath = join(outDir, outName);
  writeFileSync(outPath, png);
  console.log(`✓ ${outPath}  (${(png.length / 1024).toFixed(0)} KB, ${w * SCALE}×${h * SCALE})`);
}

main();
