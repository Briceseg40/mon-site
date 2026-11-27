import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectForm } from "@/components/form/ProjectForm";
import { Availability } from "@/components/ui/Availability";

export const metadata: Metadata = {
  title: "Démarrer un projet",
  description: "Décrivez votre projet de site ou d'application en quelques minutes. Réponse personnelle et devis gratuit.",
  alternates: { canonical: "/demarrer-un-projet" },
};

export default function StartProjectPage() {
  return (
    <>
      <PageHeader
        eyebrow="Démarrer un projet"
        title={<>Parlez-moi de <em>votre projet</em>.</>}
        intro="Cinq étapes courtes, la plupart des champs sont facultatifs. Je vous réponds personnellement, sans engagement."
      >
        <Availability className="mt-8" />
      </PageHeader>
      <div className="container-x">
        <ProjectForm />
      </div>
    </>
  );
}
