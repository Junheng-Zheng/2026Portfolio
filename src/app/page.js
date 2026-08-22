"use client";

import Image from "next/image";
import { ArrowUpRight, ChevronDown, CornerRightDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import DecryptedText from "./Components/DecryptedText";
import {
  SHOW_WORDMARK,
  SHOW_ALTERNATE_WORDMARK,
  SHOW_TESLA,
} from "./siteFlags";

const LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/junhengzheng/",
    external: true,
  },
  {
    label: "Resume",
    href: "/Junhengswedesignresume.pdf",
    external: true,
  },
  {
    label: "Github",
    href: "https://github.com/junheng-zheng",
    external: true,
  },
];

const COMPANY_LINKS = {
  tesla: "https://www.tesla.com",
  ibm: "https://research.ibm.com",
  liberty: "https://www.libertymutual.com",
};

function CompanyLink({ href, children }) {
  const isExternal = /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="indent-0 text-blue-600 transition-colors duration-150 ease-in-out hover:text-blue-700"
    >
      {children}
    </a>
  );
}

const AUDIENCE_TABS = [
  [
    "Everyone",
    {
      summary: [
        {
          text: SHOW_TESLA
            ? "Junheng (Jun) is a designer and developer based in NYC. Incoming Frontend Engineer Intern @ "
            : "Junheng (Jun) is a designer and developer based in NYC. Previously, Jun has interned as a Design Engineer @ ",
        },
        ...(SHOW_TESLA
          ? [
              { text: "Tesla", href: COMPANY_LINKS.tesla },
              {
                text: " this fall. Previously, Jun has interned as a Design Engineer @ ",
              },
            ]
          : []),
        { text: "IBM Research", href: COMPANY_LINKS.ibm },
        { text: " and " },
        { text: "Liberty Mutual Insurance", href: COMPANY_LINKS.liberty },
        {
          text: ", working across internal tools and design systems.",
        },
      ],
      detail:
        "Jun leverages tools across disciplines to create experiences that are beautiful, seamless, and impactful. Converting complex issues into elegant solutions, and experiences that offer real metrics and a measurement of success.",
    },
  ],
  [
    "Recruiters",
    {
      summary: [
        {
          text: "Junheng Zheng (Jun) is currently a fourth-year Web & Mobile Computing student at ",
        },
        {
          text: "RIT",
          href: "https://www.rit.edu",
        },
        {
          text: " with previous experience in software development and user experience design. ",
        },
        ...(SHOW_TESLA
          ? [
              { text: "Jun is incoming Frontend Engineer Intern @ " },
              { text: "Tesla", href: COMPANY_LINKS.tesla },
              {
                text: " this fall, working across design and development on internal design systems and legacy application redesigns on the Demand Planning Team. Previously, Jun has interned @ ",
              },
            ]
          : [{ text: "Previously, Jun has interned @ " }]),
        { text: "IBM Research", href: COMPANY_LINKS.ibm },
        { text: " and " },
        { text: "Liberty Mutual Insurance", href: COMPANY_LINKS.liberty },
        {
          text: ", where he worked on design and developmental work across design systems, internal tooling, and more.",
        },
      ],
      detail:
        "Jun primarily designs with Figma. Jun develops in React, JavaScript, TypeScript, and SCSS, creating data-driven workflows with experience across frontend systems, backend services, APIs, and databases. Beyond individual tools and technologies, Jun believes his strength lies in understanding the fundamental problems users face and translating them into thoughtful, practical solutions.",
    },
  ],
  [
    "Designers",
    {
      summary:
        "Junheng Zheng (Jun) is a designer who believes great design comes from understanding what matters. Knowing what to build, what to remove, what to simplify, and when to approach a problem from a different angle.",
      detail:
        "Jun has moved from research and exploration into high-fidelity prototypes, interaction details, and reusable patterns across design systems, internal tooling, and more. Because he also builds in code, design intent holds through production.",
    },
  ],
  [
    "Developers",
    {
      summary:
        "Junheng Zheng (Jun) is a developer who believes strong engineering starts with understanding the problem underneath the interface. Knowing what to build, what to leave out, and how to carry clear intent into systems that hold up in production.",
      detail:
        "Jun develops in React, JavaScript, TypeScript, and SCSS, with experience across frontend systems, APIs, and backend services. He cares about accessible, maintainable interfaces and closing the gap between what is designed and what actually ships.",
    },
  ],
];

const EXPERIENCE_TABS_ALL = [
  [
    "Tesla",
    {
      summary: [
        {
          text: "Jun is an incoming Design Engineer intern working on internal design systems and application modernization at ",
        },
        { text: "Tesla", href: COMPANY_LINKS.tesla },
        { text: "." },
      ],
      detail:
        "Jun will focus on connecting design and engineering: improving reusable interface foundations, modernizing internal applications, and helping teams ship clear, consistent tools at scale.",
    },
  ],
  [
    "IBM Research",
    {
      summary: [
        {
          text: "Jun was a Design Engineer intern on the internal Apps@Research team, redesigning and migrating a data-acquisition application used by researchers at ",
        },
        { text: "IBM Research", href: COMPANY_LINKS.ibm },
        { text: "." },
      ],
      detail:
        "Jun owned work across Figma, React and Vite implementation, state and API integration, and deployment through OpenShift Kubernetes, Podman, Helm, and Nginx—improving workflows shared by researchers and administrators.",
    },
  ],
  [
    "Liberty Mutual",
    {
      summary: [
        { text: "Jun was a Design Engineer intern on " },
        { text: "Liberty Mutual Insurance", href: COMPANY_LINKS.liberty },
        {
          text: "'s Enterprise UI team, creating scalable React components used across product teams.",
        },
      ],
      detail:
        "Jun designed component behavior and interaction states in Figma, implemented reusable React and TypeScript patterns, and documented the resulting components in Storybook.",
    },
  ],
  [
    "More Works",
    {
      summary: [
        {
          text: "Jun participates in designathons and hackathons—building quick, high-ambition products under tight constraints. Recent work includes ",
        },
        {
          text: "Proprio",
          href: "https://devpost.com/software/proprio",
        },
        {
          text: " for Figbuild, and ",
        },
        {
          text: "Lifestory",
          href: "https://devpost.com/software/lifestory",
        },
        {
          text: " at Uncommon Hacks.",
        },
      ],
      detail: [
        {
          text: "At Uncommon Hacks, Jun won the Social Impact track with ",
        },
        {
          text: "Lifestory",
          href: "https://devpost.com/software/lifestory",
        },
        {
          text: ". He also recently built a ",
        },
        {
          text: "Pomodoro timer",
          href: "/blog/3d-pomodoro-timer",
        },
        {
          text: " as a UI development exercise in Figma, React, and Framer Motion.",
        },
      ],
    },
  ],
];

const EXPERIENCE_TABS = SHOW_TESLA
  ? EXPERIENCE_TABS_ALL
  : EXPERIENCE_TABS_ALL.filter(([tab]) => tab !== "Tesla");

const MORE_ITEMS = [{ label: "Moodboard", href: "/stuff" }];

const SQUARE_DURATION = 0.14;

const PAGE_ENTRANCE = {
  initial: { opacity: 0, y: 12, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

function Wordmark() {
  return (
    <svg
      className="block h-auto w-full shrink-0"
      width="106"
      height="9"
      viewBox="0 0 106 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d="M3.78008 7.98002V8.40002H0.840078V7.98002H0.420078V7.56002H7.81268e-05V6.30002H0.840078V7.56002H1.26008V7.98002H2.94008V7.56002H3.36008V7.14002H3.78008V0.840024H3.36008V0.420024H2.52008V2.38419e-05H6.30008V0.420024H5.04008V6.72002H4.62008V7.56002H4.20008V7.98002H3.78008ZM12.5949 7.98002V8.40002H9.23492V7.98002H8.39492V7.56002H7.97492V6.30002H7.55492V0.420024H6.71492V2.38419e-05H10.0749V0.420024H9.23492V0.840024H8.81492V6.30002H9.23492V7.14002H9.65492V7.56002H10.9149V7.98002H11.7549V7.56002H12.5949V7.14002H13.0149V6.30002H13.4349V0.840024H13.0149V0.420024H12.1749V2.38419e-05H15.1149V0.420024H14.2749V5.88002H13.8549V7.14002H13.4349V7.56002H13.0149V7.98002H12.5949ZM18.8893 7.98002V8.40002H15.9493V7.98002H16.7893V0.420024H16.3693V2.38419e-05H18.0493V0.420024H18.4693V0.840024H18.8893V1.26002H19.3093V1.68002H19.7293V2.52002H20.1493V2.94002H20.5693V3.36002H20.9893V3.78002H21.4093V4.20002H21.8293V4.62002H22.2493V5.46002H22.6693V0.420024H21.8293V2.38419e-05H24.3493V0.420024H23.5093V8.40002H23.0893V7.98002H22.6693V7.56002H22.2493V6.72002H21.8293V6.30002H21.4093V5.88002H20.9893V5.46002H20.5693V5.04002H20.1493V4.20002H19.7293V3.78002H19.3093V3.36002H18.8893V2.94002H18.4693V2.52002H18.0493V1.68002H17.6293V7.56002H18.0493V7.98002H18.8893ZM26.8637 4.20002V4.62002H27.2837V7.56002H27.7037V7.98002H28.5437V8.40002H25.1837V7.98002H26.0237V0.420024H25.1837V2.38419e-05H28.5437V0.420024H27.7037V0.840024H27.2837V3.78002H31.4837V0.840024H31.0637V0.420024H30.2237V2.38419e-05H33.5837V0.420024H32.7437V7.98002H33.5837V8.40002H30.2237V7.98002H31.0637V7.56002H31.4837V4.62002H31.9037V4.20002H26.8637ZM36.518 7.56002H36.098V7.98002H39.458V7.56002H40.298V6.72002H40.718V5.88002H41.138V5.46002H41.558V6.30002H41.138V8.40002H34.418V7.98002H35.258V0.420024H34.418V2.38419e-05H41.138V2.94002H40.718V1.68002H40.298V0.840024H39.458V0.420024H36.098V0.840024H36.518V3.78002H38.618V3.36002H39.038V2.52002H39.458V5.88002H39.038V5.04002H38.618V4.62002H38.198V4.20002H36.518V7.56002ZM45.3385 7.98002V8.40002H42.3985V7.98002H43.2385V0.420024H42.8185V2.38419e-05H44.4985V0.420024H44.9185V0.840024H45.3385V1.26002H45.7585V1.68002H46.1785V2.52002H46.5985V2.94002H47.0185V3.36002H47.4385V3.78002H47.8585V4.20002H48.2785V4.62002H48.6985V5.46002H49.1185V0.420024H48.2785V2.38419e-05H50.7985V0.420024H49.9585V8.40002H49.5385V7.98002H49.1185V7.56002H48.6985V6.72002H48.2785V6.30002H47.8585V5.88002H47.4385V5.46002H47.0185V5.04002H46.5985V4.20002H46.1785V3.78002H45.7585V3.36002H45.3385V2.94002H44.9185V2.52002H44.4985V1.68002H44.0785V7.56002H44.4985V7.98002H45.3385ZM57.5129 7.98002V8.40002H54.1529V7.98002H53.3129V7.56002H52.8929V7.14002H52.4729V6.72002H52.0529V5.46002H51.6329V2.94002H52.0529V2.10002H52.4729V1.26002H52.8929V0.840024H53.3129V0.420024H54.1529V2.38419e-05H57.0929V0.420024H57.9329V0.840024H58.3529V2.38419e-05H58.7729V2.94002H58.3529V1.68002H57.9329V1.26002H57.5129V0.840024H56.6729V0.420024H54.9929V0.840024H54.1529V1.26002H53.7329V2.10002H53.3129V3.78002H52.8929V4.20002H53.3129V6.30002H53.7329V6.72002H54.1529V7.14002H54.5729V7.56002H55.4129V7.98002H56.6729V7.56002H57.9329V7.14002H58.3529V6.72002H57.9329V5.04002H57.5129V4.62002H56.6729V4.20002H60.0329V4.62002H59.1929V8.40002H58.7729V7.98002H57.5129ZM70.1087 6.30002V8.40002H63.8087V7.56002H64.2287V6.72002H64.6487V6.30002H65.0687V5.46002H65.4887V5.04002H65.9087V4.20002H66.3287V3.36002H66.7487V2.94002H67.1687V2.10002H67.5887V1.68002H68.0087V0.840024H68.8487V0.420024H65.4887V0.840024H65.0687V1.26002H64.6487V2.10002H64.2287V2.94002H63.8087V2.38419e-05H70.1087V0.420024H69.6887V0.840024H69.2687V1.68002H68.8487V2.10002H68.4287V2.94002H68.0087V3.78002H67.5887V4.20002H67.1687V5.04002H66.7487V5.46002H66.3287V6.30002H65.9087V7.14002H65.4887V7.56002H64.6487V7.98002H68.4287V7.56002H69.2687V7.14002H69.6887V5.88002H70.1087V5.46002H70.5287V6.30002H70.1087ZM72.6254 4.20002V4.62002H73.0454V7.56002H73.4654V7.98002H74.3054V8.40002H70.9454V7.98002H71.7854V0.420024H70.9454V2.38419e-05H74.3054V0.420024H73.4654V0.840024H73.0454V3.78002H77.2454V0.840024H76.8254V0.420024H75.9854V2.38419e-05H79.3454V0.420024H78.5054V7.98002H79.3454V8.40002H75.9854V7.98002H76.8254V7.56002H77.2454V4.62002H77.6654V4.20002H72.6254ZM82.2798 7.56002H81.8598V7.98002H85.2198V7.56002H86.0598V6.72002H86.4798V5.88002H86.8998V5.46002H87.3198V6.30002H86.8998V8.40002H80.1798V7.98002H81.0198V0.420024H80.1798V2.38419e-05H86.8998V2.94002H86.4798V1.68002H86.0598V0.840024H85.2198V0.420024H81.8598V0.840024H82.2798V3.78002H84.3798V3.36002H84.7998V2.52002H85.2198V5.88002H84.7998V5.04002H84.3798V4.62002H83.9598V4.20002H82.2798V7.56002ZM91.1002 7.98002V8.40002H88.1602V7.98002H89.0002V0.420024H88.5802V2.38419e-05H90.2602V0.420024H90.6802V0.840024H91.1002V1.26002H91.5202V1.68002H91.9402V2.52002H92.3602V2.94002H92.7802V3.36002H93.2002V3.78002H93.6202V4.20002H94.0402V4.62002H94.4602V5.46002H94.8802V0.420024H94.0402V2.38419e-05H96.5602V0.420024H95.7202V8.40002H95.3002V7.98002H94.8802V7.56002H94.4602V6.72002H94.0402V6.30002H93.6202V5.88002H93.2002V5.46002H92.7802V5.04002H92.3602V4.20002H91.9402V3.78002H91.5202V3.36002H91.1002V2.94002H90.6802V2.52002H90.2602V1.68002H89.8402V7.56002H90.2602V7.98002H91.1002ZM103.275 7.98002V8.40002H99.9146V7.98002H99.0746V7.56002H98.6546V7.14002H98.2346V6.72002H97.8146V5.46002H97.3946V2.94002H97.8146V2.10002H98.2346V1.26002H98.6546V0.840024H99.0746V0.420024H99.9146V2.38419e-05H102.855V0.420024H103.695V0.840024H104.115V2.38419e-05H104.535V2.94002H104.115V1.68002H103.695V1.26002H103.275V0.840024H102.435V0.420024H100.755V0.840024H99.9146V1.26002H99.4946V2.10002H99.0746V3.78002H98.6546V4.20002H99.0746V6.30002H99.4946V6.72002H99.9146V7.14002H100.335V7.56002H101.175V7.98002H102.435V7.56002H103.695V7.14002H104.115V6.72002H103.695V5.04002H103.275V4.62002H102.435V4.20002H105.795V4.62002H104.955V8.40002H104.535V7.98002H103.275Z"
        fill="#3f3f3f"
      />
    </svg>
  );
}

function AlternateWordmark() {
  return (
    <svg
      className="block h-auto w-full shrink-0"
      width="180"
      height="18"
      viewBox="0 0 180 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d="M5.328 17.472C3.68 17.472 2.376 17.008 1.416 16.08C0.472 15.152 0 13.824 0 12.096V10.8H1.992V12.096C1.992 13.136 2.264 13.984 2.808 14.64C3.368 15.296 4.2 15.624 5.304 15.624C6.424 15.624 7.216 15.304 7.68 14.664C8.144 14.008 8.376 13.152 8.376 12.096V2.16H5.424V0.336H12.216V2.16H10.392V12.096C10.392 13.84 9.96 15.176 9.096 16.104C8.232 17.016 6.976 17.472 5.328 17.472Z"
        fill="#3f3f3f"
      />
      <path
        d="M20.778 17.472C19.53 17.472 18.442 17.248 17.514 16.8C16.586 16.352 15.866 15.688 15.354 14.808C14.842 13.912 14.586 12.816 14.586 11.52V0.336H16.578V11.544C16.578 12.92 16.946 13.952 17.682 14.64C18.418 15.328 19.45 15.672 20.778 15.672C22.106 15.672 23.138 15.328 23.874 14.64C24.61 13.952 24.978 12.92 24.978 11.544V0.336H26.994V11.52C26.994 12.816 26.738 13.912 26.226 14.808C25.714 15.688 24.986 16.352 24.042 16.8C23.114 17.248 22.026 17.472 20.778 17.472Z"
        fill="#3f3f3f"
      />
      <path
        d="M30.2104 17.136V0.336H34.1224L39.9784 15.864H40.2904V0.336H42.2824V17.136H38.3704L32.5384 1.584H32.2024V17.136H30.2104Z"
        fill="#3f3f3f"
      />
      <path
        d="M45.6679 17.136V0.336H47.6839V7.8H55.5559V0.336H57.5719V17.136H55.5559V9.624H47.6839V17.136H45.6679Z"
        fill="#3f3f3f"
      />
      <path
        d="M60.9379 17.136V0.336H71.2819V2.16H62.9539V7.776H70.6099V9.6H62.9539V15.312H71.4019V17.136H60.9379Z"
        fill="#3f3f3f"
      />
      <path
        d="M73.9813 17.136V0.336H77.8933L83.7493 15.864H84.0613V0.336H86.0533V17.136H82.1413L76.3093 1.584H75.9733V17.136H73.9813Z"
        fill="#3f3f3f"
      />
      <path
        d="M95.2948 17.472C94.0468 17.472 92.9428 17.216 91.9828 16.704C91.0388 16.176 90.2948 15.408 89.7508 14.4C89.2228 13.392 88.9588 12.144 88.9588 10.656V6.816C88.9588 4.592 89.5508 2.904 90.7348 1.752C91.9188 0.584 93.5108 0 95.5108 0C97.4948 0 99.0068 0.544 100.047 1.632C101.087 2.72 101.607 4.176 101.607 6V6.12H99.6148V5.952C99.6148 5.152 99.4708 4.44 99.1828 3.816C98.8948 3.192 98.4468 2.704 97.8388 2.352C97.2308 1.984 96.4548 1.8 95.5108 1.8C94.0868 1.8 92.9748 2.24 92.1748 3.12C91.3748 3.984 90.9748 5.2 90.9748 6.768V10.704C90.9748 12.272 91.3748 13.496 92.1748 14.376C92.9748 15.24 94.0948 15.672 95.5348 15.672C96.9428 15.672 97.9748 15.272 98.6308 14.472C99.3028 13.672 99.6388 12.608 99.6388 11.28V10.872H94.5508V9.144H101.607V17.136H99.7828V15.312H99.4468C99.2708 15.664 99.0228 16.008 98.7028 16.344C98.3828 16.68 97.9508 16.952 97.4068 17.16C96.8628 17.368 96.1588 17.472 95.2948 17.472Z"
        fill="#3f3f3f"
      />
      <path
        d="M109.767 17.136V14.472L119.127 2.424V2.136H110.055V0.336H121.119V3L111.759 15.048V15.336H121.311V17.136H109.767Z"
        fill="#3f3f3f"
      />
      <path
        d="M123.858 17.136V0.336H125.874V7.8H133.746V0.336H135.762V17.136H133.746V9.624H125.874V17.136H123.858Z"
        fill="#3f3f3f"
      />
      <path
        d="M139.128 17.136V0.336H149.472V2.16H141.144V7.776H148.8V9.6H141.144V15.312H149.592V17.136H139.128Z"
        fill="#3f3f3f"
      />
      <path
        d="M152.172 17.136V0.336H156.084L161.94 15.864H162.252V0.336H164.244V17.136H160.332L154.5 1.584H154.164V17.136H152.172Z"
        fill="#3f3f3f"
      />
      <path
        d="M173.485 17.472C172.237 17.472 171.133 17.216 170.173 16.704C169.229 16.176 168.485 15.408 167.941 14.4C167.413 13.392 167.149 12.144 167.149 10.656V6.816C167.149 4.592 167.741 2.904 168.925 1.752C170.109 0.584 171.701 0 173.701 0C175.685 0 177.197 0.544 178.237 1.632C179.277 2.72 179.797 4.176 179.797 6V6.12H177.805V5.952C177.805 5.152 177.661 4.44 177.373 3.816C177.085 3.192 176.637 2.704 176.029 2.352C175.421 1.984 174.645 1.8 173.701 1.8C172.277 1.8 171.165 2.24 170.365 3.12C169.565 3.984 169.165 5.2 169.165 6.768V10.704C169.165 12.272 169.565 13.496 170.365 14.376C171.165 15.24 172.285 15.672 173.725 15.672C175.133 15.672 176.165 15.272 176.821 14.472C177.493 13.672 177.829 12.608 177.829 11.28V10.872H172.741V9.144H179.797V17.136H177.973V15.312H177.637C177.461 15.664 177.213 16.008 176.893 16.344C176.573 16.68 176.141 16.952 175.597 17.16C175.053 17.368 174.349 17.472 173.485 17.472Z"
        fill="#3f3f3f"
      />
    </svg>
  );
}

function Decrypt({
  text,
  className = "",
  parentClassName = "",
  delay = 0,
  animateOn = "view",
}) {
  return (
    <DecryptedText
      text={text}
      animateOn={animateOn}
      delay={delay}
      revealDirection="start"
      speed={40}
      className={className}
      parentClassName={parentClassName}
    />
  );
}

function TabList({ items, activeTab, onSelect }) {
  return (
    <div className="flex flex-col items-start gap-2 text-[10px] leading-normal text-[#969696]">
      {items.map((item) => {
        const [tab] = item;
        const isActive = tab === activeTab;

        const transition = {
          duration: SQUARE_DURATION,
          ease: "easeInOut",
          delay: isActive ? SQUARE_DURATION : 0,
        };

        return (
          <motion.button
            key={tab}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(item)}
            className="flex cursor-pointer items-center whitespace-nowrap text-left text-[#969696] transition-colors hover:text-[#3f3f3f]"
            initial={false}
            animate={{ gap: isActive ? "4px" : "0px" }}
            transition={transition}
          >
            <motion.span
              className="block h-2 origin-bottom-left"
              initial={false}
              animate={{
                scale: isActive ? 1 : 0,
                width: isActive ? 8 : 0,
              }}
              transition={transition}
              aria-hidden="true"
            >
              <motion.span
                className="block size-full origin-center bg-[#969696]"
                initial={false}
                animate={{ rotate: isActive ? [0, 90] : [90, -90] }}
                transition={transition}
              />
            </motion.span>
            <Decrypt text={tab} />
          </motion.button>
        );
      })}
    </div>
  );
}

function TabDropdown({ items, activeTab, onSelect }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full text-[10px] leading-normal text-[#969696]">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full cursor-pointer items-center justify-between gap-3 border-b border-[#ececec] pb-2 text-left text-[#3f3f3f] transition-colors hover:text-[#3f3f3f]"
      >
        <span className="flex items-center gap-1">
          <span className="size-2 shrink-0 bg-[#969696]" aria-hidden="true" />
          <Decrypt key={activeTab} text={activeTab} animateOn="mount" />
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <ChevronDown size={12} strokeWidth={1.5} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            role="listbox"
            initial={{ opacity: 0, y: -6, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -4, filter: "blur(4px)" }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 top-full z-20 mt-2 flex flex-col gap-2 bg-white py-2"
          >
            {items.map((item) => {
              const [tab] = item;
              const isActive = tab === activeTab;

              return (
                <button
                  key={tab}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => {
                    onSelect(item);
                    setOpen(false);
                  }}
                  className={`flex cursor-pointer items-center gap-1 text-left transition-colors hover:text-[#3f3f3f] ${
                    isActive ? "text-[#3f3f3f]" : "text-[#969696]"
                  }`}
                >
                  <span
                    className={`size-2 shrink-0 ${
                      isActive ? "bg-[#969696]" : "bg-transparent"
                    }`}
                    aria-hidden="true"
                  />
                  <Decrypt text={tab} animateOn="mount" />
                </button>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function LinkItem({
  href,
  label,
  external = false,
  decryptDelay = 0,
  animateOn = "view",
}) {
  return (
    <a
      href={href}
      className="group relative inline-flex w-fit cursor-pointer items-center text-[#3f3f3f]"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <Decrypt text={label} delay={decryptDelay} animateOn={animateOn} />
      <span
        className="pointer-events-none absolute left-full top-1/2 ml-1 -translate-y-1/2"
        aria-hidden="true"
      >
        <ArrowUpRight
          size={12}
          strokeWidth={1.5}
          className="origin-bottom-left scale-0 transition-transform duration-150 ease-in-out group-hover:scale-100"
        />
      </span>
    </a>
  );
}

function MoreMenu({ open, onToggle }) {
  return (
    <div className="flex flex-col gap-1 text-[12px] leading-normal">
      <motion.button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        initial="rest"
        whileHover="hover"
        className="flex w-fit cursor-pointer items-center gap-1 whitespace-nowrap text-left text-[10px] leading-normal text-[#969696] transition-colors hover:text-[#3f3f3f]"
      >
        <motion.span
          className="size-1.5 shrink-0 origin-center bg-[#969696]"
          variants={{
            rest: { rotate: 0 },
            hover: { rotate: 90 },
          }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
          aria-hidden="true"
        />
        <Decrypt text="More" />
      </motion.button>

      <AnimatePresence>
        {open
          ? MORE_ITEMS.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.08,
                }}
              >
                <LinkItem
                  {...item}
                  animateOn="mount"
                  decryptDelay={index * 80}
                />
              </motion.div>
            ))
          : null}
      </AnimatePresence>
    </div>
  );
}

function SynopsisBody({ content }) {
  if (typeof content === "string") {
    return (
      <Decrypt
        key={content}
        text={content}
        parentClassName="inline"
        animateOn="mount"
      />
    );
  }

  if (Array.isArray(content)) {
    return content.map((part, index) =>
      part.href ? (
        <CompanyLink key={`${part.text}-${index}`} href={part.href}>
          <Decrypt
            text={part.text}
            parentClassName="inline"
            animateOn="mount"
          />
        </CompanyLink>
      ) : (
        <Decrypt
          key={`${part.text}-${index}`}
          text={part.text}
          parentClassName="inline"
          animateOn="mount"
        />
      ),
    );
  }

  return content;
}

function Synopsis({ info, actions = false, onNext }) {
  return (
    <section className="flex w-full flex-col gap-2">
      <p className="text-[10px] leading-normal text-[#969696]">
        <Decrypt text="Synopsis" />
      </p>
      <p className="indent-6 text-[12px] leading-normal text-[#3f3f3f]">
        <SynopsisBody content={info.summary} />
      </p>
      <p className="indent-6 text-[12px] leading-normal text-[#3f3f3f]">
        <SynopsisBody content={info.detail} />
      </p>
      {actions ? (
        <div className="flex items-start gap-1">
          <button
            type="button"
            onClick={onNext}
            className="group inline-flex w-fit cursor-pointer items-center gap-1 bg-[#f4f4f4] px-2 py-1 text-[10px] leading-normal text-[#686868] transition-[background-color,color] duration-150 ease-in-out hover:bg-[#eaeaea] hover:text-[#3f3f3f]"
          >
            <Decrypt text="Next Exp" />
            <CornerRightDown size={8} strokeWidth={1.5} aria-hidden="true" />
          </button>
          <a
            href="/Junhengswedesignresume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit cursor-pointer items-center gap-1 bg-white px-2 py-1 text-[10px] leading-normal text-[#969696] transition-colors hover:text-[#3f3f3f]"
          >
            <Decrypt text="View Resume" />
            <ArrowUpRight size={10} strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
      ) : null}
    </section>
  );
}

export default function Page() {
  const [audience, setAudience] = useState(AUDIENCE_TABS[0]);
  const [experience, setExperience] = useState(EXPERIENCE_TABS[0]);
  const [moreOpen, setMoreOpen] = useState(false);

  function selectNextExperience() {
    const currentIndex = EXPERIENCE_TABS.findIndex(
      ([tab]) => tab === experience[0],
    );
    setExperience(EXPERIENCE_TABS[(currentIndex + 1) % EXPERIENCE_TABS.length]);
  }

  return (
    <main className="mono bg-white font-light text-[#3f3f3f]">
      <motion.div
        className="flex h-fit flex-col gap-10 p-6 md:h-dvh md:gap-8 md:p-8 lg:p-12"
        {...PAGE_ENTRANCE}
      >
        {SHOW_ALTERNATE_WORDMARK ? (
          <AlternateWordmark />
        ) : SHOW_WORDMARK ? (
          <Wordmark />
        ) : null}

        <div className="flex min-h-0 flex-1 flex-col gap-6 md:hidden">
          <TabDropdown
            items={AUDIENCE_TABS}
            activeTab={audience[0]}
            onSelect={setAudience}
          />

          <div className="flex flex-col gap-4">
            <Synopsis info={audience[1]} />
            <div className="relative aspect-439/256 w-full overflow-hidden">
              <Image
                src="/figma/jun-profile.png"
                alt="Junheng Zheng standing in a cafe"
                fill
                priority
                sizes="calc(100vw - 48px)"
                className="object-cover"
              />
            </div>
          </div>

          <TabDropdown
            items={EXPERIENCE_TABS}
            activeTab={experience[0]}
            onSelect={setExperience}
          />

          <div className="flex flex-col gap-4">
            <Synopsis
              info={experience[1]}
              actions
              onNext={selectNextExperience}
            />
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1 text-[12px] leading-normal">
              <p className="text-[10px] text-[#b0b0b0]">
                <Decrypt text="Links" />
              </p>
              {LINKS.map((link) => (
                <LinkItem key={link.label} {...link} />
              ))}
            </div>
            <MoreMenu
              open={moreOpen}
              onToggle={() => setMoreOpen((value) => !value)}
            />
          </div>
        </div>

        <div className="hidden min-h-0 flex-1 grid-cols-12 grid-rows-12 gap-6 md:grid lg:hidden">
          <div className="col-span-5 col-start-1 row-span-8 row-start-1 flex flex-col gap-4">
            <TabDropdown
              items={AUDIENCE_TABS}
              activeTab={audience[0]}
              onSelect={setAudience}
            />
            <Synopsis info={audience[1]} />
            <div className="relative aspect-439/256 w-full shrink-0 overflow-hidden">
              <Image
                src="/figma/jun-profile.png"
                alt="Junheng Zheng standing in a cafe"
                fill
                priority
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="col-span-5 col-start-7 row-span-6 row-start-3 flex flex-col gap-4">
            <TabDropdown
              items={EXPERIENCE_TABS}
              activeTab={experience[0]}
              onSelect={setExperience}
            />
            <Synopsis
              info={experience[1]}
              actions
              onNext={selectNextExperience}
            />
          </div>

          <div className="col-start-12 row-start-1 justify-self-start">
            <MoreMenu
              open={moreOpen}
              onToggle={() => setMoreOpen((value) => !value)}
            />
          </div>

          <div className="col-start-12 row-start-12 flex flex-col gap-1 self-end text-[12px] leading-normal">
            <p className="text-[10px] text-[#b0b0b0]">
              <Decrypt text="Links" />
            </p>
            {LINKS.map((link) => (
              <LinkItem key={link.label} {...link} />
            ))}
          </div>
        </div>

        <div className="hidden min-h-0 flex-1 grid-cols-12 grid-rows-12 gap-3 lg:grid">
          <nav className="col-start-1 row-start-1">
            <TabList
              items={AUDIENCE_TABS}
              activeTab={audience[0]}
              onSelect={setAudience}
            />
          </nav>

          <div className="col-span-4 col-start-2 row-span-7 row-start-1 flex flex-col gap-6">
            <Synopsis info={audience[1]} />
            <div className="relative h-64 w-full shrink-0 overflow-hidden">
              <Image
                src="/figma/jun-profile.png"
                alt="Junheng Zheng standing in a cafe"
                fill
                priority
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <nav className="col-start-7 row-start-3">
            <TabList
              items={EXPERIENCE_TABS}
              activeTab={experience[0]}
              onSelect={setExperience}
            />
          </nav>

          <div className="col-span-4 col-start-8 row-span-5 row-start-3">
            <Synopsis
              info={experience[1]}
              actions
              onNext={selectNextExperience}
            />
          </div>

          <div className="col-start-12 row-start-1 justify-self-start">
            <MoreMenu
              open={moreOpen}
              onToggle={() => setMoreOpen((value) => !value)}
            />
          </div>

          <div className="col-start-12 row-start-12 flex flex-col gap-1 self-end text-[12px] leading-normal">
            <p className="text-[10px] text-[#b0b0b0]">
              <Decrypt text="Links" />
            </p>
            {LINKS.map((link) => (
              <LinkItem key={link.label} {...link} />
            ))}
          </div>
        </div>
      </motion.div>
    </main>
  );
}
