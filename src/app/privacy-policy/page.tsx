import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { privacyPolicy } from "@/lib/legal/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How MZ5 Digital collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return <LegalPage {...privacyPolicy} />;
}
