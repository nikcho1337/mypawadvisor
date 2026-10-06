// Web-sized theme samples for /natal-chart ("what you receive" preview).
//   npx tsx scripts/natal/samples.ts   (renders out/sample-{theme}.png first, if missing)
//   npx tsx scripts/natal/web-samples.ts
// Writes public/natal/sample-{theme}.jpg at 560px wide (~40–70 KB each) using sharp (ships with Next).
import sharp from "sharp";
import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const HERE = join(process.cwd(), "scripts", "natal", "out");
const OUT = join(process.cwd(), "public", "natal");
mkdirSync(OUT, { recursive: true });

async function main() {
  for (const theme of ["nebula", "aurora", "ember"]) {
    const src = join(HERE, `sample-${theme}.png`);
    if (!existsSync(src)) { console.warn(`missing ${src} — run samples.ts first`); continue; }
    const dst = join(OUT, `sample-${theme}.jpg`);
    const info = await sharp(src).resize({ width: 560 }).jpeg({ quality: 80, mozjpeg: true }).toFile(dst);
    console.log(`wrote ${dst} ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)} KB`);
  }
}
main().catch((e) => { console.error(e); process.exit(1); });
