import { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const BASE_URL = "https://www.mypawadvisor.com";

function getBlogSlugs(): string[] {
  const blogDir = join(process.cwd(), "app", "blog");
  return readdirSync(blogDir).filter((name) => {
    const full = join(blogDir, name);
    return statSync(full).isDirectory();
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const reviewRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/reviews/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const blogRoutes: MetadataRoute.Sitemap = getBlogSlugs().map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/reviews`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    ...reviewRoutes,
    { url: `${BASE_URL}/insurance`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/insurance/healthy-paws-review`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/insurance/embrace-review`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...blogRoutes,
    { url: `${BASE_URL}/books`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/dogs`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/cats`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
  ];
}
