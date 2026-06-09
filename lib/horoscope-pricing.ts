// Single source of truth for keepsake pricing (used by both the client page and the
// server checkout route). Test-mode friendly; adjust freely.
export const CURRENCY = "usd";
export const STANDARD_CENTS = 699;   // standard PDF natal chart
export const PREMIUM_CENTS = 999;    // personalized (edited wording) keepsake

export function priceCents(personalized: boolean): number {
  return personalized ? PREMIUM_CENTS : STANDARD_CENTS;
}
export function formatUsd(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
