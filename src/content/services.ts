export type Service = {
  id: string;
  title: string;
  short: string;
  benefit: string;
  details: string[];
  /** Valeur passée au formulaire pour présélectionner le type de projet. */
  formType: "site" | "refonte" | "web-app" | "autre";
};

export const services: Service[] = [
  {
    id: "site-vitrine",
    title: "Site vitrine",
    short: "Pour qu'on vous trouve, et qu'on ait envie de vous appeler.",
    benefit:
      "Les gens vous cherchent sur Google avant de vous appeler. Je fais un site rapide qui dit clairement ce que vous faites, sans thème acheté tout prêt. Et vous pourrez changer vos textes vous-même.",
    details: ["Un design fait pour vous", "Référencement local", "Formulaire qui arrive dans votre boîte mail", "Textes modifiables par vous"],
    formType: "site",
  },
  {
    id: "refonte",
    title: "Refonte de site",
    short: "Votre site a pris un coup de vieux ? On le reprend.",
    benefit:
      "Je regarde d'abord ce qui marche déjà, pour ne pas casser ce qui vous amène des visites. Le reste, je le refais. C'est ce que j'ai fait avec le site d'ODO40, livré en 2023 et repensé de zéro trois ans plus tard.",
    details: ["Le tour de l'existant avant de toucher à quoi que ce soit", "Redirections pour garder votre place sur Google", "Textes réécrits si besoin", "Bascule sans coupure"],
    formType: "refonte",
  },
  {
    id: "application-web",
    title: "Application web",
    short: "Quand un tableur ne suffit plus.",
    benefit:
      "Si vous gérez vos réservations ou vos clients à la main dans Excel, il y a sûrement moyen de faire un outil qui colle à votre façon de bosser. Avec AgendSup, j'ai appris à gérer des comptes qui n'ont pas tous les mêmes droits, et c'est souvent par là que tout commence.",
    details: ["Comptes et rôles", "Base de données", "Paiement en ligne si besoin", "On ajoute des morceaux au fil du temps"],
    formType: "web-app",
  },
  {
    id: "maquettes",
    title: "Maquettes et prototypes",
    short: "Voir votre idée avant de payer le développement.",
    benefit:
      "Une maquette cliquable sur Figma, c'est le meilleur moyen de savoir si une idée tient debout. Ça coûte peu, et on corrige le tir avant que ça devienne cher.",
    details: ["Les écrans dessinés un par un", "Prototype cliquable sur Figma", "Allers-retours rapides avec vous", "Réutilisable pour le développement"],
    formType: "autre",
  },
  {
    id: "design-ui-ux",
    title: "Design d'interface",
    short: "Une interface qu'on comprend sans notice.",
    benefit:
      "Un bon design, on le remarque surtout quand il manque. Je passe du temps sur la lisibilité des écrans et sur les petits détails qui donnent confiance. Sur AgendSup, c'est moi qui m'occupais de l'identité visuelle et de la mascotte.",
    details: ["Pensé pour le mobile d'abord", "Accessibilité prise en compte dès le départ", "Couleurs et typos cohérentes partout", "Les règles du design livrées avec le projet"],
    formType: "autre",
  },
  {
    id: "accompagnement",
    title: "Coup de main technique",
    short: "Un avis franc avant de vous lancer.",
    benefit:
      "Vous hésitez entre deux outils, ou un devis vous paraît bizarre ? Je vous dis ce que j'en pense, même si la réponse c'est que vous n'avez pas besoin de moi.",
    details: ["Choix des outils et de l'hébergement", "Aide pour écrire le cahier des charges", "Maintenance et mises à jour", "Je vous montre comment vous servir de votre site"],
    formType: "autre",
  },
];
