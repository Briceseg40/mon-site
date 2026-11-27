"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { categories, type CategoryId, type Project } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";
import { NextProjectCard } from "./NextProjectCard";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<CategoryId | "all">("all");
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: projects.length };
    projects.forEach((p) => (c[p.category] = (c[p.category] ?? 0) + 1));
    return c;
  }, [projects]);
  const list = active === "all" ? projects : projects.filter((p) => p.category === active);
  const filters = [{ id: "all" as const, label: "Tout" }, ...categories.filter((c) => counts[c.id])];

  return (
    <>
      {filters.length > 2 && (<div role="group" aria-label="Filtrer par catégorie" className="mb-14 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={active === f.id}
            onClick={() => setActive(f.id)}
            className={`relative rounded-full border px-4 py-2 text-[14px] transition-colors duration-200 ${
              active === f.id ? "border-paper text-ink" : "border-line-strong text-mute hover:text-paper"
            }`}
          >
            {active === f.id && <motion.span layoutId="filter-pill" className="absolute inset-0 -z-10 rounded-full bg-paper" transition={{ type: "spring", bounce: 0.15, duration: 0.45 }} />}
            {f.label}
            <span className="ml-2 font-mono text-[11px] opacity-60">{counts[f.id]}</span>
          </button>
        ))}
      </div>)}
      <motion.div layout className="grid gap-x-8 gap-y-16 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.div key={p.slug} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
              <ProjectCard project={p} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
        {list.length % 2 === 1 && (
          <motion.div layout key="next-project">
            <NextProjectCard />
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
