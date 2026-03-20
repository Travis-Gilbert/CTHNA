import { C, serif, sans } from '../tokens';
import Field from './field/Field';
import TInput from './field/TInput';

export default function ContactStep({ data, onChange, errors }) {
  return (
    <>
      <h2 style={{ ...serif, fontSize: 24, fontWeight: 800, color: C.ink, marginBottom: 4 }}>Contact info</h2>
      <p style={{ ...sans, fontSize: 14, color: C.inkMuted, marginBottom: 24 }}>How can we reach you?</p>

      <Field label="Full name *" htmlFor="name" error={errors.name}>
        <TInput id="name" value={data.name} onChange={v => onChange('name', v)} placeholder="Your full name" />
      </Field>
      <Field label="Email *" htmlFor="email" error={errors.email}>
        <TInput id="email" type="email" value={data.email} onChange={v => onChange('email', v)} placeholder="you@example.com" />
      </Field>
      <Field label="Phone" hint="Optional" htmlFor="phone">
        <TInput id="phone" type="tel" value={data.phone} onChange={v => onChange('phone', v)} placeholder="(555) 123-4567" />
      </Field>
      <Field label="City" hint="Optional" htmlFor="city">
        <TInput id="city" value={data.city} onChange={v => onChange('city', v)} placeholder="Flint, MI" />
      </Field>
    </>
  );
}
