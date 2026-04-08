import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pet Care Blog – Tips, Reviews & Buying Guides",
  description:
    "Expert pet care advice, product reviews, and buying guides for dog and cat owners. New articles weekly.",
};

const posts = [
  {
    slug: "best-dog-food-for-french-bulldogs",
    title: "Best Dog Food for French Bulldogs in 2024 (Vet-Approved Picks)",
    excerpt: "French Bulldogs have unique dietary needs due to their flat faces, sensitive stomachs, and tendency to gain weight. We reviewed 15 formulas to find the best options.",
    category: "Dog Food",
    readTime: "7 min read",
    date: "April 3, 2024",
  },
  {
    slug: "pet-insurance-worth-it",
    title: "Is Pet Insurance Actually Worth It? Honest Analysis for 2024",
    excerpt: "We crunched the numbers on average vet costs vs. insurance premiums across 5 years of data. Here's what we found — including when insurance doesn't make sense.",
    category: "Pet Insurance",
    readTime: "9 min read",
    date: "March 28, 2024",
  },
];

export default function BlogPage() {
  return (
    <>
      <section className="bg-gray-800 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-3">PawsGuide Blog</h1>
          <p className="text-gray-300">Expert advice for dog and cat owners. Updated weekly.</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">{post.category}</span>
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
