import { useEffect, useState } from 'react';
import Dock, { type DockItemData } from '@/components/Dock';

/**
 * Fixed navigation for the whole site.
 *
 * Hidden at the top of the page on purpose: the hero canvas tracks the cursor,
 * and a chrome bar parked over it is the first thing that makes a portfolio
 * feel like a brochure. It appears once the reader has committed to scrolling.
 */
export default function SiteDock({ items }: { items: DockItemData[] }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const onScroll = () => setRevealed(window.scrollY > 240);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center transition-opacity duration-500 ${
        revealed ? 'opacity-100' : 'opacity-0'
      }`}
      // Hidden is not enough: without inert the five dock buttons are still in
      // the tab order while the dock is invisible at the top of the page.
      inert={!revealed}
      aria-hidden={!revealed}
    >
      <Dock
        items={items}
        className={`border-white/10 bg-black/70 backdrop-blur-md ${revealed ? 'pointer-events-auto' : ''}`}
        panelHeight={62}
        baseItemSize={44}
        magnification={62}
        distance={140}
      />
    </div>
  );
}
