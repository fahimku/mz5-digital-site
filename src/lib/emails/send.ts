import { siteConfig } from "@/lib/site";
import type { ContactFormData } from "./types";

/** Inbox for contact form — override with CONTACT_TO_EMAIL in Cloudflare if needed */
function getRecipient() {
  return process.env.CONTACT_TO_EMAIL ?? siteConfig.contactInbox;
}

/**
 * Sends form submissions via FormSubmit (no API key required).
 * First deploy: check muhammad.fahim@mz5digital.com for a one-time activation link from FormSubmit.
 */
export async function sendContactEmails(data: ContactFormData) {
  const to = getRecipient();
  const url = `https://formsubmit.co/ajax/${encodeURIComponent(to)}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      _subject: `New inquiry from ${data.name} — MZ5 Digital`,
      _template: "table",
      _captcha: false,
      _autoresponse: `Hi ${data.name.split(" ")[0]}, thanks for reaching out to MZ5 Digital. We'll be in touch within one business day.`,
      name: data.name,
      email: data.email,
      company: data.company || "—",
      budget: data.budget,
      message: data.message,
    }),
  });

  let result: { success?: string };
  try {
    result = (await response.json()) as { success?: string };
  } catch {
    throw new Error("Email service returned an invalid response");
  }

  if (!response.ok || result.success !== "true") {
    throw new Error("Failed to deliver your message. Please try again shortly.");
  }

  return result;
}
