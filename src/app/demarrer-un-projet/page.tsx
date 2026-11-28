import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectForm } from "@/components/form/ProjectForm";

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
        intro="Cinq petites étapes, et la plupart des champs sont facultatifs. Je lis chaque demande moi-même."
      />
      <div className="container-x">
        <ProjectForm />
      </div>
    </>
  );
}
