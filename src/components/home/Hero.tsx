"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ButtonLink } from "@/components/ui/Button";

const shots = [
  { href: "/realisations/odo40", src: "/projects/odo40/accueil.webp", alt: "Page d'accueil du site ODO40", caption: "ODO40, une asso des Landes", rotate: -3 },
  { href: "/realisations/agendsup", src: "/projects/agendsup/04c-agenda-detail-devoir.webp", alt: "L'agenda d'AgendSup", caption: "AgendSup, avec ma promo", rotate: 2.5 },
];

export function Hero() {
  const reduce = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;
  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.8, ease },
  });

  return (
    <section className="relative pb-20 pt-36 md:pb-28 md:pt-44">
      <div className="container-x grid items-center gap-y-16 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-6">
          <motion.h1 {...fade(0.05)} className="display text-[clamp(3rem,7vw,6rem)]">
            Je code des sites et des applis depuis <em>Anglet</em>.
          </motion.h1>

          <motion.p {...fade(0.2)} className="mt-8 max-w-xl text-[18px] leading-relaxed text-mute md:text-[19px]">
            Moi c&apos;est <span className="text-fg">Brice</span>, 25 ans, en dernière année de BUT Informatique à Bayonne. À côté des cours, je
            prends des projets de sites et d&apos;outils web. Vous m&apos;écrivez, on s&apos;appelle, et c&apos;est moi qui fais tout de A à Z.
          </motion.p>

          <motion.div {...fade(0.3)} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/demarrer-un-projet" arrow>Me parler de votre projet</ButtonLink>
            <ButtonLink href="/realisations" variant="ghost">Voir ce que j&apos;ai fait</ButtonLink>
          </motion.div>
        </div>

        <div className="relative lg:col-span-6">
          <div className="grid gap-10 sm:grid-cols-2 sm:gap-6 lg:block">
            {shots.map((s, i) => (
              <motion.div
                key={s.href}
                initial={reduce ? false : { opacity: 0, y: 24, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate: s.rotate }}
                transition={{ delay: 0.25 + i * 0.15, duration: 1, ease }}
                className={i === 0 ? "lg:w-[82%]" : "lg:mt-4 lg:ml-auto lg:w-[72%]"}
              >
                <Link href={s.href} className="group block">
                  <span className="relative block aspect-[16/10] overflow-hidden rounded-xl border border-line bg-surface shadow-[0_24px_50px_-24px_rgb(14_14_16/0.35)] transition-transform duration-500 group-hover:-translate-y-1">
                    <Image src={s.src} alt={s.alt} fill priority={i === 0} sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw" className="object-cover object-top" />
                  </span>
                  <span className="mt-3 block font-serif text-[17px] italic text-mute transition-colors group-hover:text-accent">{s.caption}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
