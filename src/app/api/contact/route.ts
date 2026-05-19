import { NextResponse } from "next/server";
import { z } from "zod";
import { sendContactEmails } from "@/lib/emails/send";
import { budgetOptions } from "@/lib/site";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().max(100).optional().default(""),
  budget: z.enum(budgetOptions as unknown as [string, ...string[]], {
    message: "Please select a budget range",
  }),
  message: z
    .string()
    .min(10, "Please share a bit more about your project")
    .max(5000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? "Invalid form data";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    await sendContactEmails(parsed.data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[contact]", error);
    const message =
      error instanceof Error ? error.message : "Failed to send message";
    const isConfig = message.includes("RESEND_API_KEY");

    return NextResponse.json(
      {
        error: isConfig
          ? "Email service is not configured. Please try again later."
          : "Something went wrong. Please try again or email us directly.",
      },
      { status: isConfig ? 503 : 500 },
    );
  }
}
