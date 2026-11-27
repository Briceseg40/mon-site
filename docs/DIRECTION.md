# Direction artistique et architecture

## Direction artistique « Built to move » (thème clair)

Version 2, après retour de Brice. Fond papier chaud, encre presque noire, un accent corail. L'ambiance s'inspire des meilleurs templates actuels : beaucoup d'air, halos pastel flous, surfaces en verre dépoli, typographie sans-serif très serrée.

| Rôle | Couleur |
|---|---|
| Fond | #F6F5F1 papier |
| Surfaces | #FFFFFF avec ombre douce |
| Texte | #0E0E10 encre |
| Texte secondaire | #6B6A66 |
| Accent | #EC4A17 corail |
| Signal | #0F9A87 |

Typographies
- Inter Tight serré (-4,5 %) pour les titres, avec un mot en Instrument Serif italique corail. Ce mélange donne la signature.
- Inter Tight pour le texte, JetBrains Mono pour les petites étiquettes.

Signatures visuelles
- Un globe de points en rotation dans le hero, avec des trajectoires corail. Il réagit à la souris et accélère au défilement, d'où « Built to move ».
- Navigation en pilule de verre flottante.
- Halos pastel (pêche et lilas) derrière les en-têtes.
- Bandeau final sombre pour créer un contraste fort avant le footer.
- Cartes projets avec inclinaison 3D et reflet.
- Tout se coupe si le visiteur préfère moins d'animations.

## Arborescence

```
/                         Accueil
/realisations             Portfolio filtrable par catégorie
/realisations/[slug]      Page détaillée d'un projet
/services                 Les six services et leurs bénéfices
/a-propos                 Présentation de Brice
/demarrer-un-projet       Formulaire en 5 étapes
/demarrer-un-projet/merci Page de remerciement
/mentions-legales
/confidentialite
```

Le bouton « Démarrer un projet » est présent dans la navigation, le hero, chaque page service, chaque page projet et le bandeau final de chaque page.

## Composants principaux

- `layout` Header (navigation collante, menu mobile plein écran), Footer, CtaBanner
- `ui` ButtonLink, Reveal, SectionHeading, Availability, Logo, CursorGlow
- `home` Hero, Marquee, FeaturedProjects, ServicesPreview, Method, AboutPreview
- `projects` ProjectCard, ProjectVisual, ProjectGrid (filtres), PlaceholderBadge
- `form` ProjectForm (étapes, sauvegarde automatique, récapitulatif)

## Technique

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Motion pour les animations, Zod pour la validation partagée entre navigateur et serveur, Supabase pour stocker les demandes, Resend pour les e-mails.
