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
        index="01"
        eyebrow="Réalisations"
        title={<span id="realisations">Des projets <em>concrets</em>, pas des promesses.</span>}
        intro="Chaque projet part d'un besoin réel. Voici ce que j'ai construit."
        aside={<ButtonLink href="/realisations" variant="ghost" arrow>Tous les projets</ButtonLink>}
      />
      <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
        {list.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 0.08} className={i === 0 && list.length % 2 === 0 ? "md:col-span-2" : ""}>
            <ProjectCard project={p} index={i} large={i === 0 && list.length % 2 === 0} />
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
