import type { LegalSection } from "@/components/legal/LegalPage";

export const termsOfService = {
  label: "LEGAL",
  title: "Terms of Service",
  lastUpdated: "May 19, 2026",
  intro:
    "These Terms of Service (“Terms”) govern your use of the MZ5 Digital website and any engagement with our agency services. By accessing this site or working with us, you agree to these Terms.",
  sections: [
    {
      title: "Use of our website",
      content: [
        "You may use our website for lawful purposes only. You agree not to misuse the site, attempt unauthorized access, interfere with its operation, or use it to transmit harmful or unlawful content.",
        "Content on this website—including text, graphics, logos, and designs—is owned by MZ5 Digital or our licensors and is protected by intellectual property laws. You may not copy, reproduce, or distribute site content without our prior written consent.",
      ],
    },
    {
      title: "Services and proposals",
      content: [
        "Descriptions of our services on this website are for general information and do not constitute a binding offer. Specific scope, deliverables, timelines, and fees are defined only in a signed proposal, statement of work, or service agreement.",
        "We reserve the right to decline projects that are outside our expertise, capacity, or alignment with our values.",
      ],
    },
    {
      title: "Client responsibilities",
      content: [
        "When engaged for a project, clients agree to provide timely feedback, assets, and approvals needed for us to deliver work. Delays in client input may affect timelines and are not the responsibility of MZ5 Digital.",
        "Clients are responsible for ensuring that materials they supply do not infringe third-party rights and that they have authority to approve use of trademarks, content, and brand assets.",
      ],
    },
    {
      title: "Payment terms",
      content: [
        "Payment terms, including deposits, milestones, and invoicing schedules, are set out in your project agreement. Late payments may pause work until accounts are brought current.",
        "Unless otherwise agreed in writing, fees are exclusive of applicable taxes.",
      ],
    },
    {
      title: "Intellectual property",
      content: [
        "Upon full payment, clients receive rights to final deliverables as specified in the project agreement. MZ5 Digital retains the right to showcase completed work in our portfolio unless otherwise agreed in writing.",
        "Pre-existing tools, frameworks, templates, and methodologies remain the property of MZ5 Digital.",
      ],
    },
    {
      title: "Confidentiality",
      content: [
        "Both parties agree to treat non-public business information shared during a project as confidential, except where disclosure is required by law or the information is already public through no fault of the receiving party.",
      ],
    },
    {
      title: "Disclaimer of warranties",
      content: [
        "Our website and services are provided on an “as is” and “as available” basis. To the fullest extent permitted by law, we disclaim warranties of merchantability, fitness for a particular purpose, and non-infringement.",
        "We do not guarantee specific business outcomes, search rankings, revenue results, or campaign performance unless explicitly stated in a signed agreement.",
      ],
    },
    {
      title: "Limitation of liability",
      content: [
        "To the maximum extent permitted by law, MZ5 Digital shall not be liable for indirect, incidental, special, consequential, or punitive damages arising from your use of the website or our services.",
        "Our total liability for any claim related to a project shall not exceed the fees paid to us for that project in the twelve (12) months preceding the claim, unless otherwise required by law.",
      ],
    },
    {
      title: "Indemnification",
      content: [
        "You agree to indemnify and hold MZ5 Digital harmless from claims arising from your misuse of the website, violation of these Terms, or infringement of third-party rights through materials you provide.",
      ],
    },
    {
      title: "Termination",
      content: [
        "Either party may terminate a project agreement according to its terms. We may suspend or terminate website access if these Terms are violated.",
      ],
    },
    {
      title: "Governing law",
      content: [
        "These Terms are governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein, without regard to conflict of law principles. Disputes shall be subject to the exclusive jurisdiction of the courts in Ontario, Canada.",
      ],
    },
    {
      title: "Changes to these Terms",
      content: [
        "We may update these Terms from time to time. Continued use of the website after changes are posted constitutes acceptance of the revised Terms.",
      ],
    },
  ] satisfies LegalSection[],
};
