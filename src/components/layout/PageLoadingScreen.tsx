"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function PageLoadingScreen() {
  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-label="Loading page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md"
    >
      <motion.div
        className="absolute inset-x-0 top-0 h-0.5 overflow-hidden bg-white/5"
        initial={false}
      >
        <motion.div
          className="h-full bg-accent"
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{
            duration: 1.1,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          style={{ width: "45%" }}
        />
      </motion.div>

      <div className="relative flex flex-col items-center gap-5">
        <div className="relative">
          <motion.div
            className="absolute inset-0 rounded-full border border-accent/30"
            animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.div
            className="h-14 w-14 rounded-full border-2 border-white/10 border-t-accent"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/logo-mark.png"
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
              aria-hidden
            />
          </div>
        </div>
        <p className="text-xs tracking-[0.2em] text-muted uppercase">
          Loading
        </p>
      </div>
    </motion.div>
  );
}
