export default function BlogLayout({ children }) {
  return (
    <article className="font-body min-h-dvh bg-[#141414] text-white">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-16 md:px-12 md:py-24">
        {children}
      </div>
    </article>
  );
}
