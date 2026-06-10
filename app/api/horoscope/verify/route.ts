import Stripe from "stripe";

// Verifies a Checkout Session was actually paid before the client unlocks the PDF.
export async function GET(request: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return Response.json({ paid: false, error: "Stripe not configured" }, { status: 500 });
  }
  const id = new URL(request.url).searchParams.get("session_id");
  if (!id) return Response.json({ paid: false, error: "Missing session_id" }, { status: 400 });

  const stripe = new Stripe(key);
  try {
    const session = await stripe.checkout.sessions.retrieve(id);
    return Response.json({
      // "no_payment_required" = session completed with a 100% promo code (no PaymentIntent).
      paid: session.payment_status === "paid" || session.payment_status === "no_payment_required",
      personalized: session.metadata?.personalized === "1",
    });
  } catch (err: any) {
    return Response.json({ paid: false, error: err?.message ?? "Stripe error" }, { status: 500 });
  }
}
