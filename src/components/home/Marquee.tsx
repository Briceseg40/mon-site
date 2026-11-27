const items = ["Sites vitrines", "Refontes", "Applications web", "Applications mobiles", "Maquettes", "Design UI/UX", "Accompagnement"];

export function Marquee() {
  const row = (hidden = false) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t} className="flex items-center whitespace-nowrap px-8 font-serif text-[clamp(1.8rem,4vw,3rem)] text-paper/80">
          {t}
          <span className="ml-16 size-2 rounded-full bg-accent/80" aria-hidden />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="relative overflow-hidden border-y border-line py-7 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div className="animate-marquee flex w-max hover:[animation-play-state:paused]">
        {row()}
        {row(true)}
      </div>
    </div>
  );
}
