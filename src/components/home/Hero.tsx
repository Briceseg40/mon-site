"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Availability } from "@/components/ui/Availability";
import { siteConfig } from "@/config/site";
import { DotGlobe } from "./DotGlobe";

const lines: { w: string; accent?: boolean }[][] = [
  [{ w: "Des" }, { w: "sites" }, { w: "et" }, { w: "des" }, { w: "apps" }],
  [{ w: "qui" }, { w: "travaillent", accent: true }],
  [{ w: "pour" }, { w: "vous." }],
];

const facts = [
  { k: "Interlocuteur", v: "Un seul, du début à la fin" },
  { k: "Approche", v: "Design et code sur mesure" },
  { k: "Basé à", v: siteConfig.location },
];

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const globeY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const globeScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  let i = 0;
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section ref={ref} className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
      <div aria-hidden className="aurora pointer-events-none absolute -right-40 -top-20 h-[720px] w-[1100px] opacity-90" />

      <div className="container-x relative grid items-center gap-y-10 lg:grid-cols-12">
        <div className="relative z-10 lg:col-span-7">
          <motion.div initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8, ease }}
            className="glass mb-10 inline-flex items-center gap-3 rounded-full py-1.5 pl-3 pr-4">
            <Availability />
          </motion.div>

          <h1 className="display text-[clamp(3rem,7.4vw,6.4rem)]">
            {lines.map((line, li) => (
              <span key={li} className="block">
                {line.map(({ w, accent }) => {
                  const d = 0.15 + i++ * 0.06;
                  return (
                    <span key={w} className="inline-block overflow-hidden pb-[0.14em] align-bottom">
                      <motion.span
                        className="inline-block"
                        initial={reduce ? false : { y: "110%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1, delay: d, ease }}
                      >
                        {accent ? <em>{w}</em> : w}
                      </motion.span>
                      {" "}
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.8, ease }}
            className="mt-8 max-w-xl text-[18px] leading-relaxed text-mute md:text-[19px]"
          >
            Je m&apos;appelle <span className="text-fg">Brice</span>. Je conçois et je développe des sites internet et des applications sur mesure
            pour les indépendants et les entreprises, de la première discussion à la mise en ligne.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <ButtonLink href="/demarrer-un-projet" arrow>Démarrer un projet</ButtonLink>
            <ButtonLink href="/realisations" variant="ghost">Découvrir mes projets</ButtonLink>
          </motion.div>
        </div>

        <motion.div
          style={reduce ? undefined : { y: globeY, scale: globeScale }}
          initial={reduce ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1.6, ease }}
          className="pointer-events-none absolute right-[-45%] top-24 aspect-square w-[115%] opacity-25 sm:right-[-15%] sm:w-[80%] lg:pointer-events-auto lg:relative lg:right-auto lg:top-auto lg:col-span-5 lg:w-full lg:opacity-100"
        >
          <DotGlobe />
          <div className="glass absolute bottom-[12%] left-[2%] hidden rounded-2xl px-4 py-3 lg:block">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mute">{siteConfig.brand.tagline}</p>
            <p className="mt-1 text-[14px] font-medium">Des idées qui passent à l&apos;action</p>
          </div>
        </motion.div>
      </div>

      <motion.dl
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="container-x relative mt-16 grid gap-6 border-t border-line pt-8 sm:grid-cols-3 md:mt-20"
      >
        {facts.map((f) => (
          <div key={f.k}>
            <dt className="eyebrow">{f.k}</dt>
            <dd className="mt-2 text-[17px] font-medium tracking-[-0.01em]">{f.v}</dd>
          </div>
        ))}
      </motion.dl>
    </section>
  );
}
