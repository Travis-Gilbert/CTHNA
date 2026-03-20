# Carriage Town Porchfest 2026: Full Site

> **Repo: `Travis-Gilbert/CTHNA` (https://github.com/Travis-Gilbert/CTHNA)**
> **Deploys to: cthna.vercel.app**
>
> **For Claude Code. One batch per session. Read entire spec before writing code.**
> **Read every file listed under "Read first" before writing a single line.**
> **Run `npm run build` after every batch. Do not proceed if the build fails.**
> **No em dashes anywhere in code, comments, or copy.**

## 1. What This Is

A two-page website for Carriage Town Porchfest 2026, a free neighborhood music and arts festival in Flint, MI. Page one is a public-facing landing page that sells the event to attendees and drives performer/vendor applications. Page two is a streamlined application form: pick a category, fill in one page of fields, review, submit. Built with Vite + React, deployed to Vercel. Submissions go to Formspree.

## 2. Audience

- **Attendees**: Flint residents, Michigan music fans, curious locals. They want to know what it is, when it is, and what it looks like.
- **Applicants**: Musicians, food vendors, entertainers, community organizations. They need a fast, frictionless application.
- **Sponsors**: Event partnership opportunities. Sponsor callout bar on landing page.

## 3. Route and File Map

```
public/
  photos/                         # Event photos (8 files + poster)
  favicon.ico
src/
  main.jsx                        # App entry, router setup
  App.jsx                         # Route definitions
  porchfest-data.js               # ALL content: copy, categories, form options
  tokens.js                       # Design tokens, font shortcuts, shared styles
  components/
    Nav.jsx                       # Shared sticky nav
    Footer.jsx                    # Shared footer
    ScrollReveal.jsx              # IntersectionObserver reveal wrapper
    Button.jsx                    # Primary/secondary button variants
  pages/
    Landing.jsx                   # Landing page
    Apply.jsx                     # Application page (2-step: form + review)
  sections/
    Hero.jsx                      # Full-viewport hero with poster background
    About.jsx                     # "Every porch is a stage" section
    StatsBar.jsx                  # Dark stats strip (4 metrics)
    Gallery.jsx                   # Asymmetric photo grid
    HowItWorks.jsx                # 3-step cards
    ApplyCTA.jsx                  # "Play a porch" section with 4 category cards
    SponsorBar.jsx                # Single-line sponsor callout
  form/
    ApplicationForm.jsx           # Step 1: category + all fields (one page)
    ReviewStep.jsx                # Step 2: full summary + consent + submit
    SuccessScreen.jsx             # Post-submit confirmation
    field/
      TInput.jsx                  # Styled text input
      TTextarea.jsx               # Styled textarea
      TSelect.jsx                 # Styled select (band size)
      RadioCard.jsx               # Selectable card with radio behavior
      FileUpload.jsx              # Styled file input (license photo)
      Field.jsx                   # Label + input + hint + error wrapper
index.html
vite.config.js
package.json
```

## 4. Dependencies

| Package | Purpose | Install |
|---------|---------|---------|
| react | UI | (already in template) |
| react-dom | DOM rendering | (already in template) |
| react-router-dom | Client-side routing | `npm i react-router-dom` |
| vite | Build tool | (already in template) |
| @vitejs/plugin-react | JSX transform | (already in template) |

No other dependencies.

## 5. Design Tokens

All tokens live in `src/tokens.js`. No inline hex values anywhere else.

```javascript
export const C = {
  paper: '#F2EDE5', surface: '#FAF6F1', cream: '#FFF8F0',
  ink: '#2A2420', inkMuted: '#6A5E52', inkLight: '#9A8E82',
  dark: '#1A1816', darkWarm: '#2A2420',
  border: '#D4CCC4', borderLight: '#E8E0D6',
  teal: '#2A7A7B', tealBright: '#35918F', tealDim: 'rgba(42,122,123,.1)',
  burg: '#7A2E3A', burgBright: '#963848', burgDim: 'rgba(122,46,58,.1)',
  gold: '#C49A4A', goldBright: '#D4AA52', goldDim: 'rgba(196,154,74,.1)',
  error: '#A44A3A', heroText: '#F0EBE4',
};
export const serif = { fontFamily: "'Vollkorn', Georgia, serif" };
export const sans  = { fontFamily: "'Cabin', -apple-system, sans-serif" };
export const mono  = { fontFamily: "'Courier Prime', monospace" };
```

**Color roles:** Teal = primary interactive. Burgundy = highlight accent. Gold = vendor card only. Ground = everything else.

**Category accents:** Musician = teal, Vendor = gold, Entertainer = burgundy, Other = neutral (inkLight).

## 6. Build Order

```
Batch 0: Project scaffold, tokens, data file, shared components
Batch 1: Landing page (all sections)
Batch 2: Application page (simplified 2-step form)
Batch 3: Polish (localStorage, mobile optimization, accessibility, responsive)
```

## Copy Rules (apply everywhere)

1. **All date references**: Friday, July 17, 2026 (not Saturday).
2. **Avoid "no X, it's Y" constructions.** Write affirmative statements about what the event IS.
3. **No em dashes** in code, comments, or copy.

---

## Batch 0: Scaffold + Shared Components

### Read first
- `docs/prototypes/porchfest-landing-v3.html`
- `docs/prototypes/porchfest-apply.jsx`

### Scaffold
Remove `__init__.py`. Create Vite + React project in repo root. Install `react-router-dom`. Two routes: `/` (Landing) and `/apply` (Apply).

### Files to create
- `src/tokens.js` (Section 5 above)
- `src/porchfest-data.js` (all copy, categories, photos, metadata)
- `src/components/Nav.jsx` (fixed top, burgundy "P" mark, teal CTA, blur on scroll)
- `src/components/Footer.jsx` (dark bg, links, copyright)
- `src/components/ScrollReveal.jsx` (IntersectionObserver wrapper)
- `src/components/Button.jsx` (primary teal, secondary outline)
- Copy all 9 photos into `public/photos/`

### Verification
- [ ] Both routes serve, Nav + Footer render, photos load, `npm run build` passes

---

## Batch 1: Landing Page

### Read first
- `docs/prototypes/porchfest-landing-v3.html` (canonical visual reference)
- `src/porchfest-data.js`, `src/tokens.js`, all shared components

### Files to create
All section components, composed by `src/pages/Landing.jsx`:

1. **Hero.jsx**: Full viewport, poster-hero.jpg bg, dark gradient, headline "Music lives on the *porch.*" (porch in burgundy italic), meta row (July 17, ~3,000, Free), two buttons
2. **PhotoStrip**: 4 images, asymmetric grid (2fr 1fr 1.5fr 1fr)
3. **About.jsx**: 2-col, "Every porch is a stage.", pull quote, photo-porch-singer.jpg
4. **StatsBar.jsx**: dark strip, 4 stats in burgundy-bright
5. **Gallery.jsx**: dark section, 12-col asymmetric grid, 5 photos
6. **HowItWorks.jsx**: paper bg, 3 numbered cards
7. **ApplyCTA.jsx**: dark section, 4 category cards linking to /apply?cat=X
8. **SponsorBar.jsx**: burgundy tag, headline, teal CTA mailto

### Verification
- [ ] All 7 sections render, photos display, apply cards link correctly
- [ ] Mobile stacks at 500/640/700/800px
- [ ] `npm run build` passes

---

## Batch 2: Application Page (Simplified)

**THIS IS A COMPLETE REWRITE OF THE FORM. DO NOT USE THE MULTI-STEP WIZARD FROM THE PROTOTYPE.**

The prototype had a category-specific multi-step form with 3-7 screens depending on category. That has been replaced with a 2-screen universal form. One page of fields, one review page, done.

### Read first
- `docs/prototypes/porchfest-apply.jsx` (reference for visual style of inputs, cards, layout ONLY)
- `src/porchfest-data.js`, `src/tokens.js`, `src/components/Nav.jsx`

### New file: `src/pages/Apply.jsx`

Client component. Two stages only: `form` and `review` (plus `done` after submit).

State:
```javascript
const [stage, setStage] = useState('form');       // form | review | done
const [category, setCategory] = useState(null);    // musician | vendor | entertainer | other
const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
  link: '',           // music, portfolio, menu, website
  bandSize: '',       // musician only
  hasLicense: '',     // vendor only: 'yes' | 'no'
  licenseFile: null,  // vendor only: File object
  porchfestBefore: '', // first-time | returning
  local: '',           // flint | genesee | outside
  anythingElse: '',   // optional textarea
});
const [agree, setAgree] = useState(false);
const [errors, setErrors] = useState({});
const [submitting, setSubmitting] = useState(false);
```

On mount: check URL params for `?cat=musician` etc. If present, pre-select category.

### New file: `src/form/ApplicationForm.jsx`

**This is the entire form on a single scrollable page.**

#### Section 1: Category Select (top of page)

Short dark hero section at top:
- Teal tag: "Applications Open . 7th Annual"
- Headline: "Be part of Porchfest."
- Short body paragraph (corrected copy with Friday date)
- Stat row: July 17, ~3,000, 20+ acts, Free

Below the hero, on paper background:
- "What are you applying as?" with 2x2 grid of category cards
- Selected state: accent border + tinted bg + "Selected" label
- **Rest of form appears below once a category is selected.** Smooth scroll-reveal.

#### Section 2: Application Fields (appears after category select)

All on one page. Single scrollable form below category cards.

Tag: "Your Application" (in selected category accent color)
Headline varies by category:
- Musician: "Tell us about your music."
- Vendor: "Tell us what you are serving."
- Entertainer: "Tell us about your act."
- Other: "Tell us what you have in mind."

**Universal fields (all categories, in this order):**

1. **Name** (required)
   - Label: "Your Name" for musician/entertainer/other. "Business or Vendor Name" for vendor.
   - `type="text"`

2. **Phone** (required)
   - Label: "Phone Number"
   - `type="tel"`, placeholder: "(810) 000-0000"

3. **Email** (required, format validated)
   - Label: "Email Address"
   - `type="email"`, placeholder: "you@example.com"

4. **Link to your work** (required for musician, optional for others)
   - Label varies:
     - Musician: "Link to Your Music" / hint: "SoundCloud, Spotify, YouTube, Bandcamp, a live video. Whatever represents you best."
     - Vendor: "Instagram or Website" / hint: "We promote vendors on social before the event."
     - Entertainer: "Link to Your Work" / hint: "A video, portfolio, Instagram, anything that shows what you do."
     - Other: "Any Links?" / hint: "Website, social, anything relevant."
   - `type="url"`

**Musician-only field (shown when category === 'musician'):**

5. **Band Size**
   - Label: "How many people in your act?"
   - Select dropdown: Solo / Duo / 3 to 4 / 5 or more
   - Not required but encouraged

**Vendor-only fields (shown when category === 'vendor'):**

6. **Do you have a food service license?** (required for vendor)
   - Two RadioCards: "Yes" / "No, I need to get one"
   - If "No": show a hint below: "You will need a valid food service license to vend at Porchfest. Contact the Genesee County Health Department or email us at porchfest@cthna.org for guidance."

7. **Upload your license** (shown only when hasLicense === 'yes', required)
   - FileUpload component
   - Label: "Upload a photo of your license"
   - Hint: "JPEG or PNG. We just need to see it on file."
   - Accept: `.jpg,.jpeg,.png,.pdf`
   - Max file size: 10MB
   - Shows filename + file size after selection, with a "Remove" button
   - Styled to match the form aesthetic: dashed border box, teal accent on hover/active, drag-and-drop supported but click-to-browse as primary

**Back to universal fields (all categories):**

8. **Have you been to Porchfest before?** (required)
   - Two RadioCards: "First time applying" / "Returning participant"

9. **Are you local?** (required)
   - Three RadioCards: "Yes, Flint-based" / "Nearby (Genesee County)" / "Outside the area"

10. **Anything else you want us to know?** (optional)
    - Label: "Anything Else?"
    - Textarea, 4 rows
    - Hint: "Optional. Tell us anything that does not fit above."
    - Placeholder varies by category:
      - Musician: "Your sound, your story, set length preference, equipment needs, accessibility requirements..."
      - Vendor: "What is on the menu, your setup needs, space requirements..."
      - Entertainer: "What your act looks like, how long it runs, what ages it works for..."
      - Other: "Describe what you would like to bring to Porchfest 2026."

**Below the fields:**
- "Review Application" button (teal primary). Validates and advances to review.
- Small text: "You will be able to review everything before submitting."

**Layout:**
- Max-width 640px, centered, single-column for all fields
- Phone and Email can share a 2-column row on desktop (>500px), stacking on mobile

### New file: `src/form/field/FileUpload.jsx`

Styled file upload component.

- Renders a dashed-border drop zone with a cloud/upload icon and "Choose file or drag here" text
- Hidden `<input type="file">` triggered by click on the drop zone
- `accept` prop for allowed file types
- `maxSize` prop in bytes (default 10MB = 10485760)
- On file select: validate type and size. If invalid, show error. If valid, call onChange with the File object.
- After file selected: show a confirmation row with filename, file size (human readable), and a "Remove" button that clears the selection
- Drag-and-drop: `onDragOver`/`onDrop` handlers on the drop zone
- Styling: surface background, dashed border in border color, teal border + tealDim background on drag-over
- Error states: red border if validation fails, error message below
- Accessible: the hidden input has an aria-label, the drop zone has role="button" and keyboard support (Enter/Space to open file picker)

### New file: `src/form/ReviewStep.jsx`

Shows everything the applicant entered.

Layout:
- Category badge bar at top (icon + category label + "Change" button that goes back to form)
- Dark header card with applicant name in Vollkorn, category label in mono
- Body: 2-column grid (label in mono caps, value in sans):
  - Name, Phone, Email
  - Link (clickable, word-break)
  - Band Size (musician only, if filled)
  - Food License status (vendor only): "Yes (uploaded)" or "Needs to obtain"
  - License file name (vendor only, if uploaded): show filename as a chip
  - Porchfest History, Local Status
  - Anything Else (full-width block if provided)
- Consent checkbox + legal copy + info box
- "Submit Application" button (teal) + "Back" button (secondary)

### New file: `src/form/SuccessScreen.jsx`

Full dark screen. Teal checkmark circle. "Application Received" tag. "We got it, [name]." headline. Timeline body. CTHNA footer line.

### Form field components: `src/form/field/`

6 components:

- **TInput.jsx**: Text input with focus ring. Supports type prop (text, email, tel, url).
- **TTextarea.jsx**: Textarea with focus ring.
- **TSelect.jsx**: Select dropdown (band size only).
- **RadioCard.jsx**: Radio card. sr-only hidden input (NOT display:none). Focus-visible ring.
- **FileUpload.jsx**: File upload with drag-and-drop (described above).
- **Field.jsx**: Label (mono caps) + input + hint + error. htmlFor/id pairs. Errors: role="alert" aria-live="polite".

### Validation

On "Review Application" click:
```javascript
const e = {};
if (!category) e.category = 'Pick a category';
if (!formData.name.trim()) e.name = 'Required';
if (!formData.phone.trim()) e.phone = 'Required';
if (!formData.email.trim()) e.email = 'Required';
else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Enter a valid email';
if (category === 'musician' && !formData.link.trim()) e.link = 'Add a link so we can hear you';
if (category === 'vendor') {
  if (!formData.hasLicense) e.hasLicense = 'Required';
  if (formData.hasLicense === 'yes' && !formData.licenseFile) e.licenseFile = 'Please upload your license';
}
if (!formData.porchfestBefore) e.porchfestBefore = 'Required';
if (!formData.local) e.local = 'Required';
```

On submit: `if (!agree) e.agree = 'Please agree to continue';`

Scroll to first error on validation failure.

### Formspree submission

**IMPORTANT: Use FormData (multipart/form-data), not JSON, because of the file upload.**

Formspree supports file attachments via multipart form submission. All submissions (even non-vendor) use FormData for consistency.

```javascript
const fd = new FormData();
fd.append('category', category);
fd.append('name', formData.name);
fd.append('phone', formData.phone);
fd.append('email', formData.email);
fd.append('link', formData.link);
fd.append('bandSize', formData.bandSize);
fd.append('hasLicense', formData.hasLicense);
fd.append('porchfestBefore', formData.porchfestBefore);
fd.append('local', formData.local);
fd.append('anythingElse', formData.anythingElse);

if (formData.licenseFile) {
  fd.append('licensePhoto', formData.licenseFile, formData.licenseFile.name);
}

await fetch(FORMSPREE_ENDPOINT, {
  method: 'POST',
  body: fd,
  headers: { Accept: 'application/json' },
  // Do NOT set Content-Type header. The browser sets it
  // automatically with the correct multipart boundary.
});
```

### Verification
- [ ] Category select shows 4 cards, form appears after selection
- [ ] URL param `?cat=musician` pre-selects and shows form
- [ ] Band Size field only appears for musician category
- [ ] Food license question only appears for vendor category
- [ ] License file upload only appears when "Yes" is selected
- [ ] "No" license answer shows guidance hint text
- [ ] File upload accepts jpg/jpeg/png/pdf, rejects other types
- [ ] File upload rejects files over 10MB with error message
- [ ] File upload shows filename and size after selection
- [ ] "Remove" button clears the file selection
- [ ] Vendor validation requires hasLicense and licenseFile (when yes)
- [ ] Link field label/hint changes per category
- [ ] "Anything else" placeholder changes per category
- [ ] Name, Phone, Email, Porchfest Before, Local all required
- [ ] Link required for musician, optional for others
- [ ] Email format validation works
- [ ] Review page shows all entered data including license status
- [ ] "Change" returns to form with data preserved (including file)
- [ ] Consent checkbox blocks submit
- [ ] Formspree POST uses FormData (multipart), includes file attachment
- [ ] Success screen shows applicant name
- [ ] All inputs keyboard-navigable, errors announced by screen reader
- [ ] `npm run build` passes

---

## Batch 3: Polish

### Read first
- All components from Batches 0-2
- `docs/plans/2026-03-20-porchfest-mobile.md` (mobile optimization plan)

### localStorage persistence
Save form state on every change. Restore on mount. Clear on submit. "Start Over" link.

**Note on file persistence**: File objects cannot be stored in localStorage. On restore, `licenseFile` will be null. If a vendor had previously uploaded a file and refreshes, they will need to re-upload. This is acceptable. Show a note on the file upload field: "Please re-select your file" if hasLicense is 'yes' but licenseFile is null.

### Mobile optimization (from mobile plan)
- Responsive image pipeline (WebP + srcset + sizes)
- `loading="eager"` + `fetchpriority="high"` on hero only, lazy everywhere else
- `aspect-ratio` on all images (CLS prevention)
- Input font-size 16px on mobile (iOS zoom fix)
- URL fields use `type="url"`
- Sticky form submit button on mobile
- 2-col grids stack below 500px
- Full-width hero buttons on mobile
- Safe area insets on nav and sticky elements
- Solid nav bg on mobile (backdrop-filter fallback)
- Full OG tags (poster as og:image) for both pages
- `viewport-fit=cover`

### Accessibility audit
- sr-only hidden inputs (not display:none)
- htmlFor/id pairs on all fields
- role="alert" aria-live="polite" on errors
- Focus-visible outlines everywhere
- Skip-to-content link
- prefers-reduced-motion
- Color contrast check
- Single h1 per page, h2 for sections
- FileUpload: keyboard accessible (Enter/Space to open picker), aria-label on hidden input

### Responsive audit

| Width | Behavior |
|-------|----------|
| 1100px+ | Full layout |
| 800px | About/apply-top stack, landing cards 2-col |
| 700px | How-it-works stacks |
| 640px | Nav links hide, strips/stats/gallery 2-col |
| 500px | Landing apply cards 1-col, form phone/email stack |
| <400px | Category cards 1-col |

### Link wiring
Landing "Apply to Perform" > /apply. Category cards > /apply?cat=X. Apply brand > /. Footer correct.

### Verification
- [ ] localStorage persists and clears correctly (file re-upload note shows)
- [ ] Responsive images load correct sizes per viewport
- [ ] Lighthouse mobile score 90+
- [ ] All scroll reveals fire
- [ ] prefers-reduced-motion respected
- [ ] Tab navigation works everywhere (including file upload)
- [ ] All breakpoints correct
- [ ] `npm run build` and `npm run preview` pass

---

## Reference Prototypes

| File | Contents | Use for |
|------|----------|---------|
| `docs/prototypes/porchfest-landing-v3.html` | Full landing page | Layout, copy, colors, responsive, scroll timing |
| `docs/prototypes/porchfest-apply.jsx` | Original multi-step form | Visual style of inputs/cards ONLY. **Do NOT use the multi-step wizard. This spec overrides the prototype entirely for the form.** |
| `docs/plans/2026-03-20-porchfest-mobile.md` | Mobile optimization plan | Image pipeline, touch targets, iOS fixes, perf budget |

Read prototypes at the start of every batch. **This spec overrides the prototypes wherever they conflict.**