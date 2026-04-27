const Captionimage = ({ src, children, alt, className }) => {
  return (
    <div className="flex flex-col items-center gap-[8px] justify-center">
      <img
        src={src}
        alt={alt}
        className={`w-full 2xl:max-h-[400px] object-cover ${className}`}
      />
      <em className="text-[12px] font-light">{children}</em>
    </div>
  );
};
export default Captionimage;
