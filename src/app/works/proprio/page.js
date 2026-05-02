"use client";
import Image from "next/image";
import Link from "next/link";
import Rounded from "../../Components/Rounded";
import Footer from "../../Components/Footer";
import Constraints from "../../Components/casestudy/Constraints";
import P from "../../Components/casestudy/P";
import Statbox from "../../Components/casestudy/Statbox";
import Marketresearch from "../../Components/casestudy/Marketresearch";
import Marketanalysis from "../../Components/casestudy/Marketanalysis";
import { Star, Briefcase, Palette, Clock, Circle } from "lucide-react";
import { Gamepad } from "lucide-react";
import Animatedparagrah from "../../Components/Animatedparagrah";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
const Pack = () => {
  const sentence = [
    {
      text: "Proprio was my submission for Figbuild 2026. The prompt was simple - create a future product that targets a sense that cannot be tracked today. ",
      italic: false,
    },
  ];
  return (
    <div className="flex flex-col 2xl:px-128 xl:px-64 px-4   gap-8 py-12  font-light text-black/70   ">
      <div className="py-2 bg-white sticky top-0 z-10 flex justify-between items-center">
        <Link className="cursor-pointer text-sm  " href="/">
          Back to Home
        </Link>
        <Link
          className="cursor-pointer text-sm flex items-center gap-1"
          href="/"
        >
          Next Project (Liberty Mutual)
          <ArrowUpRight
            strokeWidth={1}
            size={16}
            className="group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300"
          />
        </Link>
      </div>
      <div className="flex flex-col text-base opacity-90   gap-3">
        <Animatedparagrah
          segments={sentence}
          className="z-20 text-lg w-full md:w-1/2 "
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10, filter: "blur(3px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, delay: 1 }}
        className="flex flex-col w-full gap-3 "
      >
        <div className="w-full flex flex-col gap-3">
          <div className="w-full flex gap-3">
            <img
              src="/proprio/slot3.png"
              alt="cover"
              className="flex-1 min-w-0 object-cover object-center"
            />
            <img
              src="/proprio/slot1.png"
              alt="cover"
              className="flex-1 min-w-0 object-cover object-center"
            />
          </div>

          <img
            src="/proprio/slot2.png"
            alt="cover"
            className="object-cover  object-center w-full"
          />
          <div className="w-full flex gap-3">
            <img
              src="/proprio/slot4.png"
              alt="cover"
              className="flex-1 min-w-0 object-cover object-center"
            />
            <img
              src="/proprio/slot5.png"
              alt="cover"
              className="flex-1 min-w-0 object-cover object-center"
            />
            <img
              src="/proprio/slot6.png"
              alt="cover"
              className="flex-1 min-w-0 object-cover object-center"
            />
          </div>
        </div>
      </motion.div>
      {/* <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-12 w-full py-12 md:max-w-[700px]">
          <div className="flex flex-col gap-3">
            <h2 className="text-sm">The Problem (based on the prompt)</h2>
            <p className="">
              In the modern day, we are always pushing for new ways to track our
              health. Think about all the senses we have in the human body -
              proprioception, interoception, exteroception, etc. How can we
              create a &quot;future&quot; technology that utilizes one of these
              sense to track our health?
            </p>
            <img
              src="/proprio/figbuild2026banner.png"
              alt="cover"
              className="w-full object-cover object-center"
            />
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-sm">Discovery</h2>
            <p className="">
              For this challenge, we decided to focus on proprioception. This
              stemmed from a past wrist injury sustained through weight lifting.
              The first thought in this challenge was how we could solve this
              problem not just for myself, but for everyone.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-sm">Research</h2>
            <p>
              Looking into the research we found statistics to back up the need
              for proprioception tracking.{" "}
              <span className="font-semibold">60-80%</span> of adults will
              experience back pain in their lifetime.{" "}
              <span className="font-semibold">40-50%</span> of competitive
              athletes will report overuse injuries in a single season.{" "}
              <span className="font-semibold">1.3 billion</span> people live
              with musculoskeletal disorders worldwide.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-sm">Personas</h2>
            <p>
              Jack is a 25-year-old male who is a competitive athlete. He is a
              weight lifter and a crossfitter. He is also a student at the
              University of California, Berkeley.
            </p>
            <p>
              Jack is a 25-year-old male who is a competitive athlete. He is a
              weight lifter and a crossfitter. He is also a student at the
              University of California, Berkeley.
            </p>
            <p>
              Jack is a 25-year-old male who is a competitive athlete. He is a
              weight lifter and a crossfitter. He is also a student at the
              University of California, Berkeley.
            </p>
            <div className="w-full flex gap-2">
              <Image
                src="/proprio/officeworker.png"
                alt="cover"
                width={800}
                height={800}
                className="flex-1 min-w-0 object-cover aspect-square object-center"
              />
              <Image
                src="/proprio/runningtrack.png"
                alt="cover"
                width={800}
                height={800}
                className="flex-1 min-w-0 object-cover object-center"
              />
              <Image
                src="/proprio/walkingstairs.png"
                alt="cover"
                width={800}
                height={800}
                className="flex-1 min-w-0 object-cover object-center"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-sm">Solution</h2>
            <p>
              Our solution is to create a wearable device that tracks the
              user&apos;s proprioception. This device would be worn on the wrist
              and would use sensors to track the user&apos;s movements. This
              device would then be connected to a mobile app that would display
              the user&apos;s data.
            </p>
            <img
              src="/proprio/aboutposter.png"
              alt="cover"
              className="w-full object-cover object-center"
            />
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-sm">Design Tokens + Branding</h2>
            <div className="w-full flex gap-2">
              <img
                src="/proprio/slot4.png"
                alt="cover"
                className="flex-1 min-w-0 object-cover object-center"
              />
              <img
                src="/proprio/slot5.png"
                alt="cover"
                className="flex-1 min-w-0 object-cover object-center"
              />
              <img
                src="/proprio/slot6.png"
                alt="cover"
                className="flex-1 min-w-0 object-cover object-center"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-sm">User Flows</h2>

            <img
              src="/proprio/userflows.png"
              alt="cover"
              className="w-full object-cover object-center"
            />
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-sm">Low Fidelity Wireframes</h2>

            <img
              src="/proprio/lowfid.png"
              alt="cover"
              className="w-full object-cover object-center scale-103"
            />
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-sm">High Fidelity Wireframes</h2>

            <img
              src="/proprio/lowfid.png"
              alt="cover"
              className="w-full object-cover object-center scale-103"
            />
          </div>
        </div>
      </div> */}
      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default Pack;

const Paragraph = ({ color, children, title, className }) => {
  return (
    <div
      className={`flex items-center      bg-white w-full justify-center ${className}`}
    >
      <div className="flex w-1/3 flex-col  bg-white   justify-center   rounded-lg    gap-3">
        <h2
          className={`text-${color}-400 pl-2   text-base w-fit border-l-2 border-${color}-400`}
        >
          {title}
        </h2>
        <p className="text-lg">{children}</p>
      </div>
    </div>
  );
};

// Put this near the top of Pack/Page.js (or in its own component file)
const CircleProgress = ({ value = 0, size = 72, stroke = 4 }) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(100, value));
  const dashOffset = circumference * (1 - progress / 100);

  return (
    <div className="w-fit h-fit border-r border-gray-200 p-3 ">
      <div className="relative w-[72px] aspect-square flex items-center justify-center rounded-full bg-white">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="absolute inset-0"
        >
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={stroke}
            stroke="rgba(0,0,0,0.08)"
            fill="none"
          />
          {/* Progress */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={stroke}
            stroke="oklch(82.7% 0.119 306.383)" /* purple */
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
          />
        </svg>

        {/* Center text */}
        <p className="relative z-10 text-center font-bold ">{progress}%</p>
      </div>
    </div>
  );
};
