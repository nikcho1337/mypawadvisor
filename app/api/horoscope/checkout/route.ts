import Stripe from "stripe";
import { CURRENCY, priceCents } from "@/lib/horoscope-pricing";

// One-time Stripe Checkout Session for unlocking the PDF keepsake download.
// Test mode: set STRIPE_SECRET_KEY=sk_test_... in .env.local.
export async function POST(request: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return Response.json(
      { error: "Stripe is not configured. Add STRIPE_SECRET_KEY to .env.local." },
      { status: 500 }
    );
  }

  const stripe = new Stripe(key);

  let body: { personalized?: boolean; petName?: string } = {};
  try { body = await request.json(); } catch { /* empty body ok */ }

  const personalized = !!body.personalized;
  const petName = (body.petName ?? "").toString().slice(0, 80);
  const origin =
    request.headers.get("origin") ??
    process.env.NEXT_PUBLIC_BASE_URL ??
    "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: CURRENCY,
            unit_amount: priceCents(personalized),
            product_data: {
              name: personalized
                ? "Personalized Pet Natal Chart — PDF"
                : "Pet Natal Chart — PDF",
              description: petName ? `Cosmic PDF for ${petName}` : undefined,
            },
          },
        },
      ],
      success_url: `${origin}/natal-chart?paid={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/natal-chart?canceled=1`,
      metadata: { personalized: personalized ? "1" : "0", petName },
    });

    return Response.json({ url: session.url });
  } catch (err: any) {
    return Response.json({ error: err?.message ?? "Stripe error" }, { status: 500 });
  }
}
