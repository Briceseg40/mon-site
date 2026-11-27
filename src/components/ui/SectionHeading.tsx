import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  index,
  eyebrow,
  title,
  intro,
  aside,
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="mb-14 grid gap-8 md:mb-20 md:grid-cols-12 md:items-end">
      <Reveal className="md:col-span-8">
        <p className="eyebrow mb-6 flex items-center gap-3">
          {index && <span className="text-accent">{index}</span>}
          <span className="h-px w-8 bg-line-strong" aria-hidden />
          {eyebrow}
        </p>
        <h2 className="display text-[clamp(2.6rem,6vw,4.75rem)]">{title}</h2>
        {intro && <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-mute">{intro}</p>}
      </Reveal>
      {aside && <Reveal delay={0.1} className="md:col-span-4 md:justify-self-end">{aside}</Reveal>}
    </div>
  );
}
