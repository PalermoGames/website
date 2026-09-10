import type { CSSProperties } from 'react';
import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';
import CtaButton from '@/components/site/CtaButton';
import { NOT_FOUND } from '@/content/site';

/**
 * Rendered for any path the router does not know.
 *
 * nginx serves dist/404.html for anything with no file behind it — the same
 * shell, with a 404 status and a noindex — so the screen and the status code
 * say the same thing. This replaced a client-side redirect to "/", which told
 * the visitor nothing about the link they had followed and told a crawler the
 * URL was real.
 *
 * Deliberately plain: no shader, no hero. This is a page to leave quickly, and
 * both exits are above the fold.
 */
export default function NotFoundPage() {
  return (
    <div style={{ '--accent': 'var(--color-neon-green)' } as CSSProperties}>
      <SiteHeader links={[]} />
      <main className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 py-32 text-center">
        <p className="font-mono text-[0.6875rem] tracking-[0.3em] text-neon-green uppercase">{NOT_FOUND.code}</p>

        <h1 className="font-display mt-6 max-w-2xl text-4xl leading-tight text-white sm:text-5xl">
          {NOT_FOUND.headline}
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">{NOT_FOUND.body}</p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <CtaButton href="/">{NOT_FOUND.home}</CtaButton>
          <CtaButton href="/showcase" variant="ghost">
            {NOT_FOUND.showcase}
          </CtaButton>
        </div>

        <div className="mt-20">
          <SiteFooter crossLink={{ label: NOT_FOUND.showcase, to: '/showcase' }} />
        </div>
      </main>
    </div>
  );
}
