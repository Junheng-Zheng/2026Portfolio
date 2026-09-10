"use client";

import Image from "next/image";

function InlineTitleIcon({
  src,
  alt = "",
  className = "",
  overlap = false,
  sizeClassName = "size-7 md:size-8",
}) {
  return (
    <span
      className={`relative inline-block shrink-0 overflow-hidden rounded-full align-middle ${sizeClassName} ${
        overlap ? "-ml-1.5 md:-ml-2" : ""
      } ${className}`}
      aria-hidden
    >
      <Image src={src} alt={alt} fill className="rounded-full object-contain" />
    </span>
  );
}

export default function WorkTitleWithIcons({
  title,
  titleParts,
  iconSizeClassName = "size-7 md:size-8",
}) {
  if (!titleParts?.length) {
    return title;
  }

  return (
    <>
      {titleParts.map((part, index) => {
        if (part.type === "text") {
          return <span key={`text-${index}`}>{part.value}</span>;
        }

        if (part.type === "icons") {
          return (
            <span
              key={`icons-${index}`}
              className="inline-flex w-fit items-center align-middle"
              aria-hidden
            >
              {part.icons.map((icon, iconIndex) => (
                <InlineTitleIcon
                  key={`${icon.src}-${iconIndex}`}
                  {...icon}
                  overlap={iconIndex > 0}
                  sizeClassName={iconSizeClassName}
                />
              ))}
            </span>
          );
        }

        return null;
      })}
    </>
  );
}
