# Direction artistique et architecture

## Direction artistique « Marée basse »

Le site part d'une image simple, le soleil qui se couche sur l'océan à Anglet. Fond encre presque noir, texte blanc cassé chaud, une seule couleur d'accent corail qui rappelle ce couchant. Une deuxième teinte vert d'écume n'apparaît que pour les petits signaux positifs (disponibilité, validation).

| Rôle | Couleur |
|---|---|
| Fond | #0B0B0C encre |
| Surfaces | #111113 et #18181B |
| Texte | #EDEAE3 blanc cassé |
| Texte secondaire | #96928B |
| Accent | #FF6A3D corail |
| Signal | #8FD6CB écume |

Typographies
- Instrument Serif pour les grands titres, avec un mot en italique corail par titre. C'est la signature éditoriale qui évite l'effet template.
- Inter Tight pour le texte courant, très lisible sur mobile.
- JetBrains Mono pour les petites étiquettes et les numéros de section.

Signatures visuelles
- Une ligne d'horizon lumineuse (corail vers écume) qui revient dans le hero, la méthode, le footer.
- Un halo lumineux qui suit la souris, très discret.
- Un grain léger sur tout le site pour donner de la matière au noir.
- Cartes projets avec une inclinaison 3D légère et un reflet qui suit le pointeur.
- Titres du hero qui montent mot par mot, apparitions douces au défilement.
- Toutes les animations se coupent si le visiteur a demandé moins d'animations dans son système.

Personnalisation. Le nom, le monogramme et la signature se changent dans `src/config/site.ts`. Les couleurs dans le bloc `@theme` de `src/app/globals.css`.

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
