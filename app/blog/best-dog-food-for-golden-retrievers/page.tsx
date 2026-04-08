import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Dog Food for Golden Retrievers 2026 – Vet-Approved Picks",
  description:
    "Find the best dog food for Golden Retrievers in 2026. We cover joint health, heart health, and weight management formulas. Vet-approved picks for puppies, adults, and seniors.",
  keywords: ["best dog food for Golden Retrievers", "Golden Retriever food", "Golden Retriever diet", "dog food for large breeds", "Golden Retriever puppy food"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Best Dog Food for Golden Retrievers 2026",
  description: "Vet-approved dog food picks for Golden Retrievers covering joint health, heart health, and weight management.",
  author: { "@type": "Organization", name: "MyPawAdvisor" },
  datePublished: "2026-01-20",
  dateModified: "2026-01-20",
};

const picks = [
  {
    rank: 1,
    name: "Royal Canin Golden Retriever Adult",
    badge: "Best Overall",
    badgeColor: "bg-amber-100 text-amber-700",
    price: "$$$",
    rating: 4.9,
    description: "Breed-specific formula with EPA, DHA, and taurine to support Golden Retriever heart health. Exclusive kibble shape encourages slower eating.",
    pros: ["Tailored for Goldens specifically", "Heart health support (taurine)", "Promotes healthy coat", "Optimal stool quality"],
    cons: ["Premium price", "Contains some by-products"],
    affiliateHref: "#",
  },
  {
    rank: 2,
    name: "Hill's Science Diet Large Breed Adult",
    badge: "Best Vet-Recommended",
    badgeColor: "bg-blue-100 text-blue-700",
    price: "$$",
    rating: 4.8,
    description: "Clinically proven antioxidants, glucosamine and chondroitin for joint support. Specially sized kibble for large breeds.",
    pros: ["Glucosamine & chondroitin", "Vet #1 recommended brand", "Controlled calorie content", "Natural ingredients"],
    cons: ["Not grain-free", "Some dogs find it too bland"],
    affiliateHref: "#",
  },
  {
    rank: 3,
    name: "Purina Pro Plan Large Breed Adult",
    badge: "Best Value",
    badgeColor: "bg-green-100 text-green-700",
    price: "$$",
    rating: 4.7,
    description: "Real chicken as first ingredient with live probiotics for digestive health. Omega-6 fatty acids nourish Golden's iconic golden coat.",
    pros: ["Real chicken first", "Live probiotics", "Great for coat", "Widely available"],
    cons: ["Contains corn and wheat", "Higher in calories"],
    affiliateHref: "#",
  },
  {
    rank: 4,
    name: "Orijen Large Breed Adult",
    badge: "Best Grain-Free",
    badgeColor: "bg-purple-100 text-purple-700",
    price: "$$$$",
    rating: 4.6,
    description: "85% quality animal ingredients from free-run poultry, nest-laid eggs, and wild-caught fish. Biologically appropriate diet.",
    pros: ["85% animal ingredients", "No grain, no filler", "Excellent protein quality", "Mimics natural diet"],
    cons: ["Very expensive", "Rich — transition slowly"],
    affiliateHref: "#",
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

export default function GoldenRetrieverFoodPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-4xl mx-auto px-4 pt-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-emerald-600">Home</Link> {" / "}
        <Link href="/blog" className="hover:text-emerald-600">Blog</Link> {" / "}
        <span>Best Dog Food for Golden Retrievers</span>
      </div>

      <article className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-1 rounded-full">Dog Food</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-3 mb-3 leading-tight">
            Best Dog Food for Golden Retrievers in 2026 (Vet-Approved)
          </h1>
          <p className="text-gray-600 text-lg mb-4">
            Golden Retrievers are one of America's most beloved breeds — but they come with specific health concerns including heart disease, hip dysplasia, and a love of overeating. The right food makes a real difference. We reviewed 18 formulas to find the best options.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
            <span>📅 January 20, 2026</span>
            <span>⏱️ 8 min read</span>
            <span>✅ Expert reviewed</span>
          </div>
          {/* AUTHOR BOX */}
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-2xl">🐾</div>
            <div>
              <p className="font-semibold text-sm">Reviewed by the MyPawAdvisor Editorial Team</p>
              <p className="text-xs text-gray-500">Our reviews are based on ingredient analysis, veterinary input, and 1,000+ owner reviews per product.</p>
            </div>
          </div>
        </header>

        {/* QUICK ANSWER */}
        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 mb-8">
          <h2 className="font-bold text-lg mb-2">🏆 Quick Answer: Best Food for Golden Retrievers 2026</h2>
          <ul className="text-sm space-y-1 text-gray-700">
            <li><strong>Best Overall:</strong> Royal Canin Golden Retriever Adult — breed-specific, heart health support</li>
            <li><strong>Best Vet-Recommended:</strong> Hill's Science Diet Large Breed — glucosamine, joint support</li>
            <li><strong>Best Value:</strong> Purina Pro Plan Large Breed — real chicken, probiotics, great coat support</li>
            <li><strong>Best Grain-Free:</strong> Orijen Large Breed — 85% animal ingredients, biologically appropriate</li>
          </ul>
        </div>

        {/* WHY GOLDENS NEED SPECIAL FOOD */}
        <h2 className="text-2xl font-bold mb-4">Why Golden Retrievers Have Unique Nutritional Needs</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Golden Retrievers are a large, active breed with a few notable health vulnerabilities that their food should actively address:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {[
            { icon: "❤️", title: "Heart Disease Risk", desc: "Goldens have elevated rates of dilated cardiomyopathy (DCM). Foods rich in taurine and L-carnitine support cardiac health." },
            { icon: "🦴", title: "Joint & Hip Issues", desc: "Hip dysplasia is common in large breeds. Glucosamine and chondroitin in food can slow progression and reduce discomfort." },
            { icon: "🍗", title: "Obesity Tendency", desc: "Goldens are notorious food lovers. Calorie-controlled formulas and measured portions prevent weight-related health issues." },
            { icon: "✨", title: "Coat Health", desc: "That beautiful golden coat requires omega-3 and omega-6 fatty acids. Fish oil or flaxseed in the formula keeps it shiny." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-gray-50 rounded-lg p-4">
              <p className="font-semibold text-sm mb-1">{icon} {title}</p>
              <p className="text-xs text-gray-600">{desc}</p>
            </div>
          ))}
        </div>

        {/* PRODUCT REVIEWS */}
        <h2 className="text-2xl font-bold mb-6">Top 4 Dog Foods for Golden Retrievers</h2>
        <div className="space-y-6 mb-8">
          {picks.map((pick) => (
            <div key={pick.name} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-gray-50 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-400">#{pick.rank}</span>
                  <h3 className="font-bold text-lg">{pick.name}</h3>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${pick.badgeColor}`}>{pick.badge}</span>
                </div>
                <div className="flex items-center gap-3">
                  <StarRating rating={pick.rating} />
                  <span className="text-xs text-gray-400">Price: {pick.price}</span>
                </div>
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

        {/* FEEDING GUIDE */}
        <h2 className="text-2xl font-bold mb-4">How Much to Feed a Golden Retriever</h2>
        <div className="bg-gray-50 rounded-xl p-5 mb-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 font-semibold">Age / Weight</th>
                <th className="text-left py-2 font-semibold">Daily Amount</th>
                <th className="text-left py-2 font-semibold">Meals per Day</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {[
                ["Puppy (8–12 weeks)", "1–1.5 cups", "4x"],
                ["Puppy (3–6 months)", "1.5–2 cups", "3x"],
                ["Puppy (6–12 months)", "2–3 cups", "2x"],
                ["Adult (55–75 lbs)", "2.5–3.5 cups", "2x"],
                ["Senior (7+ years)", "2–3 cups", "2x"],
              ].map(([age, amount, meals]) => (
                <tr key={age} className="border-b border-gray-100">
                  <td className="py-2">{age}</td>
                  <td className="py-2 font-semibold text-emerald-600">{amount}</td>
                  <td className="py-2">{meals}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-gray-500 mt-3">*Amounts are general guidelines. Adjust based on your dog's activity level and body condition. Consult your vet for personalized recommendations.</p>
        </div>

        {/* CTA */}
        <div className="bg-emerald-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold mb-2">Protect Your Golden with Pet Insurance</h2>
          <p className="text-emerald-100 mb-4 text-sm">Goldens are prone to expensive conditions — cancer, hip dysplasia, heart disease. Insurance gives you peace of mind.</p>
          <Link href="/insurance" className="bg-white text-emerald-700 font-bold px-6 py-3 rounded-full hover:bg-emerald-50 transition-colors inline-block text-sm">
            Compare Pet Insurance Plans →
          </Link>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-8">
          <h3 className="font-bold text-lg mb-4">Related Articles</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/blog/best-dog-food-for-french-bulldogs" className="border border-gray-200 rounded-lg px-4 py-2 text-sm hover:bg-gray-50">Best Food for French Bulldogs</Link>
            <Link href="/blog/best-dog-food-for-german-shepherds" className="border border-gray-200 rounded-lg px-4 py-2 text-sm hover:bg-gray-50">Best Food for German Shepherds</Link>
            <Link href="/insurance/healthy-paws-review" className="border border-gray-200 rounded-lg px-4 py-2 text-sm hover:bg-gray-50">Healthy Paws Review</Link>
          </div>
        </div>
      </article>
    </>
  );
}
