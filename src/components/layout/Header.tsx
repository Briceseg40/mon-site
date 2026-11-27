"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { nav, projectCta } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { Arrow } from "@/components/ui/Button";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme le menu mobile à chaque changement de page.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a href="#contenu" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-full focus:bg-paper focus:px-4 focus:py-2 focus:text-ink">
        Aller au contenu
      </a>
      <div
        className={`transition-all duration-500 ease-[var(--ease-out-expo)] ${
          scrolled || open ? "border-b border-line bg-ink/75 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <div className="container-x flex h-[72px] items-center justify-between">
          <Logo />

          <nav aria-label="Navigation principale" className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`relative rounded-full px-4 py-2 text-[14px] transition-colors duration-200 hover:text-paper ${
                  isActive(item.href) ? "text-paper" : "text-mute"
                }`}
              >
                {isActive(item.href) && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-paper/[0.07]" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />
                )}
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={projectCta.href}
              className="group hidden items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-[14px] font-medium text-ink transition-colors duration-300 hover:bg-accent sm:inline-flex"
            >
              {projectCta.label}
              <Arrow />
            </Link>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full border border-line-strong md:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setOpen((o) => !o)}
            >
              <span className="relative block h-3 w-4" aria-hidden>
                <span className={`absolute left-0 top-0 h-px w-4 bg-paper transition-transform duration-300 ${open ? "translate-y-1.5 rotate-45" : ""}`} />
                <span className={`absolute bottom-0 left-0 h-px w-4 bg-paper transition-transform duration-300 ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-[72px] z-40 bg-ink/95 backdrop-blur-xl md:hidden"
          >
            <nav aria-label="Navigation mobile" className="container-x flex h-full flex-col pb-10 pt-8">
              {[{ href: "/", label: "Accueil" }, ...nav].map((item, i) => (
                <motion.div key={item.href} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i, duration: 0.4 }}>
                  <Link href={item.href} className="flex items-baseline justify-between border-b border-line py-5 font-serif text-4xl">
                    {item.label}
                    <span className="font-mono text-xs text-mute">0{i + 1}</span>
                  </Link>
                </motion.div>
              ))}
              <Link href={projectCta.href} className="mt-auto flex items-center justify-center gap-2 rounded-full bg-accent py-4 text-[16px] font-medium text-ink">
                {projectCta.label}
                <Arrow />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
