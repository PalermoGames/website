import { useState, type FormEvent } from 'react';
import {
  CONTACT_EMAIL,
  CONTACT_FORM,
  CONTACT_FORM_ENDPOINT,
  CONTACT_FORM_KEY,
  HOME_CONTACT,
  mailto,
} from '@/content/site';

/**
 * The primary ask on "/", and the rung the funnel was missing.
 *
 * Every string here comes from CONTACT_FORM — labels and error text are copy
 * like anything else, and this file holds none of it.
 *
 * The form never leaves a visitor with nothing to do. With no endpoint
 * configured, and again if the POST fails, it hands back everything they typed
 * as a pre-filled mail draft and says which of the two happened. The one state
 * it does not have is a generic error.
 *
 * Not wrapped in Magnet, and neither is anything inside it: a control that
 * moves away from the pointer is a joke on a button and a hazard on a field.
 */

const FIELDS = CONTACT_FORM.fields;

/**
 * A field people never see and bots fill in anyway. Named plausibly on
 * purpose — a bot reads the name, not the styling that hides it.
 */
const HONEYPOT = 'website';

const LABEL = 'mb-2 block font-mono text-[0.6875rem] tracking-[0.2em] text-white/45 uppercase';
const FIELD =
  'w-full rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white transition-colors placeholder:text-white/30 focus:border-neon-green focus:outline-none';

/** Everything they typed, in the order the form asked for it. */
function emailBody(data: FormData): string {
  const value = (field: { name: string }) => String(data.get(field.name) ?? '').trim();
  const line = (field: { name: string; label: string }) => (value(field) ? `${field.label}: ${value(field)}\n` : '');

  return (
    'Hi RIZ Games,\n\n' +
    line(FIELDS.name) +
    line(FIELDS.company) +
    line(FIELDS.email) +
    line(FIELDS.timing) +
    `\n${FIELDS.brief.label}\n${value(FIELDS.brief)}\n`
  );
}

type Handoff = { copy: typeof CONTACT_FORM.failed | typeof CONTACT_FORM.handoff; href: string };

export default function ContactForm() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [handoff, setHandoff] = useState<Handoff | null>(null);

  const configured = CONTACT_FORM_ENDPOINT !== '';

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // Accepted and dropped. Telling a bot it failed only teaches it to try
    // again with the field left empty.
    if (String(data.get(HONEYPOT) ?? '') !== '') {
      setSent(true);
      return;
    }
    data.delete(HONEYPOT);

    const href = mailto(HOME_CONTACT.subject, emailBody(data));

    if (!configured) {
      setHandoff({ copy: CONTACT_FORM.handoff, href });
      return;
    }

    if (CONTACT_FORM_KEY) data.set('access_key', CONTACT_FORM_KEY);

    setSending(true);
    setHandoff(null);
    try {
      // FormData rather than JSON: Formspree, Web3Forms and a hand-written
      // Worker all accept it, so switching provider stays a URL change.
      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      if (!response.ok) throw new Error(String(response.status));
      setSent(true);
    } catch {
      setHandoff({ copy: CONTACT_FORM.failed, href });
    } finally {
      setSending(false);
    }
  };

  // Replaces the form in place rather than routing anywhere: the visitor keeps
  // the page they were reading, and there is no second URL to get indexed.
  if (sent) {
    return (
      <div role="status" className="w-full rounded-xl border border-neon-green/40 bg-neon-green/[0.06] px-6 py-8 text-left">
        <p className="font-display text-2xl text-white">{CONTACT_FORM.sent.headline}</p>
        <p className="mt-3 text-base leading-relaxed text-white/75">{CONTACT_FORM.sent.body}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative w-full text-left">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={LABEL} htmlFor={FIELDS.name.name}>
            {FIELDS.name.label}
          </label>
          <input
            className={FIELD}
            id={FIELDS.name.name}
            name={FIELDS.name.name}
            type="text"
            autoComplete="name"
            required
          />
        </div>

        <div>
          <label className={LABEL} htmlFor={FIELDS.email.name}>
            {FIELDS.email.label}
          </label>
          <input
            className={FIELD}
            id={FIELDS.email.name}
            name={FIELDS.email.name}
            type="email"
            autoComplete="email"
            required
          />
        </div>

        <div className="sm:col-span-2">
          <label className={LABEL} htmlFor={FIELDS.company.name}>
            {FIELDS.company.label}
          </label>
          <input
            className={FIELD}
            id={FIELDS.company.name}
            name={FIELDS.company.name}
            type="text"
            autoComplete="organization"
            required
          />
        </div>

        <div className="sm:col-span-2">
          <label className={LABEL} htmlFor={FIELDS.brief.name}>
            {FIELDS.brief.label}
          </label>
          <textarea
            className={`${FIELD} min-h-32 resize-y`}
            id={FIELDS.brief.name}
            name={FIELDS.brief.name}
            placeholder={FIELDS.brief.placeholder}
            rows={5}
            required
          />
        </div>

        <div className="sm:col-span-2">
          <label className={LABEL} htmlFor={FIELDS.timing.name}>
            {FIELDS.timing.label}
          </label>
          {/* Optional on purpose. It is the studio's question, not the
              visitor's, and making it mandatory would cost leads to buy intel. */}
          <select className={FIELD} id={FIELDS.timing.name} name={FIELDS.timing.name} defaultValue="">
            <option className="bg-dark-bg" value="">
              {FIELDS.timing.unanswered}
            </option>
            {FIELDS.timing.options.map(option => (
              <option className="bg-dark-bg" key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Off-screen rather than display:none — some bots skip what is hidden. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={HONEYPOT}>Leave this empty</label>
        <input id={HONEYPOT} name={HONEYPOT} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
        <button
          type="submit"
          disabled={sending}
          className="inline-flex items-center justify-center rounded-full bg-neon-green px-8 py-3.5 text-sm font-semibold tracking-wide text-black transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_28px_-4px_var(--color-neon-green)] disabled:translate-y-0 disabled:opacity-60 disabled:shadow-none"
        >
          {sending ? CONTACT_FORM.sending : configured ? CONTACT_FORM.submit : CONTACT_FORM.compose}
        </button>

        {/* Said before the click, not after it: a button that turns out to need
            a mail client is a bait, and this is the shipping state until an
            endpoint is configured. */}
        {!configured && <p className="text-xs leading-relaxed text-white/45">{CONTACT_FORM.composeNote}</p>}
      </div>

      {handoff && (
        <div role="status" className="mt-6 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-6">
          <p className="font-display text-xl text-white">{handoff.copy.headline}</p>
          <p className="mt-2 text-sm leading-relaxed text-white/70">{handoff.copy.body}</p>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
            <a
              href={handoff.href}
              className="inline-flex items-center justify-center rounded-full border border-neon-green/60 px-6 py-2.5 font-semibold text-neon-green transition-colors hover:bg-neon-green/10"
            >
              {handoff.copy.cta}
            </a>
            <span className="text-white/50">
              {CONTACT_FORM.orCopy}{' '}
              <a className="text-white/70 transition-colors hover:text-white" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
            </span>
          </div>
        </div>
      )}
    </form>
  );
}
