export default function BlogLayout({ children }) {
  return (
    <article className="min-h-dvh bg-[#161616] text-white">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-16 md:px-12 md:py-24">
        {children}
      </div>
    </article>
  );
}
