import Link from "next/link";
import { products, getFeaturedProducts } from "@/lib/products";

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-amber-400 text-sm">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= Math.floor(rating) ? "text-amber-400" : "text-gray-300"}>★</span>
      ))}
      <span className="text-gray-500 ml-1">{rating.toFixed(1)}</span>
    </span>
  );
}

export default function HomePage() {
  const featured = getFeaturedProducts();
  const allProducts = products;

  return (
    <>
      {/* HERO */}
      <section className="bg-gray-950 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-center md:text-left">
            <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-4">
              Honest Pet Product Reviews
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5">
              We test it.<br />
              <span className="text-emerald-400">You buy the best.</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-lg">
              Every review on MyPawAdvisor is based on real hands-on testing with real pets. No sponsored rankings. No guessing. Just honest picks from the best-selling products on Amazon.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Link
                href="/reviews"
                className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-6 py-3 rounded-full transition-colors"
              >
                Browse All Reviews
              </Link>
              <Link
                href="/insurance"
                className="border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white font-semibold px-6 py-3 rounded-full transition-colors"
              >
                Pet Insurance Guide
              </Link>
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="grid grid-cols-2 gap-3 w-64">
              {[
                { emoji: "🐕", stat: "12", label: "Products Tested" },
                { emoji: "⭐", stat: "4.6", label: "Avg Rating" },
                { emoji: "📝", stat: "10K+", label: "Reviews Read" },
                { emoji: "✅", stat: "100%", label: "Honest Picks" },
              ].map((item) => (
                <div key={item.label} className="bg-gray-800 rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-1">{item.emoji}</div>
                  <div className="text-xl font-extrabold text-white">{item.stat}</div>
                  <div className="text-xs text-gray-400">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ULTRA K9 PRO FUNNEL BANNER */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 border-y border-amber-200 py-12 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0 flex justify-center">
            <div className="relative">
              <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10 animate-pulse">
                #1 PICK
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://ultrak9pro.com/statics/img/tsl-pin.png"
                alt="Ultra K9 Pro primal nutrient drops for dogs"
                className="h-52 w-auto object-contain drop-shadow-lg"
              />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <p className="text-amber-600 font-bold text-xs uppercase tracking-widest mb-2">Editor's Top Pick — Dog Health & Longevity</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 leading-tight">
              Turn Your Dog Back Into the Fierce, Healthy Animal They Were Born to Be
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4 max-w-lg">
              <strong>UltraK9 Pro</strong> contains a spectrum of primal nutrients that clear your dog's body of toxins, strengthen their liver, kidneys, and thyroid, and fight the GMOs, preservatives, and allergens hidden in commercial food. Better digestion, less inflammation, healthier joints — and years added back to their life.
            </p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-5">
              {[
                "✓ Joint & tendon relief",
                "✓ Digestive health",
                "✓ Fur & skin care",
                "✓ Oral health",
                "✓ Detox support",
                "✓ 60-day guarantee",
              ].map((b) => (
                <span key={b} className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">{b}</span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <a
                href="https://ultrak9pro.com/video.php?hop=pawadvisor&hopId=de50071c-c884-44a7-997b-daa7213ded87"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-500 hover:bg-amber-400 text-white font-bold px-6 py-3 rounded-full transition-colors text-sm text-center"
              >
                Check Official Price →
              </a>
              <Link
                href="/reviews/ultra-k9-pro-review"
                className="border border-gray-300 hover:border-amber-400 text-gray-700 hover:text-amber-700 font-semibold px-6 py-3 rounded-full transition-colors text-sm text-center"
              >
                Read Our Full Review
              </Link>
            </div>
            <p className="text-xs text-gray-400 mt-3">Affiliate link — we earn a commission at no extra cost to you</p>
          </div>
        </div>
      </section>

      {/* CATEGORY QUICK NAV */}
      <section className="bg-gray-950 py-4 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap justify-center gap-1.5 mb-1.5">
            {[
              { href: "/reviews", label: "All Reviews" },
              { href: "/reviews/kong-classic-dog-toy", label: "Dog Toys" },
              { href: "/reviews/furminator-deshedding-tool", label: "Grooming" },
              { href: "/reviews/petfusion-ultimate-dog-bed", label: "Dog Beds" },
              { href: "/reviews/outward-hound-slow-feeder", label: "Feeding" },
            ].map((cat) => (
              <Link key={cat.href} href={cat.href}
                className="px-4 py-1.5 bg-gray-800 hover:bg-emerald-500 text-gray-300 hover:text-white rounded text-xs font-semibold uppercase tracking-wide transition-all">
                {cat.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-1.5">
            {[
              { href: "/reviews/cat-dancer-interactive-toy", label: "Cat Toys" },
              { href: "/reviews/rocco-roxie-stain-eliminator", label: "Cleaning" },
              { href: "/reviews/rabbitgoo-no-pull-dog-harness", label: "Harnesses" },
              { href: "/reviews/midwest-icrate-dog-crate", label: "Crates" },
              { href: "/insurance", label: "Insurance" },
            ].map((cat) => (
              <Link key={cat.href} href={cat.href}
                className="px-4 py-1.5 bg-gray-800 hover:bg-emerald-500 text-gray-300 hover:text-white rounded text-xs font-semibold uppercase tracking-wide transition-all">
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED REVIEWS */}
      <section className="max-w-5xl mx-auto px-4 py-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wider mb-1">Editor's Picks</p>
            <h2 className="text-3xl font-extrabold text-gray-900">Top Picks This Month</h2>
          </div>
          <Link href="/reviews" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 hidden md:block">
            View all reviews →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((product) => (
            <Link
              key={product.slug}
              href={`/reviews/${product.slug}`}
              className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.heroImage}
                  alt={product.heroImageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${product.badgeColor}`}>
                    {product.badge}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-bold text-sm leading-tight drop-shadow">{product.name}</p>
                </div>
              </div>
              <div className="p-4">
                <StarRating rating={product.rating} />
                <p className="text-xs text-gray-400 mt-0.5 mb-3">{product.reviewCount} Amazon reviews</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900">{product.price}</span>
                  <span className="text-xs font-semibold text-emerald-600">Review →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ALL PRODUCTS GRID */}
      <section className="bg-gray-50 py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-gray-500 font-semibold text-sm uppercase tracking-wider mb-1">All Tested Products</p>
              <h2 className="text-3xl font-extrabold text-gray-900">Every Review We've Written</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {allProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/reviews/${product.slug}`}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all flex"
              >
                <div className="w-28 h-28 shrink-0 bg-gray-100 overflow-hidden flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.heroImage}
                    alt={product.heroImageAlt}
                    className="w-full h-full object-contain p-1"
                  />
                </div>
                <div className="p-4 flex-1 min-w-0">
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${product.badgeColor}`}>
                    {product.badge}
                  </span>
                  <h3 className="font-bold text-sm text-gray-900 leading-snug mt-1.5 mb-1 group-hover:text-emerald-600 transition-colors">
                    {product.name}
                  </h3>
                  <StarRating rating={product.rating} />
                  <p className="text-xs text-gray-500 mt-1">{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY TRUST US */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Why Pet Owners Trust Us</h2>
          <p className="text-gray-500 max-w-xl mx-auto">We're pet owners first. Every product is tested with real animals, not just read about online.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: "🔬", title: "Real Hands-On Testing", desc: "We physically test every product we recommend — often for months — before publishing a review." },
            { icon: "💬", title: "10,000+ Reviews Analyzed", desc: "We read through thousands of Amazon reviews per product to surface patterns and real-world issues." },
            { icon: "🐾", title: "Vet-Informed Content", desc: "Our recommendations align with veterinary nutritional and behavioral science guidelines." },
          ].map((item) => (
            <div key={item.title} className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INSURANCE CTA */}
      <section className="bg-emerald-600 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-3">Don't Forget to Protect Your Pet</h2>
          <p className="text-emerald-100 text-lg mb-8 max-w-xl mx-auto">
            The right product keeps your pet happy. Pet insurance keeps them healthy when the unexpected happens. Compare top plans — free, in 60 seconds.
          </p>
          <Link
            href="/insurance"
            className="inline-block bg-white text-emerald-700 font-bold px-8 py-4 rounded-full hover:bg-emerald-50 transition-colors text-base"
          >
            Compare Pet Insurance Plans →
          </Link>
        </div>
      </section>

      {/* RECENT BLOG */}
      <section className="max-w-5xl mx-auto px-4 py-14">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-2xl font-extrabold text-gray-900">From the Blog</h2>
          <Link href="/blog" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">All articles →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { href: "/blog/best-dog-food-for-golden-retrievers", title: "Best Dog Food for Golden Retrievers 2026", excerpt: "Vet-approved picks covering heart health, joint support, and weight management.", tag: "Dog Food" },
            { href: "/blog/best-cat-food", title: "Best Cat Food in 2026: Top Picks for Every Cat", excerpt: "We reviewed 25+ wet and dry cat food brands so you don't have to.", tag: "Cat Food" },
            { href: "/blog/pet-insurance-worth-it", title: "Is Pet Insurance Actually Worth It?", excerpt: "We crunched the numbers on vet costs vs. premiums. Here's the honest answer.", tag: "Insurance" },
          ].map((post) => (
            <Link
              key={post.href}
              href={post.href}
              className="group border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all bg-white"
            >
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">{post.tag}</span>
              <h3 className="font-bold text-gray-900 mt-3 mb-2 text-sm leading-snug group-hover:text-emerald-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
