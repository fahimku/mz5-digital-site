import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { aiLinks, marketingLinks, navLinks, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/80 py-16 backdrop-blur-sm">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo className="mb-4" />
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              A digital studio in Ontario blending strategy, design and
              engineering for brands ready to grow.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Marketing</h4>
            <ul className="space-y-2">
              {marketingLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="mt-6 mb-4 text-sm font-semibold text-white">AI</h4>
            <ul className="space-y-2">
              {aiLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Company</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">{siteConfig.copyright}</p>
          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="text-xs text-muted hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-xs text-muted hover:text-white"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
