"use client";

import Link from "next/link";
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
 * segments: [{ text: string, italic?: boolean, href?: string }]
 * Keeps words together (no mid-word wraps) while animating letters.
 * Segments with `href` render as underlined links.
 */
const defaultLabelClassName =
  "font-label text-[10px] leading-normal uppercase tracking-normal block mb-2";

const Animatedparagrah = ({
  segments,
  label,
  labelClassName = defaultLabelClassName,
  className,
  play = true,
  onComplete,
  container = defaultContainer,
  letter = defaultLetter,
  skipAnimation = false,
  delayChildren,
  linkUnderline = true,
}) => {
  const segmentText = Array.isArray(segments)
    ? segments.map((s) => s?.text ?? "").join("")
    : "";
  const ariaLabel = label ? `${label}${segmentText}` : segmentText;

  const containerResolved =
    delayChildren != null && !skipAnimation
      ? {
          ...container,
          show: {
            ...container.show,
            transition: {
              ...(container.show?.transition ?? {}),
              delayChildren,
            },
          },
        }
      : container;

  const linkClassName = [
    "hover:opacity-80 transition-opacity",
    linkUnderline
      ? "underline decoration-solid decoration-white/50 underline-offset-[2px] [text-decoration-skip-ink:none]"
      : "no-underline",
  ].join(" ");

  const renderSegmentLink = (seg, inner, key) => {
    const isInternal = seg.href.startsWith("/");

    if (isInternal) {
      return (
        <Link key={key} href={seg.href} className={linkClassName}>
          {inner}
        </Link>
      );
    }

    return (
      <a
        key={key}
        href={seg.href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        {inner}
      </a>
    );
  };

  const lineVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren:
          containerResolved.show?.transition?.staggerChildren ?? 0.006,
      },
    },
  };

  const renderLabel = (animated) => {
    if (!label) return null;

    if (!animated) {
      return <span className={labelClassName}>{label}</span>;
    }

    const LabelWrap = motion.span;

    return (
      <LabelWrap
        className={labelClassName}
        variants={lineVariants}
        aria-hidden="true"
      >
        {Array.from(label).map((ch, k) => (
          <motion.span
            key={`label-${k}`}
            variants={letter}
            className="inline-block"
          >
            {ch}
          </motion.span>
        ))}
      </LabelWrap>
    );
  };

  const renderSegmentTokens = (seg, i, animated, isLink = false) => {
    const text = seg?.text ?? "";

    if (isLink) {
      return animated
        ? Array.from(text).map((ch, k) => {
            if (ch === " ") return " ";

            return (
              <motion.span
                key={`${i}-link-${k}`}
                variants={letter}
                className="inline-block"
              >
                {ch}
              </motion.span>
            );
          })
        : text;
    }

    const tokens = text.split(/(\s+)/);

    return tokens.map((token, j) => {
      if (/^\s+$/.test(token)) return token;

      const word = (
        <span
          key={`${i}-${j}`}
          className="inline-block whitespace-nowrap"
          aria-hidden={animated ? "true" : undefined}
        >
          {animated
            ? Array.from(token).map((ch, k) => (
                <motion.span
                  key={`${i}-${j}-${k}`}
                  variants={letter}
                  className="inline-block"
                >
                  {ch}
                </motion.span>
              ))
            : token}
        </span>
      );

      return word;
    });
  };

  if (skipAnimation) {
    return (
      <p className={className} aria-label={ariaLabel}>
        {renderLabel(false)}
        {(segments ?? []).map((seg, i) => {
          const inner = renderSegmentTokens(seg, i, false, Boolean(seg?.href));
          if (seg?.href) {
            return renderSegmentLink(seg, inner, i);
          }
          return (
            <span key={i} className={seg?.italic ? "italic" : undefined}>
              {inner}
            </span>
          );
        })}
      </p>
    );
  }

  return (
    <motion.p
      className={className}
      variants={containerResolved}
      initial="hidden"
      animate={play ? "show" : "hidden"}
      aria-label={ariaLabel}
      onAnimationComplete={(definition) => {
        if (definition === "show" && onComplete) onComplete();
      }}
    >
      {renderLabel(true)}
      {(segments ?? []).map((seg, i) => {
        const inner = renderSegmentTokens(seg, i, true, Boolean(seg?.href));
        if (seg?.href) {
          return renderSegmentLink(seg, inner, i);
        }
        return (
          <span key={i} className={seg?.italic ? "italic" : undefined}>
            {inner}
          </span>
        );
      })}
    </motion.p>
  );
};

export default Animatedparagrah;
