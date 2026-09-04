/**
 * Metadata tag in the showcase, e.g. [ PC ] [ Seeking Publisher ].
 *
 * The brackets are drawn as text rather than borders so they inherit the
 * accent colour and stay legible over moving video.
 */
export default function Pill({ children }: { children: string }) {
  return (
    <li className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3 py-1 font-mono text-[0.6875rem] tracking-[0.18em] text-white/75 uppercase backdrop-blur-sm">
      <span aria-hidden="true" className="text-[var(--accent)]">
        [
      </span>
      {children}
      <span aria-hidden="true" className="text-[var(--accent)]">
        ]
      </span>
    </li>
  );
}
