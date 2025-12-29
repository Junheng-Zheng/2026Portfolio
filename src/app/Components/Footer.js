"use client";
import { motion } from "framer-motion";
import Animatedlink from "./Animatedlink";
const Footer = () => {
  return (
    <div className="flex flex-col gap-16 w-full">
      <div className="flex md:flex-row flex-col w-full gap-4">
        <div className="w-full flex justify-start">
          <div className="w-[42px] h-[42px] bg-linear-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-lg">
            J
          </div>
        </div>
        <div className="w-full flex md:justify-center justify-start">
          <h2 className="text-xl">Let&apos;s Connect!</h2>
        </div>
        <div className="w-full hidden md:flex md:justify-end justify-start">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=jz7259@g.rit.edu"
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 hover:scale-[1.02] active:scale-[0.98] transition-transform ease-out duration-300 cursor-pointer px-4 flex justify-center text-white rounded-xl  bg-linear-to-r from-orange-500 to-orange-600 items-center"
          >
            Let&apos;s Connect!
          </a>
        </div>
      </div>
      <div className="flex md:flex-row flex-col md:justify-between gap-16 md:items-end">
        <div className="flex  gap-12">
          <div className="flex flex-col gap-4">
            <Animatedlink href="#about">About</Animatedlink>
            <Animatedlink href="#works">Works</Animatedlink>
            <Animatedlink href="#philosophy">Philosophy</Animatedlink>
          </div>
          <div className="flex flex-col gap-4">
            <Animatedlink link="https://www.linkedin.com/in/junhengzheng/">
              LinkedIn
            </Animatedlink>
            <Animatedlink link="https://github.com/junheng-zheng">
              Github
            </Animatedlink>
            <Animatedlink link="https://mail.google.com/mail/?view=cm&fs=1&to=jz7259@g.rit.edu">
              Email
            </Animatedlink>
          </div>
        </div>
        <p className="text-sm text-inverse">
          © 2025 Junheng. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
