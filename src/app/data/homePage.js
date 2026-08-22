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
    href: `/blog/${BLOG_SLUGS.IBM_RESEARCH}`,
  },
  {
    image: "/landing/lmicover.gif",
    aspect: "1380/1080",
    meta: ["8 Min Read", "Internship"],
    title:
      "Design & Dev of scalable React components utilized across teams at LMI.",
    href: null,
    comingSoon: true,
  },
  {
    image: "/landing/pomodorocover.png",
    aspect: "2920/2016",
    meta: ["2 Min Read", "Project"],
    title: "Pomodoro Timer, a UI Development Exercise",
    href: `/blog/${BLOG_SLUGS.POMODORO_TIMER}`,
  },
];
