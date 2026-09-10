const MEDIA_ROUND_CLASS = "overflow-hidden rounded-[16px] md:rounded-[20px]";

export default function BlogGraphic({ src, alt = "", caption }) {
  if (!src) return null;

  return (
    <figure className="flex w-full flex-col gap-2">
      <div className={`aspect-[4/3] w-full bg-white/[0.02] ${MEDIA_ROUND_CLASS}`}>
        <img
          src={src}
          alt={alt}
          className="aspect-[4/3] h-full w-full object-cover"
        />
      </div>
      {caption ? (
        <figcaption className="text-[12px] leading-snug text-white/45">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
