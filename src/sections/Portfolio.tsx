import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import Pill from '@/components/site/Pill';
import nitroLogo from '@/assets/images/LogoNitroRacers.png';
import nitroArt from '@/assets/images/nitroracersnologo.webp';
import { GAMES, PORTFOLIO, pending } from '@/content/site';

/**
 * The evidence section, and the argument for why a contract studio with its own
 * IP is worth more than one without.
 *
 * Nitro Racers never released, so there is no store link and this does not
 * pretend otherwise — "built end to end, content-complete, killed on the
 * business side" is a claim a client can weigh, and it is the only asset that
 * shows what this team produces unsupervised. Both the key art and the logo
 * were already in src/assets/images/ with nothing importing them.
 *
 * The credit block underneath is deliberately labelled: Focus Friend is the
 * team's work at Honey B Games, not a RIZ engagement, and blurring that line is
 * the fastest way to lose a buyer who checks.
 */
export default function Portfolio() {
  return (
    <section
      id="work"
      className="bg-graphite px-6 py-24 sm:px-10 sm:py-32"
      style={{ '--accent': 'var(--color-neon-green)' } as CSSProperties}
    >
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-3xl leading-tight text-white sm:text-4xl">{PORTFOLIO.headline}</h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">{PORTFOLIO.lede}</p>

        <figure className="mt-14 overflow-hidden rounded-xl border border-white/10 bg-black">
          <img
            src={nitroArt}
            alt="Nitro Racers gameplay: cel-shaded stock cars racing through a shipping container yard."
            className="aspect-[16/9] w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="flex flex-wrap items-center gap-x-8 gap-y-5 p-7">
            <img src={nitroLogo} alt={PORTFOLIO.inHouse.title} className="h-9 w-auto" loading="lazy" />
            <ul className="flex flex-wrap gap-2">
              {PORTFOLIO.inHouse.tags.map(tag => (
                <Pill key={tag}>{tag}</Pill>
              ))}
            </ul>
            {!pending(PORTFOLIO.inHouse.text) && (
              <p className="min-w-64 flex-1 text-sm leading-relaxed text-white/75">{PORTFOLIO.inHouse.text}</p>
            )}
          </figcaption>
        </figure>

        {!pending(PORTFOLIO.credit.text) && (
          <div className="mt-10 border-l-2 border-neon-green/50 pl-6">
            <p className="font-mono text-[0.6875rem] tracking-[0.2em] text-neon-green uppercase">
              {PORTFOLIO.credit.label}
            </p>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/75">{PORTFOLIO.credit.text}</p>
          </div>
        )}

        <div className="mt-16 border-t border-white/15 pt-10">
          <p className="max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
            {PORTFOLIO.inDevelopmentLede}
          </p>

          {/* Nitro Racers is a showcase entry now too, but it is the figure
              directly above this line — only the unreleased-and-still-being-made
              title belongs under "in development". */}
          <ul className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            {GAMES.filter(game => game.inDevelopment).map(game => (
              <li key={game.id} className="font-display text-2xl text-white/85 sm:text-3xl">
                {game.title}
              </li>
            ))}
          </ul>

          <Link
            to="/showcase"
            className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-neon-green transition-opacity hover:opacity-75"
          >
            {PORTFOLIO.cta}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
