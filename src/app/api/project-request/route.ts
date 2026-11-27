import { NextResponse, type NextRequest } from "next/server";
import { projectRequestSchema } from "@/lib/project-request";
import { getSupabase } from "@/lib/supabase";
import { emailConfigured, sendRequestEmails } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MIN_FILL_MS = 5_000;

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (origin && new URL(origin).host !== req.headers.get("host")) {
    return NextResponse.json({ error: "Origine non autorisée." }, { status: 403 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "Plusieurs demandes ont déjà été envoyées. Réessayez dans quelques minutes." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const parsed = projectRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Certains champs sont invalides.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }
  const data = parsed.data;

  // Robots : champ piège rempli ou formulaire rempli en un éclair. On répond « ok » sans rien faire.
  if (data.website || Date.now() - data.startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  const supabase = getSupabase();
  if (!supabase && !emailConfigured()) {
    console.error("[project-request] Ni Supabase ni Resend ne sont configurés.");
    return NextResponse.json(
      { error: "Le formulaire n'est pas encore relié. Merci de réessayer un peu plus tard." },
      { status: 503 },
    );
  }

  let id: string | null = null;
  if (supabase) {
    const { data: row, error } = await supabase
      .from("project_requests")
      .insert({
        project_type: data.projectType,
        description: data.description,
        company: data.company || null,
        sector: data.sector || null,
        existing_site: data.existingSite || null,
        features: data.features,
        other_features: data.otherFeatures || null,
        budget: data.budget ?? null,
        deadline: data.deadline ?? null,
        full_name: data.fullName,
        email: data.email,
        phone: data.phone || null,
        consent_at: new Date().toISOString(),
        user_agent: req.headers.get("user-agent")?.slice(0, 300) ?? null,
      })
      .select("id")
      .single();
    if (error) {
      console.error("[project-request] Supabase", error.message);
      if (!emailConfigured()) {
        return NextResponse.json({ error: "L'enregistrement a échoué. Réessayez dans un instant." }, { status: 500 });
      }
    } else {
      id = row.id as string;
    }
  }

  const mail = await sendRequestEmails(data, id).catch((e) => {
    console.error("[project-request] Resend", e);
    return { notified: false, confirmed: false };
  });

  if (!id && !mail.notified) {
    return NextResponse.json({ error: "L'envoi a échoué. Réessayez dans un instant." }, { status: 500 });
  }

  if (supabase && id) {
    await supabase.from("project_requests").update({ notified: mail.notified, confirmed: mail.confirmed }).eq("id", id);
  }

  return NextResponse.json({ ok: true });
}
