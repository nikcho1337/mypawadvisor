import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Dog Food Reviews 2024 – Top Picks by Breed & Age",
  description:
    "Find the best dog food for your breed. We reviewed 30+ brands and ranked them by ingredients, nutrition, and real owner feedback. Updated April 2024.",
  keywords: ["best dog food", "dog food reviews 2024", "best dog food by breed", "healthy dog food", "grain free dog food"],
};

const products = [
  {
    name: "Royal Canin Breed Health Nutrition",
    badge: "Best for Breeds",
    badgeColor: "bg-amber-100 text-amber-700",
    rating: 4.8,
    reviews: 9400,
    priceRange: "$$$",
    bestFor: "Breed-specific nutrition",
    description: "Precisely formulated for over 30 specific breeds. Kibble size, texture, and nutrient profile are tailored to your dog's exact genetic needs.",
    pros: ["Breed-specific formulas", "Vet recommended", "Excellent digestibility", "Precise nutrient ratios"],
    cons: ["Expensive", "Some formulas use by-products"],
    href: "/dogs/royal-canin-review",
    affiliateHref: "#",
  },
  {
    name: "Only Natural Pet SuperFood Blend",
    badge: "Best Natural",
    badgeColor: "bg-green-100 text-green-700",
    rating: 4.7,
    reviews: 3800,
    priceRange: "$$$",
    bestFor: "Clean, whole food ingredients",
    description: "Grain-free formula with high-quality protein as the #1 ingredient. No artificial preservatives, flavors, or fillers.",
    pros: ["Whole food ingredients", "Grain-free", "No artificial additives", "High protein"],
    cons: ["Premium price", "Not widely available in stores"],
    href: "/dogs",
    affiliateHref: "#",
  },
  {
    name: "Blue Buffalo Life Protection",
    badge: "Best Value",
    badgeColor: "bg-blue-100 text-blue-700",
    rating: 4.6,
    reviews: 24700,
    priceRange: "$$",
    bestFor: "Everyday quality at a fair price",
    description: "Real meat first, no chicken by-product meals, no corn, wheat, or soy. LifeSource Bits provide antioxidants and nutrients.",
    pros: ["Real meat as first ingredient", "Affordable", "Widely available", "Life stage formulas"],
    cons: ["Some dogs don't tolerate it", "Ingredient quality varies by line"],
    href: "/dogs",
    affiliateHref: "#",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-amber-400">
      {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
      <span className="text-gray-500 text-sm ml-1">{rating.toFixed(1)}</span>
    </span>
  );
}

export default function DogsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-amber-500 to-orange-600 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-amber-100 text-sm font-semibold uppercase tracking-widest mb-3">Updated April 2024</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Best Dog Food Reviews 2024</h1>
          <p className="text-amber-100 text-lg">
            We tested and reviewed 30+ dog food brands. Here are the ones truly worth buying — ranked by ingredients, nutrition, and real owner results.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
          <h2 className="font-bold mb-2">🐶 Quick Picks</h2>
          <ul className="text-sm space-y-1 text-gray-700">
            <li><strong>Best for Breeds:</strong> Royal Canin — tailored nutrition for 30+ specific breeds</li>
            <li><strong>Best Natural:</strong> Only Natural Pet — clean ingredients, grain-free</li>
            <li><strong>Best Value:</strong> Blue Buffalo — real meat first, affordable price</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold mb-6">Top Dog Food Brands Compared</h2>
        <div className="space-y-6">
          {products.map((product, i) => (
            <div key={product.name} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gray-50 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-gray-400">#{i + 1}</span>
                  <h3 className="font-bold text-xl">{product.name}</h3>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${product.badgeColor}`}>{product.badge}</span>
                </div>
                <div className="flex items-center gap-3">
                  <StarRating rating={product.rating} />
                  <span className="text-xs text-gray-400">({product.reviews.toLocaleString()} reviews)</span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 text-sm mb-4">{product.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-semibold mb-2 text-green-700">✅ Pros</p>
                    <ul className="text-sm space-y-1 text-gray-600">{product.pros.map(p => <li key={p}>• {p}</li>)}</ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-2 text-red-600">❌ Cons</p>
                    <ul className="text-sm space-y-1 text-gray-600">{product.cons.map(c => <li key={c}>• {c}</li>)}</ul>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a href={product.affiliateHref} className="bg-amber-500 text-white font-semibold px-5 py-2 rounded-full text-sm hover:bg-amber-600 transition-colors">
                    Check Price →
                  </a>
                  <Link href={product.href} className="border border-gray-300 text-gray-700 font-semibold px-5 py-2 rounded-full text-sm hover:bg-gray-50 transition-colors">
                    Full Review
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">How to Choose the Best Dog Food</h2>
          <div className="space-y-5 text-sm text-gray-700 leading-relaxed">
            <p><strong>1. Look at the first ingredient.</strong> It should be a named protein source — chicken, beef, salmon, or turkey — not a by-product or grain.</p>
            <p><strong>2. Match food to your dog's life stage.</strong> Puppies, adults, and seniors have different nutritional needs. Always choose age-appropriate formulas.</p>
            <p><strong>3. Consider your dog's breed size.</strong> Large breeds benefit from controlled calcium and phosphorus levels. Small breeds need smaller kibble and higher caloric density.</p>
            <p><strong>4. Avoid unnecessary fillers.</strong> Corn, wheat, and soy as primary ingredients add calories with minimal nutrition. Look for whole grains or grain-free options instead.</p>
          </div>
          <div className="mt-6">
            <Link href="/dogs/best-dog-food-by-breed" className="inline-block bg-amber-500 text-white font-bold px-6 py-3 rounded-full hover:bg-amber-600 transition-colors text-sm">
              Find Best Food for Your Breed →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
