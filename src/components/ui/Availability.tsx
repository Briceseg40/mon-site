import { siteConfig } from "@/config/site";

export function Availability({ className = "" }: { className?: string }) {
  if (!siteConfig.availability.available) return null;
  return (
    <span className={`inline-flex items-center gap-2.5 text-[13px] text-mute ${className}`}>
      <span className="pulse-dot size-1.5 rounded-full bg-foam" aria-hidden />
      {siteConfig.availability.label}
    </span>
  );
}
