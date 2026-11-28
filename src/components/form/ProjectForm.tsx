"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  budgets,
  deadlines,
  featureOptions,
  ideaExamples,
  labelOf,
  projectTypes,
  stepSchemas,
  type ProjectRequestDraft,
} from "@/lib/project-request";
import { siteConfig } from "@/config/site";
import { Arrow, Button } from "@/components/ui/Button";
import { Field, Pill } from "./fields";

const STORAGE_KEY = "project-request-draft-v1";
const STORAGE_TTL = 1000 * 60 * 60 * 24 * 14; // 14 jours

const steps = [
  { key: "type", label: "Projet", title: "Quel type de projet avez-vous en tête ?" },
  { key: "description", label: "Idée", title: "Racontez-moi votre idée." },
  { key: "details", label: "Détails", title: "Quelques précisions, si vous les avez." },
  { key: "contact", label: "Contact", title: "Comment puis-je vous répondre ?" },
  { key: "confirm", label: "Envoi", title: "On vérifie ensemble avant l'envoi." },
] as const;

type StepKey = (typeof steps)[number]["key"];
type Errors = Partial<Record<string, string>>;
type Feature = (typeof featureOptions)[number];
type Draft = Omit<ProjectRequestDraft, "features"> & { features: Feature[] };

const empty: Draft = {
  description: "",
  company: "",
  sector: "",
  existingSite: "",
  features: [],
  otherFeatures: "",
  fullName: "",
  email: "",
  phone: "",
};

export function ProjectForm() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [draft, setDraft] = useState<Draft>(empty);
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const startedAt = useRef<number>(0);
  const headingRef = useRef<HTMLHeadingElement>(null);

  /* eslint-disable react-hooks/set-state-in-effect -- lecture unique du localStorage, inaccessible au rendu serveur */
  // Restaure le brouillon et la présélection (?type=site depuis la page Services).
  useEffect(() => {
    let restored: { draft: Draft; step: number; savedAt: number; startedAt: number } | null = null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) restored = JSON.parse(raw);
    } catch {}
    const typeParam = new URLSearchParams(window.location.search).get("type");
    const validType = projectTypes.find((t) => t.id === typeParam)?.id;
    if (restored && Date.now() - restored.savedAt < STORAGE_TTL) {
      setDraft({ ...empty, ...restored.draft, ...(validType ? { projectType: validType } : {}) });
      setStep(Math.min(restored.step ?? 0, steps.length - 1));
      startedAt.current = restored.startedAt || Date.now();
    } else {
      startedAt.current = Date.now();
      if (validType) setDraft((d) => ({ ...d, projectType: validType }));
    }
    setHydrated(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Sauvegarde automatique à chaque modification.
  useEffect(() => {
    if (!hydrated) return;
    try {
      // Le consentement n'est jamais mémorisé : il doit être donné au moment de l'envoi.
      const { consent: _c, ...rest } = draft;
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ draft: rest, step, savedAt: Date.now(), startedAt: startedAt.current }));
    } catch {}
  }, [draft, step, hydrated]);

  const set = useCallback(<K extends keyof Draft>(key: K, value: Draft[K]) => {
    setDraft((d) => ({ ...d, [key]: value }));
    setErrors((e) => (e[key as string] ? { ...e, [key as string]: undefined } : e));
  }, []);

  const validate = (key: StepKey) => {
    const result = stepSchemas[key].safeParse(draft);
    if (result.success) {
      setErrors({});
      return true;
    }
    const errs: Errors = {};
    for (const issue of result.error.issues) {
      const k = String(issue.path[0]);
      errs[k] ??= issue.message;
    }
    setErrors(errs);
    // Place le focus sur le premier champ en erreur.
    requestAnimationFrame(() => {
      const first = Object.keys(errs)[0];
      document.getElementById(`f-${first}`)?.focus();
    });
    return false;
  };

  const goTo = (target: number) => {
    setDir(target > step ? 1 : -1);
    setStep(target);
    setServerError("");
    requestAnimationFrame(() => {
      headingRef.current?.focus({ preventScroll: true });
      const top = (headingRef.current?.closest("section")?.getBoundingClientRect().top ?? 0) + window.scrollY - 110;
      if (window.scrollY > top) window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    });
  };

  const next = () => {
    if (!validate(steps[step].key)) return;
    goTo(step + 1);
  };

  const submit = async () => {
    // Revalide toutes les étapes avant l'envoi.
    for (let i = 0; i < steps.length; i++) {
      if (!validate(steps[i].key)) {
        if (i !== step) goTo(i);
        return;
      }
    }
    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/project-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...draft, website: honeypot, startedAt: startedAt.current }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "L'envoi a échoué. Réessayez dans un instant.");
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.setItem("project-request-name", (draft.fullName ?? "").split(" ")[0]);
      router.push("/demarrer-un-projet/merci");
    } catch (e) {
      setStatus("error");
      setServerError(e instanceof Error ? e.message : "L'envoi a échoué.");
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < steps.length - 1) next();
    else submit();
  };

  const err = (k: string) => errors[k];
  const aria = (k: string, hint = false) => ({
    id: `f-${k}`,
    "aria-invalid": Boolean(err(k)) || undefined,
    "aria-describedby": err(k) ? `f-${k}-error` : hint ? `f-${k}-hint` : undefined,
  });

  const appendExample = (ex: string) => {
    const current = (draft.description ?? "").trim();
    if (current.toLowerCase().includes(ex.toLowerCase())) return;
    set("description", current ? `${current}\n${ex}. ` : `${ex}. `);
    requestAnimationFrame(() => {
      const ta = document.getElementById("f-description") as HTMLTextAreaElement | null;
      if (ta) { ta.focus(); ta.selectionStart = ta.selectionEnd = ta.value.length; }
    });
  };

  const toggleFeature = (f: Feature) =>
    set("features", draft.features.includes(f) ? draft.features.filter((x) => x !== f) : [...draft.features, f]);

  const descLen = (draft.description ?? "").trim().length;

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      {/* Colonne de progression */}
      <aside className="lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          <ol className="flex gap-1.5 lg:flex-col lg:gap-0" aria-label="Étapes du formulaire">
            {steps.map((s, i) => {
              const done = i < step;
              const current = i === step;
              return (
                <li key={s.key} className="flex-1 lg:flex-none">
                  <button
                    type="button"
                    disabled={i > step}
                    onClick={() => goTo(i)}
                    aria-current={current ? "step" : undefined}
                    className="group flex w-full flex-col gap-2 text-left disabled:cursor-default lg:flex-row lg:items-center lg:gap-4 lg:py-3"
                  >
                    <span className={`h-1 w-full rounded-full transition-colors duration-500 lg:hidden ${done || current ? "bg-accent" : "bg-line-strong"}`} aria-hidden />
                    <span
                      className={`hidden size-9 shrink-0 place-items-center rounded-full border font-mono text-[12px] transition-all duration-300 lg:grid ${
                        current ? "border-accent bg-accent text-canvas" : done ? "border-accent/60 text-accent" : "border-line-strong text-mute"
                      }`}
                    >
                      {done ? "✓" : i + 1}
                    </span>
                    <span className={`hidden text-[15px] transition-colors lg:inline ${current ? "text-fg" : done ? "text-fg/70 group-hover:text-fg" : "text-mute"}`}>{s.label}</span>
                    <span className="sr-only">{done ? " (terminée)" : current ? " (en cours)" : ""}</span>
                  </button>
                </li>
              );
            })}
          </ol>
          <p className="mt-4 font-mono text-[12px] text-mute lg:hidden">Étape {step + 1} sur {steps.length} · {steps[step].label}</p>

          <div className="card mt-10 hidden p-6 lg:block">
            <p className="eyebrow mb-4">Et ensuite ?</p>
            <p className="text-[14px] leading-relaxed text-mute">
              Je lis votre message et je vous rappelle pour en parler. Si on se lance, je vous envoie un devis, il est gratuit.
            </p>
            <p className="mt-6 flex items-center gap-2 text-[13px] text-mute">
              <span className="size-1.5 rounded-full bg-foam" aria-hidden />
              Vos réponses sont gardées automatiquement.
            </p>
          </div>
        </div>
      </aside>

      {/* Étape en cours */}
      <section className="lg:col-span-8" aria-live="polite">
        <form onSubmit={onSubmit} noValidate className="card relative overflow-hidden p-6 sm:p-10">
          {/* Champ piège pour les robots, invisible pour les humains et les lecteurs d'écran. */}
          <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="website">Ne pas remplir</label>
            <input id="website" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
          </div>

          <p className="font-mono text-[12px] text-accent">{String(step + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}</p>
          <h2 ref={headingRef} tabIndex={-1} className="display mt-3 text-[clamp(2rem,4.5vw,3.2rem)] focus:outline-none">
            {steps[step].title}
          </h2>

          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.div
              key={step}
              custom={dir}
              initial={reduce ? false : { opacity: 0, x: dir * 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: dir * -24 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10"
            >
              {step === 0 && (
                <fieldset>
                  <legend className="sr-only">Type de projet</legend>
                  <div role="radiogroup" aria-describedby={err("projectType") ? "f-projectType-error" : undefined} className="grid gap-3 sm:grid-cols-2">
                    {projectTypes.map((t, i) => {
                      const selected = draft.projectType === t.id;
                      return (
                        <button
                          key={t.id}
                          id={i === 0 ? "f-projectType" : undefined}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          onClick={() => {
                            set("projectType", t.id);
                          }}
                          onDoubleClick={() => { set("projectType", t.id); goTo(1); }}
                          className={`group relative rounded-2xl border p-5 text-left transition-all duration-300 active:scale-[0.99] ${
                            selected ? "border-accent bg-accent-soft" : "border-line-strong hover:border-fg/40 hover:bg-fg/[0.02]"
                          } ${i === projectTypes.length - 1 && projectTypes.length % 2 === 1 ? "sm:col-span-2" : ""}`}
                        >
                          <span className={`absolute right-5 top-5 grid size-5 place-items-center rounded-full border transition-colors ${selected ? "border-accent bg-accent" : "border-line-strong"}`} aria-hidden>
                            {selected && <span className="size-1.5 rounded-full bg-canvas" />}
                          </span>
                          <span className="block pr-8 text-[17px] font-medium">{t.label}</span>
                          <span className="mt-1.5 block text-[14px] text-mute">{t.hint}</span>
                        </button>
                      );
                    })}
                  </div>
                  {err("projectType") && <p id="f-projectType-error" role="alert" className="mt-4 text-[13px] text-danger">{err("projectType")}</p>}
                </fieldset>
              )}

              {step === 1 && (
                <div className="space-y-6">
                  <Field id="f-description" label="Votre idée, avec vos mots" error={err("description")}>
                    <textarea
                      {...aria("description")}
                      rows={7}
                      maxLength={5000}
                      value={draft.description}
                      onChange={(e) => set("description", e.target.value)}
                      placeholder="Par exemple, je tiens une boulangerie à Biarritz et j'aimerais que mes clients puissent commander leurs gâteaux en ligne…"
                      className="field resize-y leading-relaxed"
                    />
                  </Field>
                  <div className="flex items-center justify-between text-[13px] text-mute">
                    <span>Pas besoin de termes techniques, je m&apos;occupe de la traduction.</span>
                    <span className={descLen >= 20 ? "text-foam" : ""}>{descLen} car.</span>
                  </div>
                  <div>
                    <p className="mb-3 text-[14px] text-mute">Besoin d&apos;un point de départ ? Cliquez pour ajouter.</p>
                    <div className="flex flex-wrap gap-2">
                      {ideaExamples.map((ex) => (
                        <button key={ex} type="button" onClick={() => appendExample(ex)} className="rounded-full border border-dashed border-line-strong px-4 py-2 text-[14px] text-mute transition-colors hover:border-accent hover:text-fg">
                          + {ex}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8">
                  <p className="-mt-4 text-[15px] text-mute">Tout est facultatif. Remplissez ce que vous savez, on verra le reste ensemble.</p>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field id="f-company" label="Nom de l'entreprise" optional error={err("company")}>
                      <input {...aria("company")} className="field" autoComplete="organization" value={draft.company} onChange={(e) => set("company", e.target.value)} />
                    </Field>
                    <Field id="f-sector" label="Secteur d'activité" optional error={err("sector")}>
                      <input {...aria("sector")} className="field" placeholder="Restauration, BTP, santé…" value={draft.sector} onChange={(e) => set("sector", e.target.value)} />
                    </Field>
                  </div>
                  <Field id="f-existingSite" label="Site internet existant" optional error={err("existingSite")}>
                    <input {...aria("existingSite")} className="field" inputMode="url" autoComplete="url" placeholder="www.monentreprise.fr" value={draft.existingSite} onChange={(e) => set("existingSite", e.target.value)} />
                  </Field>
                  <div>
                    <p className="mb-3 flex items-baseline justify-between text-[14px] font-medium">Fonctionnalités souhaitées <span className="font-normal text-mute">Facultatif</span></p>
                    <div role="group" aria-label="Fonctionnalités souhaitées" className="flex flex-wrap gap-2">
                      {featureOptions.map((f) => (
                        <Pill key={f} role="checkbox" selected={draft.features.includes(f)} onClick={() => toggleFeature(f)}>{f}</Pill>
                      ))}
                    </div>
                    <input aria-label="Autres fonctionnalités" className="field mt-3" placeholder="Autre chose ? Précisez ici" value={draft.otherFeatures} onChange={(e) => set("otherFeatures", e.target.value)} />
                  </div>
                  <div>
                    <p className="mb-3 flex items-baseline justify-between text-[14px] font-medium">Budget estimatif <span className="font-normal text-mute">Facultatif</span></p>
                    <div role="radiogroup" aria-label="Budget estimatif" className="flex flex-wrap gap-2">
                      {budgets.map((b) => (
                        <Pill key={b.id} selected={draft.budget === b.id} onClick={() => set("budget", draft.budget === b.id ? undefined : b.id)}>{b.label}</Pill>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-3 flex items-baseline justify-between text-[14px] font-medium">Délai souhaité <span className="font-normal text-mute">Facultatif</span></p>
                    <div role="radiogroup" aria-label="Délai souhaité" className="flex flex-wrap gap-2">
                      {deadlines.map((d) => (
                        <Pill key={d.id} selected={draft.deadline === d.id} onClick={() => set("deadline", draft.deadline === d.id ? undefined : d.id)}>{d.label}</Pill>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Field id="f-fullName" label="Prénom et nom" error={err("fullName")}>
                      <input {...aria("fullName")} className="field" autoComplete="name" value={draft.fullName} onChange={(e) => set("fullName", e.target.value)} />
                    </Field>
                  </div>
                  <Field id="f-email" label="Adresse e-mail" error={err("email")}>
                    <input {...aria("email")} className="field" type="email" inputMode="email" autoComplete="email" value={draft.email} onChange={(e) => set("email", e.target.value)} />
                  </Field>
                  <Field id="f-phone" label="Téléphone" optional error={err("phone")} hint="Si vous préférez qu'on s'appelle.">
                    <input {...aria("phone", true)} className="field" type="tel" inputMode="tel" autoComplete="tel" value={draft.phone} onChange={(e) => set("phone", e.target.value)} />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field id="f-company2" label="Nom de l'entreprise" optional>
                      <input id="f-company2" className="field" autoComplete="organization" value={draft.company} onChange={(e) => set("company", e.target.value)} />
                    </Field>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-8">
                  <Recap draft={draft} onEdit={goTo} />
                  <label className={`flex cursor-pointer gap-4 rounded-2xl border p-5 transition-colors ${err("consent") ? "border-accent" : "border-line-strong hover:border-fg/40"}`}>
                    <input
                      id="f-consent"
                      type="checkbox"
                      checked={draft.consent === true}
                      onChange={(e) => set("consent", e.target.checked ? true : undefined)}
                      aria-invalid={Boolean(err("consent")) || undefined}
                      aria-describedby={err("consent") ? "f-consent-error" : undefined}
                      className="mt-0.5 size-5 shrink-0 accent-[var(--color-accent)]"
                    />
                    <span className="text-[14px] leading-relaxed text-mute">
                      J&apos;accepte que mes informations soient utilisées pour répondre à ma demande et me recontacter à ce sujet. Elles ne sont jamais
                      revendues. Plus de détails dans la{" "}
                      <Link href="/confidentialite" target="_blank" className="text-fg underline underline-offset-4">politique de confidentialité</Link>.
                    </span>
                  </label>
                  {err("consent") && <p id="f-consent-error" role="alert" className="-mt-5 text-[13px] text-danger">{err("consent")}</p>}
                  {serverError && (
                    <div role="alert" className="rounded-2xl border border-accent/50 bg-accent-soft p-5 text-[14px] leading-relaxed">
                      {serverError}
                      {siteConfig.email && (
                        <> Vous pouvez aussi m&apos;écrire directement à <a className="underline underline-offset-4" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.</>
                      )}
                      <span className="mt-1 block text-mute">Vos réponses sont conservées, rien n&apos;est perdu.</span>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-12 flex flex-col-reverse gap-3 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            {step > 0 ? (
              <button type="button" onClick={() => goTo(step - 1)} className="rounded-full px-4 py-3 text-[15px] text-mute transition-colors hover:text-fg">
                ← Retour
              </button>
            ) : (
              <span className="text-[13px] text-mute">Environ 3 minutes</span>
            )}
            {step < steps.length - 1 ? (
              <Button type="submit" arrow>{step === 2 ? "Continuer" : "Suivant"}</Button>
            ) : (
              <Button type="submit" disabled={status === "sending"} className="bg-accent! text-fg!">
                {status === "sending" ? (
                  <>
                    <span className="size-4 animate-spin rounded-full border-2 border-canvas/30 border-t-ink" aria-hidden />
                    Envoi en cours…
                  </>
                ) : (
                  <>Envoyer ma demande <Arrow /></>
                )}
              </Button>
            )}
          </div>
        </form>
      </section>
    </div>
  );
}

function Recap({ draft, onEdit }: { draft: Draft; onEdit: (step: number) => void }) {
  const features = [...draft.features, draft.otherFeatures].filter(Boolean).join(", ");
  const groups: { step: number; title: string; rows: [string, string | undefined][] }[] = [
    { step: 0, title: "Projet", rows: [["Type", labelOf(projectTypes, draft.projectType)]] },
    { step: 1, title: "Idée", rows: [["Description", draft.description]] },
    {
      step: 2,
      title: "Détails",
      rows: [
        ["Entreprise", draft.company],
        ["Secteur", draft.sector],
        ["Site existant", draft.existingSite],
        ["Fonctionnalités", features],
        ["Budget", draft.budget && labelOf(budgets, draft.budget)],
        ["Délai", draft.deadline && labelOf(deadlines, draft.deadline)],
      ],
    },
    { step: 3, title: "Contact", rows: [["Nom", draft.fullName], ["E-mail", draft.email], ["Téléphone", draft.phone]] },
  ];
  return (
    <div className="divide-y divide-line rounded-2xl border border-line">
      {groups.map((g) => (
        <div key={g.title} className="p-5 sm:p-6">
          <div className="mb-3 flex items-center justify-between">
            <p className="eyebrow">{g.title}</p>
            <button type="button" onClick={() => onEdit(g.step)} className="text-[13px] text-mute underline-offset-4 transition-colors hover:text-accent hover:underline">
              Modifier
            </button>
          </div>
          <dl className="space-y-2">
            {g.rows.map(([k, v]) => (
              <div key={k} className="grid gap-1 text-[15px] sm:grid-cols-[140px_1fr] sm:gap-4">
                <dt className="text-mute">{k}</dt>
                <dd className={`whitespace-pre-line break-words ${v ? "" : "text-mute/60"}`}>{v || "Non précisé"}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
