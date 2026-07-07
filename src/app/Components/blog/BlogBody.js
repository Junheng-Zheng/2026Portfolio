export default function BlogBody({ children, className = "" }) {
  return (
    <div
      className={`flex flex-col gap-5 text-[14px] leading-normal text-white/90 ${className}`}
    >
      {children}
    </div>
  );
}

export function BlogParagraph({ children, segments }) {
  if (segments?.length) {
    return (
      <p>
        {segments.map((segment, index) =>
          segment.href ? (
            <a
              key={index}
              href={segment.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-white/30 underline-offset-[2px] transition-opacity hover:opacity-80"
            >
              {segment.text}
            </a>
          ) : (
            <span key={index}>{segment.text}</span>
          ),
        )}
      </p>
    );
  }

  return <p>{children}</p>;
}

export function BlogList({ items, ordered = false }) {
  const ListTag = ordered ? "ol" : "ul";

  return (
    <ListTag className="flex list-none flex-col gap-2 pl-0">
      {items.map((item, index) => (
        <li key={index} className="flex gap-2">
          {ordered ? (
            <span className="shrink-0 text-white/60">{index + 1}.</span>
          ) : null}
          <span>{item}</span>
        </li>
      ))}
    </ListTag>
  );
}
