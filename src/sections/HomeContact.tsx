import type { CSSProperties } from 'react';
import CtaButton from '@/components/site/CtaButton';
import SiteFooter from '@/components/site/SiteFooter';
import Magnet from '@/components/Magnet';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { CALENDLY_URL, CONTACT_EMAIL, HOME_CONTACT, mailto } from '@/content/site';

/**
 * One ask, one button, small print underneath.
 *
 * Booking is primary: a work-for-hire buyer with a live project would rather
 * take a slot than compose an email and wait. The address stays spelled out
 * underneath for everyone who would not book a call with a stranger — and for
 * anyone whose machine has no mail client wired up, which is most corporate
 * Windows installs and the reason a mailto: was a poor primary CTA.
 */
export default function HomeContact() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const emailHref = mailto(HOME_CONTACT.subject, HOME_CONTACT.emailBody);

  return (
    <section
      id="contact"
      className="grain relative flex flex-col items-center overflow-hidden bg-ink px-6 pt-24 pb-20 text-center sm:pt-32"
      style={{ '--accent': 'var(--color-neon-green)' } as CSSProperties}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_40%,rgba(0,255,136,0.08),transparent_70%)]" />

      <div className="relative flex max-w-2xl flex-col items-center gap-8">
        <h2 className="font-display text-4xl leading-tight text-white sm:text-5xl">{HOME_CONTACT.headline}</h2>
        <p className="text-lg leading-relaxed text-white/75">{HOME_CONTACT.body}</p>

        <Magnet padding={110} magnetStrength={4} disabled={prefersReducedMotion}>
          <CtaButton href={CALENDLY_URL} className="px-10 py-4 text-base">
            {HOME_CONTACT.cta}
          </CtaButton>
        </Magnet>

        <a className="text-sm text-white/55 transition-colors hover:text-white" href={emailHref}>
          {CONTACT_EMAIL}
        </a>
      </div>

      <div className="relative mt-20">
        <SiteFooter crossLink={{ label: 'Original IP', to: '/original-ip' }} />
      </div>
    </section>
  );
}
