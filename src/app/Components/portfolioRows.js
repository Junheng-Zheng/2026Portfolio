"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const TAP_SCALE = {
  whileTap: { scale: 0.96 },
  transition: { type: "spring", stiffness: 400, damping: 25 },
};

function getNewTabProps(href) {
  if (href.startsWith("http") || /\.pdf(\?|$)/i.test(href)) {
    return { target: "_blank", rel: "noopener noreferrer" };
  }

  return {};
}

export function WorkRow({ label, period }) {
  return (
    <div className="relative flex w-full items-center justify-between gap-3 text-white">
      <span className="text-[14px] leading-normal">{label}</span>
      <span className="text-[14px] leading-normal whitespace-nowrap shrink-0">
        {period}
      </span>
    </div>
  );
}

export function ExternalRow({ href, label }) {
  const isExternal =
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    /\.pdf(\?|$)/i.test(href);

  const content = (
    <>
      <span className="text-[14px] leading-normal">{label}</span>
      <ArrowUpRight
        strokeWidth={1.5}
        size={16}
        className="shrink-0 group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300"
      />
    </>
  );

  const rowClass =
    "relative flex w-full items-center justify-between gap-3 group text-white hover:opacity-80 transition-opacity";

  if (href.startsWith("/") && !isExternal) {
    return (
      <Link href={href} className={rowClass}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={rowClass} {...getNewTabProps(href)}>
      {content}
    </a>
  );
}

const DEVPOST_BUTTON_CLASS =
  "inline-flex shrink-0 items-center gap-1 bg-[#262424] rounded px-3 py-1 text-[12px] text-white hover:opacity-90 transition-opacity";

export function ProjectRow({ href, label, period, devpostHref }) {
  const nameContent = href ? (
    <Link
      href={href}
      className="group inline-flex items-center gap-1 text-[14px] leading-normal text-white hover:opacity-80 transition-opacity"
    >
      {label}
      <ArrowUpRight
        strokeWidth={1.5}
        size={16}
        className="shrink-0 group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300"
      />
    </Link>
  ) : (
    <span className="text-[14px] leading-normal">{label}</span>
  );

  return (
    <div className="relative flex w-full items-center justify-between gap-3 text-white">
      {nameContent}
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-[14px] leading-normal whitespace-nowrap">
          {period}
        </span>
        {devpostHref ? (
          <motion.a
            href={devpostHref}
            target="_blank"
            rel="noopener noreferrer"
            className={DEVPOST_BUTTON_CLASS}
            {...TAP_SCALE}
          >
            Devpost
            <ArrowUpRight strokeWidth={1.5} size={12} />
          </motion.a>
        ) : null}
      </div>
    </div>
  );
}
