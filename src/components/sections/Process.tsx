"use client";

import { motion } from "framer-motion";
import { Accent } from "@/components/ui/Accent";
import { Container } from "@/components/ui/Container";
import { FadeInStagger, staggerItem } from "@/components/motion/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/lib/site";

export function Process() {
  return (
    <section id="process" className="border-y border-white/10 py-20 lg:py-32">
      <Container>
        <SectionHeading label="/ PROCESS">
          A clear path from <Accent>brief</Accent> to <Accent>growth</Accent>.
        </SectionHeading>

        <FadeInStagger className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step) => (
            <motion.div key={step.step} variants={staggerItem}>
              <span className="text-sm font-medium text-accent">{step.step}</span>
              <h3 className="mt-3 text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </motion.div>
          ))}
        </FadeInStagger>
      </Container>
    </section>
  );
}
