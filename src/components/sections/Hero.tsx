"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Accent } from "@/components/ui/Accent";
import { Container } from "@/components/ui/Container";
import { stats, siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28">
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 flex items-center gap-2"
        >
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="text-xs tracking-[0.2em] text-muted uppercase">
            {siteConfig.tagline}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-on-texture max-w-4xl text-4xl leading-[1.08] font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl"
        >
          Brands built to <Accent>grow</Accent>, systems built to{" "}
          <Accent>scale</Accent>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-on-texture mt-6 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg"
        >
          We partner with ambitious teams on branding, web development, SEO and
          performance marketing — design and engineering in one studio.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button href="/#contact">Start a project</Button>
          <Button href="#" variant="secondary">
            <Play className="h-4 w-4 fill-current" />
            Play showreel
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 sm:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-semibold tracking-tight text-white lg:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
