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
      className="max-w-[2000px] mx-auto scroll-smooth text-[14px]  font-light flex items-center flex-col "
    >
      {/* <navbar */}
      <div className="w-full px-24 fixed top-0 p-8  left-0 z-10 ">
        <div className="w-full flex bg-white/80 backdrop-blur-md border border-gray1/50 rounded-full items-center px-8 py-3 justify-between">
          <div className="flex items-center gap-4">
            <svg
              width="20"
              height="20"
              viewBox="0 0 193 193"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="64.0562"
                width="63.9714"
                height="63.9714"
                rx="31.9857"
                fill="#3b82f6"
              />
              <rect
                width="192"
                height="63.9428"
                transform="matrix(0.999999 0.00131454 -0.00131689 0.999999 0.0839844 63.9424)"
                fill="#3b82f6"
              />
              <path
                d="M96.042 128.138L131.042 192.08H61.042L96.042 128.138Z"
                fill="#3b82f6"
              />
            </svg>
            <p>Junheng Zheng</p>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray1/50 shadow-sm shadow-gray1/50">
              <User strokeWidth={1} size={16} />
              Home
            </div>
            <Briefcase strokeWidth={1} size={16} />
            <BookOpen strokeWidth={1} size={16} />
            <p className="shadow-sm shadow-gray1/50 border flex gap-2 items-center cursor-pointer bg-black text-white border-gray1/50 rounded-full px-4 py-2">
              <Mail strokeWidth={1} size={16} />
              Contact
            </p>
          </div>
        </div>
      </div>
      {/* hero section */}
      <div className=" px-48 flex gap-12 items-center justify-center">
        <motion.div
          id="about"
          className="flex w-full flex-col justify-center gap-4"
          viewport={{ amount: 0 }}
          onViewportEnter={() => setIsSelected(0)}
        >
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration, delay: delay, ease: "easeOut" }}
            className="flex items-center gap-2 py-2 px-4 rounded-full border-gray1/50 border w-fit"
          >
            <div className="w-2 h-2  bg-lime-500 rounded-full"></div>
            <p className="text-xs opacity-80">Available for Work</p>
          </motion.div> */}
          <p className=" ">
            <span className="font-normal">For Anyone</span>
            <span className=" opacity-50">
              {" "}
              / Recruiters / Designers / Developers
            </span>
          </p>
          {/* <h1 className="hidden lg:block text-2xl">
            <AnimateWord word="When Product Design Meets Development" />
          </h1>
          <h1 className="block lg:hidden text-2xl">
            <AnimateWord word="Design Engineer from NYC" />
          </h1> */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration, delay: delay, ease: "easeOut" }}
            className="  w-full text-xl"
          >
            Junheng Zheng combines design and development to create seamless
            digital experiences. Prev. Design Engineer Intern @ Liberty Mutual
            Insurance working on their internal design system, Enterprise UI.
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
              className="py-3 hover:scale-[1.02] active:scale-[0.98] transition-transform ease-out duration-300 cursor-pointer px-6 flex justify-center text-white rounded-full  bg-gradient-to-r from-blue-400 to-blue-600 items-center"
            >
              Let&apos;s Connect!
            </a>
            <a
              href="/Junheng_SWE_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 hover:scale-[1.02] active:scale-[0.98] transition-transform ease-out duration-300 cursor-pointer px-6 flex justify-center text-inverse rounded-full  bg-gray1/50 backdrop-blur-lg items-center"
            >
              View Resume
            </a>
          </motion.div>
        </motion.div>
        <div className="w-full h-dvh relative flex justify-between ">
          {/* {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="w-px h-full bg-blue-500/50"></div>
          ))} */}
          {Array.from({ length: 64 }).map(
            (_, i) => (
              console.log(i),
              (
                <div
                  key={i}
                  className="w-px  bg-gradient-to-b h-full from-blue-500 via-blue-600  to-blue-500"
                  style={{ opacity: i / 30 }}
                ></div>
              )
            )
          )}

          <svg
            width="400"
            height="400"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            viewBox="0 0 257 257"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="96.042"
              y="31.8721"
              width="64"
              height="64"
              rx="32"
              fill="white"
            />
            <rect
              width="256"
              height="64"
              transform="translate(0.0839844 95.8721) rotate(0.0753848)"
              fill="white"
            />
            <path
              d="M128.042 160.208L163.042 224.208H93.042L128.042 160.208Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
      {/* works section */}
      <motion.div
        id="works"
        className="flex px-48 py-24  w-full flex-col border-t border-b  border-gray1/50 gap-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: duration, delay: delay, ease: "easeOut" }}
      >
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className=" text-2xl">Featured Works</h1>
            <p>Recent experiences and projects by Junheng.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="w-full active:scale-98  cursor-pointer border border-gray1/50 relative hover:scale-101 transition-transform duration-300 h-[320px]  rounded-xl">
              <Image
                src="/projectcards/prep.png"
                alt="UXInterviewer"
                fill
                className="object-cover rounded-xl object-top"
              />
            </div>
            <div className="w-full  active:scale-98  cursor-pointer border border-gray1/50 relative hover:scale-101 transition-transform duration-300 h-[320px]  rounded-xl">
              <Image
                src="/projectcards/LibertyMutual.png"
                alt="LibertyMutual"
                fill
                className="object-cover rounded-xl object-top"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl">Other Works</h2>
          <div className="flex flex-col">
            <Link
              href="/projects/ddmotor"
              className="w-full group flex justify-between py-4 border-b border-gray1"
            >
              30 Minute Studies
              <ArrowUpRight
                strokeWidth={1}
                className="group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300"
              />
            </Link>
            <Link
              href="/projects/ddmotor"
              className="w-full group flex justify-between py-4 border-b border-gray1"
            >
              UX Designer @ Tiger Snack Box
              <ArrowUpRight
                strokeWidth={1}
                className="group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300"
              />
            </Link>
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
          </div>
        </div>
      </motion.div>
      {/* philosophy section */}
      <div className="flex h-fit px-48   gap-24">
        <motion.div
          id="philosophy"
          className="flex w-full  py-32  flex-col gap-4"
          viewport={{ amount: 0 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration, delay: delay, ease: "easeOut" }}
          onViewportEnter={() => setIsSelected(1)}
          onViewportLeave={() => setIsSelected(0)}
        >
          <h2 className="text-2xl">Philosophy</h2>
          <p className=" w-full">
            Junheng believes in crafting experiences that feel intentional at
            every touchpoint. His approach blends thoughtful design with
            scalable code, with the main goal of turning complex into simple
            solutions.
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
        <div className="w-full grow relative flex justify-between ">
          {Array.from({ length: 64 }).map(
            (_, i) => (
              console.log(i),
              (
                <div
                  key={i}
                  className="w-px  bg-gradient-to-b from-blue-500 to-white"
                  style={{ opacity: i / 64, height: `${(i * 100) / 64}%` }}
                ></div>
              )
            )
          )}
        </div>
      </div>
      <motion.div
        viewport={{ amount: 0.5 }}
        onViewportEnter={() => setIsSelected(2)}
        onViewportLeave={() => setIsSelected(1)}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: duration, delay: delay, ease: "easeOut" }}
        className="w-full px-48 py-24 border-t border-gray1/50"
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
