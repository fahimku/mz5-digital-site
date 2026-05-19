import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Branding",
  description:
    "Brand strategy, visual identity and guidelines from MZ5 Digital.",
};

export default function BrandingPage() {
  return <ServicePageTemplate slug="branding" />;
}
