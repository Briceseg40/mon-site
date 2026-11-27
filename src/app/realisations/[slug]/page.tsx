import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categoryLabel, getProject, projects } from "@/content/projects";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { PlaceholderBadge } from "@/components/projects/PlaceholderBadge";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBanner } from "@/components/layout/CtaBanner";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.summary,
    alternates: { canonical: `/realisations/${p.slug}` },
    robots: p.placeholder ? { index: false, follow: true } : undefined,
    openGraph: p.cover ? { images: [p.cover] } : undefined,
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  const facts = [
    ["Catégorie", categoryLabel(project.category)],
    project.year && ["Année", project.year],
    project.role && ["Mon rôle", project.role],
  ].filter(Boolean) as [string, string][];

  return (
    <>
      <section className="container-x pt-36 md:pt-44">
        <Reveal>
          <Link href="/realisations" className="eyebrow inline-flex items-center gap-2 transition-colors hover:text-paper">
            <span aria-hidden>←</span> Toutes les réalisations
          </Link>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <span className="eyebrow">{categoryLabel(project.category)}</span>
            {project.placeholder && <PlaceholderBadge />}
          </div>
          <h1 className="display mt-6 max-w-5xl text-[clamp(3rem,8vw,7rem)]">{project.name}</h1>
          <p className="mt-6 max-w-2xl text-[19px] leading-relaxed text-mute">{project.summary}</p>
        </Reveal>

        <Reveal delay={0.1} className="group relative mt-14 aspect-[16/9] overflow-hidden rounded-[2rem] border border-line">
          <ProjectVisual project={project} priority sizes="100vw" />
        </Reveal>

        <div className="mt-20 grid gap-14 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <dl className="space-y-6 border-t border-line pt-6">
              {facts.map(([k, v]) => (
                <div key={k}><dt className="eyebrow">{k}</dt><dd className="mt-1.5 text-[16px]">{v}</dd></div>
              ))}
              <div>
                <dt className="eyebrow">Technologies</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((t) => (
                    <span key={t} className="rounded-full border border-line-strong px-3 py-1 text-[13px]">{t}</span>
                  ))}
                </dd>
              </div>
            </dl>
            <div className="mt-10 flex flex-col gap-3">
              {project.url && <ButtonLink href={project.url} target="_blank" rel="noopener noreferrer" arrow>Voir le projet en ligne</ButtonLink>}
              {project.repo && <ButtonLink href={project.repo} target="_blank" rel="noopener noreferrer" variant="ghost">Voir le code</ButtonLink>}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="space-y-6 text-[18px] leading-relaxed text-paper/85 md:col-span-7 md:col-start-6">
            {project.description.map((d, i) => <p key={i}>{d}</p>)}
          </Reveal>
        </div>

        {project.screenshots && project.screenshots.length > 0 && (
          <div className="mt-24 grid gap-6 md:grid-cols-2">
            {project.screenshots.map((s, i) => (
              <Reveal key={s.src} delay={(i % 2) * 0.08} className={`relative overflow-hidden rounded-[var(--radius-card)] border border-line ${i % 3 === 0 ? "aspect-[16/9] md:col-span-2" : "aspect-[4/3]"}`}>
                <Image src={s.src} alt={s.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </Reveal>
            ))}
          </div>
        )}

        {next && next.slug !== project.slug && (
          <Link href={`/realisations/${next.slug}`} className="group mt-32 block border-y border-line py-12">
            <p className="eyebrow">Projet suivant</p>
            <p className="display mt-4 text-[clamp(2.2rem,5vw,4rem)] transition-colors group-hover:text-accent">{next.name} <span aria-hidden>→</span></p>
          </Link>
        )}
      </section>
      <CtaBanner title={<>Un projet <em>dans ce genre</em> ?</>} />
    </>
  );
}
