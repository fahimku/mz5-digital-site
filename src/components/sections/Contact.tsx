"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Accent } from "@/components/ui/Accent";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { budgetOptions } from "@/lib/site";

type FormStatus = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [budget, setBudget] = useState<string | null>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!budget) {
      setError("Please select a budget range.");
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      company: String(formData.get("company") ?? "").trim(),
      budget,
      message: String(formData.get("message") ?? "").trim(),
    };

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
      setBudget(null);
    } catch {
      setError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="border-t border-white/10 py-20 lg:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <SectionHeading label="/ CONTACT">
            Have an ambitious project?{" "}
            <Accent>Let&apos;s make it inevitable</Accent>.
          </SectionHeading>

          <FadeIn delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="space-y-5 rounded-2xl border border-white/10 bg-card p-6 sm:p-8"
            >
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-12 text-center"
                >
                  <p className="text-base font-medium text-white">
                    Message sent successfully
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    Thanks — we&apos;ll be in touch within one business day.
                    Check your inbox for a confirmation email.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-sm text-accent hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Name"
                      name="name"
                      placeholder="Your name"
                      required
                      disabled={status === "loading"}
                    />
                    <Field
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      required
                      disabled={status === "loading"}
                    />
                  </div>
                  <Field
                    label="Company"
                    name="company"
                    placeholder="Company name"
                    disabled={status === "loading"}
                  />

                  <div>
                    <label className="mb-2 block text-xs font-medium tracking-wide text-zinc-400 uppercase">
                      Budget
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {budgetOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          disabled={status === "loading"}
                          onClick={() => setBudget(option)}
                          className={`rounded-full border px-3 py-1.5 text-xs transition disabled:opacity-50 ${
                            budget === option
                              ? "border-accent bg-accent/10 text-accent"
                              : "border-white/10 text-muted hover:border-white/25"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-xs font-medium tracking-wide text-zinc-400 uppercase"
                    >
                      Project goals
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      minLength={10}
                      disabled={status === "loading"}
                      placeholder="Tell us about your project..."
                      className="w-full resize-none rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30 disabled:opacity-50"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-400" role="alert">
                      {error}
                    </p>
                  )}

                  <Button
                    type="submit"
                    className="w-full !rounded-xl"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      "Send message"
                    )}
                  </Button>
                </>
              )}
            </form>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  disabled,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-xs font-medium tracking-wide text-zinc-400 uppercase"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30 disabled:opacity-50"
      />
    </div>
  );
}
