export default function BlogSubsection({ title, children }) {
  return (
    <div className="flex w-full flex-col gap-3 not-first:mt-4">
      <h3 className="text-[15px] leading-normal text-white/85 md:text-[16px]">
        {title}
      </h3>
      <div className="flex flex-col gap-5 text-[14px] leading-normal text-white/90">
        {children}
      </div>
    </div>
  );
}
