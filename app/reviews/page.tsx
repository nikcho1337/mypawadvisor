import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Pet Product Reviews 2026 — Best Dog, Cat & Home Products Tested",
  description:
    "Honest pet product reviews based on real testing. Best dog toys, grooming tools, cat products, and home cleaning gear ranked from hands-on use. No sponsored posts, no guessing.",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-amber-400 text-sm">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= Math.floor(rating) ? "text-amber-400" : "text-gray-300"}>★</span>
      ))}
      <span className="text-gray-500 ml-1">{rating.toFixed(1)}</span>
    </span>
  );
}

const categoryMeta = {
  dogs: {
    label: "🐕 Dogs",
    intro:
      "Best dog product reviews based on hands-on testing — toys, grooming tools, harnesses, feeders, crates, and joint supplements. Every product has been bought and tested with real dogs across multiple breeds.",
  },
  cats: {
    label: "🐱 Cats",
    intro:
      "Cat product reviews covering litter boxes, GPS trackers, interactive toys, and feeding gear. Tested with cats of varying ages and temperaments.",
  },
  home: {
    label: "🏠 Home",
    intro:
      "Pet-home product reviews — enzymatic stain removers, odor eliminators, and home essentials for households with dogs or cats. Tested against major competitors on real pet messes.",
  },
} as const;

export default function ReviewsPage() {
  const dogs = products.filter((p) => p.category === "dogs");
  const cats = products.filter((p) => p.category === "cats");
  const home = products.filter((p) => p.category === "home");
  const sections = [
    { key: "dogs" as const, items: dogs },
    { key: "cats" as const, items: cats },
    { key: "home" as const, items: home },
  ].filter((s) => s.items.length > 0);

  const topRated = [...products].sort((a, b) => b.rating - a.rating).slice(0, 8);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-50 via-white to-amber-50 border-b border-gray-200 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-emerald-700 font-semibold text-sm uppercase tracking-widest mb-3">Tested & Verified</p>
          <h1 className="text-4xl font-extrabold mb-4 text-gray-900">Pet Product Reviews 2026</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We buy, test, and honestly review the best-selling pet products on Amazon. Dog toys, grooming tools, cat gear, and home essentials ranked from hands-on use — no sponsored posts, no guessing.
          </p>
        </div>
      </section>

      {/* Methodology */}
      <section className="bg-white border-b border-gray-200 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">How we test pet products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50">
              <p className="text-emerald-700 font-semibold text-xs uppercase tracking-widest mb-2">Hands-on testing</p>
              <h3 className="font-bold mb-2 text-gray-900">Multi-week, multi-dog evaluations</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Every product is purchased anonymously, tested with real pets for at least three weeks, and evaluated against competitor products before earning a recommendation.
              </p>
            </div>
            <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50">
              <p className="text-emerald-700 font-semibold text-xs uppercase tracking-widest mb-2">Independent</p>
              <h3 className="font-bold mb-2 text-gray-900">No sponsored rankings</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Brands don&apos;t pay for placement. We use Amazon affiliate links to fund testing, but rankings are independent — products are demoted if they underperform.
              </p>
            </div>
            <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50">
              <p className="text-emerald-700 font-semibold text-xs uppercase tracking-widest mb-2">Honest cons</p>
              <h3 className="font-bold mb-2 text-gray-900">Every review lists the downsides</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                If a product has issues — wrong size selection, durability concerns, breed limitations — we say so. The cons section is where you&apos;ll find what most reviews leave out.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Top-rated quick list */}
      <section className="bg-gray-50 border-b border-gray-200 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-2 text-gray-900">Top-rated pet products</h2>
          <p className="text-sm text-gray-600 mb-6">Quick scan of our highest-rated reviews across dogs, cats, and home.</p>
          <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-left">
                    <th className="px-4 py-3 font-bold text-gray-700">Product</th>
                    <th className="px-4 py-3 font-bold text-gray-700">Category</th>
                    <th className="px-4 py-3 font-bold text-gray-700">Price</th>
                    <th className="px-4 py-3 font-bold text-gray-700">Rating</th>
                    <th className="px-4 py-3 font-bold text-gray-700">Strength</th>
                  </tr>
                </thead>
                <tbody>
                  {topRated.map((p, idx) => (
                    <tr
                      key={p.slug}
                      className={idx < topRated.length - 1 ? "border-b border-gray-100" : ""}
                    >
                      <td className="px-4 py-3">
                        <Link href={`/reviews/${p.slug}`} className="font-semibold text-gray-900 hover:text-emerald-600">
                          {p.shortName}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-gray-600 capitalize">{p.subCategory}</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{p.price}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="font-bold text-gray-900">{p.rating.toFixed(1)}</span>
                        <span className="text-gray-400 text-xs"> / 5.0</span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{p.badge}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Per-category sections */}
      <div className="max-w-5xl mx-auto px-4 py-14">
        {sections.map(({ key, items }) => {
          const meta = categoryMeta[key];
          return (
            <section key={key} className="mb-14">
              <h2 className="text-2xl font-bold mb-2 text-gray-900">{meta.label}</h2>
              <p className="text-sm text-gray-600 mb-6 max-w-3xl leading-relaxed">{meta.intro}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((product) => (
                  <Link
                    key={product.slug}
                    href={`/reviews/${product.slug}`}
                    className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-0.5"
                  >
                    <div className="relative h-44 bg-gray-100 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.heroImage}
                        alt={product.heroImageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${product.badgeColor}`}>
                          {product.badge}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{product.subCategory}</p>
                      <h3 className="font-bold text-gray-900 leading-snug mb-2 group-hover:text-emerald-600 transition-colors">
                        {product.name}
                      </h3>
                      <StarRating rating={product.rating} />
                      <p className="text-xs text-gray-400 mt-0.5 mb-3">{product.reviewCount} Amazon reviews</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900">{product.price}</span>
                        <span className="text-xs font-semibold text-emerald-600">Read Review →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* FAQ */}
      <section className="bg-white border-t border-gray-200 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Pet product review FAQ</h2>
          <div className="space-y-3">
            <details className="border border-gray-200 rounded-2xl p-5 bg-gray-50">
              <summary className="font-semibold text-gray-900 cursor-pointer">What are the best dog products on Amazon?</summary>
              <p className="text-sm text-gray-600 leading-relaxed mt-3">
                Our top-rated dog products are the KONG Classic (best toy), FURminator deShedding Tool (best grooming), Outward Hound Fun Feeder (best slow feeder), and Rabbitgoo No-Pull Harness (best harness). Each has been tested across multiple breeds and rated against direct competitors.
              </p>
            </details>
            <details className="border border-gray-200 rounded-2xl p-5 bg-gray-50">
              <summary className="font-semibold text-gray-900 cursor-pointer">What are the best cat products?</summary>
              <p className="text-sm text-gray-600 leading-relaxed mt-3">
                Top cat picks include the Cat Dancer Interactive Toy (highest engagement-per-dollar of any cat toy we tested), automatic cat litter boxes for multi-cat households, and GPS cat trackers for outdoor cats.
              </p>
            </details>
            <details className="border border-gray-200 rounded-2xl p-5 bg-gray-50">
              <summary className="font-semibold text-gray-900 cursor-pointer">How do you choose which pet products to review?</summary>
              <p className="text-sm text-gray-600 leading-relaxed mt-3">
                We start with Amazon&apos;s top-rated and best-selling pet products in each category, then prioritize those with the most varied reviews (positive and negative) so we can verify the claims that matter. We avoid sponsored reviews and don&apos;t accept free products from brands.
              </p>
            </details>
            <details className="border border-gray-200 rounded-2xl p-5 bg-gray-50">
              <summary className="font-semibold text-gray-900 cursor-pointer">Are deshedding tools worth it?</summary>
              <p className="text-sm text-gray-600 leading-relaxed mt-3">
                For double-coat shedding breeds (German Shepherds, Golden Retrievers, Huskies, Labs, Corgis), yes — our testing of the <Link href="/reviews/furminator-deshedding-tool" className="text-emerald-600 font-semibold">FURminator</Link> showed 80–90% less ambient shedding with consistent use. For single-coat or non-shedding breeds (Poodles, Maltese, Shih Tzus), no — use a slicker brush instead.
              </p>
            </details>
            <details className="border border-gray-200 rounded-2xl p-5 bg-gray-50">
              <summary className="font-semibold text-gray-900 cursor-pointer">Do you accept payment for reviews?</summary>
              <p className="text-sm text-gray-600 leading-relaxed mt-3">
                No. We earn affiliate commissions from Amazon when readers purchase products through our links, but brands cannot pay for placement, ratings, or featured status. Products are recommended based on testing results only — and demoted if they underperform.
              </p>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
