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
    stack: ["PHP", "Twig", "MySQL", "Bootstrap", "FullCalendar", "Composer"],
    year: "2025-2026",
    role: "Design et développement front, projet d'équipe",
    featured: true,
    hue: 18,
  },
  // Prochaine réalisation : le site de l'association de protection des odonates.
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const featuredProjects = () => projects.filter((p) => p.featured).slice(0, 3);
export const categoryLabel = (id: CategoryId) => categories.find((c) => c.id === id)?.label ?? id;
