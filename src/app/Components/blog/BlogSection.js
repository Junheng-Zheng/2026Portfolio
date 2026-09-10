export default function BlogSection({ id, title, children, className = "" }) {
  return (
    <section
      id={id}
      className={`flex w-full scroll-mt-28 flex-col gap-5 ${className}`}
    >
      <h2 className="text-[22px] font-medium leading-[1.2] text-white/85 md:text-[26px]">
        {title}
      </h2>
      {children}
    </section>
  );
}
