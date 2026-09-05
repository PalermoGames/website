import { ENGAGEMENT, pending } from '@/content/site';

/**
 * How to actually buy this.
 *
 * The site previously described four services and gave no indication of how an
 * engagement is shaped, how fast a team can start, or where in the world it
 * sits. A client comparing vendors asks all three before they ask anything
 * else, and the time-zone answer — a full working day of overlap with US teams
 * — is the one most offshore competitors cannot match.
 */
export default function Engagement() {
  return (
    <section id="how-we-work" className="bg-dark-bg px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-3xl leading-tight text-white sm:text-4xl">{ENGAGEMENT.headline}</h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">{ENGAGEMENT.lede}</p>

        <ol className="mt-14 grid gap-8 sm:grid-cols-2">
          {ENGAGEMENT.models.map((model, index) => (
            <li key={model.title} className="border-t border-white/15 pt-5">
              <span className="font-mono text-[0.6875rem] tracking-[0.2em] text-neon-green">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-white">{model.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">{model.text}</p>
            </li>
          ))}
        </ol>

        {/* Unwritten facts drop out of the grid entirely — two real answers
            read better than four, two of which say TODO. */}
        <dl className="mt-16 grid gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {ENGAGEMENT.facts.filter(fact => !pending(fact.text)).map(fact => (
            <div key={fact.label} className="bg-dark-bg p-6">
              <dt className="font-mono text-[0.6875rem] tracking-[0.2em] text-white/55 uppercase">{fact.label}</dt>
              <dd className="mt-3 text-sm leading-relaxed text-white/80">{fact.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
