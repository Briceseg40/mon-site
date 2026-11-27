"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Availability } from "@/components/ui/Availability";
import { siteConfig } from "@/config/site";

const line1 = ["Des", "sites", "et", "des", "apps"];
const line2 = ["qui", "travaillent"];
const line3 = ["pour", "vous."];

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sunY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  let i = 0;
  const word = (w: string, accent = false) => {
    const d = 0.15 + i++ * 0.06;
    return (
      <span key={w + d} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
        <motion.span
          className={`inline-block ${accent ? "italic text-accent" : ""}`}
          initial={reduce ? false : { y: "105%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: d, ease: [0.22, 1, 0.36, 1] }}
        >
          {w}
        </motion.span>
        {" "}
      </span>
    );
  };

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-36 md:pb-24">
      {/* Soleil couchant sur l'horizon */}
      <motion.div aria-hidden style={{ y: reduce ? 0 : sunY }} className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%]">
        <div className="absolute left-1/2 top-[38%] size-[min(90vw,780px)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_40%,rgb(255_106_61/0.55),rgb(255_106_61/0.12)_45%,transparent_70%)] blur-2xl" />
        <div className="horizon absolute inset-x-0 top-[58%]" />
        <div className="absolute inset-x-0 top-[58%] bottom-0 bg-gradient-to-b from-ink/40 to-ink" />
      </motion.div>

      <motion.div style={{ opacity: reduce ? 1 : fade }} className="container-x relative">
        <motion.div initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.8 }} className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2">
          <Availability />
          <span className="eyebrow">{siteConfig.location}</span>
        </motion.div>

        <h1 className="display text-[clamp(3.2rem,10.5vw,9.5rem)]">
          <span className="block">{line1.map((w) => word(w))}</span>
          <span className="block">{line2.map((w, k) => word(w, k === 1))}</span>
          <span className="block">{line3.map((w) => word(w))}</span>
        </h1>

        <div className="mt-12 grid gap-10 md:grid-cols-12 md:items-end">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl text-[18px] leading-relaxed text-mute md:col-span-6 md:text-[19px]"
          >
            Je m&apos;appelle <span className="text-paper">Brice</span>. Je conçois et je développe des sites internet et des applications sur mesure
            pour les indépendants et les entreprises. Vous avez un seul interlocuteur, de la première discussion à la mise en ligne.
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3 sm:flex-row md:col-span-6 md:justify-end"
          >
            <ButtonLink href="/demarrer-un-projet" arrow>Démarrer un projet</ButtonLink>
            <ButtonLink href="/realisations" variant="ghost">Découvrir mes projets</ButtonLink>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
