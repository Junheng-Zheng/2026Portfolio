"use client";

import { motion } from "framer-motion";
import { useSyncExternalStore } from "react";

export const HOME_VISITED_KEY = "portfolio-home-visited";

export const COLORS = {
  background: "#1a1a1a",
  foreground: "#ffffff",
};

const STAGGER_ROW_GAP = 0.05;

const homeVisitedListeners = new Set();

function subscribeHomeVisited(onStoreChange) {
  homeVisitedListeners.add(onStoreChange);
  return () => homeVisitedListeners.delete(onStoreChange);
}

function notifyHomeVisitedSubscribers() {
  homeVisitedListeners.forEach((fn) => fn());
}

function getHomeVisitedSnapshot() {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(HOME_VISITED_KEY) === "true";
}

function getHomeVisitedServerSnapshot() {
  return false;
}

export function useSkipAnimations() {
  return useSyncExternalStore(
    subscribeHomeVisited,
    getHomeVisitedSnapshot,
    getHomeVisitedServerSnapshot,
  );
}

export function markHomeVisited() {
  try {
    sessionStorage.setItem(HOME_VISITED_KEY, "true");
    notifyHomeVisitedSubscribers();
  } catch {
    /* ignore */
  }
}

export function HomeEntrance({
  skip,
  play = true,
  delay = 0,
  className = "",
  children,
  onComplete,
}) {
  const visible = skip || play;

  return (
    <motion.div
      initial={skip ? false : { opacity: 0, y: 10, filter: "blur(3px)" }}
      animate={
        visible
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 5, filter: "blur(3px)" }
      }
      transition={
        skip
          ? { duration: 0 }
          : {
              type: "spring",
              stiffness: 500,
              damping: 80,
              mass: 0.5,
              delay: visible ? delay : 0,
            }
      }
      className={className}
      onAnimationComplete={() => {
        if (visible && !skip && onComplete) onComplete();
      }}
    >
      {children}
    </motion.div>
  );
}

export function HomeAnimatedLinks({
  skip,
  play = true,
  delay = 0,
  className = "",
  children,
  onComplete,
}) {
  const shouldShow = skip || play;

  const container = skip
    ? {
        hidden: {},
        show: { transition: { staggerChildren: 0, delayChildren: 0 } },
      }
    : {
        hidden: {},
        show: {
          transition: {
            staggerChildren: STAGGER_ROW_GAP,
            delayChildren: delay,
          },
        },
      };

  const item = skip
    ? {
        hidden: { opacity: 1, filter: "blur(0px)" },
        show: {
          opacity: 1,
          filter: "blur(0px)",
          transition: { duration: 0 },
        },
      }
    : {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            type: "spring",
            stiffness: 500,
            damping: 35,
            mass: 0.5,
          },
        },
      };

  return (
    <motion.div
      className={className}
      variants={container}
      initial={skip ? "show" : "hidden"}
      animate={shouldShow ? "show" : "hidden"}
      onAnimationComplete={(definition) => {
        if (shouldShow && !skip && definition === "show" && onComplete) {
          onComplete();
        }
      }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={item} className="shrink-0">
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}
