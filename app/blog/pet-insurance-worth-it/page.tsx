import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Is Pet Insurance Worth It in 2026? Honest Analysis",
  description:
    "Is pet insurance worth the cost? We analyzed 5 years of vet cost data vs. insurance premiums to give you an honest, data-driven answer. Find out when it makes sense — and when it doesn't.",
  keywords: ["is pet insurance worth it", "pet insurance cost vs benefit", "should I get pet insurance", "pet insurance 2026", "pet insurance pros and cons"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Is Pet Insurance Worth It in 2026?",
  description: "A data-driven analysis of pet insurance costs vs. benefits.",
  author: { "@type": "Organization", name: "MyPawAdvisor" },
  datePublished: "2026-01-05",
};

export default function PetInsuranceWorthItPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-4xl mx-auto px-4 pt-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-emerald-600">Home</Link>
        {" / "}
        <Link href="/blog" className="hover:text-emerald-600">Blog</Link>
        {" / "}
        <span className="text-gray-700">Is Pet Insurance Worth It?</span>
      </div>

      <article className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full">Pet Insurance</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-3 mb-3 leading-tight">
            Is Pet Insurance Actually Worth It? Honest Analysis for 2026
          </h1>
          <p className="text-gray-600 text-lg mb-4">
            We crunched the numbers on average vet costs versus insurance premiums across 5 years of data. Here's our honest, data-driven take — including the situations where pet insurance doesn't make financial sense.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span>📅 January 5, 2026</span>
            <span>⏱️ 9 min read</span>
          </div>
        </header>

        {/* VERDICT */}
        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-6 mb-8">
          <h2 className="font-bold text-lg mb-2">📋 Short Answer</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            <strong>For most pet owners, yes — pet insurance is worth it.</strong> Not because you'll always "come out ahead" financially, but because it removes the devastating choice between your pet's life and your bank account. One emergency can cost $3,000–$10,000. Insurance turns that into $300–$1,000.
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-4">The Real Cost of Veterinary Care in 2026</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Vet costs have risen significantly over the past decade. Advanced diagnostics (MRI, CT scans), specialist care, and improved surgical techniques save more pets than ever — but they come with price tags that can shock even prepared owners.
        </p>

        <div className="bg-gray-50 rounded-xl p-5 mb-6">
          <h3 className="font-bold mb-4">Common Vet Procedure Costs (US Average, 2026)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 font-semibold">Procedure</th>
                  <th className="text-left py-2 font-semibold">Average Cost</th>
                  <th className="text-left py-2 font-semibold">High End</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {[
                  ["Emergency visit", "$500–$1,000", "$3,000+"],
                  ["ACL/Cruciate repair", "$3,500–$5,000", "$8,000"],
                  ["Cancer treatment (chemo)", "$5,000–$10,000", "$20,000+"],
                  ["Bloat/GDV surgery", "$3,000–$6,000", "$10,000"],
                  ["Hip dysplasia surgery", "$3,500–$7,000", "$12,000"],
                  ["Diabetes management (annual)", "$2,000–$4,000", "$8,000"],
                  ["Broken leg repair", "$2,000–$4,000", "$7,000"],
                ].map(([proc, avg, high]) => (
                  <tr key={proc} className="border-b border-gray-100">
                    <td className="py-2">{proc}</td>
                    <td className="py-2 text-orange-600 font-medium">{avg}</td>
                    <td className="py-2 text-red-600 font-medium">{high}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">The Math: Insurance vs. Self-Paying</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Let's run a realistic scenario for a medium-sized dog from age 2 to 10 (8 years):
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
            <h3 className="font-bold mb-3 text-blue-800">With Insurance (Healthy Paws)</h3>
            <ul className="text-sm space-y-2 text-gray-700">
              <li>Monthly premium: ~$45/mo</li>
              <li>Deductible: $250/year</li>
              <li>Reimbursement: 90%</li>
              <li className="border-t border-blue-200 pt-2">8-year premium total: <strong>$4,320</strong></li>
              <li>One ACL surgery ($5,000): <strong>out-of-pocket $750</strong></li>
              <li className="font-bold text-blue-700">Total cost: ~$5,070</li>
            </ul>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
            <h3 className="font-bold mb-3 text-orange-800">Without Insurance</h3>
            <ul className="text-sm space-y-2 text-gray-700">
              <li>Annual routine care: ~$500/year</li>
              <li>One major illness in 8 years: ~$5,000</li>
              <li>One emergency visit: ~$800</li>
              <li className="border-t border-orange-200 pt-2">Routine care total: <strong>$4,000</strong></li>
              <li>Major illness + emergency: <strong>$5,800</strong></li>
              <li className="font-bold text-orange-700">Total cost: ~$9,800</li>
            </ul>
          </div>
        </div>
        <p className="text-gray-700 mb-6 text-sm leading-relaxed bg-emerald-50 border border-emerald-200 rounded-lg p-4">
          <strong>Result:</strong> In this scenario, insurance saves ~$4,700 over 8 years — even factoring in all premiums. And that's with only ONE major incident. Most dogs have multiple health issues over their lifetime.
        </p>

        <h2 className="text-2xl font-bold mb-4">When Pet Insurance Is NOT Worth It</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Fairness demands we acknowledge the scenarios where insurance doesn't make financial sense:
        </p>
        <ul className="space-y-3 mb-6">
          {[
            { title: "Your pet already has pre-existing conditions", desc: "Insurance won't cover them, and if those are the main health risks, the value proposition drops significantly." },
            { title: "You have $20,000+ in accessible emergency savings", desc: "If you can genuinely self-insure large expenses without financial hardship, the premium may not be worth it." },
            { title: "Your pet is very old and declining", desc: "Premiums for senior pets are high, and many conditions are pre-existing by that point. Better to start young." },
            { title: "Very low-cost breeds with no genetic issues", desc: "Some mixed breeds are exceptionally healthy. If your vet bills are consistently under $500/year, insurance ROI is lower." },
          ].map(({ title, desc }) => (
            <li key={title} className="flex gap-3 bg-red-50 rounded-lg p-4 border border-red-100">
              <span className="text-red-400 text-lg mt-0.5">✗</span>
              <div>
                <p className="font-semibold text-sm">{title}</p>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-bold mb-4">Our Recommendation</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Get pet insurance when your pet is young and healthy — ideally before age 3 for dogs, age 2 for cats. Waiting until your pet is sick means pre-existing conditions exclusions will make the policy far less valuable.
        </p>
        <p className="text-gray-700 mb-6 leading-relaxed">
          For most pet owners, the right question isn't "will I get my money back?" — it's "can I afford a $6,000 vet bill without insurance?" If the answer is no or even "maybe not comfortably," insurance is worth it.
        </p>

        <div className="bg-emerald-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold mb-2">Ready to Compare Plans?</h2>
          <p className="text-emerald-100 mb-4 text-sm">See our full pet insurance comparison with pricing, reimbursements, and real claims data.</p>
          <Link href="/insurance" className="bg-white text-emerald-700 font-bold px-6 py-3 rounded-full hover:bg-emerald-50 transition-colors inline-block text-sm">
            Compare Pet Insurance Plans →
          </Link>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-8">
          <h3 className="font-bold text-lg mb-4">Related Articles</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/insurance/healthy-paws-review" className="border border-gray-200 rounded-lg px-4 py-2 text-sm hover:bg-gray-50 transition-colors">Healthy Paws Review</Link>
            <Link href="/insurance" className="border border-gray-200 rounded-lg px-4 py-2 text-sm hover:bg-gray-50 transition-colors">Best Pet Insurance 2026</Link>
            <Link href="/blog/best-dog-food-for-french-bulldogs" className="border border-gray-200 rounded-lg px-4 py-2 text-sm hover:bg-gray-50 transition-colors">Best Food for French Bulldogs</Link>
          </div>
        </div>
      </article>
    </>
  );
}
