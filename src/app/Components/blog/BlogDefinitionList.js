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
              <span className="shrink-0 pt-px text-[14px] text-white/50">
                {index + 1}.
              </span>
            ) : null}
            <span className="text-[14px] leading-normal">
              {label ? (
                <>
                  <span className="font-semibold text-white">{index + 1}] </span>
                  <span className="font-semibold text-white">{label}:</span>{" "}
                  <span className="text-white/90">{text}</span>
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
