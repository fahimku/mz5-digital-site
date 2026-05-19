"use client";

import { motion } from "framer-motion";
import { Accent } from "@/components/ui/Accent";
import { Container } from "@/components/ui/Container";
import { FadeIn, FadeInStagger, staggerItem } from "@/components/motion/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { values } from "@/lib/site";

export function About() {
  return (
    <section id="about" className="py-20 lg:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading label="/ ABOUT">
              A studio that blends <Accent>clarity</Accent>, creativity and
              technology.
            </SectionHeading>

            <FadeIn delay={0.15} className="mt-8 space-y-5">
              <p className="max-w-lg text-sm leading-relaxed text-muted sm:text-base">
                MZ5 Digital is a full-service studio for branding, web
                development, SEO and performance marketing. We work with teams
                who care about craft, data and long-term impact — not one-off
                deliverables.
              </p>
              <p className="max-w-lg text-sm leading-relaxed text-muted sm:text-base">
                Based in Ontario, we collaborate with clients across Canada and
                internationally. Senior strategists and builders stay on your
                project from discovery through deployment.
              </p>
            </FadeIn>
          </div>

          <FadeInStagger className="space-y-8">
            {values.map((item) => (
              <motion.div
                key={item.title}
                variants={staggerItem}
                className="border-l border-accent/50 pl-6"
              >
                <h3 className="text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </FadeInStagger>
        </div>
      </Container>
    </section>
  );
}
