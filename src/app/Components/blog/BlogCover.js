export default function BlogCover({ src, caption }) {
  return (
    <figure className="flex w-full flex-col gap-2">
      <div className="aspect-[4/3] w-full bg-white/[0.02]">
        {src ? (
          <img
            src={src}
            alt=""
            className="aspect-[4/3] w-full object-cover"
          />
        ) : null}
      </div>
      {caption ? (
        <figcaption className="text-[12px] leading-snug text-white/45">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
