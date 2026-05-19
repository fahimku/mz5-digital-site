import { type ReactNode } from "react";
import { FadeIn } from "@/components/motion/FadeIn";

type SectionHeadingProps = {
  label?: string;
  children: ReactNode;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  label,
  children,
  className = "",
  align = "left",
}: SectionHeadingProps) {
  return (
    <FadeIn className={align === "center" ? "text-center" : ""}>
      {label && (
        <p className="mb-4 text-xs font-medium tracking-[0.2em] text-accent uppercase">
          {label}
        </p>
      )}
      <h2
        className={`max-w-4xl text-3xl leading-tight font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl ${className}`}
      >
        {children}
      </h2>
    </FadeIn>
  );
}
