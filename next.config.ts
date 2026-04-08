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
      { protocol: "https", hostname: "www.rabbitgoo.com" },
      { protocol: "https", hostname: "www.midwesthomes4pets.com" },
      { protocol: "https", hostname: "images.litter-robot.com" },
      { protocol: "https", hostname: "ultra-k9-pro.com" },
      { protocol: "https", hostname: "ultrak9pro.com" },
    ],
  },
};

export default nextConfig;
