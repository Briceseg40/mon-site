import { z } from "zod";

export const projectTypes = [
  { id: "site", label: "Création de site internet", hint: "Site vitrine, portfolio, site de réservation" },
  { id: "refonte", label: "Refonte de site internet", hint: "Moderniser ou reconstruire un site existant" },
  { id: "web-app", label: "Application web", hint: "Plateforme, outil métier, espace client" },
  { id: "autre", label: "Autre projet", hint: "Maquette, conseil, idée encore floue" },
] as const;

export const budgets = [
  { id: "lt-1500", label: "Moins de 1 500 €" },
  { id: "1500-3000", label: "1 500 à 3 000 €" },
  { id: "3000-6000", label: "3 000 à 6 000 €" },
  { id: "gt-6000", label: "Plus de 6 000 €" },
  { id: "unknown", label: "Je ne sais pas encore" },
] as const;

export const deadlines = [
  { id: "asap", label: "Dès que possible" },
  { id: "1-month", label: "Dans le mois" },
  { id: "3-months", label: "D'ici 3 mois" },
  { id: "flexible", label: "Pas de date précise" },
] as const;

export const featureOptions = [
  "Formulaire de contact",
  "Prise de rendez-vous",
  "Boutique en ligne",
  "Paiement en ligne",
  "Espace client",
  "Blog ou actualités",
  "Multilingue",
  "Back-office pour modifier le contenu",
] as const;

export const ideaExamples = [
  "Présenter mon entreprise",
  "Vendre mes produits",
  "Permettre à mes clients de prendre rendez-vous",
  "Créer une plateforme",
  "Automatiser une tâche",
  "Créer une application métier",
] as const;

const ids = <T extends readonly { id: string }[]>(list: T) =>
  list.map((x) => x.id) as [T[number]["id"], ...T[number]["id"][]];

const optionalText = (max: number) => z.string().trim().max(max).optional().default("");

const optionalUrl = z
  .string()
  .trim()
  .max(300)
  .optional()
  .default("")
  .refine((v) => v === "" || /^(https?:\/\/)?[\w-]+(\.[\w-]+)+([/?#].*)?$/i.test(v), {
    message: "Cette adresse ne ressemble pas à un site internet.",
  });

export const stepSchemas = {
  type: z.object({
    projectType: z.enum(ids(projectTypes), { message: "Choisissez le type de projet." }),
  }),
  description: z.object({
    description: z
      .string()
      .trim()
      .min(20, "Quelques phrases suffisent, mais il m'en faut au moins une (20 caractères).")
      .max(5000, "5 000 caractères maximum."),
  }),
  details: z.object({
    sector: optionalText(120),
    existingSite: optionalUrl,
    features: z.array(z.enum(featureOptions)).max(featureOptions.length).optional().default([]),
    otherFeatures: optionalText(1000),
    budget: z.enum(ids(budgets)).optional(),
    deadline: z.enum(ids(deadlines)).optional(),
  }),
  contact: z.object({
    fullName: z.string().trim().min(2, "Indiquez votre prénom et votre nom.").max(120),
    email: z.string().trim().toLowerCase().email("Cette adresse e-mail n'est pas valide.").max(200),
    phone: z
      .string()
      .trim()
      .max(30)
      .optional()
      .default("")
      .refine((v) => v === "" || /^[+\d][\d\s.-]{6,}$/.test(v), { message: "Ce numéro ne semble pas valide." }),
    company: optionalText(120),
  }),
  confirm: z.object({
    consent: z.literal(true, { message: "Votre accord est nécessaire pour que je puisse vous répondre." }),
  }),
};

export const projectRequestSchema = stepSchemas.type
  .extend(stepSchemas.description.shape)
  .extend(stepSchemas.details.shape)
  .extend(stepSchemas.contact.shape)
  .extend(stepSchemas.confirm.shape)
  .extend({
    /** Champ piège invisible : un humain le laisse vide. */
    website: z.string().max(0).optional().default(""),
    /** Horodatage du début de saisie (ms), pour écarter les robots trop rapides. */
    startedAt: z.number().int().positive(),
  });

export type ProjectRequest = z.infer<typeof projectRequestSchema>;
export type ProjectRequestDraft = Partial<z.input<typeof projectRequestSchema>>;

export const labelOf = <T extends readonly { id: string; label: string }[]>(list: T, id?: string) =>
  list.find((x) => x.id === id)?.label ?? "Non précisé";
