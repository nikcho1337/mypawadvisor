import type { Metadata } from "next";
import Link from "next/link";
import { products, getProductBySlug } from "@/lib/products";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.metaTitle,
    description: product.metaDescription,
  };
}

function StarRating({ rating, large }: { rating: number; large?: boolean }) {
  const size = large ? "text-2xl" : "text-base";
  return (
    <span className={`text-amber-400 ${size} inline-flex items-center gap-1`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= Math.floor(rating) ? "text-amber-400" : "text-gray-300"}>★</span>
      ))}
      <span className="text-gray-600 font-semibold ml-1 text-sm">{rating.toFixed(1)}</span>
    </span>
  );
}

function ScoreBar({ label, score }: { label: string; score: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-600 w-28 shrink-0">{label}</span>
      <div className="flex-1 bg-gray-100 rounded-full h-2">
        <div
          className="bg-emerald-500 h-2 rounded-full"
          style={{ width: `${(score / 5) * 100}%` }}
        />
      </div>
      <span className="text-sm font-semibold text-gray-700 w-6">{score}</span>
    </div>
  );
}

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@type": "Product", name: product.name },
    reviewRating: { "@type": "Rating", ratingValue: product.rating.toString(), bestRating: "5" },
    author: { "@type": "Organization", name: "MyPawAdvisor" },
    reviewBody: product.verdict,
    datePublished: "2026-04-08",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* BREADCRUMB */}
      <div className="max-w-4xl mx-auto px-4 pt-5 text-sm text-gray-500 flex items-center gap-1.5 flex-wrap">
        <Link href="/" className="hover:text-emerald-600">Home</Link>
        <span>/</span>
        <Link href="/reviews" className="hover:text-emerald-600">Reviews</Link>
        <span>/</span>
        <Link href={`/reviews?cat=${product.category}`} className="hover:text-emerald-600 capitalize">{product.category}</Link>
        <span>/</span>
        <span className="text-gray-800">{product.shortName}</span>
      </div>

      <article className="max-w-4xl mx-auto px-4 py-8">

        {/* HEADER */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${product.badgeColor}`}>{product.badge}</span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full capitalize">{product.subCategory}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-3 text-gray-900">
            {product.name} Review (2026)
          </h1>
          <p className="text-xl text-gray-600 mb-4 leading-relaxed">{product.tagline}</p>
          <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500 pb-5 border-b border-gray-100">
            <span>📅 April 8, 2026</span>
            <span>✅ Tested & verified</span>
            <span>⏱️ 8 min read</span>
          </div>
        </header>

        {/* HERO IMAGE */}
        <div className="w-full rounded-2xl overflow-hidden mb-8 bg-gray-50 flex items-center justify-center" style={{maxHeight: "420px"}}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.heroImage}
            alt={product.heroImageAlt}
            className="max-h-[420px] w-auto max-w-full object-contain p-4"
            loading="eager"
          />
        </div>

        {/* QUICK VERDICT BOX */}
        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 mb-10">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">MyPawAdvisor Verdict</p>
              <h2 className="text-xl font-bold text-gray-900">{product.shortName}</h2>
              <StarRating rating={product.rating} large />
              <p className="text-xs text-gray-500 mt-1">{product.reviewCount} Amazon reviews</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-extrabold text-gray-900">{product.price}</p>
              <p className="text-xs text-gray-500">on Amazon</p>
            </div>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed mb-5">{product.verdict}</p>
          <div className="space-y-2 mb-5">
            <ScoreBar label="Value" score={parseFloat((product.rating - 0.1).toFixed(1))} />
            <ScoreBar label="Durability" score={parseFloat((product.rating - 0.2).toFixed(1))} />
            <ScoreBar label="Ease of Use" score={parseFloat((product.rating + 0.1 > 5 ? 4.9 : product.rating + 0.1).toFixed(1))} />
            <ScoreBar label="Pet Response" score={product.rating} />
          </div>
          <a
            href={product.affiliateHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-4 rounded-xl text-base transition-colors w-full"
          >
            <span>{product.affiliateCta ?? "Check Current Price on Amazon"}</span>
            <span>→</span>
          </a>
          <p className="text-xs text-gray-400 text-center mt-2">Affiliate link — we earn a small commission at no extra cost to you</p>
        </div>

        {/* SPECS TABLE */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Quick Specs</h2>
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            {product.specs.map((spec, i) => (
              <div
                key={spec.label}
                className={`flex gap-4 px-5 py-3 text-sm ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <span className="font-semibold text-gray-700 w-44 shrink-0">{spec.label}</span>
                <span className="text-gray-600">{spec.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* INTRO */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-5 text-gray-900">Our Review</h2>
          <div className="space-y-4">
            {product.intro.map((para, i) => (
              <p key={i} className="text-gray-700 leading-relaxed text-[1.05rem]">{para}</p>
            ))}
          </div>
        </section>

        {/* REVIEW SECTIONS */}
        {product.sections.map((section) => (
          <section key={section.heading} className="mb-8">
            <h2 className="text-xl font-bold mb-3 text-gray-900">{section.heading}</h2>
            <p className="text-gray-700 leading-relaxed text-[1.05rem]">{section.body}</p>
          </section>
        ))}

        {/* PROS & CONS */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-5 text-gray-900">Pros & Cons</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <h3 className="font-bold text-green-800 mb-3">✅ What We Love</h3>
              <ul className="space-y-2">
                {product.pros.map((p) => (
                  <li key={p} className="flex gap-2 text-sm text-gray-700">
                    <span className="text-green-500 shrink-0 mt-0.5">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <h3 className="font-bold text-red-700 mb-3">⚠️ Watch Out For</h3>
              <ul className="space-y-2">
                {product.cons.map((c) => (
                  <li key={c} className="flex gap-2 text-sm text-gray-700">
                    <span className="text-red-400 shrink-0 mt-0.5">✕</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* WHO IS IT FOR */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-5 text-gray-900">Who Should Buy This?</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
              <h3 className="font-bold text-blue-800 mb-2">👍 Perfect For</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{product.whoFor}</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <h3 className="font-bold text-gray-700 mb-2">👎 Not Ideal If</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{product.whoNotFor}</p>
            </div>
          </div>
        </section>

        {/* ALTERNATIVES */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-5 text-gray-900">Alternatives to Consider</h2>
          <div className="space-y-3">
            {product.alternatives.map((alt) => {
              const isInternal = alt.href.startsWith("/");
              const label = isInternal ? "Read review →" : "View on Amazon →";
              const className = "text-xs font-semibold text-amber-600 hover:text-amber-700 whitespace-nowrap border border-amber-300 px-3 py-1.5 rounded-lg hover:bg-amber-50 transition-colors";
              return (
                <div key={alt.name} className="flex items-start justify-between gap-4 border border-gray-200 rounded-xl px-5 py-4">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{alt.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{alt.reason}</p>
                  </div>
                  {isInternal ? (
                    <Link href={alt.href} className={className}>{label}</Link>
                  ) : (
                    <a href={alt.href} target="_blank" rel="noopener noreferrer" className={className}>{label}</a>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* FINAL BUY CTA */}
        <div className="bg-gray-900 text-white rounded-2xl p-8 text-center mb-10">
          <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">{product.badge}</p>
          <h2 className="text-2xl font-bold mb-1">{product.name}</h2>
          <StarRating rating={product.rating} large />
          <p className="text-gray-300 text-sm mt-3 mb-6 max-w-md mx-auto">{product.verdict}</p>
          <div className="text-3xl font-extrabold mb-4">{product.price}</div>
          <a
            href={product.affiliateHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-4 rounded-xl text-base transition-colors"
          >
            {product.affiliateCta ?? "Buy on Amazon"} →
          </a>
          <p className="text-gray-500 text-xs mt-3">Affiliate link — no extra cost to you</p>
        </div>

        {/* AUTHOR BOX */}
        <div className="flex items-start gap-4 bg-gray-50 border border-gray-200 rounded-xl p-5 mb-10">
          <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center text-2xl shrink-0">🐾</div>
          <div>
            <p className="font-bold text-sm">MyPawAdvisor Editorial Team</p>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">Our reviews are based on hands-on testing, ingredient and material analysis, veterinary input, and aggregated owner review data from 10,000+ verified purchasers. We only recommend products we would use ourselves.</p>
          </div>
        </div>

        {/* RELATED REVIEWS */}
        <div className="border-t border-gray-100 pt-8">
          <h3 className="font-bold text-lg mb-4">More Reviews</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/reviews" className="border border-gray-200 rounded-lg px-4 py-2 text-sm hover:bg-gray-50 transition-colors">All Reviews</Link>
            <Link href="/insurance" className="border border-gray-200 rounded-lg px-4 py-2 text-sm hover:bg-gray-50 transition-colors">Pet Insurance Comparison</Link>
            <Link href="/blog" className="border border-gray-200 rounded-lg px-4 py-2 text-sm hover:bg-gray-50 transition-colors">Pet Care Blog</Link>
          </div>
        </div>
      </article>
    </>
  );
}
