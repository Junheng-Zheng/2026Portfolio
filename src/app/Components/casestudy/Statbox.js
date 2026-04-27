const Statbox = ({ title, description }) => {
  return (
    <div className="p-[20px] w-[400px] h-fit border  border-black/10  gap-[8px] flex flex-col rounded-[4px]">
      <h3 className="text-[40px] text-black/30 font-bold">{title}</h3>
      <p className="text-[14px] font-light">{description}</p>
    </div>
  );
};

export default Statbox;
