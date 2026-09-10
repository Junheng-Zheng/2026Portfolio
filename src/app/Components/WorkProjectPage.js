"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Eye,
  EyeOff,
  ArrowUpRight,
  ArrowLeft,
} from "lucide-react";
import { HOME_PROJECTS } from "../data/homePage";
import { WORK_ITEMS } from "../data/workPages";
import { getBlogPost } from "../data/blogPosts";
import { VALID_PASSWORDS } from "../data/passwords";
import { resolveProjectTags } from "../data/projectTags";
import {
  isProcessUnlocked,
  isValidPassword,
  setProcessUnlocked,
} from "../lib/passwordAuth";
import WorkTitleWithIcons from "./WorkTitleWithIcons";
import BlogPost from "./blog/BlogPost";

const DROPDOWN_MOTION = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] },
};

const HOVER_ICON_REVEAL =
  "transition-all duration-300 group-hover:w-3.5 group-hover:scale-100 max-md:group-active:w-3.5 max-md:group-active:scale-100";

function getSwitcherLabel(href, fallback) {
  const workSlug = href?.match(/^\/work\/([^/?#]+)/)?.[1];
  if (workSlug) {
    const workItem = WORK_ITEMS.find((item) => item.slug === workSlug);
    if (workItem) return workItem.name;
  }
  return fallback;
}

function ProjectSwitcher({ currentHref, currentLabel }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const projects = HOME_PROJECTS.filter((project) => Boolean(project.href));

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
    <div ref={containerRef} className="relative z-50">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="group inline-flex h-10 max-w-[220px] cursor-pointer touch-manipulation items-center gap-2.5 rounded-[16px] bg-[#262424] px-4 text-[16px] leading-normal text-white/70 transition-[transform,background-color,color] duration-300 hover:bg-[#2e2c2c] hover:text-white/85 active:scale-[0.96] sm:max-w-none md:rounded-[20px] md:px-5"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <span className="truncate">{currentLabel}</span>
        <ChevronDown
          size={14}
          strokeWidth={1.5}
          className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            role="menu"
            {...DROPDOWN_MOTION}
            style={{ transformOrigin: "top right" }}
            className="absolute right-0 top-full z-[100] mt-2 flex w-[240px] max-w-[calc(100vw-2.5rem)] flex-col gap-0.5 rounded-[16px] bg-[#262424] p-1.5 shadow-lg md:rounded-[20px]"
          >
            {projects.map((project) => {
              const isCurrent = project.href === currentHref;
              const label = getSwitcherLabel(project.href, project.title);
              return (
                <Link
                  key={project.href}
                  role="menuitem"
                  href={project.href}
                  onClick={() => setOpen(false)}
                  className={`group flex w-full cursor-pointer touch-manipulation items-center justify-between rounded-[10px] px-3 py-1.5 text-left text-[16px] leading-normal transition-[transform,color] duration-150 ease-out active:scale-[0.98] md:rounded-[14px] ${
                    isCurrent
                      ? "bg-white/10 text-white/80"
                      : "text-white/60 hover:bg-white/5 hover:text-white/80"
                  }`}
                >
                  <span className="truncate">{label}</span>
                  {!isCurrent ? (
                    <span
                      className={`inline-flex w-0 scale-0 overflow-hidden ${HOVER_ICON_REVEAL}`}
                    >
                      <ArrowUpRight
                        size={14}
                        strokeWidth={1.5}
                        className="size-3.5 shrink-0"
                        aria-hidden
                      />
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function WorkProjectPage({ page, slug }) {
  const [unlocked, setUnlocked] = useState(() => isProcessUnlocked());
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  const tags = resolveProjectTags(page.tags ?? []);
  const currentHref = `/work/${slug}`;
  const caseStudy = page.caseStudySlug ? getBlogPost(page.caseStudySlug) : null;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isValidPassword(password, VALID_PASSWORDS)) {
      setProcessUnlocked();
      setUnlocked(true);
      setError(false);
      return;
    }

    setError(true);
  };

  return (
    <article className="min-h-dvh bg-[#161616] text-white">
      <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-8 px-5 py-12 text-[16px] leading-normal md:gap-10 md:px-24 md:py-16">
        <nav className="flex w-full items-center justify-between">
          <Link
            href="/"
            aria-label="Back"
            className="group relative inline-flex size-10 shrink-0 items-center justify-center rounded-[16px] bg-[#262424] text-white/70 transition-[transform,background-color,color] duration-300 hover:bg-[#2e2c2c] hover:text-white/85 active:scale-[0.96] md:rounded-[20px]"
          >
            <ArrowLeft size={18} strokeWidth={1.5} aria-hidden />
            <span
              role="tooltip"
              className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#262424] px-2 py-1 text-[13px] leading-normal text-white/80 opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100"
            >
              Back
            </span>
          </Link>
          <ProjectSwitcher
            currentHref={currentHref}
            currentLabel={getSwitcherLabel(currentHref, page.title)}
          />
        </nav>

        {page.cover ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-[16px] md:rounded-[20px]">
            <Image
              src={page.cover}
              alt=""
              fill
              className="object-cover"
              unoptimized={page.cover.endsWith(".gif")}
              priority
            />
          </div>
        ) : null}

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h1
              className="text-[24px] font-medium leading-[1.3] text-white/85 sm:text-[24px] md:text-[32px]"
              aria-label={page.title}
            >
              <WorkTitleWithIcons
                title={page.title}
                titleParts={page.titleParts}
              />
            </h1>
            {page.duration || page.readTime ? (
              <p className="text-white/60">
                {[page.duration, page.readTime].filter(Boolean).join(" · ")}
              </p>
            ) : null}

            {tags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag.type}
                    className="inline-flex items-center justify-center rounded-full bg-[#262424] px-3 py-1 text-[13px] leading-normal whitespace-nowrap text-white/80"
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <p className="text-white/80">
            {Array.isArray(page.about) ? page.about.join(" ") : page.about}
          </p>
        </div>

        <section className="flex w-full flex-col gap-5 border-t border-white/10 pt-10">
          {page.ndaProtected && !unlocked ? (
            <div className="flex w-full flex-col gap-5">
              <p className="text-white/80">
                Under NDA. Enter the password to view the full case study.
              </p>

              <form
                onSubmit={handleSubmit}
                className="flex w-full flex-col gap-8"
              >
                <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-stretch">
                  <div
                    className={`flex w-full min-w-0 flex-1 items-center gap-2 rounded-full border bg-[#262424] px-4 py-2.5 transition-colors sm:h-10 sm:py-0 ${
                      error
                        ? "border-red-500 focus-within:ring-1 focus-within:ring-red-500/50"
                        : "border-transparent focus-within:ring-1 focus-within:ring-white/20"
                    }`}
                  >
                    <input
                      type={visible ? "text" : "password"}
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                        if (error) setError(false);
                      }}
                      placeholder="Password"
                      autoComplete="current-password"
                      className="h-full min-w-0 flex-1 bg-transparent py-0 text-[16px] leading-normal text-white outline-none placeholder:text-white/40 max-md:py-0.5"
                    />
                    <button
                      type="button"
                      onClick={() => setVisible((current) => !current)}
                      aria-label={visible ? "Hide password" : "Show password"}
                      className="shrink-0 text-white/50 transition-colors hover:text-white/80"
                    >
                      {visible ? (
                        <Eye className="size-4" strokeWidth={1.5} />
                      ) : (
                        <EyeOff className="size-4" strokeWidth={1.5} />
                      )}
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex h-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#0059ff] px-5 text-[16px] leading-normal text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
                  >
                    Unlock
                  </button>
                </div>
                <div className="w-full p-5  flex flex-col gap-12 rounded-[16px] h-[500px]   bg-linear-to-b from-[#262424] to-transparent p-4 md:rounded-[20px]">
                  <div className="w-full flex flex-col gap-3">
                    <div className="w-1/2 h-5 bg-[#161616] rounded-full" />
                    <div className="w-full h-5 bg-[#161616] rounded-full" />
                    <div className="w-full h-5 bg-[#161616] rounded-full" />
                    <div className="w-full h-5 bg-[#161616] rounded-full" />
                    <div className="w-full h-5 bg-[#161616] rounded-full" />
                  </div>
                  <div className="w-full flex flex-col gap-3">
                    <div className="w-1/2 h-5 bg-[#161616] rounded-full" />
                    <div className="w-full h-5 bg-[#161616] rounded-full" />
                    <div className="w-full h-5 bg-[#161616] rounded-full" />
                    <div className="w-full h-5 bg-[#161616] rounded-full" />
                    <div className="w-full h-5 bg-[#161616] rounded-full" />
                  </div>
                </div>

                {error ? (
                  <p className="text-red-500">
                    Incorrect password. Please try again.
                  </p>
                ) : null}
              </form>
            </div>
          ) : caseStudy ? (
            <div className="w-full [&_img]:saturate-0 [&_img]:opacity-75 [&_img]:contrast-150 [&_img]:brightness-70">
              <BlogPost post={caseStudy} embedded />
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="text-white/80">
                {page.processSummary ??
                  "Full case study details are available below."}
              </p>
              {page.processHref ? (
                <Link
                  href={page.processHref}
                  className="group inline-flex w-fit items-center gap-2 rounded-full bg-[#0059ff] px-5 py-2 text-white transition-opacity hover:opacity-90"
                >
                  <span>Read full case study</span>
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.5}
                    className="transition-transform group-hover:rotate-45"
                    aria-hidden
                  />
                </Link>
              ) : page.ndaProtected ? (
                <p className="text-white/50">Full case study coming soon.</p>
              ) : null}
            </div>
          )}
        </section>
      </div>
    </article>
  );
}
