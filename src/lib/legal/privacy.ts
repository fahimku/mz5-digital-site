import type { LegalSection } from "@/components/legal/LegalPage";

export const privacyPolicy = {
  label: "LEGAL",
  title: "Privacy Policy",
  lastUpdated: "May 19, 2026",
  intro:
    "MZ5 Digital (“we”, “us”, or “our”) respects your privacy. This policy explains how we collect, use, and protect personal information when you visit our website or contact us about our services.",
  sections: [
    {
      title: "Information we collect",
      content: [
        "Contact information you provide through our contact form, including your name, email address, company name, budget range, and project details.",
        "Technical information collected automatically when you visit our site, such as your IP address, browser type, device information, and pages viewed. This may include data collected through cookies and similar technologies.",
      ],
    },
    {
      title: "How we use your information",
      content: [
        "To respond to your inquiries and provide our branding, web development, SEO, and marketing services.",
        "To improve our website, communications, and client experience.",
        "To send service-related messages, including confirmations when you submit our contact form.",
        "To comply with legal obligations and protect our rights where required.",
      ],
    },
    {
      title: "Legal basis (where applicable)",
      content: [
        "We process personal information based on your consent (for example, when you submit a contact form), our legitimate interests in operating and improving our business, and compliance with applicable law.",
      ],
    },
    {
      title: "Sharing your information",
      content: [
        "We do not sell your personal information. We may share data with trusted service providers who help us operate our website and deliver services (such as email delivery and hosting), subject to confidentiality obligations.",
        "We may disclose information if required by law or to protect the safety and rights of MZ5 Digital, our clients, or others.",
      ],
    },
    {
      title: "Data retention",
      content: [
        "We retain personal information only as long as necessary to fulfill the purposes described in this policy, unless a longer retention period is required by law.",
      ],
    },
    {
      title: "Security",
      content: [
        "We implement reasonable technical and organizational measures to protect personal information. No method of transmission over the internet is completely secure, and we cannot guarantee absolute security.",
      ],
    },
    {
      title: "Your rights",
      content: [
        "Depending on your location, you may have rights to access, correct, delete, or restrict the processing of your personal information, and to withdraw consent where processing is consent-based.",
        "Residents of Canada may have rights under applicable privacy legislation, including PIPEDA. To exercise your rights, contact us at hello@mz5digital.com.",
      ],
    },
    {
      title: "Cookies",
      content: [
        "Our website may use cookies and analytics tools to understand how visitors use the site. You can control cookies through your browser settings. Disabling cookies may affect certain site features.",
      ],
    },
    {
      title: "Third-party links",
      content: [
        "Our website may contain links to third-party sites. We are not responsible for the privacy practices of those sites and encourage you to review their policies.",
      ],
    },
    {
      title: "Changes to this policy",
      content: [
        "We may update this Privacy Policy from time to time. The “Last updated” date at the top of this page will reflect any changes. Continued use of our website after changes constitutes acceptance of the updated policy.",
      ],
    },
  ] satisfies LegalSection[],
};
