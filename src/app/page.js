"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { ArrowUpRight, ArrowDown, Lock, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import Rounded from "./Components/Rounded";
import Footer from "./Components/Footer";
import Animatedparagrah from "./Components/Animatedparagrah";
import Animatedlink from "./Components/Animatedlink";
const HOME_VISITED_KEY = "portfolio-home-visited";

const EXPERIENCE_SORT_OPTIONS = [
  { value: "relevance", label: "By Relevance" },
  { value: "date", label: "By Date" },
  { value: "design", label: "Design" },
  { value: "swe", label: "SWE" },
];

const EXPERIENCES = [
  {
    id: "ibm",
    role: "swe + design @ IBM Research",
    period: "Summer '26",
    relevance: 0,
    dateKey: 20262,
    tags: ["swe"],
  },
  {
    id: "liberty",
    role: "swe + design @ Liberty Mutual",
    period: "Summer '25",
    relevance: 1,
    dateKey: 20252,
    tags: ["swe", "design"],
  },
  {
    id: "collabotory",
    role: "swe + design @ Collabotory",
    period: "Spring '26",
    relevance: 2,
    dateKey: 20261,
    tags: ["swe", "design"],
  },
  {
    id: "tiger",
    role: "design @ Tiger Snack Box",
    period: "Spring '25",
    relevance: 3,
    dateKey: 20251,
    tags: ["design"],
  },
  {
    id: "dnd",
    role: "design @ D&D Motor Systems",
    period: "Fall '24",
    relevance: 4,
    dateKey: 20243,
    tags: ["swe"],
  },
];

function getSortedExperiences(sortBy) {
  let list = [...EXPERIENCES];

  if (sortBy === "design") {
    list = list.filter((item) => item.tags.includes("design"));
  } else if (sortBy === "swe") {
    list = list.filter((item) => item.tags.includes("swe"));
  }

  if (sortBy === "date") {
    list.sort((a, b) => b.dateKey - a.dateKey);
  } else {
    list.sort((a, b) => a.relevance - b.relevance);
  }

  return list;
}

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

/** Match Animatedparagrah timing so links can stagger without waiting on onComplete + setState */
const AP_INTRO_DELAY_CHILDREN = 0.4;
const AP_LETTER_STAGGER = 0.004;
const AP_INTRO_TAIL_SEC = 0.22;

function countAnimatedLetters(segments) {
  if (!Array.isArray(segments)) return 0;
  return segments.reduce(
    (n, seg) =>
      n + Array.from(seg?.text ?? "").filter((c) => !/\s/.test(c)).length,
    0,
  );
}

/** Wall-clock duration for a letter-stagger paragraph to finish. */
function getAnimatedParagraphDuration(segments) {
  const n = countAnimatedLetters(segments);
  if (n === 0) return AP_INTRO_TAIL_SEC;
  return (
    AP_INTRO_DELAY_CHILDREN + (n - 1) * AP_LETTER_STAGGER + AP_INTRO_TAIL_SEC
  );
}

const STAGGER_ROW_GAP = 0.05;
const STAGGER_ROW_TAIL = 0.22;

function getStaggerRowDuration(count, skip) {
  if (skip || count <= 0) return 0;
  return (count - 1) * STAGGER_ROW_GAP + STAGGER_ROW_TAIL;
}

function markHomeVisited() {
  try {
    sessionStorage.setItem(HOME_VISITED_KEY, "true");
    notifyHomeVisitedSubscribers();
  } catch {
    /* ignore quota / private mode */
  }
}

/** Blur/fade entrance; renders a plain div when skip is true. */
function HomeEntrance({
  skip,
  delay = 0,
  className = "",
  children,
  onComplete,
}) {
  if (skip) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 80,
        mass: 0.5,
        delay,
      }}
      className={className}
      onAnimationComplete={onComplete}
    >
      {children}
    </motion.div>
  );
}

/** Staggered row (nav links, CTAs, list rows) after prior sequence steps. */
function HomeAnimatedLinks({
  skip,
  delay = 0,
  className = "",
  itemClassName = "",
  children,
  onComplete,
}) {
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
        hidden: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: { duration: 0 },
        },
      }
    : {
        hidden: { opacity: 0, y: 8, scale: 0.98, filter: "blur(6px)" },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: {
            type: "spring",
            stiffness: 500,
            damping: 35,
            mass: 0.5,
          },
        },
      };

  if (skip) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      animate="show"
      onAnimationComplete={(definition) => {
        if (definition === "show" && onComplete) onComplete();
      }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={item} className={itemClassName}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}

const ProjectCard = ({
  cover,
  technologies,
  title,
  link,
  className,
  icon,
  lines = true,
  video,
  children,
  delay = 0,
  skipEntrance = false,
}) => {
  const wrapClassName = `relative flex group  mx-auto flex-col gap-2  w-full ${className}`;
  const inner = (
    <>
      <Link
        href={link}
        className={`w-full active:scale-98 ${className} overflow-hidden group rounded-sm  overflow-y-hidden cursor-pointer  inset-shadow-sm inset-shadow-white relative  transition-transform duration-300 aspect-4/3 `}
      >
        {/* <div className="flex flex-col  z-10 scale-0 group-hover:scale-100 transition-transform duration-300  origin-top-left absolute top-0 left-0 ">
          <div className="flex items-start ">
            <div className="pr-3 pl-2 pb-2 pt-1 bg-white text-black/70 text-sm   rounded-br-xl">
              {title}
            </div>
            <Rounded
              width={24}
              height={24}
              className="rotate-270"
              fill="#ffffff"
            />
          </div>
          <Rounded
            width={24}
            height={24}
            className="rotate-270"
            fill="#ffffff"
          />
        </div> */}
        {/* <div className="flex flex-col scale-0 group-hover:scale-100 transition-transform duration-300 origin-bottom-right z-10 items-end right-0 bottom-0  absolute ">
          <Rounded
            width={24}
            height={24}
            className="rotate-90"
            fill="#ffffff"
          />
          <div className="flex items-end  ">
            <Rounded
              width={24}
              height={24}
              className="rotate-90"
              fill="#ffffff"
            />
            <div className="pl-3 pr-2 cursor-pointer group flex items-center gap-1 pt-2 pb-1   bg-white text-black/70 text-sm  rounded-tl-xl">
              More
              <ArrowUpRight
                strokeWidth={1}
                size={16}
                className="group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>
        </div> */}
        {/* {lines && (
        <div className="absolute top-0 left-0 z-1 w-full flex justify-between h-full">
          {Array.from({ length: 128 }).map((_, i) => (
            <div key={i} className="w-px z-1 h-full bg-white/10"></div>
          ))}
        </div>
      )} */}
        {cover && (
          <Image
            src={cover}
            alt={title}
            fill
            loading="lazy"
            quality={75}
            className="object-cover z-0 group-hover:scale-105 transition-transform duration-300  object-center"
          />
        )}
        {video && (
          <video
            src={video}
            autoPlay
            loop
            muted
            className="object-cover z-0 group-hover:scale-105 h-full  transition-transform duration-300  object-center"
          />
        )}
        {children}
        <div className="absolute top-0  flex flex-col gap-1 p-4   -translate-y-full group-hover:translate-y-0 transition-all duration-300  left-0 w-full  overflow-hidden group-hover:h-fit"></div>
      </Link>
      {/* <div className="flex group-hover:blur-none justify-between w-full ">
        <p className="">{title}</p>
        <div className="flex gap-1 items-center">
          <p>More</p>
          <ArrowUpRight
            strokeWidth={1}
            size={16}
            className="group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div> */}
    </>
  );

  if (skipEntrance) {
    return <div className={wrapClassName}>{inner}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 80,
        mass: 0.5,
        delay: delay,
      }}
      className={wrapClassName}
    >
      {inner}
    </motion.div>
  );
};

/** No Framer wrapper when skipping — avoids entrance animations after hydration/store updates. */
function NavChrome({ skip, isOpen, isScrolled, children }) {
  const className = `w-full   relative  flex z-50 justify-between items-center transition-all duration-300 ${isOpen ? "p-4" : ""}   mx-auto ${isScrolled && !isOpen ? "bg-white/20 backdrop-blur-sm p-4 xl:w-[70%] w-[80%] rounded-xl" : ""}`;
  if (skip) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(3px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 80,
        mass: 0.5,
        delay: 0.6,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function HeroVisual({ skip, delay = 0, className = "", children }) {
  const resolvedClassName = `w-full overflow-hidden relative ${className}`;
  if (skip) return <div className={resolvedClassName}>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 80,
        mass: 0.5,
        delay,
      }}
      className={resolvedClassName}
    >
      {children}
    </motion.div>
  );
}

function HomeLinksRow({ skip, linksContainer, linkItemResolved }) {
  if (skip) {
    return (
      <div className="flex gap-7">
        <a
          className="flex cursor-pointer  group items-center gap-1"
          href="https://linkedin.com/in/junhengzheng"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ArrowUpRight
            strokeWidth={1}
            size={20}
            className="group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300"
          />
          Contact
        </a>
        <a
          href="/Junheng_SWE_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex cursor-pointer  group items-center gap-1"
        >
          <ArrowUpRight
            strokeWidth={1}
            size={20}
            className="group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300"
          />
          Resume
        </a>
        <button
          type="button"
          className="flex cursor-pointer bg-transparent border-none p-0 font-inherit text-inherit  group items-center gap-1"
          onClick={() =>
            document
              .getElementById("works-grid")
              ?.scrollIntoView({ behavior: "smooth", block: "start" })
          }
        >
          <ArrowUpRight
            strokeWidth={1}
            size={20}
            className="group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300"
          />
          Works
        </button>
      </div>
    );
  }
  return (
    <motion.div
      className="flex gap-7"
      variants={linksContainer}
      initial="hidden"
      animate="show"
    >
      <motion.a
        variants={linkItemResolved}
        className="flex cursor-pointer  group items-center gap-1"
        href="https://linkedin.com/in/junhengzheng"
        target="_blank"
        rel="noopener noreferrer"
      >
        {" "}
        <ArrowUpRight
          strokeWidth={1}
          size={20}
          className="group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300"
        />
        Contact
      </motion.a>
      <motion.a
        variants={linkItemResolved}
        href="/Junheng_SWE_Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="flex cursor-pointer  group items-center gap-1"
      >
        <ArrowUpRight
          strokeWidth={1}
          size={20}
          className="group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300"
        />
        Resume
      </motion.a>
      <motion.button
        type="button"
        variants={linkItemResolved}
        className="flex cursor-pointer bg-transparent border-none p-0 font-inherit text-inherit  group items-center gap-1"
        onClick={() =>
          document
            .getElementById("works-grid")
            ?.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      >
        <ArrowUpRight
          strokeWidth={1}
          size={20}
          className="group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300"
        />
        Works
      </motion.button>
    </motion.div>
  );
}

const TypingText = ({ text, speed = 0.05, delay = 0 }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest));

  useEffect(() => {
    const controls = animate(count, text.length, {
      type: "tween",
      duration: text.length * speed,
      ease: "linear",
      delay: delay,
    });

    return controls.stop;
  }, []);

  return <motion.span>{displayText}</motion.span>;
};

const Page = () => {
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [experienceSort, setExperienceSort] = useState("relevance");
  const [experienceSortOpen, setExperienceSortOpen] = useState(false);
  const experienceSortRef = useRef(null);
  const skipAnimations = useSyncExternalStore(
    subscribeHomeVisited,
    getHomeVisitedSnapshot,
    getHomeVisitedServerSnapshot,
  );
  const delay = 0;

  useEffect(() => {
    if (prevPathnameRef.current === "/" && pathname !== "/") {
      try {
        sessionStorage.setItem(HOME_VISITED_KEY, "true");
        notifyHomeVisitedSubscribers();
      } catch {
        /* ignore */
      }
    }
    prevPathnameRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!experienceSortOpen) return;
    const handlePointerDown = (e) => {
      if (!experienceSortRef.current?.contains(e.target)) {
        setExperienceSortOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [experienceSortOpen]);

  const sortedExperiences = getSortedExperiences(experienceSort);
  const experienceSortLabel =
    EXPERIENCE_SORT_OPTIONS.find((o) => o.value === experienceSort)?.label ??
    "By Relevance";

  const nameSegments = [
    { text: "Junheng", italic: false },
    { text: " Zheng", italic: false },
  ];

  const sentence = [
    {
      text: "Jun combines design & development to create beautiful digital experiences. Current swe + design intern @ IBM Research, & prev. working on design systems @ Liberty Mutual Insurance.",
      italic: false,
    },
  ];

  const mobileSentence = [
    {
      text: "Junheng combines swe + design to create seamless, beautiful experiences. Currently a frontend developer @ IBM Research, and previously @ Liberty Mutual Insurance. ",
      italic: false,
    },
  ];

  const experienceTitleSegments = [{ text: "Experience", italic: false }];
  const hackathonsTitleSegments = [{ text: "Hackathons", italic: false }];

  const introDelay = 0;
  const introDuration = skipAnimations
    ? 0
    : getAnimatedParagraphDuration(sentence);

  const nameDelay = introDelay + introDuration;
  const nameDuration = skipAnimations
    ? 0
    : getAnimatedParagraphDuration(nameSegments);
  const afterIntroDelay = introDelay + introDuration;

  // Order: intro paragraph -> (nav links + CTA together) -> hero ...
  // Name is delayed so the intro paragraph is always first.
  const navLinksDelay = afterIntroDelay;
  const navLinksDuration = getStaggerRowDuration(3, skipAnimations);
  const ctaDelay = afterIntroDelay;
  const ctaDuration = getStaggerRowDuration(2, skipAnimations);
  const heroDelay = afterIntroDelay + Math.max(navLinksDuration, ctaDuration);

  // After the hero comes in, bring everything else in together.
  const HERO_ENTRANCE_TAIL_SEC = 0.35;
  const afterHeroDelay =
    heroDelay + (skipAnimations ? 0 : HERO_ENTRANCE_TAIL_SEC);

  const experienceDelay = afterHeroDelay;
  const experienceSortDelay = afterHeroDelay;
  const experienceListDelay = afterHeroDelay;
  const hackathonsDelay = afterHeroDelay;
  const hackathonsListDelay = afterHeroDelay;

  const linksContainer = skipAnimations
    ? {
        hidden: {},
        show: { transition: { staggerChildren: 0, delayChildren: 0 } },
      }
    : {
        hidden: {},
        show: {
          transition: {
            staggerChildren: STAGGER_ROW_GAP,
            delayChildren: ctaDelay,
          },
        },
      };

  const linkItem = {
    hidden: { opacity: 0, y: 8, scale: 0.98, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 500, damping: 35, mass: 0.5 },
    },
  };

  const linkItemResolved = skipAnimations
    ? {
        hidden: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
        },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: { duration: 0 },
        },
      }
    : linkItem;

  return (
    <div className="flex max-w-[1700px] mx-auto  font-light px-auto w-full flex-col xl:gap-13 gap-10 py-4 xl:py-10 text-black/70  text-md ">
      {/* menu */}

      <div className="w-full flex flex-col  px-4   2xl:px-96 xl:px-48  gap-2 md:items-center justify-center">
        <Animatedparagrah
          className="alice uppercase text-2xl font-bold"
          segments={nameSegments}
          skipAnimation={skipAnimations}
          delayChildren={nameDelay}
        />
        <HomeAnimatedLinks
          skip={skipAnimations}
          delay={navLinksDelay}
          className="flex gap-4"
        >
          <Animatedlink link="/Junheng_SWE_Resume.pdf">Resume</Animatedlink>
          <Animatedlink href="https://www.linkedin.com/in/junhengzheng/">
            LinkedIn
          </Animatedlink>
          <Animatedlink href="https://github.com/junheng-zheng">
            Github
          </Animatedlink>
        </HomeAnimatedLinks>
      </div>
      <div className="flex flex-col items-center   px-4   2xl:px-96 xl:px-48   gap-5">
        <Animatedparagrah
          className="z-20 text-lg w-full  text-center hidden md:block md:w-1/2"
          segments={sentence}
          skipAnimation={skipAnimations}
          delayChildren={introDelay}
        />
        <Animatedparagrah
          className="z-20 text-lg w-full  block md:hidden md:w-1/2"
          segments={mobileSentence}
          skipAnimation={skipAnimations}
          delayChildren={introDelay}
        />
        <HomeAnimatedLinks
          skip={skipAnimations}
          delay={ctaDelay}
          className="flex w-full md:justify-center gap-3"
        >
          <Link
            href="https://linkedin.com/in/junhengzheng"
            type="button"
            className="px-3 py-1 border cursor-pointer active:scale-98 transition-transform duration-300 w-fit text-nowrap flex gap-1 items-center border-gray-200 rounded-md text-sm"
          >
            Contact
            <ArrowUpRight strokeWidth={1} size={16} />
          </Link>
          <Link
            href="/manifesto"
            className="px-3 py-1 border cursor-pointer active:scale-98 transition-transform duration-300 w-fit text-nowrap flex gap-1 items-center border-gray-200 rounded-md text-sm"
          >
            About
            <ArrowUpRight strokeWidth={1} size={16} />
          </Link>
        </HomeAnimatedLinks>
        {/* <HomeLinksRow
          skip={skipAnimations}
          linksContainer={linksContainer}
          linkItemResolved={linkItemResolved}
        /> */}
        {/* <div className="flex  justify-center">
          <div className="w-fit flex gap-2 ">
            <div className="h-full flex  items-start justify-between">
              <img
                src="/testlanding/timer.png"
                alt="Dandi"
                className="h-[75%] aspect-square"
              />
            </div>
            <div className=" h-full flex  items-end justify-between">
              <img
                src="/testlanding/keyboard.png"
                alt="Dandi"
                className="h-[75%]"
              />
            </div>
            <div className=" h-full flex  items-end justify-between">
              <img
                src="/testlanding/keyboard.png"
                alt="Dandi"
                className="h-[75%]"
              />
            </div>
            <div className=" h-full flex  items-end justify-between">
              <img
                src="/testlanding/keyboard.png"
                alt="Dandi"
                className="h-[75%]"
              />
            </div>
          </div>
        </div> */}

        {/* <div className="w-full flex justify-between leading-tight text-sm mono items-center">
          <p> [Contact]</p>
          <p>[Resume]</p>
        </div> */}
      </div>
      <HeroVisual skip={skipAnimations} delay={heroDelay}>
        <div className="w-full h-[240px] overflow-hidden md:h-[400px] relative block">
          <Image
            src="/wallpaper/naturepainting.jpg"
            alt="hero"
            fill
            className="object-cover object-bottom"
          />
        </div>

        {/* <div className="flex justify-between w-full h-full">
          {Array.from({ length: 120 }).map((_, i) => (
            <div key={i} className="h-full rotate-5 w-full relative  ">
              <div className="absolute inset-0 rounded-r-[200%] border-r  border-black/40"></div>
            </div>
          ))}
        </div>
        <div className="flex absolute inset-0 justify-between  h-full">
          {Array.from({ length: 120 }).map((_, i) => (
            <div key={i} className="h-full w-full relative  ">
              <div className="absolute inset-0 rounded-l-[200%] border-l border-black/40"></div>
            </div>
          ))}
        </div>
        <div className="flex absolute left-0 w-full top-1/2 -translate-y-1/2 justify-between  h-[75%]">
          {Array.from({ length: 120 }).map((_, i) => (
            <div key={i} className="-rotate-5 h-full w-full relative  ">
              <div className="absolute inset-0 rounded-l-[200%] border-l border-black"></div>
            </div>
          ))}
        </div>
        <div className="flex absolute left-0 w-full top-1/2 -translate-y-1/2 justify-between  h-[50%]">
          {Array.from({ length: 120 }).map((_, i) => (
            <div key={i} className="rotate-5 h-full w-full relative  ">
              <div className="absolute inset-0 rounded-l-[200%] border-l border-black"></div>
            </div>
          ))}
        </div> */}
        {/* <div className="flex absolute left-0 w-full top-1/2 -translate-y-1/2 justify-between  h-[10%]">
          {Array.from({ length: 120 }).map((_, i) => (
            <div key={i} className="-rotate-5 h-full w-full relative  ">
              <div className="absolute inset-0 rounded-l-[200%] border-l border-black"></div>
            </div>
          ))}
        </div> */}
      </HeroVisual>

      {/* <div className="py-7 flex text-lg text-center  justify-center">
        <p className="w-full md:w-1/2">
          Junheng has worked with startups, small businesses, and fortune 100s,
          and freelance work.Check out some of his works below.
        </p>
      </div> */}
      {/* <div className="w-full relative overflow-hidden 2xl:h-[320px] h-[320px] rounded-xl  flex items-center justify-between">
        {Array.from({ length: 256 }).map((_, i) => (
          <div key={i} className="w-px z-1 h-full bg-white/20"></div>
        ))}

        <img
          src="/testold.jpeg"
          alt="hero"
          className="object-cover absolute top-0 left-0 w-full h-full object-center rounded-xl"
        />
      </div> */}

      {/* <div className="tech-marquee w-full   flex  justify-center   overflow-hidden  text-xs uppercase bg-white z-50 text-nowrap border-t border-white/10 ">
        <div className=" flex items-center w-[70%] md:w-[50%]">
          <div className="relative w-full py-2 items-center  overflow-hidden flex-1 flex">
            <div className="pointer-events-none absolute top-0 left-0 z-20  md:w-[15%] h-full bg-linear-to-r from-white via-white to-transparent"></div>
            <div className="pointer-events-none absolute top-0 right-0 z-20 w-[15%] h-full bg-linear-to-l from-white via-white to-transparent"></div>
            <div className="tech-marquee__track w-full h-full flex ">
              <div className="flex items-center gap-6 px-3">
                <p>React</p>
                <p>Tailwind</p>
                <p>Figma</p>
                <p>Javascript</p>
                <p>Typescript</p>
                <p>Framer Motion</p>
                <p>Vercel</p>
                <p>Next.js</p>
                <p>Node.js</p>
                <p>Express</p>
                <p>MongoDB</p>
                <p>PostgreSQL</p>
                <p>MySQL</p>
                <p>React</p>
                <p>Tailwind</p>
                <p>Figma</p>
                <p>Javascript</p>
                <p>Typescript</p>
                <p>Framer Motion</p>
                <p>Vercel</p>
                <p>Next.js</p>
                <p>Node.js</p>
                <p>Express</p>
                <p>MongoDB</p>
                <p>PostgreSQL</p>
                <p>MySQL</p>
              </div>
              <div className="flex items-center  gap-6 px-3" aria-hidden="true">
                <p>React</p>
                <p>Tailwind</p>
                <p>Figma</p>
                <p>Javascript</p>
                <p>Typescript</p>
                <p>Framer Motion</p>
                <p>Vercel</p>
                <p>Next.js</p>
                <p>Node.js</p>
                <p>Express</p>
                <p>MongoDB</p>
                <p>PostgreSQL</p>
                <p>MySQL</p>
                <p>React</p>
                <p>Tailwind</p>
                <p>Figma</p>
                <p>Javascript</p>
                <p>Typescript</p>
                <p>Framer Motion</p>
                <p>Vercel</p>
                <p>Next.js</p>
                <p>Node.js</p>
                <p>Express</p>
                <p>MongoDB</p>
                <p>PostgreSQL</p>
                <p>MySQL</p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="w-full flex flex-col gap-15 md:gap-26  md:items-center justify-center  px-4   2xl:px-96 xl:px-48 ">
        <div className="flex md:mx-auto w-full md:w-fit flex-col gap-6 md:gap-9 md:items-center justify-center">
          <div className="flex md:items-center flex-col gap-2 justify-center">
            <Animatedparagrah
              className="alice uppercase text-2xl font-bold"
              segments={experienceTitleSegments}
              skipAnimation={skipAnimations}
              delayChildren={experienceDelay}
            />
            <HomeEntrance
              skip={skipAnimations}
              delay={experienceSortDelay}
              className="relative w-fit"
            >
              <div ref={experienceSortRef} className="relative w-fit">
                <button
                  type="button"
                  aria-expanded={experienceSortOpen}
                  aria-haspopup="listbox"
                  onClick={() => setExperienceSortOpen((open) => !open)}
                  className="px-3 py-1 border cursor-pointer active:scale-98 transition-transform duration-300 w-[140px] text-nowrap justify-between flex gap-1 items-center border-gray-200 rounded-md text-sm"
                >
                  {experienceSortLabel}
                  <ChevronDown
                    size={16}
                    strokeWidth={1}
                    className={`transition-transform duration-200 ${experienceSortOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <ul
                  role="listbox"
                  aria-label="Sort experience"
                  className={`absolute left-0 top-full z-50 mt-1 min-w-full text-nowrap overflow-hidden rounded-md border border-gray-200 bg-white py-1 text-sm shadow-sm ${experienceSortOpen ? "opacity-100" : "opacity-0 scale-95 pointer-events-none"} transition-all duration-300`}
                >
                  {EXPERIENCE_SORT_OPTIONS.map((option) => (
                    <li
                      key={option.value}
                      role="option"
                      aria-selected={experienceSort === option.value}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setExperienceSort(option.value);
                          setExperienceSortOpen(false);
                        }}
                        className={`w-full px-3 py-1.5 text-left cursor-pointer hover:bg-gray-50 ${experienceSort === option.value ? "bg-gray-50 font-medium" : ""}`}
                      >
                        {option.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </HomeEntrance>
          </div>

          <HomeAnimatedLinks
            skip={skipAnimations}
            delay={experienceListDelay}
            className="md:w-[440px] w-full flex flex-col gap-2"
          >
            {sortedExperiences.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <p>{item.role}</p>
                <p>{item.period}</p>
              </div>
            ))}
          </HomeAnimatedLinks>
        </div>
        <div className="flex md:mx-auto w-full flex-col gap-6 md:gap-9 md:items-center justify-center">
          <Animatedparagrah
            className="alice uppercase text-2xl font-bold"
            segments={hackathonsTitleSegments}
            skipAnimation={skipAnimations}
            delayChildren={hackathonsDelay}
          />
          {/* <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <ProjectCard
              cover="/cardcovers/makerfixed2.png"
              technologies={[
                "Figma",
                "React",
                "Next.js",
                "Node.js",
                "Typescript",
                "Vercel",
              ]}
              title="UXInterviewer"
              link="/projects/uxinterviewer"
              className="w-full"
            />
            <ProjectCard
              cover="/cardcovers/proprio.png"
              technologies={[
                "Figma",
                "React",
                "Next.js",
                "Node.js",
                "Typescript",
                "Vercel",
              ]}
              title="UXInterviewer"
              link="/projects/uxinterviewer"
              className="w-full"
            />
          </div> */}
          <HomeAnimatedLinks
            skip={skipAnimations}
            delay={hackathonsListDelay}
            className="md:w-[440px] w-full flex flex-col gap-2"
            onComplete={() => {
              if (!skipAnimations) markHomeVisited();
            }}
          >
            <div className="flex items-center justify-between">
              <p>Lifestory (Winner)</p>
              <p>Uncommon Hacks &apos;26</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Proprio</p>
              <p>Figbuild &apos;26</p>
            </div>
          </HomeAnimatedLinks>
        </div>
      </div>

      {/* <div className="w-full flex flex-col py-12 gap-12">

        <p className="w-1/2">
          I started my journey studying industrial and product design at
          Brooklyn Technical Highschool. After graduating, I started my
          undergraduate at RIT studying Web and Mobile Computing , a major that
          combines developement and design. since then, I have worked with
          startups, small businesses, and fortune 100s, and freelance work to
          create seamless digital experiences.
        </p>
        <div className="relative h-96 rounded-lg overflow-hidden">
          <Image
            src="/jun/junback.jpeg"
            alt="about"
            fill
            className="object-cover object-center"
          />
        </div>
      </div> */}
      {/* <Footer /> */}
    </div>
  );
};

export default Page;

// Top-left corner dot
//         <div
//           className={`bg-black/70 rounded-full transition-all duration-200 ${isOpen ? "scale-0 translate-y-full translate-x-full" : "hidden scale-100"}`}
//         />
//         {/* Top center - vertical line */}
//         <div className="flex items-center justify-center">
//           <div
//             className={`bg-black/70 w-full h-full transition-all duration-500 ${isOpen ? "w-px" : "hidden rounded-full"}`}
//           />
//         </div>
//         {/* Top-right corner dot */}
//         <div
//           className={`bg-black/70 rounded-full transition-all duration-200 ${isOpen ? "scale-0 translate-y-full -translate-x-full" : "scale-100"}`}
//         />
//         {/* Middle-left - horizontal line */}
//         <div className="flex items-center justify-center">
//           <div
//             className={`bg-black/70 w-full h-full transition-all duration-500 ${isOpen ? "h-px" : "hidden rounded-full"}`}
//           />
//         </div>
//         {/* Center - cross intersection */}
//         <div className="flex relative items-center justify-center">
//           <div
//             className={`bg-black/70 w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${isOpen ? "w-px" : "rounded-full"}`}
//           />
//           <div
//             className={`bg-black/70 w-full h-full transition-all duration-500 ${isOpen ? "h-px" : "rounded-full"}`}
//           />
//         </div>
//         {/* Middle-right - horizontal line */}
//         <div className="flex items-center justify-center">
//           <div
//             className={`bg-black/80 w-full h-full transition-all duration-500 ${isOpen ? "h-px" : "rounded-full"}`}
//           />
//         </div>
//         {/* Bottom-left corner dot */}
//         <div
//           className={`bg-black/70 rounded-full transition-all duration-200 ${isOpen ? "scale-0 -translate-y-full translate-x-full" : "scale-100"}`}
//         />
//         {/* Bottom center - vertical line */}
//         <div className="flex items-center justify-center">
//           <div
//             className={`bg-black/70 w-full h-full transition-all duration-500 ${isOpen ? "w-px" : "hidden rounded-full"}`}
//           />
//         </div>
//         {/* Bottom-right corner dot */}
//         <div
//           className={`bg-black/70 rounded-full transition-all duration-200 ${isOpen ? "scale-0 -translate-y-full -translate-x-full" : "scale-100"}`}
//         />
