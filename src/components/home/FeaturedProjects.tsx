import { featuredProjects } from "@/content/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { NextProjectCard } from "@/components/projects/NextProjectCard";

export function FeaturedProjects() {
  const list = featuredProjects();
  return (
    <section className="container-x mt-32 md:mt-44" aria-labelledby="realisations">
      <SectionHeading
        eyebrow="Réalisations"
        title={<span id="realisations">Ce que j&apos;ai <em>déjà fait</em>.</span>}
        intro="Deux vrais projets dont je suis assez fier, le site d'une asso landaise et un agenda monté avec ma promo. Et deux démos, pour montrer ce que je ferais pour un plombier ou une école de surf."
        aside={<ButtonLink href="/realisations" variant="ghost" arrow>Voir le détail</ButtonLink>}
      />
      <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
        {list.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 0.08} className="">
            <ProjectCard project={p} index={i} />
          </Reveal>
        ))}
        {list.length % 2 === 1 && (
          <Reveal delay={0.08}>
            <NextProjectCard />
          </Reveal>
        )}
      </div>
    </section>
  );
}
