"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Animatedparagrah from "./Animatedparagrah";
import {
  COLORS,
  HomeAnimatedLinks,
  HomeEntrance,
  markHomeVisited,
  useSkipAnimations,
} from "./portfolioMotion";

const PROJECT_ITEMS = [
  { name: "Lifestory", href: "https://devpost.com/software/lifestory" },
  { name: "Proprio", href: "https://devpost.com/software/proprio" },
];

const CONTACT_ITEMS = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/junhengzheng/" },
  { name: "Gmail", href: "mailto:junhengzheng@gmail.com" },
  { name: "Resume", href: "/Junheng_SWE_Resume.pdf" },
  { name: "Github", href: "https://github.com/junheng-zheng" },
];

const EXPERIMENT_ITEMS = [
  { name: "Pomodoro", href: "https://junodoro-timer.vercel.app/" },
  { name: "Junbot", href: "https://junbot.vercel.app/" },
];

function WorkRow({ label, trailing, className = "" }) {
  return (
    <div
      className={`relative flex w-full items-center justify-between gap-3 text-white ${className}`}
    >
      <span className="text-[14px] leading-normal">{label}</span>
      <div className="flex items-center gap-3 shrink-0">{trailing}</div>
    </div>
  );
}

function ExternalRow({ href, label, trailing, className = "", children }) {
  const isExternal =
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    /\.pdf(\?|$)/i.test(href);

  const content = (
    <>
      {children}
      {label ? (
        <span className="text-[14px] leading-normal">{label}</span>
      ) : null}
      <div
        className={`relative flex items-center gap-3 ${label ? "shrink-0" : "flex-1 min-w-0"}`}
      >
        {trailing}
        <span className="size-5 border border-white/10 grid place-items-center">
          <ArrowUpRight
            strokeWidth={1.5}
            size={16}
            className="shrink-0 group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300"
          />
        </span>
      </div>
    </>
  );

  const rowClass = `relative flex w-full items-center justify-between gap-3 group text-white hover:opacity-80 transition-opacity ${className}`;

  if (href.startsWith("/") && !isExternal) {
    return (
      <Link href={href} className={rowClass}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={rowClass}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </a>
  );
}

export default function PortfolioHome({ abstractSegments, heroImage }) {
  const pathname = usePathname();
  const skipAnimations = useSkipAnimations();
  const [abstractDone, setAbstractDone] = useState(false);
  const showRest = skipAnimations || abstractDone;

  useEffect(() => {
    if (pathname !== "/") {
      markHomeVisited();
    }
  }, [pathname]);

  return (
    <div
      className="font-body text-white min-h-dvh lg:h-dvh flex flex-col gap-6 p-4 md:p-8 lg:overflow-hidden"
      style={{ backgroundColor: COLORS.background, color: COLORS.foreground }}
    >
      {/* <div className="w-full p-4 md:p-8 absolute inset-0 z-20  flex">
        <div className="w-full h-full border-r border-red-500"></div>
        <div className="w-full h-full border-r border-red-500"></div>
        <div className="w-full h-full0"></div>
      </div> */}
      {/* <div className="flex justify-between items-center ">
        <p className="font-label text-[10px] leading-normal  shrink-0">Jun</p>
        <p className="font-label text-[10px] leading-normal  shrink-0">
          swe + design
        </p>
      </div> */}

      <div className="flex flex-col lg:flex-row gap-6 shrink-0 w-full">
        <section className="flex flex-1 flex-col min-w-0">
          <Animatedparagrah
            label="Abstract"
            className="text-[14px]  text-white  "
            segments={abstractSegments}
            linkUnderline={false}
            skipAnimation={skipAnimations}
            delayChildren={0}
            onComplete={() => {
              if (!skipAnimations) setAbstractDone(true);
            }}
          />
        </section>

        <section className="flex flex-1 flex-col min-w-0">
          <HomeAnimatedLinks
            skip={skipAnimations}
            play={showRest}
            className="flex flex-col gap-2 w-full"
          >
            <p className="font-label text-[10px] leading-normal shrink-0">
              Work
            </p>
            <div className="flex flex-col gap-1">
              <WorkRow
                label="swe + design, IBM Research"
                trailing={
                  <span className="text-[14px] leading-normal whitespace-nowrap">
                    Summer 26
                  </span>
                }
              />
              <WorkRow
                label="swe + design, Liberty Mutual"
                trailing={
                  <span className="text-[14px] leading-normal whitespace-nowrap">
                    Summer 25
                  </span>
                }
              />
              <WorkRow
                label="design, Collabotory via RIT"
                trailing={
                  <span className="text-[14px] leading-normal whitespace-nowrap">
                    Spring 26
                  </span>
                }
              />
              <WorkRow
                label="design, D&D Motor Systems"
                trailing={
                  <span className="text-[14px] leading-normal whitespace-nowrap">
                    Fall 24
                  </span>
                }
              />
            </div>
          </HomeAnimatedLinks>
        </section>

        <section className="flex flex-1 flex-col min-w-0">
          <HomeAnimatedLinks
            skip={skipAnimations}
            play={showRest}
            className="flex flex-col gap-2 w-full"
          >
            <p className="font-label text-[10px] leading-normal shrink-0">
              Socials
            </p>
            <div className="flex flex-col gap-1">
              {CONTACT_ITEMS.map((item) => (
                <ExternalRow
                  key={item.name}
                  href={item.href}
                  label={item.name}
                />
              ))}
            </div>
          </HomeAnimatedLinks>
        </section>
      </div>

      <HomeEntrance
        skip={skipAnimations}
        play={showRest}
        className="relative flex-1 bg-black min-h-[240px] lg:min-h-0 w-full overflow-hidden"
      >
        <Image
          src="/coolness.jpg"
          alt="Hero"
          fill
          priority
          className="object-cover mix-blend-luminosity inset-0 pointer-events-none"
        />
      </HomeEntrance>

      <div className="flex flex-col lg:flex-row gap-6 shrink-0 w-full">
        <section className="flex flex-1 flex-col min-w-0">
          <HomeAnimatedLinks
            skip={skipAnimations}
            play={showRest}
            className="flex flex-col gap-2 w-full"
          >
            <p className="font-label text-[10px] leading-normal shrink-0">
              Tools
            </p>
            <div className="flex flex-col gap-1">
              <p className="text-[14px] leading-normal">
                React, Javascript, Typescript, more
              </p>
              <p className="text-[14px] leading-normal">
                Figma, Miro, Photoshop, Illustrator
              </p>
            </div>
          </HomeAnimatedLinks>
        </section>

        <section className="flex flex-1 flex-col min-w-0">
          <HomeAnimatedLinks
            skip={skipAnimations}
            play={showRest}
            className="flex flex-col gap-2 w-full"
          >
            <p className="font-label text-[10px] leading-normal shrink-0">
              Projects
            </p>
            <div className="flex flex-col gap-1">
              {PROJECT_ITEMS.map((item) => (
                <ExternalRow
                  key={item.name}
                  href={item.href}
                  label={item.name}
                  trailing={
                    <span className="text-[14px] leading-normal whitespace-nowrap">
                      devpost
                    </span>
                  }
                />
              ))}
            </div>
          </HomeAnimatedLinks>
        </section>

        <section className="flex flex-1 flex-col min-w-0">
          <HomeAnimatedLinks
            skip={skipAnimations}
            play={showRest}
            className="flex flex-col gap-2 w-full"
          >
            <p className="font-label text-[10px] leading-normal shrink-0">
              Experiments
            </p>
            <div className="flex flex-col gap-1">
              {EXPERIMENT_ITEMS.map((item) => (
                <ExternalRow
                  key={item.name}
                  href={item.href}
                  label={item.name}
                />
              ))}
            </div>
          </HomeAnimatedLinks>
        </section>
      </div>
      {/* <div className="w-full h-full grid grid-cols-3 grid-rows-3 gap-3 ">
        <div className="col-span-2  row-span-2 bg-blue-500 relative">
          <Image
            src="/cardcovers/ibmstill.png"
            alt="Hero"
            fill
            priority
            className="object-cover  inset-0 pointer-events-none"
          />
        </div>
        <div className="col-span-1  row-span-2 relative">
          <Image
            src="/cardcovers/limi.gif"
            alt="Hero"
            fill
            priority
            className="object-cover  inset-0 pointer-events-none"
          />
        </div>
      </div> */}
    </div>
  );
}
