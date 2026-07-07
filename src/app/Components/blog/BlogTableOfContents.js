"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useActiveSection } from "./useActiveSection";

export default function BlogTableOfContents({ navigation = [] }) {
  const { itemIds, activeId, scrollToSection } = useActiveSection(navigation);
  const [indicator, setIndicator] = useState({ top: 0, height: 0 });
  const trackRef = useRef(null);
  const linkRefs = useRef(new Map());

  const updateIndicator = (id) => {
    const link = linkRefs.current.get(id);
    const track = trackRef.current;
    if (!link || !track) return;

    const trackTop = track.getBoundingClientRect().top;
    const linkRect = link.getBoundingClientRect();
    const top = linkRect.top - trackTop;
    const height = linkRect.height;

    setIndicator((prev) => {
      if (prev.top === top && prev.height === height) return prev;
      return { top, height };
    });
  };

  useLayoutEffect(() => {
    updateIndicator(activeId);
  }, [activeId, itemIds]);

  useLayoutEffect(() => {
    const onResize = () => updateIndicator(activeId);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeId]);

  if (itemIds.length === 0) return null;

  return (
    <nav aria-label="On this page" className="w-full">
      <div ref={trackRef} className="relative flex flex-col gap-8">
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 bottom-0 left-0 w-px bg-white/15"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 w-0.5 bg-white transition-[transform,height] duration-300 ease-out"
          style={{
            height: indicator.height,
            transform: `translateY(${indicator.top}px)`,
          }}
        />

        {navigation.map((group) => (
          <div key={group.label} className="flex flex-col gap-2">
            <p className="pl-5 text-[12px] font-medium text-white/40">
              {group.label}
            </p>
            <ul className="flex flex-col gap-2.5 pl-9">
              {group.items.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <li key={item.id}>
                    <a
                      ref={(node) => {
                        if (node) linkRefs.current.set(item.id, node);
                        else linkRefs.current.delete(item.id);
                      }}
                      href={`#${item.id}`}
                      onClick={(event) => scrollToSection(event, item.id)}
                      className={`block text-[13px] leading-snug transition-colors ${
                        isActive ? "text-white" : "text-white/50 hover:text-white/75"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
