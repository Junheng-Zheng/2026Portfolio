export default function BlogDefinitionList({ items, ordered = false }) {
  const ListTag = ordered ? "ol" : "ul";

  return (
    <ListTag className="flex list-none flex-col gap-3 pl-0">
      {items.map((item, index) => {
        const label = typeof item === "string" ? null : item.label;
        const text = typeof item === "string" ? item : item.text;

        return (
          <li key={label ?? index} className="flex gap-2">
            {ordered && !label ? (
              <span className="shrink-0 pt-px text-[16px] text-white/50">
                {index + 1}.
              </span>
            ) : null}
            <span className="text-[16px] leading-normal text-white/80">
              {label ? (
                <>
                  <span className="font-semibold">
                    {index + 1}]{" "}
                  </span>
                  <span className="font-semibold">{label}:</span> {text}
                </>
              ) : (
                text
              )}
            </span>
          </li>
        );
      })}
    </ListTag>
  );
}
