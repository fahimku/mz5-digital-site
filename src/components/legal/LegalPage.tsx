import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site";

export type LegalSection = {
  title: string;
  content: string[];
};

type LegalPageProps = {
  label: string;
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
};

export function LegalPage({
  label,
  title,
  lastUpdated,
  intro,
  sections,
}: LegalPageProps) {
  return (
    <article className="pt-28 pb-20 lg:pt-36 lg:pb-28">
      <Container>
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <p className="mb-4 text-xs font-medium tracking-[0.2em] text-accent uppercase">
          / {label}
        </p>
        <h1 className="max-w-3xl text-4xl leading-tight font-semibold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-sm text-muted">Last updated: {lastUpdated}</p>
        <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted">
          {intro}
        </p>

        <div className="mt-14 max-w-3xl space-y-12">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-semibold text-white">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4">
                {section.content.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="text-sm leading-relaxed text-muted"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-16 text-sm text-muted">
          Questions? Contact us at{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-accent hover:underline"
          >
            {siteConfig.email}
          </a>
          .
        </p>
      </Container>
    </article>
  );
}
