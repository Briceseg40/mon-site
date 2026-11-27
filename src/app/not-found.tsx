import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80svh] flex-col items-start justify-center pt-28">
      <p className="eyebrow">Erreur 404</p>
      <h1 className="display mt-6 text-[clamp(3rem,9vw,8rem)]">Cette page <em>s&apos;est perdue</em>.</h1>
      <p className="mt-6 max-w-md text-[18px] text-mute">Le lien est peut-être ancien. Le reste du site, lui, est bien là.</p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/" arrow>Retour à l&apos;accueil</ButtonLink>
        <ButtonLink href="/demarrer-un-projet" variant="ghost">Démarrer un projet</ButtonLink>
      </div>
    </section>
  );
}
