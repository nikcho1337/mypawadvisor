import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MyPawAdvisor – Honest Pet Product Reviews & Buying Guides",
  description:
    "Find the best dog food, pet insurance, supplements, and cat products. Unbiased expert reviews and breed-specific guides to help your pet live their best life.",
};

const categories = [
  {
    title: "Dog Food Reviews",
    description: "Find the best dog food by breed, age, and health condition.",
    href: "/dogs",
    emoji: "🐶",
    color: "bg-amber-50 border-amber-200",
  },
  {
    title: "Pet Insurance",
    description: "Compare top pet insurance plans and save up to 90% on vet bills.",
    href: "/insurance",
    emoji: "🛡️",
    color: "bg-emerald-50 border-emerald-200",
  },
  {
    title: "Cat Products",
    description: "Top-rated food, litter, toys, and health products for cats.",
    href: "/cats",
    emoji: "🐱",
    color: "bg-purple-50 border-purple-200",
  },
  {
    title: "Pet Supplements",
    description: "Vitamins, joint support, probiotics, and more for dogs and cats.",
    href: "/blog",
    emoji: "💊",
    color: "bg-blue-50 border-blue-200",
  },
];

const topPicks = [
  {
    name: "Healthy Paws Pet Insurance",
    category: "Pet Insurance",
    rating: 4.9,
    reviews: 18200,
    description: "Best overall pet insurance with unlimited annual benefits and fast claims.",
    badge: "Editor's Choice",
    href: "/insurance/healthy-paws-review",
  },
  {
    name: "Royal Canin Breed Health Nutrition",
    category: "Dog Food",
    rating: 4.8,
    reviews: 9400,
    description: "Breed-specific nutrition tailored to your dog's unique needs.",
    badge: "Best for Breeds",
    href: "/dogs/royal-canin-review",
  },
  {
    name: "Only Natural Pet – SuperFood Blend",
    category: "Dog Food",
    rating: 4.7,
    reviews: 3800,
    description: "Grain-free, whole food ingredients with zero artificial additives.",
    badge: "Best Natural",
    href: "/dogs",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-amber-400 text-sm">
      {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
      <span className="text-gray-500 ml-1">{rating.toFixed(1)}</span>
    </span>
  );
}

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-emerald-200 text-sm font-semibold uppercase tracking-widest mb-3">Your Trusted Pet Product Advisor</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Find the Best Products<br />for Your Pet
          </h1>
          <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
            Expert reviews, breed-specific guides, and unbiased comparisons — so you can make confident decisions for your dog or cat.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/dogs" className="bg-white text-emerald-700 font-semibold px-6 py-3 rounded-full hover:bg-emerald-50 transition-colors">
              Browse Dog Products
            </Link>
            <Link href="/insurance" className="border-2 border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-emerald-700 transition-colors">
              Compare Pet Insurance
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-center mb-2">Browse by Category</h2>
        <p className="text-gray-500 text-center mb-8">Everything your pet needs, reviewed and ranked.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link key={cat.title} href={cat.href} className={`border-2 rounded-xl p-5 hover:shadow-md transition-shadow ${cat.color}`}>
              <div className="text-3xl mb-3">{cat.emoji}</div>
              <h3 className="font-bold text-gray-800 mb-1">{cat.title}</h3>
              <p className="text-sm text-gray-600">{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* TOP PICKS */}
      <section className="bg-gray-50 py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2">Our Top Picks for 2024</h2>
          <p className="text-gray-500 text-center mb-8">Tested, reviewed, and highly rated by real pet owners.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topPicks.map((pick) => (
              <div key={pick.name} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full">{pick.badge}</span>
                  <span className="text-xs text-gray-400">{pick.category}</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-1">{pick.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <StarRating rating={pick.rating} />
                  <span className="text-xs text-gray-400">({pick.reviews.toLocaleString()} reviews)</span>
                </div>
                <p className="text-sm text-gray-600 flex-1 mb-4">{pick.description}</p>
                <Link href={pick.href} className="block text-center bg-emerald-600 text-white text-sm font-semibold py-2 rounded-full hover:bg-emerald-700 transition-colors">
                  Read Full Review →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY TRUST US */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-center mb-10">Why Pet Owners Trust PawsGuide</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { icon: "🔬", title: "Research-Backed Reviews", desc: "Every product is analyzed using ingredient lists, vet input, and thousands of owner reviews." },
            { icon: "💰", title: "No Hidden Bias", desc: "We clearly disclose affiliate relationships. Our ratings are never influenced by commissions." },
            { icon: "🐾", title: "Breed-Specific Advice", desc: "Generic advice isn't enough. We tailor recommendations to your pet's breed, age, and health needs." },
          ].map((item) => (
            <div key={item.title} className="p-6 rounded-xl bg-gray-50">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-emerald-600 text-white py-12 px-4 text-center">
        <h2 className="text-2xl font-bold mb-2">Is Your Pet Covered?</h2>
        <p className="text-emerald-100 mb-6">Compare top pet insurance plans in 60 seconds. No email required.</p>
        <Link href="/insurance" className="bg-white text-emerald-700 font-bold px-8 py-3 rounded-full hover:bg-emerald-50 transition-colors">
          Compare Plans Free →
        </Link>
      </section>
    </>
  );
}
