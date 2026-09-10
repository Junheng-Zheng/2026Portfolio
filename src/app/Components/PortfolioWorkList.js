"use client";

import { HOME_HACKATHONS } from "../data/homePage";
import { WORK_ITEMS } from "../data/workPages";
import { ProjectRow, WorkRow } from "./portfolioRows";
import { HomeAnimatedLinks, HomeEntrance, useSkipAnimations } from "./portfolioMotion";

export default function PortfolioWorkList() {
  const skipAnimations = useSkipAnimations();

  return (
    <>
      <HomeEntrance
        skip={skipAnimations}
        play
        className="flex flex-col gap-3 w-full"
      >
        <p className="text-[12px] text-white/70">Work</p>
        <HomeAnimatedLinks
          skip={skipAnimations}
          play
          delay={0.05}
          className="flex flex-col gap-2 w-full"
        >
          {WORK_ITEMS.map((item) => (
            <WorkRow
              key={item.slug}
              label={item.name}
              period={item.period}
            />
          ))}
        </HomeAnimatedLinks>
      </HomeEntrance>

      <HomeEntrance
        skip={skipAnimations}
        play
        delay={0.05}
        className="flex flex-col gap-3 w-full"
      >
        <p className="text-[12px] text-white/70">Projects</p>
        <HomeAnimatedLinks
          skip={skipAnimations}
          play
          delay={0.1}
          className="flex flex-col gap-2 w-full"
        >
          {HOME_HACKATHONS.map((item) => (
            <ProjectRow
              key={item.name}
              href={item.href}
              label={item.name}
              period={item.period}
              devpostHref={item.devpostHref}
            />
          ))}
        </HomeAnimatedLinks>
      </HomeEntrance>
    </>
  );
}
