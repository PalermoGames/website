import { Link } from 'react-router-dom';

/**
 * The small print, extracted from the two routes that had been carrying
 * identical copies of it inline.
 *
 * privacy.html and tos.html are real files in public/, not routes — the Play
 * Store listings link them at fixed URLs. They must stay plain <a> tags so the
 * router never intercepts them. See CLAUDE.md.
 */
export default function SiteFooter({ crossLink }: { crossLink: { label: string; to: string } }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/55">
      <span>© {new Date().getFullYear()} RIZ Games — Buenos Aires</span>
      <Link className="transition-colors hover:text-white" to={crossLink.to}>
        {crossLink.label}
      </Link>
      <a className="transition-colors hover:text-white" href="/privacy.html">
        Privacy
      </a>
      <a className="transition-colors hover:text-white" href="/tos.html">
        Terms
      </a>
    </div>
  );
}
