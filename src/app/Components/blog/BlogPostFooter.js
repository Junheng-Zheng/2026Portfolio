"use client";

import Link from "next/link";

export default function BlogPostFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const linkClass =
    "text-[14px] text-white/60 underline decoration-white/30 underline-offset-2 transition-opacity hover:opacity-80";

  return (
    <footer className="flex flex-col gap-4 border-t border-white/10 pt-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
        <Link href="/" className={linkClass}>
          Back to home
        </Link>
        <button type="button" onClick={scrollToTop} className={`${linkClass} text-left`}>
          Back to top
        </button>
        <a
          href="https://www.linkedin.com/in/junhengzheng/"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          Contact
        </a>
      </div>
    </footer>
  );
}
