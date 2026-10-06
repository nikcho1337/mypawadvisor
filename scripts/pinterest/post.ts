/**
 * Create a Pin from a JSON spec file.
 * Usage: npx tsx scripts/pinterest/post.ts <pin.json>
 *
 * pin.json shape:
 * {
 *   "board_id":   "796081740322651221",
 *   "title":      "...",
 *   "description":"...",
 *   "link":       "https://mypawadvisor.com/reviews/...",
 *   "image_url":  "https://m.media-amazon.com/images/I/....jpg",
 *   "alt_text":   "..."        // optional
 * }
 */
import { readFileSync } from "node:fs";
import { api } from "./client";

type PinSpec = {
  board_id: string;
  title: string;
  description: string;
  link: string;
  image_url: string;
  alt_text?: string;
};

export async function createPin(spec: PinSpec): Promise<{ id?: string; [k: string]: unknown }> {
  const body = {
    board_id: spec.board_id,
    title: spec.title,
    description: spec.description,
    link: spec.link,
    alt_text: spec.alt_text,
    media_source: { source_type: "image_url", url: spec.image_url },
  };
  return api("/pins", { method: "POST", body: JSON.stringify(body) });
}

async function main() {
  const file = process.argv[2];
  if (!file) throw new Error("Usage: npx tsx scripts/pinterest/post.ts <pin.json>");
  const spec: PinSpec = JSON.parse(readFileSync(file, "utf8"));
  console.log(`Posting "${spec.title}" to board ${spec.board_id}…`);
  const pin = await createPin(spec);
  console.log("\n✓ Pin created");
  console.log("  id:  ", pin.id);
  console.log("  view:", `https://www.pinterest.com/pin/${pin.id}/`);
}

main().catch((e) => {
  console.error("ERROR:", e instanceof Error ? e.message : e);
  process.exit(1);
});
