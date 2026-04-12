import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { fullFormSchema } from "@/lib/validations";
import { generateEmailHTML } from "@/lib/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = fullFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Données invalides",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const data = parsed.data;

    // Always log the full registration data (visible in Vercel function logs)
    console.log("[SERMA HUB] Nouvelle inscription reçue:", JSON.stringify({
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
      whatsapp: data.whatsapp,
      ville: data.ville,
      statut: data.statut,
      niveauEtudes: data.niveauEtudes,
      modules: data.modules,
      source: data.source,
      attestation: data.attestation,
      timestamp: new Date().toISOString(),
    }));

    const toEmail = process.env.RESEND_TO_EMAIL;
    if (!toEmail) {
      console.error("[SERMA HUB] RESEND_TO_EMAIL non défini dans les variables d'environnement");
    }

    // Try to send notification email — non-blocking: form always succeeds
    if (toEmail && process.env.RESEND_API_KEY) {
      try {
        const html = generateEmailHTML(data);
        // From: nom d'affichage SERMA HUB, domaine technique academiahelm.com (vérifié)
        // Le destinataire voit uniquement "SERMA HUB Impact Academy", pas le domaine.
        const { data: sendData, error: sendError } = await resend.emails.send({
          from: "SERMA HUB Impact Academy <noreply@academiahelm.com>",
          to: [toEmail],
          subject: `Nouvelle inscription — ${data.prenom} ${data.nom}`,
          html,
          reply_to: data.email,
        });

        if (sendError) {
          console.error("[SERMA HUB] Erreur Resend:", JSON.stringify(sendError));
        } else {
          console.log("[SERMA HUB] Email envoyé avec succès. ID:", sendData?.id);
        }
      } catch (emailException) {
        console.error("[SERMA HUB] Exception lors de l'envoi email:", emailException);
      }
    }

    // Always return success — inscription data is logged above
    return NextResponse.json({ success: true }, { status: 200 });

  } catch (err) {
    console.error("[SERMA HUB] Erreur serveur inattendue:", err);
    return NextResponse.json(
      { error: "Erreur serveur inattendue" },
      { status: 500 }
    );
  }
}
