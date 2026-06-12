import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lupa Pets Review 2026 – The AI Petcare App & Vet Software, Explained",
  description:
    "Lupa Pets review: one London company, two products — a free AI petcare app for owners (AI vet chat, records, bookings) and Lupa OS practice software for veterinary clinics. What each does and who it's for.",
  keywords: [
    "lupa pets review",
    "lupa pets reviews",
    "lupa app review",
    "lupa ai petcare app",
    "lupa veterinary software review",
    "lupa os review",
    "is lupa pets legit",
  ],
};

const faqItems = [
  {
    q: "Is Lupa Pets legit?",
    a: "Yes. Lupa Pets Ltd is an identifiable London-based company that publicly raised $20 million in funding in October 2025 to build its AI-powered petcare platform. Its consumer app is published on the Apple App Store and Google Play under the company's name, and its veterinary software is listed on B2B review platforms like G2 and Capterra.",
  },
  {
    q: "What is the Lupa app for pet owners?",
    a: "Lupa – AI Powered Petcare is a free mobile app where you create a profile for your pet and get AI-powered features: a 24/7 AI vet assistant ('Jerry') for health questions, AI nutrition guidance, training plans, vaccination and appointment reminders, medical record storage, vet clinic discovery and booking, and a community forum.",
  },
  {
    q: "Is the Lupa app free?",
    a: "The app is free to download on iOS and Android. As with most AI-powered apps, specific features and any premium tiers can change over time — check the current App Store or Google Play listing for what's included today.",
  },
  {
    q: "Can the Lupa AI vet replace a real veterinarian?",
    a: "No — and treat any AI health tool accordingly. An AI assistant is useful for general questions, triage-level guidance, and organizing your pet's records, but it cannot examine your animal. For anything urgent, painful, or persistent, see a licensed veterinarian. AI advice is a complement to vet care, never a substitute.",
  },
  {
    q: "What is Lupa OS?",
    a: "Lupa's product for veterinary clinics: practice management software combining scheduling, communications, payments, online booking, and analytics, plus an AI scribe that drafts clinical notes automatically and an AI assistant that handles client scheduling and communication around the clock. It's aimed at clinics, not pet owners, and is reviewed on platforms like G2 and Capterra.",
  },
  {
    q: "Why do searches for 'Lupa pets' show two different products?",
    a: "Because the same company runs both: the consumer app for pet owners and the clinic software for veterinary practices. If you're a pet owner, the app is the product meant for you; if you manage a vet practice, Lupa OS is the one to evaluate.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Lupa Pets Review 2026 – The AI Petcare App & Vet Software, Explained",
  description:
    "What Lupa Pets actually is: a London company with a free AI petcare app for owners and Lupa OS software for veterinary clinics.",
  author: { "@type": "Organization", name: "MyPawAdvisor" },
  publisher: { "@type": "Organization", name: "MyPawAdvisor", url: "https://www.mypawadvisor.com" },
  datePublished: "2026-06-06",
  dateModified: "2026-06-06",
  mainEntityOfPage: "https://www.mypawadvisor.com/blog/lupa-pets-review",
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

export default function LupaPetsReviewPage() {
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
        <span>Lupa Pets Review</span>
      </div>

      <article className="max-w-4xl mx-auto px-4 py-8">

        {/* HEADER */}
        <header className="mb-8">
          <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded-full">Brand Check</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-3 mb-3 leading-tight">
            Lupa Pets Review: The AI Petcare App and the Vet Software, Explained
          </h1>
          <p className="text-gray-600 text-lg mb-4">
            Searching &quot;Lupa Pets review&quot; lands you in confusing territory, because the name covers two different products from one company: a <strong>free AI petcare app</strong> for pet owners and <strong>Lupa OS</strong>, practice-management software for veterinary clinics. Here&apos;s what each one actually is, who it&apos;s for, and whether the company behind them checks out.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
            <span>📅 June 6, 2026</span>
            <span>⏱️ 6 min read</span>
            <span>🔎 Research-based review</span>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-2xl">🐾</div>
            <div>
              <p className="font-semibold text-sm">Reviewed by the MyPawAdvisor Editorial Team</p>
              <p className="text-xs text-gray-500">
                Research-based brand review compiled from the company&apos;s public materials, app store listings, B2B review platforms, and funding coverage — current as of June 2026.
              </p>
            </div>
          </div>
        </header>

        {/* HERO IMAGE */}
        <div className="rounded-2xl overflow-hidden mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200&q=80&auto=format&fit=crop"
            alt="Pet owner with a dog — the audience for AI petcare apps"
            className="w-full h-64 md:h-80 object-cover"
          />
        </div>

        {/* THE COMPANY */}
        <h2 className="text-2xl font-bold mb-4">The Company Behind the Name</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Lupa Pets Ltd is a London-based startup building AI tools for pet care on both sides of the exam table. It&apos;s a verifiable business: in October 2025 it publicly announced a <strong>$20 million funding round</strong> to expand its AI-powered petcare platform, its consumer app is published under the company&apos;s own name on the Apple App Store and Google Play, and its clinic software is listed on established B2B review platforms including G2 and Capterra.
        </p>
        <p className="text-gray-700 mb-6 leading-relaxed">
          So the legitimacy question that drives most &quot;[brand] review&quot; searches has a clean answer here: this is a real, funded company — not a mystery storefront. The real question is which of its two products you&apos;re actually looking for.
        </p>

        {/* THE APP */}
        <h2 className="text-2xl font-bold mb-4">Product 1: The Lupa App (for Pet Owners)</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          <strong>Lupa – AI Powered Petcare</strong> is a free app for iOS and Android. You build a profile for your pet — species, breed, age, health history — and the app layers AI features on top of it:
        </p>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-6">
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• <strong>AI vet chat (&quot;Jerry&quot;)</strong> — 24/7 question-answering about your pet&apos;s health, informed by the profile and history you&apos;ve entered</li>
            <li>• <strong>AI nutrition guidance</strong> — food recommendations tailored to your pet&apos;s needs and budget</li>
            <li>• <strong>Training plans</strong> — structured routines for teaching and behavior work</li>
            <li>• <strong>Health records in one place</strong> — vaccinations, conditions, and medical history</li>
            <li>• <strong>Reminders</strong> — vet appointments and vaccination schedules</li>
            <li>• <strong>Clinic discovery and booking</strong> — find nearby vets and book from the app</li>
            <li>• <strong>Community and places</strong> — a forum of pet owners plus pet-friendly parks, cafés, and hotels</li>
          </ul>
        </div>
        <p className="text-gray-700 mb-4 leading-relaxed">
          The honest assessment: the feature set is genuinely useful — particularly the single place for records, reminders, and bookings, which is a real gap for most pet owners. The AI chat is best treated as a well-informed first opinion: good for &quot;is this normal,&quot; &quot;what should I watch for,&quot; and &quot;does this need a vet visit,&quot; and emphatically not a replacement for one. No app can palpate an abdomen.
        </p>
        <p className="text-gray-700 mb-6 leading-relaxed">
          One thing to know before relying on it: the app is still building its public review base — as of mid-2026 it doesn&apos;t yet show a large volume of user ratings. That&apos;s normal for a newer app from a funded company, but it means you&apos;re an early adopter, and features may evolve quickly (the app was updated as recently as this month).
        </p>

        {/* LUPA OS */}
        <h2 className="text-2xl font-bold mb-4">Product 2: Lupa OS (for Veterinary Clinics)</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          If you&apos;re a veterinary professional, the Lupa product you&apos;ve heard about is different: <strong>Lupa OS</strong>, an all-in-one practice management system. It combines scheduling, client communications, payments, online booking, and analytics in one platform, with two AI components doing the heavy lifting: an <strong>AI medical scribe</strong> that drafts clinical notes automatically during consultations, and a <strong>24/7 AI assistant</strong> that handles client scheduling and routine communication. The company offers special pricing for AAHA-accredited practices.
        </p>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Evaluating practice software is its own discipline — if that&apos;s your search, the most useful next step is the verified-user reviews on G2 and Capterra plus a direct demo, not a consumer pet blog. We&apos;ll keep our lane: from the pet owner&apos;s side, a clinic running modern booking and communication software is simply a better clinic to deal with.
        </p>

        {/* WHO SHOULD USE WHAT */}
        <h2 className="text-2xl font-bold mb-4">Which Lupa Is for You?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
            <p className="font-bold text-sm text-emerald-800 mb-2">🐕 You own a pet</p>
            <p className="text-xs text-gray-600 mb-2">The free Lupa app is the product for you, worth trying if you want:</p>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>• All vet records and reminders in one app</li>
              <li>• A 24/7 first-opinion AI for health questions</li>
              <li>• Nutrition and training guidance in the same place</li>
              <li>• Clinic search and booking without phone calls</li>
            </ul>
          </div>
          <div className="bg-sky-50 border border-sky-200 rounded-xl p-5">
            <p className="font-bold text-sm text-sky-800 mb-2">🩺 You run a veterinary practice</p>
            <p className="text-xs text-gray-600 mb-2">You&apos;re evaluating Lupa OS. Do it the B2B way:</p>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>• Read verified-user reviews on G2 and Capterra</li>
              <li>• Ask for a live demo with your own workflows</li>
              <li>• Test the AI scribe against your consult style</li>
              <li>• Ask about AAHA-accredited practice pricing</li>
            </ul>
          </div>
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
            Lupa Pets is a legitimate, well-funded London company with two distinct products sharing one name. For pet owners, the free app is a genuinely useful organizer with an AI assistant worth having — as long as you treat AI health advice as triage, not diagnosis. For clinics, Lupa OS is a serious practice-management contender that deserves a proper B2B evaluation. Neither is a scam; both are young products from a company still building its track record.
          </p>
        </div>

        {/* RELATED */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="font-bold text-lg mb-4">Related Articles</h3>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/blog/pet-insurance-worth-it"
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm hover:bg-gray-50"
            >
              Is Pet Insurance Worth It?
            </Link>
            <Link
              href="/blog/all-about-vibe-review"
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm hover:bg-gray-50"
            >
              All About Vibe Review
            </Link>
            <Link
              href="/blog/magikpet-review"
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm hover:bg-gray-50"
            >
              Magikpet Review
            </Link>
            <Link
              href="/reviews"
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm hover:bg-gray-50"
            >
              All Product Reviews
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
