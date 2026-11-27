import Link from "next/link";
import { siteConfig } from "@/config/site";

/** Logo texte : monogramme + nom. Remplaçable par un SVG le jour où le nom commercial est choisi. */
export function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label={`${siteConfig.brand.name}, accueil`}>
      <span className="relative grid size-9 place-items-center rounded-full border border-line-strong font-serif text-[19px] italic leading-none transition-colors duration-300 group-hover:border-accent group-hover:text-accent">
        {siteConfig.brand.mark}
        <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-accent" aria-hidden />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-[15px] font-medium tracking-[-0.01em]">{siteConfig.brand.name}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute transition-colors duration-300 group-hover:text-accent">{siteConfig.brand.tagline}</span>
      </span>
    </Link>
  );
}
