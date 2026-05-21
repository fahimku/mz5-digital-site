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

export type ContactField = "name" | "email" | "company" | "budget" | "message";

export type ContactFieldErrors = Partial<Record<ContactField, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactFields(
  data: ContactFormData
): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  const name = data.name.trim();
  if (!name) errors.name = "Name is required.";
  else if (name.length < 2) errors.name = "Name must be at least 2 characters.";
  else if (name.length > 100) errors.name = "Name must be 100 characters or less.";

  const email = data.email.trim();
  if (!email) errors.email = "Email is required.";
  else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (data.company.length > 100) {
    errors.company = "Company must be 100 characters or less.";
  }

  if (!data.budget) errors.budget = "Please select a budget range.";

  const message = data.message.trim();
  if (!message) errors.message = "Project goals are required.";
  else if (message.length < 10) {
    errors.message = "Please share a bit more (at least 10 characters).";
  } else if (message.length > 5000) {
    errors.message = "Message must be 5000 characters or less.";
  }

  return errors;
}

export function hasContactFieldErrors(errors: ContactFieldErrors) {
  return Object.keys(errors).length > 0;
}
