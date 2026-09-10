import type { CSSProperties } from 'react';
import ContactForm from '@/components/site/ContactForm';
import SiteFooter from '@/components/site/SiteFooter';
import { BOOKING, BOOKING_URL, CONTACT_EMAIL, CONTACT_FORM, HOME_CONTACT, mailto } from '@/content/site';

/**
 * Three asks, largest first, and the largest is now the smallest commitment.
 *
 * This section used to be one button — the scheduling link — with the address
 * spelled out underneath. That is a funnel with a single rung, and it is the
 * high one: a stranger who has read three screens was asked to agree to a live
 * call before anything smaller existed. Anyone not ready for that had only a
 * `mailto:`, which does nothing at all on the average corporate Windows box and
 * loses the lead without leaving a trace.
 *
 * So the form is primary, the calendar drops to a text link for the minority
 * who already know they want the call, and the address stays last for the one
 * person who just wants to hit reply.
 *
 * The booking link only renders when there is a real calendar behind it: with
 * BOOKING_URL empty, BOOKING becomes a pre-filled email and "book a call
 * directly" would be a second copy of the form dressed up as an alternative.
 */
export default function HomeContact() {
  const emailHref = mailto(HOME_CONTACT.subject, HOME_CONTACT.emailBody);

  return (
    <section
      id="contact"
      className="grain relative flex flex-col items-center overflow-hidden bg-ink px-6 pt-24 pb-20 text-center sm:pt-32"
      style={{ '--accent': 'var(--color-neon-green)' } as CSSProperties}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_40%,rgba(0,255,136,0.08),transparent_70%)]" />

      <div className="relative flex w-full max-w-2xl flex-col items-center gap-8">
        <h2 className="font-display text-4xl leading-tight text-white sm:text-5xl">{HOME_CONTACT.headline}</h2>
        <p className="text-lg leading-relaxed text-white/75">{HOME_CONTACT.body}</p>

        <ContactForm />

        <div className="flex flex-col items-center gap-3">
          {BOOKING_URL && (
            <a
              className="text-sm font-semibold text-neon-green transition-opacity hover:opacity-75"
              href={BOOKING.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {CONTACT_FORM.booking}
              <span aria-hidden="true"> &rarr;</span>
            </a>
          )}

          {/* Spelled out as well as linked: some readers are on a machine with
              no mail client wired up, and this is the address they copy. */}
          <a className="text-sm text-white/55 transition-colors hover:text-white" href={emailHref}>
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>

      <div className="relative mt-20">
        <SiteFooter crossLink={{ label: 'Our games', to: '/showcase' }} />
      </div>
    </section>
  );
}
