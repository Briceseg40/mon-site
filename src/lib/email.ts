import "server-only";
import { Resend } from "resend";
import { siteConfig } from "@/config/site";
import { budgets, deadlines, labelOf, projectTypes, type ProjectRequest } from "@/lib/project-request";

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const nl2br = (s: string) => esc(s).replace(/\n/g, "<br>");

function layout(body: string) {
  return `<!doctype html><html lang="fr"><body style="margin:0;background:#ffffff;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#1a1a1a">
<div style="max-width:560px;margin:0 auto;padding:32px 20px;font-size:15px;line-height:1.6">
${body}
</div></body></html>`;
}

const p = (t: string) => `<p style="margin:0 0 16px">${t}</p>`;
const quote = (t: string) =>
  `<p style="margin:0 0 20px;padding:12px 16px;border-left:3px solid #e3e0da;color:#444">${nl2br(t)}</p>`;

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
          subject: `Nouvelle demande de ${r.fullName} (${labelOf(projectTypes, r.projectType)})`,
          html: layout(
            `${p(`${esc(r.fullName)} t'a écrit depuis le site.`)}${quote(r.description)}${rows(r)}${
              id ? `<p style="font-size:12px;color:#8a8780">Référence ${esc(id)}</p>` : ""
            }${p(`Tu peux répondre directement à ce mail, ça part chez ${esc(firstName)}.`)}`,
          ),
        })
      : Promise.resolve(null),
    resend.emails.send({
      from,
      to: r.email,
      subject: `Bien reçu, ${firstName}`,
      html: layout(
        `${p(`Bonjour ${esc(firstName)},`)}${p("Merci pour votre message, il est bien arrivé. Je le lis tranquillement et je vous réponds dans les prochains jours.")}${p(
          "Si un détail vous revient d'ici là, répondez simplement à ce mail, ça arrive directement chez moi.",
        )}${p("Je vous remets ce que vous m'avez envoyé, pour mémoire.")}${quote(r.description)}${rows(r)}<p style="margin:24px 0 0">À bientôt,<br>${esc(
          siteConfig.person.firstName,
        )}</p>`,
      ),
      ...(notify ? { replyTo: notify } : {}),
    }),
  ]);
  const ok = (x: PromiseSettledResult<unknown>) =>
    x.status === "fulfilled" && x.value !== null && !(x.value as { error?: unknown })?.error;
  return { notified: ok(n), confirmed: ok(c) };
}
