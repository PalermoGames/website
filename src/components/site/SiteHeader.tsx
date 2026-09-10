import { Fragment, useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import wordmark from '@/assets/images/RIZletters.png';
import { BOOKING } from '@/content/site';

export interface NavLink {
  label: string;
  /** Same-page section id, or a route path when it starts with "/". */
  target: string;
}

/**
 * Primary navigation.
 *
 * Replaces the icon dock this site used to navigate with. Five unlabeled
 * circles could not say "work-for-hire", never showed where you were, and sat
 * on top of the body copy at desktop widths — a marketing site cannot spend its
 * information architecture on a flourish.
 *
 * The lockup is deliberate too: RIZletters.png is the actual brand mark and,
 * before this, appeared nowhere on the site except as a favicon.
 */
export default function SiteHeader({
  links,
  ctaLabel = BOOKING.label,
  ctaHref = BOOKING.href,
}: {
  links: NavLink[];
  ctaLabel?: string;
  /**
   * One CTA per route, pointing at that route's actual conversion — not one
   * label site-wide. "/" sends you to the form in #contact, because a header
   * should not make a bigger ask than the section it lands you on; "/showcase"
   * sends you to Steam, because a wishlist is the only conversion that page
   * has. The default is the booking link, for a route that sets neither.
   */
  ctaHref?: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Transparent over the hero, solid once it is behind content it would
  // otherwise be unreadable against.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const renderLink = (link: NavLink, onNavigate?: () => void) =>
    link.target.startsWith('/') ? (
      <Link
        key={link.label}
        to={link.target}
        onClick={onNavigate}
        className="transition-colors hover:text-white"
      >
        {link.label}
      </Link>
    ) : (
      <a
        key={link.label}
        href={`#${link.target}`}
        onClick={onNavigate}
        className="transition-colors hover:text-white"
      >
        {link.label}
      </a>
    );

  /**
   * Three items scroll this page and one leaves it, and nothing in the row says
   * which is which until you have already clicked. A divider before the first
   * route link is the cheapest way to say "everything above is this page".
   */
  const routeLinkIndex = links.findIndex(link => link.target.startsWith('/'));

  const renderLinks = (divider: ReactNode, onNavigate?: () => void) =>
    links.map((link, index) => (
      <Fragment key={link.label}>
        {index === routeLinkIndex && index > 0 && divider}
        {renderLink(link, onNavigate)}
      </Fragment>
    ));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'border-b border-white/10 bg-dark-bg/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 sm:px-10">
        <Link to="/" className="flex items-center gap-2.5" aria-label="RIZ Games — home">
          <img src={wordmark} alt="" width={44} height={30} className="h-[1.6rem] w-auto" />
          <span className="font-display text-lg leading-none tracking-tight text-white">GAMES</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          {renderLinks(<span aria-hidden="true" className="h-4 w-px bg-white/20" />)}
          <a
            href={ctaHref}
            // Only a destination that leaves the site gets a tab. A mailto:
            // in a new tab leaves an empty one behind once the mail client
            // opens, and a same-page "#contact" would open the site twice.
            target={ctaHref.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="rounded-full bg-neon-green px-5 py-2 text-sm font-semibold text-black transition-shadow hover:shadow-[0_0_24px_-4px_var(--color-neon-green)]"
          >
            {ctaLabel}
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen(open => !open)}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          className="text-sm text-white/80 md:hidden"
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* `hidden` rather than conditional render so the panel keeps a stable id
          for aria-controls whether or not it is open. */}
      <div
        id="site-menu"
        hidden={!menuOpen}
        className="border-t border-white/10 bg-dark-bg/95 px-6 py-5 backdrop-blur-md md:hidden"
      >
        <nav className="flex flex-col items-start gap-4 text-base text-white/80">
          {renderLinks(<span aria-hidden="true" className="h-px w-8 bg-white/20" />, () => setMenuOpen(false))}
          <a
            href={ctaHref}
            // Only a destination that leaves the site gets a tab. A mailto:
            // in a new tab leaves an empty one behind once the mail client
            // opens, and a same-page "#contact" would open the site twice.
            target={ctaHref.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-1 w-fit rounded-full bg-neon-green px-5 py-2 text-sm font-semibold text-black"
          >
            {ctaLabel}
          </a>
        </nav>
      </div>
    </header>
  );
}
