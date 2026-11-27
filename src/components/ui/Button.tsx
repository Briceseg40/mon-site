import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost" | "link";

const styles: Record<Variant, string> = {
  primary:
    "bg-fg text-canvas shadow-[0_1px_0_0_rgb(255_255_255/0.25)_inset,0_8px_20px_-8px_rgb(14_14_16/0.45)] hover:-translate-y-0.5 hover:bg-accent hover:text-fg hover:shadow-[0_14px_30px_-10px_rgb(236_74_23/0.6)]",
  ghost: "border border-line-strong bg-surface/60 text-fg backdrop-blur hover:-translate-y-0.5 hover:border-fg/40 hover:bg-surface",
  link: "text-fg underline-offset-4 hover:underline px-0! py-0!",
};

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-[15px] font-medium tracking-[-0.01em] transition-all duration-300 ease-[var(--ease-out-expo)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className={`size-4 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 ${className}`}
    >
      <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type LinkProps = ComponentProps<typeof Link> & { variant?: Variant; arrow?: boolean; children: ReactNode };

export function ButtonLink({ variant = "primary", arrow = false, className = "", children, ...rest }: LinkProps) {
  return (
    <Link className={`${base} ${styles[variant]} ${className}`} {...rest}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

type BtnProps = ComponentProps<"button"> & { variant?: Variant; arrow?: boolean };

export function Button({ variant = "primary", arrow = false, className = "", children, ...rest }: BtnProps) {
  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...rest}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}
