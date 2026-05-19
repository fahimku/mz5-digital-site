"use client";

import { Accent } from "@/components/ui/Accent";
import { Container } from "@/components/ui/Container";
import { FadeInStagger } from "@/components/motion/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { services } from "@/lib/site";

export function Services() {
  return (
    <section id="services" className="py-20 lg:py-32">
      <Container>
        <SectionHeading label="/ SERVICES">
          One studio, every layer of your <Accent>digital stack</Accent>.
        </SectionHeading>

        <FadeInStagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </FadeInStagger>
      </Container>
    </section>
  );
}
