import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "MyPawAdvisor – Honest Pet Product Reviews & Buying Guides",
    template: "%s | MyPawAdvisor",
  },
  description:
    "MyPawAdvisor helps pet owners find the best food, insurance, supplements, and gear for dogs and cats. Expert reviews, breed guides, and unbiased comparisons.",
  keywords: ["pet products", "dog food reviews", "pet insurance", "cat food", "best dog food by breed"],
  metadataBase: new URL("https://mypawadvisor.com"),
  openGraph: {
    siteName: "PawsGuide",
    type: "website",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-800`}>
        {/* TRUST BAR */}
        <div className="bg-emerald-700 text-emerald-100 text-xs py-1.5 px-4 text-center">
          ✅ Expert-reviewed content &nbsp;|&nbsp; 🐾 Written by pet owners, for pet owners &nbsp;|&nbsp; 🔒 Affiliate disclosure on every page
        </div>

        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-emerald-600">
              🐾 MyPawAdvisor
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link href="/dogs" className="hover:text-emerald-600 transition-colors">Dogs</Link>
              <Link href="/cats" className="hover:text-emerald-600 transition-colors">Cats</Link>
              <Link href="/insurance" className="hover:text-emerald-600 transition-colors">Pet Insurance</Link>
              <Link href="/blog" className="hover:text-emerald-600 transition-colors">Blog</Link>
            </nav>
            <Link href="/insurance" className="bg-emerald-600 text-white text-sm px-4 py-2 rounded-full hover:bg-emerald-700 transition-colors">
              Free Quote
            </Link>
          </div>
        </header>

        <main>{children}</main>

        <footer className="bg-gray-900 text-gray-400 mt-16">
          <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <p className="text-white font-bold text-lg mb-2">🐾 MyPawAdvisor</p>
              <p className="text-sm">Helping pet owners make smarter decisions since 2024.</p>
            </div>
            <div>
              <p className="text-white font-semibold mb-3">Dogs</p>
              <ul className="space-y-1 text-sm">
                <li><Link href="/dogs" className="hover:text-white transition-colors">Dog Food Reviews</Link></li>
                <li><Link href="/dogs/best-dog-food-by-breed" className="hover:text-white transition-colors">Best Food by Breed</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-white font-semibold mb-3">Insurance</p>
              <ul className="space-y-1 text-sm">
                <li><Link href="/insurance" className="hover:text-white transition-colors">Best Pet Insurance 2026</Link></li>
                <li><Link href="/insurance/healthy-paws-review" className="hover:text-white transition-colors">Healthy Paws Review</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-white font-semibold mb-3">Resources</p>
              <ul className="space-y-1 text-sm">
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 text-center text-xs py-4 px-4">
            <p>© 2026 MyPawAdvisor. This site contains affiliate links. We may earn a commission at no extra cost to you.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
