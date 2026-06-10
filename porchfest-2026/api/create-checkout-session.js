const FORMSPREE_VENDOR =
  process.env.FORMSPREE_VENDOR_URL || 'https://formspree.io/f/mbdzblrb';

async function postVendorApplication(payload) {
  const formRes = await fetch(FORMSPREE_VENDOR, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!formRes.ok) {
    const text = await formRes.text().catch(() => '');
    throw new Error(`Formspree returned ${formRes.status}${text ? `: ${text}` : ''}`);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { applicantData } = req.body || {};
    if (!applicantData || typeof applicantData !== 'object') {
      return res.status(400).json({ error: 'Missing applicant data.' });
    }

    await postVendorApplication({
      category: 'vendor',
      ...applicantData,
      submittedAt: applicantData.submittedAt || new Date().toISOString(),
      submissionPath: 'legacy-checkout-endpoint',
      paymentRequired: 'false',
    });

    const origin =
      req.headers.origin ||
      (req.headers.host ? `https://${req.headers.host}` : 'https://porchfest-2026.vercel.app');

    return res.status(200).json({
      url: `${origin}/apply/thanks?submitted=1`,
      id: 'no-payment-required',
    });
  } catch (err) {
    console.error('legacy checkout endpoint submission error', err);
    const msg =
      err && typeof err.message === 'string'
        ? err.message
        : 'Could not submit application.';
    return res.status(502).json({ error: msg });
  }
}
