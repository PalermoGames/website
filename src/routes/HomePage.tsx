import SiteHeader, { type NavLink } from '@/components/site/SiteHeader';
import HomeHero from '@/sections/HomeHero';
import Services from '@/sections/Services';
import Engagement from '@/sections/Engagement';
import Portfolio from '@/sections/Portfolio';
import HomeContact from '@/sections/HomeContact';

/**
 * The work-for-hire route, and the site's front door.
 *
 * This used to be /work-for-hire, reachable only through an unlabeled briefcase
 * icon on a floating dock, while the homepage sold two unreleased games.
 * Contract work is the revenue, so it gets the entry point.
 *
 * The original IP did not get demoted for it — it moved to Portfolio as
 * evidence. A contract studio that ships its own games has opinions about game
 * feel and eats its own pipeline, which is the argument against every generic
 * outsourcing shop this page competes with.
 */
const NAV: NavLink[] = [
  { label: 'Services', target: 'services' },
  { label: 'How we work', target: 'how-we-work' },
  { label: 'Work', target: 'work' },
  { label: 'Original IP', target: '/original-ip' },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader links={NAV} />
      <main>
        <HomeHero />
        <Services />
        <Engagement />
        <Portfolio />
        <HomeContact />
      </main>
    </>
  );
}
