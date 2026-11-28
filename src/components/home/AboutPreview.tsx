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
          <p className="eyebrow mb-6">À propos</p>
          <h2 id="a-propos" className="display text-[clamp(2.6rem,5.5vw,4.5rem)]">
            Pas d&apos;agence, <em>juste moi</em>.
          </h2>
          <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-mute">
            <p>
              J&apos;ai {person.age} ans et je suis en {person.studies} à l&apos;{person.school}. Ce que j&apos;aime, c&apos;est voir un truc
              que j&apos;ai codé servir à de vraies personnes.
            </p>
            <p>
              Si vous m&apos;écrivez, c&apos;est moi qui réponds. Les maquettes et le code, c&apos;est moi aussi, donc rien ne se perd en route.
            </p>
          </div>
          <div className="mt-10">
            <ButtonLink href="/a-propos" variant="ghost" arrow>Qui je suis</ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
