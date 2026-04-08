import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mypawadvisor.com";
  const now = new Date();

  return [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/dogs`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/insurance`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/insurance/healthy-paws-review`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/insurance/embrace-review`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/cats`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/blog/best-pet-products-amazon`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog/best-dog-food-for-golden-retrievers`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog/best-dog-food-for-german-shepherds`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog/best-cat-food`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog/best-dog-food-for-french-bulldogs`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog/pet-insurance-worth-it`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
  ];
}
