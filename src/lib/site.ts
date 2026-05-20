export const siteConfig = {
  name: "MZ5 Digital",
  tagline: "DIGITAL AGENCY · ONTARIO, CANADA",
  email: "hello@mz5digital.com",
  contactInbox: "muhammad.fahim@mz5digital.com",
  copyright: "© 2026 MZ5 Digital. All rights reserved.",
};

export const navLinks = [
  { label: "Process", href: "/#process" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;

export const marketingLinks = [
  {
    label: "Web Development",
    href: "/services/web-development",
    description: "Fast, scalable sites & web apps",
  },
  {
    label: "Online Advertising",
    href: "/services/ppc",
    description: "Paid search, social & performance",
  },
  {
    label: "CRM & Automation",
    href: "/services/crm-automation",
    description: "HubSpot, workflows & integrations",
  },
] as const;

export const aiLinks = [
  {
    label: "AI Consulting",
    href: "/services/ai-consulting",
    description: "Strategy, roadmaps & adoption",
  },
  {
    label: "AI Agents",
    href: "/services/ai-agents",
    description: "Custom agents for ops & support",
  },
] as const;

/** @deprecated Use marketingLinks — kept for homepage/footer sections still on legacy slugs */
export const serviceLinks = [
  ...marketingLinks,
  { label: "Branding", href: "/services/branding", description: "Identity & visual systems" },
  { label: "SEO", href: "/services/seo", description: "Organic growth & technical SEO" },
] as const;

export const stats = [
  { value: "120+", label: "Projects delivered" },
  { value: "8 yrs", label: "Experience" },
  { value: "3.4M+", label: "Rev. generated" },
  { value: "24/7", label: "Support" },
] as const;

export const services = [
  {
    title: "Branding & Identity",
    description:
      "Positioning, visual systems and brand guidelines that make you unmistakable in your market.",
    tags: ["Strategy", "Logo", "Guidelines"],
    href: "/services/branding",
    icon: "palette",
  },
  {
    title: "Web Development",
    description:
      "High-performance marketing sites and web apps built on modern stacks with clean architecture.",
    tags: ["Next.js", "UI/UX", "Code"],
    href: "/services/web-development",
    icon: "code",
  },
  {
    title: "Shopify & E-commerce",
    description:
      "Conversion-focused storefronts, custom themes and integrations that scale with your revenue.",
    tags: ["Shopify", "CRO", "Integrations"],
    href: "/services/web-development",
    icon: "shopping",
  },
  {
    title: "SEO & Content",
    description:
      "Technical SEO, content strategy and authority building designed for sustainable organic growth.",
    tags: ["Technical", "Content", "Analytics"],
    href: "/services/seo",
    icon: "search",
  },
  {
    title: "Performance Marketing",
    description:
      "Paid search and social campaigns tuned for ROAS, with clear reporting and ongoing optimization.",
    tags: ["Google Ads", "Meta", "ROAS"],
    href: "/services/ppc",
    icon: "chart",
  },
  {
    title: "Creative Direction",
    description:
      "Campaign concepts, art direction and motion that keep your brand cohesive across every touchpoint.",
    tags: ["Campaigns", "Motion", "Art direction"],
    href: "/services/branding",
    icon: "sparkles",
  },
] as const;

export const processSteps = [
  {
    step: "01",
    title: "Discover",
    description:
      "We audit your brand, audience and competitors to surface opportunities and constraints.",
  },
  {
    step: "02",
    title: "Define",
    description:
      "Strategy, messaging and architecture aligned to measurable business outcomes.",
  },
  {
    step: "03",
    title: "Design",
    description:
      "Visual systems, UX flows and prototypes refined through feedback until they feel inevitable.",
  },
  {
    step: "04",
    title: "Deploy",
    description:
      "Launch, measure and iterate — with clear ownership through build, QA and optimization.",
  },
] as const;

export const values = [
  {
    title: "Results",
    description: "Every engagement ties back to revenue, leads or efficiency — not vanity metrics.",
  },
  {
    title: "Senior team",
    description: "You work directly with strategists and builders, not layers of account management.",
  },
  {
    title: "Outcome-based",
    description: "Clear milestones, transparent timelines and honest communication from day one.",
  },
] as const;

export const budgetOptions = [
  "Under $10k",
  "$10k – $25k",
  "$25k – $50k",
  "$50k+",
] as const;

export type ServiceSlug =
  | "branding"
  | "web-development"
  | "seo"
  | "ppc"
  | "crm-automation"
  | "ai-consulting"
  | "ai-agents";

export const servicePages: Record<
  ServiceSlug,
  {
    title: string;
    headline: string;
    accent: string;
    description: string;
    features: string[];
    deliverables: string[];
  }
> = {
  branding: {
    title: "Branding",
    headline: "Identity that feels inevitable, not improvised.",
    accent: "inevitable",
    description:
      "We build brand systems that scale — from positioning and voice to logos, typography and guidelines your team can actually use.",
    features: [
      "Brand strategy & positioning workshops",
      "Logo systems & visual identity",
      "Typography, colour & design tokens",
      "Brand guidelines & asset libraries",
    ],
    deliverables: [
      "Positioning narrative",
      "Logo suite & lockups",
      "Brand guidelines PDF",
      "Social & marketing templates",
    ],
  },
  "web-development": {
    title: "Web Development",
    headline: "Sites and apps built to perform under pressure.",
    accent: "perform",
    description:
      "From marketing sites to custom web applications, we ship fast, accessible experiences on modern stacks — optimized for SEO, conversion and maintainability.",
    features: [
      "Next.js & React applications",
      "Marketing & landing page builds",
      "CMS integration & content workflows",
      "Performance, accessibility & Core Web Vitals",
    ],
    deliverables: [
      "Production-ready codebase",
      "Responsive UI across devices",
      "Analytics & form integrations",
      "Deployment & handoff documentation",
    ],
  },
  seo: {
    title: "SEO",
    headline: "Organic growth you can measure and defend.",
    accent: "measure",
    description:
      "Technical foundations, content strategy and authority building — structured for rankings that compound, not spikes that fade.",
    features: [
      "Technical SEO audits & fixes",
      "Keyword research & content planning",
      "On-page optimization & schema",
      "Reporting dashboards & iteration",
    ],
    deliverables: [
      "SEO audit & roadmap",
      "Content briefs & templates",
      "Monthly performance reports",
      "Ongoing optimization sprints",
    ],
  },
  ppc: {
    title: "Online Advertising",
    headline: "Paid campaigns tuned for ROAS, not impressions.",
    accent: "ROAS",
    description:
      "Google Ads, Meta and performance campaigns with clear structure, creative testing and reporting you can trust.",
    features: [
      "Account structure & campaign setup",
      "Landing page alignment & CRO",
      "Creative testing & audience targeting",
      "Weekly optimization & reporting",
    ],
    deliverables: [
      "Campaign architecture",
      "Conversion tracking setup",
      "Creative & copy variants",
      "Performance dashboards",
    ],
  },
  "crm-automation": {
    title: "CRM & Automation",
    headline: "Systems that connect your stack and follow up for you.",
    accent: "connect",
    description:
      "We implement CRMs, marketing automation and integrations so leads flow cleanly from first touch to closed deal.",
    features: [
      "HubSpot & CRM setup",
      "Lead routing & lifecycle stages",
      "Email workflows & nurture sequences",
      "Zapier, webhooks & custom integrations",
    ],
    deliverables: [
      "CRM architecture & pipeline design",
      "Automation playbooks",
      "Integration map & documentation",
      "Team training & handoff",
    ],
  },
  "ai-consulting": {
    title: "AI Consulting",
    headline: "Practical AI strategy tied to real business outcomes.",
    accent: "outcomes",
    description:
      "We help leadership teams assess opportunities, choose tools and roll out AI with governance, training and measurable pilots.",
    features: [
      "Use-case discovery workshops",
      "Tool & vendor evaluation",
      "Policy, privacy & governance guidance",
      "Pilot design & success metrics",
    ],
    deliverables: [
      "AI opportunity roadmap",
      "Vendor shortlist & recommendations",
      "Pilot scope & implementation plan",
      "Executive briefing materials",
    ],
  },
  "ai-agents": {
    title: "AI Agents",
    headline: "Custom agents that handle work, not just chat.",
    accent: "work",
    description:
      "We build AI agents for support, sales ops and internal workflows — connected to your data and designed for reliability.",
    features: [
      "Support & FAQ agents",
      "Lead qualification & routing",
      "Internal knowledge assistants",
      "API & CRM integrations",
    ],
    deliverables: [
      "Agent architecture & prompts",
      "Deployed agent on your stack",
      "Monitoring & escalation flows",
      "Maintenance & iteration plan",
    ],
  },
};
