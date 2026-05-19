"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { Accent } from "@/components/ui/Accent";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import type { ServiceSlug } from "@/lib/site";
import { servicePages } from "@/lib/site";

type ServicePageTemplateProps = {
  slug: ServiceSlug;
};

export function ServicePageTemplate({ slug }: ServicePageTemplateProps) {
  const page = servicePages[slug];
  const parts = page.headline.split(page.accent);

  return (
    <article className="pt-28 pb-20 lg:pt-36 lg:pb-28">
      <Container>
        <FadeIn>
          <Link
            href="/#services"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            All services
          </Link>
        </FadeIn>

        <FadeIn delay={0.05}>
          <p className="mb-4 text-xs font-medium tracking-[0.2em] text-accent uppercase">
            / {page.title.toUpperCase()}
          </p>
          <h1 className="max-w-3xl text-4xl leading-tight font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {parts[0]}
            <Accent>{page.accent}</Accent>
            {parts[1] ?? ""}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
            {page.description}
          </p>
          <div className="mt-10">
            <Button href="/#contact">Start a project</Button>
          </div>
        </FadeIn>

        <div className="mt-20 grid gap-12 lg:grid-cols-2">
          <FadeIn delay={0.1}>
            <h2 className="mb-6 text-lg font-semibold text-white">What we do</h2>
            <ul className="space-y-4">
              {page.features.map((feature) => (
                <li
                  key={feature}
                  className="flex gap-3 text-sm leading-relaxed text-muted"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {feature}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h2 className="mb-6 text-lg font-semibold text-white">Deliverables</h2>
            <ul className="space-y-3">
              {page.deliverables.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="rounded-xl border border-white/10 bg-card px-4 py-3 text-sm text-zinc-300"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </Container>
    </article>
  );
}
