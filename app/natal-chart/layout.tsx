import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pet Natal Chart — A Cosmic Certificate for Your Dog or Cat",
  description:
    "Personalized pet natal chart built from real astronomy — Sun, Moon, and Rising signs plus a Cosmic Signature reading. Beautiful downloadable PDF certificate for any dog or cat.",
  alternates: { canonical: "https://www.mypawadvisor.com/natal-chart" },
  openGraph: {
    title: "Pet Natal Chart — A Cosmic Certificate for Your Dog or Cat",
    description:
      "Personalized pet natal chart from real astronomy: Sun, Moon, and Rising signs plus a Cosmic Signature reading. Downloadable PDF certificate.",
    url: "https://www.mypawadvisor.com/natal-chart",
    type: "website",
  },
};

export default function NatalChartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
