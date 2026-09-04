import { useEffect, useState, type RefObject } from 'react';

/**
 * Tracks whether an element is currently on screen.
 *
 * The showcase keeps a full-viewport video per game; decoding the off-screen
 * ones is wasted GPU on exactly the mid-range hardware we care about, so they
 * only play while visible.
 */
export function useInViewport<T extends Element>(ref: RefObject<T | null>, threshold = 0.25): boolean {
  const [inViewport, setInViewport] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => setInViewport(entry.isIntersecting), { threshold });
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return inViewport;
}
