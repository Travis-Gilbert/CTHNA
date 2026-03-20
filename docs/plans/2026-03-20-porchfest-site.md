# Carriage Town Porchfest 2026: Full Site

> **Repo: `Travis-Gilbert/CTHNA` (https://github.com/Travis-Gilbert/CTHNA)**
> **Deploys to: cthna.vercel.app**
>
> **For Claude Code. One batch per session. Read entire spec before writing code.**
> **Read every file listed under "Read first" before writing a single line.**
> **Run `npm run build` after every batch. Do not proceed if the build fails.**
> **No em dashes anywhere in code, comments, or copy.**

## 1. What This Is

A two-page website for Carriage Town Porchfest 2026, a free neighborhood music and arts festival in Flint, MI. Page one is a public-facing landing page that sells the event to attendees and drives performer/vendor applications. Page two is a multi-step application form with category-specific flows for musicians, vendors, entertainers, and other participants. Built with Vite + React, deployed to Vercel. Submissions go to Formspree.

The landing page prototype is `porchfest-landing-v3.html`. The application form prototype is `porchfest-apply.jsx`. Both are in the `docs/prototypes/` directory.

## 2. Audience

Two audiences:

- **Attendees**: Flint residents, Michigan music fans, curious locals who saw a social post. They want to know what it is, when it is, and what it looks like. They should leave wanting to come.
- **Applicants**: Musicians, food vendors, entertainers, and community organizations who want to perform or participate. They came from the landing page or a direct link. They need a frictionless application flow.

Secondary audience: **Sponsors** looking for event partnership opportunities. The landing page includes a sponsor callout bar with a CTA to email.

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
    Nav.jsx                       # Shared sticky nav (both pages)
    Footer.jsx                    # Shared footer (both pages)
    ScrollReveal.jsx              # IntersectionObserver reveal wrapper
    Button.jsx                    # Primary/secondary button variants
  pages/
    Landing.jsx                   # Landing page: hero, about, stats, gallery, how, apply CTA
    Apply.jsx                     # Application page: category select, multi-step form, review, submit
  sections/
    Hero.jsx                      # Full-viewport hero with poster background
    About.jsx                     # "Every porch is a stage" section
    StatsBar.jsx                  # Dark stats strip (4 metrics)
    Gallery.jsx                   # Asymmetric photo grid (5 images, 12-col CSS grid)
    HowItWorks.jsx                # 3-step cards
    ApplyCTA.jsx                  # "Play a porch" section with 4 category cards
    SponsorBar.jsx                # Single-line sponsor callout
  form/
    CategorySelect.jsx            # Landing-within-apply: hero + 4 category cards
    StepDots.jsx                  # Progress indicator bar
    MusicianSteps.jsx             # 3-step musician form
    VendorSteps.jsx               # 2-step vendor form
    EntertainerStep.jsx           # 1-step entertainer form
    OtherStep.jsx                 # 1-step other form
    ContactStep.jsx               # Shared contact info step
    ReviewStep.jsx                # Summary + consent + submit
    SuccessScreen.jsx             # Post-submit confirmation
    field/
      TInput.jsx                  # Styled text input
      TTextarea.jsx               # Styled textarea
      TSelect.jsx                 # Styled select dropdown
      RadioCard.jsx               # Selectable card with radio behavior
      CheckChip.jsx               # Toggle chip with checkbox behavior
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
| react-router-dom | Client-side routing (2 pages) | `npm i react-router-dom` |
| vite | Build tool | (already in template) |
| @vitejs/plugin-react | JSX transform | (already in template) |

No other dependencies. All animations are CSS-only (IntersectionObserver for scroll reveal, CSS transitions for hover states). Formspree handles form submission with a plain fetch POST.

## 5. Design Tokens

All tokens live in `src/tokens.js`. Every component imports from this file. No inline hex values anywhere except in tokens.js.

```javascript
export const C = {
  paper:      '#F2EDE5',
  surface:    '#FAF6F1',
  cream:      '#FFF8F0',
  ink:        '#2A2420',
  inkMuted:   '#6A5E52',
  inkLight:   '#9A8E82',
  dark:       '#1A1816',
  darkWarm:   '#2A2420',
  border:     '#D4CCC4',
  borderLight:'#E8E0D6',
  teal:       '#2A7A7B',
  tealBright: '#35918F',
  tealDim:    'rgba(42,122,123,.1)',
  burg:       '#7A2E3A',
  burgBright: '#963848',
  burgDim:    'rgba(122,46,58,.1)',
  gold:       '#C49A4A',
  goldBright: '#D4AA52',
  goldDim:    'rgba(196,154,74,.1)',
  error:      '#A44A3A',
  heroText:   '#F0EBE4',
};

export const serif  = { fontFamily: "'Vollkorn', Georgia, serif" };
export const sans   = { fontFamily: "'Cabin', -apple-system, sans-serif" };
export const mono   = { fontFamily: "'Courier Prime', monospace" };

export const FONTS_URL = 'https://fonts.googleapis.com/css2?family=Vollkorn:ital,wght@0,400..900;1,400&family=Cabin:ital,wght@0,400..700;1,400&family=Courier+Prime:wght@400;700&display=swap';
```

**Color roles:**
- **Teal**: primary interactive (buttons, CTA, tags, musician card, pull quote border, nav CTA)
- **Burgundy**: highlight accent (stat numbers, hero h1 italic, gallery tag, "Applications Open" tag, entertainer card, nav mark, sponsor tag)
- **Gold**: warm tertiary (vendor card only)
- **Ground colors**: everything else

**Typography roles:**
- **Vollkorn (serif)**: headlines, stat numbers, card titles, large text
- **Cabin (sans)**: body copy, descriptions, form labels
- **Courier Prime (mono)**: section tags, step labels, metadata, field labels, button text, footer. Uppercase, letterspaced.

## 6. Build Order

```
Batch 0: Project scaffold, tokens, data file, shared components (Nav, Footer, Button, ScrollReveal)
Batch 1: Landing page (all sections from prototype)
Batch 2: Application page (form components, category flows, validation, Formspree submit)
Batch 3: Polish (localStorage persistence, scroll animations, accessibility audit, responsive fixes)
```

## Batch 0: Scaffold + Shared Components

### Read first
- Reference prototype: `docs/prototypes/porchfest-landing-v3.html`
- Reference prototype: `docs/prototypes/porchfest-apply.jsx`

### Scaffold

Remove `__init__.py`. Create the Vite + React project in the repo root. Use `npm create vite@latest . -- --template react` or manually create the files. Install `react-router-dom`.

Set up `index.html` with meta viewport, theme-color `#1A1816`, description, OG tags, Google Fonts preconnect + stylesheet link, reset styles (box-sizing, margin:0, body background: #F2EDE5).

Set up `src/main.jsx` with BrowserRouter wrapping App. Set up `src/App.jsx` with two routes: `/` (Landing) and `/apply` (Apply).

### New file: `src/tokens.js`
All design tokens as defined in Section 5.

### New file: `src/porchfest-data.js`
Central data file. ALL copy, categories, form options, photo paths, metadata. Contains: META object, STATS array, CATEGORIES array (with inline SVG icon functions and accent token refs), GENRES, SETUP_NEEDS, FOOD_TYPES, VENDOR_NEEDS, ENT_TYPES arrays, HOW_STEPS array, ABOUT_COPY object, PHOTOS object, HERO_COPY object.

### New file: `src/components/Nav.jsx`
Client component. Fixed top nav. Left: burgundy "P" circle + "Porchfest 2026" mono. Right: text links (About, Gallery) hidden on mobile + teal "Apply Now" button. Transparent by default, dark backdrop + blur on scroll. On apply page: hide About/Gallery links.

### New file: `src/components/Footer.jsx`
Left: "Carriage Town Porchfest" + CTHNA label. Right: two link columns. Bottom: copyright. Dark background.

### New file: `src/components/ScrollReveal.jsx`
IntersectionObserver wrapper. Props: delay (maps to transition-delay: delay * 0.08s). Respects prefers-reduced-motion.

### New file: `src/components/Button.jsx`
Primary (teal bg, white text) and secondary (transparent, border) variants. Mono uppercase letterspaced.

### Copy photos
All 9 photos into `public/photos/`: poster-hero.jpg, photo-from-stage.jpg, photo-red-porch-dj.jpg, photo-stage-lights.jpg, photo-crowd-dance.jpg, photo-mc-street.jpg, photo-wide-crowd.jpg, photo-golden-hour.jpg, photo-porch-singer.jpg.

### Verification
- [ ] `npm run dev` serves both routes
- [ ] Nav and Footer render on both pages
- [ ] All 9 photos load
- [ ] `npm run build` passes

## Batch 1: Landing Page

### Read first
- `docs/prototypes/porchfest-landing-v3.html` (full structure, copy, responsive)
- `src/porchfest-data.js`, `src/tokens.js`, all shared components

### New file: `src/pages/Landing.jsx`
Composes: Hero, PhotoStrip, About, StatsBar, Gallery, HowItWorks, ApplyCTA, SponsorBar.

### New file: `src/sections/Hero.jsx`
Full viewport, poster-hero.jpg background, dark gradient overlay. Content at bottom-left: teal tag "7th Annual . Flint, Michigan", headline "Music lives on the *porch.*" (porch in burgundy-bright italic), paragraph, meta row (July 17, ~3,000, Free in burgundy-bright), two buttons. Scroll hint at bottom. ScrollReveal stagger.

Responsive: headline clamps 44px min on mobile. Meta wraps. Buttons stack.

### New file: `src/sections/About.jsx`
2-col grid. Left: teal tag, "Every porch *is a stage.*" headline, 4 paragraphs with pull quote (teal border). Right: photo-porch-singer.jpg 480px rounded with overlay label.

Responsive: single col on <800px.

### New file: `src/sections/StatsBar.jsx`
Dark strip. 4-col grid. Vollkorn 52px burgundy-bright values, mono labels.

### New file: `src/sections/Gallery.jsx`
Dark section. 12-col CSS grid: g1 cols 1-7 340px, g2 cols 8-12 340px, g3 cols 1-4 260px, g4 cols 5-8 260px, g5 cols 9-12 260px. Hover: scale(1.04).

### New file: `src/sections/HowItWorks.jsx`
Paper section. 3-col card grid. Numbered steps (01, 02, 03). Hover: translateY(-4px).

### New file: `src/sections/ApplyCTA.jsx`
Dark section. 2-col top (text + golden-hour photo). 4-col card grid linking to /apply with category params. Each card: colored icon, title, description, arrow.

### New file: `src/sections/SponsorBar.jsx`
Dark bar. Burgundy tag "Sponsors", headline, body, teal CTA mailto.

### Verification
- [ ] All 7 sections render in order
- [ ] Hero poster fills viewport
- [ ] Stats in burgundy-bright
- [ ] Gallery asymmetric grid matches prototype
- [ ] Apply cards link to /apply with params
- [ ] Mobile stacks at 500, 640, 700, 800px
- [ ] `npm run build` passes

## Batch 2: Application Page

### Read first
- `docs/prototypes/porchfest-apply.jsx` (all form logic)
- `src/porchfest-data.js`, `src/tokens.js`, `src/components/Nav.jsx`

### New file: `src/pages/Apply.jsx`
Client component. State: stage, category, innerStep, formData, contact, agree, errors, submitting. On mount: check URL params for ?cat= pre-selection. Flow: category > form steps > contact > review > submit > done.

### New file: `src/form/CategorySelect.jsx`
Short dark hero, stats, 2x2 category card grid, "About the Event" FAQ cards.

### New file: `src/form/StepDots.jsx`
Progress dots. Active wider + colored. Step counter.

### New files: MusicianSteps.jsx (3 steps), VendorSteps.jsx (2 steps), EntertainerStep.jsx (1 step), OtherStep.jsx (1 step)
Port from prototype. See prototype for exact fields per step.

### New file: `src/form/ContactStep.jsx`
Name (required), email (required + validated), phone, city.

### New file: `src/form/ReviewStep.jsx`
Summary card, consent checkbox, submit.

### New file: `src/form/SuccessScreen.jsx`
Full dark screen, checkmark, confirmation message.

### New files: field/TInput.jsx, TTextarea.jsx, TSelect.jsx, RadioCard.jsx, CheckChip.jsx, Field.jsx

**Critical accessibility fixes from prototype:**
- Hidden inputs: use sr-only positioning, NOT display:none
- RadioCard/CheckChip: focus-visible ring on card border
- TSelect: aria-label
- Field: htmlFor/id pairs
- Errors: role="alert" aria-live="polite"

### Verification
- [ ] All 4 category flows work
- [ ] URL param pre-selection works
- [ ] Validation, error display, email format check
- [ ] Formspree POST fires
- [ ] Keyboard navigation works through all fields
- [ ] `npm run build` passes

## Batch 3: Polish

### Read first
- Both prototypes, all components from Batches 0-2

### localStorage persistence
Save form state on every change. Restore on mount. Clear on submit. "Start Over" link.

### Accessibility audit
Alt text, heading hierarchy, focus-visible, skip-to-content, prefers-reduced-motion, color contrast.

### Responsive audit

| Width | Behavior |
|-------|----------|
| 1100px+ | Full layout |
| 800px | About/apply-top stack, cards 2-col |
| 700px | How-it-works stacks |
| 640px | Nav links hide, strips/stats/gallery 2-col |
| 500px | Apply cards 1-col |
| <400px | Category cards 1-col, form grids stack |

### Link wiring
Landing "Apply to Perform" > /apply. Category cards > /apply?cat=X. Apply "Back" > /. Brand > /. Footer links correct.

### Verification
- [ ] localStorage persists and clears correctly
- [ ] All scroll reveals fire
- [ ] prefers-reduced-motion respected
- [ ] Tab navigation works everywhere
- [ ] All breakpoints correct
- [ ] `npm run build` and `npm run preview` pass

## Reference Prototypes

| File | Contents | Use for |
|------|----------|---------|
| `docs/prototypes/porchfest-landing-v3.html` | Full landing page | Layout, copy, colors, responsive, scroll timing |
| `docs/prototypes/porchfest-apply.jsx` | Complete application form | Form logic, validation, step flow, field layout, copy |

Read both at the start of every batch.