import { C, serif, sans, mono } from '../tokens';
import { CATEGORIES, accentColor, accentDim, VENDOR_TIERS } from '../porchfest-data';
import VendorTierPicker from './VendorTierPicker';

/* ── Display helpers ── */

function ShortField({ label, value }) {
  if (!value) return null;
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ ...mono, fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: C.inkLight, marginBottom: 2 }}>
        {label}
      </div>
      <div style={{ ...sans, fontSize: 14, color: C.ink, lineHeight: 1.5 }}>
        {value}
      </div>
    </div>
  );
}

function LongField({ label, value, accent }) {
  if (!value) return null;
  return (
    <div style={{
      gridColumn: '1 / -1',
      marginBottom: 12,
      padding: '14px 16px',
      borderRadius: 8,
      background: C.cream,
      borderLeft: `3px solid ${accent}`,
    }}>
      <div style={{ ...mono, fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: C.inkLight, marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ ...sans, fontSize: 14, color: C.ink, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
        {value}
      </div>
    </div>
  );
}

function ChipList({ label, values }) {
  if (!values || values.length === 0) return null;
  return (
    <div style={{ gridColumn: '1 / -1', marginBottom: 12 }}>
      <div style={{ ...mono, fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: C.inkLight, marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {values.map(v => (
          <span key={v} style={{
            ...sans,
            fontSize: 13,
            padding: '4px 12px',
            borderRadius: 16,
            background: C.borderLight,
            color: C.ink,
          }}>
            {v}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Display name per category ── */
function getDisplayName(category, formData) {
  switch (category) {
    case 'musician': return formData.artistName;
    case 'vendor': return formData.businessName;
    case 'entertainer': return formData.actName;
    case 'other': return formData.orgName;
    default: return '';
  }
}

/* ── Readable labels for coded values ── */
function formatHistory(val) {
  if (val === 'first') return 'First time applying';
  if (val === 'returning') return 'Returning performer';
  return val;
}

function formatFlint(val) {
  if (val === 'yes') return 'Yes, Flint-based';
  if (val === 'nearby') return 'Nearby (Genesee County)';
  if (val === 'outside') return 'Outside the area';
  return val;
}

function formatPA(val) {
  if (val === 'yes') return 'Yes';
  if (val === 'no') return 'No';
  return val;
}

/* ── Vendor fee summary ── */
function feeForVendor(vendorTier, customAmount) {
  if (!vendorTier) return null;
  if (vendorTier === 'pay-what-you-can') {
    const n = Number(customAmount);
    if (!Number.isFinite(n) || n <= 0) return null;
    return { label: 'Pay What You Can', display: `$${n.toFixed(0)}` };
  }
  const t = VENDOR_TIERS.find((x) => x.id === vendorTier);
  return t ? { label: t.label, display: t.priceDisplay } : null;
}

export default function ReviewStep({
  category,
  formData,
  contact,
  agree,
  onAgree,
  errors,
  submitting,
  onSubmit,
  vendorTier,
  customAmount,
  onVendorTierChange,
  onCustomAmountChange,
}) {
  const catData = CATEGORIES.find(c => c.id === category);
  const accent = catData ? accentColor(catData.accent) : C.teal;
  const dim = catData ? accentDim(catData.accent) : C.tealDim;
  const Icon = catData?.icon;
  const displayName = getDisplayName(category, formData);
  const isVendor = category === 'vendor';
  const fee = isVendor ? feeForVendor(vendorTier, customAmount) : null;
  const submitLabel = isVendor
    ? submitting
      ? 'Starting checkout...'
      : fee
      ? `Pay ${fee.display} & Submit`
      : 'Pay & Submit'
    : submitting
    ? 'Submitting...'
    : 'Submit Application';

  return (
    <>
      {/* Header card */}
      <div style={{
        borderRadius: 12,
        overflow: 'hidden',
        border: `1px solid ${C.border}`,
        marginBottom: 24,
      }}>
        {/* Dark header with icon + display name */}
        <div style={{
          background: C.darkWarm,
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}>
          {Icon && (
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: dim,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Icon />
            </div>
          )}
          <div>
            <span style={{ ...serif, fontSize: 16, fontWeight: 700, color: C.heroText }}>
              {displayName || `${catData?.label} Application`}
            </span>
            {displayName && (
              <div style={{ ...mono, fontSize: 9, textTransform: 'uppercase', letterSpacing: '.1em', color: C.inkLight, marginTop: 2 }}>
                {catData?.label}
              </div>
            )}
          </div>
        </div>

        {/* Body: all fields */}
        <div style={{ padding: 20, background: C.surface }}>
          <div className="review-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px' }}>

            {/* Contact fields (all categories) */}
            <ShortField label="Contact" value={contact.name} />
            <ShortField label="Email" value={contact.email} />
            <ShortField label="Phone" value={contact.phone} />
            <ShortField label="City" value={contact.city} />

            {/* Divider */}
            <div style={{ gridColumn: '1 / -1', borderTop: `1px solid ${C.borderLight}`, marginTop: 4, marginBottom: 4 }} />

            {/* Musician */}
            {category === 'musician' && (
              <>
                <ShortField label="Artist / Band" value={formData.artistName} />
                <ShortField label="Genre" value={formData.genre} />
                <ShortField label="Band Size" value={formData.bandSize} />
                <ShortField label="30-Min Set" value={formatPA(formData.canDoThirty)} />
                <ShortField label="Porchfest History" value={formatHistory(formData.porchfestHistory)} />
                <ShortField label="Flint-Based" value={formatFlint(formData.flintBased)} />
                <ShortField label="Music Link" value={formData.musicLink} />
                <ShortField label="Second Link" value={formData.musicLink2} />
                <ShortField label="Own PA" value={formatPA(formData.ownPA)} />
                <ChipList label="Equipment Needs" values={formData.equipment} />
                <LongField label="Bio" value={formData.bio} accent={accent} />
                <LongField label="Accessibility Needs" value={formData.accessNeeds} accent={accent} />
              </>
            )}

            {/* Vendor */}
            {category === 'vendor' && (
              <>
                <ShortField label="Business Name" value={formData.businessName} />
                <ShortField label="Footprint" value={formData.footprint} />
                <ShortField label="Instagram / Website" value={formData.vendorLink} />
                <ShortField label="Vended Before" value={formatPA(formData.vendedBefore)} />
                <ChipList label="Vendor Type" values={formData.foodType} />
                <ChipList label="On-Site Needs" values={formData.vendorNeeds} />
                <LongField label="Food Description" value={formData.foodDescription} accent={accent} />
              </>
            )}

            {/* Entertainer */}
            {category === 'entertainer' && (
              <>
                <ShortField label="Act Name" value={formData.actName} />
                <ShortField label="Work Link" value={formData.workLink} />
                <ChipList label="Act Type" values={formData.actType} />
                <LongField label="Act Description" value={formData.actDescription} accent={accent} />
              </>
            )}

            {/* Other */}
            {category === 'other' && (
              <>
                <ShortField label="Name / Org" value={formData.orgName} />
                <ShortField label="Links" value={formData.otherLinks} />
                <LongField label="Proposal" value={formData.proposal} accent={accent} />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Vendor fee tier (vendors only) */}
      {isVendor && (
        <VendorTierPicker
          selectedTier={vendorTier}
          customAmount={customAmount}
          onTierChange={onVendorTierChange}
          onCustomAmountChange={onCustomAmountChange}
          errors={errors}
          accent={accent}
        />
      )}

      {/* Consent */}
      <label style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        padding: 16,
        borderRadius: 8,
        border: `1px solid ${errors.agree ? C.error : C.border}`,
        background: C.surface,
        cursor: 'pointer',
        marginBottom: 16,
      }}>
        <input
          type="checkbox"
          checked={agree}
          onChange={e => onAgree(e.target.checked)}
          style={{ marginTop: 3, accentColor: accent, width: 22, height: 22, minWidth: 22 }}
        />
        <span style={{ ...sans, fontSize: 13, color: C.inkMuted, lineHeight: 1.6 }}>
          I confirm the information above is accurate. I understand that submitting an application does not guarantee selection.
          Carriage Town Porchfest may use submitted materials for event promotion.
        </span>
      </label>
      {errors.agree && (
        <p role="alert" aria-live="polite" style={{ ...sans, fontSize: 13, color: C.error, marginBottom: 12 }}>
          {errors.agree}
        </p>
      )}

      {/* Flint priority note */}
      <div style={{
        padding: '14px 16px',
        borderRadius: 8,
        background: C.tealDim,
        border: `1px solid ${C.teal}22`,
        marginBottom: 24,
      }}>
        <p style={{ ...sans, fontSize: 13, color: C.teal, lineHeight: 1.6 }}>
          Flint-based artists and community members receive priority consideration.
          If you are based in Flint or Genesee County, we want to hear from you.
        </p>
      </div>

      {errors.submit && (
        <p role="alert" aria-live="polite" style={{ ...sans, fontSize: 14, color: C.error, marginBottom: 12, padding: '12px 16px', background: 'rgba(164,74,58,.08)', borderRadius: 8 }}>
          {errors.submit}
        </p>
      )}

      <button
        onClick={onSubmit}
        disabled={submitting}
        style={{
          ...mono,
          display: 'block',
          width: '100%',
          padding: '16px 32px',
          borderRadius: 8,
          border: 'none',
          background: submitting ? C.inkLight : accent,
          color: '#fff',
          fontSize: 12,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '.12em',
          cursor: submitting ? 'not-allowed' : 'pointer',
          transition: 'background .2s',
        }}
      >
        {submitLabel}
      </button>

      {isVendor && (
        <p
          style={{
            ...sans,
            fontSize: 12,
            color: C.inkLight,
            marginTop: 12,
            textAlign: 'center',
            lineHeight: 1.5,
          }}
        >
          Secure payment by Stripe. We never see your card details.
        </p>
      )}
    </>
  );
}
