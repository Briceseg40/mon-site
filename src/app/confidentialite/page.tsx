import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { PageHeader } from "@/components/layout/PageHeader";
import { Prose } from "@/components/layout/Prose";

export const metadata: Metadata = { title: "Politique de confidentialité", alternates: { canonical: "/confidentialite" } };

export default function PrivacyPage() {
  const { person } = siteConfig;
  const contact = siteConfig.email ? <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> : "l'adresse indiquée dans les mentions légales";
  return (
    <>
      <PageHeader eyebrow="Informations" title="Politique de confidentialité" intro="Ce que je fais de vos données, en clair." />
      <Prose>
        <h2>Responsable du traitement</h2>
        <p>{person.firstName} {person.lastName}, joignable à {contact}.</p>

        <h2>Données collectées</h2>
        <p>
          Quand vous envoyez une demande de projet, je reçois les informations que vous saisissez dans le formulaire. Votre nom, votre adresse e-mail
          et la description du projet sont obligatoires. Le téléphone, l&apos;entreprise, le secteur, le site existant, le budget et le délai sont facultatifs.
          J&apos;enregistre aussi la date de votre consentement et le type de navigateur utilisé, pour la sécurité.
        </p>

        <h2>Pourquoi</h2>
        <p>
          Uniquement pour répondre à votre demande, vous envoyer un devis et échanger sur votre projet. La base légale est votre consentement et les
          mesures précontractuelles prises à votre demande. Vos données ne sont jamais vendues ni utilisées pour de la publicité.
        </p>

        <h2>Où elles sont stockées</h2>
        <ul>
          <li>Base de données Supabase, hébergée dans l&apos;Union européenne, avec accès réservé.</li>
          <li>Service d&apos;envoi d&apos;e-mails Resend, pour l&apos;accusé de réception et ma notification.</li>
        </ul>
        <p>
          Pendant que vous remplissez le formulaire, vos réponses sont gardées dans votre propre navigateur pour ne rien perdre entre deux étapes.
          Elles sont effacées dès l&apos;envoi. Ce site n&apos;utilise ni cookie publicitaire ni outil de suivi.
        </p>

        <h2>Durée de conservation</h2>
        <p>Trois ans après notre dernier échange si aucun projet n&apos;est signé. En cas de collaboration, la durée légale de conservation des documents commerciaux s&apos;applique.</p>

        <h2>Vos droits</h2>
        <p>
          Vous pouvez à tout moment demander à consulter, corriger ou supprimer vos données, ou vous opposer à leur traitement, en écrivant à {contact}.
          Vous pouvez aussi saisir la CNIL (cnil.fr) si vous estimez que vos droits ne sont pas respectés.
        </p>
      </Prose>
    </>
  );
}
