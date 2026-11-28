import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function CtaBanner({
  title = <>Vous avez <em>une idée</em> ?</>,
  text = "Expliquez-la-moi en quelques minutes avec le formulaire. Je lis tout moi-même et je vous réponds.",
}: {
  title?: React.ReactNode;
  text?: string;
}) {
  return (
    <section className="container-x mt-32" aria-labelledby="cta-title">
      <Reveal className="band-dark relative overflow-hidden rounded-[2rem] bg-canvas px-6 py-20 text-center sm:px-12 md:py-28">
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(60%_80%_at_50%_100%,rgb(255_106_61/0.3),transparent_70%)]" />
        <div aria-hidden className="horizon absolute inset-x-0 bottom-10" />
        <div className="relative">
          <h2 id="cta-title" className="display mx-auto max-w-3xl text-[clamp(2.6rem,7vw,5.5rem)]">{title}</h2>
          <p className="mx-auto mt-6 max-w-lg text-[17px] leading-relaxed text-mute">{text}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/demarrer-un-projet" arrow>Me parler de votre projet</ButtonLink>
            <ButtonLink href="/realisations" variant="ghost">Voir mes projets</ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
