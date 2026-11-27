import Link from "next/link";
import { nav, projectCta, siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { Availability } from "@/components/ui/Availability";

export function Footer() {
  const socials = Object.entries(siteConfig.socials).filter(([, url]) => url);
  const labels: Record<string, string> = { github: "GitHub", linkedin: "LinkedIn", malt: "Malt" };
  return (
    <footer className="relative mt-32 border-t border-line">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-mute">
            {siteConfig.brand.activity}. Je travaille depuis {siteConfig.location} avec des clients d&apos;ici et d&apos;ailleurs.
          </p>
          <Availability className="mt-6" />
        </div>
        <div className="md:col-span-2">
          <p className="eyebrow mb-5">Le site</p>
          <ul className="space-y-3 text-[15px]">
            {nav.map((n) => (
              <li key={n.href}><Link className="text-mute transition-colors hover:text-paper" href={n.href}>{n.label}</Link></li>
            ))}
            <li><Link className="text-mute transition-colors hover:text-paper" href={projectCta.href}>{projectCta.label}</Link></li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="eyebrow mb-5">Contact</p>
          <ul className="space-y-3 text-[15px]">
            {siteConfig.email && (
              <li><a className="text-mute transition-colors hover:text-paper" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></li>
            )}
            {socials.map(([k, url]) => (
              <li key={k}><a className="text-mute transition-colors hover:text-paper" href={url} target="_blank" rel="noopener noreferrer">{labels[k] ?? k}</a></li>
            ))}
            <li><Link className="text-mute transition-colors hover:text-paper" href={projectCta.href}>Formulaire de projet</Link></li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow mb-5">Informations</p>
          <ul className="space-y-3 text-[15px]">
            <li><Link className="text-mute transition-colors hover:text-paper" href="/mentions-legales">Mentions légales</Link></li>
            <li><Link className="text-mute transition-colors hover:text-paper" href="/confidentialite">Politique de confidentialité</Link></li>
          </ul>
        </div>
      </div>
      <div className="horizon" aria-hidden />
      <div className="container-x flex flex-col gap-2 py-6 text-[13px] text-mute sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} {siteConfig.brand.name} · <span className="uppercase tracking-[0.14em]">{siteConfig.brand.tagline}</span></p>
        <p>Conçu et développé à la main, à {siteConfig.location.split(",")[0]}.</p>
      </div>
    </footer>
  );
}
