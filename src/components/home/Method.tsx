import { method } from "@/content/method";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Method() {
  return (
    <section className="container-x mt-32 md:mt-44" aria-labelledby="methode">
      <SectionHeading
        eyebrow="Méthode"
        title={<span id="methode">Comment <em>ça se passe</em>.</span>}
        intro="Rien de compliqué, et vous savez toujours où on en est."
      />
      <ol className="relative grid gap-4 md:grid-cols-5">
        <div aria-hidden className="horizon absolute left-0 right-0 top-[34px] hidden md:block" />
        {method.map((m, i) => (
          <li key={m.step} className="relative"><Reveal delay={i * 0.08} className="h-full">
            <div className="relative mb-8 hidden size-[17px] translate-y-[26px] rounded-full border border-accent bg-canvas md:block" aria-hidden>
              <span className="absolute inset-1 rounded-full bg-accent" />
            </div>
            <div className="card h-full p-6 md:mt-6">
              <p className="font-mono text-[12px] text-accent">{m.step}</p>
              <h3 className="mt-4 text-[19px] font-medium">{m.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-mute">{m.text}</p>
              <p className="eyebrow mt-6">{m.duration}</p>
            </div>
          </Reveal></li>
        ))}
      </ol>
    </section>
  );
}
