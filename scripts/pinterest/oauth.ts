/**
 * Pinterest API v5 — OAuth bootstrap.
 *
 * One-time flow to obtain an access_token + refresh_token for posting Pins
 * to our own MyPawAdvisor account.
 *
 * Usage (run from the repo root):
 *   npx tsx scripts/pinterest/oauth.ts auth          # print the authorization URL
 *   npx tsx scripts/pinterest/oauth.ts token <code>  # exchange the code for tokens
 *
 * Requires scripts/pinterest/.env (see .env.example).
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ENV_PATH = join(HERE, ".env");
const TOKENS_PATH = join(HERE, "tokens.json");

// boards:read to look up board IDs, pins:write to create Pins.
const SCOPES = ["boards:read", "pins:read", "pins:write"];
const AUTH_URL = "https://www.pinterest.com/oauth/";
const TOKEN_URL = "https://api.pinterest.com/v5/oauth/token";

function loadEnv(): Record<string, string> {
  if (!existsSync(ENV_PATH)) {
    throw new Error(`Missing ${ENV_PATH} — copy .env.example to .env and fill it in.`);
  }
  const env: Record<string, string> = {};
  for (const line of readFileSync(ENV_PATH, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return env;
}

function need(env: Record<string, string>, key: string): string {
  const v = env[key];
  if (!v || v.includes("your_")) throw new Error(`Set ${key} in scripts/pinterest/.env`);
  return v;
}

async function main() {
  const env = loadEnv();
  const clientId = need(env, "PINTEREST_APP_ID");
  const clientSecret = need(env, "PINTEREST_APP_SECRET");
  const redirectUri = need(env, "PINTEREST_REDIRECT_URI");
  const cmd = process.argv[2];

  if (cmd === "auth") {
    const url = new URL(AUTH_URL);
    url.searchParams.set("client_id", clientId);
    url.searchParams.set("redirect_uri", redirectUri);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("scope", SCOPES.join(","));
    url.searchParams.set("state", Math.random().toString(36).slice(2));
    console.log("\n1. Open this URL in a browser logged into the MyPawAdvisor Pinterest account:\n");
    console.log("   " + url.toString());
    console.log("\n2. Approve. You'll be redirected to a 404 page at " + redirectUri);
    console.log("   Copy the `code` value from the address bar (everything after code= up to & if present).");
    console.log("\n3. Run:  npx tsx scripts/pinterest/oauth.ts token <code>\n");
    return;
  }

  if (cmd === "token") {
    const code = process.argv[3];
    if (!code) throw new Error("Usage: npx tsx scripts/pinterest/oauth.ts token <code>");
    const res = await fetch(TOKEN_URL, {
      method: "POST",
      headers: {
        Authorization: "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`Token exchange failed (HTTP ${res.status}): ${JSON.stringify(data)}`);
    }
    writeFileSync(TOKENS_PATH, JSON.stringify({ ...data, obtained_at: Date.now() }, null, 2));
    console.log("\n✓ Tokens saved to scripts/pinterest/tokens.json");
    console.log("  granted scopes:", data.scope);
    console.log("  access token expires in:", data.expires_in, "s");
    if (data.refresh_token) console.log("  refresh token expires in:", data.refresh_token_expires_in, "s");
    if (!String(data.scope || "").includes("pins:write")) {
      console.log("\n⚠ pins:write was NOT granted — Trial access may still be pending. Re-run once it's active.");
    }
    return;
  }

  console.log("Usage:\n  npx tsx scripts/pinterest/oauth.ts auth\n  npx tsx scripts/pinterest/oauth.ts token <code>");
}

main().catch((e) => {
  console.error("ERROR:", e instanceof Error ? e.message : e);
  process.exit(1);
});
