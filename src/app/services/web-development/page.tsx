import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Web Development",
  description:
    "Next.js marketing sites and web applications from MZ5 Digital.",
};

export default function WebDevelopmentPage() {
  return <ServicePageTemplate slug="web-development" />;
}
