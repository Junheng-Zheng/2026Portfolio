import { BLOG_SLUGS } from "./blogPosts";
import { WORK_PAGES, WORK_SLUGS } from "./workPages";

export const HOME_BIO =
  "My name is Junheng Zheng, and I am a problem solver working across design and development.";

export const HOME_CONTACT_HREF = "https://www.linkedin.com/in/junhengzheng/";
export const HOME_EMAIL_HREF = "mailto:junhengzheng@gmail.com";
export const HOME_GITHUB_HREF = "https://github.com/junheng-zheng";
export const HOME_RESUME_HREF = "/Junhengswedesignresume.pdf";

export const HOME_CONTACT_DROPDOWN = [
  { label: "LinkedIn", href: HOME_CONTACT_HREF },
  { label: "Email", href: HOME_EMAIL_HREF },
  { label: "Github", href: HOME_GITHUB_HREF },
  { label: "Resume", href: HOME_RESUME_HREF },
];

export const HOME_ACTIONS = [
  {
    label: "Contact",
    href: HOME_CONTACT_HREF,
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

const TESLA_PAGE = WORK_PAGES[WORK_SLUGS.TESLA];
const IBM_PAGE = WORK_PAGES[WORK_SLUGS.IBM_RESEARCH];
const LIBERTY_PAGE = WORK_PAGES[WORK_SLUGS.LIBERTY_MUTUAL];

export const HOME_PROJECTS = [
  {
    image: "/landing/tesla-cover.png",
    title: TESLA_PAGE.title,
    badges: [],
    href: `/work/${WORK_SLUGS.TESLA}`,
  },
  {
    image: "/landing/ibm-office-cover.png",
    title: IBM_PAGE.title,
    badges: [],
    href: `/work/${WORK_SLUGS.IBM_RESEARCH}`,
  },
  {
    image: "/landing/lmicover.gif",
    title: LIBERTY_PAGE.title,
    badges: [],
    href: `/work/${WORK_SLUGS.LIBERTY_MUTUAL}`,
  },
  {
    image: "/cardcovers/possample.png",
    title: "Restaurant POS",
    badges: [],
    href: `/blog/${BLOG_SLUGS.RESTAURANT_POS}`,
  },
  {
    image: "/pomodoro/cover.png",
    title: "Pomodoro Timer, an UI Exercise",
    badges: [],
    href: `/blog/${BLOG_SLUGS.POMODORO_TIMER}`,
  },
];
