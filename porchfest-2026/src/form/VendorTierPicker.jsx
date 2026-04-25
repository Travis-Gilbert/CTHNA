import { C, serif, sans, mono } from '../tokens';
import { VENDOR_TIERS } from '../porchfest-data';

function TierCard({ tier, selected, onSelect, accent }) {
  const border = selected ? accent : C.border;
  const bg = selected ? `${accent}11` : C.surface;
  return (
    <button
      type="button"
      onClick={() => onSelect(tier.id)}
      style={{
        textAlign: 'left',
        padding: '14px 16px',
        borderRadius: 10,
        border: `1.5px solid ${border}`,
        background: bg,
        cursor: 'pointer',
        transition: 'all .2s',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
        width: '100%',
      }}
      aria-pressed={selected}
    >
      <span style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
        <span
          aria-hidden="true"
          style={{
            width: 18,
            height: 18,
            borderRadius: '50%',
            border: `2px solid ${selected ? accent : C.border}`,
            background: selected ? accent : 'transparent',
            flexShrink: 0,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {selected && (
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#fff',
              }}
            />
          )}
        </span>
        <span style={{ minWidth: 0 }}>
          <span
            style={{
              ...serif,
              fontSize: 15,
              fontWeight: 700,
              color: C.ink,
              display: 'block',
              lineHeight: 1.3,
            }}
          >
            {tier.label}
          </span>
          <span
            style={{
              ...sans,
              fontSize: 13,
              color: C.inkMuted,
              display: 'block',
              lineHeight: 1.4,
              marginTop: 2,
            }}
          >
            {tier.description}
          </span>
        </span>
      </span>
      <span
        style={{
          ...mono,
          fontSize: 14,
          fontWeight: 700,
          color: selected ? accent : C.ink,
          flexShrink: 0,
        }}
      >
        {tier.priceDisplay}
      </span>
    </button>
  );
}

export default function VendorTierPicker({
  selectedTier,
  customAmount,
  onTierChange,
  onCustomAmountChange,
  errors,
  accent,
}) {
  const isPWYC = selectedTier === 'pay-what-you-can';

  return (
    <div
      style={{
        padding: 20,
        borderRadius: 12,
        background: C.surface,
        border: `1px solid ${C.border}`,
        marginBottom: 16,
      }}
    >
      <div
        style={{
          ...mono,
          fontSize: 9,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '.12em',
          color: accent,
          marginBottom: 8,
        }}
      >
        Vendor Fee
      </div>
      <h3
        style={{
          ...serif,
          fontSize: 18,
          fontWeight: 800,
          color: C.ink,
          marginBottom: 4,
        }}
      >
        Pick your spot
      </h3>
      <p
        style={{
          ...sans,
          fontSize: 13,
          color: C.inkMuted,
          marginBottom: 16,
          lineHeight: 1.5,
        }}
      >
        Vendor fees support Porchfest infrastructure -- staging, sound, signage,
        and the block close. Your application is held until payment clears.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {VENDOR_TIERS.map((tier) => (
          <TierCard
            key={tier.id}
            tier={tier}
            selected={selectedTier === tier.id}
            onSelect={onTierChange}
            accent={accent}
          />
        ))}
      </div>

      {errors?.tier && (
        <p
          role="alert"
          aria-live="polite"
          style={{
            ...sans,
            fontSize: 13,
            color: C.error,
            marginTop: 10,
          }}
        >
          {errors.tier}
        </p>
      )}

      {isPWYC && (
        <div style={{ marginTop: 14 }}>
          <label
            htmlFor="customAmount"
            style={{
              ...mono,
              fontSize: 9,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '.1em',
              color: C.inkMuted,
              display: 'block',
              marginBottom: 6,
            }}
          >
            Amount (USD) *
          </label>
          <div style={{ position: 'relative' }}>
            <span
              aria-hidden="true"
              style={{
                ...sans,
                position: 'absolute',
                left: 14,
                top: '50%',
                transform: 'translateY(-50%)',
                color: C.inkMuted,
                fontSize: 15,
                pointerEvents: 'none',
              }}
            >
              $
            </span>
            <input
              id="customAmount"
              type="number"
              inputMode="decimal"
              min="1"
              step="1"
              value={customAmount}
              onChange={(e) => onCustomAmountChange(e.target.value)}
              placeholder="50"
              style={{
                ...sans,
                width: '100%',
                padding: '12px 14px 12px 28px',
                fontSize: 15,
                borderRadius: 8,
                border: `1.5px solid ${errors?.customAmount ? C.error : C.border}`,
                background: '#fff',
                color: C.ink,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
          {errors?.customAmount && (
            <p
              role="alert"
              aria-live="polite"
              style={{ ...sans, fontSize: 13, color: C.error, marginTop: 6 }}
            >
              {errors.customAmount}
            </p>
          )}
          <p
            style={{
              ...sans,
              fontSize: 12,
              color: C.inkLight,
              marginTop: 6,
              lineHeight: 1.5,
            }}
          >
            Enter any whole-dollar amount. Suggested: $25 (pop-up) or $75 (truck).
          </p>
        </div>
      )}
    </div>
  );
}
