import "server-only";
import { Resend } from "resend";
import { siteConfig } from "@/config/site";
import { budgets, deadlines, labelOf, projectTypes, type ProjectRequest } from "@/lib/project-request";

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const nl2br = (s: string) => esc(s).replace(/\n/g, "<br>");

function layout(title: string, body: string) {
  return `<!doctype html><html lang="fr"><body style="margin:0;background:#f4f2ee;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#141414">
<div style="max-width:560px;margin:0 auto;padding:40px 24px">
<p style="font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#ff5a2b;margin:0 0 24px">${esc(siteConfig.brand.name)} · ${esc(siteConfig.brand.tagline)}</p>
<h1 style="font-size:24px;line-height:1.3;font-weight:600;margin:0 0 24px">${title}</h1>
${body}
<p style="font-size:12px;color:#8a8780;margin-top:40px">${esc(siteConfig.brand.name)} · ${esc(siteConfig.location)}</p>
</div></body></html>`;
}

function rows(r: ProjectRequest) {
  const items: [string, string][] = [
    ["Type de projet", labelOf(projectTypes, r.projectType)],
    ["Nom", r.fullName],
    ["E-mail", r.email],
    ["Téléphone", r.phone || "Non précisé"],
    ["Entreprise", r.company || "Non précisé"],
    ["Secteur", r.sector || "Non précisé"],
    ["Site existant", r.existingSite || "Aucun"],
    ["Fonctionnalités", [...r.features, r.otherFeatures].filter(Boolean).join(", ") || "Non précisé"],
    ["Budget", labelOf(budgets, r.budget)],
    ["Délai", labelOf(deadlines, r.deadline)],
  ];
  return `<table style="width:100%;border-collapse:collapse;font-size:14px">${items
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 0;border-bottom:1px solid #e3e0da;color:#8a8780;width:40%;vertical-align:top">${k}</td><td style="padding:8px 0;border-bottom:1px solid #e3e0da">${esc(v)}</td></tr>`,
    )
    .join("")}</table>`;
}

export function emailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM);
}

export async function sendRequestEmails(r: ProjectRequest, id: string | null) {
  if (!emailConfigured()) return { notified: false, confirmed: false };
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM!;
  const notify = process.env.NOTIFY_EMAIL;
  const firstName = r.fullName.split(" ")[0];

  const [n, c] = await Promise.allSettled([
    notify
      ? resend.emails.send({
          from,
          to: notify,
          replyTo: r.email,
          subject: `Nouvelle demande · ${labelOf(projectTypes, r.projectType)} · ${r.fullName}`,
          html: layout(
            `Nouvelle demande de ${esc(r.fullName)}`,
            `<p style="font-size:15px;line-height:1.6;background:#fff;padding:16px;border-radius:12px">${nl2br(r.description)}</p>${rows(r)}${
              id ? `<p style="font-size:12px;color:#8a8780">Référence ${esc(id)}</p>` : ""
            }<p style="font-size:14px">Répondez directement à cet e-mail pour écrire à ${esc(firstName)}.</p>`,
          ),
        })
      : Promise.resolve(null),
    resend.emails.send({
      from,
      to: r.email,
      subject: `J'ai bien reçu votre demande, ${firstName}`,
      html: layout(
        `Merci ${esc(firstName)}, votre demande est bien arrivée.`,
        `<p style="font-size:15px;line-height:1.6">Je la lis attentivement et je reviens vers vous très vite pour en parler. Si une idée vous revient d'ici là, répondez simplement à cet e-mail.</p>
<p style="font-size:15px;line-height:1.6">Pour mémoire, voici ce que vous m'avez envoyé.</p>
<p style="font-size:15px;line-height:1.6;background:#fff;padding:16px;border-radius:12px">${nl2br(r.description)}</p>${rows(r)}
<p style="font-size:15px;line-height:1.6;margin-top:24px">À très vite,<br>${esc(siteConfig.person.firstName)}</p>`,
      ),
      ...(notify ? { replyTo: notify } : {}),
    }),
  ]);
  const ok = (x: PromiseSettledResult<unknown>) =>
    x.status === "fulfilled" && x.value !== null && !(x.value as { error?: unknown })?.error;
  return { notified: ok(n), confirmed: ok(c) };
}
