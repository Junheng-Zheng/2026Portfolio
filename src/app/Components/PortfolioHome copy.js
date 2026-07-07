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
import { CONTACT_ITEMS, WORK_ITEMS, WORK_SLUGS } from "../data/workPages";

const FEATURED_PROJECTS = [
  {
    image: "/projectcards/ibm-landing-card.png",
    href: `/work/${WORK_SLUGS.IBM_RESEARCH}`,
  },
  {
    image: "/cardcovers/limi.gif",
    href: `/work/${WORK_SLUGS.LIBERTY_MUTUAL}`,
  },
];

function WorkRow({ href, label, period, className = "" }) {
  return (
    <Link
      href={href}
      className={`relative flex w-full items-center justify-between gap-3 group text-white hover:opacity-80 transition-opacity ${className}`}
    >
      <span className="text-[14px] leading-normal">{label}</span>
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-[14px] leading-normal whitespace-nowrap">
          {period}
        </span>
        <ArrowUpRight
          strokeWidth={1.5}
          size={20}
          className="shrink-0 group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300"
        />
      </div>
    </Link>
  );
}

function ExternalRow({ href, label, className = "" }) {
  const isExternal =
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    /\.pdf(\?|$)/i.test(href);

  const content = (
    <>
      <span className="text-[14px] leading-normal">{label}</span>
      <ArrowUpRight
        strokeWidth={1.5}
        size={20}
        className="shrink-0 group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300"
      />
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
      className="font-body text-white min-h-dvh flex flex-col gap-7 p-6 md:p-12 bg-black"
      style={{ color: COLORS.foreground }}
    >
      <div className="flex flex-col gap-3 w-full  shrink-0">
        <p className="font-display text-[24px] hidden md:block leading-normal text-white">
          Creating between Form & Function.
        </p>
        <p className="font-display text-[24px] block md:hidden leading-normal text-white">
          Between Form & Function.
        </p>
        <Animatedparagrah
          className="text-[14px] text-white md:max-w-[68%] lg:max-w-[40%] "
          segments={abstractSegments}
          linkUnderline
          skipAnimation={skipAnimations}
          delayChildren={0}
          onComplete={() => {
            if (!skipAnimations) setAbstractDone(true);
          }}
        />
      </div>

      <HomeEntrance
        skip={skipAnimations}
        play
        className="relative w-full bg-[#FF0000] aspect-4/3 md:aspect-8/3 shrink-0 overflow-hidden"
      >
        <Image
          src={heroImage ?? "/redlanding.png"}
          alt="Landing"
          fill
          priority
          className="object-contain inset-0 origin-right pointer-events-none"
        />
      </HomeEntrance>

      <div className="flex flex-col lg:flex-row gap-7 shrink-0 w-full">
        <section className="flex flex-1 flex-col gap-3 min-w-0">
          <HomeAnimatedLinks
            skip={skipAnimations}
            play={showRest}
            className="flex flex-col gap-3 w-full"
          >
            <p className="font-label text-[10px] leading-normal shrink-0">
              Work
            </p>
            <div className="flex flex-col gap-2">
              {WORK_ITEMS.map((item) => (
                <WorkRow
                  key={item.slug}
                  href={`/work/${item.slug}`}
                  label={item.name}
                  period={item.period}
                />
              ))}
            </div>
          </HomeAnimatedLinks>
        </section>

        <section className="flex flex-1 flex-col gap-3 min-w-0">
          <HomeAnimatedLinks
            skip={skipAnimations}
            play={showRest}
            className="flex flex-col gap-3 w-full"
          >
            <p className="font-label text-[10px] leading-normal shrink-0">
              Contact + More
            </p>
            <div className="flex flex-col gap-2">
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

      <div className="flex flex-col lg:flex-row gap-7 w-full shrink-0">
        {FEATURED_PROJECTS.map((project) => (
          <HomeEntrance
            key={project.href}
            skip={skipAnimations}
            play={showRest}
            className="relative flex-1 min-w-0 aspect-4/3 shrink-0 overflow-hidden"
          >
            <Link href={project.href} className="block relative size-full">
              <Image
                src={project.image}
                alt=""
                fill
                className="object-cover pointer-events-none"
              />
            </Link>
          </HomeEntrance>
        ))}
      </div>
    </div>
  );
}
