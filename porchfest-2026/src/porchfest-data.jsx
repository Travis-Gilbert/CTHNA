import { C } from './tokens';

export const META = {
  title: 'Carriage Town Porchfest 2026 | Flint, MI',
  description: "Live music on front porches, street stages, and sidewalks across Carriage Town, Flint. Free entry. Friday, July 17, 2026.",
  ogImage: '/photos/poster-hero.jpg',
};

export const STATS = [
  { value: '+3,000', label: 'Attendees in 2025' },
  { value: '20+', label: 'Performing Acts' },
  { value: '45', label: 'Vendors last year' },
  { value: '7', label: 'Years running' },
];

export const CATEGORIES = [
  {
    id: 'musician',
    icon: () => (
      <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
        <path d="M10 20V8l14-3v12" stroke={C.teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="7" cy="20" r="3" stroke={C.teal} strokeWidth="1.5"/>
        <circle cx="21" cy="17" r="3" stroke={C.teal} strokeWidth="1.5"/>
      </svg>
    ),
    label: 'Musician / Band',
    description: 'Solo, duo, full band, or DJ. Any genre. Send us your sound and we will match you to a porch.',
    accent: 'teal',
  },
  {
    id: 'vendor',
    icon: () => (
      <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
        <path d="M4 10h20l-2 12H6L4 10z" stroke={C.gold} strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M9 10V7a5 5 0 0110 0v3" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Food Vendor',
    description: 'Food trucks, pop-ups, and beverage stands. Tell us what you serve and we will put you on the block.',
    accent: 'gold',
  },
  {
    id: 'entertainer',
    icon: () => (
      <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="10" r="4" stroke={C.burg} strokeWidth="1.5"/>
        <path d="M6 24c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke={C.burg} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M21 6l2-2M7 6L5 4M14 4V2" stroke={C.burg} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Entertainer / Artist',
    description: 'Comedy, dance, chalk art, street performance, or spoken word. Bring whatever makes the block come alive.',
    accent: 'burg',
  },
  {
    id: 'other',
    icon: () => (
      <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke={C.inkLight} strokeWidth="1.5"/>
        <circle cx="14" cy="14" r="2" fill={C.inkLight}/>
        <circle cx="8" cy="14" r="2" fill={C.inkLight}/>
        <circle cx="20" cy="14" r="2" fill={C.inkLight}/>
      </svg>
    ),
    label: 'Something Else',
    description: 'Craft vendors, community orgs, sponsors, or anything else. Tell us your idea.',
    accent: 'inkLight',
  },
];

export const GENRES = [
  'Hip-Hop / Rap', 'R&B / Soul', 'Rock', 'Folk / Acoustic', 'Jazz',
  'Blues', 'Pop', 'Country', 'Electronic / DJ', 'Punk',
  'Gospel', 'Latin', 'Spoken Word', 'Other',
];

export const SETUP_NEEDS = [
  'Power outlet', 'Extra chairs', 'Shade / canopy', 'Parking for van',
  'Ground-level access', 'Table',
];

export const FOOD_TYPES = [
  'BBQ / Grill', 'Soul Food', 'Mexican', 'Pizza', 'Vegan / Vegetarian',
  'Desserts / Baked Goods', 'Beverages', 'Other',
];

export const VENDOR_NEEDS = [
  'Power outlet', 'Water access', 'Extra table', 'Shade / canopy',
  'Parking for truck', 'Waste disposal',
];

export const ENT_TYPES = [
  'Comedy / Stand-up', 'Dance', 'Spoken Word / Poetry', 'Visual Art / Chalk',
  'Magic / Circus', 'Theater / Improv', 'Other',
];

export const HOW_STEPS = [
  {
    num: '01',
    title: 'Show up',
    body: 'Carriage Town, Friday, July 17th, afternoon onward. Free street parking. Six blocks centered on Mason Street and First Avenue.',
  },
  {
    num: '02',
    title: 'Walk the blocks',
    body: 'Every porch and corner has a different act: hip-hop beside folk beside a DJ beside a comedian. Walk fifty feet and the lineup changes.',
  },
  {
    num: '03',
    title: 'Stay all day',
    body: 'Grab food from any vendor on Mason Street. Claim a lawn chair. Bring the family. The festival runs until sundown, sometimes longer.',
  },
];

export const ABOUT_COPY = {
  headline: 'Every porch',
  headlineAccent: 'is a stage.',
  pullQuote: 'Walk through the neighborhood and the music finds you. Porches, street corners, front yards. Turn any direction and something is happening.',
  paragraphs: [
    'Seven years ago, a few Carriage Town residents put bands on their front porches and invited the neighborhood. Now Porchfest fills six blocks, draws thousands, and ranks among Genesee County\'s most popular festivals.',
    'Performers play on residential porches, sidewalk stages, and the main stage at Mason Street and First Avenue. Food vendors line the blocks. The whole thing runs from afternoon into evening, and every part of it is free.',
    'We prioritize Flint-based artists and acts rooted in the community. All genres, all forms of performance. If you play music, serve food, or bring something that makes a block party better, a porch may have your name on it.',
  ],
};

export const PHOTOS = {
  hero: '/photos/poster-hero.jpg',
  strip: [
    '/photos/photo-red-porch-dj.jpg',
    '/photos/photo-stage-lights.jpg',
    '/photos/photo-crowd-dance.jpg',
    '/photos/photo-mc-street.jpg',
  ],
  gallery: [
    { src: '/photos/photo-wide-crowd.jpg', cls: 'g1', alt: 'Wide view of hundreds at Porchfest with historic houses and vendor tents' },
    { src: '/photos/photo-red-porch-dj.jpg', cls: 'g2', alt: 'DJ and performers on a red front porch' },
    { src: '/photos/photo-mc-street.jpg', cls: 'g3', alt: 'MC performing at the street corner' },
    { src: '/photos/photo-stage-lights.jpg', cls: 'g4', alt: 'Performer under dramatic stage lights' },
    { src: '/photos/photo-golden-hour.jpg', cls: 'g5', alt: 'Family walking through the neighborhood at golden hour' },
  ],
  goldenHour: '/photos/photo-golden-hour.jpg',
  porchSinger: '/photos/photo-porch-singer.jpg',
};

export const HERO_COPY = {
  tag: '7th Annual',
  tagAccent: 'Porchfest',
  tagSuffix: 'Flint, Michigan',
  headline: "Flint's Best",
  headlineAccent: 'Fest',
  sub: "Flint's best festival returns. Performers take over front porches, street corners, and stages across six blocks of Carriage Town while thousands wander from act to act.",
  metaItems: [
    { value: 'July 17', label: 'Friday, 2026' },
    { value: '+3,000', label: 'Attendees in 2025' },
    { value: 'Free', label: 'Always, for everyone' },
  ],
};

// Color lookup helper for accent strings
export const accentColor = (accent) => {
  const map = {
    teal: C.teal,
    tealBright: C.tealBright,
    tealDim: C.tealDim,
    gold: C.gold,
    goldBright: C.goldBright,
    goldDim: C.goldDim,
    burg: C.burg,
    burgBright: C.burgBright,
    burgDim: C.burgDim,
    inkLight: C.inkLight,
  };
  return map[accent] || C.teal;
};

export const accentBright = (accent) => {
  const map = {
    teal: C.tealBright,
    gold: C.goldBright,
    burg: C.burgBright,
    inkLight: C.inkLight,
  };
  return map[accent] || C.tealBright;
};

export const accentDim = (accent) => {
  const map = {
    teal: C.tealDim,
    gold: C.goldDim,
    burg: C.burgDim,
    inkLight: 'rgba(154,142,130,.1)',
  };
  return map[accent] || C.tealDim;
};
