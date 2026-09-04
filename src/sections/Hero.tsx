import FaultyTerminal from '@/components/FaultyTerminal';
import WarpText from '@/components/WarpText';
import BlurText from '@/components/BlurText';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { scrollToId } from '@/lib/scroll';

// Module scope on purpose: FaultyTerminal lists gridMul in its effect deps, so a
// fresh array literal on every render would tear down and rebuild the WebGL context.
const GRID_MUL: [number, number] = [2, 1];

/**
 * The studio hero. Unchanged from the original build except that it gives back
 * vertical space in portrait, where a full-height shader pushes everything else
 * below the fold and the page reads as a one-screen site.
 */
export default function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section className="relative h-svh min-h-[30rem] overflow-hidden portrait:h-[80svh]">
      <div className="absolute inset-0">
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
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-dark-bg/70 via-dark-bg/40 to-dark-bg/85" />

      {/*
        pointer-events-none lets mousemove reach the canvas underneath, so the
        terminal still reacts to the cursor. Interactive children added here
        need pointer-events-auto to take clicks back.
      */}
      <div className="pointer-events-none relative flex h-full flex-col items-center justify-center px-6 text-center">
        {/*
          WarpText rasterises the headline into a WebGL canvas, so it is not real
          text to crawlers or to find-on-page. The h1 carries the actual heading;
          the canvas is decorative and hidden from assistive tech to avoid
          announcing "RIZ Games" twice.
        */}
        <h1 className="sr-only">RIZ Games</h1>

        <div aria-hidden="true" className="w-full max-w-5xl">
          <WarpText
            text="RIZ Games"
            color="#ffffff"
            className="pointer-events-auto font-display h-[34vh] portrait:h-[20vh]"
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

        <BlurText
          text="Small studio, big experience."
          delay={40}
          animateBy="words"
          className="justify-center text-xl text-white/70 md:text-2xl"
        />
      </div>

      <button
        type="button"
        onClick={() => scrollToId('portal')}
        className="absolute inset-x-0 bottom-8 mx-auto flex w-fit flex-col items-center gap-2 text-[0.6875rem] tracking-[0.3em] text-white/40 uppercase transition-colors hover:text-white/80"
      >
        Scroll
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
    </section>
  );
}
