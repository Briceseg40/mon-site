# Site de Brice Seguret

Site vitrine et outil d'acquisition. Next.js 16, React 19, TypeScript, Tailwind CSS 4, Motion, Supabase, Resend.

## Lancer en local

```bash
npm install
cp .env.example .env.local   # puis remplir les valeurs
npm run dev                  # http://localhost:3000
```

Sans configuration, tout le site fonctionne sauf l'envoi du formulaire, qui affiche un message clair au visiteur.

## Modifier le contenu

| Quoi | Où |
|---|---|
| Nom commercial, monogramme, réseaux, mentions légales | `src/config/site.ts` |
| Couleurs et typographies | `src/app/globals.css` (bloc `@theme`) |
| Réalisations | `src/content/projects.ts` + images dans `public/projects/<slug>/` |
| Services | `src/content/services.ts` |
| Méthode de travail | `src/content/method.ts` |
| Questions fréquentes | `src/content/faq.ts` |
| Photo de Brice | `public/brice.jpg` puis `PHOTO` dans `src/components/ui/PhotoSlot.tsx` |

Ajouter un projet = copier un objet dans `projects.ts`, changer le `slug`, retirer `placeholder: true`. Il apparaît automatiquement dans le portfolio, le sitemap et (avec `featured: true`) sur l'accueil.

## Brancher le formulaire

1. **Supabase**. Créer un projet (région Europe, par exemple Paris), ouvrir SQL Editor et exécuter `supabase/migrations/001_project_requests.sql`. Copier l'URL et la clé `service_role` dans `SUPABASE_URL` et `SUPABASE_SERVICE_ROLE_KEY`. Les demandes se consultent dans Table Editor > project_requests.
2. **Resend**. Créer un compte, vérifier le domaine du site (enregistrements DNS), créer une clé API. Renseigner `RESEND_API_KEY`, `RESEND_FROM` (adresse sur le domaine vérifié) et `NOTIFY_EMAIL` (adresse qui reçoit les demandes).

Il suffit qu'un des deux soit configuré pour que le formulaire fonctionne. Avec les deux, la demande est enregistrée, Brice reçoit une notification et le prospect un accusé de réception.

Protections en place : validation Zod côté navigateur et serveur, champ piège invisible, délai minimal de saisie, limite de 3 envois par IP toutes les 10 minutes, contrôle d'origine, table protégée par RLS sans aucun accès public, en-têtes de sécurité HTTP.

## Déployer sur Vercel

1. Pousser le dossier sur un dépôt GitHub.
2. Importer le dépôt sur vercel.com (préréglage Next.js détecté automatiquement).
3. Ajouter les variables de `.env.example` dans Settings > Environment Variables, avec `NEXT_PUBLIC_SITE_URL` égale à l'adresse finale.
4. Brancher le nom de domaine dans Settings > Domains.

## Avant la mise en ligne

- [ ] Nom commercial choisi et reporté dans `site.ts`
- [ ] Vraies réalisations à la place des emplacements de démonstration
- [ ] Photo professionnelle
- [ ] Mentions légales complétées (statut, SIRET, adresse, hébergeur)
- [ ] Adresse e-mail publique et liens sociaux
- [ ] Supabase et Resend configurés, envoi testé de bout en bout
- [ ] Engagements de délai (« sous 48 h ») confirmés dans `method.ts`

## Commandes

`npm run dev` · `npm run build` · `npm run lint` · `npm run typecheck`
