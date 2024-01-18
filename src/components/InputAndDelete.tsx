import { IconCross } from "../assets/images/IconCross";

interface InputAndDeleteProps {
  id: number;
  value: string;
  name: string;
  onChange: (id: number, value: string) => void;
  handleRemove: (id: number) => void;
}

const InputAndDelete = ({
  id,
  value,
  name,
  onChange,
  handleRemove,
}: InputAndDeleteProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(id, e.target.value);
  };

  return (
    <div className="w-full flex flex-row items-center pb-3" key={id}>
      <input
        type="text"
        defaultValue={value}
        name={name}
        onChange={handleChange}
        className={`border rounded-md w-full h-10 px-2 focus:border-main-purple dark:bg-dark-grey dark:border-lines-dark border-lines-light hover:border-main-purple dark:hover:border-main-purple`}
      ></input>
      <button
        type="button"
        className="group flex justify-center items-center px-2 h-10 hover:cursor-pointer"
        onClick={() => handleRemove(id)}
      >
        <IconCross className="fill-[#828FA3] group-hover:fill-[#EA5555]" />
      </button>
    </div>
  );
};

export default InputAndDelete;
