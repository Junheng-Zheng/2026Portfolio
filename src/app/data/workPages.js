export const WORK_SLUGS = {
  IBM_RESEARCH: "ibm-research",
  LIBERTY_MUTUAL: "liberty-mutual",
  COLLABOTORY: "collabotory",
  DND_MOTOR: "d-d-motor-systems",
};

export const CONTACT_ITEMS = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/junhengzheng/" },
  { name: "Resume", href: "/Junheng_SWE_Resume.pdf" },
  { name: "Github", href: "https://github.com/junheng-zheng" },
  { name: "Gmail", href: "mailto:junhengzheng@gmail.com" },
];

export const WORK_ITEMS = [
  {
    name: "IBM Research",
    period: "Summer 26",
    slug: WORK_SLUGS.IBM_RESEARCH,
  },
  {
    name: "Liberty Mutual",
    period: "Summer 25",
    slug: WORK_SLUGS.LIBERTY_MUTUAL,
  },
  {
    name: "Collabotory",
    period: "Spring 26",
    slug: WORK_SLUGS.COLLABOTORY,
  },
  {
    name: "D&D Motor Systems",
    period: "Fall 24",
    slug: WORK_SLUGS.DND_MOTOR,
  },
];

export const HOME_ABSTRACT_SEGMENTS = [
  {
    text: "Junheng Zheng (Jun) is currently a Design Engineer intern at ",
    italic: false,
  },
  {
    text: "IBM Research",
    href: "https://research.ibm.com/",
  },
  {
    text: " on the internal Apps@Research team assisting researchers on Quantum Computing and AI. Previously, Jun interned as a Design Engineer at ",
    italic: false,
  },
  {
    text: "Liberty Mutual Insurance",
    href: "https://www.libertymutual.com/",
  },
  {
    text: " on the Enterprise UI team working on design system, personally increasing the library by 50%.",
    italic: false,
  },
];

export const WORK_PAGES = {
  [WORK_SLUGS.IBM_RESEARCH]: {
    title: "IBM Research",
    duration: "Summer 26",
    team: ["Apps@Research"],
    abstractSegments: [
      {
        text: "Jun is a Design Engineer intern at ",
        italic: false,
      },
      {
        text: "IBM Research",
        href: `/work/${WORK_SLUGS.IBM_RESEARCH}`,
      },
      {
        text: " on the internal Apps@Research team, building tools that help researchers working on Quantum Computing and AI ship internal applications faster.",
        italic: false,
      },
    ],
  },
  [WORK_SLUGS.LIBERTY_MUTUAL]: {
    title: "Liberty Mutual",
    duration: "Summer 25",
    team: ["Enterprise UI", "Design Systems"],
    abstractSegments: [
      {
        text: "Jun interned as a Design Engineer at ",
        italic: false,
      },
      {
        text: "Liberty Mutual Insurance",
        href: `/work/${WORK_SLUGS.LIBERTY_MUTUAL}`,
      },
      {
        text: " on the Enterprise UI team, contributing to the design system and personally increasing the component library by 50%.",
        italic: false,
      },
    ],
  },
  [WORK_SLUGS.COLLABOTORY]: {
    title: "Collabotory",
    duration: "Spring 26",
    team: ["Product", "Engineering", "Design"],
    abstractSegments: [
      {
        text: "Jun works across software and design at ",
        italic: false,
      },
      {
        text: "Collabotory",
        href: `/work/${WORK_SLUGS.COLLABOTORY}`,
      },
      {
        text: ", building product experiences that blend engineering craft with visual design.",
        italic: false,
      },
    ],
  },
  [WORK_SLUGS.DND_MOTOR]: {
    title: "D&D Motor Systems",
    duration: "Fall 24",
    team: ["Web", "Design", "Marketing"],
    abstractSegments: [
      {
        text: "Jun led design and frontend development for ",
        italic: false,
      },
      {
        text: "D&D Motor Systems",
        href: `/work/${WORK_SLUGS.DND_MOTOR}`,
      },
      {
        text: ", a complete website refresh for a motor manufacturing company in Syracuse, NY.",
        italic: false,
      },
    ],
  },
};

export function getWorkPage(slug) {
  return WORK_PAGES[slug] ?? null;
}

export function getAllWorkSlugs() {
  return Object.keys(WORK_PAGES);
}
