// Application form prototype - Porchfest 2026
// This is the reference file for Claude Code Batch 2
// The full 816-line JSX is available in the Claude.ai conversation outputs
// See docs/plans/2026-03-20-porchfest-site.md for the build spec
//
// KEY ARCHITECTURE:
// - Single-file React component (PorchfestApply)
// - State machine: category -> form -> contact -> review -> done
// - 4 category flows: musician (3 steps), vendor (2), entertainer (1), other (1)
// - Formspree POST on submit
// - Design tokens at top of file (const T = {...})
// - Font stack: Vollkorn (serif), Cabin (sans), Courier Prime (mono)
//
// FORM FIELDS BY CATEGORY:
//
// Musician (3 steps):
//   Step 0: musicLink (required), musicLink2, artistName (required), genre (required select), members (select)
//   Step 1: bio (required textarea), experience (radio: first/returning/flint)
//   Step 2: setLength (required radio: 30/45/60), setupNeeds (checkchips), bringPA (radio), accessibility (textarea)
//
// Vendor (2 steps):
//   Step 0: businessName (required), foodDescription (required textarea), vendorType (checkchips), vendorSocial
//   Step 1: footprint, vendorNeeds (checkchips), vendorHistory (radio)
//
// Entertainer (1 step):
//   actName (required), actType (checkchips), actBio (required textarea), actLink
//
// Other (1 step):
//   otherName (required), otherDescription (required textarea), otherLink
//
// Contact (shared):
//   name (required), email (required + format validation), phone, city
//
// VALIDATION: runs on advance(), blocks navigation if errors exist, inline error messages below fields
// SUBMIT: POST to Formspree endpoint, JSON body with { category, ...formData, ...contact }
//
// ACCESSIBILITY FIXES NEEDED (from spec):
// - Replace display:none on hidden inputs with sr-only positioning
// - Add htmlFor/id pairs on Field components
// - Add role="alert" aria-live="polite" on error messages
// - Add focus-visible ring on RadioCard and CheckChip when tabbed to
