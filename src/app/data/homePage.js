import { BLOG_SLUGS } from "./blogPosts";

export const HOME_BIO =
  "Junheng Zheng is a Designer and Developer. Currently, Jun is interning as a Design Engineer @ IBM Research on the internal Apps@Research team. Previously, Jun interned as a Design Engineer @ Liberty Mutual Insurance on the EUI Team. Primarily designing with Figma and developing with React.";

export const HOME_ACTIONS = [
  {
    label: "Contact",
    href: "https://www.linkedin.com/in/junhengzheng/",
    variant: "button",
  },
  { label: "Resume", href: "/Junhengswedesignresume.pdf", variant: "link" },
  {
    label: "Github",
    href: "https://github.com/junheng-zheng",
    variant: "link",
  },
];

export const HOME_HACKATHONS = [
  {
    name: "Lifestory (Winner)",
    period: "Uncommon Hacks '26",
    href: null,
    devpostHref: "https://devpost.com/software/lifestory",
  },
  {
    name: "Proprio",
    period: "Figbuild '26",
    href: "/works/proprio",
    devpostHref: "https://devpost.com/software/proprio",
  },
];

export const HOME_PROJECTS = [
  {
    image: "/landing/ibmcover.gif",
    aspect: "1850/1362",
    meta: ["5 Min Read", "Internship"],
    title:
      "Redesign & Migration of a data acquisition application utilized at IBM Research.",
    details: [
      <>
        <span className="text-white">1]</span>{" "}
        <span className="text-white">Context + design</span>
        <span> done through through Figjam and Figma Design.</span>
      </>,
      <>
        <span className="text-white">2] Frontend</span>
        <span>
          {" "}
          through React + Vite, SCSS, Javascript, Zustand, and Axios.
        </span>
      </>,
      <>
        <span className="text-white">3] Deployment</span>
        <span> through Openshift Kubernetes, Podman, Helm, and Nginx.</span>
      </>,
    ],
    href: `/blog/${BLOG_SLUGS.IBM_RESEARCH}`,
  },
  {
    image: "/landing/lmicover.gif",
    aspect: "1380/1080",
    meta: ["8 Min Read", "Internship"],
    title:
      "Design & Dev of scalable React components utilized across teams at LMI.",
    details: [
      <>
        <span className="text-white">1]</span>{" "}
        <span className="text-white">Context + design</span>
        <span> done through through Figjam and Figma Design.</span>
      </>,
      <>
        <span className="text-white">2] Frontend</span>
        <span> through React + Vite, SCSS, Typscript</span>
      </>,
      <>
        <span className="text-white">3] Deployment</span>
        <span> to Storybook</span>
      </>,
    ],
    href: null,
    comingSoon: true,
    detailsPadding: "py-3",
  },
  {
    image: "/landing/pomodorocover.png",
    aspect: "2920/2016",
    meta: ["2 Min Read", "Project"],
    title: "Pomodoro Timer, a UI Development Exercise",
    details: [
      <>
        <span className="text-white">1]</span>
        <span> D</span>
        <span className="text-white">esign</span>
        <span> done through through Figma Design & Fast Isometric Plugin.</span>
      </>,
      <>
        <span className="text-white">2] Development </span>
        <span>through React, TailwindCSS, Javascript, and Framer Motion.</span>
      </>,
      <>
        <span className="text-white">3] Deployment</span>
        <span> through Vercel</span>
      </>,
    ],
    href: `/blog/${BLOG_SLUGS.POMODORO_TIMER}`,
    detailsPadding: "py-3",
  },
];
