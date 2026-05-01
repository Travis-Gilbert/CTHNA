import { C, serif, sans } from '../tokens';
import { SETUP_NEEDS, FOOD_TYPES, VENDOR_NEEDS, ENT_TYPES } from '../porchfest-data';
import Field from './field/Field';
import TInput from './field/TInput';
import TTextarea from './field/TTextarea';
import TSelect from './field/TSelect';
import RadioCard from './field/RadioCard';
import CheckChip from './field/CheckChip';

const sectionHeading = {
  ...serif,
  fontSize: 20,
  fontWeight: 800,
  color: C.ink,
  marginBottom: 4,
};

const sectionSub = {
  ...sans,
  fontSize: 14,
  color: C.inkMuted,
  marginBottom: 24,
};

const divider = {
  height: 1,
  background: C.borderLight,
  margin: '28px 0',
};

export default function ApplicationForm({ category, formData, contact, onFieldChange, onContactChange, errors }) {
  const toggleChip = (key, val) => {
    const arr = formData[key] || [];
    onFieldChange(key, arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]);
  };

  return (
    <>
      {/* ── Contact ── */}
      <h2 style={sectionHeading}>Contact info</h2>
      <p style={sectionSub}>How can we reach you?</p>

      <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
        <Field label="Full name *" htmlFor="name" error={errors.name}>
          <TInput id="name" value={contact.name} onChange={v => onContactChange('name', v)} placeholder="Your full name" />
        </Field>
        <Field label="Email *" htmlFor="email" error={errors.email}>
          <TInput id="email" type="email" value={contact.email} onChange={v => onContactChange('email', v)} placeholder="you@example.com" />
        </Field>
        <Field label="Phone" hint="Optional" htmlFor="phone">
          <TInput id="phone" type="tel" value={contact.phone} onChange={v => onContactChange('phone', v)} placeholder="(555) 123-4567" />
        </Field>
        <Field label="City" hint="Optional" htmlFor="city">
          <TInput id="city" value={contact.city} onChange={v => onContactChange('city', v)} placeholder="Flint, MI" />
        </Field>
      </div>

      <div style={divider} />

      {/* ── Musician fields ── */}
      {category === 'musician' && (
        <>
          <h2 style={sectionHeading}>Your music</h2>
          <p style={sectionSub}>Share your sound. We listen to every submission.</p>

          <Field label="Music link *" hint="SoundCloud, Bandcamp, Spotify, YouTube, etc." htmlFor="musicLink" error={errors.musicLink}>
            <TInput id="musicLink" type="url" value={formData.musicLink} onChange={v => onFieldChange('musicLink', v)} placeholder="https://" />
          </Field>
          <Field label="Second link" hint="Optional. Another sample, video, or press kit." htmlFor="musicLink2">
            <TInput id="musicLink2" type="url" value={formData.musicLink2} onChange={v => onFieldChange('musicLink2', v)} placeholder="https://" />
          </Field>
          <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <Field label="Artist / band name *" htmlFor="artistName" error={errors.artistName}>
              <TInput id="artistName" value={formData.artistName} onChange={v => onFieldChange('artistName', v)} placeholder="Your name or band name" />
            </Field>
            <Field label="Genre *" htmlFor="genre" error={errors.genre}>
              <TInput id="genre" value={formData.genre} onChange={v => onFieldChange('genre', v)} placeholder="e.g., Hip-Hop, Rock, Jazz" />
            </Field>
          </div>
          <Field label="Band size" htmlFor="bandSize">
            <TSelect id="bandSize" value={formData.bandSize} onChange={v => onFieldChange('bandSize', v)} options={['Solo', 'Duo', '3-5 members', '6+ members', 'DJ / electronic']} placeholder="How many people?" aria-label="Band size" />
          </Field>

          <div style={divider} />

          <h2 style={sectionHeading}>About you</h2>
          <p style={sectionSub}>Tell us who you are and your connection to the community.</p>

          <Field label="Bio *" hint="A few sentences about your music and background." htmlFor="bio" error={errors.bio}>
            <TTextarea id="bio" value={formData.bio} onChange={v => onFieldChange('bio', v)} placeholder="Tell us about yourself..." rows={5} />
          </Field>
          <Field label="Have you played Porchfest before? *" error={errors.porchfestHistory}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <RadioCard name="porchfestHistory" value="first" checked={formData.porchfestHistory === 'first'} onChange={v => onFieldChange('porchfestHistory', v)} label="First time applying" />
              <RadioCard name="porchfestHistory" value="returning" checked={formData.porchfestHistory === 'returning'} onChange={v => onFieldChange('porchfestHistory', v)} label="Returning performer" />
            </div>
          </Field>
          <Field label="Are you based in Flint?">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <RadioCard name="flintBased" value="yes" checked={formData.flintBased === 'yes'} onChange={v => onFieldChange('flintBased', v)} label="Yes, Flint-based" />
              <RadioCard name="flintBased" value="nearby" checked={formData.flintBased === 'nearby'} onChange={v => onFieldChange('flintBased', v)} label="Nearby (Genesee County)" />
              <RadioCard name="flintBased" value="outside" checked={formData.flintBased === 'outside'} onChange={v => onFieldChange('flintBased', v)} label="Outside the area" />
            </div>
          </Field>

          <div style={divider} />

          <h2 style={sectionHeading}>Logistics</h2>
          <p style={sectionSub}>Help us plan your set.</p>

          <Field label="Can you do at least a 30-minute set? *" error={errors.canDoThirty}>
            <div style={{ display: 'flex', gap: 8 }}>
              <RadioCard name="canDoThirty" value="yes" checked={formData.canDoThirty === 'yes'} onChange={v => onFieldChange('canDoThirty', v)} label="Yes" />
              <RadioCard name="canDoThirty" value="no" checked={formData.canDoThirty === 'no'} onChange={v => onFieldChange('canDoThirty', v)} label="No" />
            </div>
          </Field>
          <Field label="Equipment needs" hint="Select any that apply">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {SETUP_NEEDS.map(need => (
                <CheckChip key={need} name="equipment" value={need} checked={(formData.equipment || []).includes(need)} onChange={v => toggleChip('equipment', v)} label={need} />
              ))}
            </div>
          </Field>
          <Field label="Bringing your own PA?">
            <div style={{ display: 'flex', gap: 8 }}>
              <RadioCard name="ownPA" value="yes" checked={formData.ownPA === 'yes'} onChange={v => onFieldChange('ownPA', v)} label="Yes" />
              <RadioCard name="ownPA" value="no" checked={formData.ownPA === 'no'} onChange={v => onFieldChange('ownPA', v)} label="No" />
            </div>
          </Field>
          <Field label="Accessibility needs" hint="Ramp access, ground-level stage, other accommodations" htmlFor="accessNeeds">
            <TTextarea id="accessNeeds" value={formData.accessNeeds} onChange={v => onFieldChange('accessNeeds', v)} placeholder="Let us know if you need anything specific" rows={3} />
          </Field>
        </>
      )}

      {/* ── Vendor fields ── */}
      {category === 'vendor' && (
        <>
          <h2 style={sectionHeading}>Your food</h2>
          <p style={sectionSub}>Tell us what you serve.</p>

          <Field label="Business name *" htmlFor="businessName" error={errors.businessName}>
            <TInput id="businessName" value={formData.businessName} onChange={v => onFieldChange('businessName', v)} placeholder="Your business or brand name" />
          </Field>
          <Field label="What do you serve? *" htmlFor="foodDescription" error={errors.foodDescription}>
            <TTextarea id="foodDescription" value={formData.foodDescription} onChange={v => onFieldChange('foodDescription', v)} placeholder="Describe your menu or offerings" rows={4} />
          </Field>
          <Field label="Type of food" hint="Select all that apply">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {FOOD_TYPES.map(type => (
                <CheckChip key={type} name="foodType" value={type} checked={(formData.foodType || []).includes(type)} onChange={v => toggleChip('foodType', v)} label={type} />
              ))}
            </div>
          </Field>
          <Field label="Social media / website" htmlFor="vendorLink">
            <TInput id="vendorLink" type="url" value={formData.vendorLink} onChange={v => onFieldChange('vendorLink', v)} placeholder="https://" />
          </Field>

          <div style={divider} />

          <h2 style={sectionHeading}>Setup details</h2>
          <p style={sectionSub}>Help us plan your space.</p>

          <Field label="Space footprint" hint="Approximate size of your setup (e.g., 10x10 tent, food truck)" htmlFor="footprint">
            <TInput id="footprint" value={formData.footprint} onChange={v => onFieldChange('footprint', v)} placeholder="e.g., 10x10 tent, food truck" />
          </Field>
          <Field label="On-site needs" hint="Select all that apply">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {VENDOR_NEEDS.map(need => (
                <CheckChip key={need} name="vendorNeeds" value={need} checked={(formData.vendorNeeds || []).includes(need)} onChange={v => toggleChip('vendorNeeds', v)} label={need} />
              ))}
            </div>
          </Field>
          <Field label="Have you vended at Porchfest before?">
            <div style={{ display: 'flex', gap: 8 }}>
              <RadioCard name="vendedBefore" value="yes" checked={formData.vendedBefore === 'yes'} onChange={v => onFieldChange('vendedBefore', v)} label="Yes" />
              <RadioCard name="vendedBefore" value="no" checked={formData.vendedBefore === 'no'} onChange={v => onFieldChange('vendedBefore', v)} label="No" />
            </div>
          </Field>
        </>
      )}

      {/* ── Entertainer fields ── */}
      {category === 'entertainer' && (
        <>
          <h2 style={sectionHeading}>What do you do?</h2>
          <p style={sectionSub}>
            Porchfest is music, comedy, visual art, and whatever else makes a block party come alive.
            Last year we had comedians, chalk artists, street performers, and a kids zone.
            We want even more of that energy in 2026. Tell us what you are bringing.
          </p>

          <Field label="Act / artist name *" htmlFor="actName" error={errors.actName}>
            <TInput id="actName" value={formData.actName} onChange={v => onFieldChange('actName', v)} placeholder="Your name or act name" />
          </Field>
          <Field label="Type of act" hint="Select all that apply">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {ENT_TYPES.map(type => (
                <CheckChip key={type} name="actType" value={type} checked={(formData.actType || []).includes(type)} onChange={v => toggleChip('actType', v)} label={type} />
              ))}
            </div>
          </Field>
          <Field label="Describe your act *" htmlFor="actDescription" error={errors.actDescription}>
            <TTextarea id="actDescription" value={formData.actDescription} onChange={v => onFieldChange('actDescription', v)} placeholder="What should we expect?" rows={5} />
          </Field>
          <Field label="Link to your work" hint="Website, social media, video, etc." htmlFor="workLink">
            <TInput id="workLink" type="url" value={formData.workLink} onChange={v => onFieldChange('workLink', v)} placeholder="https://" />
          </Field>
        </>
      )}

      {/* ── Other fields ── */}
      {category === 'other' && (
        <>
          <h2 style={sectionHeading}>Your idea</h2>
          <p style={sectionSub}>Tell us what you want to bring to Porchfest.</p>

          <Field label="Name / organization *" htmlFor="orgName" error={errors.orgName}>
            <TInput id="orgName" value={formData.orgName} onChange={v => onFieldChange('orgName', v)} placeholder="Your name or organization" />
          </Field>
          <Field label="What is your proposal? *" htmlFor="proposal" error={errors.proposal}>
            <TTextarea id="proposal" value={formData.proposal} onChange={v => onFieldChange('proposal', v)} placeholder="Describe what you want to do at Porchfest" rows={6} />
          </Field>
          <Field label="Links" hint="Website, social media, portfolio, etc." htmlFor="otherLinks">
            <TInput id="otherLinks" type="url" value={formData.otherLinks} onChange={v => onFieldChange('otherLinks', v)} placeholder="https://" />
          </Field>
        </>
      )}
    </>
  );
}
