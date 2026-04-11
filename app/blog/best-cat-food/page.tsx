import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Cat Food 2026 – Top Picks for Every Cat",
  description:
    "Find the best cat food of 2026. We reviewed 25+ wet and dry cat food brands for nutrition, ingredients, and value. Top picks for kittens, adults, seniors, and indoor cats.",
  keywords: ["best cat food 2026", "best wet cat food", "best dry cat food", "cat food reviews", "healthiest cat food"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Best Cat Food 2026",
  author: { "@type": "Organization", name: "MyPawAdvisor" },
  datePublished: "2026-01-15",
};

const picks = [
  { rank: 1, name: "Royal Canin Indoor Adult (Dry)", badge: "Best Overall Dry", badgeColor: "bg-amber-100 text-amber-700", price: "$$$", rating: 4.8, type: "Dry", description: "Specifically designed for indoor cats with controlled calorie content to prevent obesity, hairball reduction formula, and high digestibility.", pros: ["Indoor cat formula", "Hairball control", "Weight management", "High digestibility"], cons: ["Expensive", "Contains by-products"], affiliateHref: "#" },
  { rank: 2, name: "Wellness CORE Grain-Free Wet (Turkey & Chicken)", badge: "Best Wet Food", badgeColor: "bg-blue-100 text-blue-700", price: "$$", rating: 4.8, type: "Wet", description: "High-protein, grain-free wet food with real turkey and chicken. No fillers, by-products, or artificial additives. Cats love the texture.", pros: ["High protein (>12% wet)", "Grain-free", "No artificial additives", "Excellent palatability"], cons: ["Pricier per serving", "Needs refrigeration after opening"], affiliateHref: "#" },
  { rank: 3, name: "Purina ONE Indoor Advantage (Dry)", badge: "Best Value", badgeColor: "bg-green-100 text-green-700", price: "$", rating: 4.6, type: "Dry", description: "Real turkey as the first ingredient with omega-6 fatty acids, antioxidants, and natural fiber for hairball control. Affordable and widely available.", pros: ["Real turkey first", "Affordable", "Hairball control", "Widely available"], cons: ["Contains grains", "Lower protein than premium brands"], affiliateHref: "#" },
  { rank: 4, name: "Tiki Cat After Dark (Wet)", badge: "Best for Picky Eaters", badgeColor: "bg-purple-100 text-purple-700", price: "$$$", rating: 4.7, type: "Wet", description: "Whole meat chunks in a rich, meaty broth. No plant proteins, no carrageenan, no added thickeners. Irresistible even for the fussiest cats.", pros: ["Whole meat pieces", "No plant proteins", "No carrageenan", "Variety of flavors"], cons: ["Very expensive", "Hard to find"], affiliateHref: "#" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-amber-400 text-sm">
      {"★".repeat(Math.floor(rating))}
      <span className="text-gray-500 ml-1">{rating.toFixed(1)}</span>
    </span>
  );
}

export default function BestCatFoodPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-4xl mx-auto px-4 pt-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-emerald-600">Home</Link> {" / "}
        <Link href="/blog" className="hover:text-emerald-600">Blog</Link> {" / "}
        <span>Best Cat Food 2026</span>
      </div>

      <article className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded-full">Cat Food</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-3 mb-3 leading-tight">
            Best Cat Food in 2026: Top Picks for Every Cat
          </h1>
          <p className="text-gray-600 text-lg mb-4">
            Cats are obligate carnivores — they need high-protein, meat-based diets to thrive. Yet most grocery store brands are loaded with fillers and carbohydrates. We reviewed 25+ brands to find cat foods that actually meet your cat's nutritional needs.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
            <span>📅 January 15, 2026</span>
            <span>⏱️ 8 min read</span>
            <span>✅ Expert reviewed</span>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl">🐱</div>
            <div>
              <p className="font-semibold text-sm">Reviewed by the MyPawAdvisor Editorial Team</p>
              <p className="text-xs text-gray-500">Ingredient analysis, AAFCO compliance check, and 1,000+ owner reviews per product.</p>
            </div>
          </div>
        </header>

        {/* HERO IMAGE */}
        <div className="rounded-2xl overflow-hidden mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&q=80&auto=format&fit=crop"
            alt="Beautiful cat with bright eyes looking at camera"
            className="w-full h-64 md:h-80 object-cover"
          />
        </div>

        <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6 mb-8">
          <h2 className="font-bold text-lg mb-2">🏆 Quick Answer: Best Cat Foods 2026</h2>
          <ul className="text-sm space-y-1 text-gray-700">
            <li><strong>Best Dry Food:</strong> Royal Canin Indoor Adult — tailored for indoor cats, hairball control</li>
            <li><strong>Best Wet Food:</strong> Wellness CORE Grain-Free — high protein, no fillers</li>
            <li><strong>Best Value:</strong> Purina ONE Indoor Advantage — real turkey, affordable</li>
            <li><strong>Best for Picky Eaters:</strong> Tiki Cat After Dark — whole meat, irresistible flavor</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold mb-4">Wet vs. Dry Cat Food: Which Is Better?</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          The short answer: wet food is generally better for cats. Cats evolved from desert animals and have a low thirst drive — they get most of their hydration from prey. Wet food mimics this by providing 70–80% moisture content vs. dry food's 10%.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-bold text-sm text-blue-800 mb-2">💧 Wet Food Benefits</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Higher moisture — better urinary tract health</li>
              <li>• Higher protein, lower carbs</li>
              <li>• Better for cats prone to kidney disease</li>
              <li>• More satisfying — helps weight control</li>
            </ul>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h3 className="font-bold text-sm text-amber-800 mb-2">🥣 Dry Food Benefits</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• More convenient and affordable</li>
              <li>• Better for dental health (texture)</li>
              <li>• Can be left out all day (free feeding)</li>
              <li>• More calorie-dense per gram</li>
            </ul>
          </div>
        </div>
        <p className="text-gray-700 mb-6 text-sm bg-gray-50 rounded-lg p-4">
          <strong>Our recommendation:</strong> Feed wet food as the primary diet (at least 50% of calories) and use dry food as a supplement or for free-feeding. This gives you the hydration benefits of wet food with the convenience of dry.
        </p>

        <h2 className="text-2xl font-bold mb-6">Top 4 Cat Foods of 2026</h2>
        <div className="space-y-5 mb-8">
          {picks.map((pick) => (
            <div key={pick.name} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-gray-50 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-400">#{pick.rank}</span>
                  <h3 className="font-bold text-lg">{pick.name}</h3>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${pick.badgeColor}`}>{pick.badge}</span>
                  <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">{pick.type}</span>
                </div>
                <StarRating rating={pick.rating} />
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-4">{pick.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-semibold mb-2 text-green-700">✅ Pros</p>
                    <ul className="text-sm space-y-1 text-gray-600">{pick.pros.map(p => <li key={p}>• {p}</li>)}</ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-2 text-red-600">❌ Cons</p>
                    <ul className="text-sm space-y-1 text-gray-600">{pick.cons.map(c => <li key={c}>• {c}</li>)}</ul>
                  </div>
                </div>
                <a href={pick.affiliateHref} className="inline-block bg-purple-600 text-white font-semibold px-5 py-2 rounded-full text-sm hover:bg-purple-700 transition-colors">
                  Check Price →
                </a>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-4">What to Look for on a Cat Food Label</h2>
        <div className="space-y-3 mb-8 text-sm text-gray-700 leading-relaxed">
          <p><strong>1. Named protein first.</strong> "Chicken," "salmon," or "turkey" should be the first ingredient — not "poultry meal" or "meat by-products."</p>
          <p><strong>2. AAFCO statement.</strong> Look for "complete and balanced" for your cat's life stage. If it says "for supplemental feeding only," it's not a complete diet.</p>
          <p><strong>3. Moisture content.</strong> For wet food, look for 70%+ moisture. For dry food, 10% is normal.</p>
          <p><strong>4. Limited carbohydrates.</strong> Cats don't need many carbs. Avoid formulas where corn, wheat, or rice are among the first 3 ingredients.</p>
          <p><strong>5. Taurine.</strong> Cats can't synthesize taurine — it must be in their diet. All quality cat foods include it.</p>
        </div>

        <div className="bg-purple-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold mb-2">Don't Forget Pet Insurance for Your Cat</h2>
          <p className="text-purple-100 mb-4 text-sm">Cat insurance starts at just $15/month. Protect against unexpected vet bills.</p>
          <Link href="/insurance" className="bg-white text-purple-700 font-bold px-6 py-3 rounded-full hover:bg-purple-50 transition-colors inline-block text-sm">
            Compare Cat Insurance Plans →
          </Link>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-8">
          <h3 className="font-bold text-lg mb-4">Related Articles</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/dogs" className="border border-gray-200 rounded-lg px-4 py-2 text-sm hover:bg-gray-50">Best Dog Food Reviews</Link>
            <Link href="/insurance" className="border border-gray-200 rounded-lg px-4 py-2 text-sm hover:bg-gray-50">Best Pet Insurance 2026</Link>
            <Link href="/blog/pet-insurance-worth-it" className="border border-gray-200 rounded-lg px-4 py-2 text-sm hover:bg-gray-50">Is Pet Insurance Worth It?</Link>
          </div>
        </div>
      </article>
    </>
  );
}
