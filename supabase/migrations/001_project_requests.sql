-- Demandes de projet envoyées depuis le formulaire du site.
create extension if not exists pgcrypto;

create table if not exists public.project_requests (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  status          text not null default 'nouveau'
                  check (status in ('nouveau', 'en_cours', 'devis_envoye', 'gagne', 'perdu', 'archive')),
  project_type    text not null check (project_type in ('site', 'refonte', 'web-app', 'mobile', 'autre')),
  description     text not null check (char_length(description) between 20 and 5000),
  company         text,
  sector          text,
  existing_site   text,
  features        text[] not null default '{}',
  other_features  text,
  budget          text,
  deadline        text,
  full_name       text not null,
  email           text not null,
  phone           text,
  consent_at      timestamptz not null,
  user_agent      text,
  notified        boolean not null default false,
  confirmed       boolean not null default false
);

create index if not exists project_requests_created_at_idx on public.project_requests (created_at desc);

-- RLS activée sans aucune politique : ni la clé anonyme ni un visiteur ne peuvent lire ou écrire.
-- Seul le serveur du site (clé service_role) insère des lignes.
alter table public.project_requests enable row level security;

-- Conservation limitée (voir politique de confidentialité) : à lancer périodiquement ou via pg_cron.
-- delete from public.project_requests where created_at < now() - interval '3 years' and status in ('perdu', 'archive');
