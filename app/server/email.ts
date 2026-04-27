// E-post-utsending via Resend, med konsoll-fallback når RESEND_API_KEY mangler.
// Resend importeres dynamisk slik at SDK-en kun lastes når nøkkelen er satt.

const FROM = process.env.EMAIL_FROM || 'Menighetsportalen <noreply@menighetsportalen.no>';
const RESEND_KEY = process.env.RESEND_API_KEY;

let resendClient: { emails: { send: (args: unknown) => Promise<unknown> } } | null = null;

async function getResend() {
  if (!RESEND_KEY) return null;
  if (resendClient) return resendClient;
  const mod = await import('resend');
  resendClient = new mod.Resend(RESEND_KEY) as unknown as typeof resendClient;
  return resendClient;
}

interface VerificationEmail {
  to: string;
  contactName: string;
  churchName: string;
  slug: string;
  verifyUrl: string;
}

export async function sendVerificationEmail(args: VerificationEmail): Promise<void> {
  const { to, contactName, churchName, slug, verifyUrl } = args;
  const subject = `Bekreft registreringen for ${churchName}`;
  const html = renderVerificationHtml({ contactName, churchName, slug, verifyUrl });
  const text = renderVerificationText({ contactName, churchName, slug, verifyUrl });

  const client = await getResend();
  if (!client) {
    console.log('--- E-POST (RESEND_API_KEY mangler — logger til konsoll) ---');
    console.log('Til:     ', to);
    console.log('Fra:     ', FROM);
    console.log('Emne:    ', subject);
    console.log('Lenke:   ', verifyUrl);
    console.log('-------------------------------------------------------------');
    return;
  }

  try {
    await client.emails.send({ from: FROM, to, subject, html, text });
  } catch (err) {
    console.error('Resend-feil ved sending av verifiseringsepost:', err);
    throw err;
  }
}

function renderVerificationText(args: Omit<VerificationEmail, 'to'>): string {
  return [
    `Hei ${args.contactName},`,
    '',
    `Takk for at du registrerte ${args.churchName} på Menighetsportalen.`,
    `Bekreft e-postadressen din for å fullføre registreringen:`,
    '',
    args.verifyUrl,
    '',
    `Når du bekrefter, gjør vi klar ${args.slug}.menighetsportalen.no og kontakter deg innen 24 timer for å hjelpe deg i gang.`,
    '',
    'Hvis du ikke registrerte deg, kan du ignorere denne e-posten.',
    '',
    'Vennlig hilsen,',
    'Menighetsportalen',
  ].join('\n');
}

function renderVerificationHtml(args: Omit<VerificationEmail, 'to'>): string {
  const safe = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  return `<!doctype html>
<html lang="nb">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Bekreft registreringen</title>
</head>
<body style="margin:0;padding:0;background:#FAF9F7;font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif;color:#1A1A1A;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#FAF9F7;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="560" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;background:#FFFFFF;border:1px solid #E5E2DD;border-radius:16px;overflow:hidden;">
          <tr>
            <td style="padding:40px 40px 24px;">
              <h1 style="margin:0 0 16px;font-family:Georgia,'Playfair Display',serif;font-size:28px;font-weight:600;color:#1A1A1A;">
                Bekreft registreringen
              </h1>
              <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#4A4A4A;">
                Hei ${safe(args.contactName)},
              </p>
              <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#4A4A4A;">
                Takk for at du registrerte <strong>${safe(args.churchName)}</strong> på Menighetsportalen. Klikk under for å bekrefte e-postadressen din.
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="border-radius:9999px;background:#2D5A4A;">
                    <a href="${safe(args.verifyUrl)}" style="display:inline-block;padding:14px 32px;font-size:16px;font-weight:500;color:#FFFFFF;text-decoration:none;">
                      Bekreft e-post
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:24px 0 0;font-size:14px;line-height:1.6;color:#636363;">
                Eller kopier denne lenken inn i nettleseren:<br>
                <a href="${safe(args.verifyUrl)}" style="color:#2D5A4A;word-break:break-all;">${safe(args.verifyUrl)}</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 32px;">
              <hr style="border:none;border-top:1px solid #E5E2DD;margin:24px 0;">
              <p style="margin:0 0 8px;font-size:14px;line-height:1.6;color:#636363;">
                Når du bekrefter, gjør vi klar <code style="background:#FAF9F7;padding:2px 6px;border-radius:4px;border:1px solid #E5E2DD;font-family:monospace;font-size:13px;">${safe(args.slug)}.menighetsportalen.no</code> og kontakter deg innen 24 timer.
              </p>
              <p style="margin:16px 0 0;font-size:13px;line-height:1.6;color:#9C9C9C;">
                Hvis du ikke registrerte deg, kan du ignorere denne e-posten.
              </p>
            </td>
          </tr>
        </table>
        <p style="margin:24px 0 0;font-size:12px;color:#9C9C9C;">
          © ${new Date().getFullYear()} Menighetsportalen — Designblokk
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
