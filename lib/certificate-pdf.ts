// Client-side PDF keepsake export. Rasterizes the certificate SVG at high resolution
// (with the Cinzel webfont inlined so it survives the SVG-as-image render) and places it
// full-bleed into an A4 PDF. A4's aspect (1:1.414) matches the 820×1160 certificate, so
// there is no distortion. Vector SVG->PDF would drop the glow filters and break the
// astrological glyphs, so we raster — the result is pixel-identical to the on-screen chart.
import { jsPDF } from "jspdf";

const CERT_W = 820, CERT_H = 1300;   // must match the SVG's viewBox in render-svg.ts

let cachedFontCss: string | null = null;

function abToBase64(ab: ArrayBuffer): string {
  const bytes = new Uint8Array(ab);
  let bin = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunk)));
  }
  return btoa(bin);
}

// Fetch the Cinzel @font-face CSS and inline each woff2 as a data URI so the font renders
// inside an <img>-loaded SVG (which cannot reach the page's loaded webfonts).
async function inlineCinzelCss(): Promise<string> {
  if (cachedFontCss !== null) return cachedFontCss;
  try {
    const cssRes = await fetch("https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&display=swap");
    let css = await cssRes.text();
    const urls = Array.from(new Set([...css.matchAll(/url\((https:[^)]+\.woff2)\)/g)].map((m) => m[1])));
    for (const u of urls) {
      const fb = await fetch(u);
      const b64 = abToBase64(await fb.arrayBuffer());
      css = css.split(u).join(`data:font/woff2;base64,${b64}`);
    }
    cachedFontCss = css;
  } catch {
    cachedFontCss = ""; // graceful: name falls back to system serif in the PDF
  }
  return cachedFontCss;
}

function rasterize(svg: string, scale: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(CERT_W * scale);
        canvas.height = Math.round(CERT_H * scale);
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);
        resolve(canvas.toDataURL("image/png"));
      } catch (e) {
        URL.revokeObjectURL(url);
        reject(e);
      }
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Could not render the certificate image.")); };
    img.src = url;
  });
}

export async function downloadCertificatePdf(svg: string, filename: string): Promise<void> {
  const fontCss = await inlineCinzelCss();
  let styled = fontCss
    ? svg.replace(/<svg([^>]*)>/, `<svg$1><style>${fontCss}</style>`)
    : svg;
  // Drop the "MYPAWADVISOR" footer watermark from the paid PDF (it stays on the free
  // on-screen preview as a light watermark).
  styled = styled.replace(/<text[^>]*>[^<]*A D V I S O R[^<]*<\/text>/g, "");

  // 2.5× → ~2050px wide (~250 DPI at this page size): crisp on screen and in print.
  const png = await rasterize(styled, 2.5);

  // Page matches the certificate's own proportions (820×1300) so the full-bleed art is
  // never stretched or letterboxed.
  const doc = new jsPDF({ orientation: "portrait", unit: "px", format: [CERT_W, CERT_H] });
  const pw = doc.internal.pageSize.getWidth();
  const ph = doc.internal.pageSize.getHeight();
  doc.addImage(png, "PNG", 0, 0, pw, ph, undefined, "FAST");
  doc.save(filename);
}
