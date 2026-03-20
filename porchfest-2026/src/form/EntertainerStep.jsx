import { C, serif, sans } from '../tokens';
import { ENT_TYPES } from '../porchfest-data';
import Field from './field/Field';
import TInput from './field/TInput';
import TTextarea from './field/TTextarea';
import CheckChip from './field/CheckChip';

export default function EntertainerStep({ step, data, onChange, errors }) {
  const toggleChip = (key, val) => {
    const arr = data[key] || [];
    onChange(key, arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]);
  };

  return (
    <>
      <h2 style={{ ...serif, fontSize: 24, fontWeight: 800, color: C.ink, marginBottom: 4 }}>Your act</h2>
      <p style={{ ...sans, fontSize: 14, color: C.inkMuted, marginBottom: 24 }}>Tell us what you do.</p>

      <Field label="Act / artist name *" htmlFor="actName" error={errors.actName}>
        <TInput id="actName" value={data.actName} onChange={v => onChange('actName', v)} placeholder="Your name or act name" />
      </Field>
      <Field label="Type of act" hint="Select all that apply">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {ENT_TYPES.map(type => (
            <CheckChip key={type} name="actType" value={type} checked={(data.actType || []).includes(type)} onChange={v => toggleChip('actType', v)} label={type} />
          ))}
        </div>
      </Field>
      <Field label="Describe your act *" htmlFor="actDescription" error={errors.actDescription}>
        <TTextarea id="actDescription" value={data.actDescription} onChange={v => onChange('actDescription', v)} placeholder="What should we expect?" rows={5} />
      </Field>
      <Field label="Link to your work" hint="Website, social media, video, etc." htmlFor="workLink">
        <TInput id="workLink" value={data.workLink} onChange={v => onChange('workLink', v)} placeholder="https://" />
      </Field>
    </>
  );
}
