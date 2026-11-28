import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

export function PageHeader({ eyebrow, title, intro, children }: { eyebrow: string; title: ReactNode; intro?: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden pb-16 pt-40 md:pb-24 md:pt-48">
      <div className="container-x relative">
        <Reveal>
          <p className="eyebrow mb-8">{eyebrow}</p>
          <h1 className="display max-w-5xl text-[clamp(3rem,8.5vw,7.5rem)]">{title}</h1>
          {intro && <p className="mt-8 max-w-2xl text-[18px] leading-relaxed text-mute md:text-[19px]">{intro}</p>}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
