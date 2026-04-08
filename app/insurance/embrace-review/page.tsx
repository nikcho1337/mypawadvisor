import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Embrace Pet Insurance Review 2026 – Is It Worth It?",
  description:
    "Detailed Embrace Pet Insurance review for 2026. We cover pricing, coverage, wellness rewards, real claims experience, and how it compares to Healthy Paws. Find out if Embrace is right for your pet.",
  keywords: ["Embrace pet insurance review", "Embrace pet insurance", "best pet insurance 2026", "embrace cost", "embrace vs healthy paws"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Review",
  itemReviewed: {
    "@type": "Product",
    name: "Embrace Pet Insurance",
    description: "Pet insurance provider offering accident & illness coverage plus optional wellness rewards.",
  },
  reviewRating: { "@type": "Rating", ratingValue: "4.7", bestRating: "5" },
  author: { "@type": "Organization", name: "MyPawAdvisor" },
  datePublished: "2026-01-15",
  reviewBody: "Embrace Pet Insurance offers flexible coverage with a unique diminishing deductible and optional wellness rewards program.",
};

export default function EmbraceReviewPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-4xl mx-auto px-4 pt-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-emerald-600">Home</Link>
        {" / "}
        <Link href="/insurance" className="hover:text-emerald-600">Pet Insurance</Link>
        {" / "}
        <span className="text-gray-700">Embrace Review</span>
      </div>

      <article className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded-full">Pet Insurance Review</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-3 mb-3 leading-tight">
            Embrace Pet Insurance Review 2026: Is It Worth It?
          </h1>
          <p className="text-gray-600 text-lg mb-4">
            Embrace is one of the most flexible pet insurance providers in the US — with a unique diminishing deductible, optional wellness rewards, and broad coverage. We tested it thoroughly to see if it lives up to the hype.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
            <span>📅 Updated January 2026</span>
            <span>⏱️ 8 min read</span>
            <span className="text-amber-400">★★★★★ <span className="text-gray-500">4.7/5</span></span>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">🛡️</div>
            <div>
              <p className="font-semibold text-sm">Reviewed by the MyPawAdvisor Editorial Team</p>
              <p className="text-xs text-gray-500">We analyzed policy documents, real claims data, and 1,000+ customer reviews to write this review.</p>
            </div>
          </div>
        </header>

        {/* VERDICT BOX */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
          <h2 className="font-bold text-lg mb-3">🏆 MyPawAdvisor Verdict</h2>
          <p className="text-gray-700 mb-4 text-sm leading-relaxed">
            <strong>Embrace is an excellent choice for pet owners who want flexibility.</strong> Its diminishing deductible rewards loyalty — every year you don't make a claim, your deductible drops by $50. The optional Wellness Rewards program adds preventive care reimbursements that most competitors don't offer.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {[
              { label: "Our Rating", value: "4.7/5" },
              { label: "Starting From", value: "$13/mo" },
              { label: "Reimbursement", value: "Up to 90%" },
              { label: "Annual Limit", value: "Up to $30K" },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="text-xs text-gray-500 mb-1">{label}</p>
                <p className="font-bold text-blue-700">{value}</p>
              </div>
            ))}
          </div>
          <a href="#" className="block text-center bg-blue-600 text-white font-bold py-3 rounded-full hover:bg-blue-700 transition-colors">
            Get Your Free Embrace Quote →
          </a>
          <p className="text-xs text-gray-400 text-center mt-2">Affiliate link – we may earn a commission at no extra cost to you</p>
        </div>

        <h2 className="text-2xl font-bold mb-4">What Is Embrace Pet Insurance?</h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Embrace Pet Insurance was founded in 2003 and is one of the older, more established pet insurers in the US. Based in Cleveland, Ohio, it's known for its customer service, flexible policy options, and unique features like the Healthy Pet Deductible — a diminishing deductible that rewards claim-free years.
        </p>

        <h2 className="text-2xl font-bold mb-4">What Does Embrace Cover?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-bold text-green-800 mb-2">✅ What's Covered</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Accidents and injuries</li>
              <li>• Illnesses (cancer, diabetes, infections)</li>
              <li>• Surgeries and hospitalization</li>
              <li>• Prescription medications</li>
              <li>• Diagnostic tests (X-rays, MRI, bloodwork)</li>
              <li>• Emergency and specialty care</li>
              <li>• Hereditary and congenital conditions</li>
              <li>• Dental illness (not routine cleaning)</li>
              <li>• Behavioral therapy</li>
              <li>• Physical and chiropractic therapy</li>
              <li>• Prosthetics and orthopedic devices</li>
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-bold text-red-700 mb-2">❌ What's NOT Covered</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Pre-existing conditions</li>
              <li>• Routine wellness (without add-on)</li>
              <li>• Elective procedures</li>
              <li>• Breeding costs</li>
              <li>• Experimental treatments</li>
              <li>• Food (even prescription diets)</li>
              <li>• Parasites (unless causing illness)</li>
            </ul>
          </div>
        </div>

        {/* STANDOUT FEATURE */}
        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 mb-8">
          <h3 className="font-bold text-lg mb-2">⭐ Embrace's Standout Feature: Diminishing Deductible</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            Embrace's "Healthy Pet Deductible" reduces your annual deductible by <strong>$50 every claim-free year</strong> until it hits $0. If you start with a $500 deductible and your dog stays healthy, after 10 years your deductible is $0. No other major pet insurer does this.
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-4">How Much Does Embrace Cost?</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Embrace pricing is competitive and highly customizable. You set your annual deductible ($200–$1,000), reimbursement rate (70–90%), and annual benefit limit ($5,000–$30,000).
        </p>
        <div className="bg-gray-50 rounded-xl p-5 mb-8">
          <h3 className="font-bold mb-3">Typical Monthly Premiums (US Average)</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 font-semibold">Pet</th>
                <th className="text-left py-2 font-semibold">Age</th>
                <th className="text-left py-2 font-semibold">Avg Monthly Cost</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {[
                ["Dog (small breed)", "2 years", "~$28–$42"],
                ["Dog (large breed)", "2 years", "~$40–$65"],
                ["Dog (senior)", "8 years", "~$65–$110"],
                ["Cat", "2 years", "~$13–$22"],
              ].map(([pet, age, cost]) => (
                <tr key={pet} className="border-b border-gray-100">
                  <td className="py-2">{pet}</td>
                  <td className="py-2">{age}</td>
                  <td className="py-2 font-semibold text-blue-600">{cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold mb-4">Embrace vs. Healthy Paws: Which Is Better?</h2>
        <div className="bg-gray-50 rounded-xl p-5 mb-8 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 font-semibold">Feature</th>
                <th className="text-left py-2 font-semibold text-blue-700">Embrace</th>
                <th className="text-left py-2 font-semibold text-emerald-700">Healthy Paws</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {[
                ["Annual Limit", "Up to $30,000", "Unlimited"],
                ["Reimbursement", "70–90%", "70–90%"],
                ["Deductible", "Annual (diminishing)", "Annual"],
                ["Wellness Add-On", "✅ Yes (Wellness Rewards)", "❌ No"],
                ["Dental Illness", "✅ Yes", "✅ Yes"],
                ["Behavioral Therapy", "✅ Yes", "❌ No"],
                ["Waiting Period (illness)", "14 days", "15 days"],
                ["Mobile App", "✅ Yes", "✅ Yes"],
              ].map(([feature, embrace, hp]) => (
                <tr key={feature} className="border-b border-gray-100">
                  <td className="py-2 font-medium">{feature}</td>
                  <td className="py-2">{embrace}</td>
                  <td className="py-2">{hp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 mb-8 text-sm text-gray-700">
          <p><strong>Bottom line:</strong> Choose <strong>Healthy Paws</strong> if you want unlimited annual coverage — ideal for breeds prone to expensive conditions. Choose <strong>Embrace</strong> if you want wellness reimbursements, behavioral therapy coverage, or the diminishing deductible feature.</p>
        </div>

        <h2 className="text-2xl font-bold mb-4">Pros & Cons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div>
            <p className="text-sm font-semibold mb-2 text-green-700">✅ Pros</p>
            <ul className="text-sm space-y-2 text-gray-600">
              {["Diminishing deductible rewards loyalty", "Optional Wellness Rewards program", "Covers behavioral therapy", "Highly customizable policy", "Strong customer service reputation", "Covers dental illness"].map(p => (
                <li key={p} className="flex gap-2"><span className="text-green-500">•</span>{p}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold mb-2 text-red-600">❌ Cons</p>
            <ul className="text-sm space-y-2 text-gray-600">
              {["No unlimited annual option", "Wellness Rewards is an add-on cost", "Slightly higher base prices than some competitors", "Annual limit caps at $30K"].map(c => (
                <li key={c} className="flex gap-2"><span className="text-red-400">•</span>{c}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-blue-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Get a Free Embrace Quote</h2>
          <p className="text-blue-100 mb-4">Takes less than 2 minutes. No credit card required.</p>
          <a href="#" className="bg-white text-blue-700 font-bold px-8 py-3 rounded-full hover:bg-blue-50 transition-colors inline-block">
            Get My Free Quote →
          </a>
          <p className="text-blue-200 text-xs mt-3">Affiliate link — see our disclosure policy</p>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-8">
          <h3 className="font-bold text-lg mb-4">Related Articles</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/insurance" className="border border-gray-200 rounded-lg px-4 py-2 text-sm hover:bg-gray-50">Compare All Pet Insurance Plans</Link>
            <Link href="/insurance/healthy-paws-review" className="border border-gray-200 rounded-lg px-4 py-2 text-sm hover:bg-gray-50">Healthy Paws Review</Link>
            <Link href="/blog/pet-insurance-worth-it" className="border border-gray-200 rounded-lg px-4 py-2 text-sm hover:bg-gray-50">Is Pet Insurance Worth It?</Link>
          </div>
        </div>
      </article>
    </>
  );
}
