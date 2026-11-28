"use client";

import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { categoryLabel, type Project } from "@/content/projects";
import { ProjectVisual } from "./ProjectVisual";
import { PlaceholderBadge } from "./PlaceholderBadge";

/** Carte projet avec légère inclinaison 3D et reflet qui suit la souris. */
export function ProjectCard({ project, index, large = false }: { project: Project; index?: number; large?: boolean }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [3, -3]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-3, 3]), { stiffness: 200, damping: 20 });
  const gx = useTransform(mx, (v) => `${v * 100}%`);
  const gy = useTransform(my, (v) => `${v * 100}%`);
  const shine = useMotionTemplate`radial-gradient(400px circle at ${gx} ${gy}, rgb(255 255 255 / 0.35), transparent 50%)`;

  return (
    <motion.article
      style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => { mx.set(0.5); my.set(0.5); }}
      className="group relative"
    >
      <Link href={`/realisations/${project.slug}`} className="block rounded-[var(--radius-card)] focus-visible:outline-offset-4">
        <div className={`relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-[0_20px_50px_-24px_rgb(14_14_16/0.25)] transition-shadow duration-500 group-hover:shadow-[0_30px_70px_-24px_rgb(14_14_16/0.35)] ${large ? "aspect-[16/11]" : "aspect-[4/3]"}`}>
          <ProjectVisual project={project} />
          <motion.div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: shine }} />
          {project.placeholder && <PlaceholderBadge className="absolute left-4 top-4" />}
          {project.demo && <PlaceholderBadge className="absolute bottom-4 left-4" label="Démo, entreprise fictive" />}
          <span className="absolute bottom-4 right-4 grid size-11 translate-y-2 place-items-center rounded-full bg-fg text-canvas opacity-0 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:opacity-100" aria-hidden>
            <svg viewBox="0 0 16 16" className="size-4"><path d="M5 11 11 5M6 5h5v5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
        </div>
        <div className="mt-5 flex items-start justify-between gap-6">
          <div>
            <h3 className="text-[19px] font-medium tracking-[-0.01em] transition-colors group-hover:text-accent">{project.name}</h3>
            <p className="mt-1.5 max-w-md text-[15px] leading-relaxed text-mute">{project.summary}</p>
          </div>
          <div className="shrink-0 text-right">
            {index !== undefined && <p className="font-mono text-[11px] text-mute">{String(index + 1).padStart(2, "0")}</p>}
            <p className="eyebrow mt-1">{categoryLabel(project.category)}</p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
