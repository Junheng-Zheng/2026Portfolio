import { X } from "lucide-react";

export default function BlogIssueList({ items }) {
  return (
    <div className="flex w-full flex-col gap-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex  flex-col justify-between border border-red-500/20 bg-red-500/4 px-4 py-3"
        >
          {/* <span className="text-[14px] leading-none text-white/45">
            {index + 1}.
          </span> */}
          <div className="flex items-start gap-2 text-red-400">
            <X
              strokeWidth={1.5}
              size={16}
              className="shrink-0 translate-y-0.5"
              aria-hidden
            />
            <p className="text-[14px] leading-snug">{item}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
