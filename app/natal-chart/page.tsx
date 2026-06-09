"use client";

import { useEffect, useState } from "react";
import { computeNatalChart, type BirthInput, type NatalChart } from "@/scripts/natal/natal-chart";
import { buildReading, type Reading } from "@/scripts/natal/reading-template";
import { renderCertificateSVG, type ThemeName, type CertEdits } from "@/scripts/natal/render-svg";
import { downloadCertificatePdf } from "@/lib/certificate-pdf";
import { formatUsd, priceCents } from "@/lib/horoscope-pricing";

const SPECIES: { value: string; label: string }[] = [
  { value: "dog", label: "🐶 Dog" },
  { value: "cat", label: "🐱 Cat" },
];
const THEMES: { value: ThemeName; label: string }[] = [
  { value: "nebula", label: "Nebula (violet)" },
  { value: "aurora", label: "Aurora (teal)" },
  { value: "ember", label: "Ember (rose)" },
];
const STORAGE_KEY = "petchart_payload";

// All the inputs needed to rebuild a certificate — small enough to survive the Stripe
// redirect via sessionStorage (photo is downscaled first).
type Inputs = {
  name: string; species: string; breed: string; date: string; time: string;
  unknownTime: boolean; city: string; lat: number; long: number; cityLabel: string;
  theme: ThemeName; edits: CertEdits; photoUri?: string;
};

// Common country aliases → ISO country code (Open-Meteo returns codes like "GB", "US").
const COUNTRY_ALIAS: Record<string, string> = {
  uk: "GB", "u.k.": "GB", "united kingdom": "GB", britain: "GB", "great britain": "GB",
  england: "GB", scotland: "GB", wales: "GB",
  usa: "US", "u.s.": "US", "u.s.a.": "US", "united states": "US", america: "US",
  uae: "AE", "united arab emirates": "AE",
};

// Resolve a free-text city to coordinates via Open-Meteo's geocoding API (free, no key).
// The API's `name` param wants a bare city, so we split off any "City, Country" qualifier
// and use it to pick the right match. The natal library derives timezone/DST from lat/long.
async function geocodeCity(q: string): Promise<{ lat: number; long: number; label: string }> {
  const parts = q.split(",").map((s) => s.trim()).filter(Boolean);
  const cityName = parts[0];
  const qualifier = parts.slice(1).join(", ").toLowerCase();

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=10&language=en&format=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("City lookup failed — please try again.");
  const data = await res.json();
  const results: any[] = data?.results ?? [];
  if (!results.length) throw new Error(`Couldn't find a city named "${cityName}". Check the spelling, or try a nearby larger city.`);

  let r = results[0];
  if (qualifier) {
    const wantCode = (COUNTRY_ALIAS[qualifier] ?? (qualifier.length === 2 ? qualifier.toUpperCase() : "")).toUpperCase();
    const match = results.find((x) => {
      const code = String(x.country_code ?? "").toUpperCase();
      const country = String(x.country ?? "").toLowerCase();
      const admin1 = String(x.admin1 ?? "").toLowerCase();
      return (wantCode && code === wantCode) || country.includes(qualifier) || admin1.includes(qualifier);
    });
    if (match) r = match;
  }
  const label = [r.name, r.admin1, r.country_code].filter(Boolean).join(", ");
  return { lat: r.latitude, long: r.longitude, label };
}

// Downscale + re-encode the photo so the payload stays small (the medallion is tiny anyway).
function fileToScaledDataUrl(file: File, max = 720, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale), h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w; canvas.height = h;
        canvas.getContext("2d")!.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = fr.result as string;
    };
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });
}

function defaultEdits(rd: Reading): CertEdits {
  return {
    sunNote: rd.sunNote,
    moonNote: rd.moonNote,
    risingNote: rd.risingNote,
    signature: rd.cosmicSignature,
    dedication: "",
  };
}

function makeCertificate(inp: Inputs): { pet: BirthInput; chart: NatalChart; reading: Reading; svg: string } {
  const [year, month, day] = inp.date.split("-").map(Number);
  const hasTime = !inp.unknownTime && !!inp.time;
  const [hour, minute] = hasTime ? inp.time.split(":").map(Number) : [null, null];
  const pet: BirthInput = {
    name: inp.name.trim(), species: inp.species, breed: inp.breed.trim(),
    year, month, day, hour: hour as number | null, minute: minute as number | null,
    latitude: inp.lat, longitude: inp.long, cityLabel: inp.cityLabel,
  };
  const chart = computeNatalChart(pet);
  const reading = buildReading(pet, chart);
  const eds = inp.edits && Object.keys(inp.edits).length ? inp.edits : defaultEdits(reading);
  const svg = renderCertificateSVG(pet, chart, reading, { photoDataUri: inp.photoUri, theme: inp.theme, edits: eds });
  return { pet, chart, reading, svg };
}

export default function HoroscopePage() {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("dog");
  const [breed, setBreed] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [unknownTime, setUnknownTime] = useState(false);
  const [city, setCity] = useState("");
  const [geo, setGeo] = useState<{ lat: number; long: number; label: string } | null>(null);
  const [theme, setTheme] = useState<ThemeName>("nebula");
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const [svg, setSvg] = useState<string | null>(null);
  const [reading, setReading] = useState<Reading | null>(null);
  const [chart, setChart] = useState<NatalChart | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // premium "edit the wording" add-on
  const [pet, setPet] = useState<BirthInput | null>(null);
  const [photoUri, setPhotoUri] = useState<string | undefined>(undefined);
  const [edits, setEdits] = useState<CertEdits>({});
  const [showEditor, setShowEditor] = useState(false);
  const [pdfBusy, setPdfBusy] = useState(false);
  const [personalized, setPersonalized] = useState(false);
  const [paidUnlocked, setPaidUnlocked] = useState(false);
  const [checkoutBusy, setCheckoutBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  async function handleDownload() {
    if (!svg) return;
    setPdfBusy(true);
    setError(null);
    try {
      const slug = (name || "pet").toLowerCase().replace(/\s+/g, "-");
      await downloadCertificatePdf(svg, `${slug}-natal-chart.pdf`);
    } catch (e: any) {
      setError("PDF export failed: " + (e?.message ?? e));
    } finally {
      setPdfBusy(false);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (!name.trim()) throw new Error("Please enter your pet's name.");
      if (!date) throw new Error("Please enter a birth date.");
      if (!city.trim()) throw new Error("Please enter a birth city.");

      const g = await geocodeCity(city.trim());
      setGeo(g);
      const photoDataUri = photoFile ? await fileToScaledDataUrl(photoFile) : undefined;
      const inputs: Inputs = { name, species, breed, date, time, unknownTime, city, lat: g.lat, long: g.long, cityLabel: g.label, theme, edits: {}, photoUri: photoDataUri };
      const built = makeCertificate(inputs);
      setPet(built.pet);
      setChart(built.chart);
      setReading(built.reading);
      setSvg(built.svg);
      setPhotoUri(photoDataUri);
      setEdits(defaultEdits(built.reading));
      setShowEditor(false);
      setPersonalized(false);
      setPaidUnlocked(false);
      setNotice(null);
      setTimeout(() => document.getElementById("result")?.scrollIntoView({ behavior: "smooth" }), 50);
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  function reRender(next: CertEdits) {
    setEdits(next);
    setPersonalized(true); // any manual edit makes this the premium PDF
    if (pet && chart && reading) {
      setSvg(renderCertificateSVG(pet, chart, reading, { photoDataUri: photoUri, theme, edits: next }));
    }
  }

  async function startCheckout() {
    if (!svg) return;
    setError(null);
    if (!geo) { setError("Please reveal a chart first."); return; }
    const payload: Inputs = { name, species, breed, date, time, unknownTime, city, lat: geo.lat, long: geo.long, cityLabel: geo.label, theme, edits, photoUri };
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      setError("That photo is too large to carry through checkout — try a smaller image.");
      return;
    }
    setCheckoutBusy(true);
    try {
      const res = await fetch("/api/horoscope/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ personalized, petName: name }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else { setError(data.error ?? "Could not start checkout."); setCheckoutBusy(false); }
    } catch (e: any) {
      setError("Checkout error: " + (e?.message ?? e));
      setCheckoutBusy(false);
    }
  }

  // Handle return from Stripe: verify payment, restore the chart, auto-download.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("canceled")) {
      setNotice("Checkout canceled — your chart is still here whenever you're ready.");
      window.history.replaceState({}, "", "/natal-chart");
      return;
    }
    const paid = params.get("paid");
    if (!paid) return;
    (async () => {
      try {
        const v = await fetch(`/api/horoscope/verify?session_id=${encodeURIComponent(paid)}`).then((r) => r.json());
        const raw = sessionStorage.getItem(STORAGE_KEY);
        if (v.paid && raw) {
          const p = JSON.parse(raw) as Inputs;
          setName(p.name); setSpecies(p.species); setBreed(p.breed); setDate(p.date);
          setTime(p.time); setUnknownTime(p.unknownTime); setCity(p.city); setTheme(p.theme);
          setGeo({ lat: p.lat, long: p.long, label: p.cityLabel });
          setEdits(p.edits); setPhotoUri(p.photoUri); setPersonalized(!!p.edits?.dedication || Object.keys(p.edits ?? {}).length > 5);
          const built = makeCertificate(p);
          setPet(built.pet); setChart(built.chart); setReading(built.reading); setSvg(built.svg);
          setPaidUnlocked(true);
          setNotice("Payment received ✓ Your PDF is downloading…");
          const slug = (p.name || "pet").toLowerCase().replace(/\s+/g, "-");
          try { await downloadCertificatePdf(built.svg, `${slug}-natal-chart.pdf`); } catch { /* manual button below */ }
          setTimeout(() => document.getElementById("result")?.scrollIntoView({ behavior: "smooth" }), 80);
        } else if (v.paid) {
          setPaidUnlocked(true);
          setNotice("Payment received ✓ — re-enter your pet's details and the download is free this session.");
        } else {
          setNotice("We couldn't verify that payment. If you were charged, please contact support.");
        }
      } catch {
        setNotice("Could not verify the payment.");
      } finally {
        window.history.replaceState({}, "", "/natal-chart");
      }
    })();
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0a1f] text-indigo-50">
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital@0;1&display=swap"
        rel="stylesheet"
      />
      {notice && (
        <div className="sticky top-0 z-30 bg-amber-300/15 border-b border-amber-200/30 text-amber-100 text-center text-sm py-2.5 px-4 backdrop-blur">
          {notice}
        </div>
      )}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(1200px 600px at 50% -10%, #2a1450 0%, #120a2e 45%, #0a0a1f 100%)",
        }}
      >
        <PawBackground />
        <section className="relative z-10 max-w-3xl mx-auto px-4 pt-16 pb-10 text-center">
          <p className="tracking-[0.4em] text-amber-200/80 text-xs mb-4" style={{ fontFamily: "Cinzel, serif" }}>
            ✦ MYPAWADVISOR ASTROLOGY ✦
          </p>
          <h1 className="text-4xl md:text-6xl mb-4" style={{ fontFamily: "Cinzel, serif" }}>
            Your Pet&apos;s Natal Chart
          </h1>
          <p className="text-indigo-200/80 text-lg max-w-xl mx-auto" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Reveal the cosmic blueprint your companion was born under — a real birth chart,
            beautifully rendered, with a printable PDF
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/pdf-icon.png" alt="PDF"
              style={{ display: "inline-block", width: "1.1em", height: "1.1em", verticalAlign: "-0.2em", marginLeft: "0.3em" }} />.
          </p>
        </section>

        <section className="relative z-10 max-w-2xl mx-auto px-4 pb-16">
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-amber-200/20 bg-white/5 backdrop-blur p-6 md:p-8 space-y-5 shadow-2xl"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Pet name">
                <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="Goldie" />
              </Field>
              <Field label="Species">
                <select className={inputCls} value={species} onChange={(e) => setSpecies(e.target.value)}>
                  {SPECIES.map((s) => <option key={s.value} value={s.value} className="bg-[#120a2e]">{s.label}</option>)}
                </select>
              </Field>
              <Field label="Breed">
                <input className={inputCls} value={breed} onChange={(e) => setBreed(e.target.value)} placeholder="Golden Retriever" />
              </Field>
              <Field label="Birth city">
                <input className={inputCls} value={city} onChange={(e) => setCity(e.target.value)}
                  placeholder="London, UK" autoComplete="off" />
              </Field>
              <Field label="Birth date">
                <input type="date" className={inputCls} value={date} onChange={(e) => setDate(e.target.value)} />
              </Field>
              <Field label="Birth time">
                <input type="time" className={inputCls} value={time} disabled={unknownTime}
                  onChange={(e) => setTime(e.target.value)} />
                <label className="mt-2 flex items-center gap-2 text-sm text-indigo-200/70">
                  <input type="checkbox" checked={unknownTime} onChange={(e) => setUnknownTime(e.target.checked)} />
                  I don&apos;t know the birth time
                </label>
              </Field>
              <Field label="Theme">
                <select className={inputCls} value={theme} onChange={(e) => setTheme(e.target.value as ThemeName)}>
                  {THEMES.map((t) => <option key={t.value} value={t.value} className="bg-[#120a2e]">{t.label}</option>)}
                </select>
              </Field>
              <Field label="Pet photo (recommended)">
                <input type="file" accept="image/*" className="text-sm text-indigo-200/80 file:mr-3 file:rounded-full file:border-0 file:bg-amber-300/90 file:px-4 file:py-1.5 file:text-[#120a2e] file:font-semibold"
                  onChange={(e) => setPhotoFile(e.target.files?.[0] ?? null)} />
              </Field>
            </div>

            {error && <p className="text-rose-300 text-sm">{error}</p>}

            <button type="submit" disabled={busy}
              className="w-full rounded-full bg-gradient-to-r from-amber-300 to-amber-200 text-[#120a2e] font-bold py-3 text-lg tracking-wide hover:from-amber-200 hover:to-amber-100 transition disabled:opacity-60"
              style={{ fontFamily: "Cinzel, serif" }}>
              {busy ? "Consulting the stars…" : "✦ Reveal the Chart ✦"}
            </button>
          </form>
        </section>
      </div>

      {svg && reading && chart && (
        <section id="result" className="relative max-w-5xl mx-auto px-4 py-14">
          <PawBackground />
          <div className="relative z-10 grid lg:grid-cols-[minmax(0,520px)_1fr] gap-10 items-start">
            <div>
              <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-amber-200/20 [&_svg]:w-full [&_svg]:h-auto [&_svg]:block"
                dangerouslySetInnerHTML={{ __html: svg }} />
              <div className="mt-4 rounded-xl border border-amber-200/20 bg-white/5 p-4 text-center">
                {paidUnlocked ? (
                  <>
                    <p className="text-emerald-300 text-sm mb-3 font-semibold">Paid ✓ — thank you! Your PDF is unlocked.</p>
                    <button onClick={handleDownload} disabled={pdfBusy}
                      className="rounded-full bg-gradient-to-r from-amber-300 to-amber-200 text-[#120a2e] font-bold px-6 py-2.5 text-sm hover:from-amber-200 hover:to-amber-100 transition disabled:opacity-60"
                      style={{ fontFamily: "Cinzel, serif" }}>
                      {pdfBusy ? "Preparing…" : "⬇ Download PDF"}
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-indigo-200/80 text-sm mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      Love it? Unlock the high-resolution printable PDF.
                    </p>
                    <button onClick={startCheckout} disabled={checkoutBusy}
                      className="rounded-full bg-gradient-to-r from-amber-300 to-amber-200 text-[#120a2e] font-bold px-6 py-2.5 text-sm hover:from-amber-200 hover:to-amber-100 transition disabled:opacity-60"
                      style={{ fontFamily: "Cinzel, serif" }}>
                      {checkoutBusy ? "Redirecting to secure checkout…" : `Unlock PDF — ${formatUsd(priceCents(personalized))}`}
                    </button>
                    <p className="mt-3 flex items-center justify-center gap-1.5 text-indigo-300/55 text-xs">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-emerald-400/80" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                      </svg>
                      <span>Secure one-time checkout · Powered by <span className="font-semibold text-indigo-200/85">Stripe</span></span>
                    </p>
                  </>
                )}
              </div>

              {/* Premium: edit the wording */}
              <div className="mt-4 rounded-xl border border-amber-300/30 bg-amber-300/[0.06] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-amber-100 font-semibold" style={{ fontFamily: "Cinzel, serif" }}>Personalize the wording</p>
                    <p className="text-indigo-200/70 text-sm">Rewrite the captions &amp; closing line, or add a dedication.</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-amber-300 text-[#120a2e] text-[11px] font-bold px-2.5 py-1 tracking-wide">PREMIUM&nbsp;+$3</span>
                </div>

                {!showEditor ? (
                  <button onClick={() => setShowEditor(true)}
                    className="mt-3 rounded-full border border-amber-300/50 px-4 py-1.5 text-amber-100 text-sm hover:bg-amber-300/10 transition">
                    ✎ Edit text (premium)
                  </button>
                ) : (
                  <div className="mt-4 space-y-3">
                    <EditField label="Sun caption" value={edits.sunNote ?? ""} onChange={(v) => reRender({ ...edits, sunNote: v })} />
                    <EditField label="Moon caption" value={edits.moonNote ?? ""} onChange={(v) => reRender({ ...edits, moonNote: v })} />
                    <EditField label="Rising caption" value={edits.risingNote ?? ""} onChange={(v) => reRender({ ...edits, risingNote: v })} />
                    <EditField label="Cosmic signature (closing line)" value={edits.signature ?? ""} onChange={(v) => reRender({ ...edits, signature: v })} />
                    <EditField label="Dedication (optional)" value={edits.dedication ?? ""} placeholder="e.g. Our best boy, forever ✦"
                      onChange={(v) => reRender({ ...edits, dedication: v })} />
                    <div className="flex items-center gap-3 pt-1">
                      <button onClick={() => setShowEditor(false)}
                        className="rounded-full bg-amber-300 text-[#120a2e] font-semibold text-sm px-4 py-1.5 hover:bg-amber-200 transition">Done</button>
                      <span className="text-amber-200/70 text-xs">Edits update the certificate live. A personalized PDF costs a little more than the standard chart.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Interpretation reading={reading} />
          </div>
        </section>
      )}

      {/* Contact support — email lives only in the mailto href, never shown on screen */}
      <section className="relative z-10 max-w-xs mx-auto px-4 pb-12">
        <div className="rounded-lg border border-amber-200/20 bg-white/5 px-4 py-3 flex items-center justify-between gap-3">
          <span className="text-indigo-200/70 text-xs" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Need a hand?</span>
          <button
            type="button"
            onClick={() => {
              // Assembled at click time so the address never appears in the markup or the
              // browser's hover/status bar.
              const user = "jaarisimo", domain = "gmail.com";
              window.location.href = `mailto:${user}@${domain}?subject=${encodeURIComponent("MyPawAdvisor Natal Chart — Support")}`;
            }}
            className="shrink-0 rounded-full border border-amber-300/50 px-3 py-1.5 text-amber-100 text-xs hover:bg-amber-300/10 transition cursor-pointer"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            Contact Support
          </button>
        </div>
      </section>
    </main>
  );
}

const inputCls =
  "w-full rounded-lg border border-amber-200/20 bg-white/5 px-3 py-2 text-indigo-50 placeholder-indigo-300/40 focus:outline-none focus:ring-2 focus:ring-amber-300/50";

const PAW_PATH =
  "M32 38c-8 0-14 6-14 14 0 6 6 10 14 10s14-4 14-10c0-8-6-14-14-14zM14 28c-4 0-7 4-7 8s3 7 7 7 7-3 7-7-3-8-7-8zm36 0c-4 0-7 4-7 8s3 7 7 7 7-3 7-7-3-8-7-8zM22 12c-3 0-6 3-6 8s3 8 6 8 6-3 6-8-3-8-6-8zm20 0c-3 0-6 3-6 8s3 8 6 8 6-3 6-8-3-8-6-8z";

// Scattered, fading paw prints — a soft watermark tying the cosmic page to the pet brand.
const PAWS = [
  { left: "5%",  top: "6%",  size: 96, rot: -18, o: 0.07 },
  { left: "84%", top: "12%", size: 64, rot: 22,  o: 0.05 },
  { left: "10%", top: "46%", size: 56, rot: 10,  o: 0.06 },
  { left: "90%", top: "40%", size: 84, rot: -12, o: 0.05 },
  { left: "68%", top: "70%", size: 70, rot: 16,  o: 0.06 },
  { left: "18%", top: "82%", size: 60, rot: -24, o: 0.05 },
  { left: "46%", top: "30%", size: 44, rot: 8,   o: 0.04 },
  { left: "33%", top: "63%", size: 50, rot: -8,  o: 0.045 },
];

function PawBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {PAWS.map((p, i) => (
        <svg
          key={i}
          viewBox="0 0 64 64"
          fill="#e8c976"
          style={{
            position: "absolute",
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            transform: `rotate(${p.rot}deg)`,
            opacity: p.o,
          }}
        >
          <path d={PAW_PATH} />
        </svg>
      ))}
    </div>
  );
}

function EditField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-widest text-amber-200/70 mb-1">{label}</span>
      <input
        className="w-full rounded-lg border border-amber-200/20 bg-[#0a0a1f]/60 px-3 py-1.5 text-sm text-indigo-50 placeholder-indigo-300/40 focus:outline-none focus:ring-2 focus:ring-amber-300/50"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-widest text-amber-200/70 mb-1.5" style={{ fontFamily: "Cinzel, serif" }}>{label}</span>
      {children}
    </label>
  );
}

function Interpretation({ reading }: { reading: Reading }) {
  const stars = "★".repeat(reading.starRating) + "☆".repeat(5 - reading.starRating);
  const m = reading.metrics;
  // Real, computed chart facts shown as little badges — proof the reading is calculated.
  const badges = [
    `${m.element.dominant}-dominant`,
    `mostly ${m.modality.dominant}`,
    m.polarity.leaning === "Yang" ? "outgoing" : "inward",
    ...(m.chartRuler ? [`${m.chartRuler.planet}-ruled`] : []),
    ...(m.stelliums.length ? [`${m.stelliums[0].planets.length}-planet stellium`] : []),
    ...(m.retrogrades.length ? [`${m.retrogrades.length} retrograde`] : []),
  ];
  const blocks: ([string, string] | null)[] = [
    ["Cosmic Snapshot", reading.cosmicSnapshot],
    ["☉ Sun", reading.sun],
    ["☽ Moon", reading.moon],
    ["↑ Rising", reading.rising],
    ["Elemental Nature", reading.elementalNature],
    ["How They Operate", reading.operatingStyle],
    reading.chartRuler ? ["Chart Ruler", reading.chartRuler] : null,
    ["Love & Play", reading.loveAndPlay],
    ["Standout Aspect", reading.standoutAspect],
    reading.quirk ? ["Quirk", reading.quirk] : null,
  ];
  return (
    <div style={{ fontFamily: "'Cormorant Garamond', serif" }}>
      <h2 className="text-3xl text-amber-100 mb-1" style={{ fontFamily: "Cinzel, serif" }}>{reading.title}</h2>
      <p className="text-amber-300 text-xl mb-3">{stars}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {badges.map((b) => (
          <span key={b} className="rounded-full border border-amber-200/30 bg-amber-200/[0.07] px-3 py-1 text-amber-100/90 text-xs tracking-wide">{b}</span>
        ))}
      </div>
      <div className="space-y-5">
        {blocks.filter(Boolean).map((blk) => {
          const [h, body] = blk as [string, string];
          return (
            <div key={h}>
              <h3 className="text-amber-200/90 text-sm uppercase tracking-widest mb-1" style={{ fontFamily: "Cinzel, serif" }}>{h}</h3>
              <p className="text-indigo-100/90 text-lg leading-relaxed">{body}</p>
            </div>
          );
        })}
        <p className="text-indigo-200/70 italic">{reading.luckyToy}</p>
        {/* the memorable closing line — the keepsake's signature */}
        <div className="mt-2 rounded-xl border border-amber-300/30 bg-gradient-to-br from-amber-300/[0.10] to-transparent p-5">
          <p className="text-amber-200/70 text-xs uppercase tracking-[0.3em] mb-2" style={{ fontFamily: "Cinzel, serif" }}>✦ Cosmic Signature ✦</p>
          <p className="text-amber-50 text-xl leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{reading.cosmicSignature}</p>
        </div>
        <p className="text-indigo-300/50 text-sm pt-2 border-t border-white/10">For entertainment only — not veterinary advice.</p>
      </div>
    </div>
  );
}
