"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import DecryptedText from "../Components/DecryptedText";

const PAGE_ENTRANCE = {
  initial: { opacity: 0, y: 12, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

function Decrypt({ text, parentClassName = "" }) {
  return (
    <DecryptedText
      text={text}
      animateOn="view"
      revealDirection="start"
      speed={40}
      parentClassName={parentClassName}
    />
  );
}

// Asymmetric placements: explicit column starts leave intentional negative
// space, and the top offsets break the shared baseline row to row.
const PLACEMENTS = [
  "lg:col-start-1 lg:col-span-5",
  "lg:col-start-8 lg:col-span-4 lg:mt-20",
  "lg:col-start-3 lg:col-span-3 lg:mt-32",
  "lg:col-start-7 lg:col-span-5 lg:mt-16",
  "lg:col-start-2 lg:col-span-4",
  "lg:col-start-9 lg:col-span-3 lg:mt-12",
  "lg:col-start-1 lg:col-span-3 lg:mt-28",
  "lg:col-start-5 lg:col-span-7 lg:mt-16",
  "lg:col-start-4 lg:col-span-4",
  "lg:col-start-9 lg:col-span-4 lg:mt-24",
  "lg:col-start-2 lg:col-span-6 lg:mt-20",
  "lg:col-start-10 lg:col-span-3 lg:mt-36",
];

const TABLET_PLACEMENTS = [
  "md:col-start-1 md:col-span-6",
  "md:col-start-8 md:col-span-4 md:mt-24",
  "md:col-start-3 md:col-span-4 md:mt-36",
  "md:col-start-7 md:col-span-5 md:mt-16",
  "md:col-start-2 md:col-span-5",
  "md:col-start-8 md:col-span-4 md:mt-20",
  "md:col-start-1 md:col-span-4 md:mt-28",
  "md:col-start-5 md:col-span-7 md:mt-12",
];

export default function StuffContent({ images }) {
  return (
    <main className="mono min-h-dvh bg-white font-light text-[#3f3f3f]">
      <motion.div
        className="flex min-h-dvh flex-col gap-10 p-6 md:gap-8 md:p-8 lg:p-12"
        {...PAGE_ENTRANCE}
      >
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-12 flex flex-col gap-2 md:col-span-5 lg:col-span-4">
            <Link
              href="/"
              className="w-fit text-[10px] leading-normal text-[#969696] transition-colors hover:text-[#3f3f3f]"
            >
              <Decrypt text="Back" />
            </Link>
            <div className="flex flex-col gap-2 text-[12px] leading-normal text-[#3f3f3f]">
              <p className="indent-6">
                <Decrypt
                  text="Cool references and images I found online, a loose board of visual notes, interfaces, textures, and moments worth keeping around."
                  parentClassName="w-full"
                />
              </p>
              <p className="indent-6">
                <Decrypt
                  text="Nothing here is finished work. Just things I keep coming back to for composition, materials, type, and quiet atmosphere."
                  parentClassName="w-full"
                />
              </p>
            </div>
          </div>
        </div>

        {images.length > 0 ? (
          <div className="grid grid-cols-12 items-start gap-6 pb-24">
            {images.map((item, index) => (
              <div
                key={item.file}
                className={`col-span-12 flex flex-col gap-1 ${TABLET_PLACEMENTS[index % TABLET_PLACEMENTS.length]} ${
                  index === 0
                    ? "lg:col-start-1 lg:col-span-5 lg:mt-0"
                    : PLACEMENTS[index % PLACEMENTS.length]
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.title}
                  className="block h-auto w-full bg-[#f4f4f4]"
                />
                <div className="flex justify-between gap-3 text-[10px] leading-normal text-[#969696]">
                  <Decrypt text={item.title} />
                  {item.credit ? (
                    <span className="shrink-0 text-right">
                      <Decrypt text={item.credit} />
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[12px] leading-normal text-[#969696]">
            <Decrypt text="Drop images into public/stuff and they'll show up here." />
          </p>
        )}
      </motion.div>
    </main>
  );
}
