"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useActiveSection } from "./useActiveSection";

const EASE = [0.32, 0.72, 0, 1];
const EASE_OUT = [0.25, 0.1, 0.25, 1];

const panelVariants = {
  hidden: {
    scaleY: 0,
    opacity: 0,
    transition: {
      scaleY: { duration: 0.32, ease: EASE_OUT, delay: 0.28 },
      opacity: { duration: 0.22, ease: EASE_OUT, delay: 0.22 },
      when: "afterChildren",
    },
  },
  show: {
    scaleY: 1,
    opacity: 1,
    transition: {
      scaleY: { duration: 0.28, ease: EASE },
      opacity: { duration: 0.18, ease: EASE },
      when: "beforeChildren",
      delayChildren: 0.06,
    },
  },
};

const listVariants = {
  hidden: {
    transition: {
      staggerChildren: 0.038,
      staggerDirection: -1,
    },
  },
  show: {
    transition: {
      staggerChildren: 0.038,
      delayChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    filter: "blur(4px)",
    y: 4,
    transition: { duration: 0.2, ease: EASE_OUT },
  },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      type: "spring",
      stiffness: 480,
      damping: 34,
      mass: 0.5,
    },
  },
};

export default function BlogMobileTableOfContents({ navigation = [] }) {
  const [open, setOpen] = useState(false);
  const openedScrollY = useRef(0);
  const canCloseOnScroll = useRef(false);
  const isOpenRef = useRef(false);
  const { itemIds, activeId, scrollToSection } = useActiveSection(navigation);

  useEffect(() => {
    isOpenRef.current = open;
    if (!open) {
      canCloseOnScroll.current = false;
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const closeOnScroll = () => {
      if (!canCloseOnScroll.current) return;
      if (Math.abs(window.scrollY - openedScrollY.current) > 15) {
        setOpen(false);
      }
    };

    window.addEventListener("scroll", closeOnScroll, { passive: true });
    return () => window.removeEventListener("scroll", closeOnScroll);
  }, [open]);

  if (itemIds.length === 0) return null;

  const activeLabel =
    navigation
      .flatMap((group) => group.items)
      .find((item) => item.id === activeId)?.label ?? itemIds[0];

  const handleToggle = () => {
    openedScrollY.current = window.scrollY;

    setOpen((prev) => {
      if (!prev) {
        canCloseOnScroll.current = false;
      }
      return !prev;
    });
  };

  const handlePanelAnimationComplete = (definition) => {
    if (definition !== "show" || !isOpenRef.current) return;

    openedScrollY.current = window.scrollY;
    canCloseOnScroll.current = true;
  };

  const handleClick = (event, id) => {
    scrollToSection(event, id);
    canCloseOnScroll.current = false;
    setOpen(false);
  };

  return (
    <nav
      aria-label="On this page"
      className="sticky top-0 z-20 w-full border-b border-white/10 bg-[#141414]/95 backdrop-blur-sm lg:hidden"
    >
      <div className="relative px-6 py-3">
        <button
          type="button"
          onClick={handleToggle}
          onMouseDown={(event) => event.preventDefault()}
          className="flex w-full items-center justify-between gap-3"
          aria-expanded={open}
        >
          <span className="min-w-0 truncate text-left text-[13px] text-white/80">
            {activeLabel}
          </span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.24, ease: EASE_OUT }}
            className="shrink-0 text-white/40"
          >
            <ChevronDown size={16} strokeWidth={1.5} aria-hidden />
          </motion.span>
        </button>

        <motion.div
          variants={panelVariants}
          initial={false}
          animate={open ? "show" : "hidden"}
          onAnimationComplete={handlePanelAnimationComplete}
          aria-hidden={!open}
          className={`absolute left-0 right-0 top-full z-20 origin-top overflow-hidden border-b border-white/10 bg-[#141414]/95 shadow-[0_12px_24px_rgba(0,0,0,0.35)] backdrop-blur-sm ${
            open ? "" : "pointer-events-none"
          }`}
        >
          <motion.div
            variants={listVariants}
            initial={false}
            animate={open ? "show" : "hidden"}
            className="flex max-h-[70vh] flex-col gap-4 overflow-y-auto px-6 py-4"
          >
            {navigation.map((group) => (
              <div key={group.label} className="flex flex-col gap-2">
                <motion.p
                  variants={itemVariants}
                  className="text-[12px] font-medium text-white/40"
                >
                  {group.label}
                </motion.p>
                <ul className="flex flex-col gap-2.5 pl-3">
                  {group.items.map((item) => {
                    const isActive = activeId === item.id;
                    return (
                      <motion.li key={item.id} variants={itemVariants}>
                        <a
                          href={`#${item.id}`}
                          onClick={(event) => handleClick(event, item.id)}
                          tabIndex={open ? 0 : -1}
                          className={`block text-[13px] leading-snug transition-colors ${
                            isActive
                              ? "text-white"
                              : "text-white/50 hover:text-white/75"
                          }`}
                        >
                          {item.label}
                        </a>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </nav>
  );
}
