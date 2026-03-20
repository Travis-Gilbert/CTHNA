import { C, serif, sans } from '../tokens';
import Field from './field/Field';
import TInput from './field/TInput';
import TTextarea from './field/TTextarea';

export default function OtherStep({ step, data, onChange, errors }) {
  return (
    <>
      <h2 style={{ ...serif, fontSize: 24, fontWeight: 800, color: C.ink, marginBottom: 4 }}>Your idea</h2>
      <p style={{ ...sans, fontSize: 14, color: C.inkMuted, marginBottom: 24 }}>Tell us what you want to bring to Porchfest.</p>

      <Field label="Name / organization *" htmlFor="orgName" error={errors.orgName}>
        <TInput id="orgName" value={data.orgName} onChange={v => onChange('orgName', v)} placeholder="Your name or organization" />
      </Field>
      <Field label="What is your proposal? *" htmlFor="proposal" error={errors.proposal}>
        <TTextarea id="proposal" value={data.proposal} onChange={v => onChange('proposal', v)} placeholder="Describe what you want to do at Porchfest" rows={6} />
      </Field>
      <Field label="Links" hint="Website, social media, portfolio, etc." htmlFor="otherLinks">
        <TInput id="otherLinks" value={data.otherLinks} onChange={v => onChange('otherLinks', v)} placeholder="https://" />
      </Field>
    </>
  );
}
