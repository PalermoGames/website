import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import CtaButton from '@/components/site/CtaButton';
import { BOOKING, HOME, STATS } from '@/content/site';

/**
 * The work-for-hire hero.
 *
 * Deliberately no WebGL. The shader hero this site opened with rendered a black
 * screen for the first several seconds while its noise field filled in, which
 * is the entire first impression for anyone arriving from a cold email. Plain
 * text over a CSS gradient paints on the first frame, is readable by crawlers,
 * and costs no GPU on the locked-down laptops B2B buyers actually use.
 *
 * The company name is not the headline either: a visitor at rizgames.com.ar
 * already knows whose site this is. The wordmark lives in the header and this
 * space goes to the proposition.
 */
export default function HomeHero() {
  return (
    <section
      className="grain relative overflow-hidden bg-ink px-6 pt-36 pb-20 sm:px-10 sm:pt-44 sm:pb-28"
      style={{ '--accent': 'var(--color-neon-green)' } as CSSProperties}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_20%_25%,rgba(0,255,136,0.10),transparent_70%)]" />

      <div className="relative mx-auto max-w-5xl">
        <p className="font-mono text-[0.6875rem] tracking-[0.22em] text-neon-green uppercase">{HOME.eyebrow}</p>

        <h1 className="font-display mt-6 max-w-4xl text-4xl leading-[1.05] text-white sm:text-5xl md:text-6xl">
          {HOME.headline}
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">{HOME.sub}</p>

        <div className="mt-11 flex flex-wrap items-center gap-4">
          <CtaButton href={BOOKING.href} className="px-8 py-3.5 text-base">
            {BOOKING.label}
          </CtaButton>
          <Link
            to="/showcase"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white/90 transition-colors hover:border-neon-green hover:bg-white/5 hover:text-white"
          >
            {HOME.secondaryCta}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>

      {/*
        The proof bar. These three figures were previously buried on screen four
        in grey body copy; they are the only evidence on the page that shortens
        a buyer's decision, so they get display type and a position above the
        fold on any laptop.
      */}
      <dl className="relative mx-auto mt-20 grid max-w-5xl gap-px overflow-hidden rounded-xl bg-white/10 sm:mt-24 sm:grid-cols-3">
        {STATS.map(stat => (
          <div key={stat.label} className="bg-ink/80 p-7 backdrop-blur-sm">
            <dt className="sr-only">{stat.label}</dt>
            <dd>
              <span className="font-display block text-4xl leading-none text-white sm:text-5xl">{stat.value}</span>
              <span className="mt-3 block font-mono text-[0.6875rem] tracking-[0.2em] text-neon-green uppercase">
                {stat.label}
              </span>
              <span className="mt-3 block text-sm leading-relaxed text-white/70">{stat.detail}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
