const MEDIA_ROUND_CLASS = "overflow-hidden rounded-[16px] md:rounded-[20px]";

export default function BlogCover({ src, caption }) {
  return (
    <figure className="flex w-full flex-col gap-2">
      <div className={`aspect-[4/3] w-full bg-white/[0.02] ${MEDIA_ROUND_CLASS}`}>
        {src ? (
          <img
            src={src}
            alt=""
            className="aspect-[4/3] h-full w-full object-cover"
          />
        ) : null}
      </div>
      {caption ? (
        <figcaption className="text-[14px] leading-snug text-white/45">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
