"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export function getScrollOffset() {
  return 120;
}

export function useActiveSection(navigation = []) {
  const itemIds = useMemo(
    () => navigation.flatMap((group) => group.items.map((item) => item.id)),
    [navigation]
  );

  const [activeId, setActiveId] = useState(() => itemIds[0] ?? "");
  const activeIdRef = useRef(activeId);

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    if (itemIds.length === 0) return;

    const syncActiveSection = () => {
      const offset = getScrollOffset();
      const scrollPosition = window.scrollY + offset;

      let currentId = itemIds[0];
      for (const id of itemIds) {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= scrollPosition) {
          currentId = id;
        }
      }

      if (currentId !== activeIdRef.current) {
        setActiveId(currentId);
      }
    };

    syncActiveSection();
    window.addEventListener("scroll", syncActiveSection, { passive: true });
    window.addEventListener("resize", syncActiveSection);

    return () => {
      window.removeEventListener("scroll", syncActiveSection);
      window.removeEventListener("resize", syncActiveSection);
    };
  }, [itemIds]);

  const scrollToSection = useCallback((event, id) => {
    event?.preventDefault();
    const section = document.getElementById(id);
    if (!section) return;

    const top =
      section.getBoundingClientRect().top + window.scrollY - getScrollOffset() + 16;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveId(id);
  }, []);

  return { itemIds, activeId, setActiveId, scrollToSection };
}
