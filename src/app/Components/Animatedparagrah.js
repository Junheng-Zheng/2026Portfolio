"use client";

import { motion } from "framer-motion";

const defaultContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.006, delayChildren: 0.05 },
  },
};

const defaultLetter = {
  hidden: {
    opacity: 0,
    y: 10,
    scale: 0.95,
    rotate: "-10deg",
    filter: "blur(2px)",
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: "0deg",
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 600, damping: 35, mass: 0.35 },
  },
};

/**
 * segments: [{ text: string, italic?: boolean }]
 * Keeps words together (no mid-word wraps) while animating letters.
 */
const Animatedparagrah = ({
  segments,
  className,
  play = true,
  onComplete,
  container = defaultContainer,
  letter = defaultLetter,
}) => {
  const ariaLabel = Array.isArray(segments)
    ? segments.map((s) => s?.text ?? "").join("")
    : "";

  return (
    <motion.p
      className={className}
      variants={container}
      initial="hidden"
      animate={play ? "show" : "hidden"}
      aria-label={ariaLabel}
      onAnimationComplete={onComplete}
    >
      {(segments ?? []).map((seg, i) => (
        <span key={i} className={seg?.italic ? "italic" : undefined}>
          {(seg?.text ?? "").split(/(\s+)/).map((token, j) => {
            if (/^\s+$/.test(token)) return token;

            return (
              <span
                key={`${i}-${j}`}
                className="inline-block whitespace-nowrap"
                aria-hidden="true"
              >
                {Array.from(token).map((ch, k) => (
                  <motion.span
                    key={`${i}-${j}-${k}`}
                    variants={letter}
                    className="inline-block"
                  >
                    {ch}
                  </motion.span>
                ))}
              </span>
            );
          })}
        </span>
      ))}
    </motion.p>
  );
};

export default Animatedparagrah;
