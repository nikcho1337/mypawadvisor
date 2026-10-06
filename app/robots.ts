import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: "https://www.mypawadvisor.com/sitemap.xml",
    host: "https://www.mypawadvisor.com",
  };
}
