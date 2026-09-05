import { useState, type CSSProperties } from 'react';
import Pill from '@/components/site/Pill';
import CtaButton from '@/components/site/CtaButton';
import GameBackdrop from '@/components/site/GameBackdrop';
import VideoModal from '@/components/site/VideoModal';
import { GAMES, mailto, type Game, type GameCta } from '@/content/site';

/**
 * One game, one screen.
 *
 * A grid of thumbnails asks a publisher to compare; a full viewport asks them
 * to look. Sides alternate down the page so the two worlds do not blur into
 * one another, and each section carries its own `--accent`, which is what the
 * pills and buttons inside it colour themselves from.
 */
function GameViewport({ game }: { game: Game }) {
  const [teaser, setTeaser] = useState<{ src: string; poster?: string } | null>(null);

  const alignedRight = game.align === 'right';

  // A video CTA with no file yet is dropped rather than rendered dead: a
  // publisher clicking a button that does nothing is worse than one button.
  const ctas = game.ctas.filter(cta => cta.kind !== 'video' || cta.src !== '');

  const renderCta = (cta: GameCta, index: number) => {
    const variant = index === 0 ? 'solid' : 'ghost';

    return cta.kind === 'email' ? (
      <CtaButton key={cta.label} href={mailto(cta.subject, cta.body)} variant={variant} className="min-w-56">
        {cta.label}
      </CtaButton>
    ) : (
      <CtaButton
        key={cta.label}
        variant={variant}
        className="min-w-56"
        onClick={() => setTeaser({ src: cta.src, poster: cta.poster })}
      >
        {cta.label}
      </CtaButton>
    );
  };

  return (
    <section
      id={game.id}
      className="snap-viewport relative flex h-svh min-h-[34rem] w-full items-center overflow-hidden"
      style={{ '--accent': game.palette.accent } as CSSProperties}
    >
      <GameBackdrop game={game} />

      <div
        className={`relative mx-auto flex w-full max-w-7xl px-6 sm:px-10 lg:px-16 ${
          alignedRight ? 'justify-end' : 'justify-start'
        }`}
      >
        <div className={`flex max-w-xl flex-col gap-7 ${alignedRight ? 'items-end text-right' : 'items-start'}`}>
          <h2>
            {game.media.logo ? (
              <img src={game.media.logo} alt={game.title} className="max-h-24 w-auto" />
            ) : (
              <span className="font-display block text-5xl leading-none text-white sm:text-6xl lg:text-7xl">
                {game.title}
              </span>
            )}
          </h2>

          <ul className={`flex flex-wrap gap-2 ${alignedRight ? 'justify-end' : ''}`}>
            {game.tags.map(tag => (
              <Pill key={tag}>{tag}</Pill>
            ))}
          </ul>

          {/* Omitted rather than filled with placeholder prose: the pitches
              that used to live here were written to prove out the layout and
              reached production unreplaced. Nothing beats something untrue. */}
          {game.hook && <p className="text-lg leading-relaxed text-white/80 sm:text-xl">{game.hook}</p>}

          <div className={`flex flex-col gap-3 ${alignedRight ? 'items-end' : 'items-start'}`}>
            {ctas.map(renderCta)}
          </div>
        </div>
      </div>

      <VideoModal
        open={teaser !== null}
        src={teaser?.src ?? ''}
        poster={teaser?.poster}
        title={game.title}
        onClose={() => setTeaser(null)}
      />
    </section>
  );
}

export default function Showcase() {
  return (
    /* The id is also the hook for the scroll-snap rule in index.css. */
    <div id="showcase">
      <h2 className="sr-only">Our original IPs</h2>
      {GAMES.map(game => (
        <GameViewport key={game.id} game={game} />
      ))}
    </div>
  );
}
