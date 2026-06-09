// Hand-drawn vector glyphs for the 12 zodiac signs + 10 planets.
//
// WHY: the Unicode astrological characters (♈ ♉ … ☉ ☽ ♀ ♂ …) render as low-quality
// COLOR EMOJI on many browsers/OSes, and because the PDF export rasterizes the SVG through
// the browser's image renderer, that emoji junk ends up in the PDF too. Drawing the symbols
// as plain SVG paths makes them font-independent and emoji-proof — pixel-identical on screen,
// in the raster, and in the printed keepsake.
//
// Each glyph is authored in a centered coordinate box (~ -10..10) and stroked, so it inherits
// a consistent thin line weight and the theme's gold via `currentColor`.

// Inner markup per symbol, keyed by the exact names used elsewhere (sign labels + planet
// `body` labels). Solid bits use fill="currentColor"; everything else is stroked by the group.
const G: Record<string, string> = {
  // ---------- planets ----------
  Sun: `<circle cx="0" cy="0" r="7.5"/><circle cx="0" cy="0" r="1.5" fill="currentColor" stroke="none"/>`,
  Moon: `<path fill-rule="evenodd" fill="currentColor" stroke="none" d="M -8,0 A 8,8 0 1,0 8,0 A 8,8 0 1,0 -8,0 Z M -3.6,0 A 6.4,6.4 0 1,0 9.2,0 A 6.4,6.4 0 1,0 -3.6,0 Z"/>`,
  Mercury: `<circle cx="0" cy="-0.5" r="4"/><path d="M -3.5,-9 A 3.5,3.5 0 0,0 3.5,-9"/><path d="M 0,3.5 L 0,9.5 M -3.5,6.5 L 3.5,6.5"/>`,
  Venus: `<circle cx="0" cy="-3.5" r="4.5"/><path d="M 0,1 L 0,9.5 M -3.5,5.5 L 3.5,5.5"/>`,
  Mars: `<circle cx="-2.5" cy="2.5" r="4.8"/><path d="M 1,-1 L 8.5,-8.5"/><path d="M 8.5,-8.5 L 3,-8.5 M 8.5,-8.5 L 8.5,-3"/>`,
  Jupiter: `<path d="M -7,-3 C -7,-9 1.5,-9 1.5,-3 L 1.5,8.5"/><path d="M -6.5,4.5 L 6.5,4.5"/>`,
  Saturn: `<path d="M -3,-9 L -3,5 C -3,8.5 3.5,8.5 4,3"/><path d="M -7,-4.5 L 1.5,-4.5"/>`,
  Uranus: `<path d="M -5,-9 L -5,2 M 5,-9 L 5,2 M -5,-3.5 L 5,-3.5 M 0,-3.5 L 0,5.5"/><circle cx="0" cy="7.6" r="2"/>`,
  Neptune: `<path d="M -6.5,-8.5 L -6.5,-2 M 6.5,-8.5 L 6.5,-2 M 0,-8.5 L 0,9"/><path d="M -6.5,-2 Q 0,5 6.5,-2"/><path d="M -4,5 L 4,5"/>`,
  Pluto: `<path d="M -4.5,-2 A 4.5,4.5 0 0,0 4.5,-2"/><circle cx="0" cy="-2.5" r="2.2"/><path d="M 0,2.5 L 0,9.5 M -4,6 L 4,6"/>`,

  // ---------- zodiac ----------
  Aries: `<path d="M 0,9 L 0,-1"/><path d="M 0,-1 C 0,-7 -7,-7 -7,-0.5"/><path d="M 0,-1 C 0,-7 7,-7 7,-0.5"/>`,
  Taurus: `<circle cx="0" cy="3.5" r="5.5"/><path d="M -7.5,-8 A 7.5,7.5 0 0,0 7.5,-8"/>`,
  Gemini: `<path d="M -4.5,-8 Q 0,-9.5 4.5,-8 M -4.5,8 Q 0,9.5 4.5,8 M -3,-8.5 L -3,8.5 M 3,-8.5 L 3,8.5"/>`,
  Cancer: `<path d="M -8.5,-2.5 C -8.5,-6 -1,-6 3.5,-3.5"/><circle cx="4.5" cy="-3" r="2.3" fill="currentColor" stroke="none"/><path d="M 8.5,2.5 C 8.5,6 1,6 -3.5,3.5"/><circle cx="-4.5" cy="3" r="2.3" fill="currentColor" stroke="none"/>`,
  Leo: `<circle cx="-4.5" cy="4" r="3.3"/><path d="M -1.3,2.5 C 2,-3 -3.5,-9 2.5,-8.5 C 8,-8 7.5,-0.5 3.5,4.5"/>`,
  Virgo: `<path d="M -7,8 L -7,-4 C -7,-6.5 -3.5,-6.5 -3.5,-4 L -3.5,8"/><path d="M -3.5,-4 C -3.5,-6.5 0,-6.5 0,-4 L 0,8"/><path d="M 0,-4 C 0,-6.5 3.5,-6.5 3.5,-4 L 3.5,6.5 C 3.5,9.5 7.5,9 7,4.5 C 6.7,2 3.5,3 5,6"/>`,
  Libra: `<path d="M -8,7.5 L 8,7.5"/><path d="M -8,1.5 L -4.5,1.5 A 4.5,4.5 0 0,1 4.5,1.5 L 8,1.5"/>`,
  Scorpio: `<path d="M -8,8 L -8,-4 C -8,-6.5 -4.5,-6.5 -4.5,-4 L -4.5,8"/><path d="M -4.5,-4 C -4.5,-6.5 -1,-6.5 -1,-4 L -1,8"/><path d="M -1,-4 C -1,-6.5 2.5,-6.5 2.5,-4 L 2.5,8.5 L 7.5,8.5"/><path d="M 7.5,8.5 L 7.5,3.5 M 7.5,8.5 L 4.5,5.5"/>`,
  Sagittarius: `<path d="M -7.5,8 L 6.5,-6"/><path d="M 6.5,-6 L 0.5,-6 M 6.5,-6 L 6.5,0"/><path d="M -3.5,-1.5 L 3,5"/>`,
  Capricorn: `<path d="M -7.5,-5 C -6,-8 -1.5,-8 -2,-3.5 L -2,5"/><path d="M -2,-1 C -0.5,-5 3.5,-5 4,-1 C 4.5,3 1,4 -0.5,2 C 2,4.5 7,5 5.5,9 C 4.5,11 1.5,9.5 1,6"/>`,
  Aquarius: `<path d="M -8.5,-2.5 L -4.5,-5 L -0.5,-2.5 L 3.5,-5 L 8.5,-2.5"/><path d="M -8.5,4 L -4.5,1.5 L -0.5,4 L 3.5,1.5 L 8.5,4"/>`,
  Pisces: `<path d="M -6,-8 A 6.5,8 0 0,0 -6,8"/><path d="M 6,-8 A 6.5,8 0 0,1 6,8"/><path d="M -6,0 L 6,0"/>`,
};

export function hasGlyph(name: string): boolean {
  return name in G;
}

// Render a symbol centered at (cx,cy), drawn at roughly `size` px tall, in `stroke` color.
export function renderGlyph(name: string, cx: number, cy: number, size: number, stroke: string, opts: { filter?: string; strokeWidth?: number } = {}): string {
  const inner = G[name];
  if (!inner) return "";
  const s = size / 20;                         // inner box is ~20 units (-10..10) tall
  const sw = (opts.strokeWidth ?? 1.7) ;       // stroke width in local units (scaled with the glyph)
  const filter = opts.filter ? ` filter="${opts.filter}"` : "";
  return `<g transform="translate(${cx},${cy}) scale(${s.toFixed(4)})" color="${stroke}" stroke="${stroke}" stroke-width="${sw}" fill="none" stroke-linecap="round" stroke-linejoin="round"${filter}>${inner}</g>`;
}
