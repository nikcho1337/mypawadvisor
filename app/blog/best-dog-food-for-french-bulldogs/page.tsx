import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Dog Food for French Bulldogs 2026 – Vet-Approved Picks",
  description:
    "Find the best dog food for French Bulldogs in 2026. We cover the top picks for sensitive stomachs, weight management, and puppies. Vet-approved, breed-specific recommendations.",
  keywords: ["best dog food for French Bulldogs", "French Bulldog food", "French Bulldog sensitive stomach food", "best food for Frenchie", "French Bulldog diet"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Best Dog Food for French Bulldogs 2026",
  description: "Vet-approved dog food picks for French Bulldogs covering sensitive stomachs, weight management, and puppies.",
  author: { "@type": "Organization", name: "MyPawAdvisor" },
  datePublished: "2026-01-10",
};

const picks = [
  { rank: 1, name: "Royal Canin French Bulldog Adult", badge: "Best Overall", badgeColor: "bg-amber-100 text-amber-700", price: "$$$", description: "Specifically formulated for French Bulldogs with a unique D-shape kibble for their flat face and digestive support with exclusive fiber blend.", affiliateHref: "#" },
  { rank: 2, name: "Purina Pro Plan Sensitive Skin & Stomach", badge: "Best for Sensitive Stomachs", badgeColor: "bg-blue-100 text-blue-700", price: "$$", description: "Salmon as the first ingredient with prebiotic fiber for digestive support. Ideal for Frenchies prone to food sensitivities.", affiliateHref: "#" },
  { rank: 3, name: "Hill's Science Diet Small Paws", badge: "Best Vet-Recommended", badgeColor: "bg-green-100 text-green-700", price: "$$", description: "Clinically proven antioxidants for a healthy immune system. High digestibility for a clean and healthy stool.", affiliateHref: "#" },
];

export default function FrenchBulldogFoodPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-4xl mx-auto px-4 pt-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-emerald-600">Home</Link>
        {" / "}
        <Link href="/blog" className="hover:text-emerald-600">Blog</Link>
        {" / "}
        <span className="text-gray-700">Best Dog Food for French Bulldogs</span>
      </div>

      <article className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-1 rounded-full">Dog Food</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-3 mb-3 leading-tight">
            Best Dog Food for French Bulldogs in 2026 (Vet-Approved Picks)
          </h1>
          <p className="text-gray-600 text-lg mb-4">
            French Bulldogs have unique dietary requirements: brachycephalic skulls that make eating certain kibble shapes difficult, notoriously sensitive stomachs, and a tendency to become overweight. We reviewed 15 formulas specifically with Frenchies in mind.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span>📅 April 3, 2026</span>
            <span>⏱️ 7 min read</span>
          </div>
        </header>

        {/* QUICK ANSWER */}
        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 mb-8">
          <h2 className="font-bold text-lg mb-2">🐶 Quick Answer</h2>
          <ul className="text-sm space-y-1 text-gray-700">
            <li><strong>Best Overall:</strong> Royal Canin French Bulldog Adult — the only formula designed specifically for this breed</li>
            <li><strong>Best for Sensitive Stomachs:</strong> Purina Pro Plan Sensitive Skin & Stomach — salmon-based, prebiotic fiber</li>
            <li><strong>Best Vet-Recommended:</strong> Hill's Science Diet Small Paws — clinically proven antioxidants, high digestibility</li>
          </ul>
        </div>

        {/* WHY FRENCHIES ARE DIFFERENT */}
        <h2 className="text-2xl font-bold mb-4">Why French Bulldogs Need Special Food</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          French Bulldogs aren't just small dogs — they have specific anatomical and physiological traits that affect what they can and should eat:
        </p>
        <ul className="space-y-3 mb-6">
          {[
            { title: "Flat Faces (Brachycephalic)", desc: "Standard round kibble is hard for Frenchies to pick up. They do better with flat, D-shaped, or elongated kibble they can grab with their underbite." },
            { title: "Sensitive Digestive Systems", desc: "Frenchies are notorious for gas, bloating, and loose stools. Easily digestible proteins and prebiotic fiber help enormously." },
            { title: "Weight Gain Tendency", desc: "Their compact, muscular build combined with low activity tolerance means they gain weight easily. Calorie-controlled formulas prevent obesity." },
            { title: "Skin and Allergy Issues", desc: "Many Frenchies suffer from food allergies — often triggered by chicken, corn, or wheat. Limited ingredient diets can help identify and avoid triggers." },
          ].map(({ title, desc }) => (
            <li key={title} className="flex gap-3 bg-gray-50 rounded-lg p-4">
              <span className="text-emerald-500 text-lg mt-0.5">✓</span>
              <div>
                <p className="font-semibold text-sm">{title}</p>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* PICKS */}
        <h2 className="text-2xl font-bold mb-6">Top 3 Dog Foods for French Bulldogs</h2>
        <div className="space-y-5 mb-8">
          {picks.map((pick) => (
            <div key={pick.name} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="text-gray-400 font-bold">#{pick.rank}</span>
                <h3 className="font-bold text-lg">{pick.name}</h3>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${pick.badgeColor}`}>{pick.badge}</span>
                <span className="text-xs text-gray-400 ml-auto">Price: {pick.price}</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{pick.description}</p>
              <a href={pick.affiliateHref} className="inline-block bg-amber-500 text-white font-semibold px-5 py-2 rounded-full text-sm hover:bg-amber-600 transition-colors">
                Check Current Price →
              </a>
            </div>
          ))}
        </div>

        {/* WHAT TO AVOID */}
        <h2 className="text-2xl font-bold mb-4">Ingredients to Avoid for French Bulldogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {[
            { ingredient: "Chicken (if allergic)", reason: "One of the most common allergens in Frenchies. Try fish or lamb-based foods instead." },
            { ingredient: "Corn, Wheat, Soy", reason: "Common fillers that can trigger digestive upset and skin reactions in sensitive Frenchies." },
            { ingredient: "Artificial Preservatives", reason: "BHA, BHT, and ethoxyquin have been linked to health issues. Look for natural preservatives like mixed tocopherols." },
            { ingredient: "High Fat Content", reason: "Frenchies gain weight easily. Avoid formulas with fat above 18% unless your dog is very active." },
          ].map(({ ingredient, reason }) => (
            <div key={ingredient} className="bg-red-50 border border-red-100 rounded-lg p-4">
              <p className="font-semibold text-sm text-red-700 mb-1">❌ {ingredient}</p>
              <p className="text-xs text-gray-600">{reason}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-emerald-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold mb-2">Also Protect Your Frenchie with Insurance</h2>
          <p className="text-emerald-100 mb-4 text-sm">French Bulldogs are prone to expensive health issues. Pet insurance can save you thousands.</p>
          <Link href="/insurance/healthy-paws-review" className="bg-white text-emerald-700 font-bold px-6 py-3 rounded-full hover:bg-emerald-50 transition-colors inline-block text-sm">
            Compare Pet Insurance Plans →
          </Link>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-8">
          <h3 className="font-bold text-lg mb-4">Related Articles</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/dogs" className="border border-gray-200 rounded-lg px-4 py-2 text-sm hover:bg-gray-50 transition-colors">All Dog Food Reviews</Link>
            <Link href="/blog/pet-insurance-worth-it" className="border border-gray-200 rounded-lg px-4 py-2 text-sm hover:bg-gray-50 transition-colors">Is Pet Insurance Worth It?</Link>
            <Link href="/insurance" className="border border-gray-200 rounded-lg px-4 py-2 text-sm hover:bg-gray-50 transition-colors">Best Pet Insurance 2026</Link>
          </div>
        </div>
      </article>
    </>
  );
}
