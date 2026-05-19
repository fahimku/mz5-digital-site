"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { MobileNav } from "@/components/layout/MobileNav";
import { ServicesDropdown } from "@/components/layout/ServicesDropdown";
import { navLinks } from "@/lib/site";

export function Header() {
  const { scrollY } = useScroll();
  const background = useTransform(
    scrollY,
    [0, 80],
    ["rgba(0,0,0,0)", "rgba(0,0,0,0.85)"],
  );
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  return (
    <motion.header
      style={{ backgroundColor: background }}
      className="fixed top-0 right-0 left-0 z-50"
    >
      <motion.div
        style={{ opacity: borderOpacity }}
        className="absolute inset-x-0 bottom-0 h-px bg-white/10"
      />
      <Container className="flex h-16 items-center justify-between lg:h-[72px]">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          <ServicesDropdown />
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            href="/#contact"
            variant="primary"
            className="hidden !px-5 !py-2.5 text-sm sm:inline-flex"
          >
            Start a project
          </Button>
          <MobileNav />
        </div>
      </Container>
    </motion.header>
  );
}
