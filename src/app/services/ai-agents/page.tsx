import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export const metadata: Metadata = {
  title: "AI Agents",
  description: "Custom AI agents for support and operations from MZ5 Digital.",
};

export default function AiAgentsPage() {
  return <ServicePageTemplate slug="ai-agents" />;
}
