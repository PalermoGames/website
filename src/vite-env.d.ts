/// <reference types="vite/client" />

/**
 * Build-time configuration, read from the Dokploy environment. Both are
 * optional: with no endpoint the contact form falls back to a pre-filled mail
 * draft rather than breaking. See CONTACT_FORM_ENDPOINT in src/content/site.ts.
 */
interface ImportMetaEnv {
  readonly VITE_CONTACT_FORM_ENDPOINT?: string;
  readonly VITE_CONTACT_FORM_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
