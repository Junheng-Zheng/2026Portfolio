"use client";
import Animatedlink from "./Animatedlink";
const Footer = () => {
  return (
    <div className="flex flex-col gap-16 pb-8 w-full">
      <div className="flex md:flex-row flex-col w-full gap-4">
        {/* <div className="w-full flex justify-start">
          <Image src="/logo.png" alt="Junheng Zheng" width={42} height={42} />
        </div> */}
        {/* <div className="w-full flex md:justify-center justify-start">
          <h2 className="text-xl">Junheng Zheng</h2>
        </div> */}
        {/* <div className="w-full hidden md:flex md:justify-end justify-start">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=jz7259@g.rit.edu"
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 hover:scale-[1.02] active:scale-[0.98] transition-transform ease-out duration-300 cursor-pointer px-6 flex justify-center text-white rounded-full  bg-linear-to-r   from-blue-400 to-blue-600 items-center"
          >
            Let&apos;s Connect!
          </a>
        </div> */}
      </div>
      <div className="flex md:flex-row flex-col md:justify-between gap-16 md:items-end">
        <div className="flex  gap-12">
          <div className="flex flex-col gap-4">
            <Animatedlink link="/manifesto">Manifesto</Animatedlink>
            <Animatedlink link="/#works-grid">Works</Animatedlink>
            <Animatedlink link="/Junheng_SWE_Resume.pdf">Resume</Animatedlink>
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
        <p className=" text-inverse">
          © 2026 Junheng Zheng. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
