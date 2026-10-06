import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Script from "next/script";
import { Cinzel } from "next/font/google";
import MobileNav from "./components/MobileNav";

const inter = Inter({ subsets: ["latin"] });
// Display face for the Pet Natal Chart brand moments; exposed as a CSS variable so any page can use it.
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "MyPawAdvisor – Honest Pet Product Reviews",
    template: "%s | MyPawAdvisor",
  },
  description:
    "Honest, hands-on reviews of the best pet products on Amazon. Dog toys, grooming tools, beds, feeders, and more — tested so you can buy with confidence.",
  keywords: ["best pet products", "amazon dog toys", "pet product reviews", "best dog bed", "cat toy reviews"],
  metadataBase: new URL("https://www.mypawadvisor.com"),
  openGraph: {
    siteName: "MyPawAdvisor",
    type: "website",
    locale: "en_US",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "MyPawAdvisor – honest, hands-on pet product reviews" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "https://www.mypawadvisor.com/feed.xml",
    },
  },
};

const navLinks = [
  { href: "/reviews", label: "Reviews" },
  { href: "/dogs", label: "Dogs" },
  { href: "/cats", label: "Cats" },
  { href: "/blog", label: "Blog" },
  { href: "/books", label: "Books" },
  { href: "/insurance", label: "Insurance" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cinzel.variable}>
      <body className={`${inter.className} bg-white text-gray-900 antialiased`}>
        {/* Google Analytics 4 — loaded after hydration so it never blocks first paint */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-4CKF73GJ6Z" strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-4CKF73GJ6Z');
        `}</Script>

        {/* TOP BAR */}
        <div className="bg-emerald-700 text-white text-xs py-2 px-4 text-center">
          ✅ All products tested &nbsp;·&nbsp; 🔒 Honest affiliate disclosure on every page &nbsp;·&nbsp; 🐾 Written by pet owners
        </div>

        {/* HEADER */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-6">
            <Link href="/" className="flex items-center gap-2 font-extrabold text-xl text-gray-900 hover:text-emerald-600 transition-colors shrink-0">
              🐾 <span>MyPawAdvisor</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-emerald-600 transition-colors">
                  {link.label}
                </Link>
              ))}
              {/* New: Pet Natal Chart — distinguished with cosmic color, display font + a soft sparkle */}
              <Link
                href="/natal-chart"
                className="group relative inline-flex items-center gap-1.5 font-semibold tracking-wide transition-transform duration-200 hover:-translate-y-0.5"
                style={{ fontFamily: "var(--font-cinzel), Georgia, serif" }}
              >
                <span className="text-amber-400 animate-pulse [animation-duration:2.4s] group-hover:text-amber-300">✦</span>
                <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-500 bg-clip-text text-transparent transition-[filter] group-hover:[filter:brightness(1.15)]">
                  Natal Chart
                </span>
              </Link>
            </nav>
            <Link
              href="/insurance"
              className="hidden md:inline-block bg-emerald-600 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-emerald-700 transition-colors shrink-0"
            >
              Free Quote
            </Link>
            <MobileNav links={navLinks} />
          </div>
        </header>

        <main>{children}</main>

        {/* FOOTER */}
        <footer className="bg-gray-950 text-gray-400">
          <div className="max-w-6xl mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-white font-extrabold text-lg mb-3">🐾 MyPawAdvisor</p>
              <p className="text-sm leading-relaxed">Helping pet owners find the best products since 2024. We test everything so you buy the right thing the first time.</p>
            </div>
            <div>
              <p className="text-white font-semibold mb-3">Dog Reviews</p>
              <ul className="space-y-2 text-sm">
                <li><Link href="/reviews/kong-classic-dog-toy" className="hover:text-white transition-colors">KONG Classic Dog Toy</Link></li>
                <li><Link href="/reviews/furminator-deshedding-tool" className="hover:text-white transition-colors">FURminator Review</Link></li>
                <li><Link href="/reviews/petfusion-ultimate-dog-bed" className="hover:text-white transition-colors">PetFusion Dog Bed</Link></li>
                <li><Link href="/reviews/thundershirt-dog-anxiety-jacket" className="hover:text-white transition-colors">ThunderShirt Review</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-white font-semibold mb-3">More Reviews</p>
              <ul className="space-y-2 text-sm">
                <li><Link href="/reviews/cat-dancer-interactive-toy" className="hover:text-white transition-colors">Cat Dancer Toy</Link></li>
                <li><Link href="/reviews/outward-hound-slow-feeder" className="hover:text-white transition-colors">Outward Hound Slow Bowl</Link></li>
                <li><Link href="/reviews/rocco-roxie-stain-eliminator" className="hover:text-white transition-colors">Rocco &amp; Roxie Cleaner</Link></li>
                <li><Link href="/reviews" className="hover:text-white transition-colors">All Reviews →</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-white font-semibold mb-3">Resources</p>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/natal-chart" className="inline-flex items-center gap-1.5 group" style={{ fontFamily: "var(--font-cinzel), Georgia, serif" }}>
                    <span className="text-amber-400 group-hover:text-amber-300 transition-colors">✦</span>
                    <span className="bg-gradient-to-r from-violet-400 to-amber-300 bg-clip-text text-transparent group-hover:[filter:brightness(1.15)] transition-[filter]">Pet Natal Chart</span>
                  </Link>
                </li>
                <li><Link href="/natal-chart/guide" className="text-violet-300/80 hover:text-violet-200 transition-colors">Natal Chart Guide</Link></li>
                <li><Link href="/insurance" className="hover:text-white transition-colors">Pet Insurance 2026</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Pet Care Blog</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/insurance/healthy-paws-review" className="hover:text-white transition-colors">Healthy Paws Review</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 text-center text-xs py-5 px-4 text-gray-600">
            <p>© 2026 MyPawAdvisor. As an Amazon Associate, MyPawAdvisor earns from qualifying purchases. This site contains affiliate links, and we may earn a commission at no extra cost to you. <Link href="/about" className="underline hover:text-gray-400">Full disclosure</Link> · <Link href="/privacy" className="underline hover:text-gray-400">Privacy Policy</Link>.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
