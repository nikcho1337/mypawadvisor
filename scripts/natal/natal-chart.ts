// Phase 1 chart math. Wraps circular-natal-horoscope-js into a clean, typed shape.
// No network, no AI. The library auto-derives timezone (incl. historical DST) from
// lat/long, so we pass local clock time + coordinates only.
import * as natal from "circular-natal-horoscope-js";
import type { SignName } from "./data";
// CJS interop differs across runtimes (tsx vs Next/webpack vs native ESM) — resolve robustly.
const _n: any = natal;
const Origin: any = _n.Origin ?? _n.default?.Origin;
const Horoscope: any = _n.Horoscope ?? _n.default?.Horoscope;

export interface BirthInput {
  name: string;
  species: string;
  breed: string;
  year: number;
  month: number; // 1-12 (human-friendly; converted to 0-indexed internally)
  day: number;
  hour: number | null;   // null => birth time unknown
  minute: number | null;
  latitude: number;
  longitude: number;
  cityLabel?: string;
}

export interface Placement {
  body: string;        // "Sun", "Moon", ...
  sign: SignName;
  degree: string;      // within-sign, e.g. "23° 29'"
  lon: number;         // absolute ecliptic longitude 0-360 (Aries 0°) — for plotting
  house: number | null;
  retrograde: boolean;
}

export interface Aspect {
  a: string;           // body key, e.g. "sun"
  b: string;           // body key, e.g. "moon"
  type: string;        // "conjunction" | "opposition" | "trine" | "square" | "sextile"
  orb: number;         // how far from exact, in degrees (0 = exact; smaller = tighter)
}

export interface NatalChart {
  hasTime: boolean;          // was a birth time supplied?
  placements: Placement[];   // the 10 planets, in order
  sun: Placement;
  moon: Placement;
  ascendant: { sign: SignName; degree: string; lon: number } | null;  // null when time unknown
  midheaven: { sign: SignName } | null;
  houseCusps: number[] | null;  // 12 absolute longitudes (house starts), null when time unknown
  aspects: Aspect[];
}

const PLANET_ORDER = [
  "sun", "moon", "mercury", "venus", "mars",
  "jupiter", "saturn", "uranus", "neptune", "pluto",
];

function shortDegree(body: any): string {
  // ArcDegreesFormatted30 looks like "23° 29' 38''" — keep degrees + minutes.
  const full: string = body?.ChartPosition?.Ecliptic?.ArcDegreesFormatted30 ?? "";
  const m = full.match(/^(\d+)°\s*(\d+)'/);
  return m ? `${m[1]}° ${m[2]}'` : full;
}

export function computeNatalChart(input: BirthInput): NatalChart {
  const hasTime = input.hour !== null && input.minute !== null;

  // When time is unknown, cast at local noon: planet signs stay accurate to the day
  // (the Moon can drift a few degrees, but the sign is almost always right), while we
  // deliberately DROP the Ascendant/houses rather than present a fake one.
  const origin = new Origin({
    year: input.year,
    month: input.month - 1, // library is 0-indexed
    date: input.day,
    hour: hasTime ? (input.hour as number) : 12,
    minute: hasTime ? (input.minute as number) : 0,
    latitude: input.latitude,
    longitude: input.longitude,
  });

  const h = new Horoscope({
    origin,
    houseSystem: "placidus",
    zodiac: "tropical",
    aspectPoints: ["bodies"],
    aspectWithPoints: ["bodies"],
    aspectTypes: ["major"],
    language: "en",
  });

  const placements: Placement[] = PLANET_ORDER.map((key) => {
    const b = h.CelestialBodies[key];
    return {
      body: b.label as string,
      sign: b.Sign.label as SignName,
      degree: shortDegree(b),
      lon: b.ChartPosition.Ecliptic.DecimalDegrees as number,
      house: hasTime ? (b.House?.id ?? null) : null,
      retrograde: !!b.isRetrograde,
    };
  });

  const byKey = (k: string) => placements[PLANET_ORDER.indexOf(k)];

  // Aspects between the 10 planets (keys are lowercase body names).
  const aspects: Aspect[] = (h.Aspects?.all ?? [])
    .filter((x: any) => PLANET_ORDER.includes(x.point1Key) && PLANET_ORDER.includes(x.point2Key))
    .map((x: any) => ({ a: x.point1Key, b: x.point2Key, type: x.aspectKey, orb: Number(x.orb) || 0 }));

  const houseCusps: number[] | null = hasTime
    ? h.Houses.map((hs: any) => hs.ChartPosition.StartPosition.Ecliptic.DecimalDegrees as number)
    : null;

  return {
    hasTime,
    placements,
    sun: byKey("sun"),
    moon: byKey("moon"),
    ascendant: hasTime
      ? { sign: h.Ascendant.Sign.label as SignName, degree: shortDegree(h.Ascendant), lon: h.Ascendant.ChartPosition.Ecliptic.DecimalDegrees as number }
      : null,
    midheaven: hasTime ? { sign: h.Midheaven.Sign.label as SignName } : null,
    houseCusps,
    aspects,
  };
}
