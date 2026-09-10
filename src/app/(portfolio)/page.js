"use client";

import { motion, useInView } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  ArrowUpRight,
  CornerRightDown,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import GetInTouchButton from "../Components/GetInTouchButton";
import {
  markHomeVisited,
  useSkipAnimations,
} from "../Components/portfolioMotion";
import { HOME_PROJECTS, HOME_CONTACT_DROPDOWN } from "../data/homePage";
import { resolveProjectTags } from "../data/projectTags";
import WorkTitleWithIcons from "../Components/WorkTitleWithIcons";

const HELLO_LETTERS = ["H", "e", "l", "l", "o"];
const LETTER_SPRING = {
  type: "spring",
  stiffness: 120,
  damping: 18,
  mass: 0.8,
};
const PARENT_SPRING = {
  type: "spring",
  stiffness: 120,
  damping: 18,
  mass: 0.8,
};

const SLIDE_REVEAL_HIDDEN = { y: 20, opacity: 0 };
const SLIDE_REVEAL_VISIBLE = { y: 0, opacity: 1 };

const FOOTER_LINK_CLASS =
  "inline-flex items-center gap-2 text-[16px] leading-normal text-[#919191] transition-colors hover:text-white/80 md:gap-3";

function opensInNewTab(href) {
  return href.startsWith("http") || /\.pdf(\?|$)/i.test(href);
}

const SCROLL_OFFSET = 80;

function smoothScrollToRef(ref) {
  const element = ref?.current;
  if (!element) return;

  const top =
    element.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

function smoothScrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const ABOUT_FOOTER_LINKS = [
  ...HOME_CONTACT_DROPDOWN,
  { label: "Back to top", scrollTo: "top", icon: ArrowUp },
];

function FooterLink({
  label,
  href,
  scrollTo,
  onScrollTo,
  icon: Icon,
  delay = 0,
  show = false,
}) {
  const content = (
    <span className="inline-flex items-center gap-2 md:gap-3">
      <span>{label}</span>
      {Icon && <Icon size={18} strokeWidth={1.5} aria-hidden />}
    </span>
  );

  const motionProps = {
    initial: SLIDE_REVEAL_HIDDEN,
    animate: show ? SLIDE_REVEAL_VISIBLE : SLIDE_REVEAL_HIDDEN,
    transition: { ...LETTER_SPRING, delay: show ? delay : 0 },
  };

  if (scrollTo) {
    return (
      <motion.button
        type="button"
        onClick={() => onScrollTo(scrollTo)}
        {...motionProps}
        className={`${FOOTER_LINK_CLASS} ${show ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        {content}
      </motion.button>
    );
  }

  return (
    <motion.a
      href={href}
      target={opensInNewTab(href) ? "_blank" : undefined}
      rel={opensInNewTab(href) ? "noopener noreferrer" : undefined}
      {...motionProps}
      className={`${FOOTER_LINK_CLASS} ${show ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      {content}
    </motion.a>
  );
}

function Badge({ label, className: tagClassName, tone }) {
  const className =
    tagClassName ??
    (tone === "light" ? "bg-white text-black" : "bg-[#141414] text-white");

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-[16px] leading-normal whitespace-nowrap ${className}`}
    >
      {label}
    </span>
  );
}

const CURSOR_PILL_BASE_CLASS =
  "pointer-events-none absolute left-0 top-0 z-20 hidden opacity-0 transition-opacity duration-150 will-change-transform lg:block";

function CursorPillMarquee({ comingSoon }) {
  const label = comingSoon ? "Coming Soon" : "Read now";
  const viewportWidth = comingSoon ? "w-[11rem]" : "w-[8.5rem]";
  const pillClass = comingSoon
    ? `bg-[#141414] text-white ${viewportWidth}`
    : `bg-[#0059ff] text-white ${viewportWidth}`;

  const segment = (
    <span className="inline-flex shrink-0 items-center gap-1.5">
      <span>{label}</span>
      {!comingSoon && <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden />}
    </span>
  );

  const trackHalf = (
    <>
      {segment}
      <span className="shrink-0 px-0.5 text-white/40" aria-hidden>
        ·
      </span>
      {segment}
      <span className="shrink-0 px-0.5 text-white/40" aria-hidden>
        ·
      </span>
      {segment}
      <span className="shrink-0 px-0.5 text-white/40" aria-hidden>
        ·
      </span>
    </>
  );

  return (
    <span
      className={`inline-flex overflow-hidden rounded-full py-2 text-[16px] leading-normal shadow-lg ${pillClass}`}
    >
      <span className="cursor-pill-marquee-track flex w-max items-center gap-1">
        {trackHalf}
        {trackHalf}
      </span>
    </span>
  );
}

function ProjectCard({
  image,
  title,
  titleParts,
  badges = [],
  href,
  comingSoon = false,
  featured = false,
}) {
  const isLinked = Boolean(href) && !comingSoon;
  const resolvedBadges = resolveProjectTags(badges);
  const mediaRef = useRef(null);
  const pillRef = useRef(null);

  const aspectClass = featured
    ? "aspect-[4/3] lg:aspect-[8/3]"
    : "aspect-[4/3]";

  const updatePillPosition = (clientX, clientY) => {
    const media = mediaRef.current;
    const pill = pillRef.current;
    if (!media || !pill) return;

    const rect = media.getBoundingClientRect();
    pill.style.transform = `translate3d(${clientX - rect.left}px, ${clientY - rect.top}px, 0) translate(-50%, -50%)`;
  };

  const handleMediaEnter = (event) => {
    const pill = pillRef.current;
    if (!pill) return;

    pill.style.opacity = "1";
    updatePillPosition(event.clientX, event.clientY);
  };

  const handleMediaLeave = () => {
    if (pillRef.current) pillRef.current.style.opacity = "0";
  };

  const handleMediaMove = (event) => {
    updatePillPosition(event.clientX, event.clientY);
  };

  const media = (
    <div
      ref={mediaRef}
      onMouseEnter={handleMediaEnter}
      onMouseLeave={handleMediaLeave}
      onMouseMove={handleMediaMove}
      className={`relative ${aspectClass} w-full overflow-hidden rounded-[16px] md:rounded-[20px] lg:cursor-none`}
    >
      <Image
        src={image}
        alt=""
        fill
        className="object-cover pointer-events-none transition-transform duration-500 ease-out group-hover:scale-105"
        unoptimized={image.endsWith(".gif")}
      />
      <div className="absolute inset-0 flex flex-wrap items-start gap-2 p-3 md:gap-2.5 md:p-5 pointer-events-none">
        {resolvedBadges.map((badge) => (
          <Badge key={badge.type} {...badge} />
        ))}
      </div>

      <div ref={pillRef} className={CURSOR_PILL_BASE_CLASS}>
        <CursorPillMarquee comingSoon={comingSoon} />
      </div>
    </div>
  );

  const footer = (
    <div className="flex w-full items-center justify-between gap-3 md:gap-4">
      <p
        className="min-w-0 text-[16px] leading-normal text-[#a8a8a8] transition-colors duration-300 group-hover:text-white/85"
        aria-label={title}
      >
        <WorkTitleWithIcons
          title={title}
          titleParts={titleParts}
          iconSizeClassName="size-5 md:size-6"
        />
      </p>
      <span
        className="inline-flex size-9 shrink-0 items-center justify-center rounded-full md:size-11"
        aria-hidden
      >
        <ArrowUpRight
          size={18}
          strokeWidth={1.5}
          className="text-[#a8a8a8] transition-all duration-300 group-hover:rotate-45 group-hover:text-white/85 md:size-5"
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
    <article
      className={`w-full shrink-0 ${featured ? "lg:col-span-2" : "lg:col-span-1"}`}
    >
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

const AnimationPage = () => {
  // Hydration-safe: SSR + first client paint are false; sessionStorage applies after mount.
  const skipAnimations = useSkipAnimations();
  const [lettersDone, setLettersDone] = useState(false);
  const workRef = useRef(null);
  const aboutRef = useRef(null);
  const aboutTitleRef = useRef(null);
  const aboutInView = useInView(aboutTitleRef, { once: true, amount: 0.4 });
  const reveal = skipAnimations || lettersDone;
  const instant = { duration: 0 };
  const motionTransition = skipAnimations ? instant : PARENT_SPRING;
  const fadeVisible = { opacity: 1, y: 0, filter: "blur(0px)" };
  const fadeHidden = { opacity: 0, y: 30, filter: "blur(5px)" };
  const workHidden = { opacity: 0, y: 36, filter: "blur(10px)" };

  useEffect(() => {
    if (skipAnimations) return undefined;

    const timeout = window.setTimeout(() => {
      setLettersDone(true);
    }, 1200);

    return () => window.clearTimeout(timeout);
  }, [skipAnimations]);

  useEffect(() => {
    if (!reveal) return undefined;
    markHomeVisited();
    return undefined;
  }, [reveal]);

  const scrollToSection = useCallback((section) => {
    if (section === "top") smoothScrollToTop();
    else if (section === "work") smoothScrollToRef(workRef);
    else if (section === "about") smoothScrollToRef(aboutRef);
  }, []);

  return (
    <div className="relative flex min-h-dvh w-full flex-col bg-[#161616] max-md:overflow-x-hidden">
      <motion.div
        initial={
          skipAnimations
            ? { maxHeight: "fit-content", scale: 1 }
            : { maxHeight: "100dvh" }
        }
        animate={
          reveal
            ? { maxHeight: "fit-content", scale: 1 }
            : { maxHeight: "100dvh" }
        }
        transition={motionTransition}
        className={`mx-auto flex w-full max-w-[1600px] flex-col ${reveal ? "overflow-visible" : "overflow-hidden"}`}
      >
        <div className="relative z-30  flex flex-col gap-4">
          <motion.div
            initial={
              skipAnimations
                ? {
                    height: "fit-content",
                    width: "fit-content",
                    translateY: "0px",
                  }
                : {
                    height: "100dvh",
                    width: "100%",
                    translateY: "-28px",
                  }
            }
            animate={
              reveal
                ? {
                    height: "fit-content",
                    width: "fit-content",
                    translateY: "0px",
                  }
                : {
                    height: "100dvh",
                    width: "100%",
                    translateY: "-28px",
                  }
            }
            transition={motionTransition}
            className="flex items-center px-24 pt-14  justify-center max-md:px-5 max-md:pt-10"
          >
            {HELLO_LETTERS.map((letter, index) => (
              <motion.span
                key={`${letter}-${index}`}
                initial={
                  skipAnimations
                    ? fadeVisible
                    : { opacity: 0, y: 10 }
                }
                animate={fadeVisible}
                transition={
                  skipAnimations
                    ? instant
                    : {
                        ...LETTER_SPRING,
                        delay: index * 0.05,
                      }
                }
                onAnimationComplete={() => {
                  if (skipAnimations) return;
                  if (index === HELLO_LETTERS.length - 1) {
                    setLettersDone(true);
                  }
                }}
                className="text-[40px] font-medium leading-[1] text-white sm:text-[48px] md:text-[64px] md:leading-[64px]"
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
          <div className="px-24 max-md:px-5">
            <div className="overflow-hidden max-w-[442px]">
              <motion.p
                initial={skipAnimations ? fadeVisible : fadeHidden}
                animate={reveal ? fadeVisible : fadeHidden}
                transition={
                  skipAnimations
                    ? instant
                    : {
                        ...LETTER_SPRING,
                        delay: 0.5,
                      }
                }
                className="text-[16px] leading-normal text-white"
              >
                Jun is a Developer and Designer. Exp @ Tesla, IBM Research, and
                Liberty Mutual.{" "}
                <button
                  type="button"
                  onClick={() => scrollToSection("about")}
                  className="cursor-pointer text-[#8ab3ff] transition-opacity hover:opacity-80"
                >
                  Learn More.
                </button>
              </motion.p>
            </div>
          </div>
          <div className="relative px-24 max-md:px-5">
            <motion.div
              initial={skipAnimations ? fadeVisible : fadeHidden}
              animate={reveal ? fadeVisible : fadeHidden}
              transition={
                skipAnimations
                  ? instant
                  : {
                      ...LETTER_SPRING,
                      delay: 0.7,
                    }
              }
              className="flex flex-row flex-wrap items-center gap-4 sm:gap-6 max-md:gap-3"
            >
              <GetInTouchButton />

              <button
                type="button"
                onClick={() => scrollToSection("work")}
                className="inline-flex cursor-pointer items-center gap-2 text-[16px] leading-normal text-[#919191] transition-colors hover:text-white/80 md:gap-3"
              >
                <span>Read about my work</span>
                <CornerRightDown size={18} strokeWidth={1.5} aria-hidden />
              </button>
            </motion.div>
          </div>
        </div>
        <div
          ref={workRef}
          className="overflow-hidden pt-14 pb-14 bg-[#161616] z-20 max-md:pt-10 max-md:pb-12"
        >
          <motion.section
            className="flex w-full flex-col gap-8 px-24 lg:grid lg:grid-cols-2 lg:gap-9 lg:overflow-x-auto lg:pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-md:gap-6 max-md:px-5"
            initial={skipAnimations ? fadeVisible : workHidden}
            animate={reveal ? fadeVisible : workHidden}
            transition={
              skipAnimations
                ? instant
                : {
                    ...LETTER_SPRING,
                    delay: 0.9,
                  }
            }
            style={{ pointerEvents: reveal ? "auto" : "none" }}
          >
            {HOME_PROJECTS.map((project, index) => (
              <ProjectCard
                key={project.title}
                {...project}
                featured={index === 0}
              />
            ))}
          </motion.section>
        </div>
        <div
          ref={aboutRef}
          className="flex w-full flex-col gap-8 px-24 pt-0  pb-16 text-[16px] leading-normal max-md:px-5 max-lg:gap-8 lg:flex-row lg:gap-0 lg:py-12 lg:pb-24"
        >
          <div
            ref={aboutTitleRef}
            className="w-full lg:w-1/4 lg:self-start lg:sticky lg:top-12"
          >
            <h1 className="text-[40px] font-medium leading-[1] text-white sm:text-[48px] max-lg:leading-none lg:text-[64px] lg:leading-[64px]">
              About
            </h1>
          </div>
          <div className="flex w-full flex-col gap-8 border-white/10 max-lg:gap-8 lg:w-1/2 lg:gap-12 lg:border-r lg:border-l lg:px-10">
            <div>
              Hello! My name is Junheng Zheng (Jun), and I am a
              multi-disciplinary developer{" "}
              <span
                className="inline-flex items-center w-fit align-middle"
                aria-hidden
              >
                <span
                  className="inline-block relative size-8 rounded-full shrink-0 bg-blue-500 align-middle"
                  aria-hidden
                >
                  {" "}
                  <Image
                    src="/logos/react.png"
                    alt="Developer"
                    fill
                    className="object-contain"
                  />{" "}
                </span>

                <span
                  className="inline-block relative size-8 rounded-full -ml-2 shrink-0 bg-yellow-500 align-middle"
                  aria-hidden
                >
                  <Image
                    src="/logos/tailwind.png"
                    alt="Designer"
                    fill
                    className="object-contain"
                  />
                </span>
                <span
                  className="inline-block relative size-8 rounded-full -ml-2 shrink-0 bg-green-500 align-middle"
                  aria-hidden
                >
                  <Image
                    src="/logos/javascript.png"
                    alt="Designer"
                    fill
                    className="object-contain"
                  />
                </span>
              </span>{" "}
              and designer{" "}
              <span
                className="inline-flex items-center w-fit align-middle"
                aria-hidden
              >
                <span
                  className="inline-block relative size-8 rounded-full shrink-0 bg-green-500 align-middle"
                  aria-hidden
                >
                  <Image
                    src="/logos/miro.png"
                    alt="Designer"
                    fill
                    className="object-contain"
                  />
                </span>
                <span
                  className="inline-block relative size-8  -ml-2  rounded-full shrink-0 bg-blue-500 align-middle"
                  aria-hidden
                >
                  <Image
                    src="/logos/figma.png"
                    alt="Designer"
                    fill
                    className="object-contain"
                  />
                </span>
              </span>{" "}
              . I&apos;m currently studying Web & Mobile Computing at Rochester
              Institute of Technology.
            </div>

            <p>
              Currently, I&apos;m interning at Tesla{" "}
              <span
                className="inline-block size-8 rounded-full shrink-0 relative align-middle"
                aria-hidden
              >
                <Image
                  src="/logos/tesl.png"
                  alt="Tesla"
                  fill
                  className="object-contain"
                />
              </span>{" "}
              as a Frontend Engineer and Designer, working on Design Systems and
              Internal Tools. Previously, I interned at IBM Research{" "}
              <span
                className="inline-block size-8 rounded-full shrink-0 relative align-middle"
                aria-hidden
              >
                <Image
                  src="/logos/ibmbee.png"
                  alt="IBM"
                  fill
                  className="object-contain"
                />
              </span>
              , working on a Data Acquisition Platform used by over 3000
              Researchers. Before that, I interned at Liberty Mutual Insurance{" "}
              <span
                className="inline-block size-8 rounded-full shrink-0 relative align-middle"
                aria-hidden
              >
                <Image
                  src="/logos/liberty.png"
                  alt="Liberty Mutual"
                  fill
                  className="object-contain"
                />
              </span>
              , where I worked on internal Design Systems.
            </p>

            <div className="aspect-3/4 w-full rounded-2xl overflow-hidden relative">
              <Image
                src="/photograph/jun.JPG"
                alt="Project 1"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-3 max-lg:pt-2 lg:w-1/4 lg:self-end lg:items-end lg:sticky lg:bottom-12">
            {ABOUT_FOOTER_LINKS.map((link, index) => (
              <FooterLink
                key={link.label}
                {...link}
                onScrollTo={scrollToSection}
                show={aboutInView}
                delay={index * 0.08}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnimationPage;
