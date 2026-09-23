"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { IBM_Plex_Sans } from "next/font/google";
import { MeshGradient } from "@paper-design/shaders-react";
import { HOME_CONTACT_DROPDOWN, HOME_PROJECTS } from "../data/homePage";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const WORK_LIST_PROJECTS = HOME_PROJECTS.filter((project) =>
  project.href?.startsWith("/work/"),
).map((project) => ({
  ...project,
  logo: project.href?.includes("tesla")
    ? "/logos/tesl.png"
    : project.href?.includes("ibm")
      ? "/logos/ibmbee.png"
      : project.href?.includes("liberty")
        ? "/logos/liberty.png"
        : null,
}));

const CARD_PROJECTS = [
  {
    image: "/2027/topsale.gif",
    title: "Topsale",
    tags: ["Design", "Product"],
    href: null,
  },
  {
    image: "/2027/proprio.gif",
    title: "Proprio",
    tags: ["Figbuild '26", "Concept"],
    href: "/works/proprio",
  },
  {
    image: "/2027/junodoro.gif",
    title: "Pomodoro Timer",
    tags: ["Figbuild '26", "Concept"],
    href: "/works/proprio",
  },
];

const READ_PILL_CLASS =
  "shrink-0 rounded-md bg-white/10 px-2.5 py-1 text-white/60 transition-colors hover:bg-white/15 hover:text-white/80";

function opensInNewTab(href) {
  return href.startsWith("http") || /\.pdf(\?|$)/i.test(href);
}

function ContactPillButton() {
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
    <div ref={containerRef} className="relative z-50 inline-block">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="cursor-pointer rounded-md bg-[#0059ff] px-2.5 py-1 text-white transition-opacity hover:opacity-90"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        Contact
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "top left" }}
            className="absolute left-0 top-full z-[100] mt-2 flex w-[180px] flex-col gap-0.5 rounded-md border border-white/10 bg-[#1f1f1f] p-1 shadow-lg"
          >
            {HOME_CONTACT_DROPDOWN.map((item) => (
              <a
                key={item.label}
                role="menuitem"
                href={item.href}
                target={opensInNewTab(item.href) ? "_blank" : undefined}
                rel={
                  opensInNewTab(item.href) ? "noopener noreferrer" : undefined
                }
                className="flex w-full items-center justify-between rounded px-2.5 py-1.5 text-left text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                onClick={() => setOpen(false)}
              >
                <span>{item.label}</span>
                <ArrowUpRight size={12} strokeWidth={1.5} aria-hidden />
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const CURSOR_PILL_BASE_CLASS =
  "pointer-events-none absolute left-0 top-0 z-20 hidden opacity-0 transition-opacity duration-150 will-change-transform lg:block";

function CursorPill({ comingSoon }) {
  const label = comingSoon ? "Coming Soon" : "Read more";

  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-black/40 backdrop-blur-sm px-2.5 py-1 text-[14px] leading-normal text-white shadow-lg">
      <span>{label}</span>
      {!comingSoon && <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden />}
    </span>
  );
}

function ProjectCard({ image, title, tags = [], href, comingSoon = false }) {
  const isLinked = Boolean(href) && !comingSoon;
  const mediaRef = useRef(null);
  const pillRef = useRef(null);

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
      <div className="w-full aspect-[4/3]" aria-hidden />
      <Image
        src={image}
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 40vw"
        className="object-cover object-center pointer-events-none transition-transform duration-500 ease-out group-hover:scale-105"
        unoptimized={image.endsWith(".gif")}
      />

      <div ref={pillRef} className={CURSOR_PILL_BASE_CLASS}>
        <CursorPill comingSoon={comingSoon} />
      </div>
    </div>
  );

  const footer = (
    <div className="flex w-full shrink-0 items-end justify-between gap-3 pt-1">
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <p
          className="min-w-0 leading-normal text-[#a8a8a8] transition-colors duration-300 group-hover:text-white/85"
          aria-label={title}
        >
          {title}
        </p>
        {tags.length > 0 ? (
          <div className="flex flex-row flex-wrap items-center gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-white/10 px-2 py-0.5 leading-normal text-white/50"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <span
        className="inline-flex size-7 shrink-0 items-center justify-center self-end"
        aria-hidden
      >
        <ArrowUpRight
          size={14}
          strokeWidth={1.5}
          className="text-[#a8a8a8] transition-all duration-300 group-hover:rotate-45 group-hover:text-white/85"
        />
      </span>
    </div>
  );

  const cardClassName =
    "group grid h-full w-full min-h-0 cursor-pointer grid-rows-[1fr_auto] gap-0";

  return (
    <article className="flex h-full min-h-0 w-full flex-col">
      {isLinked ? (
        <Link href={href} className={cardClassName}>
          {media}
          {footer}
        </Link>
      ) : (
        <div className={cardClassName}>
          {media}
          {footer}
        </div>
      )}
    </article>
  );
}

export default function HomePage() {
  return (
    <div
      className={`${ibmPlexSans.className} relative flex min-h-dvh w-full flex-col bg-[#161616] text-[14px] leading-normal text-white`}
    >
      <MeshGradient
        speed={0.5}
        scale={1}
        distortion={4}
        swirl={0.5}
        colors={["#090909", "#041940", "#141414", "#090909"]}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
      <div className="relative z-10 mx-auto flex w-full max-w-[720px] flex-col gap-8 p-6 md:gap-10 md:p-8 lg:p-10">
        <div className="flex w-full flex-col gap-4 text-white/70">
          <div className="relative aspect-square w-[48px] overflow-hidden rounded-full">
            <Image
              src="/2027/jun.png"
              alt="Junheng Zheng"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
          <h2 className="text-[16px] leading-normal text-white">About</h2>
          <div>
            Hello! My name is Junheng Zheng (Jun), and I am a multi-disciplinary
            developer{" "}
            <span
              className="inline-flex w-fit items-center align-middle"
              aria-hidden
            >
              <span
                className="relative inline-block size-5 shrink-0 rounded-full bg-blue-500 align-middle"
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
                className="relative -ml-2 inline-block size-5 shrink-0 rounded-full bg-yellow-500 align-middle"
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
                className="relative -ml-2 inline-block size-5 shrink-0 rounded-full bg-green-500 align-middle"
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
              className="inline-flex w-fit items-center align-middle"
              aria-hidden
            >
              <span
                className="relative inline-block size-5 shrink-0 rounded-full bg-green-500 align-middle"
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
                className="relative -ml-2 inline-block size-5 shrink-0 rounded-full bg-blue-500 align-middle"
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
              className="relative inline-block size-5 shrink-0 rounded-full align-middle"
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
              className="relative inline-block size-5 shrink-0 rounded-full align-middle"
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
              className="relative inline-block size-5 shrink-0 rounded-full align-middle"
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

          <ContactPillButton />
        </div>

        <div className="flex w-full flex-col gap-2">
          <h2 className="text-[16px] leading-normal text-white">Experience</h2>
          <ul className="flex w-full flex-col">
            {WORK_LIST_PROJECTS.map((project) => (
              <li key={project.title} className="border-b border-white/10">
                <Link
                  href={project.href}
                  className="group flex w-full items-center justify-between gap-4 py-2 leading-normal transition-colors hover:text-white"
                >
                  <span className="inline-flex min-w-0 items-center gap-2 text-white/80">
                    {project.logo ? (
                      <span className="relative inline-block size-5 shrink-0 overflow-hidden rounded-full">
                        <Image
                          src={project.logo}
                          alt=""
                          fill
                          className="object-contain"
                        />
                      </span>
                    ) : null}
                    <span className="min-w-0 truncate">{project.title}</span>
                  </span>
                  <span
                    className={`${READ_PILL_CLASS} group-hover:bg-white/15 group-hover:text-white/80`}
                  >
                    Read
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex w-full flex-col gap-4">
          <h2 className="text-[16px] leading-normal text-white">Projects</h2>
          <section className="grid w-full grid-cols-1 items-stretch gap-8 sm:grid-cols-1 md:gap-10">
            {CARD_PROJECTS.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
