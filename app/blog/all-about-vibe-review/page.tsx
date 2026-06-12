import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "All About Vibe Review 2026 – Are the Custom Pet Pillows Legit?",
  description:
    "All About Vibe review: what the custom pet pillow company actually delivers, what its mixed customer reviews say about shipping and refunds, and the alternatives to consider before ordering.",
  keywords: [
    "all about vibe reviews",
    "all about vibe review",
    "allaboutvibe.com reviews",
    "all about vibe pet pillow",
    "custom pet pillow review",
    "is all about vibe legit",
    "vibe for pets reviews",
  ],
};

const faqItems = [
  {
    q: "Is All About Vibe legit?",
    a: "Yes — All About Vibe is a real, identifiable U.S. company selling custom photo pet pillows, and it has been reviewed by established pet publications. It is not a fake storefront. However, its customer review record is mixed: aggregate scores range from strong (around 4.3/5 across dozens of reviews on some platforms) to poor (around 2/5 on complaint-focused sites), with the negative reviews concentrated on shipping delays, refunds, and customer service rather than the product itself.",
  },
  {
    q: "What does All About Vibe sell?",
    a: "Custom pillows printed with a photo of your pet — either cut to the shape of the animal or in a classic rectangular format. You upload a photo, and the pillow is produced and shipped to you.",
  },
  {
    q: "How long does All About Vibe take to ship?",
    a: "This is the most common complaint theme in negative reviews: customers report orders taking longer than expected, and some report lost packages or difficulty reaching support about delays. If you're ordering for a specific date (a birthday, a memorial), order well in advance.",
  },
  {
    q: "Does All About Vibe have a guarantee?",
    a: "The company advertises a 100% satisfaction guarantee and says it will work with customers to fix problems. Some negative reviews dispute how smoothly that process goes in practice, particularly around refunds — so keep your order confirmation and pay with a card that offers purchase protection.",
  },
  {
    q: "Are there alternatives to All About Vibe?",
    a: "Yes. Several companies make custom-shape pet pillows, and Amazon carries multiple custom pet pillow options with buyer protection, faster shipping for Prime members, and a more predictable returns process.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "All About Vibe Review 2026 – Are the Custom Pet Pillows Legit?",
  description:
    "Research-based review of All About Vibe custom pet pillows: company background, what customer reviews actually say, and alternatives.",
  author: { "@type": "Organization", name: "MyPawAdvisor" },
  publisher: { "@type": "Organization", name: "MyPawAdvisor", url: "https://www.mypawadvisor.com" },
  datePublished: "2026-06-09",
  dateModified: "2026-06-09",
  mainEntityOfPage: "https://www.mypawadvisor.com/blog/all-about-vibe-review",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function AllAboutVibeReviewPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* BREADCRUMB */}
      <div className="max-w-4xl mx-auto px-4 pt-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-emerald-600">Home</Link>{" / "}
        <Link href="/blog" className="hover:text-emerald-600">Blog</Link>{" / "}
        <span>All About Vibe Review</span>
      </div>

      <article className="max-w-4xl mx-auto px-4 py-8">

        {/* HEADER */}
        <header className="mb-8">
          <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded-full">Brand Check</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-3 mb-3 leading-tight">
            All About Vibe Review: Are the Custom Pet Pillows Legit?
          </h1>
          <p className="text-gray-600 text-lg mb-4">
            Short answer: All About Vibe is a real company with a real product — custom-shaped pillows printed with your pet&apos;s photo — but its customer reviews split sharply between delighted buyers and frustrated ones stuck in shipping or refund limbo. Here&apos;s what the public record actually shows, and how to order safely if you decide to.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
            <span>📅 June 9, 2026</span>
            <span>⏱️ 6 min read</span>
            <span>🔎 Research-based review</span>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-2xl">🐾</div>
            <div>
              <p className="font-semibold text-sm">Reviewed by the MyPawAdvisor Editorial Team</p>
              <p className="text-xs text-gray-500">
                This is a research-based brand review compiled from public customer reviews, complaint records, and expert coverage — we have not purchased from this company ourselves, and we say so wherever it matters.
              </p>
            </div>
          </div>
        </header>

        {/* HERO IMAGE */}
        <div className="rounded-2xl overflow-hidden mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=1200&q=80&auto=format&fit=crop"
            alt="Happy dog — the kind of photo people turn into custom pet pillows"
            className="w-full h-64 md:h-80 object-cover"
          />
        </div>

        {/* WHAT IT IS */}
        <h2 className="text-2xl font-bold mb-4">What All About Vibe Actually Is</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          All About Vibe (allaboutvibe.com) is a U.S.-based company — associated with Sioux Falls, South Dakota, with production reported out of a Chicago facility — that sells <strong>custom photo pillows</strong>. The flagship product for pet owners: you upload a photo of your dog or cat, and they produce a pillow cut to the shape of your pet, or a standard rectangular pillow with the photo printed on it. It&apos;s a gift-oriented product — birthdays, memorials for pets who have passed, presents for pet-obsessed friends.
        </p>
        <p className="text-gray-700 mb-6 leading-relaxed">
          This is a real, identifiable business with a track record long enough to accumulate both professional reviews from established pet publications and a meaningful body of customer feedback. That alone separates it from the wave of anonymous dropshipping pet stores — the question with All About Vibe isn&apos;t &quot;does it exist,&quot; it&apos;s &quot;will your order arrive on time and look right.&quot;
        </p>

        {/* THE REVIEW RECORD */}
        <h2 className="text-2xl font-bold mb-4">What the Review Record Actually Says</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          The picture depends heavily on where you look, which is itself informative:
        </p>
        <div className="space-y-3 mb-6">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
            <p className="font-bold text-sm text-emerald-800 mb-2">✅ The positive side</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Aggregate review scores around <strong>4.3/5 across ~56 reviews</strong> on review-collection platforms</li>
              <li>• Hands-on reviews from established pet publications (Hepper, Dogster) rate the pillow quality positively</li>
              <li>• Happy customers consistently praise print quality and the custom-shape cutting</li>
              <li>• The company advertises a 100% satisfaction guarantee</li>
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-5">
            <p className="font-bold text-sm text-red-800 mb-2">❌ The negative side</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Complaint-focused platforms show a much lower score (~<strong>2.2/5</strong>, small sample) with &quot;don&apos;t buy&quot; sentiment</li>
              <li>• A Better Business Bureau complaint record exists</li>
              <li>• Recurring themes: <strong>shipping delays, lost packages, slow or disputed refunds</strong>, and difficulty reaching support</li>
              <li>• Scattered product complaints: blurry prints from low-resolution photos, wrong or damaged items</li>
            </ul>
          </div>
        </div>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Read together, the pattern is familiar for small custom-product companies: the product itself is generally liked, but fulfillment is the weak link — and when fulfillment fails, support struggles to keep up. The dissatisfied reviews cluster around the order experience, not the pillow.
        </p>

        {/* HOW TO ORDER SAFELY */}
        <h2 className="text-2xl font-bold mb-4">If You Order: Five Ways to Protect Yourself</h2>
        <div className="space-y-3 mb-8">
          {[
            {
              step: "1. Order far ahead of any date that matters",
              detail: "Shipping delays are the #1 complaint theme. If the pillow is a birthday or memorial gift, build in weeks of buffer, not days.",
            },
            {
              step: "2. Upload the highest-resolution photo you have",
              detail: "Blurry-print complaints almost always trace back to low-resolution source photos. Use a sharp, well-lit, close-up photo — not a screenshot or a heavily cropped image.",
            },
            {
              step: "3. Pay with a credit card, not a debit card",
              detail: "Credit cards give you chargeback rights if an order never arrives and support goes quiet. This is standard advice for any small online retailer.",
            },
            {
              step: "4. Screenshot your order confirmation and the guarantee",
              detail: "The advertised 100% satisfaction guarantee is your lever if something goes wrong. Keep evidence of what was promised at purchase time.",
            },
            {
              step: "5. Check current reviews before you buy",
              detail: "Small companies' fulfillment quality changes over time — for better and worse. A two-minute scan of the most recent reviews tells you what this month looks like.",
            },
          ].map(({ step, detail }) => (
            <div key={step} className="flex gap-3 bg-gray-50 rounded-lg p-4">
              <span className="text-emerald-600 font-bold text-sm whitespace-nowrap">✓</span>
              <div>
                <p className="font-semibold text-sm">{step}</p>
                <p className="text-xs text-gray-600 mt-1">{detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ALTERNATIVES */}
        <h2 className="text-2xl font-bold mb-4">Alternatives Worth Comparing</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Custom pet pillows are a competitive category, and the strongest argument for shopping it on Amazon is structural: Prime shipping timelines and Amazon&apos;s returns process remove exactly the risks that generate All About Vibe&apos;s negative reviews. Several sellers offer custom-shape photo pillows at comparable prices.
        </p>
        <div className="flex flex-wrap gap-3 mb-8">
          <a
            href="https://www.amazon.com/s?k=custom+pet+pillow+photo&tag=pawadvisor-20"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-amber-500 text-white font-semibold px-5 py-2 rounded-full text-sm hover:bg-amber-600 transition-colors"
          >
            Browse Custom Pet Pillows on Amazon →
          </a>
        </div>

        {/* FAQ */}
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4 mb-8">
          {faqItems.map(({ q, a }) => (
            <div key={q} className="border border-gray-200 rounded-xl p-5">
              <p className="font-semibold text-sm mb-2">Q: {q}</p>
              <p className="text-sm text-gray-600 leading-relaxed">A: {a}</p>
            </div>
          ))}
        </div>

        {/* VERDICT */}
        <div className="bg-gray-900 text-white rounded-xl p-8 mb-8">
          <h2 className="text-xl font-bold mb-3">Bottom Line</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            All About Vibe is legitimate, and when orders go smoothly the product earns its good reviews. But the complaint record around shipping and refunds is real and consistent enough that we&apos;d only order with time to spare, a high-resolution photo, and a credit card. If predictable delivery matters more to you than this specific brand, the Amazon custom-pillow sellers are the lower-stress route to the same gift.
          </p>
        </div>

        {/* RELATED */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="font-bold text-lg mb-4">Related Articles</h3>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/blog/best-pet-products-amazon"
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm hover:bg-gray-50"
            >
              Best Pet Products on Amazon
            </Link>
            <Link
              href="/reviews"
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm hover:bg-gray-50"
            >
              All Product Reviews
            </Link>
            <Link
              href="/blog/magikpet-review"
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm hover:bg-gray-50"
            >
              Magikpet Review
            </Link>
            <Link
              href="/blog/lupa-pets-review"
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm hover:bg-gray-50"
            >
              Lupa Pets Review
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
