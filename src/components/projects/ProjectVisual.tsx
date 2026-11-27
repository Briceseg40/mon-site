import Image from "next/image";
import type { Project } from "@/content/projects";

/** Image de couverture, ou visuel génératif sobre quand aucune image n'est fournie. */
export function ProjectVisual({ project, priority = false, sizes }: { project: Project; priority?: boolean; sizes?: string }) {
  if (project.cover) {
    return (
      <Image
        src={project.cover}
        alt={`Aperçu du projet ${project.name}`}
        fill
        priority={priority}
        sizes={sizes ?? "(min-width: 1024px) 50vw, 100vw"}
        className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
      />
    );
  }
  const h = project.hue ?? 18;
  return (
    <div
      aria-hidden
      className="absolute inset-0 transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
      style={{
        background: `radial-gradient(70% 90% at 80% 110%, hsl(${h} 90% 58% / 0.55), transparent 60%), radial-gradient(50% 60% at 10% 0%, hsl(${(h + 40) % 360} 70% 60% / 0.18), transparent 70%), #141416`,
      }}
    >
      {/* Fenêtre de navigateur stylisée */}
      <div className="absolute inset-x-[12%] bottom-0 top-[18%] rounded-t-2xl border border-white/10 bg-black/40 shadow-2xl backdrop-blur-sm">
        <div className="flex gap-1.5 border-b border-white/10 px-4 py-3">
          <span className="size-2 rounded-full bg-white/20" />
          <span className="size-2 rounded-full bg-white/20" />
          <span className="size-2 rounded-full bg-white/20" />
        </div>
        <div className="space-y-3 p-6">
          <div className="h-3 w-2/5 rounded-full bg-white/25" />
          <div className="h-3 w-3/5 rounded-full bg-white/10" />
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="aspect-[4/3] rounded-lg bg-white/[0.07]" />
            <div className="aspect-[4/3] rounded-lg bg-white/[0.07]" />
            <div className="aspect-[4/3] rounded-lg bg-white/[0.07]" />
          </div>
        </div>
      </div>
    </div>
  );
}
