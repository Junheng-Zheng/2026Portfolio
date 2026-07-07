export default function BlogCode({ code, language, caption }) {
  return (
    <figure className="flex w-full flex-col gap-2">
      <div className="overflow-x-auto rounded border border-white/10 bg-white/[0.04]">
        {language ? (
          <div className="border-b border-white/10 px-4 py-2 text-[11px] uppercase tracking-wide text-white/40">
            {language}
          </div>
        ) : null}
        <pre className="p-4 text-[13px] leading-relaxed text-white/80">
          <code>{code}</code>
        </pre>
      </div>
      {caption ? (
        <figcaption className="text-[12px] leading-snug text-white/45">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
