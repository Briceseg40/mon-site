import { faq } from "@/content/faq";

export function Faq() {
  return (
    <div className="divide-y divide-line border-y border-line">
      {faq.map((f) => (
        <details key={f.q} className="group py-6 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[18px] font-medium">
            {f.q}
            <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line-strong transition-transform duration-300 group-open:rotate-45" aria-hidden>+</span>
          </summary>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-mute">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
