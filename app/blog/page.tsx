import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts as posts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Pet Care Blog – Tips, Reviews & Buying Guides",
  description:
    "Expert pet care advice, product reviews, and buying guides for dog and cat owners. New articles weekly.",
  alternates: { canonical: "/blog" },
};


const categoryColors: Record<string, string> = {
  "Amazon Picks": "bg-orange-100 text-orange-700",
  "Dog Food": "bg-amber-100 text-amber-700",
  "Dog Grooming": "bg-sky-100 text-sky-700",
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
