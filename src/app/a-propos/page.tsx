import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "À propos",
  description: `${siteConfig.person.firstName} ${siteConfig.person.lastName}, ${siteConfig.person.age} ans, concepteur et développeur de sites et d'applications à Anglet.`,
  alternates: { canonical: "/a-propos" },
};

const values = [
  { title: "Contact direct", text: "Vous parlez à la personne qui fait le travail. Pas de chef de projet entre nous." },
  { title: "Sur mesure", text: "Chaque projet part de votre activité, pas d'un modèle tout prêt." },
  { title: "Transparence", text: "Un devis clair, un planning tenu, et je vous dis quand une idée n'est pas la bonne." },
  { title: "Suivi", text: "Je reste joignable après la mise en ligne, le projet continue de vivre." },
];

export default function AboutPage() {
  const { person } = siteConfig;
  return (
    <>
      <PageHeader
        eyebrow="À propos"
        title={<>Bonjour, moi c&apos;est <em>{person.firstName}</em>.</>}
        intro={`${person.age} ans, ${person.studies} à l'${person.school}, et une vraie envie de construire des outils qui servent.`}
      />

      <section className="container-x grid gap-14 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <div className="md:sticky md:top-28"><PhotoSlot /></div>
        </Reveal>
        <Reveal delay={0.1} className="space-y-7 text-[18px] leading-relaxed text-fg/85 md:col-span-6 md:col-start-7">
          <p>
            J&apos;ai {person.age} ans et je suis en troisième année de BUT Informatique à l&apos;{person.school}. Ce qui me fait avancer, c&apos;est de
            fabriquer des choses qui servent vraiment à quelqu&apos;un.
          </p>
          <p>
            Une idée encore floue, quelques notes dans un carnet, un besoin qu&apos;on n&apos;arrive pas à formuler. C&apos;est souvent comme ça que
            commence un projet, et c&apos;est là que je suis le plus utile. Je pose beaucoup de questions. Ensuite je dessine, et on avance ensemble jusqu&apos;à
            un produit concret que vous pouvez montrer et utiliser.
          </p>
          <p>
            Je ne vends pas de solution toute faite. Un artisan n&apos;a pas les mêmes besoins qu&apos;une start-up, et un site qui marche pour l&apos;un peut
            ne servir à rien pour l&apos;autre. Je préfère comprendre votre métier avant de proposer quoi que ce soit.
          </p>
          <p className="text-fg">
            Travailler avec moi, c&apos;est avoir un seul interlocuteur qui connaît votre projet par cœur. Je n&apos;ai pas d&apos;équipe commerciale à
            rentabiliser. J&apos;ai juste envie que votre projet marche et que vous en parliez autour de vous.
          </p>
          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
            <ButtonLink href="/demarrer-un-projet" arrow>Démarrer un projet</ButtonLink>
            <ButtonLink href="/realisations" variant="ghost">Voir mes réalisations</ButtonLink>
          </div>
        </Reveal>
      </section>

      <section className="container-x mt-32 md:mt-44">
        <SectionHeading eyebrow="Ma façon de travailler" title={<>Ce sur quoi <em>je ne transige pas</em>.</>} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06} className="card p-7">
              <p className="font-mono text-[12px] text-accent">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-8 text-[19px] font-medium">{v.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-mute">{v.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBanner title={<>On travaille <em>ensemble</em> ?</>} />
    </>
  );
}
