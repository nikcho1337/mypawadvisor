// Renders the default Open Graph / Twitter card image to public/og-default.png (1200×630).
//   npx tsx scripts/og-image.ts
// Pure SVG → PNG via @resvg/resvg-js (already a devDependency); no browser needed.
import { Resvg } from "@resvg/resvg-js";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const W = 1200;
const H = 630;

function paw(cx: number, cy: number, s: number, fill: string, opacity = 1): string {
  // Central pad + four toes, sized by `s` (≈ half-width of the print).
  const toes = [
    [-0.62, -0.55, 0.26, 0.34, -18],
    [-0.22, -0.82, 0.26, 0.34, -6],
    [0.22, -0.82, 0.26, 0.34, 6],
    [0.62, -0.55, 0.26, 0.34, 18],
  ]
    .map(
      ([dx, dy, rx, ry, rot]) =>
        `<ellipse cx="${cx + dx * s}" cy="${cy + dy * s}" rx="${rx * s}" ry="${ry * s}" transform="rotate(${rot} ${cx + dx * s} ${cy + dy * s})"/>`
    )
    .join("");
  return `<g fill="${fill}" opacity="${opacity}">
    <path d="M ${cx - 0.72 * s} ${cy + 0.05 * s}
             C ${cx - 0.72 * s} ${cy - 0.45 * s}, ${cx + 0.72 * s} ${cy - 0.45 * s}, ${cx + 0.72 * s} ${cy + 0.05 * s}
             C ${cx + 0.72 * s} ${cy + 0.55 * s}, ${cx + 0.3 * s} ${cy + 0.95 * s}, ${cx} ${cy + 0.95 * s}
             C ${cx - 0.3 * s} ${cy + 0.95 * s}, ${cx - 0.72 * s} ${cy + 0.55 * s}, ${cx - 0.72 * s} ${cy + 0.05 * s} Z"/>
    ${toes}
  </g>`;
}

// Deterministic scatter of faint paw prints across the background.
function scatter(): string {
  let seed = 7;
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  let out = "";
  for (let i = 0; i < 14; i++) {
    const x = 60 + rnd() * (W - 120);
    const y = 40 + rnd() * (H - 80);
    const s = 22 + rnd() * 30;
    const rot = -30 + rnd() * 60;
    out += `<g transform="rotate(${rot.toFixed(1)} ${x.toFixed(0)} ${y.toFixed(0)})">${paw(x, y, s, "#ffffff", 0.07)}</g>`;
  }
  return out;
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#065f46"/>
      <stop offset="0.55" stop-color="#047857"/>
      <stop offset="1" stop-color="#0f766e"/>
    </linearGradient>
    <linearGradient id="amber" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fbbf24"/>
      <stop offset="1" stop-color="#f59e0b"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#022c22" flood-opacity="0.45"/>
    </filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  ${scatter()}

  <!-- Card -->
  <rect x="70" y="86" width="760" height="458" rx="34" fill="#ffffff" filter="url(#shadow)"/>
  <rect x="70" y="86" width="760" height="10" rx="5" fill="url(#amber)" opacity="0.95"/>

  <g font-family="Segoe UI, Inter, Arial, Helvetica, sans-serif">
    <text x="120" y="176" font-size="22" font-weight="700" letter-spacing="5" fill="#059669">HONEST PET PRODUCT REVIEWS</text>
    <text x="120" y="262" font-size="74" font-weight="800" fill="#111827">We test it.</text>
    <text x="120" y="346" font-size="74" font-weight="800" fill="#059669">You buy the best.</text>
    <text x="120" y="412" font-size="27" fill="#4b5563">Hands-on reviews of dog and cat products,</text>
    <text x="120" y="450" font-size="27" fill="#4b5563">pet insurance guides, and a natal chart keepsake.</text>
    <text x="120" y="508" font-size="26" font-weight="700" fill="#111827">mypawadvisor.com</text>
  </g>

  <!-- Big paw mark -->
  <g transform="rotate(-14 1000 330)">
    ${paw(1000, 330, 150, "#ffffff", 0.16)}
    ${paw(1000, 330, 128, "url(#amber)", 1)}
  </g>
</svg>`;

const png = new Resvg(svg, {
  fitTo: { mode: "width", value: W },
  font: { loadSystemFonts: true, defaultFontFamily: "Arial" },
}).render();

const outDir = join(process.cwd(), "public");
mkdirSync(outDir, { recursive: true });
const out = join(outDir, "og-default.png");
writeFileSync(out, png.asPng());
console.log(`wrote ${out} (${(png.asPng().length / 1024).toFixed(0)} KB)`);
