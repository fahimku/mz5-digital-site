import { type ReactNode } from "react";

export function Accent({ children }: { children: ReactNode }) {
  return (
    <em className="font-serif text-accent not-italic">{children}</em>
  );
}
