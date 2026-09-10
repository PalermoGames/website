import { useEffect, useRef } from 'react';
import type { Game } from '@/content/site';
import { useInViewport } from '@/hooks/useInViewport';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * Generated key art, used until a gameplay loop exists for a game.
 *
 * Two drifting light sources over the game's own base tone, raked by beams
 * angled away from the copy. It is deliberately abstract: a placeholder that
 * looks like a mood board reads better to a publisher than a grey box, and it
 * costs no bytes and no GPU beyond compositing.
 */
function GameArt({ palette, align }: { palette: Game['palette']; align: Game['align'] }) {
  const beamAngle = align === 'left' ? 115 : 65;

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ backgroundColor: palette.base }}>
      <div
        className="absolute -top-1/4 -left-1/4 h-[140%] w-[95%] blur-3xl"
        style={{
          background: `radial-gradient(closest-side, ${palette.accent}99, transparent 72%)`,
          animation: 'drift-a 19s ease-in-out infinite alternate',
        }}
      />
      <div
        className="absolute -right-1/5 -bottom-1/3 h-[130%] w-[85%] blur-3xl"
        style={{
          background: `radial-gradient(closest-side, ${palette.glow}80, transparent 70%)`,
          animation: 'drift-b 23s ease-in-out infinite alternate',
        }}
      />
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: `repeating-linear-gradient(${beamAngle}deg, transparent 0 46px, ${palette.glow}26 46px 47px)`,
        }}
      />
      {/* Sinks the edges so the copy never sits on a bright patch. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(0,0,0,0.62)_100%)]" />
    </div>
  );
}

/**
 * The full-bleed layer behind one showcase viewport: the gameplay loop when the
 * studio has one, generated key art when it does not, and in both cases the
 * gradient scrim that keeps the pitch readable.
 */
export default function GameBackdrop({ game }: { game: Game }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inViewport = useInViewport(containerRef);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (inViewport && !prefersReducedMotion) {
      // Autoplay can still be refused (low power mode); nothing to recover here.
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inViewport, prefersReducedMotion]);

  // Scrim runs from the side the copy sits on, so the art stays open elsewhere.
  const scrim =
    game.align === 'left'
      ? 'bg-gradient-to-r from-black/85 via-black/45 to-transparent'
      : 'bg-gradient-to-l from-black/85 via-black/45 to-transparent';

  return (
    <div ref={containerRef} className="absolute inset-0">
      {game.media.video ? (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={game.media.video}
          poster={game.media.poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      ) : game.media.poster ? (
        // A game with real art but no loop yet — Nitro Racers, whose key art is
        // the only shipped-quality frame this studio has.
        <img
          className="h-full w-full object-cover"
          src={game.media.poster}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <GameArt palette={game.palette} align={game.align} />
      )}

      <div className={`absolute inset-0 ${scrim}`} />
      {/* Real art is bright and busy in ways generated gradients are not, so
          only that case gets the extra flat knock-down. */}
      {(game.media.video || game.media.poster) && <div className="absolute inset-0 bg-black/25" />}
    </div>
  );
}
