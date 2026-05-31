"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Animatedparagrah from "./Animatedparagrah";
import {
  COLORS,
  HomeAnimatedLinks,
  markHomeVisited,
  useSkipAnimations,
} from "./portfolioMotion";

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

export default function PortfolioWorkDetail({
  abstractSegments,
  team,
  duration,
}) {
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
        <div className="flex flex-col gap-6 w-full max-w-[360px] text-left">
          <div className="flex flex-row gap-6 w-full">
            <InfoSection label="Team" skip={skipAnimations} play={showRest}>
              {team.map((member) => (
                <p key={member} className="text-[14px] leading-normal">
                  {member}
                </p>
              ))}
            </InfoSection>

            <InfoSection label="Duration" skip={skipAnimations} play={showRest}>
              <p className="text-[14px] leading-normal">{duration}</p>
            </InfoSection>
          </div>

          <section className="flex flex-col w-full min-w-0">
            <Animatedparagrah
              label="Abstract"
              className="text-[14px] leading-normal text-white break-words"
              segments={abstractSegments}
              skipAnimation={skipAnimations}
              delayChildren={0}
              onComplete={() => {
                if (!skipAnimations) setAbstractDone(true);
              }}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
