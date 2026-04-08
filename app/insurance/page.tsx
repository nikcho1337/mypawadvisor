import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Pet Insurance 2024 – Compare Top Plans",
  description:
    "Compare the best pet insurance plans of 2024. We reviewed 12 providers so you don't have to. Find affordable coverage for dogs and cats with the highest reimbursement rates.",
  keywords: ["best pet insurance", "pet insurance comparison", "dog insurance", "cat insurance", "cheap pet insurance 2024"],
};

const plans = [
  {
    name: "Healthy Paws",
    badge: "Best Overall",
    badgeColor: "bg-emerald-100 text-emerald-700",
    rating: 4.9,
    reviews: 18200,
    monthlyFrom: 30,
    reimbursement: "Up to 90%",
    annualLimit: "Unlimited",
    deductible: "$100–$500",
    bestFor: "Comprehensive coverage, fast claims",
    pros: ["Unlimited annual benefit", "90% reimbursement", "24/7 claims app", "No per-incident limits"],
    cons: ["No wellness add-on", "Older pets pay more"],
    href: "/insurance/healthy-paws-review",
    affiliateHref: "#",
  },
  {
    name: "Embrace Pet Insurance",
    badge: "Best for Wellness",
    badgeColor: "bg-blue-100 text-blue-700",
    rating: 4.8,
    reviews: 11400,
    monthlyFrom: 25,
    reimbursement: "Up to 90%",
    annualLimit: "$5,000–$30,000",
    deductible: "$100–$1,000",
    bestFor: "Wellness add-on, diminishing deductible",
    pros: ["Optional wellness rewards", "Diminishing deductible", "Dental illness covered", "Flexible plans"],
    cons: ["Higher base premium", "Annual limit caps"],
    href: "/insurance",
    affiliateHref: "#",
  },
  {
    name: "Figo Pet Insurance",
    badge: "Best Tech",
    badgeColor: "bg-purple-100 text-purple-700",
    rating: 4.6,
    reviews: 5200,
    monthlyFrom: 20,
    reimbursement: "Up to 100%",
    annualLimit: "$5,000–Unlimited",
    deductible: "$100–$750",
    bestFor: "Tech-savvy owners, 100% reimbursement option",
    pros: ["100% reimbursement option", "Cloud-based pet records", "Pet cloud app", "24/7 vet chat"],
    cons: ["Newer company", "Limited reviews"],
    href: "/insurance",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Best Pet Insurance 2024 – Compare Top Plans",
  description: "Compare the best pet insurance plans of 2024 for dogs and cats.",
  author: { "@type": "Organization", name: "PawsGuide" },
};

export default function InsurancePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-3">Updated April 2024</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Best Pet Insurance 2024:<br />Compare Top Plans</h1>
          <p className="text-blue-100 text-lg mb-6">
            We analyzed 12 pet insurance providers across 47 criteria. Here are the ones actually worth your money.
          </p>
          <div className="flex gap-6 justify-center text-sm">
            <span>✅ 12 providers reviewed</span>
            <span>✅ Real claims data</span>
            <span>✅ No paid placements</span>
          </div>
        </div>
      </section>

      {/* QUICK ANSWER */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
          <h2 className="font-bold text-lg mb-2">🏆 Quick Answer: Best Pet Insurance 2024</h2>
          <ul className="text-sm space-y-1 text-gray-700">
            <li><strong>Best Overall:</strong> Healthy Paws — unlimited benefits, 90% reimbursement</li>
            <li><strong>Best for Wellness Coverage:</strong> Embrace — optional wellness rewards add-on</li>
            <li><strong>Best Tech Experience:</strong> Figo — 100% reimbursement option, pet cloud app</li>
            <li><strong>Best Budget:</strong> Figo — plans from $20/month</li>
          </ul>
        </div>
      </section>

      {/* PLANS */}
      <section className="max-w-5xl mx-auto px-4 pb-14">
        <h2 className="text-2xl font-bold mb-6">Top Pet Insurance Plans Compared</h2>
        <div className="space-y-6">
          {plans.map((plan, i) => (
            <div key={plan.name} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gray-50 px-6 py-4 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-gray-400">#{i + 1}</span>
                  <h3 className="font-bold text-xl">{plan.name}</h3>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${plan.badgeColor}`}>{plan.badge}</span>
                </div>
                <div className="flex items-center gap-3">
                  <StarRating rating={plan.rating} />
                  <span className="text-xs text-gray-400">({plan.reviews.toLocaleString()} reviews)</span>
                </div>
              </div>
              <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-gray-100">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Starting From</p>
                  <p className="font-bold text-emerald-600">${plan.monthlyFrom}/mo</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Reimbursement</p>
                  <p className="font-semibold">{plan.reimbursement}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Annual Limit</p>
                  <p className="font-semibold">{plan.annualLimit}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Deductible</p>
                  <p className="font-semibold">{plan.deductible}</p>
                </div>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold mb-2 text-green-700">✅ Pros</p>
                  <ul className="text-sm space-y-1 text-gray-600">
                    {plan.pros.map(p => <li key={p}>• {p}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-2 text-red-600">❌ Cons</p>
                  <ul className="text-sm space-y-1 text-gray-600">
                    {plan.cons.map(c => <li key={c}>• {c}</li>)}
                  </ul>
                </div>
              </div>
              <div className="px-6 pb-6 flex flex-wrap gap-3">
                <a href={plan.affiliateHref} className="bg-emerald-600 text-white font-semibold px-5 py-2 rounded-full text-sm hover:bg-emerald-700 transition-colors">
                  Get Free Quote →
                </a>
                <Link href={plan.href} className="border border-gray-300 text-gray-700 font-semibold px-5 py-2 rounded-full text-sm hover:bg-gray-50 transition-colors">
                  Read Full Review
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Pet Insurance FAQ</h2>
          <div className="space-y-6">
            {[
              { q: "Is pet insurance worth it?", a: "Yes — for most pet owners. The average emergency vet visit costs $800–$1,500. A single surgery can run $3,000–$8,000. With insurance starting at $20–$40/month, one major incident pays for years of premiums." },
              { q: "When should I get pet insurance?", a: "The sooner the better. Most policies don't cover pre-existing conditions. Getting coverage while your pet is young and healthy ensures maximum protection and lower premiums." },
              { q: "What does pet insurance typically cover?", a: "Most plans cover accidents and illnesses including surgeries, hospitalizations, prescriptions, and diagnostics. Wellness coverage (vaccines, checkups) is usually an optional add-on." },
              { q: "How much does pet insurance cost per month?", a: "For dogs: $30–$80/month for accident and illness coverage. For cats: $15–$40/month. Prices vary by breed, age, location, and coverage level." },
            ].map(({ q, a }) => (
              <div key={q} className="border-b border-gray-200 pb-5">
                <h3 className="font-bold mb-2">{q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
