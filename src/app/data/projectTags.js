export const ProjectTag = {
  COMING_SOON: "COMING_SOON",
  UNDER_NDA: "UNDER_NDA",
  DESIGN_SYSTEM: "DESIGN_SYSTEM",
  INTERNAL_TOOLS: "INTERNAL_TOOLS",
  UI_DEVELOPMENT: "UI_DEVELOPMENT",
};

export const PROJECT_TAG_TYPES = {
  [ProjectTag.COMING_SOON]: {
    label: "Coming Soon",
    className: "bg-[#141414] text-white",
  },
  [ProjectTag.UNDER_NDA]: {
    label: "This is under NDA",
    className: "bg-[#141414] text-white",
  },
  [ProjectTag.DESIGN_SYSTEM]: {
    label: "Design System",
    className: "bg-[#a855f7] text-white",
  },
  [ProjectTag.INTERNAL_TOOLS]: {
    label: "Internal Tools",
    className: "bg-[#f97316] text-white",
  },
  [ProjectTag.UI_DEVELOPMENT]: {
    label: "UI Development",
    className: "bg-[#ec4899] text-white",
  },
};

export function resolveProjectTags(tags = []) {
  return tags
    .map((tag) => {
      const config = PROJECT_TAG_TYPES[tag];
      if (!config) return null;

      return {
        type: tag,
        label: config.label,
        className: config.className,
      };
    })
    .filter(Boolean);
}
