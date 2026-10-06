"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type NavLink = { href: string; label: string };

const CINZEL = { fontFamily: "var(--font-cinzel), Georgia, serif" } as const;

/**
 * Small-screen navigation: a compact Natal Chart shortcut plus a hamburger button that
 * opens a full-width panel under the sticky header. Closes on link tap and Escape.
 */
export default function MobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="flex md:hidden items-center gap-2">
      <Link
        href="/natal-chart"
        className="inline-flex items-center gap-1 font-semibold text-sm px-2 py-1"
        style={CINZEL}
        aria-label="Pet Natal Chart"
      >
        <span className="text-amber-400">✦</span>
        <span className="bg-gradient-to-r from-violet-600 to-amber-500 bg-clip-text text-transparent">Natal</span>
      </Link>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="absolute left-0 right-0 top-full z-40 bg-white border-t border-gray-100 shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto"
        >
          <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-col text-base font-medium text-gray-800">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={close} className="py-3 border-b border-gray-100 hover:text-emerald-600 transition-colors">
                {link.label}
              </Link>
            ))}
            <Link href="/natal-chart" onClick={close} className="py-3 border-b border-gray-100 inline-flex items-center gap-2 font-semibold" style={CINZEL}>
              <span className="text-amber-400">✦</span>
              <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-500 bg-clip-text text-transparent">Pet Natal Chart</span>
            </Link>
            <Link href="/about" onClick={close} className="py-3 border-b border-gray-100 hover:text-emerald-600 transition-colors">
              About
            </Link>
            <Link
              href="/insurance"
              onClick={close}
              className="mt-4 mb-2 bg-emerald-600 text-white text-center font-semibold px-4 py-3 rounded-full hover:bg-emerald-700 transition-colors"
            >
              Free Insurance Quote
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
