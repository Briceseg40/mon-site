import Image from "next/image";
import { siteConfig } from "@/config/site";

/**
 * Photo professionnelle de Brice.
 * Déposer le fichier dans public/brice.jpg puis renseigner PHOTO ci-dessous.
 */
const PHOTO: string | null = null; // ex. "/brice.jpg"

export function PhotoSlot({ className = "" }: { className?: string }) {
  return (
    <div className={`relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line bg-surface ${className}`}>
      {PHOTO ? (
        <Image src={PHOTO} alt={`Portrait de ${siteConfig.person.firstName} ${siteConfig.person.lastName}`} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(80%_60%_at_50%_100%,rgb(255_106_61/0.18),transparent_70%)]">
          <div className="text-center">
            <span className="block font-serif text-[7rem] italic leading-none text-fg/15">{siteConfig.brand.mark}</span>
            <p className="mt-4 inline-block rounded-full border border-dashed border-accent/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
              Emplacement photo
            </p>
          </div>
        </div>
      )}
      <div className="absolute inset-x-5 bottom-5 flex items-center justify-between rounded-2xl border border-line bg-canvas/70 px-5 py-4 backdrop-blur-md">
        <div>
          <p className="text-[15px] font-medium">{siteConfig.person.firstName} {siteConfig.person.lastName}</p>
          <p className="text-[13px] text-mute">Étudiant et développeur web</p>
        </div>
        <span className="eyebrow">{siteConfig.location.split(",")[0]}</span>
      </div>
    </div>
  );
}
