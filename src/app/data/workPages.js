import { BLOG_SLUGS } from "./blogPosts";
import { ProjectTag } from "./projectTags";

export const WORK_SLUGS = {
  TESLA: "tesla",
  IBM_RESEARCH: "ibm-research",
  LIBERTY_MUTUAL: "liberty-mutual",
  DND_MOTOR: "d-d-motor-systems",
};

export const CONTACT_ITEMS = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/junhengzheng/" },
  { name: "Resume", href: "/Junhengswedesignresume.pdf" },
  { name: "Github", href: "https://github.com/junheng-zheng" },
  { name: "Gmail", href: "mailto:junhengzheng@gmail.com" },
];

export const WORK_ITEMS = [
  {
    name: "Tesla",
    period: "Fall 2026",
    slug: WORK_SLUGS.TESLA,
  },
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
    name: "D&D Motor Systems",
    period: "Fall 24",
    slug: WORK_SLUGS.DND_MOTOR,
  },
];

export const WORK_PAGES = {
  [WORK_SLUGS.TESLA]: {
    ndaProtected: true,
    title: "User Interfaces & AI Workflows @ Tesla",
    titleParts: [
      { type: "text", value: "Interfaces " },
      {
        type: "icons",
        icons: [
          { src: "/logos/figma.png", alt: "Figma", className: "bg-blue-500" },
          { src: "/logos/react.png", alt: "React", className: "bg-blue-500" },
          {
            src: "/logos/javascript.png",
            alt: "JavaScript",
            className: "bg-blue-500",
          },
        ],
      },

      { type: "text", value: " & AI Workflows " },
      {
        type: "icons",
        icons: [
          { src: "/logos/claude.png", alt: "Claude", className: "bg-blue-500" },
          { src: "/logos/grok.png", alt: "Grok", className: "bg-blue-500" },
        ],
      },
      { type: "text", value: " @ Tesla" },
    ],
    duration: "Fall 2026",
    readTime: "5 Min Read",
    tags: [
      ProjectTag.DESIGN_SYSTEM,
      ProjectTag.INTERNAL_TOOLS,
      ProjectTag.AI_WORKFLOW,
    ],
    cover: "/landing/tesla-cover.png",
    about: [
      "I'm interning at Tesla as a Frontend Engineer and Designer, working across Design Systems and Internal Tools.",
      "The work sits at the intersection of product engineering and design, shipping interfaces that need to feel clear, consistent, and fast inside a complex internal ecosystem.",
    ],
    processSummary:
      "Unlocked. The full Tesla case study is still being written.",
  },
  [WORK_SLUGS.IBM_RESEARCH]: {
    ndaProtected: true,
    title: "Redesigns & Migrations @ IBM Research",
    titleParts: [
      { type: "text", value: "Redesigns " },
      {
        type: "icons",
        icons: [
          { src: "/logos/figma.png", alt: "Figma", className: "bg-blue-500" },
          { src: "/logos/miro.png", alt: "Miro", className: "bg-yellow-500" },
        ],
      },
      { type: "text", value: " & Migrations " },
      {
        type: "icons",
        icons: [
          { src: "/logos/react.png", alt: "React", className: "bg-blue-500" },
          {
            src: "/logos/javascript.png",
            alt: "JavaScript",
            className: "bg-yellow-500",
          },
        ],
      },
      { type: "text", value: " @ IBM Research" },
    ],
    duration: "Summer 26",
    tags: [ProjectTag.INTERNAL_TOOLS, ProjectTag.DESIGN_SYSTEM],
    cover: "/landing/ibm-office-cover.png",
    about: [
      "I interned at IBM Research as a Design Engineer on Apps@Research, the team that maintains internal tools for research ventures across the organization.",
      "I was brought on to redesign and migrate one of their oldest applications: the Data & AI Model/Services Acquisition Portal (DARF), covering Figma redesign with Carbon, a Vue-to-React migration, an internal component library, and deployment to OpenShift.",
    ],
    processSummary:
      "Unlocked. Read the full design-to-code case study for DARF.",
    caseStudySlug: BLOG_SLUGS.IBM_RESEARCH,
    processHref: `/blog/${BLOG_SLUGS.IBM_RESEARCH}`,
  },
  [WORK_SLUGS.LIBERTY_MUTUAL]: {
    ndaProtected: true,
    title: "Design Systems & MCPs @ Liberty Mutual",
    titleParts: [
      { type: "text", value: "Design Systems & " },
      {
        type: "icons",
        icons: [
          { src: "/logos/figma.png", alt: "Figma", className: "bg-blue-500" },
          { src: "/logos/react.png", alt: "React", className: "bg-blue-500" },
          {
            src: "/logos/javascript.png",
            alt: "JavaScript",
            className: "bg-yellow-500",
          },
        ],
      },
      { type: "text", value: " & MCPs " },
      {
        type: "icons",
        icons: [
          { src: "/logos/claude.png", alt: "Claude", className: "bg-blue-500" },
        ],
      },
      { type: "text", value: " @ Liberty Mutual" },
    ],
    duration: "Summer 25",
    tags: [ProjectTag.DESIGN_SYSTEM],
    cover: "/landing/lmicover.gif",
    about: [
      "I interned as a Design Engineer at Liberty Mutual Insurance on the Enterprise UI team, contributing to the internal design system.",
      "My work focused on reusable components and patterns, personally increasing the component library by 50% while helping the system stay consistent across internal products.",
    ],
    processSummary:
      "Unlocked. The full Liberty Mutual case study is still being written.",
  },
  [WORK_SLUGS.DND_MOTOR]: {
    ndaProtected: false,
    title: "D&D Motor Systems",
    duration: "Fall 24",
    tags: [ProjectTag.UI_DEVELOPMENT],
    about: [
      "I led design and frontend development for D&D Motor Systems, a complete website refresh for a motor manufacturing company in Syracuse, NY.",
    ],
  },
};

export function getWorkPage(slug) {
  return WORK_PAGES[slug] ?? null;
}

export function getAllWorkSlugs() {
  return Object.keys(WORK_PAGES);
}
