import { C, serif, sans } from '../tokens';
import { FOOD_TYPES, VENDOR_NEEDS } from '../porchfest-data';
import Field from './field/Field';
import TInput from './field/TInput';
import TTextarea from './field/TTextarea';
import RadioCard from './field/RadioCard';
import CheckChip from './field/CheckChip';

export default function VendorSteps({ step, data, onChange, errors }) {
  const toggleChip = (key, val) => {
    const arr = data[key] || [];
    onChange(key, arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]);
  };

  if (step === 0) {
    return (
      <>
        <h2 style={{ ...serif, fontSize: 24, fontWeight: 800, color: C.ink, marginBottom: 4 }}>Your food</h2>
        <p style={{ ...sans, fontSize: 14, color: C.inkMuted, marginBottom: 24 }}>Tell us what you serve.</p>

        <Field label="Business name *" htmlFor="businessName" error={errors.businessName}>
          <TInput id="businessName" value={data.businessName} onChange={v => onChange('businessName', v)} placeholder="Your business or brand name" />
        </Field>
        <Field label="What do you serve? *" htmlFor="foodDescription" error={errors.foodDescription}>
          <TTextarea id="foodDescription" value={data.foodDescription} onChange={v => onChange('foodDescription', v)} placeholder="Describe your menu or offerings" rows={4} />
        </Field>
        <Field label="Type of food" hint="Select all that apply">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {FOOD_TYPES.map(type => (
              <CheckChip key={type} name="foodType" value={type} checked={(data.foodType || []).includes(type)} onChange={v => toggleChip('foodType', v)} label={type} />
            ))}
          </div>
        </Field>
        <Field label="Social media / website" htmlFor="vendorLink">
          <TInput id="vendorLink" value={data.vendorLink} onChange={v => onChange('vendorLink', v)} placeholder="https://" />
        </Field>
      </>
    );
  }

  if (step === 1) {
    return (
      <>
        <h2 style={{ ...serif, fontSize: 24, fontWeight: 800, color: C.ink, marginBottom: 4 }}>Setup details</h2>
        <p style={{ ...sans, fontSize: 14, color: C.inkMuted, marginBottom: 24 }}>Help us plan your space.</p>

        <Field label="Space footprint" hint="Approximate size of your setup (e.g., 10x10 tent, food truck)" htmlFor="footprint">
          <TInput id="footprint" value={data.footprint} onChange={v => onChange('footprint', v)} placeholder="e.g., 10x10 tent, food truck" />
        </Field>
        <Field label="On-site needs" hint="Select all that apply">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {VENDOR_NEEDS.map(need => (
              <CheckChip key={need} name="vendorNeeds" value={need} checked={(data.vendorNeeds || []).includes(need)} onChange={v => toggleChip('vendorNeeds', v)} label={need} />
            ))}
          </div>
        </Field>
        <Field label="Have you vended at Porchfest before?">
          <div style={{ display: 'flex', gap: 8 }}>
            <RadioCard name="vendedBefore" value="yes" checked={data.vendedBefore === 'yes'} onChange={v => onChange('vendedBefore', v)} label="Yes" />
            <RadioCard name="vendedBefore" value="no" checked={data.vendedBefore === 'no'} onChange={v => onChange('vendedBefore', v)} label="No" />
          </div>
        </Field>
      </>
    );
  }

  return null;
}
