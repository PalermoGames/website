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

import nitroLogo from '@/assets/images/LogoNitroRacers.png';
import nitroArt from '@/assets/images/nitroracersnologo.webp';

export const CONTACT_EMAIL = 'contact@rizgames.com.ar';

/**
 * Scheduling link for the primary call to action. Booking beats an inbox for a
 * high-intent work-for-hire buyer — but only once it points at a page that
 * exists. This is the studio's Google Calendar appointment schedule.
 *
 * It previously held `https://calendly.com/rizgames/intro`, a placeholder for a
 * service the studio does not use. That URL 404s, so the largest button on the
 * revenue route, the header CTA on both routes and the closing CTA all pointed
 * at a dead page. Empty is the honest "no link" state and `BOOKING` falls back
 * to email — never a guessed URL.
 */
export const BOOKING_URL = 'https://calendar.app.google/1b825ErypRRtXwfp9';

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
  /**
   * The proposition, not the proof — the stat bar directly below carries the
   * proof, and repeating it here spends the largest type on the page saying
   * something the reader is about to be shown anyway.
   *
   * "Your design" is the differentiator worth the space: nearly everything this
   * team has built has been someone else's game, on someone else's schedule,
   * which is exactly what a studio hiring engineers is afraid it will not get
   * from a studio that has its own IP.
   */
  headline: 'Senior game engineers, on your design and your schedule.',
  sub: 'Funded prototypes, embedded engineers and whole builds. Everyone here has shipped and operated live games at scale — and we make our own, so the opinions about game feel are ours too.',
  secondaryCta: 'See our own game',
} as const;

/**
 * The proof bar, directly under the hero.
 *
 * Three figures, because a client comparing four vendor sites reads three
 * numbers and no paragraphs. Every number here belongs to a title this team
 * worked on, and every title is named — an anonymised number is a number a
 * buyer cannot check, and a number the team did not earn is worse than none.
 *
 * Two borrowed numbers used to live here and both are gone:
 *
 * - "$700M+ grossed" for Marvel Strike Force. The engineering credit is real,
 *   through Trick Game Studio, but small next to the trivia, simulation and
 *   product work, and a revenue figure that large implies an involvement to
 *   match. PEDIGREE states the credit plainly instead, without the number.
 * - "800M+ downloads" for the Trivia Crack spin-offs. That figure is Etermax's
 *   company-wide total across every game it has published; the franchise's own
 *   number is a fraction of it, and the original Trivia Crack — which nobody
 *   here worked on — is nearly all of that. The spin-offs this team actually
 *   built systems for are the number below.
 *
 * Do not reach up a level for a bigger figure. Studio totals, franchise totals
 * and publisher totals are not this team's work.
 */
export const STATS = [
  {
    value: 'No. 1',
    label: 'US App Store',
    detail: "Focus Friend, built at Honey B Games — and Google Play's App of the Year for 2025",
  },
  { value: '12M+', label: 'Installs', detail: 'Boba Story, where the team handled performance and live support' },
  {
    value: '10M+',
    label: 'Downloads',
    detail: 'Trivia Crack Adventure, where the team built core gameplay systems at Etermax',
  },
] as const;

/**
 * How to actually buy the thing. The old site described four services and no
 * way to engage them, which is the question a client asks first.
 *
 * `models` is the commercial shape; `SERVICES` is the work itself. Keep the two
 * apart — they previously sat a screen apart saying the same four things in
 * different words, which reads as padding.
 */
export const ENGAGEMENT = {
  headline: 'How we work',
  lede: 'Four shapes of engagement. If your project is a different shape, say so — we would rather tell you we are the wrong team than bill you to find out.',
  models: [
    {
      title: 'Embedded engineers',
      text: 'Senior Unity developers inside your team, your sprints and your repo. One engineer or a small squad, for as long as the milestone runs.',
    },
    {
      title: 'Full vertical',
      text: 'We own a feature end to end: design intent in, shipped and instrumented build out. You review the result, not the tickets.',
    },
    {
      title: 'Fixed-scope prototype',
      text: 'A funded question answered in weeks, at a price agreed up front. Cheap enough to throw away, finished enough to put in front of the people holding the budget.',
    },
    /**
     * The largest shape, and the one the studio actually wants. It replaced
     * "Technical rescue" — remediation on somebody else's broken codebase was
     * never something this team offered or enjoyed, and pitching for it invites
     * exactly the projects nobody here wants to take.
     */
    {
      title: 'Whole build',
      text: 'You bring the design, the art direction and the deadline; we build the game and take it to the store. The closest thing to how we work on our own titles, with your name on it.',
    },
  ],
  /**
   * The logistics a buyer weighs before the first reply. The time zone is the
   * one most competitors cannot match and the old site never mentioned it.
   *
   * Two facts a buyer also asks for are deliberately absent, because nobody at
   * the studio has decided them: typical lead time from signed scope to first
   * commit, and the smallest engagement worth taking. Add them here when they
   * are real answers rather than plausible ones.
   */
  facts: [
    {
      label: 'Time zone',
      // UTC-3. Against Eastern Europe or South Asia this is the whole pitch.
      text: 'Buenos Aires, UTC−3. A full working day of overlap with US Eastern and Pacific, and a working morning with Europe.',
    },
    { label: 'Languages', text: 'Spanish natively across the team, English day to day with US teams.' },
    {
      label: 'Team',
      text: 'Two full-time senior engineers, plus QA and level design we work with regularly. No juniors learning on your project.',
    },
    {
      label: 'Stack',
      text: 'Unity across mobile, PC and console. Three.js when the brief is a browser, and your own engine when that is the job.',
    },
  ],
} as const;

/**
 * The work, as distinct from the shapes it can be bought in.
 *
 * Named for what a client arrives missing rather than for a job title: nobody
 * turns up needing "software consulting", they turn up needing multiplayer, or
 * needing the build to stop dying on cheap Android.
 */
export const SERVICES = {
  headline: 'What we take on',
  items: [
    {
      title: 'Gameplay and systems',
      text: 'Features inside your game and your codebase: mechanics, progression, meta, and the tools your designers drive them with.',
    },
    {
      title: 'Backend and live services',
      text: 'Real-time and turn-based multiplayer, accounts, remote config, analytics and A/B testing — built by the same people building the client.',
    },
    {
      title: 'Ship and operate',
      text: 'Store submission, payments, ads and attribution, then the unglamorous optimisation that keeps a build running on the cheap Android phone in your telemetry.',
    },
    {
      title: 'Technical direction',
      text: 'Architecture for a build that has to survive its own roadmap, and a second opinion on the decisions that are expensive to reverse later.',
    },
  ],
} as const;

/**
 * Proof, in two parts: what this team built inside other people's companies,
 * and what it has built with nobody to answer to.
 *
 * Nitro Racers never released. That was a business-side call rather than
 * anything in the build, and the honest version is still the strongest asset on
 * this page — it is the only artefact that shows what these people produce when
 * every decision is theirs. The previous copy called it "shipped" and
 * "delisted", which was neither true nor necessary.
 */
export const PORTFOLIO = {
  headline: 'We are our own hardest client.',
  lede: 'Two kinds of evidence: what this team has built inside other people’s companies, and what it has built on its own money.',
  inHouse: {
    title: 'Nitro Racers',
    tags: ['Mobile', 'Unity', 'Content-complete'],
    text: 'A stylised arcade racer taken end to end in house — our own art, tracks, vehicle handling, UI and ad integration — to a content-complete build with every level in. It never released, for business reasons rather than anything in the build, and it is still the clearest reference for what we can put on screen without an art house behind us.',
  },
  /**
   * Team credit, and labelled as one. Built at Honey B Games, not sold by RIZ.
   * Saying which is which plainly is worth more than the ambiguity would be.
   */
  credit: {
    label: 'Team credit',
    text: 'The same engineers built Focus Friend at Honey B Games — Hank Green’s focus app, the No. 1 free app on the US App Store, past a million downloads, and Google Play’s App of the Year for 2025. The client was ours end to end, along with the analytics and A/B backend, payments and ads.',
  },
  inDevelopmentLede: 'And an original PC title in development, which is where the design opinions come from.',
  cta: 'See our games',
} as const;

/**
 * Third-party coverage, and the only outside voice on the site.
 *
 * Both pieces are about Focus Friend, so they sit with the credit block that
 * claims it rather than as a free-floating logo strip: a buyer checking the
 * claim lands on TechCrunch reporting the same thing, which is worth more than
 * any sentence this file could write about it. They are also the only outbound
 * links on the route, which is the other half of what they are for.
 *
 * Anything added here has to be coverage of work this team did. A piece about a
 * company somebody once worked at is the borrowed-number problem in STATS
 * wearing a press badge.
 */
export const PRESS = {
  label: 'As seen in',
  items: [
    {
      outlet: 'TechCrunch',
      title: 'Hank Green’s Focus Friend is Google Play’s app of the year',
      date: 'Nov 2025',
      href: 'https://techcrunch.com/2025/11/18/hank-greens-focus-friend-is-google-plays-app-of-the-year/',
    },
    {
      outlet: 'TechCrunch',
      title: 'Hank Green’s Focus Friend app is climbing the App Store charts',
      date: 'Aug 2025',
      href: 'https://techcrunch.com/2025/08/18/hank-greens-focus-friend-app-is-climbing-the-app-store-charts-and-its-extremely-cute/',
    },
  ],
} as const;

export const HOME_CONTACT = {
  headline: 'Tell us what you are building.',
  body: 'Send the scope, the platform and the deadline. You will get an honest answer about whether we are the right team — including when we are not — rather than a deck.',
  subject: 'Work-for-hire Inquiry',
  emailBody: 'Hi RIZ Games,\n\nWe have a project we would like to discuss.\n\nCompany:\nRole:\nScope:\nTimeline:\n',
} as const;

/**
 * Where the form POSTs, and the key some providers want inside the body.
 *
 * Empty is a supported state, not a broken one. The site is a static nginx
 * build with no backend, so a form needs somebody else's endpoint; until one is
 * configured the form still renders, still validates, and hands the visitor a
 * mail draft with everything they typed already in it — the same fallback a
 * failed POST gets. That is worth shipping on its own: it is still a structured
 * ask instead of a bare `mailto:`, and it still collects the timing answer.
 *
 * Set `VITE_CONTACT_FORM_ENDPOINT` in the Dokploy environment and it becomes a
 * real POST with no code change. Formspree puts the form id in the URL and
 * needs no key; Web3Forms posts to one fixed URL and wants its access key as a
 * field, which is what `VITE_CONTACT_FORM_KEY` is for. A Cloudflare Worker
 * later is the same one-variable change.
 */
export const CONTACT_FORM_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT ?? '';
export const CONTACT_FORM_KEY = import.meta.env.VITE_CONTACT_FORM_KEY ?? '';

/**
 * The form itself — the missing rung in the funnel.
 *
 * Before this the only ask on the site was a calendar link: a stranger who had
 * read three screens was invited to jump straight onto a call with people they
 * had never spoken to. There was nothing smaller to do first, so anyone not
 * ready for that had only the address underneath, and a `mailto:` that silently
 * does nothing on the average locked-down corporate Windows box.
 *
 * Four fields are the ask. The fifth, timing, is the one that earns its place:
 * lead time and the studio's real availability are deliberately unpublished
 * (see ENGAGEMENT.facts), and this collects that intel on every lead without
 * the site having to commit to a number in public. The buyer answers the
 * question instead of forcing it.
 *
 * `name` on each field is the key the endpoint receives — renaming one renames
 * the column in whatever inbox or sheet these land in.
 */
export const CONTACT_FORM = {
  fields: {
    name: { name: 'name', label: 'Name' },
    // "Work email" rather than "Email". The word does the qualifying by itself.
    email: { name: 'email', label: 'Work email' },
    company: { name: 'company', label: 'Studio or company' },
    brief: {
      name: 'brief',
      label: 'What are you building?',
      placeholder: 'Scope, platform, engine, and the deadline you are working to.',
    },
    timing: {
      name: 'timing',
      label: 'When do you need someone?',
      unanswered: 'Prefer not to say',
      options: ['ASAP', 'Next quarter', 'Later this year', 'Not sure yet'],
    },
  },
  submit: 'Send it over',
  sending: 'Sending…',
  /** Shown instead of `submit` when no endpoint is configured — see above. */
  compose: 'Write it as an email',
  composeNote: 'This opens your own mail client with everything filled in.',
  /** The smaller ask underneath, for the minority who already want the call. */
  booking: 'Or book a call directly',
  /**
   * Replaces the form in place. No redirect: a thank-you page throws away the
   * context the visitor was reading and gives a spam filter a second thing to
   * mistrust.
   *
   * No clock attached to the promise. "Within one business day" is a real
   * commitment and nobody at the studio has made it; "we reply to everything"
   * is true today.
   */
  sent: {
    headline: 'That is with us.',
    body: 'We reply to everything — including when the answer is that we are the wrong team for it. Nothing else for you to do.',
  },
  /**
   * The POST failed. Never a generic error: a lost lead costs more than an ugly
   * fallback, so the words they already typed come back as a mail draft.
   */
  failed: {
    headline: 'That did not go through.',
    body: 'Nothing you wrote is lost — it is already in an email addressed to us, ready to send.',
    cta: 'Send it as an email',
  },
  /** No endpoint configured yet. Same handoff, without pretending it broke. */
  handoff: {
    headline: 'Ready to send.',
    body: 'Everything you wrote is in an email addressed to us. Your mail client sends it.',
    cta: 'Open the email',
  },
  /** Shown under either handoff, for a machine with no mail client wired up. */
  orCopy: 'Or write to us directly at',
} as const;

/**
 * Where the primary CTA points, and what it says.
 *
 * The label follows the destination: a button that says "Book a call" has to
 * open a calendar, so if `BOOKING_URL` is ever emptied this becomes a
 * pre-filled email and says so, rather than a dead promise.
 */
export const BOOKING = BOOKING_URL
  ? ({ href: BOOKING_URL, label: 'Book a call' } as const)
  : ({ href: mailto(HOME_CONTACT.subject, HOME_CONTACT.emailBody), label: 'Tell us about your project' } as const);

/* -------------------------------------------------------------------------- */
/* Original IP — the "/showcase" route                                        */
/* -------------------------------------------------------------------------- */

/**
 * Tango District is self-published, so the store page — not a pitch deck, and
 * not this site — is where the game actually lives: capsule art, screenshots,
 * and the wishlist button that is the only conversion this route has. Used by
 * both the game section and the closing CTA.
 */
export const STEAM_URL = 'https://store.steampowered.com/app/3860680/Tango_District/';

/**
 * Nitro Racers never released, so the trailer is the only place it can still be
 * seen moving. It stands in for the store link the other game has.
 */
export const NITRO_TRAILER_URL = 'https://youtu.be/3M-9HFGjvm4';

/**
 * Drives both the fallback key art and the section's colour grading.
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
  | { kind: 'link'; label: string; href: string }
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
  /**
   * Listed in the homepage's "in development" line. The showcase route shows
   * every game; Portfolio only wants the one that is still being made, since
   * the other is the figure directly above it.
   */
  inDevelopment?: boolean;
  /** Alternating sides give the showcase a rhythm once there is more than one. */
  align: 'left' | 'right';
  palette: GamePalette;
  media: {
    /** Looping WebM of gameplay. Falls back to `poster`, then to generated key art. */
    video?: string;
    /**
     * First frame while the video buffers — and, with no video, the still that
     * fills the viewport instead of the generated gradient.
     */
    poster?: string;
    /** Wordmark SVG. Falls back to the title set in the display face. */
    logo?: string;
  };
  /** First entry renders solid, the rest ghost. Video CTAs without a src are skipped. */
  ctas: GameCta[];
}

/**
 * Both original titles. "What Floor" was listed here and is another studio's
 * game; it is gone, and anything added back has to be ours.
 *
 * Nitro Racers earns its screen even though it never released. It is the only
 * finished thing this studio made with nobody to answer to, it is the only real
 * art on the site, and hiding it would leave the showcase as a single game with
 * no footage.
 *
 * It also goes first, which is backwards on purpose and temporary. Tango
 * District is the one still being made and the one with the wishlist, but it
 * currently renders as a generated gradient, three tags and no paragraph — so
 * the first screen of a route whose only conversion is a wishlist was the
 * emptiest on the site, and the screen that sells was the second. Give Tango
 * District a hook and a screenshot and put it back on top.
 *
 * Each game keeps the side it was composed for; the alternation just starts on
 * the right now.
 */
export const GAMES: Game[] = [
  {
    id: 'nitro-racers',
    title: 'Nitro Racers',
    hook: 'A stylised arcade racer, built end to end in house — our own art, tracks, vehicle handling and UI — to a content-complete build with every level in. It never released, for reasons on the business side rather than anything in the build.',
    tags: ['Mobile', 'Unity', 'Content-complete'],
    align: 'right',
    palette: { base: '#12141a', accent: '#ffd21f', glow: '#d94f3d' },
    media: { poster: nitroArt, logo: nitroLogo },
    ctas: [{ kind: 'link', label: 'Watch the trailer', href: NITRO_TRAILER_URL }],
  },
  {
    id: 'tango-district',
    title: 'Tango District',
    // TODO(copy): the real elevator pitch. The previous text here was invented
    // to prove out the layout and shipped to production by accident; an empty
    // hook renders nothing rather than something untrue.
    hook: undefined,
    tags: ['PC', 'In Development', 'Self-published'],
    inDevelopment: true,
    align: 'left',
    palette: { base: '#150608', accent: '#ff3d5a', glow: '#ffb347' },
    media: {
      // Drop a ~5s loop at src/assets/video/tango-district.webm and import it
      // here; see README "Game media". Until then this renders generated art.
    },
    ctas: [
      // There is no pitch deck to request: the store page is the artefact.
      { kind: 'link', label: 'View on Steam', href: STEAM_URL },
      // Activates the teaser modal as soon as a file lands here.
      { kind: 'video', label: 'Watch Teaser', src: '' },
    ],
  },
];

export const SHOWCASE_HERO = {
  eyebrow: 'Our own games',
  /**
   * Not a pitch. This route used to ask publishers for something; both titles
   * are ours, so the page now exists to be read by anyone who wants to see what
   * this studio makes when the brief is its own — and its only ask is a
   * wishlist.
   */
  headline: 'The games we make for ourselves.',
  sub: 'An original PC title in development, and a stylised arcade racer we took end to end in house. Both were ours from the first line: design, art, code and every decision in between.',
  cta: 'See the games',
} as const;

export const PEDIGREE = {
  headline: 'Creative vision, backed by shipped-title engineering.',
  body: 'RIZ Games is a small studio built on a long run of production work. Before this was our own IP, the same people were architecting live systems for titles measured in hundreds of millions of players — content pipelines, real-time multiplayer, and the unglamorous optimisation work that keeps a build shippable. We know what a milestone schedule costs and we know how to hit one.',
  /** Named so anyone reading can place the team without a call. */
  studios: ['Etermax', 'Honey B Games', 'Trick Game Studio'],
  proof: [
    {
      /**
       * Adventure is the only one of the three with a published number, and it
       * is the one quoted. The franchise and studio totals are much larger and
       * are not this team's — see the note on STATS.
       */
      label: 'Scale',
      text: 'Core gameplay systems on three of Etermax’s Trivia Crack spin-offs — Adventure, Explorer and Adivinados — with Adventure alone past 10 million downloads.',
    },
    {
      /**
       * Marvel Strike Force sits here rather than in the homepage stat bar. The
       * credit is real, through Trick Game Studio, but it was a smaller share
       * of this team's time than the trivia and simulation work, and leading
       * with the title's revenue implied an involvement to match.
       */
      label: 'Live titles',
      text: 'Performance and live support on Boba Story, past 12 million installs, and engineering on Marvel Strike Force through Trick Game Studio.',
    },
    {
      label: 'Product',
      text: 'Focus Friend at Honey B Games: the whole client, the analytics and A/B backend, payments and ads. No. 1 free app on the US App Store.',
    },
  ],
} as const;

/**
 * The closing ask, and the only conversion on this route.
 *
 * A wishlist is worth more to a self-published game than any form on this site,
 * so the button leaves for Steam and the inbox sits underneath it for everyone
 * with an actual reason to write — press, a build request, a partner.
 */
export const GATEWAY = {
  headline: 'Follow it, or talk to us.',
  body: 'Tango District ships on Steam and we are publishing it ourselves. Wishlist it there — or write to us about a build, a review copy, or working together.',
  cta: 'Wishlist on Steam',
  href: STEAM_URL,
  subject: 'Tango District',
  emailBody: 'Hi RIZ Games,\n\nWe would like to talk about Tango District.\n\nCompany:\nRole:\nReason for writing:\n',
} as const;

/* -------------------------------------------------------------------------- */
/* The 404 route                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Shown for any path the router does not know, and served with a real 404 (see
 * scripts/og-routes.mjs and nginx.conf).
 *
 * It used to redirect to "/" instead. A redirect hides the broken link from the
 * person who followed it and tells a crawler the URL was real, which is how a
 * two-page site ended up answering 200 to every string anyone typed.
 */
export const NOT_FOUND = {
  code: '404',
  headline: 'That page is not here.',
  body: 'It may have moved, or it may never have existed. There are two pages: the work we do for other studios, and the games we make for ourselves.',
  // Plain words, not the site's internal vocabulary: somebody who just hit a
  // dead link is the last person who should have to guess what "work-for-hire"
  // means.
  home: 'Back to the homepage',
  showcase: 'Our games',
} as const;
