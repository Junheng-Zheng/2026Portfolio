"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Animatedparagrah from "../Components/Animatedparagrah";
import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
const Page = () => {
  const paragraphs = useMemo(
    () => [
      "My parents let me pick and choose my hobbies. I was always drawn to the creative process of creating. Before I knew it, I was taking fine art classes.",
      "In high school, I majored in industrial and product design. Here, I learned how to laser cut, 3d model, and utilize power tools. During this time, I fell in love with solving problems with creativity and function.",
      "Currently in college, I am majoring in Web and Mobile Computing. During this time, I learned about UX design and frontend development. I quickly became passionate about the technicality and creativity that this field combined.",

      "I pull from many disciplines. Fine arts, product design, industrial design, and engineering. Different perspectives define the way I solve problems. These fields have shaped who I am and how I approach challenges.",
    ],
    [],
  );

  const [activeParagraph, setActiveParagraph] = useState(0);
  const advanceTimeoutRef = useRef(null);
  // "Negative delay" feel = overlap next paragraph before previous finishes.
  // Tuned to match Animatedparagrah defaults.
  const LETTER_STAGGER_S = 0.009;
  const DELAY_CHILDREN_S = 0.05;
  const EST_SPRING_SETTLE_MS = 250;
  const OVERLAP_MS = 800;

  useEffect(() => {
    return () => {
      if (advanceTimeoutRef.current) {
        clearTimeout(advanceTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (activeParagraph >= paragraphs.length - 1) return;

    const text = paragraphs[activeParagraph] ?? "";
    const letterCount = Array.from(text.replace(/\s+/g, "")).length;

    const estimatedMs =
      (DELAY_CHILDREN_S + Math.max(0, letterCount - 1) * LETTER_STAGGER_S) *
        1000 +
      EST_SPRING_SETTLE_MS;

    const nextMs = Math.max(0, estimatedMs - OVERLAP_MS);

    if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current);
    advanceTimeoutRef.current = setTimeout(() => {
      setActiveParagraph((p) => Math.min(p + 1, paragraphs.length - 1));
    }, nextMs);

    return () => {
      if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current);
    };
  }, [activeParagraph, paragraphs]);

  return (
    <div className="w-full min-h-dvh flex text-black/70 flex-col items-center justify-center font-light py-16 px-4">
      <div className="flex flex-col text-sm gap-4">
        <Link href="/" className="flex items-center gap-2">
          Back
        </Link>
        <h1 className="alice uppercase text-2xl font-bold">About</h1>
        <div className="w-full md:w-[560px] flex flex-col gap-6">
          {paragraphs.map((text, idx) => (
            <Animatedparagrah
              key={idx}
              className="z-20 text-lg w-full"
              segments={[{ text, italic: false }]}
              play={idx <= activeParagraph}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
