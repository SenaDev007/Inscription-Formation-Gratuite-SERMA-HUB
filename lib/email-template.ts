import type { FullFormData } from "./validations";

export function generateEmailHTML(data: FullFormData): string {
  const {
    nom,
    prenom,
    sexe,
    whatsapp,
    email,
    ville,
    statut,
    domaine,
    niveauEtudes,
    modules,
    source,
    motivation,
    attentes,
    attestation,
  } = data;

  const modulesList = modules.map((m) => `<li>${m}</li>`).join("");

  // Format WhatsApp number: strip leading 0 then prepend 229
  // e.g. 01xxxxxxxx → 229xxxxxxxx  (NOT 22901xxxxxxxx)
  const waNumber = (() => {
    const cleaned = whatsapp.replace(/[\s\-\(\)\.]/g, "");
    if (cleaned.startsWith("+")) return cleaned.slice(1);
    if (cleaned.startsWith("229")) return cleaned;
    if (cleaned.startsWith("0")) return "229" + cleaned.slice(1);
    return "229" + cleaned;
  })();
  const waLink = `https://wa.me/${waNumber}`;
  const waText = encodeURIComponent(`Bonjour ${prenom}, nous avons bien reçu votre inscription à la formation SERMA HUB Impact Academy (16-18 Avril 2026). Nous vous contactons pour confirmer votre place.`);
  const waDeepLink = `https://wa.me/${waNumber}?text=${waText}`;

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Nouvelle inscription — SERMA HUB Impact Academy</title>
</head>
<body style="margin:0;padding:0;background-color:#0f1a3a;font-family:'Inter',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f1a3a;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#1B2A5C 0%,#243570 100%);border-radius:16px 16px 0 0;padding:40px 40px 32px;text-align:center;border-bottom:3px solid #F59B1E;">
              <p style="margin:0;font-size:32px;font-weight:800;letter-spacing:2px;">
                <span style="color:#FFFFFF;">SERMA</span><span style="color:#F59B1E;"> HUB</span>
              </p>
              <p style="margin:6px 0 0;font-size:13px;letter-spacing:4px;color:#2BA96B;font-weight:600;text-transform:uppercase;">Impact Academy</p>
              <p style="margin:20px 0 0;color:#F59B1E;font-size:20px;font-weight:700;">Nouvelle Inscription Reçue</p>
              <p style="margin:8px 0 0;color:#94A3B8;font-size:13px;">Jeudi 16 · Vendredi 17 · Samedi 18 Avril 2026</p>
            </td>
          </tr>

          <!-- SECTION 1 -->
          <tr>
            <td style="background:#1B2A5C;padding:32px 40px 8px;">
              <p style="margin:0 0 16px;color:#F59B1E;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px;border-left:3px solid #F59B1E;padding-left:10px;">
                Informations personnelles
              </p>
              ${row("Nom complet", `${prenom} ${nom}`)}
              ${row("Sexe", sexe)}
              ${row("WhatsApp", whatsapp)}
              ${row("Email", email)}
              ${row("Ville de résidence", ville)}
            </td>
          </tr>

          <!-- WHATSAPP CTA -->
          <tr>
            <td style="background:#1B2A5C;padding:8px 40px 24px;text-align:center;">
              <a href="${waDeepLink}"
                 style="display:inline-block;background-color:#25D366;color:#FFFFFF;font-size:15px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:10px;letter-spacing:0.5px;">
                💬 Ouvrir la discussion WhatsApp
              </a>
              <p style="margin:10px 0 0;color:#94A3B8;font-size:12px;">
                ${whatsapp} → <span style="color:#25D366;">+${waNumber}</span>
              </p>
            </td>
          </tr>

          <!-- SECTION 2 -->
          <tr>
            <td style="background:#1B2A5C;padding:24px 40px 8px;border-top:1px solid rgba(245,155,30,0.15);">
              <p style="margin:0 0 16px;color:#F59B1E;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px;border-left:3px solid #F59B1E;padding-left:10px;">
                Profil professionnel
              </p>
              ${row("Statut", statut)}
              ${row("Domaine / Secteur", domaine)}
              ${row("Niveau d'études", niveauEtudes)}
            </td>
          </tr>

          <!-- SECTION 3 -->
          <tr>
            <td style="background:#1B2A5C;padding:24px 40px 8px;">
              <p style="margin:0 0 16px;color:#F59B1E;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px;border-left:3px solid #F59B1E;padding-left:10px;">
                Modules choisis
              </p>
              <tr>
                <td style="padding:6px 0;">
                  <span style="color:#94A3B8;font-size:13px;display:block;margin-bottom:4px;">Modules :</span>
                  <ul style="margin:0;padding-left:20px;color:#FFFFFF;font-size:14px;line-height:1.8;">
                    ${modulesList}
                  </ul>
                </td>
              </tr>
              ${row("Comment a-t-il connu la formation", source)}
            </td>
          </tr>

          <!-- SECTION 4 -->
          <tr>
            <td style="background:#1B2A5C;padding:24px 40px 8px;">
              <p style="margin:0 0 16px;color:#F59B1E;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px;border-left:3px solid #F59B1E;padding-left:10px;">
                Motivation & Attentes
              </p>
              ${blockRow("Motivation", motivation)}
              ${attentes ? blockRow("Attentes concrètes", attentes) : ""}
              ${row("Attestation souhaitée (5 000 FCFA)", attestation)}
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#243570;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;border-top:1px solid rgba(245,155,30,0.2);">
              <p style="margin:0;color:#94A3B8;font-size:12px;">
                Cet email a été généré automatiquement depuis le formulaire d'inscription<br/>
                <strong style="color:#F59B1E;">SERMA HUB Impact Academy</strong> · 01 40 37 71 99
              </p>
              <p style="margin:12px 0 0;color:#94A3B8;font-size:11px;">
                Zongo 2, von AXE BENI CHIC – PRESIDO, à 100 m du carrefour après EPP La SOURCE
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

function row(label: string, value: string): string {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
      <tr>
        <td width="45%" style="color:#94A3B8;font-size:13px;vertical-align:top;padding-right:8px;">${label}</td>
        <td style="color:#FFFFFF;font-size:14px;font-weight:500;">${value}</td>
      </tr>
    </table>
  `;
}

function blockRow(label: string, value: string): string {
  return `
    <div style="margin-bottom:16px;">
      <p style="margin:0 0 6px;color:#94A3B8;font-size:13px;">${label} :</p>
      <p style="margin:0;color:#FFFFFF;font-size:14px;line-height:1.7;background:#243570;padding:12px 16px;border-radius:8px;border-left:3px solid #2BA96B;">${value.replace(/\n/g, "<br/>")}</p>
    </div>
  `;
}
