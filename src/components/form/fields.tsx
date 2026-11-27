"use client";

import type { ReactNode } from "react";

export function Field({ id, label, optional, error, hint, children }: { id: string; label: string; optional?: boolean; error?: string; hint?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2.5 flex items-baseline justify-between text-[14px] font-medium">
        {label}
        {optional && <span className="font-normal text-mute">Facultatif</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="mt-2 text-[13px] text-mute">{hint}</p>}
      {error && <p id={`${id}-error`} role="alert" className="mt-2 text-[13px] text-danger">{error}</p>}
    </div>
  );
}

export function Pill({ selected, onClick, children, role = "radio" }: { selected: boolean; onClick: () => void; children: ReactNode; role?: "radio" | "checkbox" }) {
  return (
    <button
      type="button"
      role={role}
      aria-checked={selected}
      onClick={onClick}
      className={`rounded-full border px-4 py-2.5 text-[14px] transition-all duration-200 active:scale-[0.97] ${
        selected ? "border-accent bg-accent-soft text-fg" : "border-line-strong text-mute hover:border-fg/40 hover:text-fg"
      }`}
    >
      {selected && role === "checkbox" && <span className="mr-1.5 text-accent" aria-hidden>✓</span>}
      {children}
    </button>
  );
}
