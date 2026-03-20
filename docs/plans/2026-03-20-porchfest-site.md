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
      Field.jsx                   # Label + input + hint + error wrapper
index.html
vite.config.js
package.json
```

Note: the form directory is dramatically simpler than the original prototype. There are no category-specific step files, no multi-step wizard, no StepDots, no CheckChip. One universal form serves all categories. Two screens total: fill it in, review it, submit.

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
5. **Gallery.jsx**: dark section, 12-col async grid, 5 photos
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

The prototype had a category-specific multi-step form with 3-7 screens depending on category (musician had 6 screens total including category select, 3 form steps, contact, and review). That has been replaced with a 2-screen universal form.

### Read first
- `docs/prototypes/porchfest-apply.jsx` (reference for visual style of inputs, cards, and layout only)
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
  bandSize: '',       // only shown for musician category
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

**This is the entire form on a single scrollable page.** It contains:

#### Section 1: Category Select (top of page)

Short dark hero section at top:
- Teal tag: "Applications Open . 7th Annual"
- Headline: "Be part of Porchfest."
- Short body paragraph about the event (use corrected copy with Friday date)
- Stat row: July 17, ~3,000, 20+ acts, Free

Below the hero, on paper background:
- "What are you applying as?" with 2x2 grid of category cards
- Cards use CATEGORIES data (musician/vendor/entertainer/other) with icons and accent colors
- Selected state: accent border + tinted background + "Selected" label
- **The rest of the form appears below the category cards once a category is selected.** Smooth scroll-reveal when category is picked.

#### Section 2: Application Fields (appears after category select)

All on one page, no steps. A single scrollable form below the category cards.

Tag: "Your Application" (in selected category accent color)
Headline: varies by category:
- Musician: "Tell us about your music."
- Vendor: "Tell us what you are serving."
- Entertainer: "Tell us about your act."
- Other: "Tell us what you have in mind."

**Fields (in this order):**

1. **Name** (required)
   - Label: "Your Name" for musician/entertainer/other. "Business or Vendor Name" for vendor.
   - `type="text"`, placeholder varies by category

2. **Phone** (required)
   - Label: "Phone Number"
   - `type="tel"`, placeholder: "(810) 000-0000"

3. **Email** (required, format validated)
   - Label: "Email Address"
   - `type="email"`, placeholder: "you@example.com"

4. **Link to your work** (required for musician, optional for others)
   - Label varies:
     - Musician: "Link to Your Music" with hint "SoundCloud, Spotify, YouTube, Bandcamp, a live video. Whatever represents you best."
     - Vendor: "Instagram or Website" with hint "We promote vendors on social before the event."
     - Entertainer: "Link to Your Work" with hint "A video, portfolio, Instagram, anything that shows what you do."
     - Other: "Any Links?" with hint "Website, social, anything relevant."
   - `type="url"`

5. **Band Size** (only shown when category is musician)
   - Label: "How many people in your act?"
   - Select dropdown: Solo / Duo / 3 to 4 / 5 or more
   - Not required but encouraged

6. **Have you been to Porchfest before?** (required)
   - Two RadioCards: "First time applying" / "Returning participant"

7. **Are you local?** (required)
   - Three RadioCards: "Yes, Flint-based" / "Nearby (Genesee County)" / "Outside the area"

8. **Anything else you want us to know?** (optional)
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
- Max-width 640px, centered
- Name, Phone, and Email on the same row is too cramped. Use single-column for all fields.
- Phone and Email can share a 2-column row on desktop (>500px), stacking on mobile.

### New file: `src/form/ReviewStep.jsx`

Shows everything the applicant entered.

Layout:
- Category badge bar at top (icon + category label + "Change" button that goes back to form)
- Dark header card with the applicant's name in large Vollkorn text, category label in mono above it
- Body: all fields displayed in a clean 2-column grid (label in mono caps, value in sans):
  - Name
  - Phone
  - Email
  - Link (displayed as clickable, word-break)
  - Band Size (only if musician and if filled in)
  - Porchfest History
  - Local Status
  - Anything Else (full text, displayed in a full-width block if provided)
- Consent checkbox: "I understand this application does not guarantee a spot. The CTHNA team reviews all submissions and contacts accepted participants by mid-May 2026. If selected, I commit to showing up ready on July 17th."
- Info box: "We prioritize Flint-based artists and Carriage Town-connected acts. Questions at porchfest@cthna.org"
- "Submit Application" button (teal primary)
- "Back" button (secondary) to return to form with all data preserved

### New file: `src/form/SuccessScreen.jsx`

Full dark screen. Teal checkmark circle. "Application Received" tag. "We got it, [name]." headline. Body about timeline (reach out by mid-May 2026 to the email they provided). CTHNA footer line.

### Form field components: `src/form/field/`

Only 5 components needed (much simpler than the prototype):

- **TInput.jsx**: Styled text input with focus ring (teal). Supports type prop (text, email, tel, url).
- **TTextarea.jsx**: Styled textarea with focus ring.
- **TSelect.jsx**: Styled select dropdown (used only for band size).
- **RadioCard.jsx**: Selectable card with radio behavior. Hidden input uses sr-only positioning (NOT display:none). Focus-visible ring on card border.
- **Field.jsx**: Label (mono caps) + input + hint + error wrapper. Associates label with input via htmlFor/id. Errors use role="alert" aria-live="polite".

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
if (!formData.porchfestBefore) e.porchfestBefore = 'Required';
if (!formData.local) e.local = 'Required';
```

On submit (review page):
```javascript
if (!agree) e.agree = 'Please agree to continue';
```

Scroll to first error on validation failure.

### Formspree submission

POST to Formspree endpoint. JSON body:
```javascript
{
  category,
  name: formData.name,
  phone: formData.phone,
  email: formData.email,
  link: formData.link,
  bandSize: formData.bandSize,       // may be empty
  porchfestBefore: formData.porchfestBefore,
  local: formData.local,
  anythingElse: formData.anythingElse, // may be empty
}
```

### Verification
- [ ] Category select shows 4 cards, form appears after selection
- [ ] URL param `?cat=musician` pre-selects category and shows form
- [ ] Band Size field only appears for musician category
- [ ] Link field label and hint change per category
- [ ] "Anything else" placeholder changes per category
- [ ] Name, Phone, Email, Porchfest Before, and Local are all required
- [ ] Link is required for musician, optional for others
- [ ] Email format validation works
- [ ] Review page shows all entered data
- [ ] "Change" button returns to form with data preserved
- [ ] Consent checkbox blocks submit
- [ ] Formspree POST fires with all fields
- [ ] Success screen shows applicant name
- [ ] All inputs keyboard-navigable, errors announced by screen reader
- [ ] `npm run build` passes

---

## Batch 3: Polish

### Read first
- All components from Batches 0-2
- `docs/plans/2026-03-20-porchfest-mobile.md` (mobile optimization plan)

### localStorage persistence
Save form state on every change. Restore on mount. Clear on submit. "Start Over" link in category badge bar.

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
- Color contrast check (teal on white, burgundy on dark)
- Single h1 per page, h2 for sections

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
- [ ] localStorage persists and clears correctly
- [ ] Responsive images load correct sizes per viewport
- [ ] Lighthouse mobile score 90+
- [ ] All scroll reveals fire
- [ ] prefers-reduced-motion respected
- [ ] Tab navigation works everywhere
- [ ] All breakpoints correct
- [ ] `npm run build` and `npm run preview` pass

---

## Reference Prototypes

| File | Contents | Use for |
|------|----------|---------|
| `docs/prototypes/porchfest-landing-v3.html` | Full landing page | Layout, copy, colors, responsive, scroll timing |
| `docs/prototypes/porchfest-apply.jsx` | Original multi-step form | Visual style of inputs, cards, field layout ONLY. **Do NOT use the multi-step wizard flow. The form has been simplified to 2 screens. This spec overrides the prototype.** |
| `docs/plans/2026-03-20-porchfest-mobile.md` | Mobile optimization plan | Image pipeline, touch targets, iOS fixes, perf budget |

Read prototypes at the start of every batch. **This spec overrides the prototypes wherever they conflict.**