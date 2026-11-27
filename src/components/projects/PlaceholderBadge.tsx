export function PlaceholderBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border border-dashed border-accent/60 bg-ink/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent backdrop-blur ${className}`}>
      Emplacement de démonstration
    </span>
  );
}
