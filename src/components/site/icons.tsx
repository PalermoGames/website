/**
 * Dock glyphs. Inline rather than an icon package: five 20px strokes are not
 * worth a dependency, and these inherit currentColor.
 */
const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const;

export const HomeIcon = () => (
  <svg {...base}>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5.5 9.5V21h13V9.5" />
  </svg>
);

export const GamepadIcon = () => (
  <svg {...base}>
    <path d="M6.5 8h11a4.5 4.5 0 0 1 4.4 5.4l-.8 4A3 3 0 0 1 16 18.6L14.5 17h-5L8 18.6a3 3 0 0 1-5.1-1.2l-.8-4A4.5 4.5 0 0 1 6.5 8Z" />
    <path d="M7.5 11.5v3M6 13h3M15.5 12h.01M18 14h.01" />
  </svg>
);

export const StudioIcon = () => (
  <svg {...base}>
    <path d="M4 21V6l8-3 8 3v15" />
    <path d="M9 21v-5h6v5M8 10h.01M12 10h.01M16 10h.01" />
  </svg>
);

export const MailIcon = () => (
  <svg {...base}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
);

export const BriefcaseIcon = () => (
  <svg {...base}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 12h18" />
  </svg>
);
