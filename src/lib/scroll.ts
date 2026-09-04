/**
 * Scrolls to a section by id.
 *
 * `scroll-behavior: smooth` on <html> already handles the easing, and the
 * reduced-motion media block turns it off, so this stays a plain call.
 */
export function scrollToId(id: string): void {
  document.getElementById(id)?.scrollIntoView({ block: 'start' });
}
