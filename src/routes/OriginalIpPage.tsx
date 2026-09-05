import SiteHeader, { type NavLink } from '@/components/site/SiteHeader';
import Hero from '@/sections/Hero';
import Showcase from '@/sections/Showcase';
import Pedigree from '@/sections/Pedigree';
import PublisherGateway from '@/sections/PublisherGateway';

/**
 * The publisher route: studio hero, one game per screen, then the two things a
 * publisher needs before they will reply.
 *
 * Nobody lands here cold — this is the URL that goes in a cold email to a
 * publisher, which is why it carries its own OG tags (see scripts/og-routes.mjs)
 * rather than unfurling as the work-for-hire pitch.
 */
const NAV: NavLink[] = [
  { label: 'The games', target: 'showcase' },
  { label: 'Studio', target: 'pedigree' },
  { label: 'Contact', target: 'gateway' },
  { label: 'Work-for-hire', target: '/' },
];

export default function OriginalIpPage() {
  return (
    <>
      <SiteHeader links={NAV} ctaLabel="Get in touch" />
      <main>
        <Hero />
        <Showcase />
        <Pedigree />
        <PublisherGateway />
      </main>
    </>
  );
}
