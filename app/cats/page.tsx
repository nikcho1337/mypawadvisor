import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Cat Food & Products 2024 – Top Picks for Every Cat",
  description:
    "Find the best cat food, litter, supplements, and gear. Expert reviews and vet-approved picks for kittens, adults, and senior cats.",
};

export default function CatsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Best Cat Products 2024</h1>
          <p className="text-purple-100 text-lg">Top-rated food, litter, and health products for every cat.</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-10">
          <div className="text-5xl mb-4">🐱</div>
          <h2 className="text-xl font-bold mb-2">Cat Reviews Coming Soon</h2>
          <p className="text-gray-600 mb-4 text-sm">We're working on in-depth cat food and product reviews. In the meantime, check out our pet insurance guides.</p>
          <Link href="/insurance" className="inline-block bg-purple-600 text-white font-semibold px-5 py-2 rounded-full hover:bg-purple-700 transition-colors text-sm">
            Compare Pet Insurance →
          </Link>
        </div>
      </section>
    </>
  );
}
