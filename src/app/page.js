"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { ArrowUpRight, ArrowDown, Lock } from "lucide-react";
import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import Rounded from "./Components/Rounded";
import Footer from "./Components/Footer";
import Animatedparagrah from "./Components/Animatedparagrah";
const HOME_VISITED_KEY = "portfolio-home-visited";

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
const AP_INTRO_DELAY_CHILDREN = 0.05;
const AP_LETTER_STAGGER = 0.006;
const AP_INTRO_TAIL_SEC = 0.38;

function countAnimatedLetters(segments) {
  if (!Array.isArray(segments)) return 0;
  return segments.reduce(
    (n, seg) =>
      n + Array.from(seg?.text ?? "").filter((c) => !/\s/.test(c)).length,
    0,
  );
}

/** Wall-clock delay before the link row stagger should begin (after intro letters). */
function getLinksDelayAfterIntro(segments) {
  const n = countAnimatedLetters(segments);
  if (n === 0) return AP_INTRO_TAIL_SEC;
  return (
    AP_INTRO_DELAY_CHILDREN + (n - 1) * AP_LETTER_STAGGER + AP_INTRO_TAIL_SEC
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
        delay: 1.8,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function HeroVisual({ skip, children }) {
  const className =
    "w-full h-[400px] hidden overflow-hidden rounded-md  relative flex justify-center  ";
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
        delay: 1.8,
      }}
      className={`${className}  `}
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

  const sentence = [
    {
      text: "Junheng combines design and development to create seamless digital experiences. Incoming SWE + Designer @ ",
      italic: false,
    },
    { text: "IBM Research", italic: false },
    { text: ", prev. working on design systems @ ", italic: false },
    { text: "Liberty Mutual Insurance", italic: false },
    { text: ".", italic: false },
  ];

  const linksDelayAfterIntro = getLinksDelayAfterIntro(sentence);

  const linksContainer = skipAnimations
    ? {
        hidden: {},
        show: { transition: { staggerChildren: 0, delayChildren: 0 } },
      }
    : {
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.08,
            delayChildren: linksDelayAfterIntro,
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
    <div className="flex max-w-[1700px] mx-auto  font-light px-4   2xl:px-96 xl:px-48 px-auto w-full flex-col xl:gap-13 gap-12 py-4 xl:py-10 text-black/70  text-md ">
      {/* menu */}
      <NavChrome skip={skipAnimations} isOpen={isOpen}>
        <p className="-tracking-[1px] text-black text-lg font-black ">JUN</p>

        {/* <Image
          src="/logo.png"
          alt="Junheng Zheng"
          width={36}
          height={36}
          loading="lazy"
          quality={75}
        /> */}
        <div
          className={`absolute flex flex-col gap-4 top-0 left-0 w-full overflow-hidden h-fit bg-white   rounded-xl border-t   ${isOpen ? "xl:max-h-[300px] max-h-[800px] border-gray-100  p-4 shadow-sm shadow-gray-200" : "border-white border-none max-h-0"} transition-all duration-300`}
        >
          <h2 className="text-lg  ">Menu</h2>

          <div className="flex md:flex-row z-30 flex-col gap-4">
            <div className="flex flex-1 flex-col gap-3">
              <Link
                href="https://mail.google.com/mail/?view=cm&fs=1&to=jz7259@g.rit.edu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex cursor-pointer  active:scale-98  transition-transform duration-300 items-center gap-3 h-fit p-4 bg-gray-50 inset-shadow-sm  border border-gray-100 inset-shadow-white rounded-md"
              >
                <div className="w-10 h-10 rounded-md flex bg-white inset-shadow-sm inset-shadow-black/5 items-center justify-center">
                  <Image
                    src="/isometrics/gmail.png"
                    alt="Email"
                    width={32}
                    height={32}
                    loading="lazy"
                    quality={75}
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-md">Email</p>
                  <p className="text-xs text-gray-500">jz7259@g.rit.edu</p>
                </div>
              </Link>
              <Link
                href="https://linkedin.com/in/junhengzheng"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex cursor-pointer bg-gray-50 inset-shadow-sm inset-shadow-white  active:scale-98 transition-transform duration-300 items-center gap-3 h-fit p-4 border border-gray-100 rounded-md"
              >
                <div className="w-10 h-10 rounded-md flex bg-white inset-shadow-sm inset-shadow-black/5 items-center justify-center">
                  <Image
                    src="/isometrics/linkedin.png"
                    alt="Email"
                    width={32}
                    height={32}
                    loading="lazy"
                    quality={75}
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-md">LinkedIn</p>
                  <p className="text-xs text-gray-500">@Junheng Zheng</p>
                </div>
              </Link>
            </div>
            <div className="flex flex-1 flex-col gap-3">
              <Link
                href="https://mail.google.com/mail/?view=cm&fs=1&to=jz7259@g.rit.edu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex cursor-pointer  active:scale-98  transition-transform duration-300 items-center gap-3 h-fit p-4 bg-gray-50 inset-shadow-sm  border border-gray-100 inset-shadow-white rounded-md"
              >
                <div className="w-10 h-10 rounded-md flex bg-white inset-shadow-sm inset-shadow-black/5 items-center justify-center">
                  <Image
                    src="/isometrics/gmail.png"
                    alt="Email"
                    width={32}
                    height={32}
                    loading="lazy"
                    quality={75}
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-md">Manifesto</p>
                  <p className="text-xs text-gray-500">jz7259@g.rit.edu</p>
                </div>
              </Link>
              <Link
                href="https://linkedin.com/in/junhengzheng"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex cursor-pointer bg-gray-50 inset-shadow-sm inset-shadow-white  active:scale-98 transition-transform duration-300 items-center gap-3 h-fit p-4 border border-gray-100 rounded-md"
              >
                <div className="w-10 h-10 rounded-md flex bg-white inset-shadow-sm inset-shadow-black/5 items-center justify-center">
                  <Image
                    src="/isometrics/linkedin.png"
                    alt="Email"
                    width={32}
                    height={32}
                    loading="lazy"
                    quality={75}
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-md">LinkedIn</p>
                  <p className="text-xs text-gray-500">@Junheng Zheng</p>
                </div>
              </Link>
            </div>
            <div className="flex flex-1 flex-col gap-3">
              <Link
                href="/Junheng_SWE_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex cursor-pointer bg-gray-50 inset-shadow-sm inset-shadow-white  active:scale-98 transition-transform duration-300 items-center gap-3 h-fit p-4 border border-gray-100 rounded-md"
              >
                <div className="w-10 h-10 rounded-md flex bg-white inset-shadow-sm inset-shadow-black/5 items-center justify-center">
                  <Image
                    src="/isometrics/resume.png"
                    alt="Resume"
                    width={32}
                    height={32}
                    loading="lazy"
                    quality={75}
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-md">Resume</p>
                  <p className="text-xs text-gray-500">Dev + Design</p>
                </div>
              </Link>
              <Link
                href="https://github.com/junheng-zheng"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex cursor-pointer bg-gray-50 inset-shadow-sm inset-shadow-white  active:scale-98 transition-transform duration-300 items-center gap-3 h-fit p-4 border border-gray-100 rounded-md"
              >
                <div className="w-10 h-10 rounded-md flex bg-white inset-shadow-sm inset-shadow-black/5 items-center justify-center">
                  <Image
                    src="/isometrics/github.png"
                    alt="Github"
                    width={32}
                    height={32}
                    loading="lazy"
                    quality={75}
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-md">Github</p>
                  <p className="text-xs text-gray-500">@junhengzheng</p>
                </div>
              </Link>
            </div>
            {/* <div className="md:hidden group cursor-pointer lg:flex flex flex-1 flex-col overflow-hidden justify-center py-16 p-3  md:py-3 gap-2  grow relative items-center rounded-xl ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1920 1080"
                preserveAspectRatio="none"
                className="absolute inset-0   w-full h-full opacity-30 pointer-events-none z-0"
              >
                <filter id="noiseFilter">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="10"
                    numOctaves="2"
                    stitchTiles="stitch"
                  />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
              </svg>
              <video
                autoPlay
                muted
                playsInline
                loop
                preload="auto"
                controls={false}
                className="object-cover -z-20 brightness-120 group-hover:scale-105 transition-transform duration-300 origin-top-left absolute left-0 top-0 rounded-xl w-full h-full object-[10%_25%]"
              >
                <source src="/projectcards/dandi.mp4" type="video/mp4" />
              </video>

              <h2 className="flex items-center group-hover:scale-105 transition-transform duration-300 font-normalgap-1  z-2 text-amber-500 text-2xl">
                Let&apos;s Connect.
                <ArrowUpRight
                  strokeWidth={1}
                  size={32}
                  className="group-hover:rotate-45 stroke-amber-500 transition-transform duration-300"
                />
              </h2>
            </div> */}
          </div>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex flex-col w-[20px] opacity-80 h-[20px] relative cursor-pointer active:scale-88 transition-transform duration-300 group ${isOpen ? "rotate-45 gap-0" : "gap-px"}`}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <div className="w-full h-full gap-px flex items-center justify-center">
            <div className="w-1/3 h-full opacity-0"></div>
            <div
              className={` bg-black rounded-full transition-all duration-300  h-full ${isOpen ? "w-px" : "w-1/3"}`}
            ></div>
            <div className="w-1/3 h-full opacity-0"></div>
          </div>
          <div
            className={`w-full h-full  flex items-center justify-center ${isOpen ? "gap-0" : "gap-px"}`}
          >
            <div
              className={` bg-black rounded-full transition-all duration-300  w-1/3  ${isOpen ? "h-px" : "h-full"}`}
            ></div>
            <div className="w-1/3 h-full rounded-full relative ">
              <div
                className={` bg-black  transition-all duration-300  w-full absolute top-1/2 left-0  translate-y-[calc(-50%+0px)] ${isOpen ? "h-px" : "h-full rounded-full"}`}
              ></div>
              <div
                className={` bg-black  transition-all duration-300  h-full absolute top-0 left-1/2 translate-x-[calc(-50%+0px)] ${isOpen ? "w-px" : "w-full rounded-full"}`}
              ></div>
            </div>
            <div
              className={` bg-black rounded-full transition-all duration-300  w-1/3  ${isOpen ? "h-px" : "h-full"}`}
            ></div>
          </div>
          <div className="w-full h-full gap-px flex items-center justify-center">
            <div className="w-1/3 h-full opacity-0"></div>
            <div
              className={` bg-black rounded-full transition-all duration-300  h-full ${isOpen ? "w-px" : "w-1/3"}`}
            ></div>
            <div className="w-1/3 h-full opacity-0"></div>
          </div>
        </button>
      </NavChrome>
      {/* <div className="flex hidden flex-col gap-4">
        <div className="flex flex-col gap-2  instrument-serif text-2xl ">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: delay }}
            className="py-1.5 pl-1 pr-3 bg-gray-100/80 rounded-xl border-r border-white/20 shadow-sm inset-shadow-sm inset-shadow-white w-fit flex items-center gap-2"
          >
            <div className=" py-1 px-3 bg-blue-100 inset-shadow-sm border-r border-white/30 inset-shadow-white shadow-sm overflow-hidden relative rounded-xl ">
              <TypingText text="Design Engineer" speed={0.05} delay={delay} />
            </div>
            <div>🌷based in New York City</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: delay + 0.25 }}
            className="py-1.5 pl-3 pr-1 bg-gray-100/80 rounded-xl inset-shadow-sm border-r border-white/30 inset-shadow-white shadow-sm w-fit flex items-center gap-2"
          >
            <div className="xl:block hidden">Passionate about creating 🌼</div>
            <div className="xl:hidden block">Creating</div>

            <div className=" py-1 px-3 bg-yellow-100 inset-shadow-sm border-r border-white/30 inset-shadow-white shadow-sm overflow-hidden relative rounded-xl ">
              <TypingText
                text=" seamless digital experiences"
                speed={0.05}
                delay={delay}
              />
            </div>
          </motion.div>
        </div>

        <div className="flex gap-3 ">
          <button className="cursor-pointer active:scale-98 bg-white group hover:scale-101 transition-transform duration-300 px-4 py-2 border flex gap-2 items-center border-gray-200/80 rounded-md">
            Contact
            <ArrowUpRight
              strokeWidth={1}
              size={16}
              className="group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300"
            />
          </button>
          <button className="cursor-pointer active:scale-98 bg-white group hover:scale-101 transition-transform duration-300 px-4 py-2 border flex gap-2 items-center border-gray-200/80 rounded-md">
            Resume
            <ArrowUpRight
              strokeWidth={1}
              size={16}
              className="group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300"
            />
          </button>
        </div>
      </div> */}
      <div className="flex flex-col gap-6">
        {/* <div className="w-full flex justify-between text-sm  leading-tight mono items-center">
          <p> [Based in NYC]</p>
          <p>[10:38]</p>
        </div> */}
        <Animatedparagrah
          className="z-20 text-lg w-full  md:w-1/2"
          segments={sentence}
          skipAnimation={skipAnimations}
          onComplete={() => {
            try {
              sessionStorage.setItem(HOME_VISITED_KEY, "true");
            } catch {
              /* ignore quota / private mode */
            }
          }}
        />
        <HomeLinksRow
          skip={skipAnimations}
          linksContainer={linksContainer}
          linkItemResolved={linkItemResolved}
        />
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
        <HeroVisual
          skip={skipAnimations}
          className="w-full  flex justify-between"
        >
          {/* <div className="w-full h-full grid gap-2relative grid-rows-3 grid-cols-5 ">
            <div className="absolute left-1/5 h-full w-px bg-black/20 z-10"></div>
            <div className="absolute left-2/5 h-full w-px bg-black/20 z-10"></div>
            <div className="absolute left-3/5 h-full w-px bg-black/20 z-10"></div>
            <div className="absolute left-4/5 h-full w-px bg-black/20 z-10"></div>
            <div className="absolute left-1/5 h-full w-px bg-black/20 z-10"></div>
            <div className="absolute top-1/3 w-full h-px bg-black/20 z-10"></div>
            <div className="absolute top-2/3 w-full h-px bg-black/20 z-10"></div>
            <div className="w-full h-full relative row-span-1 p-2">
              <div className="relative">
                <Image
                  src="/testlanding/timer.png"
                  alt="Dandi"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
            <div className="w-full h-full bg-blue-500 relative col-span-2 row-span-2">
              <Image
                src="/testlanding/timer.png"
                alt="Dandi"
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="w-full h-full bg-red-500 relative row-span-1 row-start-2 col-start-2">
              <Image
                src="/testlanding/timer.png"
                alt="Dandi"
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="w-full h-full bg-red-500 relative row-span-1 row-start-2 col-start-5">
              <Image
                src="/testlanding/timer.png"
                alt="Dandi"
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="w-full h-full bg-blue-500 relative row-start-3 col-span-2  row-span-1">
              <Image
                src="/testlanding/timer.png"
                alt="Dandi"
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="w-full h-full bg-red-500 relative row-start-3 col-start-4   row-span-1">
              <Image
                src="/testlanding/timer.png"
                alt="Dandi"
                fill
                className="object-cover object-center"
              />
            </div>
          </div> */}
          <Image
            src="/wallpaper/flower.jpg"
            alt="Hero"
            fill
            className="object-cover object-center"
          />
          {/* <div className="w-full h-full md:hidden flex justify-between">
            {Array.from({ length: 120 }).map((_, i) => (
              <div key={i} className="w-px h-full bg-white/30 relative"></div>
            ))}
          </div>
          <div className="w-full h-full hidden md:flex justify-between">
            {Array.from({ length: 240 }).map((_, i) => (
              <div key={i} className="w-px h-full bg-white/30 relative"></div>
            ))}
          </div>
          <video
            src="/projectcards/dandi.mp4"
            autoPlay
            loop
            muted
            playsInline
            webkit-playsinline="true"
            disablePictureInPicture
            controls={false}
            className="object-cover -z-20 brightness-120 saturate-0 scale-145 origin-top-left object-[50%_130%] xl:origin-center xl:scale-100 absolute left-0 top-0 w-full h-full md:object-center "
          /> */}
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1920 1080"
            preserveAspectRatio="none"
            className="absolute inset-0   w-full h-full opacity-30 pointer-events-none z-0"
          >
            <filter id="noiseFilter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="10"
                numOctaves="2"
                stitchTiles="stitch"
              />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg> */}
        </HeroVisual>
        {/* <div className="w-full flex justify-between leading-tight text-sm mono items-center">
          <p> [Contact]</p>
          <p>[Resume]</p>
        </div> */}
      </div>
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

      {/* <div className="tech-marquee w-full fixed bottom-0 left-0   flex  justify-center   overflow-hidden  text-xs uppercase bg-white z-50 text-nowrap border-t border-white/10 ">
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

      <div
        id="works-grid"
        className="grid flex-1 grid-cols-1 saturate-105 md:grid-cols-8 gap-6 scroll-mt-24"
      >
        <ProjectCard
          cover="/cardcovers/makerfixed2.png"
          technologies={["Figma", "React", "Typescript", "SCSS", "Storybook"]}
          title="Design Engineer @ Crafty Studios "
          link="/works/makerspace"
          icon="/isometrics/liberty.png"
          className="md:col-span-4 "
          delay={2.2}
          skipEntrance={skipAnimations}
        />
        <ProjectCard
          cover="/cardcovers/ibmstill.png"
          technologies={["Figma", "SwiftUI", "Kotlin"]}
          title="SWE Intern @ IBM Research"
          link="/works/pack"
          icon="/isometrics/meditate.png"
          className="md:col-span-4"
          delay={2.2}
          skipEntrance={skipAnimations}
        >
          {/* <div className="flex flex-col z-50 group-hover:scale-0 transition-transform duration-300  origin-top-left absolute top-0 left-0 ">
            <div className="flex items-start ">
              <div className="pr-3 pl-2 pb-2 pt-1 bg-white text-black/70 text-sm   rounded-br-xl">
                Coming Soon
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
        </ProjectCard>
        <ProjectCard
          cover="/cardcovers/limi.gif"
          technologies={["Figma", "React", "Typescript", "SCSS", "Storybook"]}
          title="Design Engineer @ LMI "
          link="/works/libertymutual"
          icon="/isometrics/liberty.png"
          className="md:col-span-4 "
          delay={2.2}
          skipEntrance={skipAnimations}
        />

        <ProjectCard
          cover="/cardcovers/propriomock.png"
          technologies={["Figma", "React", "Typescript", "SCSS", "Storybook"]}
          title="Figbuild 2026 [Proprio]"
          link="/works/proprio"
          icon="/isometrics/liberty.png"
          className="md:col-span-4 saturate-100 "
          delay={2.2}
          skipEntrance={skipAnimations}
        />

        {/* <ProjectCard
          cover="/projectcards/packgame.png"
          technologies={["Figma", "React", "Typescript", "SCSS", "Storybook"]}
          title="PACK! Mobile Game"
          link="/works/pack"
          icon="/isometrics/liberty.png"
          className="md:col-span-4"
          skipEntrance={skipAnimations}
        /> */}
      </div>

      <div className="w-full flex flex-col  ">
        <div className="w-full border-b border-gray-200/80 md:flex-row flex-col-reverse py-4 gap-1 flex justify-between items-start md:items-center">
          <p>Frontend Developer Intern @ IBM Research</p>
          <p className="text-sm md:text-base opacity-80 md:opacity-100">
            Incoming Summer 2026
          </p>
        </div>
        <div className="w-full border-b border-gray-200/80 md:flex-row flex-col-reverse py-4 gap-1 flex justify-between items-start md:items-center">
          <p>UX Engineer Intern @ Liberty Mutual Insurance</p>
          <p className="text-sm md:text-base opacity-80 md:opacity-100">
            Summer 2025
          </p>
        </div>
        <div className="w-full border-b border-gray-200/80 md:flex-row flex-col-reverse py-4 gap-1 flex justify-between items-start md:items-center">
          <p>Frontend Developer Intern @ D&D Motor Systems</p>
          <p className="text-sm md:text-base opacity-80 md:opacity-100  ">
            Fall 2024
          </p>
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
      <Footer />
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
