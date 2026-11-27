import Link from "next/link";
import { benefits, services } from "@/content/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Arrow } from "@/components/ui/Button";

export function ServicesPreview() {
  return (
    <section className="container-x mt-32 md:mt-44" aria-labelledby="services">
      <SectionHeading
        index="02"
        eyebrow="Services"
        title={<span id="services">Ce que je peux <em>faire</em> pour vous.</span>}
        intro="Vous n'achetez pas du code. Vous avancez sur votre projet avec quelqu'un qui s'y implique autant que vous."
      />

      <ul className="divide-y divide-line border-y border-line">
        {services.map((s, i) => (
          <li key={s.id}>
            <Reveal delay={i * 0.03}>
              <Link href={`/services#${s.id}`} className="group grid items-center gap-2 py-7 transition-colors md:grid-cols-12 md:gap-8 md:py-9">
                <span className="font-mono text-[12px] text-mute md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-[clamp(1.9rem,3.6vw,2.9rem)] font-[450] leading-none tracking-[-0.04em] transition-[color,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2 group-hover:text-accent md:col-span-5">
                  {s.title}
                </h3>
                <p className="text-[16px] leading-relaxed text-mute md:col-span-5">{s.short}</p>
                <span className="hidden justify-self-end text-mute transition-colors group-hover:text-accent md:col-span-1 md:block"><Arrow /></span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>

      <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((b, i) => (
          <Reveal key={b.title} delay={i * 0.06} className="card p-7 transition-colors duration-300 hover:border-line-strong">
            <span className="mb-10 block size-2 rounded-full bg-accent" aria-hidden />
            <h3 className="text-[18px] font-medium">{b.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-mute">{b.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
