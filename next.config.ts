import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
      { protocol: "https", hostname: "m.media-amazon.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
      { protocol: "https", hostname: "target.scene7.com" },
      { protocol: "https", hostname: "cdn11.bigcommerce.com" },
      { protocol: "https", hostname: "thundershirt.com" },
      { protocol: "https", hostname: "d2edvletk84qg.cloudfront.net" },
      { protocol: "https", hostname: "catdancer.com" },
      { protocol: "https", hostname: "chuckanddons.com" },
    ],
  },
};

export default nextConfig;
