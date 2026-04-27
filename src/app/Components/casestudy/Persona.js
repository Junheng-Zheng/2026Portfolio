import P from "../P";

const Persona = ({ name, age, gender, description, imagesrc }) => {
  return (
    <div className="flex flex-col gap-[8px] p-[20px] border border-black/10 rounded-[4px]">
      <img
        src={imagesrc}
        className="w-[40px] aspect-square border object-cover object-center border-black/10 bg-black/10 rounded-full"
      />
      <P>
        <span className="font-bold!">{name}</span> | <em>Age: {age}</em> |{" "}
        <em>Gender: {gender}</em>
      </P>
      <P>{description}</P>
    </div>
  );
};

export default Persona;
