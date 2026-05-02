"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Animatedparagrah from "../Components/Animatedparagrah";
import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
const Page = () => {
  const paragraphs = useMemo(
    () => [
      "Growing up, my parents let me pick and choose my hobbies. I was always drawn to the creative process of creating. Before I knew it, I was taking fine art classes at 6 years old.",
      "In high school, I had a decided to major in industrial and product design. During this time, I fell in love with solving problems with creativity.",
      "In college, I enrolled in Web and Mobile Computing at Rochester Institute of Technology. It was during this time I learned about UX design and frontend development. I quickly became passionate about the technicality and creativity that this field combined.",
      "Since then, I have worked across small teams and big systems. Startups, local companies, and Fortune 100s. Last summer I worked as a hybrid UX Designer and developer at Liberty Mutual. This summer, I am incoming at IBM Research doing the same. ",
      "My manifesto is simple. Create with Intention and make the complex simple. I pull from many disciplines. Fine arts, product design, industrial design, engineering. The core stays the same. Different fields that have shaped who I am, and how I approach problems. ",
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
    <div className="w-full min-h-dvh flex flex-col items-center justify-center font-light py-16 px-4">
      <div className="flex flex-col text-sm gap-6">
        <Link href="/" className="flex items-center gap-2">
          <ArrowUpLeft
            strokeWidth={1}
            size={16}
            className="group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300"
          />
          Back to Home
        </Link>
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
