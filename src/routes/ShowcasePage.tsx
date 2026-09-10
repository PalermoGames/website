import SiteHeader, { type NavLink } from '@/components/site/SiteHeader';
import Hero from '@/sections/Hero';
import Showcase from '@/sections/Showcase';
import Pedigree from '@/sections/Pedigree';
import IpGateway from '@/sections/IpGateway';
import { GATEWAY } from '@/content/site';

/**
 * The showcase route: studio hero, one game per screen, the studio's track
 * record, then the ask.
 *
 * It was written as a publisher pitch, and lived at /original-ip. Tango
 * District is self-published and Nitro Racers never released, so there is
 * nobody to pitch: the page is a showcase of both titles, it exists to be
 * linked, and its conversion is a wishlist rather than a reply. That is also
 * why it carries its own OG tags (see scripts/og-routes.mjs) rather than
 * unfurling as the work-for-hire pitch — almost nobody arrives here except
 * through a link somebody sent.
 */
/**
 * The last item is the homepage, and it is named for what the reader would do
 * there rather than for the trade's word for it. "Work-for-hire" is the
 * seller's vocabulary; it also described the *service* while the link pointed
 * at the *route*, so the two sides of the site called the same destination two
 * different things. One name per destination: "/" is "Work with us"
 * everywhere, "/showcase" is "Our games" everywhere.
 */
const NAV: NavLink[] = [
  { label: 'The games', target: 'showcase' },
  { label: 'Studio', target: 'pedigree' },
  { label: 'Contact', target: 'gateway' },
  { label: 'Work with us', target: '/' },
];

export default function ShowcasePage() {
  return (
    <>
      {/* This route's only stated conversion is a wishlist, so the largest
          button on it goes to Steam. It used to say "Get in touch" and open a
          mail client, spending the page's most valuable click on something the
          page is not asking for — the inbox is still there in IpGateway, one
          rung down, for press and build requests. */}
      <SiteHeader links={NAV} ctaLabel={GATEWAY.cta} ctaHref={GATEWAY.href} />
      <main>
        <Hero />
        <Showcase />
        <Pedigree />
        <IpGateway />
      </main>
    </>
  );
}
