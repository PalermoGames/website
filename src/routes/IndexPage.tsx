import { useNavigate } from 'react-router-dom';
import Hero from '@/sections/Hero';
import Portal from '@/sections/Portal';
import Showcase from '@/sections/Showcase';
import Pedigree from '@/sections/Pedigree';
import PublisherGateway from '@/sections/PublisherGateway';
import SiteDock from '@/components/site/SiteDock';
import { BriefcaseIcon, GamepadIcon, HomeIcon, MailIcon, StudioIcon } from '@/components/site/icons';
import type { DockItemData } from '@/components/Dock';
import { scrollToId } from '@/lib/scroll';

/**
 * The original-IP route: studio hero, then a threshold, then one game per
 * screen, then the two things a publisher needs before they will reply.
 */
export default function IndexPage() {
  const navigate = useNavigate();

  const dockItems: DockItemData[] = [
    { icon: <HomeIcon />, label: 'Home', onClick: () => window.scrollTo({ top: 0 }) },
    { icon: <GamepadIcon />, label: 'Original IPs', onClick: () => scrollToId('showcase') },
    { icon: <StudioIcon />, label: 'Studio', onClick: () => scrollToId('pedigree') },
    { icon: <MailIcon />, label: 'Contact', onClick: () => scrollToId('gateway') },
    { icon: <BriefcaseIcon />, label: 'Work-for-hire', onClick: () => navigate('/work-for-hire') },
  ];

  return (
    <main>
      <Hero />
      <Portal />
      <Showcase />
      <Pedigree />
      <PublisherGateway />
      <SiteDock items={dockItems} />
    </main>
  );
}
