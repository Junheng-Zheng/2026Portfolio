import BlogCover from "./BlogCover";

export default function BlogHeader({ title, meta = [], cover, coverCaption }) {
  return (
    <header className="flex w-full flex-col gap-5 pb-1">
      {cover ? <BlogCover src={cover} caption={coverCaption} /> : null}
      <div className="flex w-full flex-col gap-3">
        <h1 className="text-[26px] leading-tight text-white md:text-[28px]">{title}</h1>
        {meta.length > 0 ? (
          <p className="text-[14px] leading-normal text-white/45">
            {meta.join(" | ")}
          </p>
        ) : null}
      </div>
    </header>
  );
}
