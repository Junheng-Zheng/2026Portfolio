const Imageandvideo = ({ image, video, description }) => {
  return (
    <div className="w-full flex flex-col items-center gap-[8px] justify-center">
      <div className="flex flex-row  gap-[20px] items-center md:w-2/3 h-fit justify-center">
        <div className="md:w-1/3 h-fit">
          <video
            src={video}
            autoPlay
            muted
            loop
            playsInline
            className="w-full object-cover  rounded-[4px]"
          />
        </div>
        <div className="md:flex-1">
          <img src={image} className="w-full object-contain md:flex-1 " />
        </div>
      </div>
      <em className="text-[12px] max-w-2/3 text-center font-light">
        {description}
      </em>
    </div>
  );
};

export default Imageandvideo;
