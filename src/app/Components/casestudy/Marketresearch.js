import P from "./P";
import { Check, CheckCircle, Star, X } from "lucide-react";

const Marketresearch = ({ appName, rating, pros, cons, imagesrc }) => {
  return (
    <div className="flex flex-col p-[20px] gap-3 w-[400px] bg-white rounded-lg">
      <div className="flex items-center gap-[8px]">
        {/* <img
          src={imagesrc}
          className="w-[40px] aspect-square border object-cover border-black/10 bg-black/10 rounded-full"
        /> */}
        <P className=" flex gap-1">
          <span className="font-bold!">{appName}</span> |{" "}
          <em className="flex items-center gap-2">
            {rating}/5 <Star className="w-3 fill-amber-400 h-3" />
          </em>
        </P>
      </div>
      <div className="hidden xl:block w-full h-[1px] bg-black/10"></div>
      <div className="flex flex-col gap-2  ">
        {pros.map((pro, index) => (
          <div key={index} className="flex items-center gap-2">
            <Check className="w-4 h-4  rounded-full" />
            <P className="flex-1">{pro}</P>
          </div>
        ))}
      </div>
      <div className="hidden xl:block w-full h-[1px] bg-black/10"></div>
      <div className="flex flex-col gap-2">
        {cons.map((con, index) => (
          <div key={index} className="flex items-center gap-2">
            <X className="w-4 h-4  rounded-full" />
            <P className="flex-1">{con}</P>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketresearch;
