"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const PATTERN_ID = "mz5-diamond-weave";

/** Tileable diamond weave — inspired by dark textured backgrounds (original SVG, not stock art). */
function DiamondWeavePattern({
  opacity,
  patternY,
  vignetteCy,
}: {
  opacity: motion.MotionValue<number>;
  patternY: motion.MotionValue<number>;
  vignetteCy: motion.MotionValue<string>;
}) {
  return (
    <motion.svg
      aria-hidden
      className="absolute inset-0 h-[130%] w-full -translate-y-[8%]"
      style={{ opacity }}
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
          <rect width="24" height="12" fill="#050505" />
          <path
            d="M6 0 L12 6 L6 12 L0 6 Z"
            fill="#161616"
            stroke="#2e2e2e"
            strokeWidth="0.5"
          />
          <path d="M6 1.5 L10.5 6 L6 10.5 L1.5 6 Z" fill="#1c1c1c" />
          <path d="M6 0 L12 6 L6 6 Z" fill="#262626" opacity="0.4" />
          <path d="M6 6 L12 6 L6 12 Z" fill="#0a0a0a" opacity="0.5" />
          <g transform="translate(12, 6)">
            <path
              d="M6 0 L12 6 L6 12 L0 6 Z"
              fill="#131313"
              stroke="#282828"
              strokeWidth="0.5"
            />
            <path d="M6 1.5 L10.5 6 L6 10.5 L1.5 6 Z" fill="#191919" />
            <path d="M6 0 L12 6 L6 6 Z" fill="#232323" opacity="0.35" />
            <path d="M6 6 L12 6 L6 12 Z" fill="#080808" opacity="0.45" />
          </g>
        </pattern>

        <motion.radialGradient
          id="mz5-vignette-mask-grad"
          cx="50%"
          r="78%"
          cy={vignetteCy}
        >
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="48%" stopColor="#ffffff" stopOpacity="0.72" />
          <stop offset="72%" stopColor="#ffffff" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
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
    stiffness: 80,
    damping: 26,
    restDelta: 0.001,
  });

  const textureOpacity = useTransform(
    smoothProgress,
    [0, 0.35, 0.7, 1],
    [0.72, 0.88, 0.8, 0.65]
  );

  const patternY = useTransform(smoothProgress, [0, 1], ["0%", "-12%"]);

  const vignetteCy = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    ["38%", "48%", "58%"]
  );

  const centerGlow = useTransform(
    smoothProgress,
    [0, 0.45, 1],
    [
      "radial-gradient(ellipse 75% 55% at 50% 38%, rgba(38,38,38,0.45) 0%, transparent 68%)",
      "radial-gradient(ellipse 70% 50% at 52% 45%, rgba(255,122,80,0.08) 0%, transparent 70%)",
      "radial-gradient(ellipse 65% 45% at 50% 52%, rgba(28,28,28,0.35) 0%, transparent 72%)",
    ]
  );

  const edgeFade = useTransform(
    smoothProgress,
    [0, 1],
    [
      "radial-gradient(ellipse 95% 85% at 50% 50%, transparent 35%, rgba(0,0,0,0.85) 100%)",
      "radial-gradient(ellipse 100% 90% at 50% 55%, transparent 30%, rgba(0,0,0,0.92) 100%)",
    ]
  );

  const accentLine = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [
      "rgba(255, 122, 80, 0.06)",
      "rgba(255, 122, 80, 0.1)",
      "rgba(161, 161, 170, 0.05)",
    ]
  );

  if (reduceMotion) {
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black"
      >
        <div
          className="absolute inset-0 opacity-[0.75]"
          style={{
            backgroundImage: "url(/textured-diamond-weave.svg)",
            backgroundSize: "24px 12px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(40,40,40,0.35),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,transparent_40%,rgba(0,0,0,0.9))]" />
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
      />

      <motion.div className="absolute inset-0" style={{ background: centerGlow }} />
      <motion.div className="absolute inset-0" style={{ background: edgeFade }} />

      <motion.div
        className="absolute inset-x-0 top-0 h-px"
        style={{ backgroundColor: accentLine }}
      />

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent" />
    </div>
  );
}
