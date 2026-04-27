"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Briefcase, User, BookOpen, Mail } from "lucide-react";
import Footer from "./Components/Footer";
import Image from "next/image";

const AnimateWord = ({ word }) => {
  return (
    <motion.div
      initial={{ opacity: 0.8 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
      className="inline-block"
    >
      {word.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: 16, opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            delay: i * 0.03,
            duration: 1,
            ease: "easeOut",
            type: "spring",
          }}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

const ProjectCard = ({ cover, technologies, title, link, className }) => {
  return (
    <Link
      href={link}
      className={`w-full active:scale-98 group overflow-y-hidden cursor-pointer border border-gray1/50 relative hover:scale-101 transition-transform duration-300 2xl:h-[440px] h-[220px] md:h-[180px] lg:h-[240px] xl:h-[320px]  rounded-xl ${className}`}
    >
      <div className="absolute top-0 left-0 z-1 w-full flex justify-between h-full">
        {Array.from({ length: 128 }).map(
          (_, i) => (
            console.log(i),
            (<div key={i} className="w-px z-1 h-full bg-white/10"></div>)
          )
        )}
      </div>
      {/* <div className="absolute top-0 left-0 z-1 w-full flex flex-col justify-between h-full">
        {Array.from({ length: 128 }).map(
          (_, i) => (
            console.log(i),
            (<div key={i} className="w-full z-1 h-px bg-white/10"></div>)
          )
        )}
      </div> */}
      <Image
        src={cover}
        alt={title}
        fill
        className="object-cover z-0 rounded-xl object-center"
      />
      <div className="absolute bottom-0 flex flex-col gap-1 rounded-t-md p-4 bg-white translate-y-full group-hover:translate-y-0 transition-all duration-300 border-t border-gray1/50 left-0 w-full  overflow-hidden group-hover:h-fit">
        <p className="text-lg ">{title}</p>
        <div className="flex gap-1">
          {technologies.map((technology, index) => (
            <span key={index} className="text-xs opacity-80">
              {technology} {index !== technologies.length - 1 && "/"}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default function Home() {
  const [isSelected, setIsSelected] = useState(0);
  const [audience, setAudience] = useState("anyone");

  const handleParagraph = (audience) => {
    if (audience === "anyone") {
      return "Product Designer and UX Developer based in NYC. Junheng combines design and development to create seamless digital experiences. Prev. Design Engineer Intern @ Liberty Mutual Insurance working on their internal design system, Enterprise UI.";
    } else if (audience === "recruiters") {
      return "Communication with technical expertise in UI/UX design and Frontend Development to deliver impactful solutions. With success backed by metrics, Junheng has previously worked with startups, small businesses, and fortune 100 companies.";
    } else if (audience === "designers") {
      return "Junheng utilizes his developmental skills to create designs that seamlessly integrate with technical solutions. With over 7 years of product design experience, Junheng specializes in shaping user journeys and building scalable design systems.";
    } else if (audience === "developers") {
      return "Junheng leverages his design expertise to create technical solutions that are both functional and aesthetically pleasing. Junheng develops from 0-1, primarily using React and Next.js, with a strong focus on performance and scalability.";
    }
  };
  const delay = 0;
  const duration = 1;
  return (
    <motion.div
      initial={{ height: "100dvh", overflow: "hidden" }}
      animate={{ height: "auto", overflow: "visible" }}
      transition={{ duration: duration, delay: delay, ease: "easeOut" }}
      className="max-w-[2000px] mx-auto  md:py-12 scroll-smooth p-8 text-[14px] 2xl:px-80 md:px-24 lg:px-32 xl:px-60 font-light flex items-center flex-col gap-24"
    >
      <div className="w-full  gap-2 items-center flex">
        <Image src="/logo.png" alt="Junheng Zheng" width={36} height={36} />
        {/* <button className="flex  cursor-pointer group items-center gap-2">
          <p>More</p>
          <ArrowUpRight
            strokeWidth={1}
            className="group-hover:rotate-45 transition-transform duration-300"
          />
        </button> */}
      </div>
      {/* hero section */}
      <div className="flex flex-col  gap-8">
        <div>
          <motion.div
            id="about"
            className="flex w-full flex-col gap-4"
            viewport={{ amount: 0 }}
            onViewportEnter={() => setIsSelected(0)}
          >
            {/* <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="flex text-xs gap-2"
            >
              <button
                onClick={() => setAudience("anyone")}
                className={
                  audience === "anyone"
                    ? "font-normal"
                    : "opacity-80 cursor-pointer hover:opacity-100 transition-all hover:scale-102 duration-300"
                }
              >
                For Anyone
              </button>
              <span>/</span>
              <button
                onClick={() => setAudience("recruiters")}
                className={
                  audience === "recruiters"
                    ? "font-normal"
                    : "opacity-80 cursor-pointer hover:opacity-100 transition-all hover:scale-102 duration-300"
                }
              >
                Recruiters
              </button>
              <span>/</span>
              <button
                onClick={() => setAudience("designers")}
                className={
                  audience === "designers"
                    ? "font-normal"
                    : "opacity-80 cursor-pointer hover:opacity-100 transition-all hover:scale-102 duration-300"
                }
              >
                Designers
              </button>
              <span>/</span>
              <button
                onClick={() => setAudience("developers")}
                className={
                  audience === "developers"
                    ? "font-normal"
                    : "opacity-80 cursor-pointer hover:opacity-100 transition-all hover:scale-102 duration-300"
                }
              >
                Developers
              </button>
            </motion.div> */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: delay + 0.25 }}
              className="md:w-2/3 tracking-tight lg:w-1/2 text-xl w-full"
            >
             <span className = "instrument-serif font-normal text-2xl italic">UI/UX Designer</span>{" "}<span>testdddd</span>
             </motion.p>
            <div> 
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: delay + 0.5,
                }}
              >
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=jz7259@g.rit.edu"
                  className="w-full group flex justify-between py-4 border-b border-gray1"
                >
                  Gmail
                  <ArrowUpRight
                    strokeWidth={1}
                    className="group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300"
                  />
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: delay + 0.75,
                }}
              >
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="/Junheng_SWE_Resume.pdf"
                  className="w-full group flex justify-between py-4 border-b border-gray1"
                >
                  Resume
                  <ArrowUpRight
                    strokeWidth={1}
                    className="group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300"
                  />
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: delay + 1,
                }}
              >
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/in/junhengzheng"
                  className="w-full group flex justify-between py-4 border-b border-gray1"
                >
                  LinkedIn
                  <ArrowUpRight
                    strokeWidth={1}
                    className="group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300"
                  />
                </a>
              </motion.div>
            </div>
            {/* <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: duration, delay: delay, ease: "easeOut" }}
              className="flex gap-3"
            >
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=jz7259@g.rit.edu"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 hover:scale-[1.02] active:scale-[0.98] transition-transform ease-out duration-300 cursor-pointer px-4 flex justify-center text-white rounded-xl  bg-gradient-to-r from-blue-400 to-blue-600 items-center"
              >
                Let&apos;s Connect!
              </a>
              <a
                href="/Junheng_SWE_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 hover:scale-[1.02] active:scale-[0.98] transition-transform ease-out duration-300 cursor-pointer px-4 flex justify-center text-inverse rounded-xl  bg-gray1/50 backdrop-blur-lg items-center"
              >
                View Resume
              </a>
            </motion.div> */}
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: duration,
            delay: delay + 1.25,
          }}
          className="w-full relative overflow-hidden 2xl:h-[320px] h-[296px] rounded-xl  flex items-center justify-between"
        >
          {Array.from({ length: 256 }).map(
            (_, i) => (
              console.log(i),
              (<div key={i} className="w-px z-1 h-full bg-white/20"></div>)
            )
          )}
          <Image
            src="/testold.jpeg"
            alt="hero"
            fill
            className="object-cover absolute top-0 left-0 w-full h-full object-center"
          />
        </motion.div>
      </div>
      {/* works section */}
      <motion.div
        id="works"
        className="flex  w-full flex-col border-gray1/50 gap-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: duration, delay: delay, ease: "easeOut" }}
      >
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className=" text-2xl">Featured Works</h1>
            {/* <div className="flex text-xs gap-2">
              <button
                onClick={() => setAudience("anyone")}
                className={
                  audience === "anyone"
                    ? "font-normal"
                    : "opacity-80 cursor-pointer hover:opacity-100 transition-all hover:scale-102 duration-300"
                }
              >
                All Works
              </button>
              <span>/</span>
              <button
                onClick={() => setAudience("recruiters")}
                className={
                  audience === "recruiters"
                    ? "font-normal"
                    : "opacity-80 cursor-pointer hover:opacity-100 transition-all hover:scale-102 duration-300"
                }
              >
                Design
              </button>
              <span>/</span>
              <button
                onClick={() => setAudience("designers")}
                className={
                  audience === "designers"
                    ? "font-normal"
                    : "opacity-80 cursor-pointer hover:opacity-100 transition-all hover:scale-102 duration-300"
                }
              >
                Development
              </button>
            </div> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: delay + 1.25 }}
              className="w-full h-fit flex justify-center items-center"
            >
              <ProjectCard
                cover="/projectcards/prep.png"
                technologies={[
                  "Figma",
                  "React",
                  "Next.js",
                  "Node.js",
                  "Typescript",
                  "Vercel",
                ]}
                title="UXInterviewer"
                link="/projects/uxinterviewer"
                className="w-full "
              />
            </motion.div>

            <ProjectCard
              cover="/projectcards/mutualcover.png"
              technologies={[
                "Figma",
                "React",
                "Typescript",
                "SCSS",
                "Storybook",
              ]}
              title="Design Engineer @ Liberty Mutual "
              link="/projects/liberty"
            />

            <ProjectCard
              cover="/projectcards/balancecover.png"
              technologies={["Figma", "SwiftUI", "Kotlin"]}
              title="Balance"
              link="/projects/balance"
            />

            <ProjectCard
              cover="/projectcards/30min.png"
              technologies={["Figma"]}
              title="30 Minute Figma Studies"
              link="/projects/30min"
            />
          </div>
        </div>
      </motion.div>
      {/* philosophy section */}
      <motion.div
        id="philosophy"
        className="flex w-full flex-col gap-4"
        viewport={{ amount: 0 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: duration, delay: delay, ease: "easeOut" }}
        onViewportEnter={() => setIsSelected(1)}
        onViewportLeave={() => setIsSelected(0)}
      >
        <h2 className="text-2xl">Philosophy</h2>
        <p className="md:w-2/3 lg:w-1/2 w-full">
          Junheng believes in crafting experiences that feel intentional at
          every touchpoint. His approach blends thoughtful design with scalable
          code, with the main goal of turning complex into simple solutions.
        </p>
        <a
          href="/Junheng_SWE_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="py-3 w-fit hover:scale-[1.02] active:scale-[0.98] transition-transform ease-out duration-300 cursor-pointer px-4 flex justify-center text-inverse rounded-xl  bg-gray1/50 backdrop-blur-lg items-center"
        >
          View Resume
        </a>
      </motion.div>
      <motion.div
        viewport={{ amount: 0.5 }}
        onViewportEnter={() => setIsSelected(2)}
        onViewportLeave={() => setIsSelected(1)}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: duration, delay: delay, ease: "easeOut" }}
        className="w-full"
      >
        <Footer />
      </motion.div>
    </motion.div>
  );
}

// const ProjectCard = ({
//   background,
//   name,
//   icon,
//   link,
//   primaryColor,
//   secondaryColor,
// }) => {
//   return (
//     <Link
//       href={link}
//       target="_blank"
//       rel="noopener noreferrer"
//       className={` flex flex-col bg-cover bg-center rounded-xl p-3 w-full aspect-square gap-2 ${background}`}
//     >
//       <div
//         className="flex gap-2 p-2 rounded-xl w-full"
//         style={{ backgroundColor: secondaryColor }}
//       >
//         <div
//           className={`w-[42px] flex items-center justify-center h-[42px] rounded-lg bg-white`}
//           style={{ color: primaryColor }}
//         >
//           {icon}
//         </div>
//         <div
//           className="flex-1 rounded-lg flex items-center justify-start"
//           style={{ backgroundColor: primaryColor }}
//         >
//           <p className={`text-white px-3`}>{name}</p>
//         </div>
//       </div>
//     </Link>
//   );
// };
