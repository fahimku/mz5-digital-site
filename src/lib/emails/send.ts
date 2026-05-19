import { Resend } from "resend";
import {
  adminNotificationEmail,
  userConfirmationEmail,
  type ContactFormData,
} from "./templates";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

function getFromAddress() {
  return (
    process.env.CONTACT_FROM_EMAIL ?? "MZ5 Digital <onboarding@resend.dev>"
  );
}

function getAdminEmail() {
  return process.env.CONTACT_TO_EMAIL ?? "muhammad.fahim@mz5digital.com";
}

export async function sendContactEmails(data: ContactFormData) {
  const resend = getResend();
  if (!resend) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const from = getFromAddress();
  const adminEmail = getAdminEmail();
  const admin = adminNotificationEmail(data);
  const confirmation = userConfirmationEmail(data);

  const [adminResult, userResult] = await Promise.all([
    resend.emails.send({
      from,
      to: adminEmail,
      replyTo: data.email,
      subject: admin.subject,
      html: admin.html,
      text: admin.text,
    }),
    resend.emails.send({
      from,
      to: data.email,
      subject: confirmation.subject,
      html: confirmation.html,
      text: confirmation.text,
    }),
  ]);

  if (adminResult.error) {
    throw new Error(adminResult.error.message);
  }
  if (userResult.error) {
    throw new Error(userResult.error.message);
  }

  return { adminId: adminResult.data?.id, userId: userResult.data?.id };
}
