import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { C, serif, sans, mono } from '../tokens';
import { CATEGORIES, accentColor, accentBright, accentDim } from '../porchfest-data';
import CategorySelect from '../form/CategorySelect';
import StepDots from '../form/StepDots';
import MusicianSteps from '../form/MusicianSteps';
import VendorSteps from '../form/VendorSteps';
import EntertainerStep from '../form/EntertainerStep';
import OtherStep from '../form/OtherStep';
import ContactStep from '../form/ContactStep';
import ReviewStep from '../form/ReviewStep';
import SuccessScreen from '../form/SuccessScreen';

const STORAGE_KEY = 'porchfest-2026-application';
const FORMSPREE = 'https://formspree.io/f/mbdzblrb';

const STEP_COUNTS = { musician: 3, vendor: 2, entertainer: 1, other: 1 };

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
  const [innerStep, setInnerStep] = useState(saved?.innerStep || 0);
  const [formData, setFormData] = useState(saved?.formData || {});
  const [contact, setContact] = useState(saved?.contact || { name: '', email: '', phone: '', city: '' });
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

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
        stage, category, innerStep, formData, contact,
      }));
    } catch {}
  }, [stage, category, innerStep, formData, contact]);

  // Scroll to top on stage/step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [stage, innerStep]);

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
    if (stage === 'form') {
      if (category === 'musician') {
        if (innerStep === 0) {
          if (!formData.musicLink) errs.musicLink = 'Please add a music link';
          if (!formData.artistName) errs.artistName = 'Required';
          if (!formData.genre) errs.genre = 'Pick a genre';
        }
        if (innerStep === 1) {
          if (!formData.bio) errs.bio = 'Tell us about yourself';
        }
        if (innerStep === 2) {
          if (!formData.setLength) errs.setLength = 'Pick a set length';
        }
      }
      if (category === 'vendor') {
        if (innerStep === 0) {
          if (!formData.businessName) errs.businessName = 'Required';
          if (!formData.foodDescription) errs.foodDescription = 'Tell us what you serve';
        }
      }
      if (category === 'entertainer') {
        if (!formData.actName) errs.actName = 'Required';
        if (!formData.actDescription) errs.actDescription = 'Tell us about your act';
      }
      if (category === 'other') {
        if (!formData.orgName) errs.orgName = 'Required';
        if (!formData.proposal) errs.proposal = 'Tell us your idea';
      }
    }
    if (stage === 'contact') {
      if (!contact.name) errs.name = 'Required';
      if (!contact.email) errs.email = 'Required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) errs.email = 'Enter a valid email';
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

  const handleNext = () => {
    if (!validateForm()) {
      scrollToFirstError();
      return;
    }
    if (stage === 'form') {
      const maxStep = STEP_COUNTS[category] - 1;
      if (innerStep < maxStep) {
        setInnerStep(innerStep + 1);
      } else {
        setStage('contact');
      }
    } else if (stage === 'contact') {
      setStage('review');
    }
  };

  const handleBack = () => {
    setErrors({});
    if (stage === 'review') {
      setStage('contact');
    } else if (stage === 'contact') {
      setStage('form');
      setInnerStep(STEP_COUNTS[category] - 1);
    } else if (stage === 'form' && innerStep > 0) {
      setInnerStep(innerStep - 1);
    } else {
      setStage('category');
      setCategory(null);
      setInnerStep(0);
    }
  };

  const handleSubmit = async () => {
    if (!agree) {
      setErrors({ agree: 'You must agree to continue' });
      return;
    }
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
    setInnerStep(0);
    setFormData({});
    setContact({ name: '', email: '', phone: '', city: '' });
    setAgree(false);
    setErrors({});
  };

  const handleSelectCategory = (id) => {
    setCategory(id);
  };

  const handleStartForm = () => {
    if (category) {
      setStage('form');
      setInnerStep(0);
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

  // Total steps for dots: form steps + contact + review
  const totalSteps = STEP_COUNTS[category] + 2;
  let currentStep;
  if (stage === 'form') currentStep = innerStep;
  else if (stage === 'contact') currentStep = STEP_COUNTS[category];
  else if (stage === 'review') currentStep = STEP_COUNTS[category] + 1;

  const catData = CATEGORIES.find(c => c.id === category);
  const accent = catData ? accentColor(catData.accent) : C.teal;

  const FormComponent = {
    musician: MusicianSteps,
    vendor: VendorSteps,
    entertainer: EntertainerStep,
    other: OtherStep,
  }[category];

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

        <StepDots total={totalSteps} current={currentStep} accent={accent} />

        <div style={{ marginTop: 32, paddingBottom: 80 }}>
          {stage === 'form' && FormComponent && (
            <FormComponent
              step={innerStep}
              data={formData}
              onChange={updateField}
              errors={errors}
            />
          )}
          {stage === 'contact' && (
            <ContactStep
              data={contact}
              onChange={updateContact}
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
            />
          )}

          {/* Nav buttons (not on review -- review has its own submit) */}
          {stage !== 'review' && (
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
                onClick={handleNext}
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
                Continue
              </button>
            </div>
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
