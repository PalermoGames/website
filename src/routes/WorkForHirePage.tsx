import type { CSSProperties } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CtaButton from '@/components/site/CtaButton';
import SiteDock from '@/components/site/SiteDock';
import { BriefcaseIcon, GamepadIcon, HomeIcon, MailIcon } from '@/components/site/icons';
import type { DockItemData } from '@/components/Dock';
import { CONTACT_EMAIL, PEDIGREE, WORK_FOR_HIRE, mailto } from '@/content/site';
import { scrollToId } from '@/lib/scroll';

/**
 * The other half of the studio, kept on its own route on purpose.
 *
 * A publisher evaluating an original IP should not be reading a services menu,
 * and a client shopping for a Unity team should not have to scroll past two
 * unreleased games. Same studio, two audiences, two entry points — the dock is
 * what connects them.
 *
 * No shader here: the hero on the index route is the studio's one big
 * statement, and repeating it would cost a second WebGL context for nothing.
 */
export default function WorkForHirePage() {
  const navigate = useNavigate();

  const dockItems: DockItemData[] = [
    { icon: <HomeIcon />, label: 'Home', onClick: () => navigate('/') },
    { icon: <GamepadIcon />, label: 'Original IPs', onClick: () => navigate('/') },
    { icon: <BriefcaseIcon />, label: 'Services', onClick: () => scrollToId('services') },
    { icon: <MailIcon />, label: 'Contact', onClick: () => scrollToId('hire-contact') },
  ];

  const contactHref = mailto(WORK_FOR_HIRE.subject, WORK_FOR_HIRE.emailBody);

  return (
    <main style={{ '--accent': 'var(--color-neon-green)' } as CSSProperties}>
      <section className="grain relative flex min-h-[70svh] flex-col justify-center overflow-hidden bg-ink px-6 py-28 sm:px-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_25%_40%,rgba(0,255,136,0.07),transparent_70%)]" />

        <div className="relative mx-auto w-full max-w-5xl">
          <Link
            to="/"
            className="font-mono text-[0.6875rem] tracking-[0.2em] text-white/40 uppercase transition-colors hover:text-neon-green"
          >
            &larr; RIZ Games
          </Link>

          <h1 className="font-display mt-8 text-5xl leading-none text-white sm:text-6xl md:text-7xl">
            {WORK_FOR_HIRE.headline}
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/60">{WORK_FOR_HIRE.lede}</p>

          <div className="mt-12">
            <CtaButton href={contactHref}>{WORK_FOR_HIRE.cta}</CtaButton>
          </div>
        </div>
      </section>

      <section id="services" className="bg-graphite px-6 py-28 sm:px-10 sm:py-32">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-3xl leading-tight text-white sm:text-4xl">What we take on</h2>

          <div className="mt-14 grid gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-2">
            {WORK_FOR_HIRE.services.map(service => (
              <div key={service.title} className="bg-graphite p-8">
                <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{service.text}</p>
              </div>
            ))}
          </div>

          <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[0.6875rem] tracking-[0.18em] text-white/40 uppercase">
            {WORK_FOR_HIRE.principles.map(principle => (
              <li key={principle}>{principle}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Same evidence the publisher route leans on — a client is asking the
          same question, just with a different budget attached. */}
      <section className="bg-dark-bg px-6 py-28 sm:px-10 sm:py-32">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display max-w-3xl text-3xl leading-tight text-white sm:text-4xl">
            Thirty years of combined production experience.
          </h2>

          <p className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/40">
            <span className="font-mono text-[0.6875rem] tracking-[0.2em] uppercase">Shipped at</span>
            {PEDIGREE.studios.map(studio => (
              <span key={studio} className="text-base font-semibold text-white/80">
                {studio}
              </span>
            ))}
          </p>

          <dl className="mt-14 grid gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-3">
            {PEDIGREE.proof.map(item => (
              <div key={item.label} className="bg-dark-bg p-6">
                <dt className="font-mono text-[0.6875rem] tracking-[0.2em] text-neon-green uppercase">{item.label}</dt>
                <dd className="mt-3 text-sm leading-relaxed text-white/65">{item.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section
        id="hire-contact"
        className="grain relative flex min-h-[60svh] flex-col items-center justify-center overflow-hidden bg-ink px-6 pt-24 pb-40 text-center"
      >
        <div className="relative flex max-w-2xl flex-col items-center gap-8">
          <h2 className="font-display text-4xl leading-tight text-white sm:text-5xl">Tell us what you are building.</h2>
          <p className="text-lg leading-relaxed text-white/60">
            Prototypes, feature teams, or a codebase that has outgrown its first architecture &mdash; send the scope and
            we will tell you honestly whether we are the right team.
          </p>
          <CtaButton href={contactHref} className="px-10 py-4 text-base">
            {WORK_FOR_HIRE.cta}
          </CtaButton>
          <a className="text-sm text-white/35 transition-colors hover:text-white/70" href={contactHref}>
            {CONTACT_EMAIL}
          </a>
        </div>

        <div className="relative mt-20 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/30">
          <span>&copy; {new Date().getFullYear()} RIZ Games &mdash; Buenos Aires</span>
          <a className="transition-colors hover:text-white/70" href="/privacy.html">
            Privacy
          </a>
          <a className="transition-colors hover:text-white/70" href="/tos.html">
            Terms
          </a>
        </div>
      </section>

      <SiteDock items={dockItems} />
    </main>
  );
}
