#!/usr/bin/env node
/**
 * Free search engine submission script for mypawadvisor.com
 *
 * Submits all pages to:
 *  - IndexNow (covers Bing, Yandex, Seznam, Naver instantly)
 *  - Google sitemap ping (queues crawl)
 *  - Bing sitemap ping
 *
 * Run: node scripts/submit-indexnow.js
 */

const SITE = "https://mypawadvisor.com";
const INDEXNOW_KEY = "a8f3d2e1c9b7a4f6e5d8c3b2a1f9e7d6";

const urls = [
  "/",
  "/reviews",
  "/reviews/kong-classic-dog-toy",
  "/reviews/furminator-deshedding-tool",
  "/reviews/rocco-roxie-stain-eliminator",
  "/reviews/outward-hound-slow-feeder",
  "/reviews/thundershirt-dog-anxiety",
  "/reviews/petfusion-ultimate-dog-bed",
  "/reviews/arm-hammer-dog-dental-kit",
  "/reviews/cat-dancer-interactive-toy",
  "/reviews/chuckit-ultra-ball",
  "/blog",
  "/blog/best-dog-food-for-golden-retrievers",
  "/blog/best-dog-food-for-german-shepherds",
  "/blog/best-dog-food-for-french-bulldogs",
  "/blog/best-cat-food",
  "/blog/pet-insurance-worth-it",
  "/blog/best-pet-products-amazon",
  "/insurance",
  "/insurance/embrace-review",
  "/insurance/healthy-paws-review",
  "/dogs",
  "/cats",
  "/about",
].map((path) => `${SITE}${path}`);

async function submitIndexNow() {
  console.log("→ Submitting to IndexNow (Bing/Yandex/Seznam/Naver)...");
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: "mypawadvisor.com",
      key: INDEXNOW_KEY,
      keyLocation: `${SITE}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
  });
  if (res.ok || res.status === 202) {
    console.log(`  ✓ IndexNow accepted ${urls.length} URLs (status ${res.status})`);
  } else {
    const text = await res.text();
    console.error(`  ✗ IndexNow error ${res.status}: ${text}`);
  }
}

async function pingGoogle() {
  console.log("→ Pinging Google sitemap...");
  const sitemapUrl = encodeURIComponent(`${SITE}/sitemap.xml`);
  const res = await fetch(
    `https://www.google.com/ping?sitemap=${sitemapUrl}`
  );
  if (res.ok) {
    console.log("  ✓ Google pinged successfully");
  } else {
    console.log(`  ⚠ Google ping returned ${res.status} (normal for new sites — use Search Console)`);
  }
}

async function pingBing() {
  console.log("→ Pinging Bing sitemap...");
  const sitemapUrl = encodeURIComponent(`${SITE}/sitemap.xml`);
  const res = await fetch(
    `https://www.bing.com/ping?sitemap=${sitemapUrl}`
  );
  if (res.ok) {
    console.log("  ✓ Bing sitemap pinged successfully");
  } else {
    console.log(`  ⚠ Bing ping returned ${res.status}`);
  }
}

async function main() {
  console.log(`\n🐾 MyPawAdvisor — Search Engine Submission\n`);
  console.log(`   Submitting ${urls.length} URLs from ${SITE}\n`);

  await submitIndexNow();
  await pingGoogle();
  await pingBing();

  console.log("\n✅ Done! Next steps for more traffic:");
  console.log("   1. Google Search Console: https://search.google.com/search-console");
  console.log("      → Add property → Submit sitemap.xml → Done");
  console.log("   2. Bing Webmaster: https://www.bing.com/webmasters");
  console.log("      → Import from Google Search Console (1-click)");
  console.log("   3. Pinterest: Create boards for dog toys, dog beds, cat toys");
  console.log("      → Each pin links back to your review page = free traffic");
  console.log("   4. Reddit: Post in r/dogs, r/cats, r/Pets with helpful answers");
  console.log("      → Link to relevant reviews naturally (no spam)\n");
}

main().catch(console.error);
