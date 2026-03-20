import { C, serif, sans, mono } from '../tokens';
import { GENRES, SETUP_NEEDS } from '../porchfest-data';
import Field from './field/Field';
import TInput from './field/TInput';
import TTextarea from './field/TTextarea';
import TSelect from './field/TSelect';
import RadioCard from './field/RadioCard';
import CheckChip from './field/CheckChip';

export default function MusicianSteps({ step, data, onChange, errors }) {
  const toggleChip = (key, val) => {
    const arr = data[key] || [];
    onChange(key, arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]);
  };

  if (step === 0) {
    return (
      <>
        <h2 style={{ ...serif, fontSize: 24, fontWeight: 800, color: C.ink, marginBottom: 4 }}>Your music</h2>
        <p style={{ ...sans, fontSize: 14, color: C.inkMuted, marginBottom: 24 }}>Share your sound. We listen to every submission.</p>

        <Field label="Music link *" hint="SoundCloud, Bandcamp, Spotify, YouTube, etc." htmlFor="musicLink" error={errors.musicLink}>
          <TInput id="musicLink" type="url" value={data.musicLink} onChange={v => onChange('musicLink', v)} placeholder="https://" />
        </Field>
        <Field label="Second link" hint="Optional. Another sample, video, or press kit." htmlFor="musicLink2">
          <TInput id="musicLink2" type="url" value={data.musicLink2} onChange={v => onChange('musicLink2', v)} placeholder="https://" />
        </Field>
        <Field label="Artist / band name *" htmlFor="artistName" error={errors.artistName}>
          <TInput id="artistName" value={data.artistName} onChange={v => onChange('artistName', v)} placeholder="Your name or band name" />
        </Field>
        <Field label="Genre *" htmlFor="genre" error={errors.genre}>
          <TSelect id="genre" value={data.genre} onChange={v => onChange('genre', v)} options={GENRES} placeholder="Select genre" />
        </Field>
        <Field label="Band size" htmlFor="bandSize">
          <TSelect id="bandSize" value={data.bandSize} onChange={v => onChange('bandSize', v)} options={['Solo', 'Duo', '3-5 members', '6+ members', 'DJ / electronic']} placeholder="How many people?" />
        </Field>
      </>
    );
  }

  if (step === 1) {
    return (
      <>
        <h2 style={{ ...serif, fontSize: 24, fontWeight: 800, color: C.ink, marginBottom: 4 }}>About you</h2>
        <p style={{ ...sans, fontSize: 14, color: C.inkMuted, marginBottom: 24 }}>Tell us who you are and your connection to the community.</p>

        <Field label="Bio *" hint="A few sentences about your music and background." htmlFor="bio" error={errors.bio}>
          <TTextarea id="bio" value={data.bio} onChange={v => onChange('bio', v)} placeholder="Tell us about yourself..." rows={5} />
        </Field>
        <Field label="Porchfest history">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <RadioCard name="history" value="first" checked={data.history === 'first'} onChange={v => onChange('history', v)} label="First time applying" />
            <RadioCard name="history" value="returning" checked={data.history === 'returning'} onChange={v => onChange('history', v)} label="Returning performer" />
            <RadioCard name="history" value="flint" checked={data.history === 'flint'} onChange={v => onChange('history', v)} label="Flint-based artist" />
          </div>
        </Field>
      </>
    );
  }

  if (step === 2) {
    return (
      <>
        <h2 style={{ ...serif, fontSize: 24, fontWeight: 800, color: C.ink, marginBottom: 4 }}>Logistics</h2>
        <p style={{ ...sans, fontSize: 14, color: C.inkMuted, marginBottom: 24 }}>Help us plan your set.</p>

        <Field label="Set length *" error={errors.setLength}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <RadioCard name="setLength" value="30" checked={data.setLength === '30'} onChange={v => onChange('setLength', v)} label="30 minutes" />
            <RadioCard name="setLength" value="45" checked={data.setLength === '45'} onChange={v => onChange('setLength', v)} label="45 minutes" />
            <RadioCard name="setLength" value="60" checked={data.setLength === '60'} onChange={v => onChange('setLength', v)} label="60 minutes" />
          </div>
        </Field>
        <Field label="Equipment needs" hint="Select any that apply">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {SETUP_NEEDS.map(need => (
              <CheckChip key={need} name="equipment" value={need} checked={(data.equipment || []).includes(need)} onChange={v => toggleChip('equipment', v)} label={need} />
            ))}
          </div>
        </Field>
        <Field label="Bringing your own PA?">
          <div style={{ display: 'flex', gap: 8 }}>
            <RadioCard name="ownPA" value="yes" checked={data.ownPA === 'yes'} onChange={v => onChange('ownPA', v)} label="Yes" />
            <RadioCard name="ownPA" value="no" checked={data.ownPA === 'no'} onChange={v => onChange('ownPA', v)} label="No" />
          </div>
        </Field>
        <Field label="Accessibility needs" hint="Ramp access, ground-level stage, other accommodations" htmlFor="accessNeeds">
          <TTextarea id="accessNeeds" value={data.accessNeeds} onChange={v => onChange('accessNeeds', v)} placeholder="Let us know if you need anything specific" rows={3} />
        </Field>
      </>
    );
  }

  return null;
}
