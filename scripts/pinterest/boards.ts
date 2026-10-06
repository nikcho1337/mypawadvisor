/**
 * List the Pinterest boards on the connected account, with their IDs.
 * Usage: npx tsx scripts/pinterest/boards.ts
 */
import { api } from "./client";

async function main() {
  const data = await api<{ items?: { id: string; name: string; privacy: string }[] }>("/boards?page_size=100");
  const boards = data.items || [];
  if (boards.length === 0) {
    console.log("No boards found. Create one in the Pinterest app first.");
    return;
  }
  console.log(`Found ${boards.length} board(s):\n`);
  for (const b of boards) {
    console.log(`  ${b.id}  ${b.name}  [${b.privacy}]`);
  }
}

main().catch((e) => {
  console.error("ERROR:", e instanceof Error ? e.message : e);
  process.exit(1);
});
