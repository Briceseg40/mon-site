import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost" | "link";

const styles: Record<Variant, string> = {
  primary:
    "bg-paper text-ink hover:bg-accent hover:text-ink shadow-[0_1px_0_0_rgb(255_255_255/0.4)_inset,0_10px_30px_-10px_rgb(255_106_61/0.0)] hover:shadow-[0_1px_0_0_rgb(255_255_255/0.4)_inset,0_18px_40px_-12px_rgb(255_106_61/0.55)]",
  ghost: "border border-line-strong text-paper hover:border-paper/60 hover:bg-paper/[0.04]",
  link: "text-paper underline-offset-4 hover:underline px-0! py-0!",
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
