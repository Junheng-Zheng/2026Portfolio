"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Briefcase, User, BookOpen, Mail } from "lucide-react";
import Footer from "./Components/Footer";

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

export default function Home() {
  const [isSelected, setIsSelected] = useState(0);
  //     background: "bg-[url('/projectcards/Liberty.png')]",
  //     name: "Experience/LibertyMutual",
  //     icon: (
  //       <svg
  //         width="24"
  //         height="24"
  //         viewBox="0 0 24 24"
  //         fill="none"
  //         xmlns="http://www.w3.org/2000/svg"
  //       >
  //         <path
  //           d="M16 20V4C16 3.46957 15.7893 2.96086 15.4142 2.58579C15.0391 2.21071 14.5304 2 14 2H10C9.46957 2 8.96086 2.21071 8.58579 2.58579C8.21071 2.96086 8 3.46957 8 4V20M4 6H20C21.1046 6 22 6.89543 22 8V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V8C2 6.89543 2.89543 6 4 6Z"
  //           stroke="#FFCF20"
  //           stroke-linecap="round"
  //           stroke-linejoin="round"
  //         />
  //       </svg>
  //     ),
  //     link: "https://www.libertymutual.com",
  //     primaryColor: "#FFCF20",
  //     secondaryColor: "#FFE06D",
  //   },
  //   {
  //     background: "bg-[url('/projectcards/Liberty.png')]",
  //     name: "Experience/LibertyMutual",
  //     icon: (
  //       <svg
  //         width="24"
  //         height="24"
  //         viewBox="0 0 24 24"
  //         fill="none"
  //         xmlns="http://www.w3.org/2000/svg"
  //       >
  //         <path
  //           d="M16 20V4C16 3.46957 15.7893 2.96086 15.4142 2.58579C15.0391 2.21071 14.5304 2 14 2H10C9.46957 2 8.96086 2.21071 8.58579 2.58579C8.21071 2.96086 8 3.46957 8 4V20M4 6H20C21.1046 6 22 6.89543 22 8V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V8C2 6.89543 2.89543 6 4 6Z"
  //           stroke="#FFCF20"
  //           stroke-linecap="round"
  //           stroke-linejoin="round"
  //         />
  //       </svg>
  //     ),
  //     link: "https://www.libertymutual.com",
  //     primaryColor: "#FFCF20",
  //     secondaryColor: "#FFE06D",
  //   },
  //   {
  //     background: "bg-[url('/projectcards/Liberty.png')]",
  //     name: "Experience/LibertyMutual",
  //     icon: (
  //       <svg
  //         width="24"
  //         height="24"
  //         viewBox="0 0 24 24"
  //         fill="none"
  //         xmlns="http://www.w3.org/2000/svg"
  //       >
  //         <path
  //           d="M16 20V4C16 3.46957 15.7893 2.96086 15.4142 2.58579C15.0391 2.21071 14.5304 2 14 2H10C9.46957 2 8.96086 2.21071 8.58579 2.58579C8.21071 2.96086 8 3.46957 8 4V20M4 6H20C21.1046 6 22 6.89543 22 8V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V8C2 6.89543 2.89543 6 4 6Z"
  //           stroke="#FFCF20"
  //           stroke-linecap="round"
  //           stroke-linejoin="round"
  //         />
  //       </svg>
  //     ),
  //     link: "https://www.libertymutual.com",
  //     primaryColor: "#FFCF20",
  //     secondaryColor: "#FFE06D",
  //   },
  // ];
  const delay = 1.8;
  const duration = 1;
  return (
    <motion.div
      initial={{ height: "100dvh", overflow: "hidden" }}
      animate={{ height: "auto", overflow: "visible" }}
      transition={{ duration: duration, delay: delay, ease: "easeOut" }}
      className="max-w-[2000px] mx-auto  md:py-12 scroll-smooth p-8 text-[14px] md:px-24 lg:px-32 xl:px-60 font-light flex items-center flex-col gap-24"
    >
      {/* <navbar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: duration, delay: delay, ease: "easeOut" }}
        className="sticky top-12 flex gap-2  bg-gray1/50  backdrop-blur-sm  z-10 rounded-xl p-2 w-fit"
      >
        {/* About */}
        <a
          href="#about"
          onClick={() => setIsSelected(0)}
          className={`px-4 py-3 w-auto flex items-center gap-2 cursor-pointer rounded-xl
      transition-[width,transform,background-color] duration-300 ease-out
      hover:scale-[1.03]
      ${isSelected === 0 ? "bg-gray2 text-inverse" : "opacity-50"}
    `}
        >
          <User
            strokeWidth={1}
            size={20}
            className={`transition-transform duration-300 ${
              isSelected === 0 ? "scale-110" : "scale-100"
            }`}
          />
          <span
            className={`whitespace-nowrap transition-all duration-300
        ${
          isSelected === 0
            ? "max-w-[200px] opacity-100 translate-x-0"
            : "max-w-0 opacity-0 -translate-x-1"
        }
      `}
          >
            About
          </span>
        </a>

        {/* Works */}
        <a
          href="#works"
          onClick={() => setIsSelected(1)}
          className={`px-4 py-3 w-auto flex items-center gap-2 cursor-pointer rounded-xl
      transition-[width,transform,background-color] duration-300 ease-out
      hover:scale-[1.03]
      ${isSelected === 1 ? "bg-gray2 text-inverse" : "opacity-50"}
    `}
        >
          <Briefcase
            strokeWidth={1}
            size={20}
            className={`transition-transform duration-300 ${
              isSelected === 1 ? "scale-110" : "scale-100"
            }`}
          />
          <span
            className={`whitespace-nowrap transition-all duration-300
        ${
          isSelected === 1
            ? "max-w-[200px] opacity-100 translate-x-0"
            : "max-w-0 opacity-0 -translate-x-1"
        }
      `}
          >
            Works
          </span>
        </a>

        {/* Philosophy */}
        <a
          href="#philosophy"
          onClick={() => setIsSelected(2)}
          className={`px-4 py-3 w-auto flex items-center gap-2 cursor-pointer rounded-xl
      transition-[width,transform,background-color] duration-300 ease-out
      hover:scale-[1.03]
      ${isSelected === 2 ? "bg-gray2 text-inverse" : "opacity-50"}
    `}
        >
          <BookOpen
            strokeWidth={1}
            size={20}
            className={`transition-transform duration-300 ${
              isSelected === 2 ? "scale-110" : "scale-100"
            }`}
          />
          <span
            className={`whitespace-nowrap transition-all duration-300
        ${
          isSelected === 2
            ? "max-w-[200px] opacity-100 translate-x-0"
            : "max-w-0 opacity-0 -translate-x-1"
        }
      `}
          >
            Philosophy
          </span>
        </a>

        {/* Contact */}
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=jz7259@g.rit.edu"
          target="_blank"
          rel="noopener noreferrer"
          className="py-3 cursor-pointer px-4 flex justify-center rounded-xl bg-linear-to-r from-orange-500 to-orange-600 items-center hover:scale-[1.03] transition-transform ease-out duration-300"
        >
          <Mail strokeWidth={1} size={20} color="white" />
        </a>
      </motion.div>
      {/* hero section */}
      <div>
        <motion.div
          id="about"
          className="flex w-full flex-col gap-4"
          viewport={{ amount: 0 }}
          onViewportEnter={() => setIsSelected(0)}
        >
          <h1 className="hidden lg:block text-2xl">
            <AnimateWord word="Junheng is a Design Engineer from NYC" />
          </h1>
          <h1 className="block lg:hidden text-2xl">
            <AnimateWord word="Design Engineer based in NYC" />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration, delay: delay, ease: "easeOut" }}
            className="md:w-2/3 lg:w-1/2 w-full"
          >
            Product Designer and UX Developer based in NYC. Junheng combines
            design and development to create seamless digital experiences. Prev.
            Design Engineer Intern @ Liberty Mutual Insurance working on their
            internal design system, Enterprise UI.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration, delay: delay, ease: "easeOut" }}
            className="flex gap-3"
          >
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=jz7259@g.rit.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 hover:scale-[1.02] active:scale-[0.98] transition-transform ease-out duration-300 cursor-pointer px-4 flex justify-center text-white rounded-xl  bg-gradient-to-r from-orange-500 to-orange-600 items-center"
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
          </motion.div>
        </motion.div>
      </div>
      {/* works section */}
      <motion.div
        id="works"
        className="flex w-full flex-col gap-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: duration, delay: delay, ease: "easeOut" }}
      >
        <h2 className="text-xl">Work</h2>
        <Link
          href="/projects/uxinterviewer"
          className="w-full group flex justify-between py-4 border-b border-gray1"
        >
          Co-founder @ UXInterviewer
          <ArrowUpRight
            strokeWidth={1}
            className="group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300"
          />
        </Link>
        <Link
          href="/projects/liberty"
          className="w-full group flex justify-between py-4 border-b border-gray1"
        >
          Design Engineer @ Liberty Mutual
          <ArrowUpRight
            strokeWidth={1}
            className="group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300"
          />
        </Link>

        {/* <Link
          href="/projects/tigersnackbox"
          className="w-full group flex justify-between py-4 border-b border-gray1"
        >
          UX Design @ Tiger Snack Box
          <ArrowUpRight
            strokeWidth={1}
            className="group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300"
          />
        </Link> */}
        <Link
          href="/projects/ddmotor"
          className="w-full group flex justify-between py-4 border-b border-gray1"
        >
          Frontend Dev @ D&D Motor Systems
          <ArrowUpRight
            strokeWidth={1}
            className="group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300"
          />
        </Link>
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
        <h2 className="text-xl">Philosophy</h2>
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
