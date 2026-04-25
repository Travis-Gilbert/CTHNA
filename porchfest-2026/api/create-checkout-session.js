import Stripe from 'stripe';

// Server-side Stripe client. STRIPE_SECRET_KEY is set by the
// Vercel Stripe integration in Project -> Settings -> Environment Variables.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Mirrors src/porchfest-data.jsx VENDOR_TIERS. Kept server-side so clients
// cannot redefine prices.
const TIERS = {
  'food-truck': { name: 'Porchfest 2026 vendor fee — Food Truck', amountCents: 7500 },
  'pop-up': { name: 'Porchfest 2026 vendor fee — Pop-up / Tent', amountCents: 2500 },
};

const PWYC_KEY = 'pay-what-you-can';
const PWYC_MIN_CENTS = 100; // $1 -- Stripe Checkout minimum is $0.50 USD

/**
 * Trim and serialize fields so each metadata value stays under Stripe's
 * 500-char-per-key limit. Stripe also caps total metadata at 50 keys.
 */
function sanitizeMetadata(obj) {
  const out = {};
  let count = 0;
  for (const [k, v] of Object.entries(obj || {})) {
    if (count >= 45) break;
    if (v == null || v === '') continue;
    const s = typeof v === 'string' ? v : JSON.stringify(v);
    out[k] = s.length > 500 ? `${s.slice(0, 497)}...` : s;
    count += 1;
  }
  return out;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('Missing STRIPE_SECRET_KEY env var');
    return res.status(500).json({ error: 'Stripe is not configured.' });
  }

  try {
    const { tier, customAmountCents, applicantData } = req.body || {};

    let lineItem;
    let amountCents;
    let tierLabel;

    if (tier === PWYC_KEY) {
      const amt = Number(customAmountCents);
      if (!Number.isInteger(amt) || amt < PWYC_MIN_CENTS) {
        return res
          .status(400)
          .json({ error: 'Pay-what-you-can amount must be at least $1.' });
      }
      amountCents = amt;
      tierLabel = 'Pay What You Can';
      lineItem = {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Porchfest 2026 vendor fee — Pay what you can',
          },
          unit_amount: amt,
        },
        quantity: 1,
      };
    } else {
      const t = TIERS[tier];
      if (!t) {
        return res.status(400).json({ error: 'Invalid vendor tier.' });
      }
      amountCents = t.amountCents;
      tierLabel = t.name;
      lineItem = {
        price_data: {
          currency: 'usd',
          product_data: { name: t.name },
          unit_amount: t.amountCents,
        },
        quantity: 1,
      };
    }

    const email =
      typeof applicantData?.email === 'string' && applicantData.email.trim()
        ? applicantData.email.trim()
        : undefined;

    const metadata = sanitizeMetadata({
      tier,
      tierLabel,
      amountCents: String(amountCents),
      ...applicantData,
    });

    const origin =
      req.headers.origin ||
      (req.headers.host ? `https://${req.headers.host}` : 'https://porchfest-2026.vercel.app');

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [lineItem],
      customer_email: email,
      metadata,
      success_url: `${origin}/apply/thanks?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/apply/thanks?canceled=1`,
    });

    return res.status(200).json({ url: session.url, id: session.id });
  } catch (err) {
    console.error('create-checkout-session error', err);
    const msg =
      err && typeof err.message === 'string'
        ? err.message
        : 'Could not start checkout.';
    return res.status(500).json({ error: msg });
  }
}
