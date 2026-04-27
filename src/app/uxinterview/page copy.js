"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Animatedlink from "../Components/Animatedlink";

import {
  Play,
  Volume1,
  Minus,
  Plus,
  ArrowRight,
  Link as LinkIcon,
  Image as ImageIcon,
  RotateCw,
  ChevronDown,
} from "lucide-react";

const Imagery = ({ children, className }) => {
  return (
    <div
      className={`w-full p-4 z-1 relative bg-orange-500 rounded-lg ${className}`}
    >
      <div className="absolute top-0 left-0 w-full flex justify-between h-full">
        {Array.from({ length: 128 }).map((_, index) => (
          <div key={index} className="w-px h-full bg-white/15"></div>
        ))}
      </div>
      <div className="w-full overflow-hidden relative shadow-md shadow-black/10 border border-gray-200  bg-white rounded-sm">
        {children}
      </div>
    </div>
  );
};
const Diagram1 = ({ ref }) => {
  const designOptions = [
    "A SINGLE LIST VIEW",
    "A KANBAN BOARD",
    "A TABLE LAYOUT",
  ];
  const appOptions = [
    "A FINANCE TRACKING APP",
    "AN INVOICE MANAGER",
    "A TAX DASHBOARD",
  ];
  const userOptions = ["ACCOUNTANTS", "FINANCE TEAMS", "SMALL BUSINESSES"];
  const [inView, setInView] = useState(false);
  const [currentDesign, setCurrentDesign] = useState(designOptions[0]);
  const [currentApp, setCurrentApp] = useState(appOptions[0]);
  const [currentUser, setCurrentUser] = useState(userOptions[0]);

  useEffect(() => {
    if (!inView) return;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * designOptions.length);
      setCurrentDesign(designOptions[randomIndex]);
      const randomIndexApp = Math.floor(Math.random() * appOptions.length);
      setCurrentApp(appOptions[randomIndexApp]);
      const randomIndexUser = Math.floor(Math.random() * userOptions.length);
      setCurrentUser(userOptions[randomIndexUser]);
    }, 300);

    return () => clearInterval(interval);
  }, [inView]);

  return (
    <div className="w-full flex-col gap-3  items-center p-4 lg:p-12 flex h-full ">
      <div className="w-fit hidden lg:flex gap-2 ">
        <button className="flex items-center gap-2  border border-gray-100 bg-white  px-4 py-2 rounded-full">
          <RotateCw size={16} strokeWidth={1} />
          <p className="text-nowrap">Reload Challenge</p>
        </button>
        <button className="flex items-center gap-2  border border-gray-100 bg-white  px-4 py-2 rounded-full">
          <p className="text-nowrap">Easy</p>
          <ChevronDown size={20} strokeWidth={1} />
        </button>
      </div>
      <div className="flex flex-col w-6/7 ">
        <div className="w-full py-3 border-b  border-gray-200  flex items-center justify-start">
          <span>
            <span className="text-orange-500 instrument-serif italic uppercase text-lg">
              DESIGN
            </span>{" "}
            <motion.span
              onViewportEnter={() => setInView(true)}
              onViewportLeave={() => setInView(false)}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {currentDesign}
            </motion.span>
          </span>
        </div>
        <div className="w-full py-3 border-b border-gray-200  flex items-center justify-start">
          <span>
            <span className="text-orange-500 instrument-serif italic uppercase text-lg">
              FOR
            </span>{" "}
            <motion.span
              onViewportEnter={() => setInView(true)}
              onViewportLeave={() => setInView(false)}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {currentApp}
            </motion.span>
          </span>
        </div>
        <div className="w-full py-3 border-gray-200  flex items-center justify-start">
          <span>
            <span className="text-orange-500 instrument-serif italic uppercase text-lg">
              TO HELP
            </span>{" "}
            <motion.span
              onViewportEnter={() => setInView(true)}
              onViewportLeave={() => setInView(false)}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {currentUser}
            </motion.span>
          </span>
        </div>
      </div>
    </div>
  );
};

const Diagram2 = ({ ref }) => {
  const text =
    "Okay, here's the requirements for today's interview. How can we design a FAQ page for Accountants?";
  const words = text.split(" ");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  return (
    <div className="flex flex-col  p-4 lg:p-12 items-center gap-3">
      {/* <div className="flex p-2   bg-white rounded-xl gap-2">
        <button
          onClick={() => setSelectedVideo("track")}
          className=" uppercase w-fit rounded-xl  bg-orange-500  text-white px-4 py-2  cursor-pointer "
        >
          Play
        </button>
        <div
          onClick={() => setSelectedVideo("track")}
          className="  text-black border border-gray-200  gap-1 flex uppercase w-fit rounded-xl   px-4 py-2  cursor-pointer "
        >
          <button>
            <Minus strokeWidth={0.5} size={16} />
          </button>
          <span>Volume</span>
          <span>80%</span>
          <button>
            <Plus strokeWidth={0.5} size={16} />
          </button>
        </div>
      </div> */}
      <div className="lg:p-3 w-full flex gap-3 lg:items-center  h-fit rounded-xl  ">
        <div className="p-1 relative border h-fit border-orange-500/20 rounded-full">
          <div className="p-1 border border-orange-500/40 rounded-full">
            <div className="p-1 border border-orange-500/70 rounded-full">
              <div className="w-12 aspect-square h-12 rounded-full z-1 relative bg-orange-500" />
            </div>
          </div>
        </div>
        <div className="flex flex-col text-md gap-1">
          <p className="text-md font-normal instrument-serif italic uppercase text-lg">
            Interviewer
          </p>
          <motion.p className=" flex  flex-wrap">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="whitespace-nowrap flex">
                {word.split("").map((char, charIndex) => {
                  const i =
                    words.slice(0, wordIndex).join("").length + charIndex;

                  const revealWindow = 1;
                  const start = (i / text.length) * revealWindow;
                  const end = start + 0.02;

                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  const color = useTransform(
                    scrollYProgress,
                    [start, end],
                    ["rgba(0,0,0,0.3)", "rgba(0,0,0,0.8)"]
                  );

                  return (
                    <motion.span
                      key={charIndex}
                      style={{ color }}
                      className="whitespace-pre"
                    >
                      {char}
                    </motion.span>
                  );
                })}
                {/* space after each word */}
                <span className="whitespace-pre"> </span>
              </span>
            ))}
          </motion.p>
        </div>
      </div>
    </div>
  );
};
const Diagram3 = () => {
  return (
    <div className="w-full h-full gap-3 lg:p-12 p-4  items-center justify-center  flex  ">
      <div className="flex h-full  items-center">
        <div className="p-3 text-white   aspect-square flex items-center justify-center rounded-full bg-orange-500">
          64%
        </div>
        <div className="w-4 h-px bg-gray-200"></div>
        <div className="w-px h-30 bg-gray-200"></div>
      </div>
      <div className="flex w-full flex-col gap-3">
        <div className=" border rounded-lg  flex flex-col gap-2 border-gray-200  p-3 w-full ">
          <div className="w-full flex justify-between">
            <span>Diagramming Ability</span>
            <span className="text-orange-500">64%</span>
          </div>
          <div className="pl-2 flex flex-col gap-2">
            <div className="w-full h-3 bg-gray-200"></div>
          </div>
        </div>
        <div className=" border rounded-lg  flex flex-col gap-2 border-gray-200  p-3 w-full ">
          <div className="w-full flex justify-between">
            <span>Diagramming Ability</span>
            <span className="text-orange-500">64%</span>
          </div>
          <div className="pl-2 flex flex-col gap-2">
            <div className="w-full h-3 bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
const Page = () => {
  const ref = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const FEATURES = [
    {
      id: "generate",
      subTitle: "Generate from 0–1",
      title: "Start a real, live technical interview",
      description:
        "Other products require you to choose from a list of questions. We allow you to generate a question based on your own context.",
    },
    {
      id: "prep",
      subTitle: "From 1 to 100 ",
      title: "Draw, think, speak, and ask",
      description:
        "We use AI to generate a question based on your own context. You can then use the question to prepare for your interview.",
    },
    {
      id: "verbalize",
      subTitle: "From 100 to Infinity",
      title: "Structured feedback - Verbalized",
      description:
        "We use AI to generate a question based on your own context. You can then use the question to prepare for your interview.",
    },
  ];

  const [selectedFeature, setSelectedFeature] = useState(FEATURES[0]);
  const [selectedVideo, setSelectedVideo] = useState("track");
  return (
    <div className="max-w-[1800px] mx-auto font-light text-sm text-gray-800">
      {/* Navigation Bar */}
      <div className="w-full xl:px-24 lg:px-12 lg:py-12 px-5 py-5 flex justify-between items-center relative">
        <div className="w-12 h-12 relative">
          <Image src="/uxinterviewer/logo.png" alt="logo" fill />
        </div>

        {/* navigation menu */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden flex flex-col relative w-7 items-center justify-center h-5 gap-2"
        >
          <span
            className={`w-full h-px absolute  bg-gray-500 transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-full" : "top-0 left-0"
            }`}
          />
          <span
            className={`w-full h-px   bg-gray-500 transition-all duration-300 ${
              isMenuOpen && "opacity-0"
            }`}
          />
          <span
            className={`w-full h-px absolute  bg-gray-500 transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 translate-y-full" : "bottom-0 left-0"
            }`}
          />
        </button>
        <div
          className={`flex lg:static bg-white absolute bottom-0 lg:overflow-visible overflow-hidden lg:w-fit w-full left-0 lg:translate-y-0  translate-y-full lg:flex-row flex-col lg:gap-8  items-center ${
            isMenuOpen ? "max-h-screen" : " lg:h-fit max-h-0 "
          } transition-all duration-600`}
        >
          <Link
            href="/"
            className="lg:w-fit relative w-full  lg:border-0  transition-all duration-300 lg:p-0 py-4 px-4 border-b border-gray-200"
          >
            Home
            <div className="w-full absolute -bottom-1 left-0 translate-y-full h-px bg-orange-500"></div>
          </Link>
          <Link
            href="/"
            className="lg:w-fit w-full lg:p-0 py-4 px-4 lg:border-0 border-b border-gray-200"
          >
            Pricing
          </Link>
          <div className="lg:w-fit w-full lg:p-0 lg:border-0 p-4 border-b border-gray-200">
            <div className="flex rounded-full lg:w-fit w-full overflow-hidden  border border-gray-200">
              <Link
                href="/"
                className="lg:w-fit w-full  hover:bg-gray-100  hover:px-6  transition-all duration-300 lg:p-3 lg:px-4 py-4 px-4 border-r border-gray-200"
              >
                Sign In
              </Link>
              <Link
                href="/"
                className="lg:w-fit w-full lg:p-3 hover:bg-gray-100  hover:px-6  transition-all duration-300 lg:px-4 py-4 px-4 lg:border-0 "
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Hero Section */}
      <div className="w-full flex flex-col gap-4   lg:items-center  lg:px-24 lg:py-10 px-5 pb-12  py-12 justify-center">
        <div className="instrument-serif italic lg:text-center  text-orange-500 py-2 flex gap-2  items-center px-4 border border-orange-200 w-fit rounded-full uppercase">
          <div className="w-2 h-2 aspect-square bg-orange-500 rounded-full" />
          Live Interviews
        </div>

        <motion.h1
          initial={{ translateY: 20, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 20,
          }}
          className="xl:text-5xl lg:text-4xl tracking-tight lg:text-center text-3xl font-medium"
        >
          Whiteboard Prep for{" "}
          <span className="instrument-serif lg:text-5xl xl:text-6xl text-4xl italic">
            UI/UX Designers
          </span>
        </motion.h1>
        <div className="overflow-hidden xl:w-1/2 lg:w-2/3 w-full">
          <motion.p
            initial={{ translateY: 80, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 20,
              delay: 0.3,
            }}
            className="xl:text-[16px] lg:text-center"
          >
            Instantly generate a question and jump into a real-time,
            speech-driven whiteboard interview. Track your progress and get
            feedback on your performance.
          </motion.p>
        </div>
        <div className="flex  gap-2">
          <button className="cursor-pointer w-fit hover:scale-102 transition-all duration-300  active:scale-98   bg-orange-500  text-white px-5 py-3 rounded-full">
            Sign in with Google
          </button>
          <button className="cursor-pointer w-fit hover:scale-102 transition-all duration-300  active:scale-98  border border-gray-200 px-5 py-3 rounded-full">
            Learn More
          </button>
        </div>
      </div>
      <div className="lg:px-12">
        <div className="w-full lg:rounded-xl relative   flex flex-col gap-4  bg-orange-500 overflow-hidden z-1 white p-5 xl:px-48 lg:px-24 py-12">
          <div className="absolute top-0 left-0 w-full flex justify-between h-full">
            {Array.from({ length: 256 }).map((_, index) => (
              <div key={index} className="w-px h-full bg-white/10"></div>
            ))}
          </div>
          <div className="flex gap-4 relative">
            <button
              onClick={() => setSelectedVideo("track")}
              className={`text-white text-xs mono  uppercase  rounded-xl lg:border border-white/20  cursor-pointer   ${
                selectedVideo === "track"
                  ? "bg-orange-600  px-4 py-2"
                  : "lg:px-4 lg:bg-orange-400"
              }`}
            >
              Track
            </button>
            <button
              onClick={() => setSelectedVideo("interview")}
              className={`text-white  mono text-xs uppercase rounded-xl lg:border border-white/20  cursor-pointer   ${
                selectedVideo === "interview"
                  ? "bg-orange-600  px-4 py-2"
                  : "lg:px-4 lg:bg-orange-400"
              }`}
            >
              Interview
            </button>
            <button
              onClick={() => setSelectedVideo("feedback")}
              className={`text-white mono  text-xs uppercase rounded-xl lg:border border-white/20  cursor-pointer   ${
                selectedVideo === "feedback"
                  ? "bg-orange-600  px-4 py-2"
                  : "lg:px-4 lg:bg-orange-400"
              }`}
            >
              Feedback
            </button>
            <button
              onClick={() => setSelectedVideo("record")}
              className={`text-white mono text-xs uppercase rounded-xl lg:border border-white/20  cursor-pointer   ${
                selectedVideo === "record"
                  ? "bg-orange-600  px-4 py-2"
                  : "lg:px-4 lg:bg-orange-400"
              }`}
            >
              Record
            </button>
          </div>
          <div className="perspective-[1000px] ">
            <motion.div
              className="w-full bg-white aspect-video overflow-hidden relative shadow-lg shadow-black/10 rounded-lg"
              initial={{
                rotateX: 12,
                rotateY: 12,
                rotateZ: -12,
                translateX: 64,
              }}
              whileInView={{
                rotateX: 0,
                rotateY: 0,
                rotateZ: 0,
                translateX: 0,
              }}
              viewport={{ amount: 0.5 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Image
                src="/uxinterviewer/main.png"
                alt="main image"
                fill
                className="object-cover object-top"
              />
            </motion.div>
          </div>
        </div>
      </div>
      {/* Features Section DESKTOP */}
      <div className="hidden h-[300dvh] flex-col lg:flex-row  lg:flex ">
        <div className="w-1/2 h-dvh sticky top-0  xl:px-24 lg:px-12 py-0 border-r border-gray-200  justify-center    flex flex-col gap-3">
          <p className=" uppercase italic instrument-serif  text-orange-600 ">
            {selectedFeature.subTitle}
          </p>
          <h2 className="xl:text-2xl lg:text-lg font-normal uppercase">
            {selectedFeature.title}
          </h2>
          <p className="w-6/7 xl:w-full ">{selectedFeature.description}</p>
        </div>
        <div className="w-1/2 flex flex-col">
          <motion.div
            onViewportEnter={() => {
              setSelectedFeature(FEATURES[0]);
            }}
            viewport={{ amount: 0.5 }}
            className=" h-dvh relative overflow-hidden border-b  xl:px-24 lg:px-12  border-gray-200 flex items-center justify-center w-full"
          >
            <div className="w-full perspective-[1000px] h-full scale-110 absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
              <div
                className="w-full rotate-x-12 -rotate-y-12 rotate-12 h-full flex justify-end"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="w-1/2 h-full flex justify-between">
                  {Array.from({ length: 64 }).map((_, index) => (
                    <div
                      key={index}
                      className="w-px h-full bg-orange-500/10"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="perspective-[1000px]  w-full">
              <motion.div
                initial={{
                  rotateX: 12,
                  rotateY: -12,
                  rotateZ: 12,
                }}
                whileInView={{
                  rotateX: 0,
                  rotateY: 0,
                  rotateZ: 0,
                }}
                viewport={{ amount: 0.6 }}
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 20,
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <Imagery>
                  <Diagram1 />
                </Imagery>
              </motion.div>
            </div>

            {/* <svg
              width="100%"
              height="100%"
              viewBox="0 0 90 98"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              strokeWidth="0.3px"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute w-[360px] h-[360px] opacity-10 top-0 left-0 -translate-x-12 -translate-y-12"
            >
              <path
                d="M56.1304 94.3101C56.6104 94.1101 57.0803 93.8701 57.5403 93.6101L56.1304 94.3101ZM37.0703 62.8701L37.2803 62.9901V62.77L37.0703 62.8701Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M44.7402 49.82C44.7402 51.52 44.4601 52.81 43.8901 53.7C43.3301 54.59 42.1802 55.53 40.4502 56.51C39.3502 57.14 38.5601 57.78 38.1001 58.45C38.0201 58.56 37.9601 58.66 37.9001 58.77C37.5001 59.52 37.3 60.84 37.28 62.76L37.0701 62.8701L34.0901 61.15L31.8801 59.8701C31.8801 59.1101 31.9102 58.42 31.9702 57.78C32.0102 57.19 32.0902 56.64 32.1902 56.15C32.3402 55.39 32.54 54.7601 32.8 54.2501C33.17 53.5301 33.7202 52.9101 34.4502 52.3701C34.9402 52.0101 35.5102 51.68 36.1702 51.4C36.5402 51.24 36.8802 51.07 37.1702 50.88C37.9002 50.46 38.4002 49.98 38.6802 49.46C39.0702 48.73 39.27 47.88 39.27 46.92C39.27 46.57 39.2402 46.2201 39.2002 45.8701C39.1602 45.6401 39.11 45.42 39.05 45.19C38.84 44.31 38.4601 43.45 37.9001 42.6C36.9901 41.2 35.87 40.12 34.54 39.35C34.32 39.22 34.1101 39.11 33.9001 39.02H33.8901C32.8701 38.57 31.9802 38.51 31.1702 38.85C30.6502 39.07 30.2201 39.41 29.8801 39.89C29.5901 40.29 29.3702 40.7801 29.2102 41.3601L25.3901 37.3L24.3301 36.17C25.1201 33.91 26.4002 32.5601 28.1802 32.1101C29.9502 31.6701 32.07 32.15 34.54 33.58C36.01 34.43 37.3701 35.46 38.6001 36.67C39.7701 37.81 40.83 39.11 41.79 40.56C43.76 43.57 44.7402 46.65 44.7402 49.82Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M67.0798 72.7299C67.0798 74.6399 66.96 76.4399 66.73 78.1199C66.36 80.7999 65.7 83.1898 64.73 85.3098C64.67 85.4598 64.5998 85.6098 64.5298 85.7598C62.8398 89.2798 60.5399 91.8798 57.6099 93.5698L57.5398 93.6099L56.1299 94.3098C53.4999 95.4898 50.5199 95.9298 47.1799 95.6498C43.2399 95.3298 39.0298 93.8698 34.5398 91.2798C29.0198 88.0898 23.9398 83.7198 19.3098 78.1598C16.4298 74.7098 13.8799 71.0699 11.6499 67.2499C10.2899 64.9199 9.03992 62.5098 7.91992 60.0398V69.1199L2 65.6998V45.3398L19.75 55.5898V62.3699L12.4299 58.1498C13.4599 60.5298 14.64 62.8498 15.98 65.0898C17.67 67.9698 19.6098 70.7398 21.7798 73.3898C25.6498 78.1198 29.8998 81.8099 34.5398 84.4899C38.2398 86.6199 41.6999 87.8198 44.9299 88.0698C48.1599 88.3198 50.9699 87.7698 53.3599 86.3998C54.9099 85.5198 56.2599 84.3098 57.3799 82.7798C58.0099 81.9498 58.5598 81.0298 59.0498 80.0198C59.4998 79.0998 59.8699 78.1198 60.1599 77.0698C60.8299 74.7998 61.1599 72.2098 61.1599 69.3098L67.0798 72.7299Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M38.24 72.1999C38.24 73.3899 37.8799 74.1899 37.1599 74.5899C36.4499 74.9999 35.5698 74.9099 34.5398 74.3099C33.4998 73.7099 32.6299 72.7798 31.9099 71.5198C31.1999 70.2598 30.8398 69.0299 30.8398 67.8499C30.8398 66.6699 31.1999 65.8599 31.9099 65.4499L32.1299 65.3399C32.8099 65.0699 33.5998 65.1999 34.5398 65.7399C35.5698 66.3299 36.4499 67.2599 37.1599 68.5299C37.8799 69.7899 38.24 71.0099 38.24 72.1999Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M37.0703 62.8704L37.2803 62.9904V62.7703L37.0703 62.8704ZM53.4204 43.3403C53.3504 43.4003 53.3005 43.4703 53.2505 43.5503L53.4705 43.4403C53.4705 43.4403 53.4404 43.3703 53.4204 43.3403Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M87.0801 62.7301L80.4302 66.05V66.0601L67.0801 72.7301L61.1602 69.3101L81.1602 59.3101L87.0801 62.7301Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M39.2698 46.92C39.2698 47.88 39.0699 48.7301 38.6799 49.4601C38.3999 49.9801 37.8999 50.46 37.1699 50.88C36.8799 51.07 36.5399 51.24 36.1699 51.4C35.5099 51.68 34.94 52.0101 34.45 52.3701C33.72 52.9101 33.1698 53.5301 32.7998 54.2501C32.5398 54.7601 32.3399 55.39 32.1899 56.15L31.2798 56.6001L27.9199 58.29L27.1499 58.67L19.75 62.3701V55.5901L22 54.4701L27.9199 51.51L28.48 51.2201L32.8398 49.05L33.45 48.7401L39.2 45.8701C39.24 46.2201 39.2698 46.57 39.2698 46.92Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M39.2 45.8704L33.45 48.7404L32.8398 49.0503L28.48 51.2203L27.9199 51.5103L22 54.4703L19.75 55.5903L2 45.3403L22 35.3403L25.3899 37.3003L29.21 41.3604L30.9299 40.5004L39.0498 45.1903C39.1098 45.4203 39.16 45.6404 39.2 45.8704Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M58.24 62.2002C58.24 63.3902 57.8799 64.1902 57.1599 64.5902L56.9399 64.7002L47.5298 69.4001L42.6299 71.8602L37.1599 74.5902C37.8799 74.1902 38.24 73.3902 38.24 72.2002C38.24 71.0102 37.8799 69.7902 37.1599 68.5302C36.4499 67.2602 35.5698 66.3302 34.5398 65.7402C33.5998 65.2002 32.8099 65.0702 32.1299 65.3402L35.74 63.5402L37.0698 62.8702L37.2798 62.9902L40.2798 61.4902L51.3499 55.9602H51.3599L52.8599 55.2002C53.3599 55.2002 53.9198 55.3802 54.5398 55.7402C55.5698 56.3302 56.4499 57.2602 57.1599 58.5302C57.8799 59.7902 58.24 61.0102 58.24 62.2002Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M56.6501 49.7405L52.04 47.0804L49.3301 45.5104L53.4702 43.4404C54.6502 45.4804 55.7101 47.5805 56.6501 49.7405Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M28.9199 20.8202C28.2499 23.0902 27.9199 25.6702 27.9199 28.5702L7.91992 38.5702C7.91992 34.3302 8.61979 30.7602 10.0298 27.8702C11.4298 24.9702 13.33 22.8402 15.72 21.4802C17.65 20.3802 19.8599 19.8001 22.3499 19.7601C22.9399 19.7401 23.5299 19.7601 24.1499 19.8101C25.6899 19.9301 27.2799 20.2702 28.9199 20.8202Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M67.0798 42.1801V62.5401L53.6599 54.8001L49.3298 52.3001V45.5101L52.0398 47.0801L56.6499 49.7402C55.7099 47.5802 54.65 45.4801 53.47 43.4401C53.47 43.4001 53.4399 43.3702 53.4199 43.3402C51.6499 40.2602 49.6098 37.3102 47.2998 34.4902C46.8698 33.9702 46.44 33.4602 46 32.9702C43.85 30.5202 41.58 28.3701 39.2 26.5301C37.69 25.3601 36.1398 24.3201 34.5398 23.3901C32.5998 22.2701 30.7299 21.4201 28.9199 20.8201C27.2799 20.2701 25.6899 19.9301 24.1499 19.8101C23.5299 19.7601 22.9399 19.7401 22.3499 19.7601C19.8599 19.8001 17.65 20.3802 15.72 21.4802C13.33 22.8402 11.4298 24.9702 10.0298 27.8702C8.61979 30.7602 7.91992 34.3301 7.91992 38.5701L2 35.1601C2 30.0101 2.8498 25.6602 4.5498 22.1202C6.2498 18.5802 8.57979 15.9601 11.5398 14.2701L12.8999 13.5902C15.5399 12.4102 18.5399 11.9602 21.8899 12.2302C22.6999 12.3002 23.5199 12.4101 24.3499 12.5701C26.7099 13.0301 29.1499 13.8802 31.6899 15.1102C32.6299 15.5502 33.5798 16.0502 34.5398 16.6102C37.9698 18.5902 41.2298 21.0301 44.3198 23.9401C44.5598 24.1501 44.7998 24.3802 45.0298 24.6102C46.6598 26.1802 48.2398 27.8902 49.7698 29.7302C49.8098 29.7802 49.8499 29.8301 49.8899 29.8801C52.7399 33.3001 55.26 36.9101 57.47 40.7001C57.58 40.8901 57.6898 41.0901 57.7898 41.2801C58.7698 42.9701 59.68 44.7002 60.51 46.4702C60.74 46.9202 60.9499 47.3802 61.1599 47.8402V38.7601L61.9299 39.2101L64.7 40.8101L67.0798 42.1801Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M87.0801 32.1803L81.1602 35.1403L80.1201 35.6603L75.78 37.8303L74.4702 38.4803L69.3301 41.0603L67.0801 42.1803L64.7002 40.8103L61.9302 39.2103L61.1602 38.7603L64.4902 37.1003L73.0901 32.7903L77.4202 30.6302L81.1602 28.7603L87.0801 32.1803Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M60.1597 77.0699C59.8697 78.1199 59.4996 79.0999 59.0496 80.0199C58.5596 81.0299 58.0096 81.9499 57.3796 82.7799C56.2596 84.3099 54.9096 85.5199 53.3596 86.3999C50.9696 87.7699 48.1597 88.3199 44.9297 88.0699C41.6997 87.8199 38.2396 86.62 34.5396 84.49C29.8996 81.81 25.6495 78.1199 21.7795 73.3899C19.6095 70.7399 17.6697 67.97 15.9797 65.09C14.6397 62.85 13.4597 60.5299 12.4297 58.1499L19.7498 62.37L27.1497 58.6699L27.9197 58.2899L31.2795 56.6L32.1897 56.1499C32.0897 56.6399 32.0097 57.1899 31.9697 57.7799C31.9097 58.4199 31.8796 59.11 31.8796 59.87L34.0896 61.1499L37.0696 62.87L35.7397 63.5399L32.1296 65.34L31.9097 65.45C31.1997 65.86 30.8396 66.66 30.8396 67.85C30.8396 69.04 31.1997 70.2599 31.9097 71.5199C32.6297 72.7799 33.4996 73.7099 34.5396 74.3099C35.5696 74.9099 36.4497 75 37.1597 74.59L42.6296 71.86L47.5295 69.3999C49.7595 71.3899 52.0996 73.08 54.5396 74.49C56.4796 75.61 58.3497 76.4699 60.1597 77.0699Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M11.6499 67.2501L7.91992 69.1201V60.04C9.03992 62.51 10.2899 64.9201 11.6499 67.2501Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M53.6597 54.8003L52.8596 55.2003L51.3596 55.9503H51.3496L40.2795 61.4904L37.2795 62.9904V62.7603C37.2995 60.8403 37.4997 59.5203 37.8997 58.7703C37.9597 58.6603 38.0196 58.5603 38.0996 58.4503C38.5596 57.7803 39.3497 57.1403 40.4497 56.5103C42.1797 55.5303 43.3296 54.5903 43.8896 53.7003C44.4596 52.8103 44.7397 51.5203 44.7397 49.8203C44.7397 46.6503 43.7596 43.5703 41.7896 40.5603C40.8296 39.1103 39.7696 37.8103 38.5996 36.6703C37.3696 35.4603 36.0096 34.4303 34.5396 33.5803C32.0696 32.1503 29.9497 31.6704 28.1797 32.1104L39.1997 26.5303C41.5797 28.3703 43.8498 30.5203 45.9998 32.9703C46.4398 33.4603 46.8696 33.9704 47.2996 34.4904C49.6096 37.3104 51.6497 40.2603 53.4197 43.3403C53.3497 43.4003 53.2998 43.4703 53.2498 43.5503L49.3296 45.5103V52.3003L53.6597 54.8003Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M33.8899 39.0203L30.9299 40.5004L29.21 41.3604C29.37 40.7804 29.5899 40.2903 29.8799 39.8903C30.2199 39.4103 30.6499 39.0704 31.1699 38.8504C31.9799 38.5104 32.8699 38.5703 33.8899 39.0203Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M77.4204 30.63L73.0903 32.7901L64.4905 37.1001L61.1604 38.76V47.8401C60.9504 47.3801 60.7405 46.9201 60.5105 46.4701C59.6805 44.7001 58.7703 42.9701 57.7903 41.2801C57.6903 41.0901 57.5805 40.8901 57.4705 40.7001C55.2605 36.9101 52.7404 33.3 49.8904 29.88C49.8504 29.83 49.8103 29.7801 49.7703 29.7301C48.2403 27.8901 46.6603 26.1801 45.0303 24.6101C44.8003 24.3801 44.5603 24.1501 44.3203 23.9401C41.2303 21.0301 37.9703 18.5901 34.5403 16.6101C33.5803 16.0501 32.6304 15.5501 31.6904 15.1101C29.1504 13.8801 26.7103 13.0301 24.3503 12.5701C23.5203 12.4101 22.7004 12.3001 21.8904 12.2301C18.5404 11.9601 15.5404 12.4101 12.9004 13.5901L31.5403 4.27004C34.5003 2.59004 37.9504 1.91013 41.8904 2.23013C45.8404 2.56013 50.0503 4.02013 54.5403 6.61013C60.0603 9.79013 65.1403 14.1701 69.7703 19.7301C72.6503 23.1801 75.2004 26.81 77.4204 30.63Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M87.0801 32.1802V52.5402L67.0801 62.5402V42.1802L69.3301 41.0602L74.4702 38.4802L75.78 37.8302L80.1201 35.6602L81.1602 35.1401L87.0801 32.1802Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M87.0793 62.73C87.0793 67.88 86.2293 72.2199 84.5293 75.7599C82.8193 79.3099 80.4993 81.92 77.5393 83.61C77.1493 83.83 76.7594 84.03 76.3494 84.22L57.6094 93.5699C60.5394 91.8799 62.8393 89.2799 64.5293 85.7599C64.5993 85.6099 64.6695 85.4599 64.7295 85.3099C65.6995 83.1899 66.3595 80.8 66.7295 78.12C66.9595 76.44 67.0793 74.64 67.0793 72.73L80.4294 66.0599L87.0793 62.73Z"
                stroke="black"
                strokeLinejoin="round"
              />
            </svg> */}
            {/* <svg
              width="100%"
              height="100%"
              viewBox="0 0 105 117"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              strokeWidth="0.3px"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute bottom-0 right-0 w-[360px] opacity-10  h-[360px] translate-x-12 translate-y-12"
            >
              <path
                d="M78.88 66.7884C76.78 59.9884 73.93 53.4784 70.33 47.2684C67.86 43.0084 65.0901 38.9884 62.0201 35.1984C60.6201 33.4484 59.15 31.7583 57.62 30.1183C52.76 24.8983 47.5501 20.6883 42.0201 17.4883C40.5701 16.6583 39.1401 15.9084 37.7301 15.2684C33.7701 13.4484 30 12.3983 26.41 12.0983C26.37 12.0983 26.3302 12.0884 26.2902 12.0884C22.2802 11.7784 18.7099 12.2884 15.5699 13.6484L13.7101 14.5784C10.1101 16.6284 7.25002 19.8383 5.15002 24.2183C3.05002 28.5883 2 33.9484 2 40.3084C2 46.6684 3.05002 53.2284 5.15002 60.0284C7.25002 66.8284 10.1101 73.3384 13.7101 79.5484C17.3101 85.7584 21.54 91.4784 26.41 96.6984C31.28 101.918 36.4801 106.128 42.0201 109.328C47.5501 112.518 52.76 114.318 57.62 114.718C62.49 115.118 66.73 114.298 70.33 112.238C73.32 110.538 75.7901 108.038 77.7401 104.728C78.1401 104.058 78.52 103.338 78.88 102.598C80.98 98.2283 82.0302 92.8684 82.0302 86.5084C82.0302 80.1484 80.98 73.5884 78.88 66.7884ZM42.0201 63.4084L38.7101 65.2884L33.11 68.4883L19.3099 76.3583C16.3099 71.1783 14.01 65.8684 12.41 60.4284C10.81 54.9884 10.0101 49.8284 10.0101 44.9284C10.0101 34.6684 13.1099 27.7783 19.3099 24.2383C20.3499 23.6383 21.4399 23.1684 22.5599 22.8284C25.4799 21.9084 28.66 21.8383 32.11 22.6083C35.2 23.2883 38.5001 24.6484 42.0201 26.6784V63.4084Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M38.7097 65.2885L33.1096 68.4885L19.3096 76.3585C16.3096 71.1785 14.0097 65.8685 12.4097 60.4285C10.8097 54.9885 10.0098 49.8285 10.0098 44.9285C10.0098 34.6685 13.1096 27.7785 19.3096 24.2385C20.3496 23.6385 21.4396 23.1685 22.5596 22.8285C25.4796 21.9085 28.6596 21.8385 32.1096 22.6085C30.7096 25.9585 30.0098 30.0685 30.0098 34.9285C30.0098 39.7885 30.8097 44.9885 32.4097 50.4285C33.8997 55.4985 35.9997 60.4485 38.7097 65.2885Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M102.031 76.5083C102.031 82.8683 100.98 88.2283 98.8804 92.5983C96.7804 96.9783 93.9303 100.188 90.3303 102.238L88.4705 103.168L70.3303 112.238C73.3203 110.538 75.7905 108.038 77.7405 104.728C78.1405 104.058 78.5204 103.338 78.8804 102.598C80.9804 98.2283 82.0305 92.8683 82.0305 86.5083C82.0305 80.1483 80.9804 73.5883 78.8804 66.7883C76.7804 59.9883 73.9303 53.4783 70.3303 47.2683C67.8603 43.0083 65.0905 38.9884 62.0205 35.1984C60.6205 33.4484 59.1504 31.7583 57.6204 30.1183C52.7604 24.8983 47.5505 20.6883 42.0205 17.4883C40.5705 16.6583 39.1405 15.9083 37.7305 15.2683C33.7705 13.4483 30.0004 12.3983 26.4104 12.0983C26.3704 12.0983 26.3305 12.0884 26.2905 12.0884C22.2805 11.7784 18.7103 12.2883 15.5703 13.6483L33.7104 4.57837C37.3104 2.51837 41.5404 1.69827 46.4104 2.09827C51.2804 2.49827 56.4805 4.29828 62.0205 7.48828C67.5505 10.6883 72.7604 14.8983 77.6204 20.1183C82.4904 25.3383 86.7303 31.0583 90.3303 37.2683C93.9303 43.4783 96.7804 49.9883 98.8804 56.7883C100.98 63.5883 102.031 70.1583 102.031 76.5083Z"
                stroke="black"
                strokeLinejoin="round"
              />
            </svg> */}
          </motion.div>
          <motion.div
            onViewportEnter={() => {
              setSelectedFeature(FEATURES[1]);
            }}
            ref={ref}
            viewport={{ amount: 0.5 }}
            className=" h-dvh border-b relative overflow-hidden xl:px-24 lg:px-12  border-gray-200 flex items-center justify-center w-full"
          >
            {/* <svg
              width="100%"
              height="100%"
              viewBox="0 0 86 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              strokeWidth="0.3px"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute w-[360px] h-[360px] opacity-10 top-0 left-0 -translate-x-12 -translate-y-12"
            >
              <path
                d="M15.5801 48.9027C14.0701 46.3027 12.2702 44.4027 10.1602 43.1827V16.7727L2.49023 12.3428V82.7727L10.1602 87.2028V60.7927C12.2702 62.0127 14.0701 62.1928 15.5801 61.3328C17.0801 60.4728 17.8301 58.8427 17.8301 56.4227C17.8301 54.0027 17.0801 51.4927 15.5801 48.9027Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M48.5203 74.1327C48.5203 80.2227 47.5102 85.3627 45.5002 89.5627C43.4802 93.7527 40.75 96.8327 37.3 98.8027L31.8301 89.3727C34.6401 87.7727 36.8502 85.3027 38.4502 81.9727C39.6802 79.4127 40.4302 76.4327 40.7102 72.9927C40.8102 71.9327 40.8501 70.8428 40.8501 69.7028C40.8501 64.8628 40.0502 59.8527 38.4502 54.6727C37.9802 53.1527 37.4501 51.6427 36.8701 50.1427C35.5301 46.6627 33.9102 43.2527 31.9902 39.9227C31.9402 39.8227 31.8901 39.7327 31.8301 39.6327L34.9302 37.8627L37.3 36.5127C37.41 36.7127 37.5301 36.9027 37.6301 37.1027C40.7601 42.5827 43.2702 48.2927 45.1902 54.2527C45.3002 54.5727 45.4002 54.8927 45.5002 55.2227C46.9302 59.8627 47.8503 64.3827 48.2603 68.8027C48.4403 70.6027 48.5203 72.3727 48.5203 74.1327Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M31.8301 39.6326C31.8901 39.7326 31.9402 39.8226 31.9902 39.9226L26.4602 42.6926L22.4902 44.9526L20.9902 45.8126C21.5402 46.7526 22.0302 47.7026 22.4902 48.6626C23.2102 50.1826 23.81 51.7426 24.3 53.3326C24.64 54.4326 24.9101 55.5026 25.1001 56.5726L22.4902 57.8826L15.5801 61.3326C17.0801 60.4726 17.8301 58.8426 17.8301 56.4226C17.8301 54.0026 17.0801 51.4926 15.5801 48.9026C14.0701 46.3026 12.2702 44.4026 10.1602 43.1826L22.4902 37.0226L30.1602 33.1826C31.9802 34.2326 33.5702 35.7925 34.9302 37.8625L31.8301 39.6326Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M30.1602 6.77246V33.1825L22.4902 37.0225L10.1602 43.1825V16.7725L22.4902 10.6124L30.1602 6.77246Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M30.1602 6.77271L22.4902 10.6127L10.1602 16.7727L2.49023 12.3428L22.4902 2.34277L30.1602 6.77271Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M25.9802 79.2922L10.1602 87.2023V60.7922C12.2702 62.0122 14.0701 62.1923 15.5801 61.3323L22.4902 57.8822L25.1001 56.5723C25.3701 58.0223 25.5002 59.4423 25.5002 60.8423C25.5002 63.2723 25.1 65.3122 24.3 66.9822C23.81 68.0022 23.2002 68.8623 22.4902 69.5623C22.0302 70.0023 21.5302 70.3723 20.9902 70.6823L25.9802 79.2922Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M40.8499 69.7029C40.8499 70.8429 40.81 71.9328 40.71 72.9828L26.46 80.1128C27.59 79.4628 28.6 78.6129 29.46 77.5529C29.61 77.3829 29.7499 77.2128 29.8699 77.0328C29.9799 76.9028 30.0799 76.7628 30.1599 76.6228C30.5999 75.9928 30.9899 75.3129 31.3499 74.5729C32.5699 72.0429 33.1699 68.9428 33.1699 65.2728C33.1699 61.6028 32.5699 57.8128 31.3499 53.8828C31.3099 53.7628 31.27 53.6328 31.23 53.5128C30.95 52.6228 30.6498 51.7528 30.3298 50.8828C29.2698 48.0428 27.98 45.3129 26.46 42.6929L31.99 39.9229C33.91 43.2529 35.5299 46.6628 36.8699 50.1428C37.4499 51.6428 37.98 53.1529 38.45 54.6729C40.05 59.8529 40.8499 64.8629 40.8499 69.7029Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M56.1899 78.5623C56.1899 81.2223 56.03 83.7123 55.71 86.0623C55.54 87.4023 55.31 88.7023 55.02 89.9423L37.2998 98.8022C40.7498 96.8322 43.48 93.7523 45.5 89.5623C47.51 85.3623 48.52 80.2222 48.52 74.1322C48.52 72.3722 48.44 70.6022 48.26 68.8022C47.85 64.3822 46.93 59.8622 45.5 55.2222C45.4 54.8922 45.2999 54.5722 45.1899 54.2522C43.2699 48.2922 40.7599 42.5822 37.6299 37.1022C37.5299 36.9022 37.4098 36.7122 37.2998 36.5122L42.8398 33.7422C42.9498 33.9422 43.0599 34.1323 43.1699 34.3323C43.2099 34.3923 43.24 34.4522 43.27 34.5122C47.21 41.4622 50.3198 48.6023 52.5898 55.9623C52.7598 56.5023 52.9198 57.0523 53.0798 57.5923C54.8598 63.7523 55.8799 69.7923 56.1199 75.6923C56.1699 76.6523 56.1899 77.6123 56.1899 78.5623Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M63.8599 82.9929C63.8599 91.5829 62.4599 98.7829 59.6399 104.603C56.8299 110.423 52.9899 114.723 48.1399 117.493L42.6699 108.063C46.8899 105.663 50.1998 101.973 52.5898 97.0129C53.6198 94.8729 54.43 92.513 55.02 89.943C55.31 88.703 55.54 87.403 55.71 86.063C56.03 83.713 56.1899 81.223 56.1899 78.563C56.1899 77.613 56.1699 76.653 56.1199 75.693C55.8799 69.793 54.8598 63.753 53.0798 57.593C52.9198 57.053 52.7598 56.503 52.5898 55.963C50.3198 48.603 47.21 41.4629 43.27 34.5129C43.24 34.4529 43.2099 34.393 43.1699 34.333C43.0599 34.133 42.9498 33.9429 42.8398 33.7429C42.7798 33.6429 42.7299 33.553 42.6699 33.453L48.1399 30.333C48.2499 30.533 48.37 30.723 48.48 30.923C53.17 39.123 56.8999 47.6529 59.6399 56.5129C60.0699 57.9029 60.4698 59.283 60.8298 60.653C62.8098 68.093 63.8099 75.3729 63.8499 82.4829C63.8599 82.6629 63.8599 82.8229 63.8599 82.9929Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M83.8606 72.9929C83.8606 81.5829 82.4606 88.7829 79.6406 94.6029C76.8306 100.423 72.9906 104.723 68.1406 107.493L48.1406 117.493C52.9906 114.723 56.8306 110.423 59.6406 104.603C62.4606 98.7829 63.8606 91.5829 63.8606 82.9929C63.8606 82.8229 63.8606 82.6629 63.8506 82.4929C63.8106 75.3729 62.8106 68.093 60.8306 60.653C60.4706 59.283 60.0706 57.9029 59.6406 56.5129C56.9006 47.6529 53.1707 39.123 48.4807 30.923C48.3707 30.723 48.2506 30.533 48.1406 30.333L68.1406 20.333C72.9906 28.713 76.8306 37.4429 79.6406 46.5129C82.4606 55.5829 83.8606 64.4129 83.8606 72.9929Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M33.1702 65.2723C33.1702 68.9423 32.5701 72.0424 31.3501 74.5724C30.9901 75.3124 30.6002 75.9923 30.1602 76.6223C30.0802 76.7623 29.9801 76.9023 29.8701 77.0323C29.7501 77.2123 29.6102 77.3824 29.4602 77.5524C28.6002 78.6124 27.5902 79.4623 26.4602 80.1123L25.9802 79.2924L20.9902 70.6824C21.5302 70.3724 22.0302 70.0024 22.4902 69.5624C23.2002 68.8624 23.81 68.0023 24.3 66.9823C25.1 65.3123 25.5002 63.2724 25.5002 60.8424C25.5002 59.4424 25.3701 58.0224 25.1001 56.5724C24.9101 55.5024 24.64 54.4324 24.3 53.3324C23.81 51.7424 23.2102 50.1824 22.4902 48.6624C22.0302 47.7024 21.5402 46.7524 20.9902 45.8124L22.4902 44.9524L26.4602 42.6924C27.9802 45.3124 29.2701 48.0423 30.3301 50.8823C30.6501 51.7523 30.9502 52.6223 31.2302 53.5123C31.2702 53.6323 31.3101 53.7623 31.3501 53.8823C32.5701 57.8123 33.1702 61.6123 33.1702 65.2723Z"
                stroke="black"
                strokeLinejoin="round"
              />
            </svg> */}
            {/* <svg
              width="100%"
              height="100%"
              viewBox="0 0 98 95"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              strokeWidth="0.3px"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute w-[360px] h-[360px] opacity-10 bottom-0 right-0 translate-x-12 translate-y-12"
            >
              <path
                d="M42.5903 37.9172C42.5903 42.1872 41.2704 45.0772 38.6204 46.5872C35.9704 48.0972 32.7803 47.7772 29.0603 45.6272C26.4503 44.1272 24.1103 42.0272 22.0303 39.3272C21.2703 38.3472 20.5504 37.2972 19.8704 36.1572C19.7504 35.9572 19.6303 35.7572 19.5103 35.5472C16.8603 30.9772 15.5303 26.5572 15.5303 22.2872C15.5303 18.0172 16.8603 15.1272 19.5103 13.6172L20.1802 13.2772C22.6902 12.1772 25.6503 12.6072 29.0603 14.5772C32.7803 16.7272 35.9704 20.0872 38.6204 24.6572C40.9204 28.6272 42.2203 32.4772 42.5203 36.2172C42.5703 36.7872 42.5903 37.3572 42.5903 37.9172Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M61.1599 20.0573L59.6797 20.7973C56.5197 22.4073 54.0099 24.9973 52.1499 28.5873C51.0199 30.7573 50.2298 33.2373 49.7898 36.0273C49.5998 37.2073 49.4799 38.4373 49.4099 39.7273C49.3899 40.2173 49.3699 40.7073 49.3699 41.2173L38.6199 46.5873C41.2699 45.0773 42.5898 42.1873 42.5898 37.9173C42.5898 37.3573 42.5698 36.7873 42.5198 36.2173C42.2198 32.4773 40.9199 28.6273 38.6199 24.6573C35.9699 20.0873 32.7798 16.7273 29.0598 14.5773C25.6498 12.6073 22.6897 12.1773 20.1797 13.2773L39.4297 3.66727C39.4297 3.66727 39.4798 3.63727 39.5098 3.61727C39.7598 3.47727 40.0098 3.34727 40.2698 3.24727C42.7598 2.18727 45.6898 2.62727 49.0598 4.57727C52.7798 6.72727 55.9699 10.0873 58.6199 14.6573C59.6799 16.4873 60.5299 18.2773 61.1599 20.0573Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M84.9197 61.7673L79.6797 64.7573L75.4597 66.8673L61.4897 73.8573L61.3799 73.7873L64.9197 71.7673L75.3699 66.5473L79.5198 64.4773L79.5298 64.4673L84.9197 61.7673Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M95.9199 38.8073L85.01 44.2673L78.6301 47.4573L75.9199 48.8073L70.5 39.4673L76.97 36.2273L90.5 29.4673L95.9199 38.8073Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M84.7405 61.4672C84.8005 61.5672 84.8604 61.6672 84.9204 61.7672L79.5305 64.4672L75.3806 66.5472L64.9304 71.7672C62.4504 67.6872 60.5106 63.4272 59.1006 58.9872C57.6906 54.5472 56.9805 50.2972 56.9805 46.2172C56.9805 45.7472 56.9905 45.2772 57.0105 44.8272C57.1505 41.5572 57.7706 38.7572 58.9006 36.4172C58.9606 36.2672 59.0306 36.1272 59.1006 35.9872C59.9206 34.3972 60.9106 33.0672 62.0806 31.9972C62.9306 31.1972 63.8804 30.5472 64.9304 30.0372L69.5806 27.7172L84.9304 20.0372C82.4504 21.2572 80.5106 23.2372 79.1006 25.9872C77.6906 28.7272 76.9805 32.1372 76.9805 36.2172L70.5105 39.4672C70.3505 39.5372 70.1905 39.6172 70.0405 39.7072C68.4605 40.5572 67.2105 41.8472 66.2805 43.5772C65.2705 45.4872 64.7605 47.8572 64.7605 50.7072C64.7605 51.0372 64.7605 51.3572 64.7805 51.6872C64.8805 54.2372 65.3905 56.8672 66.2805 59.5972C67.3005 62.6672 68.7105 65.6672 70.5105 68.5872L75.2705 66.2072L79.3506 64.1672L84.7505 61.4672H84.7405Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M56.1301 81.4372V92.3072L2 61.0572V50.1873C2 48.0573 2.47994 46.3272 3.43994 45.0072C3.91994 44.3472 4.49015 43.8473 5.15015 43.5173C5.81015 43.1873 6.57016 43.0272 7.41016 43.0272C10.2902 43.0072 13.5301 43.4572 17.1401 44.3772C18.6901 44.7772 20.31 45.3172 22 46.0072C24.23 46.9172 26.5901 48.0873 29.0601 49.5173C33.4001 52.0173 37.38 54.8972 40.99 58.1472C44.31 61.1272 47.32 64.1572 50.02 67.2272C50.25 67.4972 50.48 67.7572 50.71 68.0272C52.4 69.9772 53.7299 72.1672 54.6899 74.5972C55.6499 77.0272 56.1301 79.3072 56.1301 81.4372Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M73.46 60.3473C74.08 62.0973 74.8999 63.8173 75.9199 65.4973L75.1699 65.9273L70.5 68.5873C68.7 65.6673 67.29 62.6673 66.27 59.5973C65.38 56.8673 64.87 54.2373 64.77 51.6873C64.76 51.3573 64.75 51.0373 64.75 50.7073C64.75 47.8573 65.26 45.4873 66.27 43.5773C67.2 41.8473 68.45 40.5573 70.03 39.7073C70.18 39.6173 70.34 39.5373 70.5 39.4673L75.9199 48.8073C74.8999 49.3173 74.08 50.0973 73.46 51.1273C73.39 51.2373 73.33 51.3473 73.27 51.4673C72.78 52.4473 72.53 53.6973 72.53 55.1973C72.53 56.8873 72.84 58.5973 73.46 60.3473Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M95.9199 55.4973L90.5 58.5873L84.74 61.4673L79.3401 64.1673L75.26 66.2073L70.5 68.5873L75.1699 65.9273L75.9199 65.4973L79.1699 63.8773L84.5701 61.1673L90.3201 58.2973L95.9199 55.4973Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M93.4602 50.3472C94.0802 52.0972 94.9002 53.8173 95.9202 55.4973L90.3203 58.2973L84.5703 61.1673L79.1702 63.8772L75.9202 65.4972C74.9002 63.8172 74.0802 62.0972 73.4602 60.3472C72.8402 58.5972 72.5303 56.8873 72.5303 55.1973C72.5303 53.6973 72.7803 52.4473 73.2703 51.4673C73.3303 51.3473 73.3902 51.2372 73.4602 51.1272C74.0802 50.0972 74.9002 49.3173 75.9202 48.8073L78.6304 47.4572L85.0103 44.2673L95.9202 38.8073C94.9002 39.3173 94.0802 40.0972 93.4602 41.1272C92.8402 42.1572 92.5303 43.5173 92.5303 45.1973C92.5303 46.8773 92.8402 48.5972 93.4602 50.3472Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M59.0903 58.9872C60.5003 63.4272 62.4402 67.6872 64.9202 71.7672L61.3804 73.7872L59.6802 74.7572C59.1002 73.7972 58.5503 72.8372 58.0203 71.8572C55.6303 67.4972 53.6704 62.9672 52.1504 58.2772C50.2904 52.5472 49.3604 47.0672 49.3604 41.8172C49.3604 41.6172 49.3604 41.4172 49.3704 41.2172C49.3704 40.7072 49.3904 40.2172 49.4104 39.7272C49.4804 38.4372 49.6003 37.2072 49.7903 36.0272C50.2303 33.2372 51.0204 30.7572 52.1504 28.5872C54.0104 24.9972 56.5202 22.4072 59.6802 20.7972L62.4702 25.7172L64.9202 30.0372C63.8702 30.5472 62.9203 31.1972 62.0703 31.9972C60.9003 33.0672 59.9103 34.3972 59.0903 35.9872C59.0203 36.1272 58.9504 36.2672 58.8904 36.4172C57.7604 38.7572 57.1402 41.5572 57.0002 44.8272C56.9802 45.2772 56.9702 45.7472 56.9702 46.2172C56.9702 50.2972 57.6803 54.5472 59.0903 58.9872Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M84.9197 20.0372L69.5698 27.7072V27.7172L64.9197 30.0372L62.4697 25.7172L59.6797 20.7972L61.1599 20.0572L79.6797 10.7972L84.9197 20.0372Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M76.1304 71.4372V82.3072L56.1304 92.3072V81.4372C56.1304 79.3072 55.6502 77.0272 54.6902 74.5972C53.7302 72.1672 52.4002 69.9772 50.7102 68.0272C50.4802 67.7572 50.2503 67.4972 50.0203 67.2272C47.3203 64.1572 44.3102 61.1272 40.9902 58.1472C37.3802 54.8972 33.4003 52.0172 29.0603 49.5172C26.5903 48.0872 24.2302 46.9172 22.0002 46.0072C20.3102 45.3172 18.6904 44.7772 17.1404 44.3772C13.5304 43.4572 10.2904 43.0072 7.4104 43.0272C6.5704 43.0272 5.81039 43.1872 5.15039 43.5172L19.8704 36.1572C20.5504 37.2972 21.2703 38.3472 22.0303 39.3272C24.1103 42.0272 26.4503 44.1272 29.0603 45.6272C32.7803 47.7772 35.9704 48.0972 38.6204 46.5872L49.3704 41.2172C49.3604 41.4172 49.3604 41.6172 49.3604 41.8172C49.3604 47.0672 50.2904 52.5472 52.1504 58.2772C53.6704 62.9672 55.6303 67.4972 58.0203 71.8572C58.5503 72.8372 59.1002 73.7972 59.6802 74.7572L61.4902 73.8572L75.4602 66.8672C75.9102 68.4672 76.1304 69.9872 76.1304 71.4372Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M5.15039 43.5173L5.03027 43.5773"
                stroke="black"
                strokeLinejoin="round"
              />
            </svg> */}

            <div className="perspective-[1000px] w-full">
              <motion.div
                initial={{
                  rotateX: 30,
                  rotateY: -20,
                  rotateZ: -12,
                }}
                whileInView={{
                  rotateX: 0,
                  rotateY: 0,
                  rotateZ: 0,
                }}
                viewport={{ amount: 0.6 }}
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 20,
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <Imagery>
                  <Diagram2 />
                </Imagery>
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            onViewportEnter={() => {
              setSelectedFeature(FEATURES[2]);
            }}
            viewport={{ amount: 0.5 }}
            className=" h-dvh relative overflow-hidden  xl:px-24 lg:px-12  border-gray-200 flex items-center justify-center w-full"
          >
            {/* <svg
              width="48"
              height="48"
              viewBox="0 0 94 107"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              strokeWidth="0.3px"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute w-[360px] h-[360px] opacity-10 top-0 left-0 -translate-x-12 -translate-y-12"
            >
              <path
                d="M70.1249 7.71045L65.7949 44.9604L45.7949 54.9604L50.1249 17.7104L70.1249 7.71045Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M91.7749 59.9604L71.7749 69.9604L45.7949 54.9604L65.7949 44.9604L91.7749 59.9604Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M91.7749 59.9604L48.4749 94.5805L28.4749 104.58L44.1249 92.0704L71.7749 69.9604L91.7749 59.9604Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M71.7749 69.9604L44.1249 92.0704L28.4749 104.58L19.8149 99.5805L24.1449 67.3005L2.49487 54.8005L41.4649 12.7104L48.4649 16.7505L50.1249 17.7104L45.7949 54.9604L71.7749 69.9604Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M70.1248 7.71045L50.1248 17.7104L48.4648 16.7505L41.4648 12.7104L61.4648 2.71045L70.1248 7.71045Z"
                stroke="black"
                strokeLinejoin="round"
              />
            </svg> */}
            {/* <svg
              viewBox="0 0 101 125"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              height="48"
              width="48"
              strokeWidth="0.5px"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute w-[360px] h-[360px] opacity-10 bottom-0 right-0 translate-x-12 translate-y-12"
            >
              <path
                d="M54.9296 104.066C54.9296 108.566 53.5196 111.606 50.7196 113.156C47.9096 114.706 44.4996 114.326 40.4896 112.016C36.4796 109.696 33.0696 106.146 30.2696 101.346C29.2996 99.6762 28.4896 98.0261 27.8496 96.3961C26.6596 93.3361 26.0596 90.3361 26.0596 87.3961C26.0596 85.2761 26.4196 83.4362 27.1396 81.8762C27.8596 80.3162 28.8996 79.1461 30.2696 78.3661L32.3396 77.2462L36.5796 74.9362L40.4896 72.8162L46.9896 83.8462L50.7196 90.1761C51.8096 92.0661 52.6996 93.9562 53.3696 95.8462C53.5496 96.3062 53.6996 96.7662 53.8396 97.2262C54.5596 99.5762 54.9296 101.856 54.9296 104.066Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M98.9802 85.5862C98.9802 93.6862 97.2602 100.076 93.8102 104.756C91.8602 107.406 89.5602 109.406 86.9202 110.746L86.6702 110.866L67.2402 120.586C69.7502 119.236 71.9402 117.296 73.8102 114.756C77.2602 110.076 78.9802 103.686 78.9802 95.5862C78.9802 87.4862 77.2202 78.8562 73.6902 69.9662C73.6202 69.7962 73.5502 69.6262 73.4902 69.4562C69.9802 60.7662 65.4002 52.8962 59.7402 45.8362L73.8302 38.7862H73.8402L79.7402 35.8362C85.5102 43.0362 90.1602 51.0762 93.6902 59.9662C97.2202 68.8562 98.9802 77.4062 98.9802 85.5862Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M73.8302 38.7862L59.7402 45.8362L57.5702 47.6162C56.5302 48.4862 55.3902 48.8862 54.1402 48.8162C52.9002 48.7462 51.6002 48.3162 50.2302 47.5262C47.7502 46.0862 45.5002 43.8062 43.5002 40.6662C41.4902 37.5362 40.4902 34.2662 40.4902 30.8562V12.6362L60.4902 2.63623V20.8562C60.4902 24.2662 61.4902 27.5362 63.5002 30.6662C65.5002 33.8062 67.7502 36.0862 70.2302 37.5262C71.4902 38.2462 72.6902 38.6762 73.8302 38.7862Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M78.98 95.5862C78.98 103.686 77.26 110.076 73.81 114.756C71.94 117.296 69.75 119.236 67.24 120.586C65.12 121.726 62.79 122.436 60.22 122.716C61.58 121.296 62.64 119.486 63.41 117.306C64.17 115.126 64.55 112.566 64.55 109.616C64.55 108.536 64.5 107.436 64.39 106.326C64.31 105.426 64.19 104.516 64.03 103.596C63.74 101.816 63.3 100.006 62.74 98.1562C61.54 94.1962 59.82 90.2762 57.57 86.4062L48.09 70.2862L47.51 69.3062L41.16 58.4862L40.49 57.3562L26.68 65.0062L23.53 66.7562C21.21 68.0762 19.44 70.0062 18.24 72.5262C17.04 75.0562 16.44 78.1562 16.44 81.8362C16.44 84.7862 16.82 87.7862 17.58 90.8462C18.34 93.9162 19.4 96.9362 20.77 99.9362C15.15 92.8262 10.62 84.9462 7.17 76.2862C3.73 67.6262 2 59.2462 2 51.1462C2 41.4862 4.01 34.0362 8.02 28.8062C12.03 23.5762 16.44 19.7762 21.25 17.3962C21.63 17.2062 22 17.0262 22.38 16.8562C26.08 15.1262 29.54 13.9962 32.76 13.4662C33.34 13.3662 33.91 13.2962 34.48 13.2362L40.49 12.6362V30.8562C40.49 34.2662 41.49 37.5362 43.5 40.6662C45.5 43.8062 47.75 46.0862 50.23 47.5262C51.6 48.3162 52.9 48.7462 54.14 48.8162C55.39 48.8862 56.53 48.4862 57.57 47.6162L59.74 45.8362C65.4 52.8962 69.98 60.7662 73.49 69.4562C73.55 69.6262 73.62 69.7962 73.69 69.9662C77.22 78.8562 78.98 87.4062 78.98 95.5862Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M60.4899 2.63623L40.4899 12.6362L34.4799 13.2362C33.9099 13.2962 33.3399 13.3662 32.7599 13.4662C29.5399 13.9962 26.0799 15.1262 22.3799 16.8562L41.2499 7.39621C46.0599 5.02621 50.4699 3.63621 54.4799 3.23621L60.4899 2.63623Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M38.2404 62.5262C37.0404 65.0562 36.4404 68.1562 36.4404 71.8362C36.4404 72.8662 36.4904 73.8962 36.5804 74.9362L32.3404 77.2462L30.2704 78.3662C28.9004 79.1462 27.8604 80.3162 27.1404 81.8762C26.4204 83.4362 26.0604 85.2762 26.0604 87.3962C26.0604 90.3362 26.6604 93.3362 27.8504 96.3962L20.7704 99.9362C19.4004 96.9362 18.3404 93.9162 17.5804 90.8462C16.8204 87.7862 16.4404 84.7862 16.4404 81.8362C16.4404 78.1562 17.0404 75.0562 18.2404 72.5262C19.4404 70.0062 21.2104 68.0762 23.5304 66.7562L26.6804 65.0062L40.4904 57.3562L41.1604 58.4862C39.9704 59.5962 38.9904 60.9462 38.2404 62.5262Z"
                stroke="black"
                strokeLinejoin="round"
              />
              <path
                d="M54.9302 104.066C54.9302 101.856 54.5602 99.5762 53.8402 97.2262C53.7002 96.7662 53.5502 96.3062 53.3702 95.8462C52.7002 93.9562 51.8102 92.0661 50.7202 90.1761L46.9902 83.8462L40.4902 72.8162L47.5102 69.3062L48.0902 70.2862L57.5702 86.4062C59.8202 90.2762 61.5402 94.1962 62.7402 98.1562C63.3002 100.006 63.7402 101.816 64.0302 103.596C64.1902 104.516 64.3102 105.426 64.3902 106.326L50.7202 113.156C53.5202 111.606 54.9302 108.566 54.9302 104.066Z"
                stroke="black"
                strokeLinejoin="round"
              />
            </svg> */}
            <div className="perspective w-full -[1000px]">
              <motion.div
                initial={{
                  rotateX: 12,
                  rotateY: -12,
                  rotateZ: 12,
                }}
                whileInView={{
                  rotateX: 0,
                  rotateY: 0,
                  rotateZ: 0,
                }}
                viewport={{ amount: 0.6 }}
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 20,
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <Imagery>
                  <Diagram3 />
                </Imagery>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Features Section MOBILE */}
      <div className="w-full lg:hidden px-5 py-16     justify-center    flex flex-col gap-4">
        <p className=" uppercase text-xs  text-orange-600 ">
          {FEATURES[0].subTitle}
        </p>
        <h2 className=" text-xl font-normal uppercase ">{FEATURES[0].title}</h2>
        <p className=" uppercase  ">{FEATURES[0].description}</p>
        <Imagery>
          <Diagram1 />
        </Imagery>
      </div>
      <div className="w-full lg:hidden px-5 py-16   justify-center    flex flex-col gap-4">
        <p className=" uppercase text-xs text-orange-600 ">
          {FEATURES[0].subTitle}
        </p>
        <h2 className=" text-xl font-normal uppercase">{FEATURES[0].title}</h2>
        <p className=" uppercase  ">{FEATURES[0].description}</p>
        <Imagery>
          <Diagram2 ref={ref} />
        </Imagery>
      </div>
      <div className="w-full lg:hidden px-5 py-16     justify-center    flex flex-col gap-4">
        <p className=" uppercase text-xs text-orange-600 ">
          {FEATURES[0].subTitle}
        </p>
        <h2 className=" text-xl font-normal uppercase">{FEATURES[0].title}</h2>
        <p className=" uppercase  ">{FEATURES[0].description}</p>
        <div className="perspective-[1000px]">
          <div className="[transform-style:preserve-3d] rotate-x-[12deg]">
            <Imagery>
              <Diagram3 />
            </Imagery>
          </div>
        </div>
      </div>
      {/* Details section */}
      {/* <div className="w-full  lg:p-24 p-5  border-t  border-gray-200  justify-center    flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h2 className=" text-3xl font-semibold uppercase">
            Start Entirely for Free
          </h2>
          <p className=" uppercase lg:w-1/3 text-right ">
            {FEATURES[0].description}
          </p>
        </div>

        <div className="w-full relative  flex gap-8 flex-col items-center  px-56 p-12 bg-orange-500 rounded-xl ">
          <div className="absolute top-0 left-0 w-full flex justify-between h-full">
            {Array.from({ length: 256 }).map((_, index) => (
              <div key={index} className="w-px h-full bg-white/10"></div>
            ))}
          </div>
          <div className="w-fit  p-2 z-1 relative rounded-full bg-white overflow-hidden gap-2 flex">
            <button className="w-30 py-3 flex bg-orange-500 items-center  justify-center text-white rounded-full ">
              Billed Monthly
            </button>
            <button className="w-30 py-3 border rounded-full border-gray-200 flex items-center justify-center bg-white ">
              Billed Yearly
            </button>
          </div>
          <div className="flex gap-8 z-1 relative w-full">
            <div className="flex w-full flex-col bg-white rounded-xl ">
              <div className="w-full border-b border-gray-200 flex flex-col gap-4  p-6">
                <p className="uppercase text-xl">Free</p>
                <div className="flex items-end gap-1">
                  <h2 className="text-5xl font-semibold">$0</h2>
                  <h2 className="text-5xl font-semibold">/</h2>
                  <h2 className="text-xl font-semibold">Month</h2>
                </div>
              </div>
              <div className="w-full   flex flex-col gap-4  p-6">
                <p className="uppercase text-xl">Features</p>
                <p>Question Generation</p>
                <p>Live Text Interview</p>
                <p>3 Interviews a day - Everyday</p>
                <p>Result Viewing and tracking</p>
                <button className="cursor-pointer w-full hover:scale-102 transition-all duration-300  active:scale-98   bg-orange-500  text-white px-5 py-3 rounded-full">
                  Sign in with Google
                </button>
              </div>
            </div>
            <div className="flex w-full flex-col bg-white rounded-xl ">
              <div className="w-full border-b border-gray-200 flex flex-col gap-4  p-6">
                <p className="uppercase text-xl">Pro</p>
                <div className="flex items-end gap-1">
                  <h2 className="text-5xl font-semibold">$12</h2>
                  <h2 className="text-5xl font-semibold">/</h2>
                  <h2 className="text-xl font-semibold">Month</h2>
                </div>
              </div>
              <div className="w-full   flex flex-col gap-4  p-6">
                <p className="uppercase text-xl">Features</p>
                <p>Question Generation</p>
                <p>Live Text Interview</p>
                <p>3 Interviews a day - Everyday</p>
                <p>Result Viewing and tracking</p>
                <button className="cursor-pointer w-full hover:scale-102 transition-all duration-300  active:scale-98   border border-gray-200 px-5 py-3 rounded-full">
                  Try for 7 days free
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Footer */}
      <div className="bg-white mono uppercase">
        <div className="flex  relative px-5 z-1 bg-white border-t border-gray-200 py-12 lg:px-24 lg:py-12 flex-col gap-16 w-full">
          <div className="w-12 h-12 relative">
            <Image src="/uxinterviewer/logo.png" alt="logo" fill />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex md:flex-row flex-col md:justify-between gap-16 md:items-end">
              <div className="flex  gap-12">
                <div className="flex flex-col gap-4">
                  <Animatedlink href="#about">Home</Animatedlink>
                  <Animatedlink href="#works">Pricing</Animatedlink>
                  <Animatedlink href="#philosophy">Sign In</Animatedlink>
                </div>
                <div className="flex flex-col gap-4">
                  <Animatedlink link="https://www.linkedin.com/in/junhengzheng/">
                    Sign Up
                  </Animatedlink>
                  <Animatedlink link="https://github.com/junheng-zheng">
                    LinkedIn
                  </Animatedlink>
                  <Animatedlink link="https://mail.google.com/mail/?view=cm&fs=1&to=jz7259@g.rit.edu">
                    Contact Us
                  </Animatedlink>
                </div>
              </div>
              <p className="text-sm text-inverse">
                © 2026 UXInterviewer. All rights reserved.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 z-0 lg:px-24 px-5 lg:py-12 py-6 sticky bottom-0 w-full">
          <svg
            width="100%"
            height="auto"
            viewBox="0 0 198 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-10"
          >
            <path
              d="M10.7813 0H14.4716V11.3352C14.4716 12.608 14.1676 13.7216 13.5597 14.6761C12.9574 15.6307 12.1136 16.375 11.0284 16.9091C9.94318 17.4375 8.67898 17.7017 7.2358 17.7017C5.78693 17.7017 4.51989 17.4375 3.43466 16.9091C2.34943 16.375 1.50568 15.6307 0.903409 14.6761C0.301136 13.7216 0 12.608 0 11.3352V0H3.69034V11.0199C3.69034 11.6847 3.83523 12.2756 4.125 12.7926C4.42045 13.3097 4.83523 13.7159 5.36932 14.0114C5.90341 14.3068 6.52557 14.4545 7.2358 14.4545C7.9517 14.4545 8.57386 14.3068 9.10227 14.0114C9.63636 13.7159 10.0483 13.3097 10.3381 12.7926C10.6335 12.2756 10.7813 11.6847 10.7813 11.0199V0Z"
              fill="black"
            />
            <path
              d="M20.968 0L24.4879 5.94886H24.6243L28.1612 0H32.3288L27.0021 8.72727L32.4482 17.4545H28.2038L24.6243 11.4972H24.4879L20.9084 17.4545H16.6811L22.1442 8.72727L16.7834 0H20.968Z"
              fill="black"
            />
            <path d="M38.3544 0V17.4545H34.6641V0H38.3544Z" fill="black" />
            <path
              d="M55.9901 0V17.4545H52.8026L45.2088 6.46875H45.081V17.4545H41.3906V0H44.6293L52.1634 10.9773H52.3168V0H55.9901Z"
              fill="black"
            />
            <path
              d="M58.3743 3.04261V0H72.7095V3.04261H67.3658V17.4545H63.718V3.04261H58.3743Z"
              fill="black"
            />
            <path
              d="M75.0703 17.4545V0H86.8317V3.04261H78.7607V7.2017H86.2266V10.2443H78.7607V14.4119H86.8658V17.4545H75.0703Z"
              fill="black"
            />
            <path
              d="M89.7656 17.4545V0H96.652C97.9702 0 99.0952 0.235795 100.027 0.707386C100.964 1.1733 101.678 1.83523 102.166 2.69318C102.661 3.54545 102.908 4.5483 102.908 5.7017C102.908 6.8608 102.658 7.85795 102.158 8.69318C101.658 9.52273 100.933 10.1591 99.9844 10.6023C99.0412 11.0455 97.8992 11.267 96.5582 11.267H91.9474V8.30114H95.9616C96.6662 8.30114 97.2514 8.20455 97.7173 8.01136C98.1832 7.81818 98.5298 7.52841 98.7571 7.14205C98.9901 6.75568 99.1065 6.27557 99.1065 5.7017C99.1065 5.12216 98.9901 4.63352 98.7571 4.2358C98.5298 3.83807 98.1804 3.53693 97.7088 3.33239C97.2429 3.12216 96.6548 3.01705 95.9446 3.01705H93.456V17.4545H89.7656ZM99.1918 9.51136L103.53 17.4545H99.456L95.2116 9.51136H99.1918Z"
              fill="black"
            />
            <path
              d="M108.2 0L112.419 13.2614H112.581L116.808 0H120.899L114.882 17.4545H110.126L104.101 0H108.2Z"
              fill="black"
            />
            <path d="M126.69 0V17.4545H123V0H126.69Z" fill="black" />
            <path
              d="M129.727 17.4545V0H141.488V3.04261H133.417V7.2017H140.883V10.2443H133.417V14.4119H141.522V17.4545H129.727Z"
              fill="black"
            />
            <path
              d="M148.351 17.4545L143.357 0H147.388L150.277 12.1278H150.422L153.609 0H157.061L160.24 12.1534H160.393L163.283 0H167.314L162.32 17.4545H158.723L155.399 6.04261H155.263L151.947 17.4545H148.351Z"
              fill="black"
            />
            <path
              d="M169.289 17.4545V0H181.05V3.04261H172.979V7.2017H180.445V10.2443H172.979V14.4119H181.085V17.4545H169.289Z"
              fill="black"
            />
            <path
              d="M183.984 17.4545V0H190.871C192.189 0 193.314 0.235795 194.246 0.707386C195.183 1.1733 195.896 1.83523 196.385 2.69318C196.879 3.54545 197.126 4.5483 197.126 5.7017C197.126 6.8608 196.876 7.85795 196.376 8.69318C195.876 9.52273 195.152 10.1591 194.203 10.6023C193.26 11.0455 192.118 11.267 190.777 11.267H186.166V8.30114H190.18C190.885 8.30114 191.47 8.20455 191.936 8.01136C192.402 7.81818 192.749 7.52841 192.976 7.14205C193.209 6.75568 193.325 6.27557 193.325 5.7017C193.325 5.12216 193.209 4.63352 192.976 4.2358C192.749 3.83807 192.399 3.53693 191.928 3.33239C191.462 3.12216 190.874 3.01705 190.163 3.01705H187.675V17.4545H183.984ZM193.411 9.51136L197.749 17.4545H193.675L189.43 9.51136H193.411Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Page;
