const Videolist = ({ videos, description }) => {
  return (
    <div className="flex w-full flex-col items-center gap-[8px]">
      <div className="grid grid-cols-3 md:grid-cols-6  w-full gap-[8px]">
        {videos.map((video) => (
          <video
            key={video}
            src={video}
            autoPlay
            muted
            loop
            playsInline
            className=" object-cover rounded-[4px]"
          />
        ))}
      </div>
      <em className="text-[12px] max-w-2/3 text-center font-light">
        {description}
      </em>
    </div>
  );
};

export default Videolist;
