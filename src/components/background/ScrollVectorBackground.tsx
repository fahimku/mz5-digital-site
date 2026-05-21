"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const PATTERN_ID = "mz5-diamond-weave";

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
            fill="#141414"
            stroke="#262626"
            strokeWidth="0.5"
          />
          <path d="M6 1.5 L10.5 6 L6 10.5 L1.5 6 Z" fill="#181818" />
          <path d="M6 0 L12 6 L6 6 Z" fill="#1f1f1f" opacity="0.35" />
          <path d="M6 6 L12 6 L6 12 Z" fill="#080808" opacity="0.45" />
          <g transform="translate(12, 6)">
            <path
              d="M6 0 L12 6 L6 12 L0 6 Z"
              fill="#111111"
              stroke="#222222"
              strokeWidth="0.5"
            />
            <path d="M6 1.5 L10.5 6 L6 10.5 L1.5 6 Z" fill="#161616" />
            <path d="M6 0 L12 6 L6 6 Z" fill="#1c1c1c" opacity="0.3" />
            <path d="M6 6 L12 6 L6 12 Z" fill="#060606" opacity="0.4" />
          </g>
        </pattern>

        <motion.radialGradient
          id="mz5-vignette-mask-grad"
          cx="50%"
          r="85%"
          cy={vignetteCy}
        >
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.15" />
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
    [0, 0.5, 1],
    [0.38, 0.42, 0.36]
  );

  const patternY = useTransform(smoothProgress, [0, 1], ["0%", "-8%"]);

  const vignetteCy = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    ["42%", "50%", "56%"]
  );

  /** Subtle accent only — stays dark so white text stays readable */
  const accentGlow = useTransform(
    smoothProgress,
    [0, 0.45, 1],
    [
      "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,122,80,0.07) 0%, transparent 65%)",
      "radial-gradient(ellipse 70% 45% at 55% 35%, rgba(255,122,80,0.05) 0%, transparent 70%)",
      "radial-gradient(ellipse 75% 50% at 48% 60%, rgba(255,122,80,0.04) 0%, transparent 72%)",
    ]
  );

  /** Darkens slightly on scroll instead of washing the page lighter */
  const scrollShade = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [
      "rgba(0, 0, 0, 0.42)",
      "rgba(0, 0, 0, 0.5)",
      "rgba(0, 0, 0, 0.55)",
    ]
  );

  const edgeVignette = useTransform(
    smoothProgress,
    [0, 1],
    [
      "radial-gradient(ellipse 110% 95% at 50% 50%, transparent 25%, rgba(0,0,0,0.75) 100%)",
      "radial-gradient(ellipse 115% 100% at 50% 52%, transparent 20%, rgba(0,0,0,0.82) 100%)",
    ]
  );

  const accentLine = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [
      "rgba(255, 122, 80, 0.05)",
      "rgba(255, 122, 80, 0.07)",
      "rgba(255, 122, 80, 0.04)",
    ]
  );

  if (reduceMotion) {
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black"
      >
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: "url(/textured-diamond-weave.svg)",
            backgroundSize: "24px 12px",
          }}
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,transparent_30%,rgba(0,0,0,0.85))]" />
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

      <motion.div className="absolute inset-0" style={{ background: accentGlow }} />
      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor: scrollShade }}
      />
      <motion.div className="absolute inset-0" style={{ background: edgeVignette }} />

      <motion.div
        className="absolute inset-x-0 top-0 h-px"
        style={{ backgroundColor: accentLine }}
      />

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/90 to-transparent" />
    </div>
  );
}
