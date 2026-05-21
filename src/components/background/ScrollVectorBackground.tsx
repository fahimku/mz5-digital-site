"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

const PATTERN_ID = "mz5-diamond-weave";

function DiamondWeavePattern({
  opacity,
  patternY,
  vignetteCy,
  patternScale,
}: {
  opacity: MotionValue<number>;
  patternY: MotionValue<string>;
  vignetteCy: MotionValue<string>;
  patternScale: MotionValue<number>;
}) {
  return (
    <motion.svg
      aria-hidden
      className="absolute inset-0 h-[140%] w-full origin-top -translate-y-[6%]"
      style={{ opacity, scale: patternScale }}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id={PATTERN_ID}
          width="24"
          height="12"
          patternUnits="userSpaceOnUse"
        >
          <rect width="24" height="12" fill="#080808" />
          <path
            d="M6 0 L12 6 L6 12 L0 6 Z"
            fill="#1a1a1a"
            stroke="#353535"
            strokeWidth="0.55"
          />
          <path d="M6 1.5 L10.5 6 L6 10.5 L1.5 6 Z" fill="#222222" />
          <path d="M6 0 L12 6 L6 6 Z" fill="#2c2c2c" opacity="0.45" />
          <path d="M6 6 L12 6 L6 12 Z" fill="#0c0c0c" opacity="0.5" />
          <g transform="translate(12, 6)">
            <path
              d="M6 0 L12 6 L6 12 L0 6 Z"
              fill="#161616"
              stroke="#303030"
              strokeWidth="0.55"
            />
            <path d="M6 1.5 L10.5 6 L6 10.5 L1.5 6 Z" fill="#1e1e1e" />
            <path d="M6 0 L12 6 L6 6 Z" fill="#282828" opacity="0.4" />
            <path d="M6 6 L12 6 L6 12 Z" fill="#0a0a0a" opacity="0.45" />
          </g>
        </pattern>

        <motion.radialGradient
          id="mz5-vignette-mask-grad"
          cx="50%"
          r="80%"
          cy={vignetteCy}
        >
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.2" />
        </motion.radialGradient>

        <mask id="mz5-vignette-mask">
          <rect width="100%" height="100%" fill="url(#mz5-vignette-mask-grad)" />
        </mask>
      </defs>

      <motion.rect
        width="100%"
        height="100%"
        fill={`url(#${PATTERN_ID})`}
        mask="url(#mz5-vignette-mask)"
        style={{ y: patternY }}
      />
    </motion.svg>
  );
}

export function ScrollVectorBackground() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    restDelta: 0.001,
  });

  const textureOpacity = useTransform(
    smoothProgress,
    [0, 0.35, 0.7, 1],
    [0.62, 0.78, 0.72, 0.65]
  );

  const patternY = useTransform(smoothProgress, [0, 1], ["0%", "-14%"]);
  const patternScale = useTransform(smoothProgress, [0, 1], [1, 1.04]);

  const vignetteCy = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    ["36%", "48%", "58%"]
  );

  /** Soft lift on scroll — visible texture, still dark enough for white text */
  const scrollGlow = useTransform(
    smoothProgress,
    [0, 0.4, 0.75, 1],
    [
      "radial-gradient(ellipse 90% 55% at 50% 18%, rgba(48,48,48,0.35) 0%, transparent 68%)",
      "radial-gradient(ellipse 85% 50% at 52% 42%, rgba(255,122,80,0.14) 0%, transparent 72%)",
      "radial-gradient(ellipse 80% 48% at 48% 58%, rgba(56,56,56,0.28) 0%, transparent 74%)",
      "radial-gradient(ellipse 75% 45% at 50% 72%, rgba(255,122,80,0.1) 0%, transparent 76%)",
    ]
  );

  const topAccent = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [
      "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(255,122,80,0.12) 0%, transparent 62%)",
      "radial-gradient(ellipse 65% 38% at 55% 8%, rgba(255,122,80,0.1) 0%, transparent 65%)",
      "radial-gradient(ellipse 60% 35% at 48% 12%, rgba(255,122,80,0.08) 0%, transparent 68%)",
    ]
  );

  /** Light scrim — keeps text readable without hiding the weave */
  const contentScrim = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [
      "rgba(0, 0, 0, 0.18)",
      "rgba(0, 0, 0, 0.24)",
      "rgba(0, 0, 0, 0.28)",
    ]
  );

  const edgeVignette = useTransform(
    smoothProgress,
    [0, 1],
    [
      "radial-gradient(ellipse 100% 90% at 50% 48%, transparent 42%, rgba(0,0,0,0.55) 100%)",
      "radial-gradient(ellipse 105% 95% at 50% 52%, transparent 38%, rgba(0,0,0,0.62) 100%)",
    ]
  );

  const accentLine = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [
      "rgba(255, 122, 80, 0.08)",
      "rgba(255, 122, 80, 0.14)",
      "rgba(255, 122, 80, 0.06)",
    ]
  );

  if (reduceMotion) {
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black"
      >
        <div
          className="absolute inset-0 opacity-[0.65]"
          style={{
            backgroundImage: "url(/textured-diamond-weave.svg)",
            backgroundSize: "24px 12px",
          }}
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_40%,rgba(50,50,50,0.2),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,transparent_45%,rgba(0,0,0,0.7))]" />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black"
    >
      <DiamondWeavePattern
        opacity={textureOpacity}
        patternY={patternY}
        vignetteCy={vignetteCy}
        patternScale={patternScale}
      />

      <motion.div className="absolute inset-0" style={{ background: topAccent }} />
      <motion.div className="absolute inset-0" style={{ background: scrollGlow }} />
      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor: contentScrim }}
      />
      <motion.div className="absolute inset-0" style={{ background: edgeVignette }} />

      <motion.div
        className="absolute inset-x-0 top-0 h-px"
        style={{ backgroundColor: accentLine }}
      />

      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
    </div>
  );
}
