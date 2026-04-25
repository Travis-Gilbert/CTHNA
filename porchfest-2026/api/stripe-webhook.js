import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const FORMSPREE_VENDOR =
  process.env.FORMSPREE_VENDOR_URL || 'https://formspree.io/f/mbdzblrb';

// Stripe signs the request body byte-for-byte; we MUST use raw bytes for
// signature verification. Disable Vercel's automatic body parsing.
export const config = {
  api: { bodyParser: false },
};

async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  if (!process.env.STRIPE_SECRET_KEY || !webhookSecret) {
    console.error('Missing Stripe env vars (STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET)');
    return res.status(500).send('Stripe webhook not configured.');
  }

  let event;
  try {
    const rawBody = await readRawBody(req);
    const sig = req.headers['stripe-signature'];
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err?.message);
    return res.status(400).send(`Webhook Error: ${err?.message || 'invalid'}`);
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      // Only fulfill paid sessions. Keep this idempotent: posting twice to
      // Formspree is harmless because Stripe sends each event ID once we
      // return 2xx.
      if (session.payment_status === 'paid') {
        const amountTotal = typeof session.amount_total === 'number' ? session.amount_total : 0;
        const payload = {
          ...(session.metadata || {}),
          stripeSessionId: session.id,
          stripePaymentIntent: session.payment_intent,
          amountPaid: amountTotal / 100,
          currency: (session.currency || 'usd').toUpperCase(),
          email:
            session.customer_details?.email ||
            session.customer_email ||
            (session.metadata && session.metadata.email) ||
            '',
          paidAt: new Date().toISOString(),
          paymentStatus: session.payment_status,
        };

        try {
          const formRes = await fetch(FORMSPREE_VENDOR, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify(payload),
          });
          if (!formRes.ok) {
            console.error('Formspree post non-OK:', formRes.status, await formRes.text().catch(() => ''));
          }
        } catch (e) {
          // Don't fail the webhook -- Stripe Dashboard remains the record of
          // truth. Logged so we can backfill manually if Formspree was down.
          console.error('Formspree post failed:', e);
        }
      }
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error('Webhook handler error:', err);
    return res.status(500).send('Webhook handler failure.');
  }
}
