// Determinism layer for the reading engine.
//
// The whole model's consistency requirement ("same details => same reading, every
// theme identical") rests here: a stable hash of the *input details only* seeds every
// phrasing choice. Theme is never hashed, so swapping themes can't change a word.
//
// No Math.random anywhere in the reading pipeline — every variant is chosen by hashing
// (seed + a per-slot key), so each section picks independently and growing one bank
// never shifts another section's selection.

import type { BirthInput } from "./natal-chart";

// cyrb53 — small, fast, well-distributed 53-bit string hash (public domain).
export function cyrb53(str: string, seed = 0): number {
  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

// A stable seed from the birth details only. NOT the theme, NOT the chosen UI options.
// Coordinates are rounded so trivially-different geocoder digits don't change the seed.
export function seedFromInput(pet: BirthInput): number {
  const norm = [
    pet.name.trim().toLowerCase(),
    pet.species.trim().toLowerCase(),
    pet.breed.trim().toLowerCase(),
    pet.year, pet.month, pet.day,
    pet.hour ?? "x", pet.minute ?? "x",
    pet.latitude.toFixed(4), pet.longitude.toFixed(4),
  ].join("|");
  return cyrb53(norm);
}

// Deterministically pick one item from a bank for a given slot. Each slot hashes
// independently (seed combined with the slot key), so banks can grow without shifting
// any other slot's choice.
export function pickFor<T>(seed: number, slotKey: string, arr: readonly T[]): T {
  if (arr.length === 0) throw new Error(`pickFor: empty bank for slot "${slotKey}"`);
  const h = cyrb53(slotKey, seed >>> 0);
  return arr[h % arr.length];
}

// Pick up to `n` distinct items for a slot, deterministically (e.g. two aspect lines).
// Walks the bank in a seed-rotated order so the choice is stable but varied per chart.
export function pickN<T>(seed: number, slotKey: string, arr: readonly T[], n: number): T[] {
  if (n <= 0 || arr.length === 0) return [];
  const start = cyrb53(slotKey, seed >>> 0) % arr.length;
  const step = 1 + (cyrb53(slotKey + "#step", seed >>> 0) % Math.max(1, arr.length - 1));
  const out: T[] = [];
  const seen = new Set<number>();
  let idx = start;
  while (out.length < Math.min(n, arr.length)) {
    if (!seen.has(idx)) { seen.add(idx); out.push(arr[idx]); }
    idx = (idx + step) % arr.length;
    if (seen.size >= arr.length) break;
  }
  return out;
}
