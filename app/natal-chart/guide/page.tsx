import type { Metadata } from "next";
import Link from "next/link";
import { computeNatalChart, type BirthInput } from "@/scripts/natal/natal-chart";
import { buildReading } from "@/scripts/natal/reading-template";
import { renderCertificateSVG } from "@/scripts/natal/render-svg";

export const metadata: Metadata = {
  title: "The Story Behind Your Pet's Natal Chart | MyPawAdvisor",
  description:
    "A personal guide to the Pet Natal Chart — how it works, why the astronomy is real, and why it makes such a meaningful gift for any pet lover.",
};

// A real example chart, computed at build time so visitors see exactly what they'll get.
const SAMPLE_PET: BirthInput = {
  name: "Luna", species: "cat", breed: "Tabby",
  year: 2019, month: 11, day: 2, hour: 14, minute: 20,
  latitude: 51.5074, longitude: -0.1278, cityLabel: "London, England, GB",
};
const SAMPLE_CHART = computeNatalChart(SAMPLE_PET);
const SAMPLE_READING = buildReading(SAMPLE_PET, SAMPLE_CHART);
const SAMPLE_SVG = renderCertificateSVG(SAMPLE_PET, SAMPLE_CHART, SAMPLE_READING, { theme: "nebula" });

// A few fixed stars for the hero backdrop (server-rendered, deterministic — no flicker).
const STARS = [
  [6, 14], [18, 40], [12, 72], [27, 22], [33, 60], [44, 12], [52, 38], [61, 70],
  [70, 20], [78, 52], [86, 30], [92, 66], [40, 84], [58, 88], [22, 90], [74, 84],
];

function Star({ x, y, s = 2, o = 0.5 }: { x: number; y: number; s?: number; o?: number }) {
  return (
    <span
      aria-hidden
      style={{
        position: "absolute", left: `${x}%`, top: `${y}%`,
        width: s, height: s, borderRadius: "9999px", background: "#fff", opacity: o,
      }}
    />
  );
}

function Divider() {
  return (
    <div className="flex items-center justify-center gap-3 my-12" aria-hidden>
      <span className="h-px w-16 bg-amber-200/30" />
      <span className="text-amber-200/70">✦</span>
      <span className="h-px w-16 bg-amber-200/30" />
    </div>
  );
}

export default function GuidePage() {
  return (
    <main className="min-h-screen bg-[#0a0a1f] text-indigo-50">
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital@0;1&display=swap"
        rel="stylesheet"
      />

      {/* ---------- hero ---------- */}
      <header
        className="relative overflow-hidden"
        style={{ background: "radial-gradient(1100px 560px at 50% -8%, #2a1450 0%, #120a2e 46%, #0a0a1f 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0">
          {STARS.map(([x, y], i) => (
            <Star key={i} x={x} y={y} s={i % 3 === 0 ? 3 : 2} o={0.35 + (i % 4) * 0.15} />
          ))}
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 pt-20 pb-16 text-center">
          <p className="tracking-[0.4em] text-amber-200/80 text-xs mb-5" style={{ fontFamily: "Cinzel, serif" }}>
            ✦ THE STORY BEHIND THE CHARTS ✦
          </p>
          <h1 className="text-4xl md:text-6xl leading-tight mb-5" style={{ fontFamily: "Cinzel, serif" }}>
            Every pet is written<br />in the stars
          </h1>
          <p
            className="text-indigo-100/85 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            We built a tiny observatory for our animals — one that reads the real sky from the
            moment they were born and turns it into something you&rsquo;ll want to frame. Here&rsquo;s
            the whole story.
          </p>
        </div>
      </header>

      {/* ---------- live example chart ---------- */}
      <section className="relative max-w-md mx-auto px-5 pt-14 -mb-2">
        <p className="text-center text-amber-200/70 text-xs tracking-[0.3em] mb-4" style={{ fontFamily: "Cinzel, serif" }}>
          ✦ A REAL EXAMPLE ✦
        </p>
        <div
          className="rounded-2xl overflow-hidden ring-1 ring-amber-200/25 shadow-2xl [&_svg]:w-full [&_svg]:h-auto [&_svg]:block"
          dangerouslySetInnerHTML={{ __html: SAMPLE_SVG }}
        />
        <p
          className="text-center text-indigo-200/70 text-base mt-4 italic"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Meet Luna — a real chart cast for a tabby born in London. Yours is computed the
          exact same way, and you can add your pet&rsquo;s photo to the center.
        </p>
      </section>

      <article className="max-w-2xl mx-auto px-5 py-16" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
        {/* ---------- what it is ---------- */}
        <Section title="So, what is this?">
          <p>
            It&rsquo;s a <strong className="text-amber-100">real natal chart</strong> — the same kind an
            astrologer would cast for a person — except it&rsquo;s for your dog or cat. You give us your
            pet&rsquo;s name, birth date, and (if you know it) the time and place, and we calculate exactly
            where the Sun, Moon, and every planet sat in the sky at that moment.
          </p>
          <p>
            Out of that comes a one-of-a-kind reading and a poster-worthy chart wheel you can keep
            on screen for free, or download as a printable keepsake.
          </p>
        </Section>

        <Divider />

        {/* ---------- real data, fun purpose ---------- */}
        <Section title="The data is real. The purpose is joy.">
          <p>
            This part matters to us, so we&rsquo;ll be honest with you. The astronomy under the hood is
            <strong className="text-amber-100"> genuinely real</strong>. The planet positions are computed
            from the actual movements of the solar system and are accurate to the degree — we check them
            against the same professional tools astrologers use. We never make a placement up. If your
            cat has the Moon in Scorpio, it&rsquo;s because the Moon really was in Scorpio that night.
          </p>
          <p>
            But here&rsquo;s the honest bit: this is for <strong className="text-amber-100">fun</strong>.
            We&rsquo;re not claiming the stars decide whether your pup chews the couch. It&rsquo;s a playful,
            true-to-the-sky portrait — a way to celebrate everything that makes your companion
            wonderfully <em>them</em>. Real sky, real math, zero seriousness. Think of it as a love
            letter with footnotes from the universe.
          </p>
        </Section>

        <Divider />

        {/* ---------- how it works ---------- */}
        <Section title="How it works">
          <ol className="space-y-5 list-none p-0">
            <Step n={1} h="Tell us about your pet">
              Name, species, breed, birth date — and the time and city if you have them. No birth
              time? No problem; you&rsquo;ll still get the full planet picture, just without the rising sign.
            </Step>
            <Step n={2} h="We cast the real chart">
              In a blink, your pet&rsquo;s exact sky is computed — every planet, its sign and house, the
              aspects between them, the whole map.
            </Step>
            <Step n={3} h="A reading made only for them">
              Their Sun, Moon, rising, dominant element, ruling planet and more become a warm, funny,
              one-of-a-kind reading — and the same details always produce the same result, so it&rsquo;s
              truly <em>theirs</em>.
            </Step>
            <Step n={4} h="Keep it forever">
              Admire the cosmic chart wheel on screen for free. Love it? Unlock a high-resolution
              printable PDF to frame, gift, or keep.
            </Step>
          </ol>
        </Section>

        <Divider />

        {/* ---------- the gift ---------- */}
        <Section title="Honestly? It&rsquo;s a perfect gift.">
          <p>
            We keep coming back to this one. A pet&rsquo;s natal chart is the kind of present that makes
            someone go quiet for a second and then grin.
          </p>
          <ul className="space-y-2 mt-3">
            <Bullet>For a <strong className="text-amber-100">birthday or gotcha day</strong> — the most thoughtful card you&rsquo;ll ever give.</Bullet>
            <Bullet>As a <strong className="text-amber-100">treat for yourself</strong>, because your best friend deserves a portrait.</Bullet>
            <Bullet>For a <strong className="text-amber-100">new puppy or kitten</strong> in the family.</Bullet>
            <Bullet>As a tender, beautiful way to <strong className="text-amber-100">remember a pet</strong> who&rsquo;s no longer here.</Bullet>
          </ul>
          <p className="mt-4">
            It costs less than a fancy toy, and it lasts a lot longer than one.
          </p>
        </Section>

        <Divider />

        {/* ---------- dedication ---------- */}
        <Section title="A small labor of love">
          <p>
            We want you to know this wasn&rsquo;t thrown together. Building it took real time, late nights,
            and more than a little obsession.
          </p>
          <p>
            We wired up a proper astronomy engine so the charts are actually correct. We hand-wrote the
            readings — every sign, every planet, every quirky little turn of phrase — so they sound
            like a person who loves animals, not a machine. And we designed the chart certificate
            pixel by pixel: the starfield, the glowing wheel, the gold lettering, right down to
            drawing each zodiac symbol by hand so it stays crisp on your wall.
          </p>
          <p>
            It&rsquo;s a lot of dedication poured into something whose only job is to make you smile about
            your pet. That trade felt completely worth it to us.
          </p>
        </Section>

        {/* ---------- CTA ---------- */}
        <div className="mt-14 rounded-2xl border border-amber-200/20 bg-white/5 p-8 text-center">
          <p className="text-amber-100 text-2xl mb-2" style={{ fontFamily: "Cinzel, serif" }}>
            Ready to meet your pet&rsquo;s stars?
          </p>
          <p className="text-indigo-200/75 mb-6">It&rsquo;s free to see the full chart and reading.</p>
          <Link
            href="/natal-chart"
            className="inline-block rounded-full bg-gradient-to-r from-amber-300 to-amber-200 text-[#120a2e] font-bold px-8 py-3 text-lg tracking-wide hover:from-amber-200 hover:to-amber-100 transition"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            ✦ Create the Chart ✦
          </Link>
        </div>

        <p className="text-center text-indigo-300/40 text-sm mt-10">
          For entertainment only — not veterinary advice. Made with love at MyPawAdvisor.
        </p>
      </article>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl text-amber-100 mb-4" style={{ fontFamily: "Cinzel, serif" }}>
        {title}
      </h2>
      <div className="space-y-4 text-indigo-100/85 text-lg leading-relaxed">{children}</div>
    </section>
  );
}

function Step({ n, h, children }: { n: number; h: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-4">
      <span
        className="shrink-0 grid place-items-center w-9 h-9 rounded-full border border-amber-300/50 text-amber-200 text-sm"
        style={{ fontFamily: "Cinzel, serif" }}
      >
        {n}
      </span>
      <div>
        <h3 className="text-amber-100 text-lg mb-0.5" style={{ fontFamily: "Cinzel, serif" }}>{h}</h3>
        <p className="text-indigo-100/80">{children}</p>
      </div>
    </li>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="text-amber-300/80 mt-1">✦</span>
      <span>{children}</span>
    </li>
  );
}
