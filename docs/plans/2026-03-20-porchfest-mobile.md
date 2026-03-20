# Porchfest 2026: Mobile Optimization Plan

> Addendum to `docs/plans/2026-03-20-porchfest-site.md`
> Can be executed as a Batch 4, or folded into Batch 3 (Polish).

## Why This Matters

A neighborhood festival site gets the majority of its traffic from phones.
People find it through Instagram stories, group texts, and social shares.
On the day of the event, attendees are walking between porches checking
their phones to see what is happening. If the site loads slowly on cell
data or the form is painful to fill out on a phone, it fails at its
primary job.

The current prototype loads **4.6MB of images** on first visit. Every
photo is 2000px wide. A phone at 390px / 2x DPR needs 780px at most.
That means every image is transferring 2.5x more pixels than the screen
can display. On a crowded festival day with degraded cell service, this
is the difference between a 2-second load and a 10-second load.

---

## 1. Image Optimization

**Problem**: 9 photos at 2000px wide, totaling 4.6MB. The hero poster
is 1179x1822.

**Solution**: Generate responsive image sets and use `<picture>` + `srcset`.

### Image pipeline (run once, commit the output)

For each photo, generate three sizes:
- `photo-name-sm.webp` (640px wide, quality 75)
- `photo-name-md.webp` (1280px wide, quality 80)
- `photo-name-lg.webp` (2000px wide, quality 82)
- `photo-name-sm.jpg` (640px wide, quality 78) as fallback
- `photo-name-lg.jpg` (2000px wide, quality 82) as fallback

Use sharp (Node), squoosh, or a Vite plugin. Simplest path: a one-time
script with sharp:

```bash
npm i -D sharp
node scripts/optimize-photos.js
```

### Usage in components

```jsx
<picture>
  <source
    type="image/webp"
    srcSet="/photos/photo-from-stage-sm.webp 640w,
            /photos/photo-from-stage-md.webp 1280w,
            /photos/photo-from-stage-lg.webp 2000w"
    sizes="100vw"
  />
  <img
    src="/photos/photo-from-stage-lg.jpg"
    srcSet="/photos/photo-from-stage-sm.jpg 640w,
            /photos/photo-from-stage-lg.jpg 2000w"
    sizes="100vw"
    alt="..."
    loading="lazy"
  />
</picture>
```

### Expected savings

| Image | Current | Mobile (640w WebP) | Savings |
|-------|---------|--------------------|---------|
| poster-hero.jpg | 362KB | ~80KB | 78% |
| photo-from-stage.jpg | 825KB | ~120KB | 85% |
| photo-wide-crowd.jpg | 566KB | ~100KB | 82% |
| Total page (9 images) | 4.6MB | ~700KB | 85% |

### Loading strategy

- **Hero poster**: `loading="eager"`, `fetchpriority="high"`. This is
  the LCP (Largest Contentful Paint) element.
- **Photo strip (4 images)**: `loading="lazy"`. Below the fold on mobile.
- **All other images**: `loading="lazy"`.

---

## 2. Touch Targets

WCAG 2.2 requires 24x24px minimum (AAA recommends 44x44).
Apple HIG recommends 44x44pt.

### Audit

| Element | Current size | Fix |
|---------|-------------|-----|
| Nav "Apply Now" button | 38px tall | Increase to 11px 20px padding on mobile |
| CheckChip (form) | 34px tall | min-height 44px on mobile |
| Footer links | 8px spacing | Add 4px more margin-bottom |
| Consent checkbox | 18x18px visual | Increase to 22x22 on mobile |
| RadioCard, Category cards | 44px+ | Fine |

---

## 3. Form UX on Mobile

### Input type hints

| Field | Should be | Mobile keyboard |
|-------|-----------|----------------|
| Email | `type="email"` | @ and .com keys |
| Phone | `type="tel"` | Number pad |
| Music/vendor/act links | `type="url"` | .com and / keys |

The prototype uses `type="text"` for all URL fields. Change to `type="url"`.

### iOS zoom prevention

iOS Safari auto-zooms inputs below 16px font-size. The prototype uses 15px.

```css
@media (max-width: 640px) {
  input, textarea, select { font-size: 16px !important; }
}
```

### Scroll to error

When validation fails, scroll to the first error instead of page top:

```javascript
requestAnimationFrame(() => {
  const firstError = document.querySelector('[role="alert"]');
  if (firstError) {
    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
});
```

### Sticky form navigation

On long form steps, the Back/Continue bar scrolls out of view.

```css
@media (max-width: 640px) {
  .form-nav {
    position: sticky;
    bottom: 0;
    background: var(--paper);
    padding: 16px 20px;
    border-top: 1px solid var(--border);
    z-index: 10;
  }
}
```

### Two-column grid stacking

Genre/Band Size and Email/Phone grids must stack below 500px:

```css
.form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
@media (max-width: 500px) {
  .form-grid-2 { grid-template-columns: 1fr; }
}
```

---

## 4. Landing Page Mobile Layout

### Hero

The poster is portrait (1179x1822) which works well on mobile. Adjust:

```css
@media (max-width: 640px) {
  .hero-h1 { font-size: 44px; max-width: 100%; }
  .hero-act { flex-direction: column; width: 100%; }
  .hero-act .bp, .hero-act .bs { width: 100%; justify-content: center; }
}
```

Full-width stacked buttons are easier to tap on mobile.

### Stats

Reduce number size on mobile:
```css
@media (max-width: 640px) { .st-n { font-size: 36px; } }
```

### Gallery

Reduce min-heights on mobile for less scrolling:
```css
@media (max-width: 640px) {
  .g1 { min-height: 200px; }
  .g2, .g3, .g4, .g5 { min-height: 160px; }
}
```

---

## 5. iOS and Android Specific

### Safe area insets (notch/dynamic island)

```css
.nav {
  padding-top: max(14px, env(safe-area-inset-top));
  padding-left: max(24px, env(safe-area-inset-left));
  padding-right: max(24px, env(safe-area-inset-right));
}
.form-nav-sticky {
  padding-bottom: max(16px, env(safe-area-inset-bottom));
}
```

HTML head:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
```

### Backdrop-filter fallback

May cause flicker on some iOS versions. Solid fallback on mobile:
```css
@media (max-width: 640px) {
  .nav.scrolled {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    background: rgba(26, 24, 22, 0.97);
  }
}
```

---

## 6. Performance Budget

| Metric | Target | Why |
|--------|--------|-----|
| LCP | <2.5s on 4G | Core Web Vital, SEO |
| FID | <100ms | Instant button response |
| CLS | <0.1 | Images reserve space before loading |
| Total weight (mobile) | <1MB | Fast on cell data at crowded event |

### CLS prevention

Every image needs `width`/`height` or `aspect-ratio`:

```jsx
<img
  src="..." width={2000} height={1333}
  style={{ aspectRatio: '2000/1333', width: '100%', height: 'auto' }}
  alt="..."
/>
```

---

## 7. Social Sharing

The poster is the ideal OG image (portrait, visually distinctive, has
event name and date embedded).

```html
<meta property="og:image" content="https://cthna.vercel.app/photos/poster-hero.jpg">
<meta property="og:image:width" content="1179">
<meta property="og:image:height" content="1822">
<meta property="og:title" content="Carriage Town Porchfest 2026">
<meta property="og:description" content="Flint's free neighborhood music festival. Friday July 17, 2026.">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
```

Apply page gets different OG title/description:
```html
<meta property="og:title" content="Apply to Porchfest 2026">
<meta property="og:description" content="Musicians, vendors, entertainers: apply to be part of Flint's biggest block party.">
```

---

## 8. Future: Day-of Event Mode

Not in current scope. Worth building later as a portfolio centerpiece.

On July 17th the site's job changes from "convince me to come" to "help
me navigate while I am here." What people need day-of:

- **Who is playing where, right now.** Schedule view, current + upcoming,
  grouped by porch/stage.
- **Where am I.** Map with user location dot (Geolocation API).
- **What is near me.** Food vendors sorted by proximity.

Could be a `/live` route activated on event day. Schedule data from a
JSON file or Google Sheet that CTHNA updates. Most porchfest sites go
dead on event day because they were built for pre-event only. Solving
this would be genuinely novel.

---

## Implementation Checklist

### Fold into Batch 3 (or execute as Batch 4)

- [ ] Generate responsive image sizes (640/1280/2000, WebP + JPEG)
- [ ] Add `<picture>` + `srcset` + `sizes` to all image components
- [ ] `loading="eager"` + `fetchpriority="high"` on hero only
- [ ] `loading="lazy"` on all other images
- [ ] `width`/`height` or `aspect-ratio` on all images (CLS)
- [ ] Change URL fields to `type="url"`
- [ ] Input font-size 16px on mobile (iOS zoom fix)
- [ ] CheckChip min-height 44px on mobile
- [ ] Consent checkbox 22x22 on mobile
- [ ] Scroll-to-first-error on validation failure
- [ ] Sticky form Back/Continue on mobile
- [ ] Stack 2-column form grids below 500px
- [ ] Full-width hero buttons on mobile
- [ ] Safe area insets on nav and sticky form bar
- [ ] Solid nav background on mobile (backdrop-filter fallback)
- [ ] Full OG tags for both pages
- [ ] Twitter card meta tags
- [ ] `viewport-fit=cover` in viewport meta
- [ ] Test on iPhone Safari and Android Chrome
- [ ] Lighthouse mobile audit, target 90+ performance