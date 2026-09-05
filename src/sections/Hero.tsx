import type { CSSProperties } from 'react';
import FaultyTerminal from '@/components/FaultyTerminal';
import WarpText from '@/components/WarpText';
import CtaButton from '@/components/site/CtaButton';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { IP_HERO } from '@/content/site';
import { scrollToId } from '@/lib/scroll';

// Module scope on purpose: FaultyTerminal lists gridMul in its effect deps, so a
// fresh array literal on every render would tear down and rebuild the WebGL context.
const GRID_MUL: [number, number] = [2, 1];

/**
 * The publisher-facing studio hero.
 *
 * Two things changed here, both from watching the deployed site load.
 *
 * 1. It is never black. The terminal's noise field takes several seconds to
 *    reach full density (CLAUDE.md puts it at 15-20s and says to measure before
 *    touching the shader — so this does not touch the shader). Instead the
 *    gradient and grain underneath are always painted, and the canvas composites
 *    on top in `screen` blend: black contributes nothing, so the section looks
 *    finished on the first frame and the digits simply arrive into it.
 *
 * 2. It says something. The old hero was the studio name plus "Small studio,
 *    big experience" — a mood, not a proposition, and it led with "small". The
 *    wordmark is still the big gesture, but the h1 underneath is now the actual
 *    pitch, in real text a crawler can read.
 */
export default function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      className="grain relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-ink px-6 pt-32 pb-20"
      style={{ '--accent': 'var(--color-neon-green)' } as CSSProperties}
    >
      {/* Always painted, and the reason the section is never a black rectangle. */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_40%,rgba(0,255,136,0.12),transparent_72%)]" />

      {/*
        `screen` drops the shader's black ground and keeps only the lit digits,
        so the gradient above stays visible underneath while the field fills in.
      */}
      <div className="absolute inset-0 mix-blend-screen">
        <FaultyTerminal
          tint="#00ff88"
          scale={1.5}
          gridMul={GRID_MUL}
          digitSize={1.2}
          timeScale={0.5}
          scanlineIntensity={0.5}
          curvature={0.1}
          noiseAmp={1}
          brightness={0.6}
          mouseReact
          mouseStrength={0.4}
          pageLoadAnimation
          pause={prefersReducedMotion}
        />
      </div>

      {/* Keeps foreground text legible over the terminal noise. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-dark-bg/70 via-dark-bg/60 to-dark-bg/90" />

      {/*
        pointer-events-none lets mousemove reach the canvas underneath, so the
        terminal still reacts to the cursor. Interactive children added here
        need pointer-events-auto to take clicks back.
      */}
      <div className="pointer-events-none relative flex w-full max-w-4xl flex-col items-center text-center">
        {/*
          WarpText rasterises into a WebGL canvas, so it is not real text to
          crawlers or to find-on-page. It carries the brand gesture only; the
          heading below is the real one, which is why this is aria-hidden rather
          than shadowed by an sr-only h1 that would announce twice.
        */}
        <div aria-hidden="true" className="w-full">
          <WarpText
            text="RIZ Games"
            color="#ffffff"
            className="pointer-events-auto font-display h-[24vh] min-h-32"
            fontWeight={900}
            fontStyle="italic"
            letterSpacing="0"
            warpStrength={0.09}
            warpScale={1.6}
            speed={0.5}
            pointerInfluence={0.4}
            pointerStrength={0.4}
            refraction={0.02}
            ripple
          />
        </div>

        <p className="mt-4 font-mono text-[0.6875rem] tracking-[0.22em] text-neon-green uppercase">{IP_HERO.eyebrow}</p>

        <h1 className="font-display mt-6 max-w-3xl text-3xl leading-tight text-white sm:text-4xl md:text-5xl">
          {IP_HERO.headline}
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">{IP_HERO.sub}</p>

        <div className="pointer-events-auto mt-10">
          <CtaButton onClick={() => scrollToId('showcase')}>{IP_HERO.cta}</CtaButton>
        </div>
      </div>
    </section>
  );
}
