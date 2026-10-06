// The WRITTEN READING page — page 2 of the deliverable (page 1 is the visual chart).
// Decoupled from the engine's Reading shape via ReadingContent, so the SAME layout serves
// both real orders (fed from buildReading) and a hand-written listing example.
import type { ThemeName } from "./render-svg";

export interface ReadingContent {
  name: string;
  subtitle: string;                                  // "Golden Retriever · Born Jul 15, 2021 · Austin, USA"
  starRating: number;                                // 1..5
  sections: { heading: string; body: string }[];
  signature: string;                                 // the closing Cosmic Signature line
}

const PAL: Record<ThemeName, { bg0: string; bg1: string; gold: string; goldDim: string; ink: string; panel: string }> = {
  nebula: { bg0: "#1c0f33", bg1: "#070512", gold: "#f1d484", goldDim: "#c9a9ec", ink: "#e9dcff", panel: "#2a1a48" },
  aurora: { bg0: "#082a33", bg1: "#03101a", gold: "#ffe9a8", goldDim: "#8fe6cf", ink: "#d8f5ec", panel: "#0e3a44" },
  ember:  { bg0: "#2c0f1f", bg1: "#0b0410", gold: "#ffd98a", goldDim: "#f0a886", ink: "#ffe6d6", panel: "#3a1422" },
};

const DISPLAY = "'Cinzel', Georgia, serif";
const SERIF = "Georgia, serif";

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function wrap(text: string, max: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > max) { lines.push(cur); cur = w; }
    else { cur = (cur + " " + w).trim(); }
  }
  if (cur) lines.push(cur);
  return lines;
}

// Deterministic faint starfield.
function stars(n: number, seed: number, gold: string): string {
  let s = seed;
  const rnd = () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };
  let out = "";
  for (let i = 0; i < n; i++) {
    const x = (rnd() * 820).toFixed(0), y = (rnd() * 1300).toFixed(0);
    const r = (0.5 + rnd() * 1.3).toFixed(2), o = (0.15 + rnd() * 0.4).toFixed(2);
    out += `<circle cx="${x}" cy="${y}" r="${r}" fill="${rnd() > 0.8 ? gold : "#ffffff"}" opacity="${o}"/>`;
  }
  return out;
}

export function renderReadingPageSVG(c: ReadingContent, theme: ThemeName): string {
  const P = PAL[theme];
  const W = 820, H = 1300, MX = 84, BODY = 16, LH = 25, MAXC = 70;
  const parts: string[] = [];

  parts.push(`<rect x="0" y="0" width="${W}" height="${H}" rx="40" fill="url(#rbg)"/>`);
  parts.push(`<ellipse cx="170" cy="150" rx="240" ry="180" fill="${P.goldDim}" opacity="0.07" filter="url(#rblur)"/>`);
  parts.push(`<ellipse cx="660" cy="1120" rx="240" ry="200" fill="${P.gold}" opacity="0.05" filter="url(#rblur)"/>`);
  parts.push(stars(70, 99, P.gold));

  // ---- header ----
  parts.push(`<text x="${W / 2}" y="118" text-anchor="middle" font-family="${DISPLAY}" font-size="33" letter-spacing="2" fill="${P.gold}">${esc(c.name.toUpperCase())}'S COSMIC READING</text>`);
  parts.push(`<text x="${W / 2}" y="150" text-anchor="middle" font-family="${SERIF}" font-size="15" letter-spacing="1" fill="${P.ink}" opacity="0.85" font-style="italic">${esc(c.subtitle)}</text>`);
  const rate = "★".repeat(Math.max(0, Math.min(5, c.starRating))) + "☆".repeat(5 - c.starRating);
  parts.push(`<text x="${W / 2}" y="184" text-anchor="middle" font-size="20" fill="${P.gold}" letter-spacing="4">${rate}</text>`);
  parts.push(`<line x1="${MX}" y1="206" x2="${W - MX}" y2="206" stroke="${P.gold}" stroke-width="1" opacity="0.4"/>`);

  // ---- sections ----
  let y = 252;
  for (const s of c.sections) {
    parts.push(`<text x="${MX}" y="${y}" font-family="${DISPLAY}" font-size="18" letter-spacing="2" fill="${P.gold}" style="font-variant: small-caps;">${esc(s.heading)}</text>`);
    y += 30;
    for (const ln of wrap(s.body, MAXC)) {
      parts.push(`<text x="${MX}" y="${y}" font-family="${SERIF}" font-size="${BODY}" fill="${P.ink}">${esc(ln)}</text>`);
      y += LH;
    }
    y += 22;
  }

  // ---- cosmic signature panel (anchored near the bottom) ----
  const sigLines = wrap(c.signature, 60);
  const boxH = 70 + sigLines.length * 24;
  const boxY = H - boxH - 56;
  parts.push(`<rect x="${MX - 16}" y="${boxY}" width="${W - 2 * (MX - 16)}" height="${boxH}" rx="14" fill="${P.panel}" opacity="0.55" stroke="${P.gold}" stroke-width="1" stroke-opacity="0.5"/>`);
  parts.push(`<text x="${W / 2}" y="${boxY + 34}" text-anchor="middle" font-family="${DISPLAY}" font-size="15" letter-spacing="3" fill="${P.gold}">✦ COSMIC SIGNATURE ✦</text>`);
  let sy = boxY + 62;
  for (const ln of sigLines) {
    parts.push(`<text x="${W / 2}" y="${sy}" text-anchor="middle" font-family="${SERIF}" font-size="17" font-style="italic" fill="#ffffff">${esc(ln)}</text>`);
    sy += 24;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="rbg" cx="50%" cy="36%" r="80%"><stop offset="0%" stop-color="${P.bg0}"/><stop offset="100%" stop-color="${P.bg1}"/></radialGradient>
    <filter id="rblur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="40"/></filter>
  </defs>
  ${parts.join("\n  ")}
</svg>`;
}
