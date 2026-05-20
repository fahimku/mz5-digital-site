import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export const metadata: Metadata = {
  title: "AI Consulting",
  description:
    "AI strategy, roadmaps and adoption consulting from MZ5 Digital.",
};

export default function AiConsultingPage() {
  return <ServicePageTemplate slug="ai-consulting" />;
}
