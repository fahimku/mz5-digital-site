export type ContactFormData = {
  name: string;
  email: string;
  company: string;
  budget: string;
  message: string;
};

const brand = {
  accent: "#ff7a50",
  bg: "#0a0a0a",
  card: "#141414",
  text: "#ffffff",
  muted: "#a1a1aa",
  border: "rgba(255,255,255,0.1)",
};

function layout(content: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>MZ5 Digital</title>
</head>
<body style="margin:0;padding:0;background-color:${brand.bg};font-family:'Segoe UI',system-ui,-apple-system,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:${brand.bg};padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;">
          <tr>
            <td style="padding-bottom:24px;">
              <span style="font-size:18px;font-weight:600;color:${brand.text};letter-spacing:-0.02em;">MZ5</span>
              <span style="font-size:18px;color:${brand.muted};"> Digital</span>
            </td>
          </tr>
          ${content}
          <tr>
            <td style="padding-top:32px;border-top:1px solid ${brand.border};">
              <p style="margin:0;font-size:12px;color:${brand.muted};line-height:1.6;">
                MZ5 Digital · Ontario, Canada<br />
                <a href="https://mz5digital.com" style="color:${brand.accent};text-decoration:none;">mz5digital.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:12px 0;border-bottom:1px solid ${brand.border};">
      <p style="margin:0 0 4px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:${brand.muted};">${label}</p>
      <p style="margin:0;font-size:15px;color:${brand.text};line-height:1.5;white-space:pre-wrap;">${escapeHtml(value)}</p>
    </td>
  </tr>`;
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function adminNotificationEmail(data: ContactFormData) {
  const html = layout(`
    <tr>
      <td style="padding-bottom:8px;">
        <p style="margin:0;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.15em;color:${brand.accent};">New project inquiry</p>
      </td>
    </tr>
    <tr>
      <td style="padding-bottom:24px;">
        <h1 style="margin:0;font-size:24px;font-weight:600;color:${brand.text};letter-spacing:-0.02em;">Contact form submission</h1>
        <p style="margin:8px 0 0;font-size:14px;color:${brand.muted};">Submitted via the MZ5 Digital website.</p>
      </td>
    </tr>
    <tr>
      <td style="background-color:${brand.card};border:1px solid ${brand.border};border-radius:12px;padding:8px 20px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          ${row("Name", data.name)}
          ${row("Email", data.email)}
          ${row("Company", data.company || "—")}
          ${row("Budget", data.budget)}
          ${row("Project goals", data.message)}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding-top:24px;">
        <a href="mailto:${escapeHtml(data.email)}" style="display:inline-block;background-color:${brand.accent};color:#000000;font-size:14px;font-weight:600;text-decoration:none;padding:12px 24px;border-radius:999px;">Reply to ${escapeHtml(data.name)}</a>
      </td>
    </tr>
  `);

  const text = `New contact form submission — MZ5 Digital

Name: ${data.name}
Email: ${data.email}
Company: ${data.company || "—"}
Budget: ${data.budget}

Project goals:
${data.message}`;

  return {
    subject: `New inquiry from ${data.name} — MZ5 Digital`,
    html,
    text,
  };
}

export function userConfirmationEmail(data: ContactFormData) {
  const html = layout(`
    <tr>
      <td style="padding-bottom:8px;">
        <p style="margin:0;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.15em;color:${brand.accent};">We received your message</p>
      </td>
    </tr>
    <tr>
      <td style="padding-bottom:24px;">
        <h1 style="margin:0;font-size:24px;font-weight:600;color:${brand.text};letter-spacing:-0.02em;">Thanks, ${escapeHtml(data.name.split(" ")[0])}.</h1>
        <p style="margin:12px 0 0;font-size:15px;color:${brand.muted};line-height:1.6;">
          Your project inquiry has been received. A member of our team will review it and get back to you within one business day.
        </p>
      </td>
    </tr>
    <tr>
      <td style="background-color:${brand.card};border:1px solid ${brand.border};border-radius:12px;padding:20px;">
        <p style="margin:0 0 12px;font-size:13px;font-weight:600;color:${brand.text};">Your submission summary</p>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          ${row("Budget", data.budget)}
          ${row("Project goals", data.message)}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding-top:24px;">
        <p style="margin:0;font-size:14px;color:${brand.muted};line-height:1.6;">
          Questions in the meantime? Reply to this email or reach us at
          <a href="mailto:hello@mz5digital.com" style="color:${brand.accent};text-decoration:none;">hello@mz5digital.com</a>.
        </p>
      </td>
    </tr>
  `);

  const text = `Hi ${data.name.split(" ")[0]},

Thanks for reaching out to MZ5 Digital. We've received your project inquiry and will be in touch within one business day.

Your submission:
Budget: ${data.budget}
Project goals: ${data.message}

— MZ5 Digital
Ontario, Canada`;

  return {
    subject: "We received your message — MZ5 Digital",
    html,
    text,
  };
}
