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
      className="absolute inset-0 transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
      style={{
        background: `radial-gradient(60% 80% at 85% 100%, hsl(${h} 95% 70% / 0.55), transparent 65%), radial-gradient(50% 70% at 10% 0%, hsl(${(h + 240) % 360} 80% 80% / 0.45), transparent 70%), #f1efe9`,
      }}
    >
      {/* Fenêtre de navigateur stylisée */}
      <div className="absolute inset-x-[10%] bottom-0 top-[16%] rounded-t-2xl border border-white/80 bg-white/75 shadow-[0_30px_60px_-20px_rgb(14_14_16/0.35)] backdrop-blur-md">
        <div className="flex items-center gap-1.5 border-b border-black/5 px-4 py-3">
          <span className="size-2 rounded-full bg-[#ff5f57]" />
          <span className="size-2 rounded-full bg-[#febc2e]" />
          <span className="size-2 rounded-full bg-[#28c840]" />
          <span className="ml-4 h-2 w-1/3 rounded-full bg-black/5" />
        </div>
        <div className="space-y-3 p-6">
          <div className="h-3 w-2/5 rounded-full bg-black/80" />
          <div className="h-3 w-3/5 rounded-full bg-black/10" />
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="aspect-[4/3] rounded-lg" style={{ background: `hsl(${h} 90% 62% / 0.85)` }} />
            <div className="aspect-[4/3] rounded-lg bg-black/[0.05]" />
            <div className="aspect-[4/3] rounded-lg bg-black/[0.05]" />
          </div>
        </div>
      </div>
    </div>
  );
}
