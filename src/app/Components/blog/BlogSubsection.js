export default function BlogSubsection({ title, children }) {
  return (
    <div className="flex w-full flex-col gap-5">
      <h3 className="text-[15px] leading-normal text-white/85 md:text-[16px]">
        {title}
      </h3>
      <div className="flex flex-col gap-4 text-[16px] leading-normal text-white/80">
        {children}
      </div>
    </div>
  );
}
