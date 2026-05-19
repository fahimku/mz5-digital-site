import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

export const metadata: Metadata = {
  title: "PPC",
  description:
    "Google Ads and performance marketing campaigns from MZ5 Digital.",
};

export default function PpcPage() {
  return <ServicePageTemplate slug="ppc" />;
}
