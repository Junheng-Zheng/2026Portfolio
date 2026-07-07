export default function BlogSection({ id, title, children, className = "" }) {
  return (
    <section
      id={id}
      className={`flex w-full scroll-mt-28 flex-col gap-4 ${className}`}
    >
      <h2 className="text-[18px] leading-normal text-white md:text-[20px]">{title}</h2>
      <div className="flex flex-col gap-5">{children}</div>
    </section>
  );
}
