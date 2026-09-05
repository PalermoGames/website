import { SERVICES } from '@/content/site';

/**
 * What we take on. Unchanged in substance from the old work-for-hire route —
 * the four service cards were already the clearest block on the site. They just
 * sit above the fold now instead of behind an unlabeled briefcase icon.
 */
export default function Services() {
  return (
    <section id="services" className="bg-graphite px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-3xl leading-tight text-white sm:text-4xl">{SERVICES.headline}</h2>

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-2">
          {SERVICES.items.map(service => (
            <div key={service.title} className="bg-graphite p-8">
              <h3 className="text-lg font-semibold text-white">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/75">{service.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
