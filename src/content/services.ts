export type Service = {
  id: string;
  title: string;
  short: string;
  benefit: string;
  details: string[];
  /** Valeur passée au formulaire pour présélectionner le type de projet. */
  formType: "site" | "refonte" | "web-app" | "mobile" | "autre";
};

export const services: Service[] = [
  {
    id: "site-vitrine",
    title: "Site vitrine",
    short: "Un site clair qui donne envie de vous appeler.",
    benefit:
      "Vos clients vous cherchent sur Google avant de pousser la porte. Je construis un site rapide, bien référencé, qui explique ce que vous faites en quelques secondes et qui transforme une visite en prise de contact.",
    details: ["Design sur mesure, pas de thème acheté", "Référencement local soigné", "Formulaire de contact relié à votre boîte mail", "Vous modifiez vos textes vous-même"],
    formType: "site",
  },
  {
    id: "refonte",
    title: "Refonte de site",
    short: "Votre site actuel ne vous ressemble plus ? On le remet à niveau.",
    benefit:
      "Un site lent ou daté coûte des clients sans qu'on s'en rende compte. Je reprends l'existant, je garde ce qui marche et je reconstruis le reste, sans perdre votre référencement.",
    details: ["Audit de l'existant avant de toucher à quoi que ce soit", "Redirections pour garder vos positions Google", "Contenus réécrits si besoin", "Mise en ligne sans coupure"],
    formType: "refonte",
  },
  {
    id: "application-web",
    title: "Application web",
    short: "Un outil fait pour votre métier, pas l'inverse.",
    benefit:
      "Prise de rendez-vous, espace client, gestion de stock, tableau de bord. Quand un tableur ou un logiciel générique ne suffit plus, je développe l'outil qui colle à votre façon de travailler et vous fait gagner du temps chaque semaine.",
    details: ["Comptes utilisateurs et rôles", "Base de données sécurisée", "Paiement en ligne si besoin", "Évolutif, on ajoute des briques au fil du temps"],
    formType: "web-app",
  },
  {
    id: "maquettes",
    title: "Maquettes et prototypes",
    short: "Voir et tester votre idée avant d'investir dans le développement.",
    benefit:
      "Un prototype cliquable permet de convaincre un associé, un financeur ou vos premiers clients. Et surtout de corriger le tir quand ça ne coûte presque rien.",
    details: ["Parcours utilisateur dessiné écran par écran", "Prototype cliquable sur Figma", "Itérations rapides avec vous", "Base directement réutilisable pour le développement"],
    formType: "autre",
  },
  {
    id: "design-ui-ux",
    title: "Design UI/UX",
    short: "Une interface qu'on comprend sans mode d'emploi.",
    benefit:
      "Un bon design se remarque surtout quand il manque. Je travaille la clarté des écrans, la hiérarchie de l'information et les détails qui donnent confiance, pour que vos utilisateurs aillent au bout de ce qu'ils sont venus faire.",
    details: ["Identité visuelle de l'interface", "Design responsive mobile d'abord", "Accessibilité prise en compte dès le départ", "Mini design system livré avec le projet"],
    formType: "autre",
  },
  {
    id: "accompagnement",
    title: "Accompagnement digital",
    short: "Un regard technique à vos côtés, sans jargon.",
    benefit:
      "Choisir un outil, comprendre un devis, préparer un cahier des charges. Je vous aide à prendre les bonnes décisions et je reste joignable une fois le projet en ligne.",
    details: ["Conseil sur les outils et l'hébergement", "Aide à la rédaction du cahier des charges", "Maintenance et mises à jour", "Formation à la prise en main"],
    formType: "autre",
  },
];

export const benefits = [
  { title: "Être trouvé", text: "Un site rapide et bien référencé pour apparaître quand on vous cherche." },
  { title: "Inspirer confiance", text: "Une image soignée qui montre le sérieux de votre travail." },
  { title: "Gagner des clients", text: "Des pages pensées pour qu'un visiteur passe à l'action." },
  { title: "Gagner du temps", text: "Des outils qui automatisent ce que vous faites encore à la main." },
];
