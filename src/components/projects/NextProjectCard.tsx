import Link from "next/link";

/** Carte d'appel à l'action placée à côté des réalisations. Ce n'est pas un projet. */
export function NextProjectCard() {
  return (
    <Link
      href="/demarrer-un-projet"
      className="group relative flex h-full min-h-[320px] flex-col justify-between overflow-hidden rounded-[var(--radius-card)] border border-dashed border-line-strong p-8 transition-colors duration-300 hover:border-accent"
    >
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(70%_80%_at_50%_100%,rgb(255_106_61/0.14),transparent_70%)] opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
      <p className="eyebrow relative">Votre projet</p>
      <div className="relative">
        <p className="display text-[clamp(2.2rem,4vw,3.4rem)]">
          La suivante, <em>ce sera peut-être la vôtre</em>.
        </p>
        <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-mute">Racontez-moi votre idée, je vous réponds moi-même.</p>
        <span className="mt-8 inline-flex items-center gap-2 text-[15px] font-medium transition-colors group-hover:text-accent">
          Démarrer un projet
          <svg aria-hidden viewBox="0 0 16 16" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </div>
    </Link>
  );
}
