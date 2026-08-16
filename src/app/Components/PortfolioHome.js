"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CornerRightDown } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  HOME_ACTIONS,
  HOME_BIO,
  HOME_HACKATHONS,
  HOME_PROJECTS,
} from "../data/homePage";
import { CONTACT_ITEMS, WORK_ITEMS } from "../data/workPages";
import {
  HomeAnimatedLinks,
  HomeEntrance,
  markHomeVisited,
  useSkipAnimations,
} from "./portfolioMotion";

const BUTTON_CLASS =
  "inline-flex w-fit bg-[#262424] rounded px-4 py-1 text-[14px] text-white hover:opacity-90 transition-opacity";

const DISABLED_BUTTON_CLASS =
  "inline-flex w-fit bg-[#262424] rounded px-4 py-1 text-[14px] text-white/40 cursor-not-allowed";

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

function ActionLink({ label, href, variant }) {
  const linkClass =
    variant === "button"
      ? BUTTON_CLASS
      : "text-[14px] text-white/80 hover:text-white transition-colors";

  const isExternal =
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    /\.pdf(\?|$)/i.test(href);

  if (variant === "button") {
    if (isExternal) {
      return (
        <motion.a
          href={href}
          className={linkClass}
          {...TAP_SCALE}
          {...getNewTabProps(href)}
        >
          {label}
        </motion.a>
      );
    }

    return (
      <Link href={href} className={linkClass}>
        <motion.span className="inline-flex" {...TAP_SCALE}>
          {label}
        </motion.span>
      </Link>
    );
  }

  if (isExternal) {
    return (
      <a href={href} className={linkClass} {...getNewTabProps(href)}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={linkClass}>
      {label}
    </Link>
  );
}

function WorkRow({ label, period }) {
  return (
    <div className="relative flex w-full items-center justify-between gap-3 text-white">
      <span className="text-[14px] leading-normal">{label}</span>
      <span className="text-[14px] leading-normal whitespace-nowrap shrink-0">
        {period}
      </span>
    </div>
  );
}

function ExternalRow({ href, label }) {
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

function ProjectRow({ href, label, period, devpostHref }) {
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

function ProjectDetail({ children }) {
  return <p>{children}</p>;
}

function ProjectCard({
  image,
  aspect,
  meta,
  title,
  details,
  href,
  comingSoon = false,
  detailsPadding = "p-3",
  placeholderClass,
  imageScale = 1,
  imageBgClass,
  skip,
  play,
  delay = 0,
}) {
  const actionButton = comingSoon ? (
    <span className={DISABLED_BUTTON_CLASS} aria-disabled="true">
      Coming Soon
    </span>
  ) : (
    <motion.span className={BUTTON_CLASS} {...TAP_SCALE}>
      Read Process
    </motion.span>
  );

  const content = (
    <>
      <div
        className={`relative w-full shrink-0 overflow-hidden ${imageBgClass ?? ""}`}
        style={{ aspectRatio: aspect.replace("/", " / ") }}
      >
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            className="object-cover pointer-events-none"
            style={
              imageScale !== 1
                ? { transform: `scale(${imageScale})` }
                : undefined
            }
            unoptimized={image.endsWith(".gif")}
          />
        ) : (
          <div
            className={`absolute inset-0 ${placeholderClass ?? "bg-white/5"}`}
            aria-hidden
          />
        )}
      </div>

      <div className="flex flex-col gap-1">
        <div className="text-[12px] text-white/70">{meta.join(" | ")}</div>
        <p className="text-[14px] text-white">{title}</p>
      </div>

      {details.length > 0 && (
        <div
          className={`flex flex-col gap-1 px-3 text-[14px] text-white/80 ${detailsPadding}`}
        >
          {details.map((detail, index) => (
            <ProjectDetail key={index}>{detail}</ProjectDetail>
          ))}
        </div>
      )}

      {actionButton}
    </>
  );

  const card =
    href && !comingSoon ? (
      <Link
        href={href}
        className="flex flex-col gap-4 hover:opacity-95 transition-opacity"
      >
        {content}
      </Link>
    ) : (
      <div className="flex flex-col gap-4">{content}</div>
    );

  return (
    <HomeEntrance
      skip={skip}
      play={play}
      delay={delay}
      className="flex flex-col gap-4 w-full"
    >
      <article className="flex flex-col gap-4 w-full">{card}</article>
    </HomeEntrance>
  );
}

export default function PortfolioHome() {
  const pathname = usePathname();
  const skipAnimations = useSkipAnimations();
  const listBaseDelay = 0.2 + HOME_PROJECTS.length * 0.08;

  useEffect(() => {
    if (pathname !== "/") {
      markHomeVisited();
    }
  }, [pathname]);

  return (
    <div className="font-body text-white min-h-dvh flex flex-col items-center justify-center px-5 py-12 sm:px-8 md:px-12 md:py-24 bg-[#141414]">
      <div className="flex flex-col gap-8 md:gap-12 items-start w-full max-w-[600px]">
        <section className="flex flex-col gap-3 w-full">
          <HomeEntrance
            skip={skipAnimations}
            play
            className="relative w-full aspect-[600/350] shrink-0 overflow-hidden"
          >
            <Image
              src="/landing/jun.png"
              alt="Junheng Zheng"
              fill
              priority
              className="object-bottom pointer-events-none"
            />
          </HomeEntrance>

          <div className="flex flex-col gap-3 w-full">
            <HomeEntrance skip={skipAnimations} play delay={0.05}>
              <p className="text-[14px] leading-normal text-white">{HOME_BIO}</p>
            </HomeEntrance>

            <HomeAnimatedLinks
              skip={skipAnimations}
              play
              delay={0.1}
              className="flex flex-wrap gap-3 sm:gap-4 items-center"
            >
              {HOME_ACTIONS.map((action) => (
                <ActionLink key={action.label} {...action} />
              ))}
            </HomeAnimatedLinks>
          </div>
        </section>

        <HomeEntrance skip={skipAnimations} play delay={0.15}>
          <motion.div
            className="flex gap-1 items-center text-[14px] text-white/60"
            animate={
              skipAnimations
                ? {}
                : {
                    y: [0, 2, 0],
                  }
            }
            transition={
              skipAnimations
                ? { duration: 0 }
                : {
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.8,
                  }
            }
          >
            <span>Read about my work</span>
            <CornerRightDown size={14} strokeWidth={1.5} aria-hidden />
          </motion.div>
        </HomeEntrance>

        {HOME_PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.title}
            {...project}
            skip={skipAnimations}
            play
            delay={0.2 + index * 0.08}
          />
        ))}

        <HomeEntrance
          skip={skipAnimations}
          play
          delay={listBaseDelay}
          className="flex flex-col gap-3 w-full"
        >
          <p className="text-[12px] text-white/70">
            Work
          </p>
          <HomeAnimatedLinks
            skip={skipAnimations}
            play
            delay={listBaseDelay + 0.05}
            className="flex flex-col gap-2 w-full"
          >
            {WORK_ITEMS.map((item) => (
              <WorkRow
                key={item.slug}
                label={item.name}
                period={item.period}
              />
            ))}
          </HomeAnimatedLinks>
        </HomeEntrance>

        <HomeEntrance
          skip={skipAnimations}
          play
          delay={listBaseDelay + 0.05}
          className="flex flex-col gap-3 w-full"
        >
          <p className="text-[12px] text-white/70">
            Contact + More
          </p>
          <HomeAnimatedLinks
            skip={skipAnimations}
            play
            delay={listBaseDelay + 0.1}
            className="flex flex-col gap-2 w-full"
          >
            {CONTACT_ITEMS.map((item) => (
              <ExternalRow key={item.name} href={item.href} label={item.name} />
            ))}
          </HomeAnimatedLinks>
        </HomeEntrance>

        <HomeEntrance
          skip={skipAnimations}
          play
          delay={listBaseDelay + 0.1}
          className="flex flex-col gap-3 w-full"
        >
          <p className="text-[12px] text-white/70">
            Projects
          </p>
          <HomeAnimatedLinks
            skip={skipAnimations}
            play
            delay={listBaseDelay + 0.15}
            className="flex flex-col gap-2 w-full"
          >
            {HOME_HACKATHONS.map((item) => (
              <ProjectRow
                key={item.name}
                href={item.href}
                label={item.name}
                period={item.period}
                devpostHref={item.devpostHref}
              />
            ))}
          </HomeAnimatedLinks>
        </HomeEntrance>
      </div>
    </div>
  );
}
