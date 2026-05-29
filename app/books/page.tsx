import type { Metadata } from "next";
import Link from "next/link";
import { books, AUDIBLE_FREE_TRIAL } from "@/lib/books";

export const metadata: Metadata = {
  title: "Best Books for Dog & Cat Owners (2026) — Plus Listen Free on Audible",
  description:
    "Our favorite books for pet owners — Decoding Your Dog, Decoding Your Cat, and All Dogs Go to Kevin. Honest reviews, plus how to listen to any of them free with an Audible trial.",
  keywords: [
    "best dog behavior book",
    "best cat behavior book",
    "decoding your dog review",
    "decoding your cat review",
    "all dogs go to kevin",
    "pet books audible free",
  ],
  alternates: { canonical: "https://www.mypawadvisor.com/books" },
};

const categoryPill: Record<string, string> = {
  dogs: "bg-amber-100 text-amber-800",
  cats: "bg-purple-100 text-purple-800",
  both: "bg-emerald-100 text-emerald-800",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-amber-400 text-sm">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= Math.floor(rating) ? "text-amber-400" : "text-gray-300"}>
          ★
        </span>
      ))}
      <span className="text-gray-500 ml-1 font-semibold">{rating.toFixed(1)}</span>
    </span>
  );
}

function AudibleCta({ label = "Listen Free on Audible" }: { label?: string }) {
  return (
    <a
      href={AUDIBLE_FREE_TRIAL}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="inline-flex items-center justify-center gap-2 bg-[#ff9900] hover:bg-[#f08c00] text-gray-900 font-bold px-6 py-3 rounded-full transition-colors shadow-md text-sm text-center"
    >
      🎧 {label}
    </a>
  );
}

export default function BooksPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Books for Pet Owners",
    itemListElement: books.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Book",
        name: b.title,
        author: { "@type": "Organization", name: b.author },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: b.rating,
          bestRating: 5,
        },
        url: `https://www.mypawadvisor.com/books#${b.slug}`,
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-amber-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-emerald-700 text-sm font-semibold uppercase tracking-widest mb-4">
            Recommended Reading
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5 text-gray-900">
            Books Every Pet Owner Should Read
          </h1>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
            The right book can save you years of frustration — and a lot of money at the vet and trainer.
            These are the three we recommend most. Better yet, you can listen to all of them{" "}
            <strong className="text-gray-900">free</strong> with an Audible trial.
          </p>
        </div>
      </section>

      {/* AUDIBLE FREE TRIAL BANNER */}
      <section className="bg-gray-950 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <p className="text-[#ff9900] font-bold text-xs uppercase tracking-widest mb-2">
              🎧 Listen Free
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-3 leading-tight">
              Get Any of These Audiobooks Free
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-lg">
              Start a <strong className="text-white">30-day Audible free trial</strong> and your first
              audiobook is yours to keep — even if you cancel. Listen to <em>Decoding Your Dog</em>,{" "}
              <em>Decoding Your Cat</em>, or <em>All Dogs Go to Kevin</em> on your commute, walk, or before
              bed. No cost, no risk.
            </p>
            <AudibleCta label="Start My Free Trial" />
            <p className="text-xs text-gray-500 mt-3">
              Affiliate link — we may earn a commission at no extra cost to you.
            </p>
          </div>
          <div className="flex-shrink-0 flex gap-3">
            {books.map((b) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={b.slug}
                src={b.cover}
                alt={b.coverAlt}
                className="h-32 md:h-40 w-auto rounded-md shadow-2xl shadow-black/50 first:rotate-[-6deg] last:rotate-[6deg]"
              />
            ))}
          </div>
        </div>
      </section>

      {/* BOOK REVIEWS */}
      <section className="max-w-4xl mx-auto px-4 py-16 space-y-20">
        {books.map((book, index) => (
          <article key={book.slug} id={book.slug} className="scroll-mt-24">
            <div className="grid md:grid-cols-5 gap-8 items-start">
              {/* Cover + quick facts */}
              <div className={`md:col-span-2 ${index % 2 === 1 ? "md:order-2" : ""}`}>
                <div className="sticky top-24">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={book.cover}
                    alt={book.coverAlt}
                    className="w-44 mx-auto md:mx-0 rounded-lg shadow-xl"
                  />
                  <div className="mt-5 flex flex-col gap-2.5">
                    <a
                      href={book.amazonHref}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-bold px-6 py-3 rounded-full transition-colors shadow-md text-sm text-center"
                    >
                      Buy on Amazon →
                    </a>
                    <AudibleCta />
                  </div>
                  <dl className="mt-5 text-sm text-gray-500 space-y-1.5">
                    {book.narrator && (
                      <div className="flex gap-2">
                        <dt className="font-semibold text-gray-700">Narrator:</dt>
                        <dd>{book.narrator}</dd>
                      </div>
                    )}
                    {book.audiobookLength && (
                      <div className="flex gap-2">
                        <dt className="font-semibold text-gray-700">Length:</dt>
                        <dd>{book.audiobookLength}</dd>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <dt className="font-semibold text-gray-700">Published:</dt>
                      <dd>{book.year}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Review body */}
              <div className="md:col-span-3">
                <span
                  className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3 ${categoryPill[book.category]}`}
                >
                  {book.category === "cats" ? "🐱 For Cat Owners" : book.category === "both" ? "🐾 Dogs & Cats" : "🐶 For Dog Owners"}
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
                  {book.title}
                </h2>
                <p className="text-gray-500 text-sm mt-1 mb-3">{book.subtitle}</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-5">
                  <StarRating rating={book.rating} />
                  <span className="text-sm text-gray-500">by {book.author}</span>
                </div>

                <div className="prose-sm space-y-4 text-gray-700 leading-relaxed">
                  {book.review.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                {/* What you'll learn */}
                <div className="mt-6 bg-emerald-50 border border-emerald-100 rounded-xl p-5">
                  <h3 className="font-bold text-emerald-900 mb-3 text-sm uppercase tracking-wide">
                    What you'll learn
                  </h3>
                  <ul className="space-y-2">
                    {book.learn.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-gray-700">
                        <span className="text-emerald-600 font-bold">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pros / Cons */}
                <div className="mt-5 grid sm:grid-cols-2 gap-4">
                  <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                    <h3 className="font-bold text-green-800 mb-2 text-sm">👍 Pros</h3>
                    <ul className="space-y-1.5">
                      {book.pros.map((p) => (
                        <li key={p} className="text-sm text-gray-700 flex gap-1.5">
                          <span className="text-green-600">+</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                    <h3 className="font-bold text-red-800 mb-2 text-sm">👎 Cons</h3>
                    <ul className="space-y-1.5">
                      {book.cons.map((c) => (
                        <li key={c} className="text-sm text-gray-700 flex gap-1.5">
                          <span className="text-red-500">–</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Best for + verdict */}
                <p className="mt-5 text-sm text-gray-700">
                  <strong className="text-gray-900">Best for:</strong> {book.bestFor}
                </p>
                <div className="mt-4 bg-gray-900 text-white rounded-xl p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
                    The Bottom Line
                  </p>
                  <p className="text-sm leading-relaxed text-gray-200">{book.verdict}</p>
                  <div className="mt-4 flex flex-col sm:flex-row gap-3">
                    <a
                      href={book.amazonHref}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-bold px-5 py-2.5 rounded-full transition-colors text-sm"
                    >
                      Buy on Amazon →
                    </a>
                    <AudibleCta />
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* HOW TO LISTEN FREE */}
      <section className="bg-gray-950 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#ff9900] font-bold text-xs uppercase tracking-widest mb-2">🎧 Audible</p>
          <h2 className="text-3xl font-extrabold mb-4">How to Listen to Any of These Free</h2>
          <p className="text-gray-300 mb-10 max-w-xl mx-auto">
            Audible's free trial gives you a credit good for any audiobook on this page. Cancel anytime —
            the book is yours to keep forever.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 mb-10 text-left">
            {[
              { n: "1", t: "Start the free trial", d: "Sign up for a 30-day Audible Premium Plus trial. It's free and takes a minute." },
              { n: "2", t: "Pick your book", d: "Use your credit on Decoding Your Dog, Decoding Your Cat, or All Dogs Go to Kevin." },
              { n: "3", t: "Listen anywhere", d: "Play it on your phone during walks or commutes. Keep the book even if you cancel." },
            ].map((s) => (
              <div key={s.n} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="w-9 h-9 rounded-full bg-[#ff9900] text-gray-900 font-extrabold flex items-center justify-center mb-4">
                  {s.n}
                </div>
                <h3 className="font-bold mb-2">{s.t}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
          <AudibleCta label="Start My 30-Day Free Trial" />
          <p className="text-xs text-gray-500 mt-4">
            Affiliate link — we may earn a commission at no extra cost to you.
          </p>
        </div>
      </section>

      {/* FTC DISCLOSURE */}
      <section className="max-w-3xl mx-auto px-4 py-10">
        <p className="text-xs text-gray-400 leading-relaxed text-center">
          As an Amazon Associate, MyPawAdvisor earns from qualifying purchases and from qualifying Audible
          sign-ups. The book recommendations on this page are our genuine opinions and are not influenced
          by commissions. Prices and audiobook availability are set by Amazon and may change.
        </p>
        <div className="mt-6 text-center">
          <Link href="/reviews" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">
            ← Back to all reviews
          </Link>
        </div>
      </section>
    </>
  );
}
