import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { ThankYou } from "@/components/form/ThankYou";

export const metadata: Metadata = { title: "Merci", robots: { index: false, follow: false } };

export default function MerciPage() {
  return (
    <section className="relative flex min-h-[90svh] items-center overflow-hidden pt-28">
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(60%_70%_at_50%_100%,rgb(255_106_61/0.25),transparent_70%)]" />
      <div aria-hidden className="horizon absolute inset-x-0 bottom-[12%]" />
      <div className="container-x relative text-center">
        <ThankYou />
        <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/realisations" arrow>Voir les réalisations</ButtonLink>
          <ButtonLink href="/" variant="ghost">Retour à l&apos;accueil</ButtonLink>
        </div>
      </div>
    </section>
  );
}
