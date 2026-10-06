// Generates the Etsy shop brand assets — logo (shop icon) + big banner — in the same
// cosmic-certificate style (nebula palette, gold serif, paw + moon + sparkles).
//   Run:  npx tsx scripts/natal/brand.ts
// Output: scripts/natal/out/logo.png (square, circle-safe) and out/banner.png (4:1)
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { rasterizeSvgToPng } from "./raster";
import { computeNatalChart, type BirthInput } from "./natal-chart";
import { buildReading } from "./reading-template";
import { renderCertificateSVG, type ThemeName } from "./render-svg";

// Warm "gallery" palette for the lighter banner — deliberately NOT the dark logo nebula.
const L = {
  bg0: "#faf3e6", bg1: "#ead9bd", // cream gradient
  ink: "#2c1b3d", inkSoft: "#6a5570",
  gold: "#b07d2b", goldSoft: "#d8b25a",
};

// Nebula palette (mirrors THEMES.nebula in render-svg.ts so brand == product).
const P = {
  bg0: "#1c0f33", bg1: "#070512",
  gold: "#f1d484", goldSoft: "#f7e6b0", goldDim: "#b48ad8", ink: "#e9dcff",
  neb: ["#7b2ff7", "#c026d3", "#22d3ee"], halo: "#b57bff",
};

// Same paw silhouette used on the certificate (authored in a 0..64 box).
const PAW = "M32 38c-8 0-14 6-14 14 0 6 6 10 14 10s14-4 14-10c0-8-6-14-14-14zM14 28c-4 0-7 4-7 8s3 7 7 7 7-3 7-7-3-8-7-8zm36 0c-4 0-7 4-7 8s3 7 7 7 7-3 7-7-3-8-7-8zM22 12c-3 0-6 3-6 8s3 8 6 8 6-3 6-8-3-8-6-8zm20 0c-3 0-6 3-6 8s3 8 6 8 6-3 6-8-3-8-6-8z";

// Deterministic RNG so the starfield is identical every run.
function rng(seed: number) {
  return () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
}

// A 4-point sparkle (concave diamond) centered at (x,y), arm length s.
function sparkle(x: number, y: number, s: number, fill: string, op = 1): string {
  const k = s * 0.28;
  return `<path d="M ${x},${y - s} C ${x + k},${y - k} ${x + k},${y - k} ${x + s},${y} `
    + `C ${x + k},${y + k} ${x + k},${y + k} ${x},${y + s} `
    + `C ${x - k},${y + k} ${x - k},${y + k} ${x - s},${y} `
    + `C ${x - k},${y - k} ${x - k},${y - k} ${x},${y - s} Z" fill="${fill}" opacity="${op}"/>`;
}

// Scattered star dots across a w×h area.
function starfield(w: number, h: number, n: number, seed: number): string {
  const r = rng(seed);
  let out = "";
  for (let i = 0; i < n; i++) {
    const x = (r() * w).toFixed(1), y = (r() * h).toFixed(1);
    const rad = (0.6 + r() * 1.8).toFixed(2);
    const op = (0.25 + r() * 0.6).toFixed(2);
    const col = r() > 0.78 ? P.gold : "#ffffff";
    out += `<circle cx="${x}" cy="${y}" r="${rad}" fill="${col}" opacity="${op}"/>`;
  }
  return out;
}

// Crescent moon at (cx,cy), radius R, carved by an offset disc → shows starfield through.
export function crescent(cx: number, cy: number, R: number, offset: number, id: string): string {
  return `<mask id="${id}">`
    + `<circle cx="${cx}" cy="${cy}" r="${R}" fill="white"/>`
    + `<circle cx="${cx + offset}" cy="${cy - offset * 0.35}" r="${R * 0.92}" fill="black"/>`
    + `</mask>`
    + `<circle cx="${cx}" cy="${cy}" r="${R}" fill="${P.gold}" mask="url(#${id})" filter="url(#soft)"/>`;
}

// THE MARK (drawn in a 0..500 box): a natal-chart wheel (zodiac house ticks, like the real
// product) cradling a "constellation paw" — toe pads rendered as connected stars. Reusable
// in the icon, the wordmark lockup, and the banner so the brand reads as one thing.
//   mhalo gradient is defined here so the mark is self-contained wherever it is embedded.
const PADS: [number, number][] = [[250, 303], [174, 244], [326, 244], [208, 177], [292, 177]];
function markBody(): string {
  const rOut = 212, rIn = 198;
  let ring = `<circle cx="250" cy="250" r="${rOut}" fill="none" stroke="${P.gold}" stroke-width="3" opacity="0.9"/>`
    + `<circle cx="250" cy="250" r="${rIn}" fill="none" stroke="${P.gold}" stroke-width="1.4" opacity="0.5"/>`
    + `<circle cx="250" cy="250" r="170" fill="none" stroke="${P.gold}" stroke-width="0.8" opacity="0.28"/>`;
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
    const card = i % 3 === 0;
    const ra = card ? rIn - 10 : rIn - 2;
    const x1 = (250 + Math.cos(a) * ra).toFixed(1), y1 = (250 + Math.sin(a) * ra).toFixed(1);
    const x2 = (250 + Math.cos(a) * rOut).toFixed(1), y2 = (250 + Math.sin(a) * rOut).toFixed(1);
    ring += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${P.gold}" stroke-width="${card ? 3 : 1.4}" opacity="${card ? 0.95 : 0.55}"/>`;
  }
  const paw = `<g transform="translate(115.6 92.6) scale(4.2)"><path d="${PAW}" fill="${P.gold}" opacity="0.16"/></g>`;
  const glow = `<circle cx="250" cy="303" r="40" fill="url(#mhalo)"/>`;
  const link = (a: number, b: number) =>
    `<line x1="${PADS[a][0]}" y1="${PADS[a][1]}" x2="${PADS[b][0]}" y2="${PADS[b][1]}" stroke="${P.gold}" stroke-width="2" opacity="0.7"/>`;
  const lines = link(0, 1) + link(0, 2) + link(0, 3) + link(0, 4) + link(1, 3) + link(2, 4);
  const stars = PADS.map((p, i) => sparkle(p[0], p[1], i === 0 ? 15 : 10, i === 0 ? P.goldSoft : P.gold, 0.97)).join("");
  return `<defs><radialGradient id="mhalo" cx="50%" cy="50%" r="50%">`
    + `<stop offset="0%" stop-color="${P.halo}" stop-opacity="0.5"/>`
    + `<stop offset="100%" stop-color="${P.halo}" stop-opacity="0"/></radialGradient></defs>`
    + glow + ring + paw + lines + stars;
}

// Shared cosmic background (gradient + nebula blooms + starfield) for any canvas.
function cosmicBg(w: number, h: number, seed: number, n: number): string {
  return `<rect width="${w}" height="${h}" fill="url(#bg)"/>`
    + `<ellipse cx="${w * 0.2}" cy="${h * 0.25}" rx="${w * 0.32}" ry="${h * 0.4}" fill="${P.neb[0]}" opacity="0.20" filter="url(#glow)"/>`
    + `<ellipse cx="${w * 0.82}" cy="${h * 0.7}" rx="${w * 0.3}" ry="${h * 0.42}" fill="${P.neb[1]}" opacity="0.15" filter="url(#glow)"/>`
    + `<ellipse cx="${w * 0.85}" cy="${h * 0.2}" rx="${w * 0.22}" ry="${h * 0.3}" fill="${P.neb[2]}" opacity="0.13" filter="url(#glow)"/>`
    + starfield(w, h, n, seed);
}

const SHARED_DEFS = `
  <radialGradient id="bg" cx="50%" cy="44%" r="78%">
    <stop offset="0%" stop-color="${P.bg0}"/><stop offset="100%" stop-color="${P.bg1}"/>
  </radialGradient>
  <filter id="soft" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="1.5"/></filter>
  <filter id="glow" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="9"/></filter>
  <filter id="tblur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3"/></filter>`;

// Crisp glowing text: a soft gold halo layer BENEATH a sharp top layer (the letters
// themselves are never blurred), so the wordmark reads luminous but stays razor-clean.
function glowText(x: number, y: number, size: number, text: string,
  o: { fill?: string; spacing?: number; glow?: number; anchor?: string } = {}): string {
  const fill = o.fill ?? P.goldSoft;
  const attrs = `x="${x}" y="${y}" text-anchor="${o.anchor ?? "middle"}" font-size="${size}"`
    + ` letter-spacing="${o.spacing ?? 1}" style="font-variant: small-caps;"`;
  const glow = o.glow ?? 0.45;
  return (glow > 0 ? `<text ${attrs} fill="${P.gold}" opacity="${glow}" filter="url(#tblur)">${text}</text>` : "")
    + `<text ${attrs} fill="${fill}">${text}</text>`;
}

// ---------------- LOGO (shop icon, circle-safe) ----------------
function logoSvg(): string {
  const S = 500;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}" font-family="Georgia, serif">
  <defs>${SHARED_DEFS}</defs>
  ${cosmicBg(S, S, 7, 44)}
  ${markBody()}
  ${sparkle(118, 250, 8, P.gold, 0.7)}
  ${sparkle(382, 250, 8, P.ink, 0.6)}
</svg>`;
}

// ---------------- LOGO LOCKUP (mark + wordmark, for banner/site/packaging) ----------------
function logoStackedSvg(): string {
  const W = 820, H = 950;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="Georgia, serif">
  <defs>${SHARED_DEFS}</defs>
  ${cosmicBg(W, H, 9, 80)}
  <g transform="translate(122 48) scale(1.15)">${markBody()}</g>
  <ellipse cx="410" cy="735" rx="370" ry="96" fill="#05030c" opacity="0.34" filter="url(#glow)"/>
  ${glowText(410, 752, 84, "PawAdvisorCharts", { spacing: 1, glow: 0.4 })}
  <line x1="250" y1="792" x2="570" y2="792" stroke="${P.gold}" stroke-width="2" opacity="0.6"/>
  ${glowText(410, 845, 30, "Pet Natal Charts", { fill: P.goldDim, spacing: 7, glow: 0 })}
</svg>`;
}

// ---------------- BANNER (big banner, 4:1) ----------------
function bannerSvg(): string {
  const W = 3000, H = 750;
  const cx = 1720; // text center, kept inside the safe center 60% (600–2400)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="Georgia, serif">
  <defs>${SHARED_DEFS}</defs>
  ${cosmicBg(W, H, 11, 120)}

  <!-- left emblem: the chart-wheel constellation paw -->
  <g transform="translate(457.5 112.5) scale(1.05)">${markBody()}</g>

  <!-- wordmark / value prop -->
  <ellipse cx="${cx}" cy="342" rx="800" ry="120" fill="#05030c" opacity="0.26" filter="url(#glow)"/>
  ${glowText(cx, 352, 92, "Personalized Pet Natal Charts", { spacing: 2, glow: 0.4 })}
  <line x1="${cx - 330}" y1="402" x2="${cx + 330}" y2="402" stroke="${P.gold}" stroke-width="2" opacity="0.6"/>
  <text x="${cx}" y="466" text-anchor="middle" fill="${P.ink}" font-size="44" letter-spacing="1" opacity="0.92">Custom astrology birth charts for your dog or cat</text>
  <text x="${cx}" y="524" text-anchor="middle" fill="${P.gold}" font-size="34" letter-spacing="3" opacity="0.85">★  READY IN 24 HOURS  ·  A KEEPSAKE GIFT  ★</text>
  ${sparkle(1120, 250, 15, P.gold, 0.9)}
  ${sparkle(2330, 250, 12, P.ink, 0.85)}
</svg>`;
}

// Embed a generated sample PNG as a data URI so it can be placed inside the banner SVG.
function pngDataUri(file: string): string {
  const b = readFileSync(join("scripts", "natal", "out", file));
  return `data:image/png;base64,${b.toString("base64")}`;
}

// ---------------- BANNER (product showcase variant) ----------------
// Shows the three real sample charts fanned out, so the banner sells the product instead of
// repeating the icon's emblem. Requires samples.ts to have been run first.
function bannerShowcaseSvg(): string {
  const W = 3360, H = 840;
  const charts = ["sample-nebula.png", "sample-aurora.png", "sample-ember.png"].map(pngDataUri);
  const Hc = 648, Wc = Math.round(Hc * 820 / 1300); // 409 — matches the certificate aspect
  const card = (uri: string, cx: number, cy: number, rot: number, scale = 1) =>
    `<g transform="translate(${cx} ${cy}) rotate(${rot}) scale(${scale})">`
    + `<rect x="${-Wc / 2 - 6}" y="${-Hc / 2 - 6}" width="${Wc + 12}" height="${Hc + 12}" rx="6" fill="#000" opacity="0.5" filter="url(#glow)"/>`
    + `<image x="${-Wc / 2}" y="${-Hc / 2}" width="${Wc}" height="${Hc}" href="${uri}" preserveAspectRatio="xMidYMid slice"/>`
    + `<rect x="${-Wc / 2}" y="${-Hc / 2}" width="${Wc}" height="${Hc}" fill="none" stroke="${P.gold}" stroke-width="3" opacity="0.85"/>`
    + `</g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="Georgia, serif">
  <defs>${SHARED_DEFS}</defs>
  ${cosmicBg(W, H, 11, 120)}
  ${card(charts[0], 2070, 432, -7)}
  ${card(charts[2], 2700, 432, 7)}
  ${card(charts[1], 2385, 414, 0, 1.07)}
  ${glowText(250, 366, 86, "Personalized", { anchor: "start", spacing: 1, glow: 0.4 })}
  ${glowText(250, 460, 86, "Pet Natal Charts", { anchor: "start", spacing: 1, glow: 0.4 })}
  <line x1="258" y1="506" x2="930" y2="506" stroke="${P.gold}" stroke-width="2" opacity="0.6"/>
  ${glowText(250, 566, 40, "For your dog or cat", { anchor: "start", fill: P.ink, glow: 0 })}
  ${glowText(250, 624, 30, "★ Ready in 24 hours · A keepsake gift ★", { anchor: "start", fill: P.gold, spacing: 2, glow: 0 })}
</svg>`;
}

// Fetch a royalty-free pet photo as a data URI (for the medallion). Falls back to no-photo.
async function loadPhoto(url: string): Promise<string | undefined> {
  try {
    const res = await fetch(url, { redirect: "follow" });
    if (!res.ok) return undefined;
    const mime = res.headers.get("content-type") || "image/jpeg";
    if (!/^image\//.test(mime)) return undefined;
    const buf = Buffer.from(await res.arrayBuffer());
    return `data:${mime};base64,${buf.toString("base64")}`;
  } catch { return undefined; }
}

interface PetSpec extends BirthInput { theme: ThemeName; photo: string; zoom?: number; focusX?: number; focusY?: number; }
const PX = "?auto=compress&cs=tinysrgb&w=760&h=760&fit=crop";
const PETS: PetSpec[] = [
  { name: "Luna", species: "cat", breed: "Tabby", year: 2021, month: 3, day: 9, hour: 14, minute: 20,
    latitude: 51.5074, longitude: -0.1278, cityLabel: "London, UK", theme: "aurora",
    photo: "https://images.pexels.com/photos/19511759/pexels-photo-19511759.jpeg" + PX, zoom: 1.12, focusY: 0.42 },
  // Center card = the Golden Retriever photo (Goldie is literally a golden retriever).
  { name: "Goldie", species: "dog", breed: "Golden Retriever", year: 2021, month: 7, day: 15, hour: 9, minute: 30,
    latitude: 30.2672, longitude: -97.7431, cityLabel: "Austin, USA", theme: "nebula",
    photo: "https://images.pexels.com/photos/36608296/pexels-photo-36608296.jpeg" + PX, zoom: 1.12, focusY: 0.42 },
  { name: "Rocky", species: "dog", breed: "Labrador", year: 2020, month: 11, day: 2, hour: 18, minute: 5,
    latitude: 40.7128, longitude: -74.006, cityLabel: "New York, USA", theme: "ember",
    photo: "https://images.pexels.com/photos/30798660/pexels-photo-30798660.jpeg" + PX, zoom: 1.12, focusY: 0.42 },
];

function petChartSvg(p: PetSpec, photoUri?: string): string {
  const chart = computeNatalChart(p);
  const reading = buildReading(p, chart);
  return renderCertificateSVG(p, chart, reading,
    { theme: p.theme, photoDataUri: photoUri, photoZoom: p.zoom, photoFocusX: p.focusX, photoFocusY: p.focusY });
}
type Card = { uri: string; thumb: string };

// ---------------- BANNER (lighter "gallery wall" variant) ----------------
// Cream background with the dark chart prints matted in white frames (drop shadows read on
// light), each showing a real pet photo — distinct in tone from the dark cosmic logo.
function lightBannerSvg(cards: { uri: string }[]): string {
  const W = 3360, H = 840;
  // crx matches the chart's own rounded corners (rx 40 on the 820-wide certificate, scaled),
  // so the gold border traces the print's edge instead of cutting square across it.
  const card = (uri: string, cx: number, cy: number, rot: number, scale = 1) => {
    const Wc = 380, Hc = 602, pad = 24, mw = Wc + pad * 2, mh = Hc + pad * 2;
    const crx = Math.round(40 * Wc / 820); // ≈ 19
    return `<g transform="translate(${cx} ${cy}) rotate(${rot}) scale(${scale})">`
      + `<rect x="${-mw / 2 + 12}" y="${-mh / 2 + 20}" width="${mw}" height="${mh}" rx="26" fill="#241634" opacity="0.30" filter="url(#lglow)"/>`
      + `<rect x="${-mw / 2}" y="${-mh / 2}" width="${mw}" height="${mh}" rx="26" fill="#ffffff"/>`
      + `<image x="${-Wc / 2}" y="${-Hc / 2}" width="${Wc}" height="${Hc}" href="${uri}" preserveAspectRatio="xMidYMid slice"/>`
      + `<rect x="${-Wc / 2 - 0.5}" y="${-Hc / 2 - 0.5}" width="${Wc + 1}" height="${Hc + 1}" rx="${crx}" fill="none" stroke="${L.gold}" stroke-width="2.5" opacity="0.9"/>`
      + `</g>`;
  };
  const r = rng(21);
  let deco = "";
  for (let i = 0; i < 24; i++) {
    const x = Math.round(r() * 1750), y = Math.round(r() * H);
    deco += sparkle(x, y, 4 + r() * 5, L.goldSoft, 0.16 + r() * 0.16);
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="Georgia, serif">
  <defs>
    <radialGradient id="lbg" cx="34%" cy="26%" r="98%"><stop offset="0%" stop-color="${L.bg0}"/><stop offset="100%" stop-color="${L.bg1}"/></radialGradient>
    <radialGradient id="lsun" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="${L.goldSoft}" stop-opacity="0.30"/><stop offset="100%" stop-color="${L.goldSoft}" stop-opacity="0"/></radialGradient>
    <filter id="lglow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="10"/></filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#lbg)"/>
  <circle cx="430" cy="140" r="360" fill="url(#lsun)"/>
  ${deco}
  ${card(cards[0].uri, 2150, 440, -6)}
  ${card(cards[2].uri, 2720, 440, 6)}
  ${card(cards[1].uri, 2440, 412, 0, 1.06)}
  <text x="250" y="356" font-size="88" font-weight="bold" fill="${L.ink}" letter-spacing="1" style="font-variant: small-caps;">Personalized</text>
  <text x="250" y="452" font-size="88" font-weight="bold" fill="${L.ink}" letter-spacing="1" style="font-variant: small-caps;">Pet Natal Charts</text>
  <line x1="258" y1="500" x2="952" y2="500" stroke="${L.gold}" stroke-width="3" opacity="0.85"/>
  <text x="252" y="560" font-size="38" fill="${L.inkSoft}">Custom astrology birth charts for your dog or cat</text>
  <text x="252" y="620" font-size="30" fill="${L.gold}" letter-spacing="2" style="font-variant: small-caps;">★ Ready in 24 hours · A keepsake gift ★</text>
</svg>`;
}

// ---------------- FRAMING / PRESENTATION EXAMPLE (listing image) ----------------
// Guide-style: the SQUARE-CUT chart filling two real frames (Walnut & Gold + Matte Black) via a
// thin gold liner — so the frame catches the print exactly — plus a glossy laminated card.
function framingExampleSvg(squareUri: string, roundedUri: string): string {
  const W = 2400, H = 1740;
  type FS = { base: string; top: string; left: string; right: string; bottom: string; hi: string; liner: string };
  const WALNUT: FS = { base: "url(#walBase)", top: "#9a6b3c", left: "#7a5230", right: "#4e3418", bottom: "#382410", hi: "#b88a4e", liner: "#d8b562" };
  const BLACK: FS = { base: "url(#blkBase)", top: "#3c3c44", left: "#2a2a30", right: "#141418", bottom: "#0b0b0e", hi: "#5a5a64", liner: "#c9a24a" };
  const poly = (pts: number[][], fill: string) => `<polygon points="${pts.map((p) => p.join(",")).join(" ")}" fill="${fill}"/>`;

  // Gallery frame: thin molding + gold liner + the SQUARE chart filling it exactly (no white mat).
  const frame = (cx: number, cy: number, w: number, s: FS) => {
    const h = Math.round(w * 1300 / 820);
    const liner = Math.max(5, Math.round(w * 0.014));
    const fr = Math.round(w * 0.085), bv = Math.round(fr * 0.55), flat = fr - bv;
    const inW = w + liner * 2, inH = h + liner * 2;
    const BW = inW + bv * 2, BH = inH + bv * 2, FW = BW + flat * 2, FH = BH + flat * 2;
    const oBW = BW / 2, oBH = BH / 2, iW = inW / 2, iH = inH / 2;
    return `<g transform="translate(${cx} ${cy})">`
      + `<rect x="${-FW / 2 + 18}" y="${-FH / 2 + 30}" width="${FW}" height="${FH}" rx="3" fill="#1c130a" opacity="0.40" filter="url(#fblur)"/>`
      + `<rect x="${-FW / 2}" y="${-FH / 2}" width="${FW}" height="${FH}" rx="3" fill="${s.base}"/>`
      + poly([[-oBW, -oBH], [oBW, -oBH], [iW, -iH], [-iW, -iH]], s.top)
      + poly([[-oBW, oBH], [oBW, oBH], [iW, iH], [-iW, iH]], s.bottom)
      + poly([[-oBW, -oBH], [-iW, -iH], [-iW, iH], [-oBW, oBH]], s.left)
      + poly([[oBW, -oBH], [iW, -iH], [iW, iH], [oBW, oBH]], s.right)
      + `<rect x="${-FW / 2}" y="${-FH / 2}" width="${FW}" height="${FH}" rx="3" fill="none" stroke="${s.hi}" stroke-opacity="0.45" stroke-width="2"/>`
      + `<rect x="${-inW / 2}" y="${-inH / 2}" width="${inW}" height="${inH}" fill="${s.liner}"/>`
      + `<image x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" href="${squareUri}" preserveAspectRatio="xMidYMid slice"/>`
      + `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="18" fill="url(#innerShade)"/>`
      + `<polygon points="${-w / 2},${-h / 2} ${-w / 2 + w * 0.5},${-h / 2} ${-w / 2},${-h / 2 + h * 0.62}" fill="url(#glass)" opacity="0.08"/>`
      + `</g>`;
  };

  // Glossy laminated card: rounded print + white laminate border + a strong diagonal sheen.
  const laminate = (cx: number, cy: number, w: number, rot: number) => {
    const h = Math.round(w * 1300 / 820), crx = Math.round(40 * w / 820), e = Math.round(w * 0.035);
    return `<g transform="translate(${cx} ${cy}) rotate(${rot})">`
      + `<rect x="${-w / 2 - e + 14}" y="${-h / 2 - e + 24}" width="${w + e * 2}" height="${h + e * 2}" rx="${crx + e}" fill="#1c130a" opacity="0.36" filter="url(#fblur)"/>`
      + `<rect x="${-w / 2 - e}" y="${-h / 2 - e}" width="${w + e * 2}" height="${h + e * 2}" rx="${crx + e}" fill="#ffffff"/>`
      + `<image x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" href="${roundedUri}" preserveAspectRatio="xMidYMid slice"/>`
      + `<rect x="${-w / 2 - e}" y="${-h / 2 - e}" width="${w + e * 2}" height="${h + e * 2}" rx="${crx + e}" fill="none" stroke="#ffffff" stroke-opacity="0.7" stroke-width="2"/>`
      + `<polygon points="${-w / 2},${-h / 2} ${w / 2},${-h / 2} ${-w / 2},${h * 0.12}" fill="url(#gloss)" opacity="0.22"/>`
      + `</g>`;
  };

  const label = (cx: number, t: string, c: string) =>
    `<text x="${cx}" y="1330" text-anchor="middle" font-family="'Cinzel', Georgia, serif" font-size="38" letter-spacing="3" fill="${c}" style="font-variant: small-caps;">${t}</text>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="Georgia, serif">
  <defs>
    <radialGradient id="wall" cx="44%" cy="28%" r="98%"><stop offset="0%" stop-color="#efe8dc"/><stop offset="100%" stop-color="#d6cab4"/></radialGradient>
    <radialGradient id="wvig" cx="50%" cy="44%" r="64%"><stop offset="58%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#3a2e1c" stop-opacity="0.16"/></radialGradient>
    <linearGradient id="walBase" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a5e34"/><stop offset="100%" stop-color="#3a2510"/></linearGradient>
    <linearGradient id="blkBase" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#34343c"/><stop offset="100%" stop-color="#101014"/></linearGradient>
    <linearGradient id="innerShade" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#000" stop-opacity="0.35"/><stop offset="100%" stop-color="#000" stop-opacity="0"/></linearGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fff" stop-opacity="0.8"/><stop offset="60%" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <linearGradient id="gloss" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fff" stop-opacity="0.9"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <filter id="fblur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="20"/></filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#wall)"/>
  <rect width="${W}" height="${H}" fill="url(#wvig)"/>
  <text x="${W / 2}" y="150" text-anchor="middle" font-family="'Cinzel', Georgia, serif" font-size="74" font-weight="bold" fill="#2c1b3d" letter-spacing="1" style="font-variant: small-caps;">Print it &#183; Frame it &#183; Treasure it</text>
  ${frame(560, 800, 440, WALNUT)}
  ${frame(1200, 800, 440, BLACK)}
  ${laminate(1880, 1010, 300, 5)}
  ${label(560, "Walnut &amp; Gold", "#7a5230")}
  ${label(1200, "Matte Black", "#2c1b3d")}
  ${label(1880, "Laminated Card", "#7a5230")}
  <text x="${W / 2}" y="1648" text-anchor="middle" font-size="38" fill="#6a5570" font-style="italic">Same print — framed or laminated. Print it at home or any shop. (Wall not included.)</text>
</svg>`;
}

async function main() {
  const outDir = join("scripts", "natal", "out");
  mkdirSync(outDir, { recursive: true });

  const logo = rasterizeSvgToPng(logoSvg(), 1200);          // 1200×1200
  writeFileSync(join(outDir, "logo.png"), logo);
  console.log(`  ✓ logo     -> out/logo.png           (1200x1200, ${(logo.length / 1024).toFixed(0)} KB)`);

  const wordmark = rasterizeSvgToPng(logoStackedSvg(), 1400); // 1400×1622
  writeFileSync(join(outDir, "logo-wordmark.png"), wordmark);
  console.log(`  ✓ wordmark -> out/logo-wordmark.png  (1400x1622, ${(wordmark.length / 1024).toFixed(0)} KB)`);

  const banner = rasterizeSvgToPng(bannerSvg(), 3360);      // 3360×840 (Etsy ideal 4:1)
  writeFileSync(join(outDir, "banner.png"), banner);
  console.log(`  ✓ banner   -> out/banner.png         (3360x840, ${(banner.length / 1024).toFixed(0)} KB)`);

  const showcase = rasterizeSvgToPng(bannerShowcaseSvg(), 3360); // product-showcase banner
  writeFileSync(join(outDir, "banner-showcase.png"), showcase);
  console.log(`  ✓ banner2  -> out/banner-showcase.png (3360x840, ${(showcase.length / 1024).toFixed(0)} KB)`);

  // Lighter "gallery wall" banner: real pet photos in the chart medallions, cream background.
  const cards: Card[] = [];
  let goldieSvg = "";
  for (const p of PETS) {
    const photo = await loadPhoto(p.photo);
    const svg = petChartSvg(p, photo);
    if (p.name === "Goldie") goldieSvg = svg;
    const big = rasterizeSvgToPng(svg, 820);
    const thumb = rasterizeSvgToPng(svg, 360); // small copy for the framing-example minis
    writeFileSync(join(outDir, `sample-photo-${p.name.toLowerCase()}.png`), big);
    cards.push({
      uri: `data:image/png;base64,${big.toString("base64")}`,
      thumb: `data:image/png;base64,${thumb.toString("base64")}`,
    });
    console.log(`    · ${p.name.padEnd(7)} (${p.theme})  photo: ${photo ? "loaded" : "FALLBACK no-photo"}`);
  }
  const light = rasterizeSvgToPng(lightBannerSvg(cards), 3360);
  writeFileSync(join(outDir, "banner-light.png"), light);
  console.log(`  ✓ banner3  -> out/banner-light.png    (3360x840, ${(light.length / 1024).toFixed(0)} KB)`);

  // Square-cut chart (rx 0) so the frame catches the print exactly, like the guide mockup.
  const squarePng = rasterizeSvgToPng(goldieSvg.replace(/rx="40"/g, 'rx="0"'), 920);
  const squareUri = `data:image/png;base64,${squarePng.toString("base64")}`;
  const framing = rasterizeSvgToPng(framingExampleSvg(squareUri, cards[1].uri), 2400);
  writeFileSync(join(outDir, "framing-example.png"), framing);
  console.log(`  ✓ framing  -> out/framing-example.png (2400x1740, ${(framing.length / 1024).toFixed(0)} KB)`);

  console.log("\n  Etsy: icon = 500x500 (centered/circle-safe) max 1MB; big banner = 4:1 max 2MB.\n");
}

main().catch((e) => { console.error(e); process.exit(1); });
