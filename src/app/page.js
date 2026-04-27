"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { ArrowUpRight, ArrowDown, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import Rounded from "./Components/Rounded";
import Footer from "./Components/Footer";
const ProjectCard = ({
  cover,
  technologies,
  title,
  link,
  className,
  icon,
  lines = true,
  video,
  children,
}) => {
  return (
    <div
      className={`relative flex group  mx-auto flex-col gap-2  w-full ${className}`}
    >
      <Link
        href={link}
        className={`w-full active:scale-98 ${className} overflow-hidden group rounded-sm  overflow-y-hidden cursor-pointer  inset-shadow-sm inset-shadow-white relative  transition-transform duration-300 aspect-4/3 `}
      >
        <div className="flex flex-col z-10 scale-0 group-hover:scale-100 transition-transform duration-300  origin-top-left absolute top-0 left-0 ">
          <div className="flex items-start ">
            <div className="pr-3 pl-2 pb-2 pt-1 bg-white text-black/70 text-sm   rounded-br-xl">
              {title}
            </div>
            <Rounded
              width={24}
              height={24}
              className="rotate-270"
              fill="#ffffff"
            />
          </div>
          <Rounded
            width={24}
            height={24}
            className="rotate-270"
            fill="#ffffff"
          />
        </div>
        <div className="flex flex-col scale-0 group-hover:scale-100 transition-transform duration-300 origin-bottom-right z-10 items-end right-0 bottom-0  absolute ">
          <Rounded
            width={24}
            height={24}
            className="rotate-90"
            fill="#ffffff"
          />
          <div className="flex items-end  ">
            <Rounded
              width={24}
              height={24}
              className="rotate-90"
              fill="#ffffff"
            />
            <div className="pl-3 pr-2 cursor-pointer group flex items-center gap-1 pt-2 pb-1   bg-white text-black/70 text-sm  rounded-tl-xl">
              More
              <ArrowUpRight
                strokeWidth={1}
                size={16}
                className="group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
        {/* {lines && (
        <div className="absolute top-0 left-0 z-1 w-full flex justify-between h-full">
          {Array.from({ length: 128 }).map((_, i) => (
            <div key={i} className="w-px z-1 h-full bg-white/10"></div>
          ))}
        </div>
      )} */}
        {cover && (
          <Image
            src={cover}
            alt={title}
            fill
            loading="lazy"
            quality={75}
            className="object-cover z-0 group-hover:scale-105 transition-transform duration-300  object-center"
          />
        )}
        {video && (
          <video
            src={video}
            autoPlay
            loop
            muted
            className="object-cover z-0 group-hover:scale-105 h-full  transition-transform duration-300  object-center"
          />
        )}
        {children}
        <div className="absolute top-0  flex flex-col gap-1 p-4   -translate-y-full group-hover:translate-y-0 transition-all duration-300  left-0 w-full  overflow-hidden group-hover:h-fit"></div>
      </Link>
      {/* <div className="flex  flex-col w-full  gap-0.5">
        <p className="">{title}</p>
        <p className="text-sm text-gray-500">Junheng&apos;s UI/UX Resume</p>
      </div> */}
    </div>
  );
};

const TypingText = ({ text, speed = 0.05, delay = 0 }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest));

  useEffect(() => {
    const controls = animate(count, text.length, {
      type: "tween",
      duration: text.length * speed,
      ease: "linear",
      delay: delay,
    });

    return controls.stop;
  }, []);

  return <motion.span>{displayText}</motion.span>;
};

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const delay = 0;
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex max-w-[1700px] mx-auto  font-light px-auto w-full flex-col xl:gap-16 gap-16 py-4 px-4 xl:py-10 text-black/70 xl:px-64 text-md ">
      <div className="tech-marquee w-full fixed bottom-0 left-0   flex  justify-center   overflow-hidden  text-xs uppercase bg-white z-50 text-nowrap border-t border-white/10 ">
        <div className=" flex items-center w-[70%] md:w-[50%]">
          {/* <div className="flex items-center text-xs py-2 px-4 spacemono  border-r border-white/20  z-40 relative text-white  ">
                <p>Design + Dev</p>
              </div> */}
          <div className="relative w-full py-2 items-center  overflow-hidden flex-1 flex">
            <div className="pointer-events-none absolute top-0 left-0 z-20  md:w-[15%] h-full bg-linear-to-r from-white via-white to-transparent"></div>
            <div className="pointer-events-none absolute top-0 right-0 z-20 w-[15%] h-full bg-linear-to-l from-white via-white to-transparent"></div>
            <div className="tech-marquee__track w-full h-full flex ">
              <div className="flex items-center gap-6 px-3">
                <p>React</p>
                <p>Tailwind</p>
                <p>Figma</p>
                <p>Javascript</p>
                <p>Typescript</p>
                <p>Framer Motion</p>
                <p>Vercel</p>
                <p>Next.js</p>
                <p>Node.js</p>
                <p>Express</p>
                <p>MongoDB</p>
                <p>PostgreSQL</p>
                <p>MySQL</p>
                <p>React</p>
                <p>Tailwind</p>
                <p>Figma</p>
                <p>Javascript</p>
                <p>Typescript</p>
                <p>Framer Motion</p>
                <p>Vercel</p>
                <p>Next.js</p>
                <p>Node.js</p>
                <p>Express</p>
                <p>MongoDB</p>
                <p>PostgreSQL</p>
                <p>MySQL</p>
              </div>
              <div className="flex items-center  gap-6 px-3" aria-hidden="true">
                <p>React</p>
                <p>Tailwind</p>
                <p>Figma</p>
                <p>Javascript</p>
                <p>Typescript</p>
                <p>Framer Motion</p>
                <p>Vercel</p>
                <p>Next.js</p>
                <p>Node.js</p>
                <p>Express</p>
                <p>MongoDB</p>
                <p>PostgreSQL</p>
                <p>MySQL</p>
                <p>React</p>
                <p>Tailwind</p>
                <p>Figma</p>
                <p>Javascript</p>
                <p>Typescript</p>
                <p>Framer Motion</p>
                <p>Vercel</p>
                <p>Next.js</p>
                <p>Node.js</p>
                <p>Express</p>
                <p>MongoDB</p>
                <p>PostgreSQL</p>
                <p>MySQL</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* menu */}
      <div
        className={`w-full   relative  flex z-50 justify-between items-center ${isOpen ? "p-4" : ""} transition-all duration-300  mx-auto ${isScrolled && !isOpen ? "bg-white/20 backdrop-blur-sm p-4 xl:w-[70%] w-[80%] rounded-xl" : ""}`}
      >
        <p className="-tracking-[1px] text-black text-lg font-black ">JUN</p>

        {/* <Image
          src="/logo.png"
          alt="Junheng Zheng"
          width={36}
          height={36}
          loading="lazy"
          quality={75}
        /> */}
        <div
          className={`absolute flex flex-col gap-4 top-0 left-0 w-full overflow-hidden h-fit bg-white   rounded-xl border-t   ${isOpen ? "xl:max-h-[300px] max-h-[800px] border-gray-100  p-4 shadow-sm shadow-gray-200" : "border-white border-none max-h-0"} transition-all duration-300`}
        >
          <h2 className="text-lg  ">Menu</h2>

          <div className="flex md:flex-row z-30 flex-col gap-4">
            <div className="flex flex-1 flex-col gap-3">
              <div className="w-full flex cursor-pointer  active:scale-98  transition-transform duration-300 items-center gap-3 h-fit p-4 bg-gray-50 inset-shadow-sm  border border-gray-100 inset-shadow-white rounded-md">
                <div className="w-10 h-10 rounded-md flex bg-white inset-shadow-sm inset-shadow-black/5 items-center justify-center">
                  <Image
                    src="/isometrics/gmail.png"
                    alt="Email"
                    width={32}
                    height={32}
                    loading="lazy"
                    quality={75}
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-xl instrument-serif font-normal">Email</p>
                  <p className="text-xs text-gray-500">
                    junhengzheng@gmail.com
                  </p>
                </div>
              </div>
              <div className="w-full flex cursor-pointer bg-gray-50 inset-shadow-sm inset-shadow-white  active:scale-98 transition-transform duration-300 items-center gap-3 h-fit p-4 border border-gray-100 rounded-md">
                <div className="w-10 h-10 rounded-md flex bg-white inset-shadow-sm inset-shadow-black/5 items-center justify-center">
                  <Image
                    src="/isometrics/linkedin.png"
                    alt="Email"
                    width={32}
                    height={32}
                    loading="lazy"
                    quality={75}
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-xl instrument-serif font-normal">
                    LinkedIn
                  </p>
                  <p className="text-xs text-gray-500">Junheng Zheng</p>
                </div>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-3">
              <div className="w-full flex cursor-pointer bg-gray-50 inset-shadow-sm inset-shadow-white  active:scale-98 transition-transform duration-300 items-center gap-3 h-fit p-4 border border-gray-100 rounded-md">
                <div className="w-10 h-10 rounded-md flex bg-white inset-shadow-sm inset-shadow-black/5 items-center justify-center">
                  <Image
                    src="/isometrics/resume.png"
                    alt="Resume"
                    width={32}
                    height={32}
                    loading="lazy"
                    quality={75}
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-xl instrument-serif font-normal">Resume</p>
                  <p className="text-xs text-gray-500">
                    Junheng&apos;s UI/UX Resume
                  </p>
                </div>
              </div>
              <div className="w-full flex cursor-pointer bg-gray-50 inset-shadow-sm inset-shadow-white  active:scale-98 transition-transform duration-300 items-center gap-3 h-fit p-4 border border-gray-100 rounded-md">
                <div className="w-10 h-10 rounded-md flex bg-white inset-shadow-sm inset-shadow-black/5 items-center justify-center">
                  <Image
                    src="/isometrics/github.png"
                    alt="Github"
                    width={32}
                    height={32}
                    loading="lazy"
                    quality={75}
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-xl instrument-serif font-normal">Github</p>
                  <p className="text-xs text-gray-500">
                    junhengzheng@gmail.com
                  </p>
                </div>
              </div>
            </div>
            <div className="md:hidden lg:flex flex flex-1 flex-col overflow-hidden justify-center py-16 p-3  md:py-3 gap-2  grow relative items-center rounded-xl ">
              {/* <div className="absolute top-12 right-3 w-32 h-32 bg-blue-100 rounded-full blur-2xl"></div>
              <div className="absolute bottom-12 left-8 w-32 h-32 bg-pink-100 rounded-full blur-2xl"></div>
              <div className="absolute top-12 left-2 w-32 h-32 bg-red-100 rounded-full blur-2xl"></div>
              <div className="absolute bottom-8 right-24 w-32 h-32 bg-purple-100 rounded-full blur-2xl"></div> */}
              <video
                src="/projectcards/dandi.mp4"
                autoPlay
                loop
                muted
                playsInline
                webkit-playsinline="true"
                disablePictureInPicture
                controls={false}
                className="object-cover -z-20 brightness-120 scale-100 origin-top-left absolute left-0 top-0 rounded-xl w-full h-full object-[10%_25%]"
              />
              <h2 className="instrument-serif flex items-center gap-1 font-normal z-2 text-amber-500 text-4xl">
                Let&apos;s Connect.
                <ArrowUpRight
                  strokeWidth={1}
                  size={36}
                  className="group-hover:scale-110 group-hover:rotate-45 stroke-amber-500 transition-transform duration-300"
                />
              </h2>
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`grid grid-cols-3 grid-rows-3 w-[23px] h-[23px] relative cursor-pointer active:scale-88 group transition-all duration-300 ${isOpen ? "rotate-45 gap-0" : "gap-px"}`}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {/* Top-left corner dot */}
          <div
            className={`bg-black/70 rounded-full transition-all duration-200 ${isOpen ? "scale-0 translate-y-full translate-x-full" : "hidden scale-100"}`}
          />

          {/* Top center - vertical line */}
          <div className="flex items-center justify-center">
            <div
              className={`bg-black/70 w-full h-full transition-all duration-500 ${isOpen ? "w-px" : "hidden rounded-full"}`}
            />
          </div>

          {/* Top-right corner dot */}
          <div
            className={`bg-black/70 rounded-full transition-all duration-200 ${isOpen ? "scale-0 translate-y-full -translate-x-full" : "scale-100"}`}
          />

          {/* Middle-left - horizontal line */}
          <div className="flex items-center justify-center">
            <div
              className={`bg-black/70 w-full h-full transition-all duration-500 ${isOpen ? "h-px" : "hidden rounded-full"}`}
            />
          </div>

          {/* Center - cross intersection */}
          <div className="flex relative items-center justify-center">
            <div
              className={`bg-black/70 w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${isOpen ? "w-px" : "rounded-full"}`}
            />
            <div
              className={`bg-black/70 w-full h-full transition-all duration-500 ${isOpen ? "h-px" : "rounded-full"}`}
            />
          </div>

          {/* Middle-right - horizontal line */}
          <div className="flex items-center justify-center">
            <div
              className={`bg-black/80 w-full h-full transition-all duration-500 ${isOpen ? "h-px" : "rounded-full"}`}
            />
          </div>

          {/* Bottom-left corner dot */}
          <div
            className={`bg-black/70 rounded-full transition-all duration-200 ${isOpen ? "scale-0 -translate-y-full translate-x-full" : "scale-100"}`}
          />

          {/* Bottom center - vertical line */}
          <div className="flex items-center justify-center">
            <div
              className={`bg-black/70 w-full h-full transition-all duration-500 ${isOpen ? "w-px" : "hidden rounded-full"}`}
            />
          </div>

          {/* Bottom-right corner dot */}
          <div
            className={`bg-black/70 rounded-full transition-all duration-200 ${isOpen ? "scale-0 -translate-y-full -translate-x-full" : "scale-100"}`}
          />
        </button>
      </div>
      {/* <div className="flex hidden flex-col gap-4">
        <div className="flex flex-col gap-2  instrument-serif text-2xl ">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: delay }}
            className="py-1.5 pl-1 pr-3 bg-gray-100/80 rounded-xl border-r border-white/20 shadow-sm inset-shadow-sm inset-shadow-white w-fit flex items-center gap-2"
          >
            <div className=" py-1 px-3 bg-blue-100 inset-shadow-sm border-r border-white/30 inset-shadow-white shadow-sm overflow-hidden relative rounded-xl ">
              <TypingText text="Design Engineer" speed={0.05} delay={delay} />
            </div>
            <div>🌷based in New York City</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: delay + 0.25 }}
            className="py-1.5 pl-3 pr-1 bg-gray-100/80 rounded-xl inset-shadow-sm border-r border-white/30 inset-shadow-white shadow-sm w-fit flex items-center gap-2"
          >
            <div className="xl:block hidden">Passionate about creating 🌼</div>
            <div className="xl:hidden block">Creating</div>

            <div className=" py-1 px-3 bg-yellow-100 inset-shadow-sm border-r border-white/30 inset-shadow-white shadow-sm overflow-hidden relative rounded-xl ">
              <TypingText
                text=" seamless digital experiences"
                speed={0.05}
                delay={delay}
              />
            </div>
          </motion.div>
        </div>

        <div className="flex gap-3 ">
          <button className="cursor-pointer active:scale-98 bg-white group hover:scale-101 transition-transform duration-300 px-4 py-2 border flex gap-2 items-center border-gray-200/80 rounded-md">
            Contact
            <ArrowUpRight
              strokeWidth={1}
              size={16}
              className="group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300"
            />
          </button>
          <button className="cursor-pointer active:scale-98 bg-white group hover:scale-101 transition-transform duration-300 px-4 py-2 border flex gap-2 items-center border-gray-200/80 rounded-md">
            Resume
            <ArrowUpRight
              strokeWidth={1}
              size={16}
              className="group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300"
            />
          </button>
        </div>
      </div> */}
      <div className="flex flex-col gap-6">
        {/* <div className="w-full flex justify-between text-sm  leading-tight mono items-center">
          <p> [Based in NYC]</p>
          <p>[10:38]</p>
        </div> */}
        <p className="z-20 text-lg w-full  md:w-1/2 ">
          Junheng combines design and development to create seamless digital
          experiences. Incoming @ <span className="italic">IBM Research</span>,
          and previously interned @{" "}
          <span className="italic">Liberty Mutual Insurance</span>.
        </p>
        <div className="flex gap-7">
          <p className="flex cursor-pointer  group items-center gap-1">
            {" "}
            <ArrowUpRight
              strokeWidth={1}
              size={20}
              className="group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300"
            />
            Contact
          </p>
          <p className="flex cursor-pointer  group items-center gap-1">
            <ArrowUpRight
              strokeWidth={1}
              size={20}
              className="group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300"
            />
            Resume
          </p>
          <p className="flex cursor-pointer  group items-center gap-1">
            <ArrowUpRight
              strokeWidth={1}
              size={20}
              className="group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300"
            />
            Works
          </p>
        </div>
        <div className="w-full h-80 xl:h-100 overflow-hidden items-center text-white flex-col gap-3  rounded-md justify-center flex relative  ">
          {/* <div className="flex flex-col z-10 absolute top-0 left-0 ">
            <div className="flex items-start ">
              <div className="pr-3 pl-2 pb-2 pt-1 bg-white text-black/70 text-sm   rounded-br-xl">
                Hello 👋
              </div>
              <Rounded
                width={24}
                height={24}
                className="rotate-270"
                fill="#ffffff"
              />
            </div>
            <Rounded
              width={24}
              height={24}
              className="rotate-270"
              fill="#ffffff"
            />
          </div> */}

          {/* <div className="flex flex-col z-10 items-end right-0 bottom-0  absolute ">
            <Rounded
              width={24}
              height={24}
              className="rotate-90"
              fill="#ffffff"
            />
            <div className="flex items-end  ">
              <Rounded
                width={24}
                height={24}
                className="rotate-90"
                fill="#ffffff"
              />
              <div className="pl-3 pr-2 cursor-pointer group flex items-center gap-1 pt-2 pb-1   bg-white text-black/70 text-sm  rounded-tl-xl">
                Contact
                <ArrowUpRight
                  strokeWidth={1}
                  size={16}
                  className="group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300"
                />
              </div>
            </div>
          </div> */}
          <video
            src="/windowlight.mp4"
            autoPlay
            loop
            muted
            playsInline
            webkit-playsinline="true"
            disablePictureInPicture
            controls={false}
            className="object-cover -z-20 brightness-120 scale-145 origin-top-left xl:origin-center xl:scale-100 absolute left-0 top-0 w-full h-full object-center xl:object-[50%_43%]"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1920 1080"
            preserveAspectRatio="none"
            className="absolute inset-0   w-full h-full opacity-30 pointer-events-none z-0"
          >
            <filter id="noiseFilter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="10"
                numOctaves="2"
                stitchTiles="stitch"
              />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>

          {/* <div className="flex absolute bottom-4 opacity-75  group left-1/2 -translate-x-1/2 flex-col gap-2 py-2 px-1 border border-white rounded-full">
            <ArrowDown
              strokeWidth={1}
              size={16}
              className="group-hover:scale-110  transition-transform duration-300"
            />
          </div> */}
          {/* <div className="flex gap-7 items-center">
          <div className="flex gap-1 items-center">
            <p>Works</p>
            <ArrowUpRight
              strokeWidth={1}
              size={16}
              className="group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300"
            />
          </div>
          <div className="flex gap-1 items-center">
            <p>Resume</p>
            <ArrowUpRight
              strokeWidth={1}
              size={16}
              className="group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300"
            />
          </div>
        </div> */}
        </div>
        {/* <div className="w-full flex justify-between leading-tight text-sm mono items-center">
          <p> [Contact]</p>
          <p>[Resume]</p>
        </div> */}
      </div>
      {/* <div className="py-7 flex text-lg text-center  justify-center">
        <p className="w-full md:w-1/2">
          Junheng has worked with startups, small businesses, and fortune 100s,
          and freelance work.Check out some of his works below.
        </p>
      </div> */}
      {/* <div className="w-full relative overflow-hidden 2xl:h-[320px] h-[320px] rounded-xl  flex items-center justify-between">
        {Array.from({ length: 256 }).map((_, i) => (
          <div key={i} className="w-px z-1 h-full bg-white/20"></div>
        ))}

        <img
          src="/testold.jpeg"
          alt="hero"
          className="object-cover absolute top-0 left-0 w-full h-full object-center rounded-xl"
        />
      </div> */}

      <div className="grid flex-1 grid-cols-1 saturate-105 md:grid-cols-8 gap-6">
        <ProjectCard
          cover="/cardcovers/ibm.gif"
          technologies={["Figma", "SwiftUI", "Kotlin"]}
          title="SWE Intern @ IBM Research"
          link="/works/pack"
          icon="/isometrics/meditate.png"
          className="md:col-span-4"
        >
          <div className="flex flex-col z-50 group-hover:scale-0 transition-transform duration-300  origin-top-left absolute top-0 left-0 ">
            <div className="flex items-start ">
              <div className="pr-3 pl-2 pb-2 pt-1 bg-white text-black/70 text-sm   rounded-br-xl">
                Coming Soon
              </div>
              <Rounded
                width={24}
                height={24}
                className="rotate-270"
                fill="#ffffff"
              />
            </div>
            <Rounded
              width={24}
              height={24}
              className="rotate-270"
              fill="#ffffff"
            />
          </div>
        </ProjectCard>
        <ProjectCard
          cover="/cardcovers/limi.gif"
          technologies={["Figma", "React", "Typescript", "SCSS", "Storybook"]}
          title="Design Engineer @ LMI "
          link="/works/libertymutual"
          icon="/isometrics/liberty.png"
          className="md:col-span-4 "
        />

        <ProjectCard
          cover="/cardcovers/propriomock.png"
          technologies={["Figma", "React", "Typescript", "SCSS", "Storybook"]}
          title="Figbuild 2026 [Proprio]"
          link="/works/proprio"
          icon="/isometrics/liberty.png"
          className="md:col-span-4 saturate-100 "
        />
        <ProjectCard
          technologies={["Figma", "React", "Typescript", "SCSS", "Storybook"]}
          title="Design Engineer @ Crafty Studios "
          link="/works/makerspace"
          icon="/isometrics/liberty.png"
          className="md:col-span-4 "
        >
          <Image
            src="/cardcovers/seniorproj.png"
            alt="Coming Soon"
            fill
            className="object-cover w-full h-full "
          />
        </ProjectCard>
        <ProjectCard
          cover="/projectcards/packgame.png"
          technologies={["Figma", "React", "Typescript", "SCSS", "Storybook"]}
          title="PACK! Mobile Game"
          link="/works/pack"
          icon="/isometrics/liberty.png"
          className="md:col-span-4"
        />
        {/* <ProjectCard
          cover="/projectcards/website.png"
          technologies={["Figma", "SwiftUI", "Kotlin"]}
          title="Pack!"
          link="/works/pack"
          icon="/isometrics/meditate.png"
          className="md:col-span-4 "
        /> */}
        {/* <ProjectCard
          cover="/projectcards/keyb.png"
          technologies={["Figma"]}
          title="FloralTyper"
          link="/projects/30min"
          icon="/isometrics/website.png"
          className="md:col-span-4"
        /> */}
        {/* <ProjectCard
          video="/projectcards/proprio.mov"
          technologies={["Figma"]}
          title="Proprio"
          link="/projects/30min"
          icon="/isometrics/website.png"
          className="md:col-span-4"
          lines={false}
        />



        <ProjectCard
          cover="/projectcards/bal.png"
          technologies={["Figma"]}
          title="Figma Studies"
          link="/projects/30min"
          icon="/isometrics/website.png"
          className="md:col-span-5"
        />
        <ProjectCard
          cover="/projectcards/30min.png"
          technologies={["Figma"]}
          title="Rythmn"
          link="/projects/30min"
          icon="/isometrics/gym.png"
          className="md:col-span-3"
        /> */}
      </div>
      {/* <div className="w-full flex flex-col py-12 gap-12">

        <p className="w-1/2">
          I started my journey studying industrial and product design at
          Brooklyn Technical Highschool. After graduating, I started my
          undergraduate at RIT studying Web and Mobile Computing , a major that
          combines developement and design. since then, I have worked with
          startups, small businesses, and fortune 100s, and freelance work to
          create seamless digital experiences.
        </p>
        <div className="relative h-96 rounded-lg overflow-hidden">
          <Image
            src="/jun/junback.jpeg"
            alt="about"
            fill
            className="object-cover object-center"
          />
        </div>
      </div> */}
      <Footer />
    </div>
  );
};

export default Page;
