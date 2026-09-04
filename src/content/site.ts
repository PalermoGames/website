/**
 * Every string, palette and asset path the marketing sections render.
 *
 * Sections deliberately hold no copy of their own: a pitch changes far more
 * often than a layout, and publishers are the audience for the words, not the
 * markup. Anything marked TODO(copy) is placeholder text written to prove out
 * the layout — replace it before this goes in front of a publisher.
 */

export const CONTACT_EMAIL = 'contact@rizgames.com.ar';

/** Builds a mailto: with the subject line pre-filled so replies arrive triaged. */
export function mailto(subject: string, body?: string): string {
  const query = new URLSearchParams({ subject });
  if (body) query.set('body', body);
  // URLSearchParams encodes spaces as "+", which mail clients render literally.
  return `mailto:${CONTACT_EMAIL}?${query.toString().replace(/\+/g, '%20')}`;
}

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
  /** Two sentences, no more. Core loop first, aesthetic second. */
  hook: string;
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
    // TODO(copy): placeholder pitch — replace with the real elevator pitch.
    hook: 'A neo-noir brawler set in a Buenos Aires that never stopped dancing. Every exchange of blows runs on the beat, and losing the rhythm costs you more than the round.',
    tags: ['PC', 'In Development', 'Seeking Publisher'],
    align: 'left',
    palette: { base: '#150608', accent: '#ff3d5a', glow: '#ffb347' },
    media: {
      // TODO(media): drop a ~5s loop at src/assets/video/tango-district.webm and
      // import it here. Until then the section renders generated key art.
    },
    ctas: [
      {
        kind: 'email',
        label: 'View Pitch Deck',
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
    // TODO(copy): placeholder pitch — replace with the real elevator pitch.
    hook: 'You run the only elevator in a building that quietly rearranges itself between stops. Every passenger asks for a floor that should not exist, and you decide who gets there.',
    tags: ['PC', 'Prototype'],
    align: 'right',
    palette: { base: '#04121a', accent: '#3ddcff', glow: '#f3c969' },
    media: {
      // TODO(media): drop a ~5s loop at src/assets/video/what-floor.webm.
    },
    ctas: [
      {
        kind: 'email',
        label: 'View Pitch Deck',
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

export const PORTAL = {
  headline: "We don't just write code. We build worlds.",
  subheadline: 'Original PC titles from Buenos Aires.',
  cta: 'Explore Our IPs',
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

export const WORK_FOR_HIRE = {
  headline: 'Work-for-hire',
  lede: 'The other half of the studio. Thirty years of combined engineering, available to teams who need a build shipped rather than a pitch heard.',
  services: [
    { title: 'Game prototyping', text: 'Rapid, throwaway-cheap prototypes that answer whether a concept is worth funding.' },
    { title: 'Unity development', text: 'Mobile, console and WebGL production work, from feature teams to full verticals.' },
    { title: 'Technical leadership', text: 'Architecture, technical direction and team leadership on projects that outgrew their first codebase.' },
    { title: 'Software consulting', text: 'Consulting for game startups: pipelines, scaling, and the decisions that are expensive to reverse.' },
  ],
  principles: [
    'Agile and fast-moving',
    'Transparent with partners',
    'Player-first game design',
    'Technical excellence',
  ],
  cta: 'Discuss a project',
  subject: 'Work-for-hire Inquiry',
  emailBody: 'Hi RIZ Games,\n\nWe have a project we would like to discuss.\n\nCompany:\nRole:\nScope:\nTimeline:\n',
} as const;
