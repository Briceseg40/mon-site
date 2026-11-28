import Link from "next/link";
import { nav, projectCta, siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const socials = Object.entries(siteConfig.socials).filter(([, url]) => url);
  const labels: Record<string, string> = { github: "GitHub", linkedin: "LinkedIn", malt: "Malt" };
  return (
    <footer className="relative mt-32 border-t border-line">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-mute">
            Je fais des sites et des applis web depuis Anglet, pour des gens du Pays basque et d&apos;ailleurs.
          </p>
        </div>
        <div className="md:col-span-2">
          <p className="eyebrow mb-5">Le site</p>
          <ul className="space-y-3 text-[15px]">
            {nav.map((n) => (
              <li key={n.href}><Link className="text-mute transition-colors hover:text-fg" href={n.href}>{n.label}</Link></li>
            ))}
            <li><Link className="text-mute transition-colors hover:text-fg" href={projectCta.href}>{projectCta.label}</Link></li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="eyebrow mb-5">Contact</p>
          <ul className="space-y-3 text-[15px]">
            {siteConfig.email && (
              <li><a className="text-mute transition-colors hover:text-fg" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></li>
            )}
            {socials.map(([k, url]) => (
              <li key={k}><a className="text-mute transition-colors hover:text-fg" href={url} target="_blank" rel="noopener noreferrer">{labels[k] ?? k}</a></li>
            ))}
            <li><Link className="text-mute transition-colors hover:text-fg" href={projectCta.href}>Formulaire de projet</Link></li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow mb-5">Informations</p>
          <ul className="space-y-3 text-[15px]">
            <li><Link className="text-mute transition-colors hover:text-fg" href="/mentions-legales">Mentions légales</Link></li>
            <li><Link className="text-mute transition-colors hover:text-fg" href="/confidentialite">Politique de confidentialité</Link></li>
          </ul>
        </div>
      </div>
      <div className="horizon" aria-hidden />
      <div className="container-x flex flex-col gap-2 py-6 text-[13px] text-mute sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} {siteConfig.brand.name} · <span className="uppercase tracking-[0.14em]">{siteConfig.brand.tagline}</span></p>
        <p>Codé à la main, sans template.</p>
      </div>
    </footer>
  );
}
