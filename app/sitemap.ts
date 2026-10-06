import { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { blogPosts, blogPostIso } from "@/lib/blog";
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const BASE_URL = "https://www.mypawadvisor.com";
// Last site-wide template/content touch — bump when static pages change materially.
const SITE_UPDATED = "2026-10-07";

function latest(dates: string[], fallback = SITE_UPDATED): Date {
  const all = [...dates, fallback].filter(Boolean).sort();
  return new Date(all[all.length - 1]);
}

function getBlogSlugs(): string[] {
  const blogDir = join(process.cwd(), "app", "blog");
  return readdirSync(blogDir).filter((name) => {
    const full = join(blogDir, name);
    return statSync(full).isDirectory();
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date(SITE_UPDATED);
  const reviewDates = products.map((p) => p.dateModified ?? p.datePublished);
  const blogDates = blogPosts.map(blogPostIso);

  const reviewRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/reviews/${p.slug}`,
    lastModified: new Date(p.dateModified ?? p.datePublished),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const blogRoutes: MetadataRoute.Sitemap = getBlogSlugs().map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(blogPosts.find((b) => b.slug === slug) ? blogPostIso(blogPosts.find((b) => b.slug === slug)!) : SITE_UPDATED),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    { url: BASE_URL, lastModified: latest([...reviewDates, ...blogDates]), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/reviews`, lastModified: latest(reviewDates), changeFrequency: "weekly", priority: 0.95 },
    ...reviewRoutes,
    { url: `${BASE_URL}/insurance`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/insurance/healthy-paws-review`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/insurance/embrace-review`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/blog`, lastModified: latest(blogDates), changeFrequency: "weekly", priority: 0.8 },
    ...blogRoutes,
    { url: `${BASE_URL}/books`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/natal-chart`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE_URL}/natal-chart/guide`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/dogs`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/cats`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
