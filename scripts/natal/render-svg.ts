// Cosmic-fantasy natal chart certificate as a self-contained SVG.
// Dreamy / abstract / "visually addictive": nebula clouds, glowing pet-photo medallion,
// luminous planets, sparkle-stars. Themeable palette. Same SVG => on-screen preview
// (Phase B) and vector PDF keepsake (Phase C).
import type { BirthInput, NatalChart } from "./natal-chart";
import type { Reading } from "./reading-template";
import { PLANET_GLYPHS, type SignName } from "./data";
import { renderGlyph } from "./glyphs";

export type ThemeName = "nebula" | "aurora" | "ember";

interface Theme {
  bg0: string; bg1: string;            // sky gradient (outer -> center)
  gold: string; goldDim: string; ink: string;
  neb: [string, string, string];       // three nebula colors
  halo: string;                        // glow behind pet photo
  element: [string, string, string, string]; // fire/earth/air/water tints
}

const THEMES: Record<ThemeName, Theme> = {
  nebula: {
    bg0: "#1c0f33", bg1: "#070512",
    gold: "#f1d484", goldDim: "#b48ad8", ink: "#e9dcff",
    neb: ["#7b2ff7", "#c026d3", "#22d3ee"], halo: "#b57bff",
    element: ["#d05a8c", "#5b8f6a", "#7d7bd6", "#5b7fd0"],
  },
  aurora: {
    bg0: "#082a33", bg1: "#03101a",
    gold: "#ffe9a8", goldDim: "#79d8c2", ink: "#d8f5ec",
    neb: ["#14b8a6", "#22d3ee", "#34d399"], halo: "#5eead4",
    element: ["#e0a86a", "#3fa07a", "#54b4d6", "#3f8fd6"],
  },
  ember: {
    bg0: "#2c0f1f", bg1: "#0b0410",
    gold: "#ffd98a", goldDim: "#e0926a", ink: "#ffe6d6",
    neb: ["#f43f5e", "#fb923c", "#a855f7"], halo: "#fb7185",
    element: ["#e2654a", "#9a7d3f", "#a06fc0", "#c06a8a"],
  },
};

const SIGNS: SignName[] = [
  "Aries","Taurus","Gemini","Cancer","Leo","Virgo",
  "Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces",
];

const W = 820, H = 1300;   // taller frame to fit the elemental strip + signature footer
const DISPLAY = "'Cinzel', 'Cormorant Garamond', Georgia, serif";

// Three distinct certificate layouts (not just recolors): both the wheel geometry and the
// lower content change per layout. `classic` is the default so the paid PDF is unaffected.
export type LayoutName = "classic" | "poster" | "almanac";
interface LayoutCfg {
  cx: number; cy: number;
  rOuter: number; rZin: number; rPlanet: number; rDeglbl: number; rAspect: number; rPhoto: number;
  lower: "cards" | "poster" | "ribbon";
  ratingY: number; lowerY: number;
}
const LAYOUTS: Record<LayoutName, LayoutCfg> = {
  classic: { cx:410, cy:540, rOuter:270, rZin:230, rPlanet:200, rDeglbl:178, rAspect:138, rPhoto:88,  lower:"cards",  ratingY:842, lowerY:862  },
  poster:  { cx:410, cy:560, rOuter:330, rZin:286, rPlanet:252, rDeglbl:226, rAspect:180, rPhoto:108, lower:"poster", ratingY:946, lowerY:1000 },
  almanac: { cx:410, cy:440, rOuter:214, rZin:182, rPlanet:158, rDeglbl:140, rAspect:112, rPhoto:72,  lower:"ribbon", ratingY:686, lowerY:726  },
};

// Pet paw shape (viewBox 0 0 64 64) — faint watermark, matches the site's paw icon.
const PAW_PATH = "M32 38c-8 0-14 6-14 14 0 6 6 10 14 10s14-4 14-10c0-8-6-14-14-14zM14 28c-4 0-7 4-7 8s3 7 7 7 7-3 7-7-3-8-7-8zm36 0c-4 0-7 4-7 8s3 7 7 7 7-3 7-7-3-8-7-8zM22 12c-3 0-6 3-6 8s3 8 6 8 6-3 6-8-3-8-6-8zm20 0c-3 0-6 3-6 8s3 8 6 8 6-3 6-8-3-8-6-8z";
const PAW_POS: [number,number,number,number][] = [
  [86,158,72,-18],[726,142,52,22],[60,565,46,12],[760,540,60,-12],[410,150,38,8],
];

const PLANET_KEYS: Record<string,string> = {
  Sun:"sun",Moon:"moon",Mercury:"mercury",Venus:"venus",Mars:"mars",
  Jupiter:"jupiter",Saturn:"saturn",Uranus:"uranus",Neptune:"neptune",Pluto:"pluto",
};

function rng(seed: number) { let s = seed >>> 0; return () => { s = (s*1664525+1013904223)>>>0; return s/4294967296; }; }
const rad = (deg: number) => (deg * Math.PI) / 180;
const f = (n: number) => n.toFixed(2);

export interface CertEdits {
  sunNote?: string;
  moonNote?: string;
  risingNote?: string;
  signature?: string;    // the memorable closing line (premium editable)
  dedication?: string;   // optional custom message (premium)
}
export interface RenderOpts {
  photoDataUri?: string;
  theme?: ThemeName;
  edits?: CertEdits;
  layout?: LayoutName;   // classic (default) · poster · almanac
}

export function renderCertificateSVG(pet: BirthInput, chart: NatalChart, reading: Reading, opts: RenderOpts = {}): string {
  const T = THEMES[opts.theme ?? "nebula"];
  const L = LAYOUTS[opts.layout ?? "classic"];
  // Wheel geometry is layout-driven (shadows nothing global — these are the single source).
  const CX = L.cx, CY = L.cy;
  const R_OUTER = L.rOuter, R_ZIN = L.rZin;
  const R_PLANET = L.rPlanet, R_DEGLBL = L.rDeglbl;
  const R_ASPECT = L.rAspect, R_PHOTO = L.rPhoto;
  const hasPhoto = !!opts.photoDataUri;
  const ref = chart.ascendant?.lon ?? 0;
  const phi = (lon: number) => 180 + (lon - ref);
  const pt = (r: number, lon: number) => {
    const a = rad(phi(lon));
    return [CX + r * Math.cos(a), CY - r * Math.sin(a)] as const;
  };

  // ---------- starfield + constellations + sparkles ----------
  const rand = rng(99173);
  let stars = "";
  for (let i = 0; i < 260; i++) {
    const x = rand()*W, y = rand()*H, r = rand()*1.4 + 0.2, o = rand()*0.75 + 0.12;
    stars += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="#fff" opacity="${f(o)}"/>`;
  }
  // faint constellation chains threading the background
  let constellations = "";
  for (let c = 0; c < 4; c++) {
    const n = 4 + Math.floor(rand()*3);
    const ax = 120 + rand()*(W-240), ay = 90 + rand()*(H-260);
    const pts: [number,number][] = [];
    for (let k = 0; k < n; k++) pts.push([ax + (rand()-0.5)*220, ay + (rand()-0.5)*200]);
    for (let k = 0; k < n-1; k++)
      constellations += `<line x1="${f(pts[k][0])}" y1="${f(pts[k][1])}" x2="${f(pts[k+1][0])}" y2="${f(pts[k+1][1])}" stroke="${T.gold}" stroke-width="0.5" opacity="0.16"/>`;
    for (const [x,y] of pts)
      constellations += `<circle cx="${f(x)}" cy="${f(y)}" r="1.6" fill="${T.gold}" opacity="0.55" filter="url(#glow)"/>`;
  }
  let sparkles = "";
  for (let i = 0; i < 14; i++) {
    const x = rand()*W, y = rand()*(H*0.9)+30, s = rand()*6 + 4;
    sparkles += sparkle(x, y, s, T.gold);
  }

  // ---------- faint paw watermark ----------
  let paws = "";
  for (const [x,y,s,r] of PAW_POS) {
    paws += `<g transform="translate(${x},${y}) rotate(${r}) scale(${f(s/64)}) translate(-32,-32)" opacity="0.05"><path d="${PAW_PATH}" fill="${T.gold}"/></g>`;
  }

  // ---------- nebula clouds (intensified) ----------
  const neb = `
    <ellipse cx="210" cy="430" rx="340" ry="260" fill="url(#neb0)" opacity="0.4" filter="url(#soft)"/>
    <ellipse cx="650" cy="650" rx="320" ry="270" fill="url(#neb1)" opacity="0.36" filter="url(#soft)"/>
    <ellipse cx="430" cy="280" rx="360" ry="220" fill="url(#neb2)" opacity="0.26" filter="url(#soft)"/>
    <ellipse cx="${CX}" cy="${CY}" rx="280" ry="280" fill="url(#neb1)" opacity="0.18" filter="url(#soft)"/>`;

  // ---------- zodiac band ----------
  let band = "";
  for (let i = 0; i < 12; i++) {
    const l1 = i*30, l2 = i*30+30;
    const poly: string[] = [];
    for (let s = 0; s <= 12; s++) { const [x,y] = pt(R_OUTER, l1 + (l2-l1)*s/12); poly.push(`${f(x)},${f(y)}`); }
    for (let s = 12; s >= 0; s--) { const [x,y] = pt(R_ZIN, l1 + (l2-l1)*s/12); poly.push(`${f(x)},${f(y)}`); }
    band += `<polygon points="${poly.join(" ")}" fill="${T.element[i%4]}" opacity="0.16"/>`;
    const [ix,iy] = pt(R_ZIN, l1), [ox,oy] = pt(R_OUTER, l1);
    band += `<line x1="${f(ix)}" y1="${f(iy)}" x2="${f(ox)}" y2="${f(oy)}" stroke="${T.gold}" stroke-width="0.8" opacity="0.6"/>`;
    const [gx,gy] = pt((R_OUTER+R_ZIN)/2, l1+15);
    band += renderGlyph(SIGNS[i], gx, gy, 24, T.gold, { strokeWidth: 1.9 });
  }

  // ---------- house cusps ----------
  const hubInner = hasPhoto ? R_PHOTO + 16 : 58;
  let houses = "";
  if (chart.houseCusps) {
    chart.houseCusps.forEach((cusp, i) => {
      const [x1,y1] = pt(R_ZIN, cusp), [x2,y2] = pt(hubInner, cusp);
      const major = i % 3 === 0;
      houses += `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${T.goldDim}" stroke-width="${major?1.4:0.6}" opacity="${major?0.7:0.32}"/>`;
      const [nx,ny] = pt(hubInner + 12, cusp + 5);
      houses += `<text x="${f(nx)}" y="${f(ny+4)}" font-size="11" fill="${T.ink}" opacity="1" text-anchor="middle" font-family="Georgia, serif">${i+1}</text>`;
    });
  }

  // ---------- aspect lines ----------
  const lonByKey: Record<string, number> = {};
  for (const p of chart.placements) lonByKey[PLANET_KEYS[p.body]] = p.lon;
  const aColor = (t: string) =>
    t === "conjunction" ? T.gold :
    (t === "trine" || t === "sextile") ? "#73d6c4" :
    (t === "square" || t === "opposition") ? "#e891a0" : T.goldDim;
  let aspects = "";
  for (const a of chart.aspects) {
    if (lonByKey[a.a] == null || lonByKey[a.b] == null) continue;
    const [x1,y1] = pt(R_ASPECT, lonByKey[a.a]), [x2,y2] = pt(R_ASPECT, lonByKey[a.b]);
    aspects += `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${aColor(a.type)}" stroke-width="1" opacity="0.4" filter="url(#glow)"/>`;
  }

  // ---------- planets (luminous, de-overlapped) ----------
  const sorted = [...chart.placements].sort((p,q) => phi(p.lon) - phi(q.lon));
  const drawAngle = sorted.map(p => phi(p.lon));
  for (let i = 1; i < drawAngle.length; i++) if (drawAngle[i] - drawAngle[i-1] < 7) drawAngle[i] = drawAngle[i-1] + 7;
  let planets = "";
  sorted.forEach((p, i) => {
    const a = rad(drawAngle[i]);
    const px = CX + R_PLANET * Math.cos(a), py = CY - R_PLANET * Math.sin(a);
    const [tx,ty] = pt(R_ZIN-4, p.lon);
    planets += `<line x1="${f(tx)}" y1="${f(ty)}" x2="${f(px)}" y2="${f(py)}" stroke="${T.goldDim}" stroke-width="0.6" opacity="0.5"/>`;
    planets += `<circle cx="${f(px)}" cy="${f(py)}" r="22" fill="url(#pglow)" opacity="0.9"/>`;
    planets += `<circle cx="${f(px)}" cy="${f(py)}" r="15" fill="${T.bg1}" stroke="${T.gold}" stroke-width="1.1"/>`;
    planets += renderGlyph(p.body, px, py, 16, T.gold);
    const dx = CX + R_DEGLBL * Math.cos(a), dy = CY - R_DEGLBL * Math.sin(a);
    planets += `<text x="${f(dx)}" y="${f(dy+3)}" font-size="9" fill="${T.ink}" opacity="1" text-anchor="middle" font-family="Georgia, serif">${p.degree.split("°")[0]}°${p.retrograde?" ℞":""}</text>`;
  });

  // ---------- center: pet medallion or sigil ----------
  let center = "";
  center += `<circle cx="${CX}" cy="${CY}" r="${R_PHOTO+46}" fill="url(#halo)"/>`;
  if (hasPhoto) {
    center +=
      `<image href="${opts.photoDataUri}" x="${CX-R_PHOTO}" y="${CY-R_PHOTO}" width="${R_PHOTO*2}" height="${R_PHOTO*2}" clip-path="url(#petclip)" preserveAspectRatio="xMidYMid slice"/>` +
      `<circle cx="${CX}" cy="${CY}" r="${R_PHOTO}" fill="none" stroke="${T.gold}" stroke-width="3"/>` +
      `<circle cx="${CX}" cy="${CY}" r="${R_PHOTO+6}" fill="none" stroke="${T.gold}" stroke-width="0.8" opacity="0.6"/>`;
  } else {
    center += `<text x="${CX}" y="${CY+12}" font-size="40" fill="${T.gold}" text-anchor="middle" filter="url(#glow)">✦</text>`;
  }

  // ---------- big three cards ----------
  const ed = opts.edits ?? {};
  // Big Three cards — but drop the Rising card entirely when birth time is unknown
  // (no point showing an empty "add birth time" placeholder on the keepsake).
  const bt = [
    { label: "Sun",  glyph: PLANET_GLYPHS.Sun,  sign: chart.sun.sign,  note: ed.sunNote ?? reading.sunNote },
    { label: "Moon", glyph: PLANET_GLYPHS.Moon, sign: chart.moon.sign, note: ed.moonNote ?? reading.moonNote },
    ...(chart.ascendant
      ? [{ label: "Rising", glyph: "↑", sign: chart.ascendant.sign, note: ed.risingNote ?? reading.risingNote }]
      : []),
  ];
  // The Big-Three block changes shape per layout: classic = three cards, almanac = one
  // inline ribbon, poster = nothing (the oversized wheel + framed signature carry it).
  let cards = "";
  if (L.lower === "cards") {
    const cardW = 232, gap = 24, totalW = cardW*bt.length + gap*(bt.length-1), x0 = (W-totalW)/2, yC = L.lowerY;
    bt.forEach((c, i) => {
      const x = x0 + i*(cardW+gap);
      cards += `<rect x="${x}" y="${yC}" width="${cardW}" height="152" rx="12" fill="#080614" opacity="0.62" stroke="${T.gold}" stroke-width="1" stroke-opacity="0.55"/>`;
      cards += `<text x="${x+cardW/2}" y="${yC+34}" font-size="13" fill="${T.gold}" text-anchor="middle" letter-spacing="3" font-family="Georgia, serif">${c.label.toUpperCase()}</text>`;
      cards += `<text x="${x+cardW/2}" y="${yC+78}" font-size="29" fill="#fff" text-anchor="middle" font-family="Georgia, serif">${c.glyph}  ${c.sign}</text>`;
      // wrap the caption so it never spills past the card edge (max 2 lines)
      const noteLines = wrapText(c.note, 30).slice(0, 2);
      const noteY = noteLines.length > 1 ? yC + 108 : yC + 116;
      noteLines.forEach((ln, li) => {
        cards += `<text x="${x+cardW/2}" y="${noteY + li*17}" font-size="12.5" fill="#f3ecff" opacity="0.92" text-anchor="middle" font-family="Georgia, serif" font-style="italic">${escapeXml(ln)}</text>`;
      });
    });
  } else if (L.lower === "ribbon") {
    const yC = L.lowerY, rw = 600;
    cards += `<rect x="${(W-rw)/2}" y="${yC}" width="${rw}" height="70" rx="16" fill="#080614" opacity="0.55" stroke="${T.gold}" stroke-width="1" stroke-opacity="0.5"/>`;
    cards += `<text x="${CX}" y="${yC+27}" font-size="11" fill="${T.gold}" text-anchor="middle" letter-spacing="4" font-family="Georgia, serif">${bt.map(c=>c.label.toUpperCase()).join("      ·      ")}</text>`;
    cards += `<text x="${CX}" y="${yC+56}" font-size="25" fill="#fff" text-anchor="middle" font-family="Georgia, serif">${bt.map(c=>`${c.glyph} ${c.sign}`).join("     ")}</text>`;
  }

  // Crisp vector rating stars (the unicode ★ rendered as inconsistent emoji on some browsers).
  const SR = 11, SGAP = 30, sx0 = CX - (4 * SGAP) / 2;
  let starRow = "";
  for (let i = 0; i < 5; i++) starRow += vstar(sx0 + i * SGAP, L.ratingY, SR, T.gold, i < reading.starRating);
  const birthLine = `Born ${pet.year}-${String(pet.month).padStart(2,"0")}-${String(pet.day).padStart(2,"0")}` +
    (chart.hasTime ? ` · ${String(pet.hour).padStart(2,"0")}:${String(pet.minute).padStart(2,"0")}` : "") +
    (pet.cityLabel ? ` · ${pet.cityLabel}` : "");

  // ---------- footer: elemental strip + chart ruler + dedication + cosmic signature ----------
  const mx = reading.metrics;
  const triad = `${mx.element.dominant.toUpperCase()}  ·  ${mx.modality.dominant.toUpperCase()}  ·  ${mx.polarity.leaning === "Yang" ? "OUTGOING" : "INWARD"}`;
  const big = L.lower === "poster";   // poster gives the signature a framed panel
  const foot: string[] = [];
  let fy = L.lower === "cards"  ? L.lowerY + 152 + 38
        : L.lower === "ribbon" ? L.lowerY + 70 + 46
        : 988;                          // poster: below the oversized wheel
  foot.push(`<line x1="${(W-460)/2}" y1="${fy-24}" x2="${(W+460)/2}" y2="${fy-24}" stroke="${T.gold}" stroke-width="0.7" opacity="0.55"/>`);
  foot.push(`<text x="${CX}" y="${fy}" font-size="${big?19:17}" font-weight="700" fill="#ffe9b8" text-anchor="middle" letter-spacing="4" font-family="${DISPLAY}">${triad}</text>`);
  fy += big ? 32 : 28;
  if (mx.chartRuler) {
    foot.push(`<text x="${CX}" y="${fy}" font-size="12.5" fill="#ffffff" text-anchor="middle" opacity="0.95" font-style="italic">Chart ruler: ${mx.chartRuler.planet} in ${mx.chartRuler.sign}</text>`);
    fy += 26;
  }
  if (ed.dedication) {
    foot.push(`<text x="${CX}" y="${fy}" font-size="14" fill="${T.gold}" text-anchor="middle" font-style="italic" font-family="${DISPLAY}">${escapeXml(trimTo(ed.dedication, 70))}</text>`);
    fy += 28;
  }
  // Body serif (NOT the Cinzel titling face) so a full sentence stays readable, not all-caps.
  const sigLines = wrapText(ed.signature ?? reading.cosmicSignature, big ? 50 : 56).slice(0, 4);
  if (big) {
    const panelH = 78 + sigLines.length * 30;
    foot.push(`<rect x="${(W-560)/2}" y="${fy}" width="560" height="${panelH}" rx="18" fill="#080614" opacity="0.5" stroke="${T.gold}" stroke-width="1" stroke-opacity="0.5"/>`);
    fy += 34;
    foot.push(`<text x="${CX}" y="${fy}" font-size="12" font-weight="700" fill="#ffe9b8" text-anchor="middle" letter-spacing="3">✦ COSMIC SIGNATURE ✦</text>`);
    fy += 36;
    for (const ln of sigLines) {
      foot.push(`<text x="${CX}" y="${fy}" font-size="19" fill="#ffffff" text-anchor="middle" font-style="italic" font-family="'Cormorant Garamond', Georgia, serif">${escapeXml(ln)}</text>`);
      fy += 30;
    }
  } else {
    fy += 10;
    foot.push(`<text x="${CX}" y="${fy}" font-size="12" font-weight="700" fill="#ffe9b8" text-anchor="middle" letter-spacing="3">✦ COSMIC SIGNATURE ✦</text>`);
    fy += 26;
    for (const ln of sigLines) {
      foot.push(`<text x="${CX}" y="${fy}" font-size="16" fill="#ffffff" text-anchor="middle" font-style="italic" font-family="'Cormorant Garamond', Georgia, serif">${escapeXml(ln)}</text>`);
      fy += 25;
    }
  }
  const footer = foot.join("\n  ");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="Georgia, serif">
  <defs>
    <radialGradient id="sky" cx="50%" cy="40%" r="80%">
      <stop offset="0%" stop-color="${T.bg0}"/><stop offset="100%" stop-color="${T.bg1}"/>
    </radialGradient>
    ${nebGrad("neb0", T.neb[0])}${nebGrad("neb1", T.neb[1])}${nebGrad("neb2", T.neb[2])}
    <radialGradient id="halo" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${T.halo}" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="${T.halo}" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="${T.halo}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="pglow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${T.gold}" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="${T.gold}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="sheen" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.09"/>
      <stop offset="70%" stop-color="#ffffff" stop-opacity="0.02"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="title" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff"/><stop offset="100%" stop-color="${T.gold}"/>
    </linearGradient>
    <radialGradient id="vign" cx="50%" cy="42%" r="78%">
      <stop offset="52%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.55"/>
    </radialGradient>
    <linearGradient id="topShade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000" stop-opacity="0.55"/><stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="botShade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity="0.72"/>
    </linearGradient>
    <clipPath id="petclip"><circle cx="${CX}" cy="${CY}" r="${R_PHOTO}"/></clipPath>
    <clipPath id="frameclip"><rect x="0" y="0" width="${W}" height="${H}" rx="40"/></clipPath>
    <filter id="soft" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="34"/></filter>
    <filter id="glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.4"/></filter>
  </defs>

  <g clip-path="url(#frameclip)">
  <rect width="${W}" height="${H}" fill="url(#sky)"/>
  ${neb}
  ${stars}
  ${constellations}
  ${paws}
  ${sparkles}
  <rect width="${W}" height="${H}" fill="url(#vign)"/>
  <rect x="0" y="0" width="${W}" height="240" fill="url(#topShade)"/>
  <rect x="0" y="${H-380}" width="${W}" height="380" fill="url(#botShade)"/>
  <rect x="18" y="18" width="${W-36}" height="${H-36}" rx="24" fill="none" stroke="${T.gold}" stroke-width="1.4" opacity="0.65"/>
  <rect x="26" y="26" width="${W-52}" height="${H-52}" rx="17" fill="none" stroke="${T.gold}" stroke-width="0.6" opacity="0.35"/>

  <text x="${CX}" y="92" font-size="21" font-weight="700" fill="#ffe9b8" text-anchor="middle" letter-spacing="7" font-family="${DISPLAY}">✦ THE NATAL CHART OF ✦</text>
  <text x="${CX}" y="161" font-size="66" fill="url(#title)" text-anchor="middle" letter-spacing="2" font-family="${DISPLAY}">${escapeXml(pet.name)}</text>
  <text x="${CX}" y="193" font-size="14.5" fill="#efe7ff" text-anchor="middle" opacity="0.95" font-style="italic">${escapeXml((pet.breed?pet.breed+" ":"")+pet.species)} · ${escapeXml(birthLine)}</text>

  <circle cx="${CX}" cy="${CY}" r="${R_OUTER+6}" fill="none" stroke="${T.gold}" stroke-width="0.6" opacity="0.35"/>
  <circle cx="${CX}" cy="${CY}" r="${R_OUTER}" fill="none" stroke="${T.gold}" stroke-width="1.5"/>
  <circle cx="${CX}" cy="${CY}" r="${R_ZIN}" fill="none" stroke="${T.goldDim}" stroke-width="1" opacity="0.8"/>
  ${band}
  <ellipse cx="${CX-70}" cy="${CY-90}" rx="230" ry="170" fill="url(#sheen)"/>
  ${houses}
  ${aspects}
  ${planets}
  ${center}

  ${starRow}
  ${cards}
  ${footer}
  <text x="${CX}" y="${H-46}" font-size="11" fill="${T.goldDim}" text-anchor="middle" letter-spacing="3">M Y P A W A D V I S O R</text>
  </g>
</svg>`;

  // Namespace every internal id/url(#…) so multiple charts can coexist on one page without
  // their gradients/clips colliding (which made every card render the first card's theme).
  return uniquifyIds(svg);
}

// Internal SVG ids that must be made unique per render.
const SVG_IDS = ["sky","neb0","neb1","neb2","halo","pglow","sheen","title","vign","topShade","botShade","petclip","frameclip","soft","glow"];
let __svgUid = 0;
function uniquifyIds(svg: string): string {
  const uid = "u" + (__svgUid++).toString(36);
  let out = svg;
  for (const id of SVG_IDS) {
    out = out.split(`id="${id}"`).join(`id="${id}-${uid}"`).split(`url(#${id})`).join(`url(#${id}-${uid})`);
  }
  return out;
}

function nebGrad(id: string, color: string): string {
  return `<radialGradient id="${id}" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="${color}" stop-opacity="0.9"/>
    <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
  </radialGradient>`;
}
// A crisp 5-point star. `filled` => solid gold; otherwise a faint gold outline.
function vstar(cx: number, cy: number, r: number, color: string, filled: boolean): string {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 === 0 ? r : r * 0.42;
    pts.push(`${f(cx + rr * Math.cos(a))},${f(cy + rr * Math.sin(a))}`);
  }
  const fill = filled ? `fill="${color}"` : `fill="none" stroke="${color}" stroke-width="1" opacity="0.5"`;
  return `<polygon points="${pts.join(" ")}" ${fill}/>`;
}
function sparkle(x: number, y: number, s: number, color: string): string {
  return `<g opacity="0.9" filter="url(#glow)">` +
    `<path d="M${f(x)},${f(y-s)} L${f(x+s*0.18)},${f(y-s*0.18)} L${f(x+s)},${f(y)} L${f(x+s*0.18)},${f(y+s*0.18)} L${f(x)},${f(y+s)} L${f(x-s*0.18)},${f(y+s*0.18)} L${f(x-s)},${f(y)} L${f(x-s*0.18)},${f(y-s*0.18)} Z" fill="${color}"/>` +
    `</g>`;
}
function escapeXml(s: string): string {
  return s.replace(/[<>&'"]/g, (c) => ({ "<":"&lt;", ">":"&gt;", "&":"&amp;", "'":"&apos;", '"':"&quot;" }[c]!));
}
function trimTo(s: string, n: number): string { return s.length <= n ? s : s.slice(0, n-1).trimEnd() + "…"; }
function wrapText(s: string, maxChars: number): string[] {
  const words = s.split(/\s+/);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > maxChars) { if (cur) lines.push(cur); cur = w; }
    else cur = (cur + " " + w).trim();
  }
  if (cur) lines.push(cur);
  return lines;
}
