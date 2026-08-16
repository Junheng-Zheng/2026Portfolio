export const BLOG_SLUGS = {
  IBM_RESEARCH: "swe-design-ibm-research",
  LIBERTY_MUTUAL: "swe-design-liberty-mutual",
  POMODORO_TIMER: "3d-pomodoro-timer",
};

export const BLOG_POSTS = {
  [BLOG_SLUGS.IBM_RESEARCH]: {
    slug: BLOG_SLUGS.IBM_RESEARCH,
    title: "Design Engineering @ IBM Research",
    meta: ["5 Min Read", "Internship"],
    cover: "/ibmresearch/cover.gif",
    coverCaption:
      "This project is under NDA. Low-fidelity imagery is used throughout this post in place of production screenshots.",
    description:
      "How I redesigned DARF in Figma with Carbon, migrated Vue to React, built a component library, and shipped to OpenShift, with client and admin needs in one design-to-code workflow.",
    navigation: [
      {
        label: "Context",
        items: [
          { id: "two-sides", label: "Two sides, one portal" },
          { id: "what-changed", label: "What needed to change" },
        ],
      },
      {
        label: "Design",
        items: [
          { id: "redesign-figma", label: "Redesign in Figma" },
          { id: "components", label: "Creating an internal component library" },
          { id: "design-systems", label: "Design systems" },
        ],
      },
      {
        label: "Development",
        items: [
          { id: "migration-go-vue", label: "Migration from Go and Vue" },
          { id: "build-react", label: "Build in React" },
          { id: "cms-collaborators", label: "CMS and collaborators" },
          { id: "ship-openshift", label: "Ship to OpenShift" },
        ],
      },
      {
        label: "Benefits of SWE + Design",
        items: [
          { id: "one-role-two-languages", label: "One role, two languages" },
          {
            id: "reducing-design-dev-friction",
            label: "Reducing the friction between design and dev",
          },
        ],
      },
    ],
    sections: [
      {
        id: "two-sides",
        title: "Two sides, one portal",
        blocks: [
          {
            type: "paragraph",
            text: "This summer, I interned at IBM Research as a Design Engineer on Apps@Research, the team that maintains internal tools for research ventures across the organization. I was brought on to redesign and migrate one of their oldest applications: the Data & AI Model/Services Acquisition Portal (DARF).",
          },
          {
            type: "paragraph",
            text: "DARF is how IBM Research requests and tracks access to external client data and AI models. Researchers submit forms through the portal; once approved, they receive access to the resources their projects need.",
          },
          {
            type: "paragraph",
            text: "DARF has two sides. On the client side, researchers use the portal to request access to external client data and AI models the organization already has rights to use. On the admin side, Apps@Research staff approve submissions, manage form content, and keep the portal running.",
          },
          {
            type: "definitions",
            items: [
              {
                label: "Clients",
                text: "Researchers who submit data access requests and use that data in their research; a usable flow and strong interface are as important as strong feature coverage.",
              },
              {
                label: "Admins",
                text: "Apps@Research staff who approve submissions, manage content, and operate the portal without pulling engineering into every edit.",
              },
            ],
          },
          {
            type: "graphic",
            src: "/ibmresearch/clientadminside.png",
            alt: "Diagram of DARF portal connecting client and admin sides",
          },
        ],
      },
      {
        id: "what-changed",
        title: "What needed to change",
        blocks: [
          {
            type: "paragraph",
            text: "Interviews and usability review surfaced friction on both sides. On the client side, collaboration often broke around who could see a submission. For example: when someone filled out a form on behalf of another researcher, they couldn't add viewers during submission, and there was no way to add viewers after the form was already submitted.",
          },
          {
            type: "paragraph",
            text: "On the admin side, the UI didn't match how the organization actually ran the product. Admins had no proper content management system, so any form copy change meant contacting a developer to edit it manually. Approval workflows added more friction through multi-step navigation that was difficult to follow.",
          },
          {
            type: "paragraph",
            text: "The interface had also aged badly: outdated styling, inconsistent layouts, and screens that looked unfinished. It didn't use Carbon at all, and basic states like empty views and loading feedback were missing. On top of that, the product was still in Vue while the rest of Apps@Research had standardized on React. That stack mismatch made it harder to share components, patterns, and developer support across the team. Between the UX gaps, the visual debt, and the tech drift, this needed a full redesign, not spot fixes.",
          },
        ],
      },
      {
        id: "redesign-figma",
        title: "Redesign in Figma",
        blocks: [
          {
            type: "paragraph",
            text: "Those findings drove a full redesign across roughly 11 screens on the client and admin sides. The legacy app didn't use Carbon at all, so I had to implement the design system from scratch: hierarchy, spacing, and patterns across every screen.",
          },
          {
            type: "stats",
            stats: [
              { value: "11", label: "Admin + Client pages redesigned" },
              { value: "8", label: "Reusable components" },
            ],
            columns: 2,
          },
          {
            type: "graphic",
            src: "/ibmresearch/screengrid.png",
            alt: "Grid of redesigned client and admin screens",
            caption:
              "An example of the low-fidelity screens made across admin and client pages",
          },
        ],
      },
      {
        id: "components",
        title: "Creating an internal component library",
        blocks: [
          {
            type: "paragraph",
            text: "I built 8 reusable components from Carbon primitives, each matched to its React implementation. Carbon follows atomic design, but only goes up to a certain level. More complex pieces like a banner, app header, or filter component had to be custom built on top of Carbon building blocks.",
          },
          {
            type: "paragraph",
            text: "Shared components kept client and admin screens consistent and made new pages faster to design and build.",
          },
          {
            type: "graphic",
            src: "/ibmresearch/componentlibrary.png",
            alt: "Component library map from Carbon primitives to page layouts",
            caption:
              "Building off of Carbon's existing design system and creating more specialized components",
          },
        ],
      },
      {
        id: "design-systems",
        title: "Design systems",
        blocks: [
          {
            type: "paragraph",
            text: "The old application didn't use Carbon at all. In Figma, I introduced Carbon across the product and redesigned each screen with shared layout rules: consistent hierarchy, spacing, and component usage, not one-off screens.",
          },
        ],
      },
      {
        id: "migration-go-vue",
        title: "Migration from Go and Vue",
        blocks: [
          {
            type: "paragraph",
            text: "The legacy stack paired a Vue frontend with a Go backend. I hadn't used either before, so I started by mapping how the Vue app was organized: its routes, page structure, and how each screen talked to the API.",
          },
          {
            type: "paragraph",
            text: "The Go backend stayed in place. I scaffolded a React + Vite project with matching routes and empty pages, then replaced each Vue screen with its redesigned React version one at a time.",
          },
          {
            type: "graphic",
            src: "/ibmresearch/vuetoreact.png",
            alt: "Vue to React migration scaffold diagram",
          },
        ],
      },
      {
        id: "build-react",
        title: "Build in React",
        blocks: [
          {
            type: "paragraph",
            text: "With the React scaffold in place, I implemented the redesigned screens using Carbon and the component library from Figma, building alongside ongoing design work.",
          },
          {
            type: "paragraph",
            text: "For each screen, I went back to the Vue client to see how it actually worked: what data it loaded, what actions a user could take, and what changed after each step. That told me which endpoints and hooks I needed to rebuild in React.",
          },
        ],
      },
      {
        id: "cms-collaborators",
        title: "CMS and collaborators",
        blocks: [
          {
            type: "paragraph",
            text: "The usability issues from earlier were not just UI problems. Letting clients add collaborators and letting admins edit form content both required product support that did not exist yet in the codebase.",
          },
          {
            type: "paragraph",
            text: "There were no Go endpoints and no database tables for either feature. I added the tables first, then built endpoints across the data, business, and server layers so permissions and validation were handled before anything reached the frontend.",
          },
          {
            type: "paragraph",
            text: "On the React side, I fetched that data with Axios and stored it in global state with Zustand. Clients can now add collaborators during and after submission. Admins can update form content on their own instead of asking a developer to change copy every time.",
          },
        ],
      },
      {
        id: "ship-openshift",
        title: "Ship to OpenShift",
        blocks: [
          {
            type: "paragraph",
            text: "The React app had to run on IBM's internal OpenShift cluster. I ran Jest tests, built a production image, pushed it to IBM Cloud Container Registry, and deployed with Helm templates.",
          },
          {
            type: "definitions",
            items: [
              {
                label: "Test",
                text: "Jest test coverage across components and critical flows.",
              },
              {
                label: "Containerize",
                text: "Build a production image of the application.",
              },
              {
                label: "Registry",
                text: "Push the image to IBM Cloud Container Registry.",
              },
              {
                label: "Deploy",
                text: "Apply Helm templates to run the app on an OpenShift pod.",
              },
            ],
          },
          {
            type: "flow",
            caption: "Deploy pipeline (simplified)",
            steps: [
              "Run Jest",
              "Build image",
              "Push to IBM Cloud Registry",
              "Helm apply",
              "Pod on OpenShift",
            ],
          },
        ],
      },
      {
        id: "one-role-two-languages",
        title: "One role, two languages",
        blocks: [
          {
            type: "paragraph",
            text: "I worked across design and engineering on this project: Figma screens, React implementation, and OpenShift deployment.",
          },
          {
            type: "paragraph",
            text: "Researchers needed a solid client UI. Admins needed workflows that matched how they operated. Both had to ship on the new stack.",
          },
        ],
      },
      {
        id: "reducing-design-dev-friction",
        title: "Reducing the friction between design and dev",
        blocks: [
          {
            type: "paragraph",
            text: "As designs were approved, I built in parallel. One simplified version of that loop:",
          },
          {
            type: "flow",
            caption: "Example design-to-development loop (simplified)",
            steps: [
              "Design screen",
              "Submit for approval",
              "Keep designing while waiting",
              "Approval",
              "Branch and implement screen",
              "Open pull request",
              "Return to design",
            ],
          },
          {
            type: "paragraph",
            text: "Through design, I noted edge cases and structural code changes I would handle in development. Working in both roles let me keep screens viable against the current code structure and component library, and skip some edge-case screens in Figma when I knew I could implement them efficiently later in the cycle.",
          },
          {
            type: "paragraph",
            text: "That overlap also cut turnaround time. The handoff gap between design and development, the back-and-forth when specs hit implementation limits, was largely removed because I owned both processes.",
          },
        ],
      },
    ],
  },
  [BLOG_SLUGS.LIBERTY_MUTUAL]: {
    slug: BLOG_SLUGS.LIBERTY_MUTUAL,
    title: "Design Engineering @ Liberty Mutual",
    meta: ["8 Min Read", "Internship"],
    cover: "/landing/lmicover.gif",
    coverCaption:
      "This project is under NDA. Low-fidelity imagery is used throughout this post in place of production screenshots.",
    description:
      "How Enterprise UI in CFT UX standardizes higher-level components above LMDS, identifying repeated patterns across internal teams, shipping them to Storybook, and promoting adoption back into the design system.",
    navigation: [
      {
        label: "Context",
        items: [
          { id: "overview", label: "Overview" },
          { id: "enterprise-ui", label: "LMDS and Enterprise UI" },
        ],
      },
      {
        label: "Design",
        items: [{ id: "design-figma", label: "Design in Figma" }],
      },
      {
        label: "Development",
        items: [
          { id: "build-react", label: "Build in React" },
          { id: "ship-storybook", label: "Ship to Storybook" },
        ],
      },
      {
        label: "Impact",
        items: [
          { id: "results", label: "Results" },
          { id: "design-dev-loop", label: "One role, two languages" },
          { id: "related-work", label: "Related work" },
        ],
      },
    ],
    sections: [
      {
        id: "overview",
        title: "Overview",
        blocks: [
          {
            type: "paragraph",
            text: "In the summer of 2025, I interned as a Design Engineer on the Enterprise UI (EUI) team within Liberty Mutual's CFT UX division. EUI is a design system built above LMDS, Liberty Mutual's primary design system, and focuses on standardizing the composite components that internal teams kept rebuilding on their own.",
          },
          {
            type: "paragraph",
            text: "My work sat at the intersection of design and frontend development: identifying repeated UI patterns across the organization, designing higher-level components in Figma, and shipping matching React implementations to the EUI Storybook.",
          },
          {
            type: "flow",
            caption: "What I did as a Design Engineer intern",
            steps: [
              "Gather requirements from internal teams through Jira and Slack",
              "Audit existing products for duplicate composite UI",
              "Design flexible variants and states in Figma",
              "Build, QA, and document matching React components",
            ],
          },
        ],
      },
      {
        id: "enterprise-ui",
        title: "LMDS and Enterprise UI",
        blocks: [
          {
            type: "paragraph",
            text: "LMDS (Liberty Mutual Design System) is the design system the organization primarily uses across the company, especially on the client side. It follows atomic design (atoms, molecules, organisms) and gives teams a shared foundation of buttons, inputs, typography, and other primitives.",
          },
          {
            type: "paragraph",
            text: "But atomic design only goes so far. At some point, internal teams need more than primitives. They assemble LMDS pieces into higher-level UI like an app header, a sidebar, or a filter panel, and ship it. The result looks similar across teams, but each version is slightly different. Same idea, inconsistent execution.",
          },
          {
            type: "paragraph",
            text: "Enterprise UI exists to solve that gap. EUI lives in the CFT UX division and standardizes components at this higher level: the composite patterns that LMDS doesn't cover, but that teams keep rebuilding independently.",
          },
          {
            type: "flow",
            caption: "The gap between LMDS and what teams actually build",
            steps: [
              "LMDS covers atoms, molecules, and organisms org-wide",
              "Teams assemble primitives into headers, sidebars, and panels",
              "Each team ships a similar layout with different execution",
              "EUI standardizes the composite so everyone builds the same way",
            ],
          },
          {
            type: "graphic",
            src: "/projectcards/liberty-landing-card.png",
            alt: "Liberty Mutual Enterprise UI design system work",
            caption:
              "Low-fidelity representation of design system work at Liberty Mutual.",
          },
        ],
      },
      {
        id: "design-figma",
        title: "Design in Figma",
        blocks: [
          {
            type: "paragraph",
            text: "Each component started in Figma. I worked from patterns that had already emerged across internal teams: headers, panels, and layouts that multiple squads had built separately using LMDS primitives. The job was to find the common structure, design one flexible version, and make it the standard.",
          },
          {
            type: "paragraph",
            text: "Because these are composite components built on top of LMDS, I had to design for flexibility across teams: multiple configurations, states, and content layouts without breaking visual consistency. That meant thinking about how LMDS tokens and atoms slot into a higher-level pattern before writing any code.",
          },
        ],
      },
      {
        id: "build-react",
        title: "Build in React",
        blocks: [
          {
            type: "paragraph",
            text: "Every Figma component had a matching React implementation. I built in React with TypeScript and SCSS, following the team's existing patterns for props, accessibility, and documentation.",
          },
          {
            type: "paragraph",
            text: "Day-to-day collaboration ran through Slack and Jira. Design reviews happened in Figma; implementation tracked through tickets and pull requests. QA checks against the design spec kept design and code aligned as the library grew.",
          },
          {
            type: "definitions",
            items: [
              {
                label: "Design",
                text: "through Figjam and Figma",
              },
              {
                label: "Development",
                text: "through React and TypeScript",
              },
              {
                label: "Stylization",
                text: "through SCSS and design tokens",
              },
              {
                label: "Deployment",
                text: "to the EUI design system Storybook",
              },
            ],
          },
        ],
      },
      {
        id: "ship-storybook",
        title: "Ship to Storybook",
        blocks: [
          {
            type: "paragraph",
            text: "Finished components were published to the EUI Storybook, the internal catalog where product teams browse, preview, and adopt standardized composite components built on top of LMDS.",
          },
          {
            type: "flow",
            caption: "How a component graduates from EUI into LMDS",
            steps: [
              "EUI publishes the standardized component to Storybook",
              "Product teams adopt it instead of rebuilding their own",
              "Usage and feedback accumulate across the organization",
              "High-adoption components get promoted into LMDS",
            ],
          },
          {
            type: "paragraph",
            text: "Storybook was the delivery point between EUI and the rest of the organization. A component wasn't done until it was documented, tested, and available for teams to adopt. Components with strong enough adoption could eventually be promoted into LMDS itself.",
          },
        ],
      },
      {
        id: "results",
        title: "Results",
        blocks: [
          {
            type: "paragraph",
            text: "Beyond growing the EUI library, the work improved consistency between design and development. Instead of every team assembling their own header or filter panel from LMDS pieces, they could pull a standardized composite from Storybook with the same structure, same behavior, and less drift.",
          },
          {
            type: "stats",
            stats: [
              { value: "30%+", label: "Library growth" },
              { value: "60%", label: "Consistency improvement via QA" },
              { value: "20+", label: "Stakeholders in MCP presentations" },
            ],
            columns: 3,
          },
        ],
      },
      {
        id: "design-dev-loop",
        title: "One role, two languages",
        blocks: [
          {
            type: "paragraph",
            text: "Like my later work at IBM Research, where Carbon provided atoms but custom components had to be built on top, this internship was about working above the design system's ceiling. LMDS handled the foundation; EUI handled the composites that teams kept reinventing.",
          },
          {
            type: "paragraph",
            text: "Figuring out how to design components that were scalable in Figma yet reliable in code was the core challenge. Tokens, variant structures, and state coverage had to work in both tools from the start.",
          },
        ],
      },
      {
        id: "related-work",
        title: "Related work",
        blocks: [
          {
            type: "paragraph",
            segments: [
              {
                text: "After Liberty Mutual, I interned at IBM Research on a full application redesign and migration. Read that process ",
              },
              {
                text: "here",
                href: "/blog/swe-design-ibm-research",
              },
              { text: "." },
            ],
          },
          {
            type: "paragraph",
            segments: [
              {
                text: "For a broader view of my experience, see my ",
              },
              {
                text: "resume",
                href: "/Junhengswedesignresume.pdf",
              },
              { text: "." },
            ],
          },
        ],
      },
    ],
  },
  [BLOG_SLUGS.POMODORO_TIMER]: {
    slug: BLOG_SLUGS.POMODORO_TIMER,
    passwordProtected: false,
    title: "Pomodoro Timer, a UI Development Exercise",
    meta: ["2 Min Read", "Project"],
    cover: "/pomodoro/cover.png",
    coverCaption:
      "Junodoro — a Pomodoro timer built with layered CSS, Framer Motion, and no 3D library.",
    description:
      "How I designed an isometric Pomodoro timer in Figma, then built fake 3D depth with array-mapped layers, gradients, and grid textures in React, Tailwind CSS, and Framer Motion.",
    navigation: [
      {
        label: "Context",
        items: [{ id: "overview", label: "Overview" }],
      },
      {
        label: "Building the UI",
        items: [
          { id: "fake-3d", label: "Fake 3D without a library" },
          { id: "motion", label: "Motion and interaction" },
          { id: "sound", label: "Sound feedback" },
        ],
      },
      {
        label: "Logic",
        items: [
          { id: "settings", label: "Settings that reshape the UI" },
          { id: "deployment", label: "Deployment" },
        ],
      },
    ],
    sections: [
      {
        id: "overview",
        title: "Overview",
        blocks: [
          {
            type: "paragraph",
            segments: [
              {
                text: "This was a UI exercise: build a Pomodoro timer that feels physical and three-dimensional, without pulling in Three.js, react-parallax-tilt, or any other 3D library. I started in Figma with the Fast Isometric plugin to lock in the angle and proportions, then rebuilt the device in React with Tailwind CSS, plain JavaScript, and Framer Motion. Check out the results at ",
              },
              {
                text: "here",
                href: "https://junodoro-timer.vercel.app/",
              },
              { text: "." },
            ],
          },
          {
            type: "flow",
            caption: "How this project came together",
            steps: [
              "Design in Figma with Fast Isometric",
              "Build fake 3D depth with CSS layers",
              "Add motion, sound, and settings",
              "Deploy to Vercel",
            ],
          },
          {
            type: "graphic",
            src: "/pomodoro/timer-full.png",
            alt: "Junodoro timer showing focus mode at 25:00",
            caption:
              "The finished timer — isometric tilt, recessed display, and chunky 3D buttons.",
          },
        ],
      },
      {
        id: "fake-3d",
        title: "Fake 3D without a library",
        blocks: [
          {
            type: "paragraph",
            text: "The depth is an illusion. Instead of a mesh or canvas, I stack identical rounded rectangles and offset each one by 1px down and to the right. Sixteen layers on the main card, eight on each button, six on the side knob. At 60% opacity they read as a solid extrusion.",
          },
          {
            type: "code",
            language: "jsx",
            caption: "Sixteen shadow layers behind the timer card",
            code: `{Array.from({ length: 16 }, (_, i) => i + 1).map((d) => (
  <div
    key={d}
    className="absolute inset-0 rounded-xl bg-linear-to-r opacity-60 from-[#4C4C4C] to-black z-0"
    style={{ transform: \`translate(\${d}px, \${d}px)\` }}
  />
))}`,
          },
          {
            type: "paragraph",
            text: "Gradients sell the lighting. The card body uses a vertical gray-to-black gradient; buttons alternate orange-red or gray-white depending on variant. Semi-transparent white borders (`border-white/10`, `border-white/20`) catch light on the edges.",
          },
          {
            type: "paragraph",
            text: "For texture, a 2×2px CSS grid overlay sits on the display and buttons — two perpendicular linear gradients at low opacity. The screen also gets `shadow-inner` for a recessed look, blur orbs for specular highlights, and eighty 1px vertical lines mapped across the display to mimic scanlines.",
          },
          {
            type: "code",
            language: "jsx",
            caption: "2px grid texture overlay",
            code: `className="bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] opacity-20 absolute inset-0 [background-size:2px_2px]"`,
          },
        ],
      },
      {
        id: "motion",
        title: "Motion and interaction",
        blocks: [
          {
            type: "paragraph",
            text: "Framer Motion handles the ambient sway and the card's isometric skew. An outer wrapper bobs on an infinite `y: [0, -10, 0]` loop over 1.8 seconds. The inner card rests at `skewX: -10` with `perspective: 1000px` so the tilt reads as three-dimensional.",
          },
          {
            type: "code",
            language: "jsx",
            caption: "Infinite sway on the outer wrapper",
            code: `<motion.div
  animate={{ y: [0, -10, 0] }}
  transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
  style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
>`,
          },
          {
            type: "paragraph",
            text: "On every control click, `pulseCardSkew` fires: a fast snap to `skewX: -8`, then a spring back to `-10`. It gives the whole device a tactile wobble without being distracting.",
          },
          {
            type: "code",
            language: "javascript",
            caption: "Click pulse via useAnimationControls",
            code: `await cardSkewControls.start({
  skewX: -8,
  transition: { duration: 0.045, ease: [0.25, 0.8, 0.25, 1] },
});
await cardSkewControls.start({
  skewX: -10,
  transition: { type: "spring", stiffness: 100, damping: 10, mass: 0.28 },
});`,
          },
          {
            type: "paragraph",
            text: "Tailwind handles the button press-down separately. Each button sits offset with `translate-x-[-8px] translate-y-[-8px]` so it looks raised. On `:active`, `translate-x-0 translate-y-0` snaps it flush — like pushing a physical key into the chassis.",
          },
          {
            type: "code",
            language: "jsx",
            caption: "Raised button that presses down on click",
            code: `className="relative translate-x-[-8px] translate-y-[-8px] active:translate-x-0 active:translate-y-0"`,
          },
        ],
      },
      {
        id: "sound",
        title: "Sound feedback",
        blocks: [
          {
            type: "paragraph",
            text: "Every button tap plays a short click through the HTML Audio API. A separate alarm sound fires when a stage completes. Both respect a mute toggle stored in settings.",
          },
          {
            type: "code",
            language: "javascript",
            caption: "Click sound on every button press",
            code: `const playClickSound = useCallback(() => {
  if (settings.muteAllAudio) return;
  const audio = clickAudioRef.current;
  if (!audio) return;
  audio.currentTime = 0;
  void audio.play().catch(() => {});
}, [settings.muteAllAudio]);`,
          },
          {
            type: "paragraph",
            text: "The `Button` wrapper calls `playClickSound()` before `onClick`, so close, play/pause, reset, settings, apply, and mute all share the same feedback. Small detail, but it makes the interface feel like hardware.",
          },
        ],
      },
      {
        id: "settings",
        title: "Settings that reshape the UI",
        blocks: [
          {
            type: "paragraph",
            text: "The settings drawer lets you change focus length, short break, long break, and how many intervals before a long break. Those values don't just update a number — they rebuild the entire stage list and progress bar layout.",
          },
          {
            type: "code",
            language: "javascript",
            caption: "Stages derived from interval settings",
            code: `const stages = useMemo(() => {
  const nextStages = [];
  for (let i = 1; i <= settings.longBreakInterval; i += 1) {
    nextStages.push({
      label: "Focus",
      seconds: settings.pomodoroMinutes * 60,
    });
    const isLast = i === settings.longBreakInterval;
    nextStages.push({
      label: isLast ? "Long break" : "Short break",
      seconds: (isLast ? settings.longBreakMinutes : settings.shortBreakMinutes) * 60,
    });
  }
  return nextStages;
}, [settings]);`,
          },
          {
            type: "paragraph",
            text: "The progress bar maps one segment per stage. Each segment's flex weight is proportional to its duration (`flex: ${seconds} 1 0%`), so a 25-minute focus block is visually wider than a 5-minute break. The active segment fills with a linear 1-second width transition while the timer runs.",
          },
          {
            type: "definitions",
            items: [
              {
                label: "Focus",
                text: "Work interval in minutes; drives the main countdown and the largest progress segment.",
              },
              {
                label: "Intervals",
                text: "How many focus sessions before a long break; controls how many segments appear in the bar.",
              },
              {
                label: "Apply",
                text: "Normalizes input, saves to localStorage, resets to stage 0, and rebuilds the visible timer.",
              },
            ],
          },
        ],
      },
      {
        id: "deployment",
        title: "Deployment",
        blocks: [
          {
            type: "paragraph",
            segments: [
              { text: "Deployed with Vercel. Try it for yourself at " },
              {
                text: "here",
                href: "https://junodoro-timer.vercel.app/",
              },
              { text: "." },
            ],
          },
        ],
      },
    ],
  },
};

export function getBlogPost(slug) {
  return BLOG_POSTS[slug] ?? null;
}

export function getAllBlogSlugs() {
  return Object.keys(BLOG_POSTS);
}

export function getAllBlogPosts() {
  return Object.values(BLOG_POSTS);
}
