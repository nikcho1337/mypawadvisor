import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pet Care Blog – Tips, Reviews & Buying Guides | MyPawAdvisor",
  description:
    "Expert pet care advice, product reviews, and buying guides for dog and cat owners. New articles weekly.",
};

const posts = [
  {
    slug: "best-pet-products-amazon",
    title: "Best Pet Products on Amazon in 2026 – Top 8 Picks",
    excerpt: "We filtered through millions of Amazon reviews to find the 8 best pet products for dogs and cats — toys, grooming tools, beds, slow feeders, odor eliminators, and more.",
    category: "Amazon Picks",
    readTime: "6 min read",
    date: "April 8, 2026",
  },
  {
    slug: "best-dog-food-for-golden-retrievers",
    title: "Best Dog Food for Golden Retrievers in 2026 (Vet-Approved)",
    excerpt: "Golden Retrievers are prone to heart disease, hip dysplasia, and obesity. We reviewed 18 formulas to find the best foods that actively address these health concerns.",
    category: "Dog Food",
    readTime: "8 min read",
    date: "January 20, 2026",
  },
  {
    slug: "best-dog-food-for-german-shepherds",
    title: "Best Dog Food for German Shepherds in 2026 (Expert Picks)",
    excerpt: "German Shepherds have sensitive digestive systems and are predisposed to hip dysplasia. The right diet addresses these vulnerabilities directly. We reviewed 20 formulas.",
    category: "Dog Food",
    readTime: "7 min read",
    date: "January 18, 2026",
  },
  {
    slug: "best-cat-food",
    title: "Best Cat Food in 2026: Top Picks for Every Cat",
    excerpt: "Cats are obligate carnivores that need high-protein, meat-based diets. We reviewed 25+ wet and dry brands to find foods that actually meet your cat's nutritional needs.",
    category: "Cat Food",
    readTime: "8 min read",
    date: "January 15, 2026",
  },
  {
    slug: "best-dog-food-for-french-bulldogs",
    title: "Best Dog Food for French Bulldogs in 2026 (Vet-Approved Picks)",
    excerpt: "French Bulldogs have unique dietary needs due to their flat faces, sensitive stomachs, and tendency to gain weight. We reviewed 15 formulas to find the best options.",
    category: "Dog Food",
    readTime: "7 min read",
    date: "January 10, 2026",
  },
  {
    slug: "pet-insurance-worth-it",
    title: "Is Pet Insurance Actually Worth It? Honest Analysis for 2026",
    excerpt: "We crunched the numbers on average vet costs vs. insurance premiums across 5 years of data. Here's what we found — including when insurance doesn't make sense.",
    category: "Pet Insurance",
    readTime: "9 min read",
    date: "January 5, 2026",
  },
];

const categoryColors: Record<string, string> = {
  "Amazon Picks": "bg-orange-100 text-orange-700",
  "Dog Food": "bg-amber-100 text-amber-700",
  "Cat Food": "bg-purple-100 text-purple-700",
  "Pet Insurance": "bg-emerald-100 text-emerald-700",
};

export default function BlogPage() {
  return (
    <>
      <section className="bg-gray-800 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-3">MyPawAdvisor Blog</h1>
          <p className="text-gray-300">Expert pet care advice for dog and cat owners. Updated weekly.</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${categoryColors[post.category] ?? "bg-gray-100 text-gray-700"}`}>
                  {post.category}
                </span>
                <span className="text-xs text-gray-400">{post.date}</span>
                <span className="text-xs text-gray-400">{post.readTime}</span>
              </div>
              <h2 className="text-xl font-bold mb-2 hover:text-emerald-600 transition-colors">{post.title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
