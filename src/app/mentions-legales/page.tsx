import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { PageHeader } from "@/components/layout/PageHeader";
import { Prose } from "@/components/layout/Prose";

export const metadata: Metadata = { title: "Mentions légales", alternates: { canonical: "/mentions-legales" } };

export default function LegalPage() {
  const { person, legal } = siteConfig;
  return (
    <>
      <PageHeader eyebrow="Informations" title="Mentions légales" />
      <Prose>
        <h2>Éditeur du site</h2>
        <p>
          <strong>{person.firstName} {person.lastName}</strong><br />
          {legal.status}<br />
          SIRET {legal.siret}<br />
          {legal.address}<br />
          {siteConfig.email ? <>Contact <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></> : <>Contact via le <Link href="/demarrer-un-projet">formulaire de projet</Link></>}
        </p>
        <p>Directeur de la publication {person.firstName} {person.lastName}.</p>
        <h2>Hébergement</h2>
        <p>{legal.host}</p>
        <h2>Propriété intellectuelle</h2>
        <p>
          Les textes, visuels et le code de ce site sont la propriété de {person.firstName} {person.lastName}, sauf mention contraire. Les visuels des
          réalisations restent la propriété de leurs clients respectifs et sont présentés avec leur accord.
        </p>
        <h2>Données personnelles</h2>
        <p>Le traitement des données envoyées via le formulaire est décrit dans la <Link href="/confidentialite">politique de confidentialité</Link>.</p>
      </Prose>
    </>
  );
}
