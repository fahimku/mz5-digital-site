import type { ContactFormData } from "@/lib/emails/types";

type Web3FormsResponse = {
  success?: boolean;
  message?: string;
  body?: {
    message?: string;
    data?: Record<string, unknown>;
  };
};

export function getWeb3FormsAccessKey() {
  return process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim() || "";
}

/**
 * Web3Forms must be called from the browser on the free plan.
 * Server-side fetch is blocked by Cloudflare (403 HTML challenge).
 */
export async function submitToWeb3Forms(data: ContactFormData) {
  const accessKey = getWeb3FormsAccessKey();
  if (!accessKey) {
    throw new Error(
      "Contact form is not configured. Add NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY to .env"
    );
  }

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `New inquiry from ${data.name} — MZ5 Digital`,
      from_name: "MZ5 Digital Website",
      name: data.name,
      email: data.email,
      replyto: data.email,
      botcheck: "",
      message: formatMessage(data),
    }),
  });

  const text = await response.text();

  if (text.startsWith("<!DOCTYPE") || text.startsWith("<html")) {
    throw new Error(
      "Could not reach the email service. Please try again or email hello@mz5digital.com."
    );
  }

  let result: Web3FormsResponse;
  try {
    result = JSON.parse(text) as Web3FormsResponse;
  } catch {
    throw new Error("Email service returned an invalid response.");
  }

  if (!response.ok || result.success !== true) {
    throw new Error(
      result.body?.message ??
        result.message ??
        "Failed to deliver your message. Please try again."
    );
  }
}

function formatMessage(data: ContactFormData) {
  return [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company || "—"}`,
    `Budget: ${data.budget}`,
    "",
    "Project goals:",
    data.message,
  ].join("\n");
}

export function validateContactPayload(data: ContactFormData): string | null {
  if (data.name.length < 2) return "Name must be at least 2 characters.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return "Please enter a valid email address.";
  }
  if (!data.budget) return "Please select a budget range.";
  if (data.message.length < 10) {
    return "Please share a bit more about your project.";
  }
  return null;
}
