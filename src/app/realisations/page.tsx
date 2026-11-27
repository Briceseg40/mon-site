import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { CtaBanner } from "@/components/layout/CtaBanner";

export const metadata: Metadata = {
  title: "Réalisations",
  description: "Sites internet, applications web conçus et développés par Brice Seguret.",
  alternates: { canonical: "/realisations" },
};

export default function RealisationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Réalisations"
        title={<>Ce que j&apos;ai <em>construit</em>.</>}
        intro="Chaque projet raconte le besoin de départ, ce que j'ai fait et les outils utilisés. La liste s'allonge au fil des collaborations."
      />
      <section className="container-x">
        <ProjectGrid projects={projects} />
      </section>
      <CtaBanner title={<>Votre projet pourrait être <em>le prochain</em>.</>} />
    </>
  );
}
