import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About PawsGuide – Our Mission & Review Process",
  description:
    "Learn about PawsGuide's mission, review methodology, and affiliate disclosure. We're committed to honest, research-backed pet product reviews.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">About MyPawAdvisor</h1>
      <p className="text-gray-600 text-lg mb-8">Helping pet owners make smarter, more confident decisions since 2024.</p>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-bold mb-3">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            MyPawAdvisor exists to cut through the noise in the pet product market. There are thousands of dog foods, pet insurance plans, and supplements out there — most of them marketed with the same vague claims. We do the research so you don't have to.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">How We Review Products</h2>
          <ul className="space-y-3 text-gray-700 text-sm">
            {[
              "We analyze ingredient lists, guaranteed analyses, and AAFCO nutritional adequacy statements for all food products.",
              "We cross-reference customer reviews from multiple platforms (over 1,000 reviews minimum before recommending).",
              "We consult with veterinary nutritionists and general practice vets on our recommendations.",
              "We update our content at least every 6 months to reflect formula changes, pricing updates, and new research.",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">Affiliate Disclosure</h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 text-sm text-gray-700 leading-relaxed">
            <p className="mb-2">
              <strong>PawsGuide is reader-supported.</strong> Some links on this site are affiliate links. If you click through and make a purchase, we may earn a commission at no additional cost to you.
            </p>
            <p>
              Our editorial content is never influenced by affiliate relationships. We recommend products based on merit. If a product doesn't earn a high rating in our review process, we won't promote it regardless of commission rates.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
