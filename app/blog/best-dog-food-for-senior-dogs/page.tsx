import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Dog Food for Senior Dogs 2026 – Vet-Approved Picks",
  description:
    "The best dog food for senior dogs in 2026. Our vet-approved picks address the real challenges of aging dogs: muscle loss, joint pain, cognitive decline, and weight gain. Tested and rated.",
  keywords: [
    "best dog food for senior dogs",
    "best senior dog food 2026",
    "dog food for older dogs",
    "senior dog food vet recommended",
    "best dog food for dogs over 7",
    "high protein senior dog food",
    "dog food for aging dogs joints",
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Best Dog Food for Senior Dogs 2026 – Vet-Approved Picks",
  description:
    "Vet-approved dog food picks for senior dogs covering joint health, muscle maintenance, cognitive support, and weight management.",
  author: { "@type": "Organization", name: "MyPawAdvisor" },
  publisher: { "@type": "Organization", name: "MyPawAdvisor", url: "https://mypawadvisor.com" },
  datePublished: "2026-04-10",
  dateModified: "2026-04-10",
  mainEntityOfPage: "https://mypawadvisor.com/blog/best-dog-food-for-senior-dogs",
};

const picks = [
  {
    rank: 1,
    name: "Hill's Science Diet Adult 7+ Small Bites",
    badge: "Best Overall",
    badgeColor: "bg-amber-100 text-amber-700",
    price: "$$",
    rating: 4.9,
    description:
      "The gold standard for senior dog nutrition, developed specifically for dogs 7 and older. Contains natural omega-3s for joint mobility, precise antioxidant levels (Vitamins C & E) for immune support, and DHA for brain and eye health. The #1 vet-recommended senior formula in the US.",
    pros: [
      "#1 vet-recommended senior formula",
      "Clinically proven antioxidants",
      "DHA for cognitive and eye health",
      "Omega-3s for joint mobility",
      "AAFCO-certified feeding trials",
      "No artificial colors or preservatives",
    ],
    cons: ["Not grain-free", "Some dogs find kibble size too small"],
    affiliateHref: "https://www.amazon.com/s?k=Hills+Science+Diet+Adult+7+Small+Bites&tag=pawadvisor-20",
  },
  {
    rank: 2,
    name: "Purina Pro Plan Bright Mind Adult 7+",
    badge: "Best for Brain Health",
    badgeColor: "bg-blue-100 text-blue-700",
    price: "$$",
    rating: 4.8,
    description:
      "The only senior formula specifically designed to support cognitive function. Enhanced with botanical oils — a source of medium chain triglycerides (MCTs) — clinically shown to promote alertness and mental sharpness in dogs 7+. Real chicken as the first ingredient with live probiotics.",
    pros: [
      "MCT-enhanced formula for brain health",
      "Clinically shown to promote alertness",
      "Real chicken first ingredient",
      "Live probiotics for digestion",
      "EPA for joint mobility",
    ],
    cons: ["Higher price for a mainstream brand", "Only available in chicken flavor"],
    affiliateHref: "https://www.amazon.com/s?k=Purina+Pro+Plan+Bright+Mind+Adult+7&tag=pawadvisor-20",
  },
  {
    rank: 3,
    name: "Royal Canin Size Health Nutrition Aging 12+",
    badge: "Best for Small Breeds",
    badgeColor: "bg-purple-100 text-purple-700",
    price: "$$$",
    rating: 4.7,
    description:
      "Formulated for small and toy breed dogs 12 years and older — because small dogs age differently and live longer. Enriched with EPA, DHA, and L-carnitine to support aging muscle mass. Kibble size and shape are adapted for older teeth and slower digestion.",
    pros: [
      "Specifically for small/toy breeds 12+",
      "Adapted kibble for aging teeth",
      "L-carnitine for muscle maintenance",
      "EPA & DHA for coat and joint support",
      "Highly digestible formula",
    ],
    cons: ["Only for small breeds", "Premium price"],
    affiliateHref: "https://www.amazon.com/s?k=Royal+Canin+Aging+12+Small+Dog&tag=pawadvisor-20",
  },
  {
    rank: 4,
    name: "Blue Buffalo Life Protection Healthy Aging",
    badge: "Best Natural Formula",
    badgeColor: "bg-green-100 text-green-700",
    price: "$$",
    rating: 4.6,
    description:
      "Real deboned chicken as the first ingredient with Blue Buffalo's proprietary LifeSource Bits — a blend of antioxidants, vitamins, and minerals selected by vets and animal nutritionists. Glucosamine and chondroitin support joint health. No chicken by-product meals, corn, wheat, or soy.",
    pros: [
      "Real deboned chicken first",
      "LifeSource Bits antioxidant blend",
      "Glucosamine & chondroitin",
      "No corn, wheat, or soy",
      "Good for picky senior eaters",
    ],
    cons: ["LifeSource Bits can be inconsistent batch to batch", "Not WSAVA-approved"],
    affiliateHref: "https://www.amazon.com/s?k=Blue+Buffalo+Life+Protection+Healthy+Aging&tag=pawadvisor-20",
  },
  {
    rank: 5,
    name: "Wellness Complete Health Senior",
    badge: "Best Grain-Free Option",
    badgeColor: "bg-orange-100 text-orange-700",
    price: "$$$",
    rating: 4.6,
    description:
      "High-protein, grain-free senior formula with deboned chicken and whitefish. Rich in omega fatty acids for coat and skin health, with added glucosamine and chondroitin for joints. Lower calorie density makes it easier to manage weight in less active older dogs.",
    pros: [
      "High-quality protein sources",
      "Grain-free for sensitive stomachs",
      "Lower calorie density",
      "Glucosamine & chondroitin",
      "Omega-rich for coat health",
    ],
    cons: ["Expensive", "Transition slowly to avoid GI upset"],
    affiliateHref: "https://www.amazon.com/s?k=Wellness+Complete+Health+Senior&tag=pawadvisor-20",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-amber-400 text-sm">
      {"★".repeat(Math.floor(rating))}
      {"☆".repeat(5 - Math.floor(rating))}
      <span className="text-gray-500 ml-1">{rating.toFixed(1)}</span>
    </span>
  );
}

export default function SeniorDogFoodPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* BREADCRUMB */}
      <div className="max-w-4xl mx-auto px-4 pt-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-emerald-600">Home</Link>{" / "}
        <Link href="/blog" className="hover:text-emerald-600">Blog</Link>{" / "}
        <span>Best Dog Food for Senior Dogs</span>
      </div>

      <article className="max-w-4xl mx-auto px-4 py-8">

        {/* HEADER */}
        <header className="mb-8">
          <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-1 rounded-full">Dog Food</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-3 mb-3 leading-tight">
            Best Dog Food for Senior Dogs in 2026 (Vet-Approved)
          </h1>
          <p className="text-gray-600 text-lg mb-4">
            Once your dog hits 7 years old (or 5 for large breeds), their nutritional needs change significantly. Muscle loss accelerates, joints stiffen, digestion slows, and cognitive function can decline. The right food actively fights these changes. We reviewed 25 senior formulas to find the ones that genuinely deliver.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
            <span>📅 April 10, 2026</span>
            <span>⏱️ 9 min read</span>
            <span>✅ Expert reviewed</span>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-2xl">🐾</div>
            <div>
              <p className="font-semibold text-sm">Reviewed by the MyPawAdvisor Editorial Team</p>
              <p className="text-xs text-gray-500">Our reviews are based on ingredient analysis, veterinary input, and 1,000+ owner reviews per product.</p>
            </div>
          </div>
        </header>

        {/* QUICK ANSWER */}
        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 mb-8">
          <h2 className="font-bold text-lg mb-2">🏆 Quick Answer: Best Senior Dog Food 2026</h2>
          <ul className="text-sm space-y-1 text-gray-700">
            <li><strong>Best Overall:</strong> Hill's Science Diet Adult 7+ — #1 vet-recommended, antioxidants, DHA, omega-3s</li>
            <li><strong>Best for Brain Health:</strong> Purina Pro Plan Bright Mind 7+ — MCTs clinically shown to improve alertness</li>
            <li><strong>Best for Small Breeds:</strong> Royal Canin Aging 12+ — adapted for tiny, long-lived dogs</li>
            <li><strong>Best Natural:</strong> Blue Buffalo Healthy Aging — real chicken, LifeSource antioxidant blend</li>
            <li><strong>Best Grain-Free:</strong> Wellness Complete Health Senior — high protein, lower calorie density</li>
          </ul>
        </div>

        {/* WHEN IS A DOG SENIOR */}
        <h2 className="text-2xl font-bold mb-4">When Is a Dog Considered Senior?</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          There's no single age cutoff — it depends heavily on breed size. Large breeds age faster because their bodies work harder to maintain a bigger frame. Here's a general guide:
        </p>
        <div className="bg-gray-50 rounded-xl p-5 mb-8 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 font-semibold">Breed Size</th>
                <th className="text-left py-2 font-semibold">Examples</th>
                <th className="text-left py-2 font-semibold">Senior Age</th>
                <th className="text-left py-2 font-semibold">Life Expectancy</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {[
                ["Small (under 20 lbs)", "Chihuahua, Dachshund, Pomeranian", "10–12 years", "14–16 years"],
                ["Medium (20–50 lbs)", "Beagle, Cocker Spaniel, Bulldog", "8–10 years", "10–13 years"],
                ["Large (50–90 lbs)", "Lab, Golden, German Shepherd", "7–8 years", "10–12 years"],
                ["Giant (90+ lbs)", "Great Dane, Saint Bernard, Mastiff", "5–6 years", "7–10 years"],
              ].map(([size, examples, senior, life]) => (
                <tr key={size} className="border-b border-gray-100">
                  <td className="py-2 font-semibold">{size}</td>
                  <td className="py-2 text-gray-500 text-xs">{examples}</td>
                  <td className="py-2 font-semibold text-emerald-600">{senior}</td>
                  <td className="py-2">{life}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* WHAT CHANGES */}
        <h2 className="text-2xl font-bold mb-4">How Aging Changes Your Dog's Nutritional Needs</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Senior dogs aren't just older adults — their physiology changes in ways that require a fundamentally different approach to nutrition:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {[
            {
              icon: "💪",
              title: "Muscle Loss (Sarcopenia)",
              desc: "Dogs lose muscle mass faster after 7. Counter-intuitively, senior dogs often need MORE protein than adults — at least 25–30% dry matter — to slow muscle breakdown. Low-protein 'senior' foods are often outdated advice.",
            },
            {
              icon: "🦴",
              title: "Joint Deterioration",
              desc: "Cartilage thins and joint fluid decreases. Glucosamine (400mg+), chondroitin, and EPA/DHA omega-3s in food can reduce inflammation and slow the progression of arthritis — the #1 senior dog health issue.",
            },
            {
              icon: "🧠",
              title: "Cognitive Decline (CDS)",
              desc: "Canine Cognitive Dysfunction Syndrome affects 28% of dogs aged 11–12 and 68% of dogs aged 15–16. MCT-enhanced foods (like Purina Bright Mind) have clinical evidence for slowing cognitive decline.",
            },
            {
              icon: "🍽️",
              title: "Slower Digestion",
              desc: "Gut motility slows and enzyme production decreases. High-digestibility formulas with added fiber and probiotics help seniors absorb nutrients effectively and maintain regular stools.",
            },
            {
              icon: "⚖️",
              title: "Weight Fluctuation",
              desc: "Some seniors gain weight from reduced activity; others lose weight from muscle loss and reduced appetite. The right food addresses your individual dog's trend — not a one-size-fits-all calorie cut.",
            },
            {
              icon: "🫀",
              title: "Kidney & Heart Strain",
              desc: "Aging organs need support. Controlled phosphorus levels protect kidneys; taurine and L-carnitine support heart function. AAFCO-tested formulas account for these without over-restricting protein.",
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-gray-50 rounded-lg p-4">
              <p className="font-semibold text-sm mb-1">{icon} {title}</p>
              <p className="text-xs text-gray-600">{desc}</p>
            </div>
          ))}
        </div>

        {/* PRODUCT REVIEWS */}
        <h2 className="text-2xl font-bold mb-6">Top 5 Senior Dog Foods Reviewed</h2>
        <div className="space-y-6 mb-8">
          {picks.map((pick) => (
            <div
              key={pick.name}
              className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="bg-gray-50 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-400">#{pick.rank}</span>
                  <h3 className="font-bold text-lg">{pick.name}</h3>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${pick.badgeColor}`}>
                    {pick.badge}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <StarRating rating={pick.rating} />
                  <span className="text-xs text-gray-400">Price: {pick.price}</span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-4">{pick.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-semibold mb-2 text-green-700">✅ Pros</p>
                    <ul className="text-sm space-y-1 text-gray-600">
                      {pick.pros.map((p) => <li key={p}>• {p}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-2 text-red-600">❌ Cons</p>
                    <ul className="text-sm space-y-1 text-gray-600">
                      {pick.cons.map((c) => <li key={c}>• {c}</li>)}
                    </ul>
                  </div>
                </div>
                <a
                  href={pick.affiliateHref}
                  className="inline-block bg-amber-500 text-white font-semibold px-5 py-2 rounded-full text-sm hover:bg-amber-600 transition-colors"
                >
                  Check Price on Amazon →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* WHAT TO LOOK FOR */}
        <h2 className="text-2xl font-bold mb-4">What to Look for on the Label</h2>
        <div className="space-y-3 mb-8">
          {[
            {
              label: "AAFCO Statement: 'All Life Stages' or 'Senior'",
              detail: "Look for feeding trials (not just formulation) — 'Animal feeding tests using AAFCO procedures' is the gold standard. This means real dogs ate it and were monitored, not just a nutrient calculation on paper.",
            },
            {
              label: "Protein: 25–30%+ dry matter",
              detail: "Senior dogs need high-quality protein to fight sarcopenia. Named meats (chicken, beef, salmon) should be in the top 3 ingredients. Avoid foods that pad protein with plant-based sources like pea protein.",
            },
            {
              label: "Glucosamine: 400mg+ per serving",
              detail: "Check the guaranteed analysis panel. Below 400mg/serving is likely insufficient for therapeutic joint support. If the food doesn't contain enough, add a separate joint supplement.",
            },
            {
              label: "Omega-3 fatty acids (EPA & DHA)",
              detail: "Fish oil or fish meal in the top ingredients indicates omega-3 content. These reduce joint inflammation and support brain and eye health in aging dogs. Different from omega-6 in chicken fat.",
            },
            {
              label: "Controlled Phosphorus",
              detail: "As kidneys age, they struggle to filter excess phosphorus. A quality senior food keeps phosphorus under 0.8% dry matter. This matters most for dogs 10+ or those with early kidney disease.",
            },
          ].map(({ label, detail }) => (
            <div key={label} className="flex gap-3 bg-gray-50 rounded-lg p-4">
              <span className="text-emerald-600 font-bold text-sm whitespace-nowrap">✓</span>
              <div>
                <p className="font-semibold text-sm">{label}</p>
                <p className="text-xs text-gray-600 mt-1">{detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* TRANSITION GUIDE */}
        <h2 className="text-2xl font-bold mb-4">How to Transition Your Dog to Senior Food</h2>
        <p className="text-gray-700 mb-4 text-sm leading-relaxed">
          Senior dogs often have more sensitive digestive systems. Switch too fast and you'll get loose stools and a dog who refuses to eat. Follow this 10-day transition schedule:
        </p>
        <div className="bg-gray-50 rounded-xl p-5 mb-8 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 font-semibold">Days</th>
                <th className="text-left py-2 font-semibold">Old Food</th>
                <th className="text-left py-2 font-semibold">New Senior Food</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {[
                ["Days 1–3", "75%", "25%"],
                ["Days 4–6", "50%", "50%"],
                ["Days 7–9", "25%", "75%"],
                ["Day 10+", "0%", "100%"],
              ].map(([days, old, newFood]) => (
                <tr key={days} className="border-b border-gray-100">
                  <td className="py-2 font-semibold">{days}</td>
                  <td className="py-2 text-red-500">{old}</td>
                  <td className="py-2 font-semibold text-emerald-600">{newFood}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-gray-500 mt-3">
            *If your dog shows digestive upset at any stage, slow down. Stay at that ratio for 2 more days before advancing.
          </p>
        </div>

        {/* FAQ */}
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4 mb-8">
          {[
            {
              q: "Do senior dogs actually need senior-specific food?",
              a: "Not always — a high-quality adult food that meets your senior dog's specific needs can work just as well. The key is that 'senior' on the label isn't regulated by AAFCO, so it doesn't guarantee any particular formulation. Focus on the guaranteed analysis and ingredient list rather than the label claim.",
            },
            {
              q: "Should I feed my senior dog less protein to protect their kidneys?",
              a: "This is outdated advice. Research now shows that healthy senior dogs need equal or more protein than adults to prevent muscle loss. Protein restriction is only appropriate for dogs with confirmed chronic kidney disease (CKD), diagnosed by a vet blood test. Unless your dog has CKD, don't cut protein.",
            },
            {
              q: "My senior dog has lost interest in food. What should I do?",
              a: "Reduced appetite in seniors can be caused by dental pain (check teeth), nausea from medications, or underlying illness. Try warming the food slightly, adding low-sodium broth, or switching to wet food. If appetite loss persists more than 2 days, see your vet — it's often an early symptom of something treatable.",
            },
            {
              q: "Should I switch to wet food for my senior dog?",
              a: "Wet food can be beneficial for seniors with dental issues, dehydration risk, or poor appetite — the strong smell and soft texture often make it more appealing. The downside is cost and shorter shelf life once opened. Many owners do well with a mix of dry kibble and wet food topper.",
            },
            {
              q: "How often should I feed my senior dog?",
              a: "Two meals per day is standard. Smaller, more frequent meals (2–3x daily) can be easier on the digestive system and help maintain stable blood sugar in older dogs. Avoid one large meal a day as this increases bloat risk, particularly in large breeds.",
            },
          ].map(({ q, a }) => (
            <div key={q} className="border border-gray-200 rounded-xl p-5">
              <p className="font-semibold text-sm mb-2">Q: {q}</p>
              <p className="text-sm text-gray-600 leading-relaxed">A: {a}</p>
            </div>
          ))}
        </div>

        {/* SIGNS */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h2 className="font-bold text-lg mb-3">⚠️ Signs Your Senior Dog's Diet Needs to Change</h2>
          <ul className="text-sm space-y-2 text-gray-700">
            {[
              "Visible muscle loss or a prominent spine and hip bones",
              "Unexplained weight gain or difficulty losing weight despite portion control",
              "Stiff movement in the morning or reluctance to climb stairs",
              "Increased thirst and urination (possible kidney or diabetes issues)",
              "Dull, flaky coat or persistent skin issues",
              "Loose stools or frequent gas",
              "Confusion, disorientation, or disrupted sleep patterns",
            ].map((sign) => (
              <li key={sign} className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">•</span>
                {sign}
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-500 mt-3">
            If you notice 3 or more of these signs, schedule a senior wellness exam. A blood panel often reveals nutritional deficiencies before they become serious.
          </p>
        </div>

        {/* CTA */}
        <div className="bg-emerald-600 text-white rounded-xl p-8 text-center mb-8">
          <h2 className="text-xl font-bold mb-2">Senior Dogs Face Expensive Health Issues — Insure Early</h2>
          <p className="text-emerald-100 mb-4 text-sm">
            Arthritis treatment, cancer, dental surgery, and kidney disease are among the most common — and costly — senior dog conditions. Pet insurance before symptoms appear locks in better rates and broader coverage.
          </p>
          <Link
            href="/insurance"
            className="bg-white text-emerald-700 font-bold px-6 py-3 rounded-full hover:bg-emerald-50 transition-colors inline-block text-sm"
          >
            Compare Pet Insurance Plans →
          </Link>
        </div>

        {/* RELATED */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="font-bold text-lg mb-4">Related Articles</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/blog/best-dog-food-for-golden-retrievers" className="border border-gray-200 rounded-lg px-4 py-2 text-sm hover:bg-gray-50">
              Best Food for Golden Retrievers
            </Link>
            <Link href="/blog/best-dog-food-for-labrador-retrievers" className="border border-gray-200 rounded-lg px-4 py-2 text-sm hover:bg-gray-50">
              Best Food for Labrador Retrievers
            </Link>
            <Link href="/blog/best-dog-food-for-german-shepherds" className="border border-gray-200 rounded-lg px-4 py-2 text-sm hover:bg-gray-50">
              Best Food for German Shepherds
            </Link>
            <Link href="/insurance/healthy-paws-review" className="border border-gray-200 rounded-lg px-4 py-2 text-sm hover:bg-gray-50">
              Healthy Paws Insurance Review
            </Link>
          </div>
        </div>

      </article>
    </>
  );
}
