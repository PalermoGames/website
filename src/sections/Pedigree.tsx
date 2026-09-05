import { PEDIGREE } from '@/content/site';

/**
 * The risk-reduction section.
 *
 * A publisher looking at two unreleased indie titles is asking whether this
 * team can finish and optimise them. Named studios and shipped numbers answer
 * that faster than a paragraph about our values, so the type is plain and the
 * block is quiet — this is evidence, not another pitch.
 */
export default function Pedigree() {
  return (
    <section id="pedigree" className="relative bg-graphite px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display max-w-3xl text-3xl leading-tight text-white sm:text-4xl md:text-5xl">
          {PEDIGREE.headline}
        </h2>

        <p className="mt-8 max-w-3xl text-base leading-relaxed text-white/75 sm:text-lg">{PEDIGREE.body}</p>

        <p className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/55">
          <span className="font-mono text-[0.6875rem] tracking-[0.2em] uppercase">Production experience from</span>
          {PEDIGREE.studios.map(studio => (
            <span key={studio} className="text-base font-semibold text-white/80">
              {studio}
            </span>
          ))}
        </p>

        <dl className="mt-16 grid gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-3">
          {PEDIGREE.proof.map(item => (
            <div key={item.label} className="bg-graphite p-6">
              <dt className="font-mono text-[0.6875rem] tracking-[0.2em] text-neon-green uppercase">{item.label}</dt>
              <dd className="mt-3 text-sm leading-relaxed text-white/80">{item.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
