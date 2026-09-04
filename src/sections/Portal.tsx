import type { CSSProperties } from 'react';
import BlurText from '@/components/BlurText';
import Magnet from '@/components/Magnet';
import CtaButton from '@/components/site/CtaButton';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { PORTAL } from '@/content/site';
import { scrollToId } from '@/lib/scroll';

/**
 * The threshold between the studio and its games.
 *
 * Deliberately the quietest screen on the site: pitch black, grain, and one
 * sentence. After a full-screen shader, silence is what makes the showcase
 * that follows feel like a gallery rather than a third slide.
 */
export default function Portal() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="portal"
      className="grain relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-ink px-6 py-24 text-center"
      style={{ '--accent': 'var(--color-neon-green)' } as CSSProperties}
    >
      {/* One faint light source, so pitch black does not read as a broken image. */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_45%,rgba(0,255,136,0.07),transparent_70%)]" />

      <div className="relative flex max-w-4xl flex-col items-center gap-8">
        {/*
          BlurText renders a <p>. The heading is carried separately so the
          document outline is right and the animated copy is not announced twice.
        */}
        <h2 className="sr-only">{PORTAL.headline}</h2>
        <div aria-hidden="true">
          <BlurText
            text={PORTAL.headline}
            delay={110}
            animateBy="words"
            stepDuration={0.5}
            className="font-display justify-center text-4xl leading-[1.05] text-white sm:text-5xl md:text-6xl"
          />
        </div>

        <p className="max-w-md text-base tracking-wide text-white/45 sm:text-lg">{PORTAL.subheadline}</p>
      </div>

      <div className="relative mt-16">
        <Magnet padding={110} magnetStrength={4} disabled={prefersReducedMotion}>
          <CtaButton onClick={() => scrollToId('showcase')}>{PORTAL.cta}</CtaButton>
        </Magnet>
      </div>
    </section>
  );
}
