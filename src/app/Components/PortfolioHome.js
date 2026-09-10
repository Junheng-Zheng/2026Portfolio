"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CornerRightDown } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { HOME_BIO, HOME_PROJECTS } from "../data/homePage";
import GetInTouchButton from "./GetInTouchButton";
import { markHomeVisited, useSkipAnimations } from "./portfolioMotion";

const HELLO_LETTERS = ["H", "e", "l", "l", "o"];
const EASE = [0.22, 1, 0.36, 1];
const LETTER_STAGGER = 0.07;
const LETTER_DURATION = 0.55;
const SETTLE_DURATION = 0.85;
const CONTENT_DURATION = 0.75;

const letterVariants = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: "blur(10px)",
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * LETTER_STAGGER,
      duration: LETTER_DURATION,
      ease: EASE,
    },
  }),
};

function Badge({ label, tone }) {
  const className =
    tone === "light" ? "bg-white text-black" : "bg-[#141414] text-white";

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-3 py-2 text-[13px] leading-normal whitespace-nowrap md:px-5 md:py-3 md:text-[16px] ${className}`}
    >
      {label}
    </span>
  );
}

function ProjectCard({ image, title, badges = [], href, comingSoon = false }) {
  const isLinked = Boolean(href) && !comingSoon;

  const media = (
    <div className="relative aspect-[640/480] w-full overflow-hidden rounded-[16px] md:rounded-[24px]">
      <Image
        src={image}
        alt=""
        fill
        className="object-cover pointer-events-none transition-transform duration-500 ease-out group-hover:scale-105"
        sizes="(max-width: 767px) 100vw, (max-width: 1024px) 70vw, 640px"
        unoptimized={image.endsWith(".gif")}
      />
      <div className="absolute inset-0 flex flex-wrap items-start gap-2 p-3 md:gap-2.5 md:p-5">
        {badges.map((badge) => (
          <Badge key={badge.label} {...badge} />
        ))}
      </div>
    </div>
  );

  const footer = (
    <div className="flex w-full items-center justify-between gap-3 md:gap-4">
      <p className="text-[16px] leading-normal text-[#c1c1c1] transition-colors duration-300 group-hover:text-white md:text-[20px]">
        {title}
      </p>
      <span
        className="inline-flex size-9 shrink-0 items-center justify-center rounded-full md:size-11"
        aria-hidden
      >
        <ArrowUpRight
          size={18}
          strokeWidth={1.5}
          className="text-[#c1c1c1] transition-all duration-300 group-hover:rotate-45 group-hover:text-white md:size-5"
        />
      </span>
    </div>
  );

  const body = (
    <div className="flex w-full flex-col gap-2.5 md:gap-3">
      {media}
      {footer}
    </div>
  );

  const cardClassName = "group block w-full cursor-pointer";

  return (
    <article className="w-full shrink-0 md:w-[min(640px,70vw)] lg:w-[min(640px,85vw)]">
      {isLinked ? (
        <Link href={href} className={cardClassName}>
          {body}
        </Link>
      ) : (
        <div className={cardClassName}>{body}</div>
      )}
    </article>
  );
}

export default function PortfolioHome() {
  const pathname = usePathname();
  const skipAnimations = useSkipAnimations();
  const [lettersDone, setLettersDone] = useState(false);
  const [helloSettled, setHelloSettled] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const settled = skipAnimations || helloSettled;
  const contentVisible = skipAnimations || showContent;

  useEffect(() => {
    if (pathname !== "/") {
      markHomeVisited();
    }
  }, [pathname]);

  useEffect(() => {
    if (skipAnimations) return undefined;

    const lettersMs =
      ((HELLO_LETTERS.length - 1) * LETTER_STAGGER + LETTER_DURATION) * 1000 +
      120;
    const lettersTimer = setTimeout(() => setLettersDone(true), lettersMs);

    return () => clearTimeout(lettersTimer);
  }, [skipAnimations]);

  useEffect(() => {
    if (skipAnimations || !lettersDone) return undefined;

    setHelloSettled(true);

    const contentTimer = setTimeout(() => {
      setShowContent(true);
      markHomeVisited();
    }, SETTLE_DURATION * 1000);

    return () => clearTimeout(contentTimer);
  }, [lettersDone, skipAnimations]);

  return (
    <div
      className={`flex w-full flex-col ${
        contentVisible
          ? "gap-10 py-6 md:min-h-dvh md:justify-center md:gap-8 md:py-0"
          : "h-dvh overflow-hidden"
      }`}
    >
      <motion.section
        className="flex w-full flex-col items-start gap-3 px-5 md:gap-4 md:p-8"
        initial={false}
        animate={
          settled
            ? { minHeight: 0, justifyContent: "flex-start" }
            : { minHeight: "100dvh", justifyContent: "center" }
        }
        transition={{ duration: SETTLE_DURATION, ease: EASE }}
      >
        <h1
          className="flex font-medium text-[40px] leading-[1] tracking-[-0.768px] text-white sm:text-[48px] md:text-[64px] md:leading-[64px]"
          aria-label="Hello"
        >
          {HELLO_LETTERS.map((letter, i) => (
            <motion.span
              key={`${letter}-${i}`}
              custom={i}
              variants={letterVariants}
              initial={skipAnimations ? false : "hidden"}
              animate="visible"
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        <motion.div
          className="flex w-full max-w-[442px] flex-col items-start gap-4 md:gap-5"
          initial={false}
          animate={
            contentVisible
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 28, filter: "blur(10px)" }
          }
          transition={{ duration: CONTENT_DURATION, ease: EASE }}
          style={{ pointerEvents: contentVisible ? "auto" : "none" }}
        >
          <p className="text-[16px] leading-normal text-white md:text-[20px]">
            {HOME_BIO}
          </p>

          <div className="flex flex-row flex-wrap items-center gap-4 sm:gap-6">
            <GetInTouchButton />

            <a
              href="#work"
              className="inline-flex items-center gap-2 text-[16px] leading-normal text-[#919191] transition-colors hover:text-white/80 md:gap-3 md:text-[20px]"
            >
              <span>Read about my work</span>
              <CornerRightDown size={18} strokeWidth={1.5} aria-hidden />
            </a>
          </div>
        </motion.div>
      </motion.section>

      <motion.section
        id="work"
        className="flex w-full flex-col gap-8 px-5 md:flex-row md:gap-9 md:overflow-x-auto md:px-8 md:pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        initial={false}
        animate={
          contentVisible
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 36, filter: "blur(10px)" }
        }
        transition={{
          duration: CONTENT_DURATION,
          ease: EASE,
          delay: contentVisible && !skipAnimations ? 0.06 : 0,
        }}
        style={{ pointerEvents: contentVisible ? "auto" : "none" }}
      >
        {HOME_PROJECTS.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </motion.section>
    </div>
  );
}
