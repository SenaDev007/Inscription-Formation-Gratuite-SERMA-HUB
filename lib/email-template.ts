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

  // Normalize Beninese WhatsApp number → always 22995722234 format
  // Handles: 95722234 / 0195722234 / +2290195722234 / 22995722234
  const waNumber = (() => {
    let n = whatsapp.replace(/[\s\-\(\)\.+]/g, "");
    if (n.startsWith("229")) n = n.slice(3);   // strip country code
    if (n.startsWith("01"))  n = n.slice(2);   // strip Benin 10-digit prefix
    if (n.startsWith("0"))   n = n.slice(1);   // strip any remaining leading 0
    return "229" + n;
  })();
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
              <p style="margin:8px 0 0;color:#94A3B8;font-size:13px;">Jeudi 23 · Vendredi 24 · Samedi 25 Avril 2026</p>
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
                <table cellpadding="0" cellspacing="0" style="display:inline-table;">
                  <tr>
                    <td style="vertical-align:middle;padding-right:10px;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#FFFFFF" style="display:block;">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </td>
                    <td style="vertical-align:middle;color:#FFFFFF;font-size:15px;font-weight:700;white-space:nowrap;">
                      Ouvrir la discussion WhatsApp
                    </td>
                  </tr>
                </table>
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
