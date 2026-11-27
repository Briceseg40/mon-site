import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PhotoSlot } from "@/components/ui/PhotoSlot";

export function AboutPreview() {
  const { person } = siteConfig;
  return (
    <section className="container-x mt-32 md:mt-44" aria-labelledby="a-propos">
      <div className="grid gap-12 md:grid-cols-12 md:items-center">
        <Reveal className="md:col-span-5">
          <PhotoSlot />
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
          <p className="eyebrow mb-6 flex items-center gap-3">
            <span className="text-accent">04</span>
            <span className="h-px w-8 bg-line-strong" aria-hidden />À propos
          </p>
          <h2 id="a-propos" className="display text-[clamp(2.6rem,5.5vw,4.5rem)]">
            Un interlocuteur, <em>pas un standard</em>.
          </h2>
          <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-mute">
            <p>
              J&apos;ai {person.age} ans et je suis en {person.studies} à l&apos;{person.school}. Ce qui me plaît, c&apos;est le moment où une idée
              griffonnée sur un coin de table devient un outil que des gens utilisent vraiment.
            </p>
            <p>
              Quand vous travaillez avec moi, c&apos;est moi qui réponds, moi qui conçois et moi qui code. Pas d&apos;intermédiaire, pas de ticket perdu
              entre deux services.
            </p>
          </div>
          <div className="mt-10">
            <ButtonLink href="/a-propos" variant="ghost" arrow>En savoir plus sur moi</ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
