"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

const NAV_LINK_BASE =
  "inline-flex rounded px-4 py-1 text-[14px] transition-colors active:bg-[#1a1a1a]";

function isNavActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function PortfolioNav() {
  const pathname = usePathname();

  return (
    <nav className="flex w-fit gap-1 rounded bg-[#262424] px-2 py-2">
      {NAV_LINKS.map((link) => {
        const isActive = isNavActive(pathname, link.href);

        return (
          <Link
            key={link.label}
            href={link.href}
            className={`${NAV_LINK_BASE} ${
              isActive
                ? "bg-[#1a1a1a] text-white"
                : "bg-transparent text-white/80 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
