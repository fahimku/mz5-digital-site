"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Code2,
  Palette,
  Search,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { staggerItem } from "@/components/motion/FadeIn";

const iconMap = {
  palette: Palette,
  code: Code2,
  shopping: ShoppingBag,
  search: Search,
  chart: BarChart3,
  sparkles: Sparkles,
} as const;

type ServiceCardProps = {
  title: string;
  description: string;
  tags: readonly string[];
  href: string;
  icon: keyof typeof iconMap;
};

export function ServiceCard({
  title,
  description,
  tags,
  href,
  icon,
}: ServiceCardProps) {
  const Icon = iconMap[icon];

  return (
    <motion.article
      variants={staggerItem}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <Link
        href={href}
        className="surface-panel group flex h-full flex-col rounded-2xl p-6 transition-colors duration-300 hover:border-white/20 hover:bg-zinc-950/95"
      >
        <motion.div
          className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent"
          whileHover={{ scale: 1.08 }}
        >
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </motion.div>
        <h3 className="mb-2 text-lg font-semibold tracking-tight text-white">
          {title}
        </h3>
        <p className="mb-6 flex-1 text-sm leading-relaxed text-muted">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </motion.article>
  );
}
