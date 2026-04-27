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
import { Gamepad, ArrowUpRight } from "lucide-react";
const Pack = () => {
  return (
    <div className="flex flex-col 2xl:px-128 xl:px-64   px-4  gap-8 py-12  font-light text-black/70   ">
      <div className="flex flex-col text-base opacity-90   gap-3">
        <Link className="cursor-pointer text-sm  " href="/">
          Back to Home
        </Link>
        <p className="z-20 text-lg w-full md:w-1/2 ">
          Over the summer of 2025, I worked as a Design Engineer Intern at
          Liberty Mutual Insurance. I worked as a hybrid designer and developer,
          working on the Enterprise UI team, a team focused on designing and
          developing the internal design system for the company.
        </p>
      </div>
      <div className="flex flex-col gap-3 ">
        <div className="w-full aspect-4/3 md:aspect-2/1 relative bg-[#FFD000] flex ">
          <Image
            src="/cardcovers/limi.gif"
            alt="cover"
            fill
            className="object-cover scale-80 object-center"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 ">
        <div className="w-full aspect-video px-12 text-center relative flex-col gap-3  bg-gray-100 flex justify-center items-center">
          <p className="z-20 text-lg">
            Please message me to learn more about what I did.
          </p>
          <div className="flex gap-3">
            <Link
              href="https://mail.google.com/mail/?view=cm&fs=1&to=jz7259@g.rit.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 group"
            >
              <ArrowUpRight
                strokeWidth={1}
                size={20}
                className="group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300"
              />
              Gmail
            </Link>
            <Link
              href="https://mail.google.com/mail/?view=cm&fs=1&to=jz7259@g.rit.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 group"
            >
              <ArrowUpRight
                strokeWidth={1}
                size={20}
                className="group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300"
              />
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
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
