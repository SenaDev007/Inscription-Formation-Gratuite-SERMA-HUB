import { NextRequest, NextResponse } from "next/server";
import { fullFormSchema } from "@/lib/validations";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { skipEmail: _skip, ...formFields } = body;

    const parsed = fullFormSchema.safeParse(formFields);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", details: parsed.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const data = parsed.data;

    console.log("[SERMA HUB] Inscription reçue (paiement en attente):", JSON.stringify({
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
      whatsapp: data.whatsapp,
      ville: data.ville,
      modules: data.modules,
      timestamp: new Date().toISOString(),
    }));

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (err) {
    console.error("[SERMA HUB] Erreur serveur:", err);
    return NextResponse.json({ error: "Erreur serveur inattendue" }, { status: 500 });
  }
}
