import type { CSSProperties } from 'react';
import Magnet from '@/components/Magnet';
import SiteFooter from '@/components/site/SiteFooter';
import CtaButton from '@/components/site/CtaButton';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { CONTACT_EMAIL, GATEWAY, mailto } from '@/content/site';

/**
 * Replaces the footer entirely.
 *
 * A sitemap at the bottom of a portfolio is a place for a publisher to lose
 * interest. This is one ask, one button, and the small print underneath —
 * including the two static legal pages the Play Store listings point at.
 */
export default function PublisherGateway() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="gateway"
      className="grain relative flex min-h-[85svh] flex-col items-center justify-center overflow-hidden bg-ink px-6 pt-28 pb-40 text-center"
      style={{ '--accent': 'var(--color-neon-green)' } as CSSProperties}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_50%_55%,rgba(0,255,136,0.08),transparent_70%)]" />

      <div className="relative flex max-w-3xl flex-col items-center gap-8">
        <h2 className="font-display text-4xl leading-tight text-white sm:text-5xl md:text-6xl">{GATEWAY.headline}</h2>

        <p className="max-w-xl text-lg leading-relaxed text-white/75">{GATEWAY.body}</p>

        <div className="mt-4">
          <Magnet padding={110} magnetStrength={4} disabled={prefersReducedMotion}>
            <CtaButton href={mailto(GATEWAY.subject, GATEWAY.emailBody)} className="px-10 py-4 text-base">
              {GATEWAY.cta}
            </CtaButton>
          </Magnet>
        </div>

        {/* Spelled out as well as linked: some publishers are reading this on a
            machine with no mail client wired up. */}
        <a className="text-sm text-white/55 transition-colors hover:text-white" href={mailto(GATEWAY.subject, GATEWAY.emailBody)}>
          {CONTACT_EMAIL}
        </a>
      </div>

      <div className="relative mt-20">
        <SiteFooter crossLink={{ label: 'Work-for-hire', to: '/' }} />
      </div>
    </section>
  );
}
