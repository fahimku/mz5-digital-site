import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export const metadata: Metadata = {
  title: "SEO",
  description:
    "Technical SEO, content strategy and organic growth from MZ5 Digital.",
};

export default function SeoPage() {
  return <ServicePageTemplate slug="seo" />;
}
