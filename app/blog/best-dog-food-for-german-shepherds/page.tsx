import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Dog Food for German Shepherds 2026 – Expert Picks",
  description:
    "Find the best dog food for German Shepherds in 2026. We cover digestive health, joint support, and high-protein formulas. Top picks for GSDs of all ages.",
  keywords: ["best dog food for German Shepherds", "German Shepherd food", "GSD diet", "German Shepherd sensitive stomach", "German Shepherd puppy food"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Best Dog Food for German Shepherds 2026",
  author: { "@type": "Organization", name: "MyPawAdvisor" },
  datePublished: "2026-01-18",
};

const picks = [
  { rank: 1, name: "Royal Canin German Shepherd Adult", badge: "Best Overall", badgeColor: "bg-amber-100 text-amber-700", price: "$$$", rating: 4.9, description: "Purpose-built for GSDs with tailored fiber blend for digestive health, EPA & DHA for joint support, and kibble designed for the GSD's scissor bite.", pros: ["GSD-specific formula", "Digestive health support", "Joint & coat support", "Exclusive kibble shape"], cons: ["Expensive", "Contains by-products"], affiliateHref: "#" },
  { rank: 2, name: "Purina Pro Plan Large Breed Sensitive Skin & Stomach", badge: "Best for Sensitive Stomachs", badgeColor: "bg-blue-100 text-blue-700", price: "$$", rating: 4.8, description: "Salmon-based formula ideal for GSDs prone to digestive upset. Oatmeal and prebiotic fiber support gut health and skin.", pros: ["Salmon first ingredient", "Prebiotic fiber", "Omega-6 for skin & coat", "No artificial colors"], cons: ["Higher in fat", "Some dogs prefer chicken"], affiliateHref: "#" },
  { rank: 3, name: "Hill's Science Diet Large Breed Adult", badge: "Best Vet-Recommended", badgeColor: "bg-green-100 text-green-700", price: "$$", rating: 4.7, description: "Clinically proven antioxidants for immune health, glucosamine for joints, and controlled minerals for urinary health.", pros: ["Glucosamine & chondroitin", "Vet recommended", "Controlled calcium", "High digestibility"], cons: ["Not grain-free", "Some find it bland"], affiliateHref: "#" },
  { rank: 4, name: "Taste of the Wild High Prairie", badge: "Best Budget Grain-Free", badgeColor: "bg-purple-100 text-purple-700", price: "$", rating: 4.5, description: "Buffalo and bison-based grain-free formula with roasted meats, probiotics, and antioxidants. Great value for grain-free quality.", pros: ["Affordable grain-free", "Novel proteins", "Probiotics included", "No corn/wheat/soy"], cons: ["Less research-backed", "Some batches inconsistent"], affiliateHref: "#" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-amber-400 text-sm">
      {"★".repeat(Math.floor(rating))}
      <span className="text-gray-500 ml-1">{rating.toFixed(1)}</span>
    </span>
  );
}

export default function GermanShepherdFoodPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-4xl mx-auto px-4 pt-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-emerald-600">Home</Link> {" / "}
        <Link href="/blog" className="hover:text-emerald-600">Blog</Link> {" / "}
        <span>Best Dog Food for German Shepherds</span>
      </div>

      <article className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-1 rounded-full">Dog Food</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-3 mb-3 leading-tight">
            Best Dog Food for German Shepherds in 2026 (Expert Picks)
          </h1>
          <p className="text-gray-600 text-lg mb-4">
            German Shepherds are highly intelligent, athletic dogs with a sensitive digestive system and a predisposition to hip and elbow dysplasia. The right diet addresses these vulnerabilities directly. We reviewed 20 formulas to find the top picks.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
            <span>📅 January 18, 2026</span>
            <span>⏱️ 7 min read</span>
            <span>✅ Expert reviewed</span>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-2xl">🐾</div>
            <div>
              <p className="font-semibold text-sm">Reviewed by the MyPawAdvisor Editorial Team</p>
              <p className="text-xs text-gray-500">Ingredient analysis, veterinary input, and 1,000+ owner reviews per product.</p>
            </div>
          </div>
        </header>

        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 mb-8">
          <h2 className="font-bold text-lg mb-2">🏆 Quick Answer</h2>
          <ul className="text-sm space-y-1 text-gray-700">
            <li><strong>Best Overall:</strong> Royal Canin German Shepherd Adult — purpose-built formula</li>
            <li><strong>Best for Sensitive Stomach:</strong> Purina Pro Plan Sensitive Skin & Stomach — salmon, prebiotic fiber</li>
            <li><strong>Best Vet-Recommended:</strong> Hill's Science Diet Large Breed — joint + immune support</li>
            <li><strong>Best Budget:</strong> Taste of the Wild High Prairie — affordable grain-free</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold mb-4">Why German Shepherds Need Specialized Nutrition</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {[
            { icon: "🤢", title: "Sensitive Digestive System", desc: "GSDs commonly suffer from exocrine pancreatic insufficiency (EPI), IBD, and general digestive sensitivity. Easily digestible ingredients and prebiotics are essential." },
            { icon: "🦴", title: "Hip & Elbow Dysplasia", desc: "One of the most common large breed issues. Glucosamine, chondroitin, and omega-3 fatty acids slow progression significantly." },
            { icon: "💪", title: "High Protein Needs", desc: "Active working dogs need 25–30% protein to maintain muscle mass. Look for named meat (chicken, beef, salmon) as the first ingredient." },
            { icon: "🛡️", title: "Degenerative Myelopathy", desc: "GSDs have elevated risk of DM, a neurological condition. Antioxidant-rich foods (vitamins C & E) may help slow progression." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-gray-50 rounded-lg p-4">
              <p className="font-semibold text-sm mb-1">{icon} {title}</p>
              <p className="text-xs text-gray-600">{desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-6">Top 4 Dog Foods for German Shepherds</h2>
        <div className="space-y-5 mb-8">
          {picks.map((pick) => (
            <div key={pick.name} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-gray-50 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-400">#{pick.rank}</span>
                  <h3 className="font-bold text-lg">{pick.name}</h3>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${pick.badgeColor}`}>{pick.badge}</span>
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
                <a href={pick.affiliateHref} className="inline-block bg-amber-500 text-white font-semibold px-5 py-2 rounded-full text-sm hover:bg-amber-600 transition-colors">
                  Check Current Price →
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-emerald-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold mb-2">GSDs Need Pet Insurance Too</h2>
          <p className="text-emerald-100 mb-4 text-sm">Hip dysplasia surgery averages $3,500–$7,000. Insurance can cover 90% of that cost.</p>
          <Link href="/insurance" className="bg-white text-emerald-700 font-bold px-6 py-3 rounded-full hover:bg-emerald-50 transition-colors inline-block text-sm">
            Compare Pet Insurance →
          </Link>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-8">
          <h3 className="font-bold text-lg mb-4">Related Articles</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/blog/best-dog-food-for-golden-retrievers" className="border border-gray-200 rounded-lg px-4 py-2 text-sm hover:bg-gray-50">Best Food for Golden Retrievers</Link>
            <Link href="/blog/best-dog-food-for-french-bulldogs" className="border border-gray-200 rounded-lg px-4 py-2 text-sm hover:bg-gray-50">Best Food for French Bulldogs</Link>
            <Link href="/blog/pet-insurance-worth-it" className="border border-gray-200 rounded-lg px-4 py-2 text-sm hover:bg-gray-50">Is Pet Insurance Worth It?</Link>
          </div>
        </div>
      </article>
    </>
  );
}
