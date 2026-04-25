import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { C, serif, sans, mono } from '../tokens';
import { CATEGORIES, accentColor, VENDOR_TIERS } from '../porchfest-data';
import CategorySelect from '../form/CategorySelect';
import ApplicationForm from '../form/ApplicationForm';
import ReviewStep from '../form/ReviewStep';
import SuccessScreen from '../form/SuccessScreen';

const STORAGE_KEY = 'porchfest-2026-application';
const FORMSPREE = 'https://formspree.io/f/mbdzblrb';
const STRIPE_CHECKOUT_ENDPOINT = '/api/create-checkout-session';

function getInitialState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return null;
}

export default function Apply() {
  const [searchParams] = useSearchParams();
  const saved = getInitialState();

  const [stage, setStage] = useState(saved?.stage || 'category');
  const [category, setCategory] = useState(saved?.category || null);
  const [formData, setFormData] = useState(saved?.formData || {});
  const [contact, setContact] = useState(saved?.contact || { name: '', email: '', phone: '', city: '' });
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [vendorTier, setVendorTier] = useState(saved?.vendorTier || '');
  const [customAmount, setCustomAmount] = useState(saved?.customAmount || '');

  // URL param pre-selection
  useEffect(() => {
    if (!saved) {
      const cat = searchParams.get('cat');
      if (cat && CATEGORIES.some(c => c.id === cat)) {
        setCategory(cat);
        setStage('form');
      }
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (stage === 'done') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        stage, category, formData, contact, vendorTier, customAmount,
      }));
    } catch {}
  }, [stage, category, formData, contact, vendorTier, customAmount]);

  // Scroll to top on stage change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [stage]);

  const updateField = useCallback((key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setErrors(prev => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const updateContact = useCallback((key, value) => {
    setContact(prev => ({ ...prev, [key]: value }));
    setErrors(prev => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const validateForm = () => {
    const errs = {};
    const d = formData;

    // Contact validation
    if (!contact.name) errs.name = 'Required';
    if (!contact.email) errs.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) errs.email = 'Enter a valid email';

    // Category-specific validation
    if (category === 'musician') {
      if (!d.musicLink) errs.musicLink = 'Please add a music link';
      if (!d.artistName) errs.artistName = 'Required';
      if (!d.genre) errs.genre = 'Pick a genre';
      if (!d.bio?.trim()) errs.bio = 'Tell us about yourself';
      if (!d.porchfestHistory) errs.porchfestHistory = 'Required';
      if (!d.canDoThirty) errs.canDoThirty = 'Required';
    }
    if (category === 'vendor') {
      if (!d.businessName) errs.businessName = 'Required';
      if (!d.foodDescription) errs.foodDescription = 'Tell us what you serve';
    }
    if (category === 'entertainer') {
      if (!d.actName) errs.actName = 'Required';
      if (!d.actDescription) errs.actDescription = 'Tell us about your act';
    }
    if (category === 'other') {
      if (!d.orgName) errs.orgName = 'Required';
      if (!d.proposal) errs.proposal = 'Tell us your idea';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const scrollToFirstError = () => {
    requestAnimationFrame(() => {
      const firstError = document.querySelector('[role="alert"]');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  };

  const handleReview = () => {
    if (!validateForm()) {
      scrollToFirstError();
      return;
    }
    setStage('review');
  };

  const handleBack = () => {
    setErrors({});
    if (stage === 'review') {
      setStage('form');
    } else if (stage === 'form') {
      setStage('category');
      setCategory(null);
    }
  };

  const validateVendorPayment = () => {
    const errs = {};
    if (!vendorTier) {
      errs.tier = 'Pick a vendor option';
      return errs;
    }
    if (vendorTier === 'pay-what-you-can') {
      const n = Number(customAmount);
      if (!Number.isFinite(n) || n < 1) {
        errs.customAmount = 'Enter at least $1';
      }
    }
    return errs;
  };

  const handleSubmit = async () => {
    if (!agree) {
      setErrors({ agree: 'You must agree to continue' });
      return;
    }

    // Vendors go through Stripe Checkout; webhook posts to Formspree on paid event.
    if (category === 'vendor') {
      const vErrs = validateVendorPayment();
      if (Object.keys(vErrs).length > 0) {
        setErrors(vErrs);
        scrollToFirstError();
        return;
      }

      setSubmitting(true);
      try {
        const customAmountCents =
          vendorTier === 'pay-what-you-can'
            ? Math.round(Number(customAmount) * 100)
            : null;

        const res = await fetch(STRIPE_CHECKOUT_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            tier: vendorTier,
            customAmountCents,
            applicantData: {
              category,
              ...contact,
              ...formData,
              submittedAt: new Date().toISOString(),
            },
          }),
        });

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          setErrors({ submit: body?.error || 'Could not start checkout. Please try again.' });
          setSubmitting(false);
          return;
        }

        const { url } = await res.json();
        if (!url) {
          setErrors({ submit: 'Checkout session missing redirect URL.' });
          setSubmitting(false);
          return;
        }

        // Redirect to Stripe-hosted checkout. localStorage is cleared on /apply/thanks.
        window.location.href = url;
        return;
      } catch {
        setErrors({ submit: 'Network error. Please check your connection.' });
        setSubmitting(false);
        return;
      }
    }

    // Non-vendors: existing Formspree-only path.
    setSubmitting(true);
    try {
      const payload = {
        category,
        ...formData,
        ...contact,
        submittedAt: new Date().toISOString(),
      };
      const res = await fetch(FORMSPREE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        localStorage.removeItem(STORAGE_KEY);
        setStage('done');
      } else {
        setErrors({ submit: 'Something went wrong. Please try again.' });
      }
    } catch {
      setErrors({ submit: 'Network error. Please check your connection.' });
    }
    setSubmitting(false);
  };

  const handleStartOver = () => {
    localStorage.removeItem(STORAGE_KEY);
    setStage('category');
    setCategory(null);
    setFormData({});
    setContact({ name: '', email: '', phone: '', city: '' });
    setAgree(false);
    setErrors({});
    setVendorTier('');
    setCustomAmount('');
  };

  const handleVendorTierChange = useCallback((id) => {
    setVendorTier(id);
    setErrors((prev) => {
      const next = { ...prev };
      delete next.tier;
      delete next.customAmount;
      return next;
    });
  }, []);

  const handleCustomAmountChange = useCallback((val) => {
    setCustomAmount(val);
    setErrors((prev) => {
      const next = { ...prev };
      delete next.customAmount;
      return next;
    });
  }, []);

  const handleSelectCategory = (id) => {
    setCategory(id);
  };

  const handleStartForm = () => {
    if (category) {
      setStage('form');
    }
  };

  if (stage === 'done') {
    return <SuccessScreen name={contact.name} />;
  }

  if (stage === 'category') {
    return (
      <CategorySelect
        selected={category}
        onSelect={handleSelectCategory}
        onStart={handleStartForm}
      />
    );
  }

  const catData = CATEGORIES.find(c => c.id === category);
  const accent = catData ? accentColor(catData.accent) : C.teal;

  return (
    <div style={{ minHeight: '100vh', background: C.paper, paddingTop: 80 }}>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 clamp(20px,5vw,40px)' }}>
        {/* Category badge + start over */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div style={{
            ...mono,
            fontSize: 10,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '.1em',
            color: accent,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            {catData && <catData.icon />}
            {catData?.label}
          </div>
          <button
            onClick={handleStartOver}
            style={{
              ...mono,
              fontSize: 9,
              textTransform: 'uppercase',
              letterSpacing: '.1em',
              color: C.inkLight,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Start Over
          </button>
        </div>

        <div style={{ paddingBottom: 80 }}>
          {stage === 'form' && (
            <ApplicationForm
              category={category}
              formData={formData}
              contact={contact}
              onFieldChange={updateField}
              onContactChange={updateContact}
              errors={errors}
            />
          )}
          {stage === 'review' && (
            <ReviewStep
              category={category}
              formData={formData}
              contact={contact}
              agree={agree}
              onAgree={setAgree}
              errors={errors}
              submitting={submitting}
              onSubmit={handleSubmit}
              vendorTier={vendorTier}
              customAmount={customAmount}
              onVendorTierChange={handleVendorTierChange}
              onCustomAmountChange={handleCustomAmountChange}
            />
          )}

          {/* Nav buttons (form stage only; review has its own submit) */}
          {stage === 'form' && (
            <div className="form-nav" style={{ display: 'flex', gap: 12, marginTop: 32 }}>
              <button
                onClick={handleBack}
                style={{
                  ...mono,
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '.1em',
                  padding: '14px 28px',
                  borderRadius: 8,
                  border: `1.5px solid ${C.border}`,
                  background: 'transparent',
                  color: C.inkMuted,
                  cursor: 'pointer',
                }}
              >
                Back
              </button>
              <button
                onClick={handleReview}
                style={{
                  ...mono,
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '.1em',
                  padding: '14px 28px',
                  borderRadius: 8,
                  border: 'none',
                  background: accent,
                  color: '#fff',
                  cursor: 'pointer',
                  flex: 1,
                }}
              >
                Review Application
              </button>
            </div>
          )}

          {/* Back button on review */}
          {stage === 'review' && (
            <button
              onClick={handleBack}
              style={{
                ...mono,
                display: 'block',
                width: '100%',
                marginTop: 12,
                padding: '12px 28px',
                borderRadius: 8,
                border: `1.5px solid ${C.border}`,
                background: 'transparent',
                color: C.inkMuted,
                fontSize: 11,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '.1em',
                cursor: 'pointer',
              }}
            >
              Edit Application
            </button>
          )}
        </div>
      </div>
      <style>{`
        @media(max-width:640px){
          input,textarea,select{font-size:16px!important}
          .form-nav{
            position:sticky;
            bottom:0;
            background:${C.paper};
            padding:16px 20px;
            border-top:1px solid ${C.border};
            margin:0 -clamp(20px,5vw,40px);
            padding-left:clamp(20px,5vw,40px);
            padding-right:clamp(20px,5vw,40px);
            padding-bottom:max(16px,env(safe-area-inset-bottom));
            z-index:10;
          }
          .form-grid-2{grid-template-columns:1fr!important}
          .review-grid{grid-template-columns:1fr!important}
        }
      `}</style>
    </div>
  );
}
