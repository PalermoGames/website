import type { ReactNode } from 'react';

interface CommonProps {
  children: ReactNode;
  variant?: 'solid' | 'ghost';
  className?: string;
}

type CtaButtonProps = CommonProps &
  ({ href: string; onClick?: never } | { href?: never; onClick: () => void });

/**
 * The one button style on the site. Colour comes from the `--accent` custom
 * property on an ancestor, so the same component reads as part of Tango
 * District's world in one section and What Floor's in the next.
 */
export default function CtaButton({ children, variant = 'solid', className = '', href, onClick }: CtaButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold tracking-wide transition-[transform,background-color,box-shadow,border-color] duration-200 hover:-translate-y-0.5';

  const skin =
    variant === 'solid'
      ? 'bg-[var(--accent)] text-black hover:shadow-[0_0_28px_-4px_var(--accent)]'
      : 'border border-white/25 text-white/90 hover:border-[var(--accent)] hover:text-white hover:bg-white/5';

  const classes = `${base} ${skin} ${className}`;

  return href ? (
    <a className={classes} href={href}>
      {children}
    </a>
  ) : (
    <button className={classes} type="button" onClick={onClick}>
      {children}
    </button>
  );
}
