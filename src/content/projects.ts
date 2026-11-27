/**
 * Réalisations affichées sur le site.
 *
 * Ajouter un projet = ajouter un objet dans `projects`.
 * - Les images vont dans `public/projects/<slug>/` (cover.jpg, 01.jpg, 02.jpg…).
 * - `featured: true` le fait apparaître sur la page d'accueil.
 * - `placeholder: true` affiche le badge « Emplacement de démonstration ».
 *   Supprimer les emplacements dès que de vrais projets sont renseignés.
 */

export const categories = [
  { id: "site", label: "Sites internet" },
  { id: "web-app", label: "Applications web" },
  { id: "perso", label: "Projets personnels" },
  { id: "lab", label: "Expérimentations" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

export type Project = {
  slug: string;
  name: string;
  category: CategoryId;
  /** Une phrase, affichée sur la carte. */
  summary: string;
  /** Paragraphes de la page projet. */
  description: string[];
  /** Chemin d'image dans /public, ex. "/projects/mon-projet/cover.jpg". Vide = visuel généré. */
  cover?: string;
  screenshots?: { src: string; alt: string }[];
  stack: string[];
  url?: string;
  repo?: string;
  year?: string;
  role?: string;
  featured?: boolean;
  placeholder?: boolean;
  /** Teinte (0-360) du visuel généré quand il n'y a pas d'image. */
  hue?: number;
};

export const projects: Project[] = [
  {
    slug: "agendsup",
    name: "AgendSup",
    category: "web-app",
    summary: "L'agenda partagé d'une promo, avec un rôle pour chacun.",
    description: [
      "Une application web pour que les délégués publient les devoirs, que les étudiants les consultent et que ceux qui maîtrisent une matière proposent des séances de révision.",
      "Chaque compte a un rôle et des droits différents (étudiant, délégué, ressource). On rejoint sa classe virtuelle avec un code, on retrouve les devoirs dans un agenda, on planifie des révisions et on échange par messagerie.",
      "C'est un projet mené à plusieurs à l'IUT de Bayonne. Je me suis occupé de l'identité visuelle de toutes les pages, de la mascotte AgendBoy, de la navigation et d'une bonne partie des écrans, dont la modale profil, la récupération de mot de passe et l'accès aux classes par code.",
    ],
    cover: "/projects/agendsup/04c-agenda-detail-devoir.webp",
    screenshots: [
      { src: "/projects/agendsup/04-agenda-semaine.webp", alt: "La semaine d'une classe dans l'agenda, avec les devoirs placés par créneau" },
      { src: "/projects/agendsup/03-accueil-connecte.webp", alt: "L'accueil une fois connecté, avec la mascotte AgendBoy" },
      { src: "/projects/agendsup/05-liste-devoirs.webp", alt: "La liste des devoirs vue par un délégué" },
      { src: "/projects/agendsup/06-creer-devoir.webp", alt: "Le formulaire de création d'un devoir" },
      { src: "/projects/agendsup/07-profil-mascotte.webp", alt: "La modale profil et le choix de la mascotte" },
      { src: "/projects/agendsup/08-creer-classe-mascottes.webp", alt: "La création d'une classe virtuelle" },
    ],
    stack: ["PHP", "Twig", "MySQL", "Bootstrap", "FullCalendar", "Composer"],
    year: "2025-2026",
    role: "Design et développement front, projet d'équipe",
    featured: true,
    hue: 18,
  },
  {
    slug: "odo40",
    name: "ODO40",
    category: "site",
    summary: "Le site d'une association landaise qui protégeait les libellules.",
    description: [
      "ODO40, ou ODO des Landes, était une association de protection des libellules et des demoiselles. Je lui ai livré son site en 2023. L'association a depuis fermé ses portes, et je le montre ici avec l'accord de sa fondatrice.",
      "En 2026 je l'ai entièrement repensé. L'accueil s'ouvre maintenant sur une scène d'étang dessinée en SVG. Plus loin, on apprend à reconnaître une libellule d'une demoiselle en parcourant huit fiches espèces qu'on filtre en un clic.",
      "Il y a aussi une page pour passer à l'action et un formulaire d'observation, laissé en démonstration puisque plus personne ne reçoit les signalements. Toutes les illustrations ont été dessinées pour le site.",
    ],
    cover: "/projects/odo40/accueil.webp",
    screenshots: [
      { src: "/projects/odo40/especes.webp", alt: "Les fiches espèces, avec leur période de vol" },
      { src: "/projects/odo40/libellules.webp", alt: "La page qui explique la différence entre libellule et demoiselle" },
      { src: "/projects/odo40/fiche.webp", alt: "La fiche de l'Anax empereur" },
      { src: "/projects/odo40/agir.webp", alt: "La page Agir, avec les conseils pour créer une mare" },
      { src: "/projects/odo40/signaler.webp", alt: "Le formulaire d'observation, laissé en démonstration" },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Zod"],
    url: "https://odo-40.vercel.app/",
    year: "2023, repensé en 2026",
    role: "Conception et développement",
    featured: true,
    hue: 150,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const featuredProjects = () => projects.filter((p) => p.featured).slice(0, 3);
export const categoryLabel = (id: CategoryId) => categories.find((c) => c.id === id)?.label ?? id;
