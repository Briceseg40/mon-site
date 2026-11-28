import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { CtaBanner } from "@/components/layout/CtaBanner";

export const metadata: Metadata = {
  title: "Réalisations",
  description: "Les sites internet et applications web que j'ai conçus et développés.",
  alternates: { canonical: "/realisations" },
};

export default function RealisationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Réalisations"
        title={<>Ce que j&apos;ai <em>construit</em>.</>}
        intro="Pour chaque projet, je raconte d'où on est partis et ce que j'ai fait moi. La liste est courte pour l'instant, elle va grandir."
      />
      <section className="container-x">
        <ProjectGrid projects={projects} />
      </section>
      <CtaBanner title={<>Et votre projet, <em>il ressemble à quoi</em> ?</>} />
    </>
  );
}
