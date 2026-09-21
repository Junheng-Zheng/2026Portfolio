"use client";

import { motion, useInView } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUp, ArrowUpRight, CornerRightDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import GetInTouchButton from "../Components/GetInTouchButton";
import {
  markHomeVisited,
  useSkipAnimations,
} from "../Components/portfolioMotion";
import { HOME_PROJECTS, HOME_CONTACT_DROPDOWN } from "../data/homePage";
import { resolveProjectTags } from "../data/projectTags";

const HERO_ROLES = [
  {
    label: "Designer",
    icons: [
      { src: "/logos/miro.png", alt: "Miro", className: "bg-green-500" },
      { src: "/logos/figma.png", alt: "Figma", className: "bg-blue-500" },
    ],
  },
  {
    label: "Developer",
    icons: [
      { src: "/logos/react.png", alt: "React", className: "bg-blue-500" },
      {
        src: "/logos/tailwind.png",
        alt: "Tailwind",
        className: "bg-yellow-500",
      },
      {
        src: "/logos/javascript.png",
        alt: "JavaScript",
        className: "bg-green-500",
      },
    ],
  },
  {
    label: "Builder",
    icons: [
      { src: "/logos/claude.png", alt: "Claude", className: "bg-blue-500" },
      { src: "/logos/grok.png", alt: "Grok", className: "bg-blue-500" },
    ],
  },
];

// Each role = its letters + one icon stack; used for stagger timing.
const HERO_STAGGER_COUNT = HERO_ROLES.reduce(
  (count, role) => count + role.label.length + 1,
  0,
);

const HERO_REVEAL_DELAY_MS = 200;
const HERO_STAGGER_S = 0.05;
const HERO_ENTRANCE_MS = (HERO_STAGGER_COUNT * HERO_STAGGER_S + 0.55) * 1000;
const LETTER_SPRING = {
  type: "spring",
  stiffness: 120,
  damping: 18,
  mass: 0.8,
};
const LAYOUT_EASE = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1],
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

function RoleIconStack({ icons, sizeClassName = "size-[0.95em]" }) {
  return (
    <span className="inline-flex items-center w-fit align-middle" aria-hidden>
      {icons.map((icon, index) => (
        <span
          key={`${icon.src}-${index}`}
          className={`relative inline-block shrink-0 overflow-hidden rounded-full align-middle ${sizeClassName} ${
            index > 0 ? "-ml-[0.28em]" : ""
          } ${icon.className ?? ""}`}
        >
          <Image
            src={icon.src}
            alt={icon.alt ?? ""}
            fill
            className="object-contain"
          />
        </span>
      ))}
    </span>
  );
}

const HERO_TEXT_CLASS =
  "text-[24px] font-medium leading-none text-white sm:text-[48px] md:text-[20px] md:leading-6";

function HeroSentence({ skipAnimations }) {
  const instant = { duration: 0 };
  let staggerIndex = 0;

  return (
    <h1
      className={`flex flex-wrap items-center justify-start gap-x-[0.6em] gap-y-2 ${HERO_TEXT_CLASS}`}
      aria-label="Designer, Developer, Builder"
    >
      {HERO_ROLES.map((role) => {
        const letterNodes = role.label.split("").map((char, charIndex) => {
          const delay = staggerIndex * HERO_STAGGER_S;
          staggerIndex += 1;
          return (
            <motion.span
              key={`${role.label}-${charIndex}`}
              initial={
                skipAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={
                skipAnimations ? instant : { ...LETTER_SPRING, delay }
              }
              className="inline-block"
            >
              {char}
            </motion.span>
          );
        });

        const iconsDelay = staggerIndex * HERO_STAGGER_S;
        staggerIndex += 1;

        return (
          <span
            key={role.label}
            className="inline-flex items-center whitespace-nowrap"
          >
            {letterNodes}
            <motion.span
              initial={
                skipAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={
                skipAnimations
                  ? instant
                  : { ...LETTER_SPRING, delay: iconsDelay }
              }
              className="inline-flex ml-[0.28em]"
            >
              <RoleIconStack icons={role.icons} />
            </motion.span>
          </span>
        );
      })}
    </h1>
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

const PROJECT_COL_SPAN_CLASS = {
  3: "lg:col-span-3",
  5: "lg:col-span-5",
  6: "lg:col-span-6",
  7: "lg:col-span-7",
  9: "lg:col-span-9",
  12: "lg:col-span-12",
};

/** 12-col layout: 6|6, 7|5, 3|9 */
const PROJECT_GRID_SPANS = [6, 6, 7, 5, 3, 9];

function ProjectCard({
  image,
  title,
  badges = [],
  href,
  comingSoon = false,
  colSpan = 6,
}) {
  const isLinked = Boolean(href) && !comingSoon;
  const resolvedBadges = resolveProjectTags(badges);
  const mediaRef = useRef(null);
  const pillRef = useRef(null);
  const spanClass = PROJECT_COL_SPAN_CLASS[colSpan] ?? "lg:col-span-6";

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
      className="relative h-full min-h-0 w-full overflow-hidden rounded-none lg:cursor-none"
    >
      {/* In-flow sizer so wider cards set the row height; image fills on stretch */}
      <div className="w-full aspect-[4/3]" aria-hidden />
      <Image
        src={image}
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 60vw"
        className="object-cover object-center pointer-events-none transition-transform duration-500 ease-out group-hover:scale-105"
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
    <div className="flex w-full shrink-0 items-center justify-between gap-3 pt-1.5 md:gap-4 md:pt-2">
      <p
        className="min-w-0 flex-1 pr-5 text-[16px] leading-normal text-[#a8a8a8] transition-colors duration-300 group-hover:text-white/85 md:pr-0"
        aria-label={title}
      >
        {title}
      </p>
      <span
        className="inline-flex size-9 shrink-0 items-center justify-center max-md:ml-2 md:size-11"
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
    <>
      {media}
      {footer}
    </>
  );

  const cardClassName =
    "group grid h-full w-full min-h-0 cursor-pointer grid-rows-[1fr_auto]";

  return (
    <article
      className={`col-span-1 flex h-full min-h-0 w-full flex-col ${spanClass}`}
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
  const [revealReady, setRevealReady] = useState(false);
  const [clipUnlocked, setClipUnlocked] = useState(false);
  const workRef = useRef(null);
  const aboutRef = useRef(null);
  const aboutTitleRef = useRef(null);
  const aboutInView = useInView(aboutTitleRef, { once: true, amount: 0.4 });
  const reveal = skipAnimations || revealReady;
  const pageUnlocked = skipAnimations || clipUnlocked;
  const instant = { duration: 0 };
  const layoutTransition = skipAnimations ? instant : LAYOUT_EASE;
  const fadeVisible = { opacity: 1, y: 0, filter: "blur(0px)" };
  const fadeHidden = { opacity: 0, y: 30, filter: "blur(5px)" };
  const workHidden = { opacity: 0, y: 36, filter: "blur(10px)" };

  useEffect(() => {
    if (skipAnimations) {
      setRevealReady(true);
      setClipUnlocked(true);
      return undefined;
    }
    if (lettersDone) {
      const timeout = window.setTimeout(() => {
        setRevealReady(true);
      }, HERO_REVEAL_DELAY_MS);
      return () => window.clearTimeout(timeout);
    }

    const timeout = window.setTimeout(() => {
      setLettersDone(true);
    }, HERO_ENTRANCE_MS);
    return () => window.clearTimeout(timeout);
  }, [skipAnimations, lettersDone]);

  useEffect(() => {
    if (!reveal) return undefined;
    markHomeVisited();
    return undefined;
  }, [reveal]);

  useEffect(() => {
    if (!reveal || skipAnimations || clipUnlocked) return undefined;
    const timeout = window.setTimeout(
      () => {
        setClipUnlocked(true);
      },
      LAYOUT_EASE.duration * 1000 + 80,
    );
    return () => window.clearTimeout(timeout);
  }, [reveal, skipAnimations, clipUnlocked]);

  const scrollToSection = useCallback((section) => {
    if (section === "top") smoothScrollToTop();
    else if (section === "work") smoothScrollToRef(workRef);
    else if (section === "about") smoothScrollToRef(aboutRef);
  }, []);

  return (
    <div className="relative flex min-h-dvh w-full flex-col bg-[#161616] max-md:overflow-x-hidden">
      <div
        className={`mx-auto flex w-full max-w-[1600px] flex-col ${
          pageUnlocked ? "overflow-visible" : "max-h-dvh overflow-hidden"
        }`}
      >
        <div className="relative z-30  flex flex-col gap-4">
          <motion.div
            initial={
              skipAnimations
                ? { height: "auto", y: 0 }
                : { height: "100dvh", y: -28 }
            }
            animate={
              reveal ? { height: "auto", y: 0 } : { height: "100dvh", y: -28 }
            }
            transition={layoutTransition}
            onAnimationComplete={() => {
              if (reveal) setClipUnlocked(true);
            }}
            className="flex w-full items-center justify-start px-24 pt-14 relative max-md:px-5 max-md:pt-10"
          >
            <HeroSentence skipAnimations={skipAnimations} />
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
            className="grid w-full grid-cols-1 items-stretch gap-6 px-5 max-md:gap-6 md:gap-8 lg:grid-cols-12 lg:gap-3 lg:px-24"
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
                colSpan={PROJECT_GRID_SPANS[index] ?? 6}
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
      </div>
    </div>
  );
};

export default AnimationPage;
