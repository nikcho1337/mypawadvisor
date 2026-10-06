/**
 * Pinterest API v5 client — loads tokens, auto-refreshes the access token
 * before it expires, and exposes a small `api()` helper.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ENV_PATH = join(HERE, ".env");
const TOKENS_PATH = join(HERE, "tokens.json");
const API_BASE = "https://api.pinterest.com/v5";
const TOKEN_URL = "https://api.pinterest.com/v5/oauth/token";

type Tokens = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  obtained_at: number;
  [k: string]: unknown;
};

function loadEnv(): Record<string, string> {
  if (!existsSync(ENV_PATH)) throw new Error(`Missing ${ENV_PATH}`);
  const env: Record<string, string> = {};
  for (const line of readFileSync(ENV_PATH, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return env;
}

function loadTokens(): Tokens {
  if (!existsSync(TOKENS_PATH)) {
    throw new Error("No tokens.json — run oauth.ts auth/token first.");
  }
  return JSON.parse(readFileSync(TOKENS_PATH, "utf8"));
}

async function refresh(tokens: Tokens): Promise<Tokens> {
  const env = loadEnv();
  const basic = Buffer.from(`${env.PINTEREST_APP_ID}:${env.PINTEREST_APP_SECRET}`).toString("base64");
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { Authorization: "Basic " + basic, "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: tokens.refresh_token }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Token refresh failed (HTTP ${res.status}): ${JSON.stringify(data)}`);
  const updated: Tokens = { ...tokens, ...data, obtained_at: Date.now() };
  writeFileSync(TOKENS_PATH, JSON.stringify(updated, null, 2));
  console.error("(refreshed access token)");
  return updated;
}

async function accessToken(): Promise<string> {
  let tokens = loadTokens();
  const ageMs = Date.now() - tokens.obtained_at;
  const ttlMs = tokens.expires_in * 1000;
  if (ageMs > ttlMs - 5 * 60 * 1000) tokens = await refresh(tokens); // refresh 5 min early
  return tokens.access_token;
}

export async function api<T = unknown>(path: string, init: RequestInit = {}): Promise<T> {
  const token = await accessToken();
  const res = await fetch(API_BASE + path, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", ...(init.headers || {}) },
  });
  const text = await res.text();
  let data: unknown;
  try { data = text ? JSON.parse(text) : {}; } catch { data = text; }
  if (!res.ok) {
    throw new Error(`Pinterest ${init.method || "GET"} ${path} failed (HTTP ${res.status}): ${JSON.stringify(data)}`);
  }
  return data as T;
}
