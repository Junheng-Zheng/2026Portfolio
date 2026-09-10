"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Ellipsis } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { HOME_CONTACT_DROPDOWN } from "../data/homePage";

const DROPDOWN_MOTION = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] },
};

const DROPDOWN_WIDTH = "w-[200px]";

const HOVER_ICON_REVEAL =
  "transition-all duration-300 group-hover:w-5 group-hover:scale-100 max-md:group-active:w-5 max-md:group-active:scale-100";

const HOVER_ICON_REVEAL_COMPACT =
  "transition-all duration-300 group-hover:w-3.5 group-hover:scale-100 max-md:group-active:w-3.5 max-md:group-active:scale-100";

const SIZE_STYLES = {
  default: {
    container: "inline-block max-md:max-w-full",
    button:
      "justify-center bg-[#0059ff] text-white px-5 py-2 text-[16px] hover:gap-2 max-md:group-active:gap-2",
    ellipsis: 16,
    dropdownWidth: DROPDOWN_WIDTH,
    dropdown: "gap-1 rounded-2xl p-2",
    menuItem: "px-4 py-2 text-[16px]",
    arrowClass: "size-4 shrink-0",
    arrowSize: 16,
    iconReveal: HOVER_ICON_REVEAL,
  },
  compact: {
    container: "w-full",
    button:
      "w-full justify-center bg-[#262424] text-white/80 px-3 py-1.5 text-[13px] hover:gap-1.5 hover:text-white max-md:group-active:gap-1.5",
    ellipsis: 14,
    dropdownWidth: "w-full",
    dropdown: "gap-0.5 rounded-xl p-1.5",
    menuItem: "px-3 py-1.5 text-[14px]",
    arrowClass: "size-3.5 shrink-0",
    arrowSize: 14,
    iconReveal: HOVER_ICON_REVEAL_COMPACT,
  },
};

function isExternalHref(href) {
  return href.startsWith("http") || /\.pdf(\?|$)/i.test(href);
}

export default function GetInTouchButton({ size = "default" }) {
  const styles = SIZE_STYLES[size] ?? SIZE_STYLES.default;
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  return (
    <div
      ref={containerRef}
      className={`relative z-50 ${styles.container}`}
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={`group inline-flex cursor-pointer touch-manipulation items-center gap-0 rounded-full leading-normal transition-[transform,gap,opacity] duration-300 hover:opacity-90 active:scale-[0.96] ${styles.button}`}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        Get in Touch
        <span
          className={`inline-flex w-0 scale-0 overflow-hidden ${styles.iconReveal}`}
        >
          <Ellipsis
            size={styles.ellipsis}
            strokeWidth={1.5}
            className="shrink-0"
            aria-hidden
          />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            {...DROPDOWN_MOTION}
            style={{ transformOrigin: "top left" }}
            className={`absolute left-0 top-full z-[100] mt-2 flex ${styles.dropdownWidth} max-md:max-w-[calc(100vw-2.5rem)] flex-col bg-[#262424] shadow-lg max-md:touch-manipulation ${styles.dropdown}`}
          >
            {HOME_CONTACT_DROPDOWN.map((item) => (
              <a
                key={item.label}
                role="menuitem"
                href={item.href}
                target={isExternalHref(item.href) ? "_blank" : undefined}
                rel={
                  isExternalHref(item.href) ? "noopener noreferrer" : undefined
                }
                className={`group flex w-full cursor-pointer touch-manipulation items-center justify-between rounded-lg text-left leading-normal text-white/80 transition-[transform,color] duration-150 ease-out hover:bg-white/5 hover:text-white active:scale-[0.98] ${styles.menuItem}`}
                onClick={() => setOpen(false)}
              >
                <span>{item.label}</span>
                <span
                  className={`inline-flex w-0 scale-0 overflow-hidden ${styles.iconReveal}`}
                >
                  <ArrowUpRight
                    size={styles.arrowSize}
                    strokeWidth={1.5}
                    className={styles.arrowClass}
                    aria-hidden
                  />
                </span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
