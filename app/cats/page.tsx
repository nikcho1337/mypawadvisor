import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Best Cat Products 2026 — Litter Boxes, Toys, GPS Trackers & Food",
  description:
    "Honest cat product reviews based on real testing. Best automatic litter boxes, interactive toys, GPS trackers for outdoor cats, and food guides — ranked from hands-on use.",
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

export default function CatsPage() {
  const catProducts = products.filter((p) => p.category === "cats");

  return (
    <>
      <section className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-purple-200 text-xs font-semibold uppercase tracking-widest mb-3">Tested & Reviewed</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Best Cat Products 2026</h1>
          <p className="text-purple-100 text-lg">
            Honest reviews of automatic litter boxes, interactive toys, GPS trackers, and cat food — based on hands-on testing.
          </p>
        </div>
      </section>

      {catProducts.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-2 text-gray-900">Top-rated cat products</h2>
          <p className="text-sm text-gray-600 mb-6 max-w-3xl">
            Every cat product we recommend has been bought, tested, and rated against direct competitors. No sponsored placements.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {catProducts.map((product) => (
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
                  <h3 className="font-bold text-gray-900 leading-snug mb-2 group-hover:text-purple-600 transition-colors">
                    {product.name}
                  </h3>
                  <StarRating rating={product.rating} />
                  <p className="text-xs text-gray-400 mt-0.5 mb-3">{product.reviewCount} Amazon reviews</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900">{product.price}</span>
                    <span className="text-xs font-semibold text-purple-600">Read Review →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="bg-gray-50 border-y border-gray-200 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Cat food & feeding guides</h2>
          <p className="text-sm text-gray-600 mb-6">
            The right food for your cat depends on age, activity level, and any health conditions. Our breed and life-stage food guides cover what to look for and which brands actually deliver.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/blog/best-cat-food"
              className="border border-gray-300 bg-white text-gray-700 font-semibold px-5 py-2 rounded-full text-sm hover:bg-purple-50 hover:border-purple-300 transition-colors"
            >
              Best Cat Food 2026 →
            </Link>
            <Link
              href="/insurance"
              className="border border-gray-300 bg-white text-gray-700 font-semibold px-5 py-2 rounded-full text-sm hover:bg-purple-50 hover:border-purple-300 transition-colors"
            >
              Cat Insurance Comparison →
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Cat product FAQ</h2>
        <div className="space-y-3">
          <details className="border border-gray-200 rounded-2xl p-5 bg-gray-50">
            <summary className="font-semibold text-gray-900 cursor-pointer">What&apos;s the best automatic cat litter box?</summary>
            <p className="text-sm text-gray-600 leading-relaxed mt-3">
              See our <Link href="/reviews/best-automatic-cat-litter-box" className="text-purple-600 font-semibold">automatic cat litter box review</Link> for the top-rated pick based on real testing — covering cleaning frequency, multi-cat capacity, and the difference between true self-cleaning and timer-based models.
            </p>
          </details>
          <details className="border border-gray-200 rounded-2xl p-5 bg-gray-50">
            <summary className="font-semibold text-gray-900 cursor-pointer">Are GPS cat trackers worth it?</summary>
            <p className="text-sm text-gray-600 leading-relaxed mt-3">
              For outdoor cats or cats that wander, yes — a GPS tracker is the only reliable way to find a missing cat quickly. See our <Link href="/reviews/best-gps-cat-tracker" className="text-purple-600 font-semibold">GPS cat tracker review</Link> for our top pick based on real-world testing.
            </p>
          </details>
          <details className="border border-gray-200 rounded-2xl p-5 bg-gray-50">
            <summary className="font-semibold text-gray-900 cursor-pointer">What&apos;s the best interactive toy for indoor cats?</summary>
            <p className="text-sm text-gray-600 leading-relaxed mt-3">
              The <Link href="/reviews/cat-dancer-interactive-toy" className="text-purple-600 font-semibold">Cat Dancer Interactive Toy</Link> is our top pick — the highest engagement-per-dollar of any cat toy we tested, with thousands of positive Amazon reviews backing it up.
            </p>
          </details>
        </div>
      </section>
    </>
  );
}
