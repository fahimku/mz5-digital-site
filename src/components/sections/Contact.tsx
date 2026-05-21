"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Accent } from "@/components/ui/Accent";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  hasContactFieldErrors,
  submitToWeb3Forms,
  validateContactFields,
  type ContactField,
  type ContactFieldErrors,
} from "@/lib/web3forms";
import { budgetOptions } from "@/lib/site";

type FormStatus = "idle" | "loading" | "success" | "error";

const fieldClass = (hasError: boolean) =>
  `w-full rounded-xl border bg-black/70 px-4 py-3 text-sm text-white placeholder:text-zinc-500 transition focus:outline-none focus:ring-1 disabled:opacity-50 ${
    hasError
      ? "border-red-400/60 focus:border-red-400/70 focus:ring-red-400/25"
      : "border-white/10 focus:border-accent/50 focus:ring-accent/30"
  }`;

export function Contact() {
  const [budget, setBudget] = useState<string | null>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});

  function clearFieldError(field: ContactField) {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      company: String(formData.get("company") ?? "").trim(),
      budget: budget ?? "",
      message: String(formData.get("message") ?? "").trim(),
    };

    const errors = validateContactFields(payload);
    if (hasContactFieldErrors(errors)) {
      setFieldErrors(errors);
      setStatus("error");
      const firstInvalid = form.querySelector<HTMLElement>("[aria-invalid='true']");
      firstInvalid?.focus();
      return;
    }

    setFieldErrors({});
    setStatus("loading");

    try {
      await submitToWeb3Forms(payload);
      setStatus("success");
      form.reset();
      setBudget(null);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Network error. Please check your connection and try again."
      );
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
              noValidate
              className="surface-panel space-y-5 rounded-2xl p-6 sm:p-8"
            >
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />
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
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setFieldErrors({});
                      setSubmitError(null);
                    }}
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
                      error={fieldErrors.name}
                      onChange={() => clearFieldError("name")}
                    />
                    <Field
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      required
                      disabled={status === "loading"}
                      error={fieldErrors.email}
                      onChange={() => clearFieldError("email")}
                    />
                  </div>
                  <Field
                    label="Company"
                    name="company"
                    placeholder="Company name"
                    disabled={status === "loading"}
                    error={fieldErrors.company}
                    onChange={() => clearFieldError("company")}
                  />

                  <div>
                    <label className="mb-2 block text-xs font-medium tracking-wide text-zinc-400 uppercase">
                      Budget
                      <span className="ml-1 text-accent">*</span>
                    </label>
                    <div
                      className={`flex flex-wrap gap-2 ${
                        fieldErrors.budget
                          ? "rounded-xl p-2 ring-1 ring-inset ring-red-400/50"
                          : ""
                      }`}
                      role="group"
                      aria-invalid={fieldErrors.budget ? true : undefined}
                      aria-describedby={
                        fieldErrors.budget ? "budget-error" : undefined
                      }
                    >
                      {budgetOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          disabled={status === "loading"}
                          onClick={() => {
                            setBudget(option);
                            clearFieldError("budget");
                          }}
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
                    <FieldError id="budget-error" message={fieldErrors.budget} />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-xs font-medium tracking-wide text-zinc-400 uppercase"
                    >
                      Project goals
                      <span className="ml-1 text-accent">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      disabled={status === "loading"}
                      placeholder="Tell us about your project..."
                      aria-invalid={fieldErrors.message ? true : undefined}
                      aria-describedby={
                        fieldErrors.message ? "message-error" : undefined
                      }
                      onChange={() => clearFieldError("message")}
                      className={fieldClass(Boolean(fieldErrors.message))}
                    />
                    <FieldError id="message-error" message={fieldErrors.message} />
                  </div>

                  {submitError && (
                    <p className="text-sm text-red-400" role="alert">
                      {submitError}
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

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-xs text-red-400" role="alert">
      {message}
    </p>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  disabled,
  error,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  onChange?: () => void;
}) {
  const errorId = `${name}-error`;

  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-xs font-medium tracking-wide text-zinc-400 uppercase"
      >
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onChange={onChange}
        className={fieldClass(Boolean(error))}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}
