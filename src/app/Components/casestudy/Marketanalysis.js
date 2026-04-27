import P from "./P";

const Marketanalysis = ({ Title, Description, imagesrc, className }) => {
  return (
    <div
      className={`flex flex-col gap-[8px] p-[20px] w-[400px] border border-black/10 rounded-[4px] ${className}`}
    >
      <P className="font-medium!">{Title}</P>
      <P>{Description}</P>
      {imagesrc && <img src={imagesrc} alt={Title} />}
    </div>
  );
};

export default Marketanalysis;
