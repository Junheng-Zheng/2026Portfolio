"use client";

import { CONTACT_ITEMS } from "../data/workPages";
import { ExternalRow } from "./portfolioRows";
import { HomeAnimatedLinks, HomeEntrance, useSkipAnimations } from "./portfolioMotion";

export default function PortfolioContactList() {
  const skipAnimations = useSkipAnimations();

  return (
    <HomeEntrance
      skip={skipAnimations}
      play
      className="flex flex-col gap-3 w-full"
    >
      <p className="text-[12px] text-white/70">Contact + More</p>
      <HomeAnimatedLinks
        skip={skipAnimations}
        play
        delay={0.05}
        className="flex flex-col gap-2 w-full"
      >
        {CONTACT_ITEMS.map((item) => (
          <ExternalRow key={item.name} href={item.href} label={item.name} />
        ))}
      </HomeAnimatedLinks>
    </HomeEntrance>
  );
}
