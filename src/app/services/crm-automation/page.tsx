import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export const metadata: Metadata = {
  title: "CRM & Automation",
  description:
    "CRM setup, marketing automation and integrations from MZ5 Digital.",
};

export default function CrmAutomationPage() {
  return <ServicePageTemplate slug="crm-automation" />;
}
