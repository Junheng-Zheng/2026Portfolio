"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Animatedparagrah from "../Components/Animatedparagrah";
import {
  COLORS,
  HomeAnimatedLinks,
  markHomeVisited,
  useSkipAnimations,
} from "../Components/portfolioMotion";

const ABSTRACT_SEGMENTS = [
  {
    text: "Jun interned as a Design Engineer at ",
    italic: false,
  },
  {
    text: "Liberty Mutual Insurance",
    href: "https://www.libertymutual.com/",
  },
  {
    text: " on the Enterprise UI team, contributing to the design system and personally increasing the component library by 50%.",
    italic: false,
  },
];

const TEAM = ["Enterprise UI"];

const DURATION = "Summer 25";

function MetricRow({ label, trailing, className = "", children }) {
  return (
    <div
      className={`relative flex w-full items-center justify-between gap-3 text-white ${className}`}
    >
      {children}
      {label ? (
        <span className="text-[14px] leading-normal">{label}</span>
      ) : null}
      <div
        className={`relative flex items-center gap-3 ${label ? "shrink-0" : "flex-1 min-w-0"}`}
      >
        {trailing}
      </div>
    </div>
  );
}

function InfoSection({ label, skip, play, children }) {
  return (
    <section className="flex flex-1 flex-col min-w-0">
      <HomeAnimatedLinks
        skip={skip}
        play={play}
        className="flex flex-col gap-2 w-full"
      >
        <p className="font-label text-[10px] leading-normal pb-1 shrink-0">
          {label}
        </p>
        <div className="flex flex-col gap-1">{children}</div>
      </HomeAnimatedLinks>
    </section>
  );
}

export default function SlugTemplateTestPage() {
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
      className="font-body text-white min-h-dvh flex flex-col gap-6 p-8"
      style={{ backgroundColor: COLORS.background, color: COLORS.foreground }}
    >
      <Link
        href="/"
        className="font-label text-[10px] leading-normal text-white underline decoration-solid underline-offset-[2px] [text-decoration-skip-ink:none] hover:opacity-80 transition-opacity w-fit"
      >
        Back Home
      </Link>

      <div className="flex flex-1 w-full items-center justify-center">
        <div className="flex flex-col gap-8 w-full max-w-[390px] text-left">
          <div className="flex flex-row gap-6 w-full">
            <InfoSection label="Team" skip={skipAnimations} play={showRest}>
              {TEAM.map((member) => (
                <p key={member} className="text-[14px] leading-normal">
                  {member}
                </p>
              ))}
            </InfoSection>

            <InfoSection label="Duration" skip={skipAnimations} play={showRest}>
              <p className="text-[14px] leading-normal">{DURATION}</p>
            </InfoSection>
          </div>

          <section className="flex flex-col w-full min-w-0">
            <Animatedparagrah
              label="Abstract"
              className="text-[14px] leading-normal text-white break-words"
              segments={ABSTRACT_SEGMENTS}
              skipAnimation={skipAnimations}
              delayChildren={0}
              onComplete={() => {
                if (!skipAnimations) setAbstractDone(true);
              }}
            />
          </section>
          <section className="flex flex-col gap-3 w-full min-w-0">
            <HomeAnimatedLinks
              skip={skipAnimations}
              play={showRest}
              className="flex flex-col gap-2 w-full"
            >
              <p className="font-label text-[10px] leading-normal pb-1 shrink-0 uppercase tracking-normal">
                Metric
              </p>
              <div className="flex flex-col gap-1">
                <MetricRow
                  label="Component library growth"
                  trailing={
                    <span className="text-[14px] leading-normal whitespace-nowrap">
                      +50% (0 to 1)
                    </span>
                  }
                />
                <MetricRow
                  label="Presentations on AI tech"
                  trailing={
                    <span className="text-[14px] leading-normal whitespace-nowrap">
                      20+ Stakeholders
                    </span>
                  }
                />
                <MetricRow
                  label="Design + dev audit"
                  trailing={
                    <span className="text-[14px] leading-normal whitespace-nowrap">
                      +60% Consistency
                    </span>
                  }
                />
              </div>
            </HomeAnimatedLinks>
          </section>
        </div>
      </div>
    </div>
  );
}
