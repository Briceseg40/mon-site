import type { Metadata } from "next";
import { services } from "@/content/services";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Faq } from "@/components/ui/Faq";

export const metadata: Metadata = {
  title: "Services",
  description: "Sites vitrines, refontes, applications web et maquettes. Je travaille depuis Anglet, et à distance.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={<>Ce que <em>je sais faire</em>.</>}
        intro="Je peux m'occuper de tout le projet ou juste d'un morceau. Dites-moi ce qui vous manque."
      />

      <section className="container-x space-y-6">
        {services.map((s) => (
          <Reveal key={s.id}>
            <article id={s.id} className="card scroll-mt-28 grid gap-10 p-8 transition-colors duration-300 hover:border-line-strong md:grid-cols-12 md:p-12">
              <div className="md:col-span-5">
                <h2 className="display text-[clamp(2.2rem,4vw,3.4rem)]">{s.title}</h2>
                <p className="mt-4 text-[17px] text-fg/80">{s.short}</p>
              </div>
              <div className="md:col-span-6 md:col-start-7">
                <p className="text-[17px] leading-relaxed text-mute">{s.benefit}</p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {s.details.map((d) => (
                    <li key={d} className="flex gap-3 text-[15px]">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                      {d}
                    </li>
                  ))}
                </ul>
                <div className="mt-10">
                  <ButtonLink href={`/demarrer-un-projet?type=${s.formType}`} variant="ghost" arrow>Me parler de votre projet</ButtonLink>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      <section className="container-x mt-32">
        <SectionHeading eyebrow="Questions fréquentes" title={<>Avant de <em>m&apos;écrire</em>.</>} />
        <Faq />
      </section>

      <CtaBanner />
    </>
  );
}
