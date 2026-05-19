import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

type LogoProps = {
  className?: string;
};

export function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-3 text-lg font-semibold tracking-tight ${className}`}
      style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif' }}
    >
      <Image
        src="/logo-mark.png"
        alt="MZ5"
        width={48}
        height={48}
        className="h-11 w-auto object-contain md:h-12"
        priority
      />
      <span className="hidden sm:inline">
        MZ5 <span className="font-normal text-muted">Digital</span>
      </span>
      <span className="sr-only">{siteConfig.name}</span>
    </Link>
  );
}
