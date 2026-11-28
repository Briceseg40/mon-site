import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "À propos",
  description: `Je m'appelle ${siteConfig.person.firstName}, j'ai ${siteConfig.person.age} ans et je fais des sites et des applications web depuis Anglet.`,
  alternates: { canonical: "/a-propos" },
};

export default function AboutPage() {
  const { person } = siteConfig;
  return (
    <>
      <PageHeader
        eyebrow="À propos"
        title={<>Salut, moi c&apos;est <em>{person.firstName}</em>.</>}
        intro={`J'ai ${person.age} ans, je travaille depuis Anglet et je finis mon BUT Informatique à Bayonne.`}
      />

      <section className="container-x grid gap-14 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <div className="md:sticky md:top-28"><PhotoSlot /></div>
        </Reveal>
        <Reveal delay={0.1} className="space-y-7 text-[18px] leading-relaxed text-fg/85 md:col-span-6 md:col-start-7">
          <p>
            Je suis en troisième année de BUT Informatique à l&apos;{person.school}. Le code, je l&apos;ai appris en cours, mais aussi sur
            OpenClassrooms et en me cassant les dents sur des sites WordPress et Shopify.
          </p>
          <p>
            En 2023, j&apos;ai fait le site d&apos;ODO40, une association des Landes qui protégeait les libellules. L&apos;asso a fermé depuis. J&apos;ai
            quand même repris le site en 2026, pour voir ce que je ferais autrement aujourd&apos;hui. Pas mal de choses, en fait.
          </p>
          <p>
            À l&apos;IUT, on a monté AgendSup à plusieurs, un agenda partagé pour la promo. J&apos;y ai surtout fait le design et une bonne partie du
            front, la mascotte comprise.
          </p>
          <p className="text-fg">
            Je n&apos;ai ni commerciaux ni bureaux à payer. Vous me parlez directement, et si une idée ne me paraît pas bonne, je vous le dis.
          </p>
          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
            <ButtonLink href="/demarrer-un-projet" arrow>Me parler de votre projet</ButtonLink>
            <ButtonLink href="/realisations" variant="ghost">Voir mes projets</ButtonLink>
          </div>
        </Reveal>
      </section>

      <CtaBanner title={<>On en <em>parle</em> ?</>} />
    </>
  );
}
