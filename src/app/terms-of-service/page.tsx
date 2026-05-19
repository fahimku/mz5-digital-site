import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { termsOfService } from "@/lib/legal/terms";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms governing use of the MZ5 Digital website and agency services.",
};

export default function TermsOfServicePage() {
  return <LegalPage {...termsOfService} />;
}
