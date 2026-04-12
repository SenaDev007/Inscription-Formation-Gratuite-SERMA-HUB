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
    const toEmail = process.env.RESEND_TO_EMAIL;

    if (!toEmail) {
      console.error("RESEND_TO_EMAIL non défini");
      return NextResponse.json(
        { error: "Configuration serveur manquante" },
        { status: 500 }
      );
    }

    const html = generateEmailHTML(data);

    const { error } = await resend.emails.send({
      from: "SERMA HUB Impact Academy <onboarding@resend.dev>",
      to: [toEmail],
      subject: `Nouvelle inscription — ${data.prenom} ${data.nom}`,
      html,
      reply_to: data.email,
    });

    if (error) {
      console.error("Erreur Resend:", error);
      return NextResponse.json(
        { error: "Échec de l'envoi de l'email" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Erreur API inscription:", err);
    return NextResponse.json(
      { error: "Erreur serveur inattendue" },
      { status: 500 }
    );
  }
}
