import Link from "next/link";
import { products, getFeaturedProducts } from "@/lib/products";
import { books } from "@/lib/books";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { computeNatalChart, type BirthInput } from "@/scripts/natal/natal-chart";
import { buildReading } from "@/scripts/natal/reading-template";
import { renderCertificateSVG } from "@/scripts/natal/render-svg";

// A real example chart, computed at build time for the homepage feature banner — with a
// real pet photo in the center so it feels warm and relatable, not abstract.
const CHART_SAMPLE: BirthInput = {
  name: "Goldie", species: "dog", breed: "Golden Retriever",
  year: 2021, month: 7, day: 15, hour: 9, minute: 30,
  latitude: 30.2672, longitude: -97.7431, cityLabel: "Austin, USA",
};
const PET_PHOTO = "data:image/jpeg;base64," + readFileSync(join(process.cwd(), "public", "sample-pet.jpg")).toString("base64");
const _chartSampleChart = computeNatalChart(CHART_SAMPLE);
const _chartSampleReading = buildReading(CHART_SAMPLE, _chartSampleChart);
// The three signature templates, shown side-by-side so visitors see the range of styles.
// The reading is theme-independent, so it's computed once and re-skinned per theme.
// The three real product themes (same order/names as the /natal-chart theme picker).
const CHART_CARDS = ([
  { theme: "nebula", label: "Nebula" },
  { theme: "aurora", label: "Aurora" },
  { theme: "ember",  label: "Ember" },
] as const).map((t) => ({
  ...t,
  svg: renderCertificateSVG(CHART_SAMPLE, _chartSampleChart, _chartSampleReading, { theme: t.theme, photoDataUri: PET_PHOTO }),
}));
// Deterministic background fields for the cosmic section (server-rendered once → no flicker).
function genField(count: number, seed: number, minTop = 42) {
  let s = seed;
  const rnd = () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };
  return Array.from({ length: count }, () => ({
    x: +(rnd() * 100).toFixed(2),
    y: +(minTop + rnd() * (100 - minTop)).toFixed(2),
    r: +(rnd() * 1.5 + 0.7).toFixed(2),
    dur: +(rnd() * 3 + 2.4).toFixed(2),
    delay: +(rnd() * 4).toFixed(2),
  }));
}
const NIGHT_STARS = genField(34, 1234);
const DUST = genField(8, 5077).map((d) => ({ ...d, r: d.r + 1.6 }));
// gold paw prints drifting through the night half
const COSMIC_PAWS = [
  { top: "56%", left: "7%", size: 46, rot: -18, o: 0.11 },
  { top: "74%", left: "87%", size: 56, rot: 14, o: 0.12 },
  { top: "88%", left: "17%", size: 40, rot: 28, o: 0.09 },
  { top: "64%", left: "72%", size: 34, rot: -8, o: 0.08 },
  { top: "92%", left: "60%", size: 30, rot: 40, o: 0.07 },
];

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

function PawIcon({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 64 64" className={className} style={style} aria-hidden="true">
      <path
        d="M32 38c-8 0-14 6-14 14 0 6 6 10 14 10s14-4 14-10c0-8-6-14-14-14zM14 28c-4 0-7 4-7 8s3 7 7 7 7-3 7-7-3-8-7-8zm36 0c-4 0-7 4-7 8s3 7 7 7 7-3 7-7-3-8-7-8zM22 12c-3 0-6 3-6 8s3 8 6 8 6-3 6-8-3-8-6-8zm20 0c-3 0-6 3-6 8s3 8 6 8 6-3 6-8-3-8-6-8z"
        fill="currentColor"
      />
    </svg>
  );
}

const PAW_DECORATIONS: Array<{ top: string; left: string; size: number; rotate: number; opacity: number; color: string }> = [
  { top: "8%",  left: "4%",   size: 52, rotate: -22, opacity: 0.10, color: "#059669" },
  { top: "22%", left: "88%",  size: 42, rotate:  15, opacity: 0.09, color: "#0d9488" },
  { top: "58%", left: "2%",   size: 38, rotate:  30, opacity: 0.08, color: "#059669" },
  { top: "72%", left: "92%",  size: 56, rotate: -18, opacity: 0.11, color: "#0d9488" },
  { top: "38%", left: "48%",  size: 34, rotate:  45, opacity: 0.06, color: "#10b981" },
  { top: "82%", left: "22%",  size: 46, rotate: -35, opacity: 0.09, color: "#059669" },
  { top: "14%", left: "64%",  size: 30, rotate:  60, opacity: 0.07, color: "#0d9488" },
  { top: "50%", left: "78%",  size: 36, rotate:   8, opacity: 0.08, color: "#059669" },
];

function PawBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {PAW_DECORATIONS.map((p, i) => (
        <PawIcon
          key={i}
          style={{
            position: "absolute",
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            color: p.color,
            opacity: p.opacity,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}


export default function HomePage() {
  const featured = getFeaturedProducts();
  const allProducts = products;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-amber-50 py-20 px-4">
        <PawBackground />
        <div className="relative max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-center md:text-left">
            <p className="text-emerald-700 text-sm font-semibold uppercase tracking-widest mb-4">
              Honest Pet Product Reviews
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5 text-gray-900 relative">
              We test it.<br />
              <span className="text-emerald-600">You buy the best.</span>
              <span
                className="absolute pointer-events-none right-0 -top-2 md:right-auto md:-top-6 md:left-[55%] flex flex-col items-center"
                aria-hidden="true"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/dog_gif_v2.gif"
                  alt=""
                  className="block h-12 md:h-16 w-auto"
                />
                {/* Ground shadow — soft elliptical shadow below the dog's paws */}
                <span
                  className="block mt-0.5 h-1.5 md:h-2 rounded-full"
                  style={{
                    width: "80%",
                    background:
                      "radial-gradient(ellipse at center, rgba(15,23,42,0.22) 0%, rgba(15,23,42,0.08) 50%, transparent 78%)",
                  }}
                />
              </span>
            </h1>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-lg">
              Every review on MyPawAdvisor is based on real hands-on testing with real pets. No sponsored rankings. No guessing. Just honest picks from the best-selling products on Amazon.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Link
                href="/reviews"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-full transition-colors shadow-md shadow-emerald-600/20"
              >
                Browse All Reviews
              </Link>
              <Link
                href="/insurance"
                className="bg-white hover:bg-gray-50 border border-gray-300 hover:border-emerald-600 text-gray-800 hover:text-emerald-700 font-semibold px-6 py-3 rounded-full transition-colors"
              >
                Pet Insurance Guide
              </Link>
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="grid grid-cols-2 gap-3 w-64">
              {[
                { emoji: "🐕", stat: "18", label: "Products Tested" },
                { emoji: "⭐", stat: "4.6", label: "Avg Rating" },
                { emoji: "📝", stat: "10K+", label: "Reviews Read" },
                { emoji: "✅", stat: "100%", label: "Honest Picks" },
              ].map((item) => (
                <div key={item.label} className="bg-white border border-gray-200 rounded-2xl p-4 text-center shadow-sm">
                  <div className="text-2xl mb-1">{item.emoji}</div>
                  <div className="text-xl font-extrabold text-gray-900">{item.stat}</div>
                  <div className="text-xs text-gray-500">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PET NATAL CHART — DAY → NIGHT TRANSITION INTO THE COSMIC PRODUCT */}
      <section
        className="relative overflow-hidden px-4 pt-12 pb-16"
        style={{
          background:
            "linear-gradient(to bottom, #fffbeb 0%, #f7faef 5%, #ecf8ef 10%, #d7f3e4 17%, #ace6cf 26%, #76d0b6 37%, #45b29a 48%, #2a8a7c 59%, #176259 70%, #0d3e38 81%, #07251f 91%, #04140f 100%)",
        }}
      >
        <style>{`
          @keyframes mpaTwinkle { 0%, 100% { opacity: .18 } 50% { opacity: .95 } }
          @keyframes mpaFloat { from { transform: translateY(7px) } to { transform: translateY(-9px) } }
        `}</style>

        {/* brand paw prints — emerald in the warm top, fading into the night */}
        <PawBackground />
        {/* gold paws drifting through the cosmic half */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {COSMIC_PAWS.map((p, i) => (
            <PawIcon
              key={i}
              style={{ position: "absolute", top: p.top, left: p.left, width: p.size, height: p.size, color: "#f1d484", opacity: p.o, transform: `rotate(${p.rot}deg)` }}
            />
          ))}
        </div>

        {/* twinkling stars + slow cosmic dust over the lower, night half */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[38%]" aria-hidden>
          {NIGHT_STARS.map((st, i) => (
            <span
              key={i}
              style={{
                position: "absolute", left: `${st.x}%`, top: `${st.y}%`,
                width: st.r * 2, height: st.r * 2, borderRadius: "9999px", background: "#fff",
                animation: `mpaTwinkle ${st.dur}s ease-in-out ${st.delay}s infinite`,
              }}
            />
          ))}
          {DUST.map((d, i) => (
            <span
              key={`d${i}`}
              style={{
                position: "absolute", left: `${d.x}%`, top: `${d.y}%`,
                width: d.r * 2, height: d.r * 2, borderRadius: "9999px",
                background: "rgba(241,212,132,0.7)", filter: "blur(0.5px)",
                animation: `mpaFloat ${d.dur + 3}s ease-in-out ${d.delay}s infinite alternate`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          {/* ── warm top: still the daytime site vibe ── */}
          <p className="text-amber-700 font-bold text-xs uppercase tracking-[0.28em] mb-3">
            ✦ MyPawAdvisor Original ✦
          </p>
          <h2
            className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Your Pet&apos;s Real Natal Chart
          </h2>
          <p className="text-gray-700 text-base md:text-lg max-w-xl mx-auto mb-2 italic">
            It begins on an ordinary afternoon… and ends out among the stars.
          </p>
          <p className="text-gray-700/90 text-sm md:text-base max-w-xl mx-auto mb-9 leading-relaxed">
            We read the actual sky from the moment your pet was born — real astronomy, made for pure
            joy — and turn it into a one-of-a-kind reading and a chart worth framing.
          </p>

          {/* ── three signature templates, fanned like a deck (overlap by half) ── */}
          <div className="relative mx-auto mb-8 h-[270px] sm:h-[370px] w-[300px] sm:w-[400px]">
            {CHART_CARDS.map((c, i) => {
              const step = i - 1; // -1 (left) · 0 (center) · 1 (right)
              return (
                <Link
                  key={c.theme}
                  href="/natal-chart"
                  aria-label={`Create the chart — ${c.label} style`}
                  className="group absolute left-1/2 top-2 w-[150px] sm:w-[200px] transition-[transform,z-index] duration-300 ease-out hover:!z-50"
                  style={{
                    // overlap by half: % is relative to the card's own width, so this stays
                    // responsive across breakpoints. center card sits on top of the fan.
                    zIndex: 12 - Math.abs(step),
                    transform: `translateX(${step * 56 - 50}%) translateY(${Math.abs(step) * 14}px) rotate(${step * 8}deg)`,
                  }}
                >
                  <div
                    className="rounded-[10px] overflow-hidden ring-1 ring-amber-300/25 shadow-2xl shadow-black/50 transition-transform duration-300 group-hover:-translate-y-3 group-hover:scale-[1.05] group-hover:ring-amber-200/70 [&_svg]:w-full [&_svg]:h-auto [&_svg]:block"
                    dangerouslySetInnerHTML={{ __html: c.svg }}
                  />
                  <span className="pointer-events-none absolute inset-x-0 -bottom-6 text-center text-[10px] uppercase tracking-[0.2em] text-amber-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {c.label}
                  </span>
                </Link>
              );
            })}
          </div>
          <p className="text-amber-100/55 text-xs mb-7">Three signature styles — hover to peek; pick yours when you create the chart.</p>

          {/* ── cosmic bottom: fully in the chart vibe ── */}
          <div className="flex flex-wrap gap-2 justify-center mb-7">
            {["✦ Real astronomy", "✦ One-of-a-kind reading", "✦ Printable keepsake", "✦ Perfect gift", "✦ Free to view"].map((b) => (
              <span key={b} className="text-xs font-semibold text-amber-100/90 bg-amber-300/10 border border-amber-300/25 px-3 py-1 rounded-full">{b}</span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/natal-chart"
              className="bg-gradient-to-r from-amber-300 to-amber-200 hover:from-amber-200 hover:to-amber-100 text-[#1a1040] font-bold px-7 py-3 rounded-full transition-colors text-sm text-center"
              style={{ fontFamily: "Georgia, serif" }}
            >
              ✦ Create the Chart ✦
            </Link>
            <Link
              href="/natal-chart/guide"
              className="border border-amber-300/40 hover:border-amber-300/80 text-amber-100 font-semibold px-7 py-3 rounded-full transition-colors text-sm text-center"
            >
              Read the Guide
            </Link>
          </div>
          <p className="text-xs text-indigo-300/50 mt-4">Free to view the full chart &amp; reading · printable keepsake from $6.99</p>
        </div>
      </section>

      {/* DAWN — transition from the cosmic chart back into the warm site */}
      <div
        aria-hidden
        className="h-20 md:h-28"
        style={{
          background:
            "linear-gradient(to bottom, #04140f 0%, #07251f 20%, #0d3e38 38%, #176259 54%, #45b29a 70%, #b9efdc 87%, #fffbeb 100%)",
        }}
      />

      {/* CATEGORY QUICK NAV — the doorway back into the everyday site after the cosmic deck.
          A clean neutral band + defined top edge sets it apart from the dark natal sector,
          signalling "the real site starts here." */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 px-4 py-10 border-t border-gray-200/80 shadow-[inset_0_11px_28px_-20px_rgba(20,20,45,0.22)]">
        <PawBackground />
        <div className="relative max-w-4xl mx-auto">
          <p className="text-center text-[11px] font-semibold text-gray-400 uppercase tracking-[0.22em] mb-5">Browse by Category</p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {[
              { href: "/reviews", label: "🏆 All Reviews", color: "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md shadow-emerald-500/30 ring-1 ring-emerald-600/30 hover:from-emerald-400 hover:to-emerald-500" },
              { href: "/reviews/kong-classic-dog-toy", label: "🐶 Dog Toys", color: "bg-amber-50 text-amber-800 ring-1 ring-amber-200/80 hover:bg-amber-100 hover:ring-amber-300" },
              { href: "/reviews/furminator-deshedding-tool", label: "✂️ Grooming", color: "bg-purple-50 text-purple-800 ring-1 ring-purple-200/80 hover:bg-purple-100 hover:ring-purple-300" },
              { href: "/reviews/petfusion-ultimate-dog-bed", label: "🛏️ Dog Beds", color: "bg-blue-50 text-blue-800 ring-1 ring-blue-200/80 hover:bg-blue-100 hover:ring-blue-300" },
              { href: "/reviews/outward-hound-slow-feeder", label: "🥣 Feeding", color: "bg-orange-50 text-orange-800 ring-1 ring-orange-200/80 hover:bg-orange-100 hover:ring-orange-300" },
              { href: "/reviews/cat-dancer-interactive-toy", label: "🐱 Cat Toys", color: "bg-pink-50 text-pink-800 ring-1 ring-pink-200/80 hover:bg-pink-100 hover:ring-pink-300" },
              { href: "/reviews/rocco-roxie-stain-eliminator", label: "🧹 Cleaning", color: "bg-cyan-50 text-cyan-800 ring-1 ring-cyan-200/80 hover:bg-cyan-100 hover:ring-cyan-300" },
              { href: "/reviews/rabbitgoo-no-pull-dog-harness", label: "🦮 Harnesses", color: "bg-lime-50 text-lime-800 ring-1 ring-lime-200/80 hover:bg-lime-100 hover:ring-lime-300" },
              { href: "/reviews/midwest-icrate-dog-crate", label: "🏠 Crates", color: "bg-stone-100 text-stone-700 ring-1 ring-stone-200 hover:bg-stone-200 hover:ring-stone-300" },
              { href: "/insurance", label: "🛡️ Insurance", color: "bg-indigo-50 text-indigo-800 ring-1 ring-indigo-200/80 hover:bg-indigo-100 hover:ring-indigo-300" },
            ].map((cat) => (
              <Link key={cat.href} href={cat.href}
                className={`px-5 py-2.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wide shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${cat.color}`}>
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ULTRA K9 PRO FUNNEL BANNER */}
      <section className="px-4 py-10">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-amber-50 to-orange-50 ring-1 ring-amber-200/80 shadow-[0_14px_44px_-20px_rgba(180,120,20,0.4)] p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
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

      {/* BOOKS + AUDIBLE */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-100 via-emerald-50 to-teal-50 border-y-2 border-emerald-200 py-12 px-4">
        <PawBackground />
        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">Books Every Pet Owner Should Read</h2>
            <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base">
              The fastest way to truly understand your pet — and you can listen to every one of them{" "}
              <strong className="text-emerald-700">free</strong> with an Audible trial.
            </p>
          </div>

          {/* Book cards */}
          <div className="grid sm:grid-cols-3 gap-4 md:gap-5 mb-8">
            {books.map((book) => (
              <Link
                key={book.slug}
                href={`/books#${book.slug}`}
                className="group relative bg-white rounded-2xl border border-emerald-100 shadow-sm hover:shadow-xl hover:shadow-emerald-900/10 transition-all duration-300 hover:-translate-y-1 p-4 flex flex-col"
              >
                {/* Cover on a soft pedestal */}
                <div className="relative flex justify-center mb-4 pt-2">
                  <div
                    className="absolute inset-x-4 top-2 bottom-3 rounded-xl bg-gradient-to-b from-emerald-50 to-amber-50/60"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-20 h-2.5 rounded-full bg-black/15 blur-md"
                    aria-hidden="true"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={book.cover}
                    alt={book.coverAlt}
                    className="relative h-36 w-auto rounded-md shadow-lg ring-1 ring-black/5 group-hover:-translate-y-1.5 group-hover:rotate-1 transition-transform duration-300"
                  />
                </div>
                <div className="flex items-center justify-between mb-1.5 gap-1">
                  <StarRating rating={book.rating} />
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                    🎧 Free on Audible
                  </span>
                </div>
                <h3 className="font-extrabold text-base text-gray-900 leading-snug mb-0.5 group-hover:text-emerald-600 transition-colors">{book.title}</h3>
                <p className="text-amber-600 text-xs font-semibold mb-3 flex-1">{book.hook}</p>
                <span className="text-sm font-semibold text-emerald-600 group-hover:underline">Read Our Review →</span>
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

        <div className="grid grid-cols-6 gap-5">
          {featured.map((product, index) => {
            const orphans = featured.length % 3;
            const firstOrphanIndex = featured.length - orphans;
            let colStartClass = "";
            if (orphans === 1 && index === firstOrphanIndex) colStartClass = "lg:col-start-3";
            else if (orphans === 2 && index === firstOrphanIndex) colStartClass = "lg:col-start-2";
            return (
            <Link
              key={product.slug}
              href={`/reviews/${product.slug}`}
              className={`col-span-6 md:col-span-3 lg:col-span-2 ${colStartClass} group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1`}
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
            );
          })}
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

      {/* FROM THE BLOG */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-5xl mx-auto">

          {/* Section header */}
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="w-10 h-1 bg-emerald-500 rounded-full mb-3" />
              <h2 className="text-3xl font-extrabold text-gray-900">From the Blog</h2>
              <p className="text-gray-500 text-sm mt-1">Expert guides written for pet owners</p>
            </div>
            <Link href="/blog" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors hidden md:inline-flex items-center gap-1">
              View all articles →
            </Link>
          </div>

          {/* Featured post (large) + 2 side posts */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">

            {/* Featured large card */}
            <Link
              href="/blog/best-dog-food-for-senior-dogs"
              className="group lg:col-span-3 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100"
            >
              <div className="relative h-52 overflow-hidden bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80&fit=crop"
                  alt="Senior dog resting peacefully"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <span className="absolute top-4 left-4 text-xs font-bold text-white bg-amber-500 px-3 py-1 rounded-full shadow">Dog Food</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                  <span>Apr 10, 2026</span>
                  <span>·</span>
                  <span>9 min read</span>
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 leading-snug mb-3 group-hover:text-emerald-600 transition-colors">
                  Best Dog Food for Senior Dogs in 2026 — Vet-Approved
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  After age 7, dogs face muscle loss, joint deterioration, and cognitive decline. We reviewed 25 senior formulas to find the ones that genuinely deliver.
                </p>
                <span className="text-sm font-semibold text-emerald-600 group-hover:underline">
                  Read article →
                </span>
              </div>
            </Link>

            {/* Two stacked side cards */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <Link
                href="/blog/best-dog-food-for-labrador-retrievers"
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 flex-1"
              >
                <div className="relative h-36 overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=600&q=80&fit=crop"
                    alt="Yellow Labrador Retriever"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                  <span className="absolute top-3 left-3 text-xs font-bold text-white bg-amber-500 px-2.5 py-1 rounded-full shadow">Dog Food</span>
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-400 mb-2">Apr 10, 2026 · 8 min read</p>
                  <h3 className="text-sm font-bold text-gray-900 leading-snug mb-1 group-hover:text-emerald-600 transition-colors">
                    Best Dog Food for Labrador Retrievers 2026
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">Labs carry a gene that makes them feel permanently hungry. The right food manages obesity, joints, and bloat.</p>
                </div>
              </Link>

              <Link
                href="/blog/pet-insurance-worth-it"
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 flex-1"
              >
                <div className="relative h-36 overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1612170153139-6f881ff067e0?w=600&q=80&fit=crop"
                    alt="Dog at veterinary clinic"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                  <span className="absolute top-3 left-3 text-xs font-bold text-white bg-emerald-600 px-2.5 py-1 rounded-full shadow">Pet Insurance</span>
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-400 mb-2">Jan 5, 2026 · 9 min read</p>
                  <h3 className="text-sm font-bold text-gray-900 leading-snug mb-1 group-hover:text-emerald-600 transition-colors">
                    Is Pet Insurance Actually Worth It?
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">We crunched 5 years of vet cost data vs. premiums. The honest answer — including when it doesn't make sense.</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Bottom row — 3 smaller cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                href: "/blog/best-dog-food-for-golden-retrievers",
                img: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&q=80&fit=crop",
                imgAlt: "Golden Retriever dog",
                tag: "Dog Food",
                tagBg: "bg-amber-500",
                date: "Jan 20, 2026",
                read: "8 min",
                title: "Best Dog Food for Golden Retrievers 2026",
                excerpt: "Vet-approved picks covering heart health, hip dysplasia, and weight management.",
              },
              {
                href: "/blog/best-dog-food-for-german-shepherds",
                img: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=600&q=80&fit=crop",
                imgAlt: "German Shepherd dog",
                tag: "Dog Food",
                tagBg: "bg-amber-500",
                date: "Jan 18, 2026",
                read: "7 min",
                title: "Best Dog Food for German Shepherds 2026",
                excerpt: "Sensitive digestion and hip dysplasia are common in GSDs. The right diet targets both directly.",
              },
              {
                href: "/blog/best-cat-food",
                img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80&fit=crop",
                imgAlt: "Cat eating food",
                tag: "Cat Food",
                tagBg: "bg-purple-500",
                date: "Jan 15, 2026",
                read: "8 min",
                title: "Best Cat Food in 2026: Top Picks for Every Cat",
                excerpt: "We reviewed 25+ wet and dry brands to find foods that actually meet a cat's nutritional needs.",
              },
            ].map((post) => (
              <Link
                key={post.href}
                href={post.href}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100"
              >
                <div className="relative h-40 overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.img}
                    alt={post.imgAlt}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                  <span className={`absolute top-3 left-3 text-xs font-bold text-white px-2.5 py-1 rounded-full shadow ${post.tagBg}`}>{post.tag}</span>
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-400 mb-2">{post.date} · {post.read} read</p>
                  <h3 className="text-sm font-bold text-gray-900 leading-snug mb-2 group-hover:text-emerald-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile / bottom CTA */}
          <div className="mt-8 text-center">
            <Link href="/blog" className="inline-block text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors md:hidden">
              View all articles →
            </Link>
          </div>

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
    </>
  );
}
