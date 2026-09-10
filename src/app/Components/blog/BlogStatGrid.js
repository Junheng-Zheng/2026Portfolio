export default function BlogStatGrid({ stats, columns = 2 }) {
  const gridClass =
    columns === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2";

  return (
    <div className={`grid w-full gap-3 ${gridClass}`}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex h-[120px] flex-col justify-between gap-1 rounded-[16px] border border-white/10 bg-white/[0.03] px-4 py-3 md:rounded-[20px]"
        >
          <span className="text-[20px] leading-tight text-white">
            {stat.value}
          </span>
          <span className="text-[14px] leading-normal text-white/55">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
