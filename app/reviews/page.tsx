import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Pet Product Reviews 2026 – Tested & Rated | MyPawAdvisor",
  description:
    "Honest, hands-on pet product reviews. We test toys, grooming tools, beds, feeders, and cleaning products so you can buy with confidence. All Amazon links with real rating data.",
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

const categoryLabels = {
  dogs: "🐕 Dogs",
  cats: "🐱 Cats",
  home: "🏠 Home",
};

export default function ReviewsPage() {
  const dogs = products.filter((p) => p.category === "dogs");
  const cats = products.filter((p) => p.category === "cats");
  const home = products.filter((p) => p.category === "home");
  const sections = [
    { label: categoryLabels.dogs, items: dogs },
    { label: categoryLabels.cats, items: cats },
    { label: categoryLabels.home, items: home },
  ].filter((s) => s.items.length > 0);

  return (
    <>
      <section className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-emerald-400 font-semibold text-sm uppercase tracking-widest mb-3">Tested & Verified</p>
          <h1 className="text-4xl font-extrabold mb-4">Pet Product Reviews</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            We buy, test, and honestly review the best-selling pet products on Amazon. No sponsored posts. No guessing. Real results.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-14">
        {sections.map(({ label, items }) => (
          <section key={label} className="mb-14">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">{label}</h2>
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
        ))}
      </div>
    </>
  );
}
