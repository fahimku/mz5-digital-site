"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Bot,
  Code2,
  Megaphone,
  MessageSquare,
  Sparkles,
  Users,
} from "lucide-react";

const services = [
  {
    label: "Software Development",
    short: "Dev",
    icon: Code2,
    className: "left-[4%] top-[8%]",
    delay: 0,
    float: { y: [0, -10, 0], x: [0, 4, 0] },
  },
  {
    label: "CRM",
    short: "CRM",
    icon: Users,
    className: "right-[2%] top-[14%]",
    delay: 0.4,
    float: { y: [0, 8, 0], x: [0, -6, 0] },
  },
  {
    label: "AI Automation",
    short: "AI",
    icon: Bot,
    className: "left-[0%] top-[42%]",
    delay: 0.8,
    float: { y: [0, -12, 0], x: [0, 5, 0] },
  },
  {
    label: "Digital Marketing",
    short: "Ads",
    icon: Megaphone,
    className: "right-[0%] top-[48%]",
    delay: 1.2,
    float: { y: [0, 10, 0], x: [0, -4, 0] },
  },
  {
    label: "Consulting",
    short: "Strategy",
    icon: MessageSquare,
    className: "left-[12%] bottom-[6%]",
    delay: 1.6,
    float: { y: [0, -8, 0], x: [0, 3, 0] },
  },
] as const;

function FloatingBadge({
  label,
  short,
  icon: Icon,
  className,
  delay,
  float,
  reduced,
}: {
  label: string;
  short: string;
  icon: typeof Code2;
  className: string;
  delay: number;
  float: { y: readonly number[]; x: readonly number[] };
  reduced: boolean;
}) {
  return (
    <motion.div
      className={`absolute z-20 ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 + delay }}
    >
      <motion.div
        animate={
          reduced ? undefined : { y: [...float.y], x: [...float.x] }
        }
        transition={
          reduced
            ? undefined
            : {
                duration: 4 + delay,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
              }
        }
        className="flex items-center gap-2.5 rounded-full border border-white/10 bg-zinc-950/90 py-2 pr-4 pl-2 shadow-lg shadow-black/40 backdrop-blur-md"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-accent">
          <Icon className="h-4 w-4" strokeWidth={2} />
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-medium tracking-wide text-zinc-500 uppercase">
            {short}
          </p>
          <p className="max-w-[140px] truncate text-xs font-semibold text-white sm:max-w-none sm:text-sm">
            {label}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function HeroTechVisual() {
  const reduced = useReducedMotion();

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[520px] lg:max-w-none"
      aria-hidden
    >
      <div className="absolute inset-[8%] rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute inset-[18%] rounded-full bg-white/[0.03] blur-2xl" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25 }}
        className="absolute inset-[12%] flex items-center justify-center"
      >
        <motion.div
          animate={reduced ? undefined : { y: [0, -6, 0] }}
          transition={
            reduced
              ? undefined
              : { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }
          className="relative h-full w-full max-w-[340px]"
        >
          {/* Central dashboard */}
          <div className="absolute inset-0 rounded-2xl border border-white/10 bg-zinc-950/80 p-4 shadow-2xl shadow-black/50 backdrop-blur-sm">
            <div className="mb-3 flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 h-2 flex-1 rounded-full bg-white/5" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2 space-y-2 rounded-lg border border-white/5 bg-black/40 p-2">
                <div className="h-2 w-3/4 rounded bg-white/10" />
                <div className="h-16 rounded-md bg-gradient-to-br from-accent/25 to-transparent" />
                <div className="flex gap-1">
                  <div className="h-2 flex-1 rounded bg-white/10" />
                  <div className="h-2 w-8 rounded bg-accent/40" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex h-14 items-center justify-center rounded-lg border border-accent/20 bg-accent/10">
                  <Sparkles className="h-5 w-5 text-accent" />
                </div>
                <div className="h-8 rounded-lg bg-white/5" />
                <div className="h-8 rounded-lg bg-white/5" />
              </div>
            </div>
            <div className="mt-2 flex gap-2">
              <div className="h-2 flex-1 rounded-full bg-white/10" />
              <div className="h-2 w-12 rounded-full bg-accent/50" />
            </div>
          </div>

          {/* Floating code chips */}
          <motion.div
            animate={reduced ? undefined : { y: [0, -8, 0], rotate: [0, 2, 0] }}
            transition={
              reduced
                ? undefined
                : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
            }
            className="absolute -top-2 -right-4 rounded-lg border border-pink-500/30 bg-pink-500/10 px-3 py-1.5 text-xs font-semibold text-pink-300"
          >
            {"</>"}
          </motion.div>
          <motion.div
            animate={reduced ? undefined : { y: [0, 6, 0] }}
            transition={
              reduced
                ? undefined
                : { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
            }
            className="absolute top-1/4 -left-6 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-bold text-cyan-300"
          >
            JS
          </motion.div>
          <motion.div
            animate={reduced ? undefined : { y: [0, -5, 0] }}
            transition={
              reduced
                ? undefined
                : { duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1 }
            }
            className="absolute -bottom-1 left-1/4 rounded-lg border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 text-xs font-bold text-violet-300"
          >
            API
          </motion.div>

          {/* Phone mock */}
          <motion.div
            animate={reduced ? undefined : { y: [0, 10, 0], x: [0, -4, 0] }}
            transition={
              reduced
                ? undefined
                : { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }
            }
            className="absolute -bottom-4 -left-8 w-[72px] rounded-xl border border-white/10 bg-zinc-900 p-1.5 shadow-xl"
          >
            <div className="aspect-[9/16] rounded-lg bg-gradient-to-b from-zinc-800 to-black p-1.5">
              <div className="mb-1 h-1.5 w-8 rounded bg-white/20" />
              <div className="h-6 rounded bg-accent/30" />
              <div className="mt-1 space-y-0.5">
                <div className="h-1 rounded bg-white/10" />
                <div className="h-1 w-2/3 rounded bg-white/10" />
              </div>
            </div>
          </motion.div>

          {/* Cursor pointer */}
          <motion.div
            animate={
              reduced
                ? undefined
                : { x: [0, 8, 0], y: [0, -6, 0], rotate: [0, 5, 0] }
            }
            transition={
              reduced
                ? undefined
                : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
            }
            className="absolute -top-6 right-[18%] text-accent"
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5.5 3.5l12 8.5-5.5 1.5 2.5 6.5-3-1.5-3 4.5-3.5-19.5z" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>

      {services.map((item) => (
        <FloatingBadge key={item.label} {...item} reduced={!!reduced} />
      ))}

      {/* Orbit ring */}
      <motion.div
        animate={reduced ? undefined : { rotate: 360 }}
        transition={
          reduced
            ? undefined
            : { duration: 48, repeat: Infinity, ease: "linear" }
        }
        className="absolute inset-[6%] rounded-full border border-dashed border-white/[0.06]"
      />
    </div>
  );
}
