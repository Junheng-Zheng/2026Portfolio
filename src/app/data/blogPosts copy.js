export const BLOG_SLUGS = {
  IBM_RESEARCH: "swe-design-ibm-research",
};

export const BLOG_POSTS = {
  [BLOG_SLUGS.IBM_RESEARCH]: {
    slug: BLOG_SLUGS.IBM_RESEARCH,
    title: "Design Engineering @ IBM Research",
    meta: ["10 Min Read", "Internship"],
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
