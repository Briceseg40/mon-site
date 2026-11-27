/**
 * Identité du site. Tout ce qui touche à la marque se change ici.
 * Le nom commercial n'est pas encore choisi : modifier `brand` suffit,
 * le logo texte, les métadonnées et les e-mails suivent.
 * Les couleurs se changent dans `src/app/globals.css` (bloc @theme).
 */
export const siteConfig = {
  brand: {
    name: "Brice Seguret",
    /** Monogramme affiché dans le logo. */
    mark: "bs",
    /** Signature de marque, affichée sous le nom (logo, hero, footer, métadonnées). */
    tagline: "Built to move",
    /** Description courte de l'activité. */
    activity: "Sites et applications sur mesure",
  },
  person: {
    firstName: "Brice",
    lastName: "Seguret",
    age: 25,
    studies: "3e année de BUT Informatique",
    school: "IUT de Bayonne",
  },
  location: "Anglet, Pays basque",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  /** Liens sociaux. Laisser vide pour masquer. */
  socials: {
    github: "",
    linkedin: "",
    malt: "",
  },
  /** Statut affiché dans la navigation et le hero. Mettre `available: false` pour le masquer. */
  availability: { available: true, label: "Disponible pour de nouveaux projets" },
  /** Mentions légales. À compléter avant la mise en ligne. */
  legal: {
    status: "[À compléter] Entrepreneur individuel (micro-entreprise)",
    siret: "[À compléter]",
    address: "[À compléter]",
    host: "[À compléter] Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
  },
} as const;

export const nav = [
  { href: "/realisations", label: "Réalisations" },
  { href: "/services", label: "Services" },
  { href: "/a-propos", label: "À propos" },
] as const;

export const projectCta = { href: "/demarrer-un-projet", label: "Démarrer un projet" } as const;
