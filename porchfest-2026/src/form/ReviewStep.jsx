import { C, serif, sans, mono } from '../tokens';
import { CATEGORIES, accentColor, accentDim } from '../porchfest-data';

function SummaryRow({ label, value }) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null;
  const display = Array.isArray(value) ? value.join(', ') : value;
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ ...mono, fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: C.inkLight, marginBottom: 2 }}>
        {label}
      </div>
      <div style={{ ...sans, fontSize: 14, color: C.ink, lineHeight: 1.5 }}>
        {display}
      </div>
    </div>
  );
}

export default function ReviewStep({ category, formData, contact, agree, onAgree, errors, submitting, onSubmit }) {
  const catData = CATEGORIES.find(c => c.id === category);
  const accent = catData ? accentColor(catData.accent) : C.teal;
  const dim = catData ? accentDim(catData.accent) : C.tealDim;
  const Icon = catData?.icon;

  return (
    <>
      {/* Header card */}
      <div style={{
        borderRadius: 12,
        overflow: 'hidden',
        border: `1px solid ${C.border}`,
        marginBottom: 24,
      }}>
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
          <span style={{ ...serif, fontSize: 16, fontWeight: 700, color: C.heroText }}>
            {catData?.label} Application
          </span>
        </div>

        <div style={{ padding: '20px', background: C.surface }}>
          <div className="review-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px' }}>
            {/* Category-specific fields */}
            {category === 'musician' && (
              <>
                <SummaryRow label="Artist / Band" value={formData.artistName} />
                <SummaryRow label="Genre" value={formData.genre} />
                <SummaryRow label="Band Size" value={formData.bandSize} />
                <SummaryRow label="Music Link" value={formData.musicLink} />
                <SummaryRow label="Second Link" value={formData.musicLink2} />
                <SummaryRow label="History" value={formData.history} />
                <SummaryRow label="Set Length" value={formData.setLength ? `${formData.setLength} min` : ''} />
                <SummaryRow label="Equipment" value={formData.equipment} />
                <SummaryRow label="Own PA" value={formData.ownPA} />
              </>
            )}
            {category === 'vendor' && (
              <>
                <SummaryRow label="Business" value={formData.businessName} />
                <SummaryRow label="Food Type" value={formData.foodType} />
                <SummaryRow label="Footprint" value={formData.footprint} />
                <SummaryRow label="Needs" value={formData.vendorNeeds} />
                <SummaryRow label="Vended Before" value={formData.vendedBefore} />
              </>
            )}
            {category === 'entertainer' && (
              <>
                <SummaryRow label="Act Name" value={formData.actName} />
                <SummaryRow label="Act Type" value={formData.actType} />
                <SummaryRow label="Work Link" value={formData.workLink} />
              </>
            )}
            {category === 'other' && (
              <>
                <SummaryRow label="Name / Org" value={formData.orgName} />
                <SummaryRow label="Links" value={formData.otherLinks} />
              </>
            )}

            {/* Bio / description fields (full width) */}
            <div style={{ gridColumn: '1 / -1' }}>
              {category === 'musician' && <SummaryRow label="Bio" value={formData.bio} />}
              {category === 'vendor' && <SummaryRow label="Description" value={formData.foodDescription} />}
              {category === 'entertainer' && <SummaryRow label="Description" value={formData.actDescription} />}
              {category === 'other' && <SummaryRow label="Proposal" value={formData.proposal} />}
            </div>

            {/* Contact */}
            <div style={{ gridColumn: '1 / -1', borderTop: `1px solid ${C.borderLight}`, paddingTop: 12, marginTop: 4 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px' }}>
                <SummaryRow label="Name" value={contact.name} />
                <SummaryRow label="Email" value={contact.email} />
                <SummaryRow label="Phone" value={contact.phone} />
                <SummaryRow label="City" value={contact.city} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Consent */}
      <label style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        padding: '16px',
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
          style={{ marginTop: 3, accentColor: accent }}
        />
        <span style={{ ...sans, fontSize: 13, color: C.inkMuted, lineHeight: 1.6 }}>
          I confirm the information above is accurate. I understand that submitting an application does not guarantee selection. Carriage Town Porchfest may use submitted materials for event promotion.
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
          Flint-based artists and community members receive priority consideration. If you are based in Flint or Genesee County, we want to hear from you.
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
        {submitting ? 'Submitting...' : 'Submit Application'}
      </button>
    </>
  );
}
