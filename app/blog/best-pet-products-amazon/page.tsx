import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Pet Products on Amazon 2026 – Top Picks for Dogs & Cats",
  description:
    "Our editors picked the best-rated pet products on Amazon in 2026. Top toys, grooming tools, beds, slow feeders, and odor eliminators for dogs and cats — all with thousands of reviews.",
  keywords: ["best pet products amazon", "amazon dog products", "amazon cat products", "best dog toys amazon", "best pet accessories 2026"],
};

const TAG = "pawadvisor-20";
const amz = (query: string) =>
  `https://www.amazon.com/s?k=${encodeURIComponent(query)}&tag=${TAG}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Best Pet Products on Amazon 2026",
  author: { "@type": "Organization", name: "MyPawAdvisor" },
  datePublished: "2026-04-08",
};

const picks = [
  {
    rank: 1,
    name: "KONG Classic Dog Toy",
    badge: "Best Dog Toy",
    badgeColor: "bg-amber-100 text-amber-700",
    category: "Dog Toys",
    rating: 4.8,
    reviewCount: "82,000+",
    price: "$~13",
    description:
      "The all-time best-selling dog toy on Amazon — and for good reason. Stuff it with peanut butter or kibble to keep dogs mentally engaged for hours. Natural rubber survives even aggressive chewers. Dishwasher safe.",
    pros: ["Indestructible natural rubber", "Treats can be stuffed inside", "Vet recommended", "Works for all dog sizes"],
    cons: ["Needs to be re-stuffed manually", "Not for truly extreme chewers (use KONG Extreme instead)"],
    href: amz("KONG Classic Dog Toy"),
    emoji: "🐶",
  },
  {
    rank: 2,
    name: "FURminator deShedding Tool for Dogs",
    badge: "Best Grooming Tool",
    badgeColor: "bg-blue-100 text-blue-700",
    category: "Grooming",
    rating: 4.7,
    reviewCount: "55,000+",
    price: "$~30–$65",
    description:
      "Reduces shedding by up to 90% with just a few minutes of brushing per week. The stainless steel edge reaches through the topcoat to remove loose undercoat hair without cutting the skin. Works on short and long-haired dogs.",
    pros: ["Up to 90% less shedding", "Works on all coat types", "Ergonomic handle", "FURejector button cleans blade instantly"],
    cons: ["Pricier than basic brushes", "Can over-brush if used too frequently"],
    href: amz("FURminator deShedding Tool Dog"),
    emoji: "✂️",
  },
  {
    rank: 3,
    name: "Rocco & Roxie Stain & Odor Eliminator",
    badge: "Best Odor Remover",
    badgeColor: "bg-green-100 text-green-700",
    category: "Home & Cleaning",
    rating: 4.5,
    reviewCount: "110,000+",
    price: "$~20",
    description:
      "Enzyme-activated formula permanently breaks down pet stains and odors at the molecular level — not just masks them. Works on carpet, hardwood, tile, and upholstery. Certified safe for pets and kids after drying.",
    pros: ["Enzymatic formula (permanently removes odor)", "Works on old and new stains", "Safe for all surfaces", "Chlorine-free"],
    cons: ["Needs 10–15 min dwell time for best results", "Slightly strong smell while wet"],
    href: amz("Rocco Roxie Stain Odor Eliminator"),
    emoji: "🧹",
  },
  {
    rank: 4,
    name: "Outward Hound Fun Feeder Slow Bowl",
    badge: "Best for Gulpers",
    badgeColor: "bg-orange-100 text-orange-700",
    category: "Feeding",
    rating: 4.6,
    reviewCount: "48,000+",
    price: "$~12",
    description:
      "Maze-patterned ridges force dogs to eat 10x slower, reducing bloat, regurgitation, and obesity risk. Especially important for deep-chested breeds like German Shepherds and Golden Retrievers. Dishwasher safe.",
    pros: ["Slows eating by 10x", "Reduces bloat risk", "BPA, PVC, and phthalate-free", "Multiple sizes available"],
    cons: ["Some dogs figure out workarounds", "Harder to clean in grooves"],
    href: amz("Outward Hound Fun Feeder Slow Bowl Dog"),
    emoji: "🥣",
  },
  {
    rank: 5,
    name: "Thundershirt Classic Dog Anxiety Jacket",
    badge: "Best for Anxiety",
    badgeColor: "bg-purple-100 text-purple-700",
    category: "Health & Wellness",
    rating: 4.4,
    reviewCount: "35,000+",
    price: "$~45",
    description:
      "Applies gentle, constant pressure to calm anxiety and fear in 80% of dogs according to customer surveys. Especially effective for thunderstorms, fireworks, separation anxiety, and vet visits. No medication needed.",
    pros: ["~80% effectiveness rate reported", "Drug-free solution", "Machine washable", "Vet recommended"],
    cons: ["Doesn't work for every dog", "Sizing can be tricky"],
    href: amz("Thundershirt Classic Dog Anxiety Jacket"),
    emoji: "🌩️",
  },
  {
    rank: 6,
    name: "PetFusion Ultimate Dog Bed",
    badge: "Best Dog Bed",
    badgeColor: "bg-rose-100 text-rose-700",
    category: "Beds & Comfort",
    rating: 4.6,
    reviewCount: "27,000+",
    price: "$~90–$150",
    description:
      "4-inch solid memory foam base supports joints and relieves pressure — critical for large breeds prone to hip and elbow dysplasia. Water-resistant liner, machine-washable cover, and bolstered edges for dogs who love to rest their head.",
    pros: ["4\" CertiPUR-US certified foam", "Orthopedic joint support", "Machine-washable cover", "Water-resistant inner liner"],
    cons: ["Premium price", "Large sizes take up significant space"],
    href: amz("PetFusion Ultimate Dog Bed Memory Foam"),
    emoji: "🛏️",
  },
  {
    rank: 7,
    name: "Arm & Hammer Dog Dental Care Kit",
    badge: "Best Dental Kit",
    badgeColor: "bg-cyan-100 text-cyan-700",
    category: "Dental Health",
    rating: 4.5,
    reviewCount: "22,000+",
    price: "$~10",
    description:
      "Complete dental kit with enzymatic toothpaste (baking soda formula), a dual-headed toothbrush, and a finger brush. Baking soda neutralizes odor-causing bacteria. Vet-recommended brushing 2–3x per week prevents costly dental cleanings.",
    pros: ["Enzymatic toothpaste", "Includes multiple brush types", "Baking soda fights bacteria naturally", "Affordable complete kit"],
    cons: ["Takes patience to train dogs", "Some dogs dislike the taste initially"],
    href: amz("Arm Hammer Dog Dental Care Kit toothbrush toothpaste"),
    emoji: "🦷",
  },
  {
    rank: 8,
    name: "Cat Dancer Interactive Cat Toy",
    badge: "Best Cat Toy",
    badgeColor: "bg-pink-100 text-pink-700",
    category: "Cat Toys",
    rating: 4.5,
    reviewCount: "42,000+",
    price: "$~4",
    description:
      "Deceptively simple — a flexible steel wire with small cardboard rolls that mimic the erratic movement of insects. Cats go absolutely crazy for it. Made in the USA. The bestselling cat toy on Amazon for over a decade.",
    pros: ["Irresistible to nearly all cats", "Under $5", "Made in USA", "Encourages natural hunting instinct"],
    cons: ["Interactive — requires owner participation", "Cardboard tips wear out over time"],
    href: amz("Cat Dancer Interactive Cat Toy"),
    emoji: "🐱",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-amber-400 text-sm">
      {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
      <span className="text-gray-500 ml-1">{rating.toFixed(1)}</span>
    </span>
  );
}

export default function BestPetProductsAmazonPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-4xl mx-auto px-4 pt-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-emerald-600">Home</Link> {" / "}
        <Link href="/blog" className="hover:text-emerald-600">Blog</Link> {" / "}
        <span>Best Pet Products on Amazon 2026</span>
      </div>

      <article className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full">Amazon Picks</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-3 mb-3 leading-tight">
            Best Pet Products on Amazon in 2026
          </h1>
          <p className="text-gray-600 text-lg mb-4">
            With millions of pet products on Amazon, finding the ones worth buying is overwhelming. We filtered through thousands of reviews to pick the 8 best across toys, grooming, cleaning, feeding, and comfort — for both dogs and cats.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
            <span>📅 April 8, 2026</span>
            <span>⏱️ 6 min read</span>
            <span>✅ Expert reviewed</span>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-2xl">🐾</div>
            <div>
              <p className="font-semibold text-sm">Reviewed by the MyPawAdvisor Editorial Team</p>
              <p className="text-xs text-gray-500">Selected based on review count, ratings, and long-term owner satisfaction across 20,000+ reviews per product.</p>
            </div>
          </div>
        </header>

        {/* QUICK ANSWER BOX */}
        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-6 mb-8">
          <h2 className="font-bold text-lg mb-3">🏆 Quick Answer: Best Pet Products on Amazon</h2>
          <ul className="text-sm space-y-1 text-gray-700">
            <li><strong>Best Dog Toy:</strong> KONG Classic — stuffable, indestructible, vet-approved</li>
            <li><strong>Best Grooming:</strong> FURminator deShedding Tool — 90% less shedding</li>
            <li><strong>Best Cleaner:</strong> Rocco &amp; Roxie Stain &amp; Odor Eliminator — enzymatic, 110K+ reviews</li>
            <li><strong>Best Slow Feeder:</strong> Outward Hound Fun Feeder — reduces bloat risk</li>
            <li><strong>Best for Anxiety:</strong> Thundershirt — drug-free, 80% effective</li>
            <li><strong>Best Dog Bed:</strong> PetFusion Ultimate — orthopedic memory foam</li>
            <li><strong>Best Dental:</strong> Arm &amp; Hammer Dental Kit — enzymatic, vet-recommended</li>
            <li><strong>Best Cat Toy:</strong> Cat Dancer — bestselling cat toy on Amazon for 10+ years</li>
          </ul>
        </div>

        {/* AFFILIATE DISCLOSURE */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8 text-xs text-gray-600">
          <strong>Disclosure:</strong> Links on this page are Amazon affiliate links. If you purchase through them, we earn a small commission at no extra cost to you. This does not influence our picks — all products are selected on merit.
        </div>

        {/* PRODUCT CARDS */}
        <div className="space-y-6 mb-8">
          {picks.map((pick) => (
            <div key={pick.name} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-gray-50 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{pick.emoji}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-gray-400 text-sm">#{pick.rank}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${pick.badgeColor}`}>{pick.badge}</span>
                      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">{pick.category}</span>
                    </div>
                    <h3 className="font-bold text-lg leading-tight">{pick.name}</h3>
                  </div>
                </div>
                <div className="text-right">
                  <StarRating rating={pick.rating} />
                  <p className="text-xs text-gray-400 mt-0.5">{pick.reviewCount} reviews</p>
                  <p className="text-sm font-bold text-emerald-600 mt-0.5">{pick.price}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">{pick.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
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
                  href={pick.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-amber-500 text-white font-semibold px-5 py-2 rounded-full text-sm hover:bg-amber-600 transition-colors"
                >
                  Check Price on Amazon →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* BUYING TIPS */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">How We Chose These Products</h2>
          <div className="space-y-3 text-sm text-gray-700">
            <p><strong>20,000+ reviews minimum.</strong> We only considered products with enough reviews to filter out outliers and fake ratings.</p>
            <p><strong>4.4 stars or higher.</strong> With thousands of reviews, a 4.4+ rating reflects genuine long-term satisfaction.</p>
            <p><strong>Repeat purchases matter.</strong> Products with high "subscribe & save" rates or "bought again" signals show pets actually use and love them.</p>
            <p><strong>Vet or expert endorsements preferred.</strong> Where available, we prioritized products that veterinarians actively recommend.</p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-emerald-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold mb-2">Don't Forget to Protect Your Pet</h2>
          <p className="text-emerald-100 mb-4 text-sm">Great gear is just the start. Pet insurance covers the unexpected — vet bills, surgeries, emergencies.</p>
          <Link href="/insurance" className="bg-white text-emerald-700 font-bold px-6 py-3 rounded-full hover:bg-emerald-50 transition-colors inline-block text-sm">
            Compare Pet Insurance Plans →
          </Link>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-8">
          <h3 className="font-bold text-lg mb-4">Related Articles</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/blog/best-dog-food-for-golden-retrievers" className="border border-gray-200 rounded-lg px-4 py-2 text-sm hover:bg-gray-50">Best Food for Golden Retrievers</Link>
            <Link href="/blog/best-cat-food" className="border border-gray-200 rounded-lg px-4 py-2 text-sm hover:bg-gray-50">Best Cat Food 2026</Link>
            <Link href="/insurance" className="border border-gray-200 rounded-lg px-4 py-2 text-sm hover:bg-gray-50">Best Pet Insurance 2026</Link>
          </div>
        </div>
      </article>
    </>
  );
}
