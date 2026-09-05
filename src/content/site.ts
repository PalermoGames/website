/**
 * Every string, palette and asset path the marketing sections render.
 *
 * Sections deliberately hold no copy of their own: a pitch changes far more
 * often than a layout, and the buyer is the audience for the words, not the
 * markup.
 *
 * Anything marked TODO(copy) is a fact this file does not know — a commercial
 * term, an elevator pitch — and is deliberately left for a human. Run
 * `npm run check:copy` before deploying; it fails on any TODO(copy) left in
 * here, which is exactly how two placeholder game pitches once reached
 * production.
 */

export const CONTACT_EMAIL = 'contact@rizgames.com.ar';

/**
 * Primary call to action across the site. Booking beats a form for high-intent
 * work-for-hire buyers, but the email below stays visible for everyone who is
 * not ready to put a slot in their calendar.
 *
 * TODO(copy): replace with the real Calendly (or Cal.com) scheduling URL.
 */
export const CALENDLY_URL = 'https://calendly.com/rizgames/intro';

/**
 * True while a string is still an unwritten placeholder.
 *
 * Sections use this to render nothing rather than show a raw marker to a
 * visitor. `npm run check:copy` is the real gate; this is the seatbelt, because
 * the last time placeholder copy was in this file it went to production and
 * stayed there.
 */
export function pending(text: string | undefined): boolean {
  return text === undefined || text.includes('TODO(copy)');
}

/** Builds a mailto: with the subject line pre-filled so replies arrive triaged. */
export function mailto(subject: string, body?: string): string {
  const query = new URLSearchParams({ subject });
  if (body) query.set('body', body);
  // URLSearchParams encodes spaces as "+", which mail clients render literally.
  return `mailto:${CONTACT_EMAIL}?${query.toString().replace(/\+/g, '%20')}`;
}

/* -------------------------------------------------------------------------- */
/* Work-for-hire — the "/" route                                              */
/* -------------------------------------------------------------------------- */

export const HOME = {
  eyebrow: 'Work-for-hire · Buenos Aires',
  /** Leads with the proof, because the proof is the differentiator. */
  headline: 'Game engineers who have shipped to hundreds of millions of players.',
  sub: 'RIZ Games takes on Unity production, prototypes and technical rescue work for teams who need a build shipped — and makes its own games with the same hands.',
  primaryCta: 'Book a call',
  secondaryCta: 'See our games',
} as const;

/**
 * The proof bar, directly under the hero.
 *
 * Same evidence as PEDIGREE.proof, cut down to a number and a clause. A
 * publisher will read a paragraph; a client scanning four vendor sites will
 * not, and these are the only figures that survive that scan.
 */
export const STATS = [
  { value: '800M+', label: 'Downloads', detail: 'Franchise trivia titles played in 180+ countries' },
  { value: '$700M+', label: 'Grossed', detail: 'Squad-based RPG on a globally iconic superhero IP' },
  { value: '30 yrs', label: 'Combined', detail: 'Production engineering across mobile, console and PC' },
] as const;

/**
 * How to actually buy the thing. The old site described four services and no
 * way to engage them, which is the question a client asks first.
 */
export const ENGAGEMENT = {
  headline: 'How we work',
  lede: 'Four shapes of engagement. If your project is a different shape, say so on the call — we would rather tell you we are the wrong team than bill you to find out.',
  models: [
    {
      title: 'Embedded engineers',
      text: 'Senior Unity developers inside your team, your sprints and your codebase. One person or a full feature squad.',
    },
    {
      title: 'Full vertical',
      text: 'We own a feature end to end — design intent in, shipped and instrumented build out.',
    },
    {
      title: 'Fixed-scope prototype',
      text: 'A funded question answered in weeks: is this concept worth building? Throwaway-cheap on purpose.',
    },
    {
      title: 'Technical rescue',
      text: 'Architecture review and remediation for a codebase that outgrew the design it started with.',
    },
  ],
  /**
   * The logistics a buyer weighs before the call. The time zone is the one most
   * competitors cannot match and the old site never mentioned it.
   */
  facts: [
    {
      label: 'Time zone',
      // UTC-3. Against Eastern Europe or South Asia this is the whole pitch.
      text: 'Buenos Aires, UTC−3. A full working day of overlap with US Eastern and Pacific teams.',
    },
    { label: 'Languages', text: 'English and Spanish, natively across the team.' },
    // TODO(copy): confirm the real lead time before a team can start.
    { label: 'Lead time', text: 'TODO(copy): typical time from signed scope to first commit.' },
    // TODO(copy): confirm the real minimum engagement, or delete this entry.
    { label: 'Minimum', text: 'TODO(copy): smallest engagement worth taking, or remove.' },
  ],
} as const;

/**
 * Shipped work, as distinct from the two IPs still in development.
 *
 * Nitro Racers is delisted, so there is no store link — but "built, launched
 * and operated" is a stronger claim to a client than anything unreleased, and
 * it was sitting unused in src/assets/images/.
 */
export const PORTFOLIO = {
  headline: 'We are our own hardest client.',
  lede: 'Everything we sell, we have done for ourselves first — shipped to a store, instrumented, monetised and supported.',
  shipped: {
    title: 'Nitro Racers',
    tags: ['Mobile', 'Shipped', 'Delisted'],
    // TODO(copy): confirm scope — engine, team size, what RIZ actually built.
    text: 'TODO(copy): one or two sentences on what Nitro Racers was and what shipping it involved. Ad-monetised mobile title, built and live-operated in house.',
  },
  inDevelopmentLede: 'And two original PC titles in development, which is where the design opinions come from.',
  cta: 'See the games',
} as const;

export const HOME_CONTACT = {
  headline: 'Tell us what you are building.',
  body: 'Prototypes, feature teams, or a codebase that has outgrown its first architecture — book twenty minutes and we will tell you honestly whether we are the right team.',
  cta: 'Book a call',
  subject: 'Work-for-hire Inquiry',
  emailBody: 'Hi RIZ Games,\n\nWe have a project we would like to discuss.\n\nCompany:\nRole:\nScope:\nTimeline:\n',
} as const;

/**
 * Retained for the services grid. The principles list moved off the page: four
 * unfalsifiable claims ("technical excellence") persuade nobody, and the
 * engagement facts above do the job they were standing in for.
 */
export const SERVICES = {
  headline: 'What we take on',
  items: [
    { title: 'Game prototyping', text: 'Rapid, throwaway-cheap prototypes that answer whether a concept is worth funding.' },
    { title: 'Unity development', text: 'Mobile, console and WebGL production work, from feature teams to full verticals.' },
    { title: 'Technical leadership', text: 'Architecture, technical direction and team leadership on projects that outgrew their first codebase.' },
    { title: 'Software consulting', text: 'Consulting for game startups: pipelines, scaling, and the decisions that are expensive to reverse.' },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Original IP — the "/original-ip" route                                     */
/* -------------------------------------------------------------------------- */

/**
 * Drives both the fallback key art and the section's colour grading. The two
 * games are graded to clash on purpose — the reader should feel they crossed
 * into a different world rather than scrolled to the next card.
 */
export interface GamePalette {
  /** Deepest tone, used as the section ground. */
  base: string;
  /** Primary light source in the fallback art. */
  accent: string;
  /** Secondary light source, plus pill borders and CTA glow. */
  glow: string;
}

export type GameCta =
  | { kind: 'email'; label: string; subject: string; body?: string }
  | { kind: 'video'; label: string; src: string; poster?: string };

export interface Game {
  id: string;
  title: string;
  /**
   * Two sentences, no more. Core loop first, aesthetic second. Left empty
   * until it is true — the showcase omits the paragraph rather than render a
   * pitch nobody at the studio wrote.
   */
  hook?: string;
  tags: string[];
  /** Alternating sides give the showcase a rhythm as you scroll. */
  align: 'left' | 'right';
  palette: GamePalette;
  media: {
    /** Looping WebM of gameplay. Falls back to generated key art when unset. */
    video?: string;
    /** First frame, shown while the video buffers. */
    poster?: string;
    /** Wordmark SVG. Falls back to the title set in the display face. */
    logo?: string;
  };
  /** First entry renders solid, the rest ghost. Video CTAs without a src are skipped. */
  ctas: GameCta[];
}

export const GAMES: Game[] = [
  {
    id: 'tango-district',
    title: 'Tango District',
    // TODO(copy): the real elevator pitch. The previous text here was invented
    // to prove out the layout and shipped to production by accident; an empty
    // hook renders nothing rather than something untrue.
    hook: undefined,
    tags: ['PC', 'In Development', 'Seeking Publisher'],
    align: 'left',
    palette: { base: '#150608', accent: '#ff3d5a', glow: '#ffb347' },
    media: {
      // Drop a ~5s loop at src/assets/video/tango-district.webm and import it
      // here; see README "Game media". Until then this renders generated art.
    },
    ctas: [
      {
        kind: 'email',
        label: 'Request Pitch Deck',
        subject: 'Pitch deck request — Tango District',
        body: 'Hi RIZ Games,\n\nWe would like access to the Tango District pitch deck.\n\nStudio:\nRole:\n',
      },
      // Activates the teaser modal as soon as a file lands here.
      { kind: 'video', label: 'Watch Teaser', src: '' },
    ],
  },
  {
    id: 'what-floor',
    title: 'What Floor',
    // TODO(copy): the real elevator pitch. See the note on Tango District.
    hook: undefined,
    tags: ['PC', 'Prototype'],
    align: 'right',
    palette: { base: '#04121a', accent: '#3ddcff', glow: '#f3c969' },
    media: {
      // Drop a ~5s loop at src/assets/video/what-floor.webm.
    },
    ctas: [
      {
        kind: 'email',
        label: 'Request Pitch Deck',
        subject: 'Pitch deck request — What Floor',
        body: 'Hi RIZ Games,\n\nWe would like access to the What Floor pitch deck.\n\nStudio:\nRole:\n',
      },
      {
        kind: 'email',
        label: 'Request Build',
        subject: 'Build request — What Floor',
        body: 'Hi RIZ Games,\n\nWe would like a playable build of What Floor.\n\nStudio:\nRole:\nPlatform:\n',
      },
    ],
  },
];

export const IP_HERO = {
  eyebrow: 'Original IP',
  headline: 'Two PC titles, looking for a publisher.',
  sub: 'Built by a team that has shipped and operated games at scale. Below: what they are, where they stand, and how to see more.',
  cta: 'See the games',
} as const;

export const PEDIGREE = {
  headline: 'Creative vision, backed by shipped-title engineering.',
  body: 'RIZ Games is a small studio built on a long run of production work. Before these were our own IPs, the same people were architecting live systems for titles measured in hundreds of millions of players — content pipelines, real-time multiplayer, and the unglamorous optimisation work that keeps a build shippable. We know what a milestone schedule costs and we know how to hit one.',
  /** Named so a publisher can place the team without a call. */
  studios: ['Etermax', 'Honey B Games'],
  proof: [
    {
      label: 'Scale',
      text: 'Core systems for trivia titles played in 180+ countries, in a franchise past 800 million downloads.',
    },
    {
      label: 'Live ops',
      text: 'Combat and live-operations work on a squad-based RPG built on a globally iconic superhero IP, grossing over $700 million.',
    },
    {
      label: 'Optimisation',
      text: 'Performance and tech support for a mobile simulation title with 12+ million downloads.',
    },
  ],
} as const;

export const GATEWAY = {
  headline: 'Looking for our next partner.',
  body: 'We are actively seeking publishing partners to help bring Tango District and What Floor to the global market.',
  cta: 'Start the conversation',
  subject: 'Publishing Inquiry - Original IPs',
  emailBody:
    'Hi RIZ Games,\n\nWe are interested in discussing publishing for your original IPs.\n\nCompany:\nRole:\nTitles of interest:\n',
} as const;
