import { IconDarkTheme } from "../assets/images/IconDarkTheme";
import { IconLightTheme } from "../assets/images/IconLightTheme";

interface ToggleProps {
  value: boolean;
  toggleValue: () => void;
}

const Toggle = ({ value, toggleValue }: ToggleProps) => {
  return (
    <div
      className={`w-[251px] h-[48px] rounded-md flex flex-row justify-center items-center dark:bg-very-dark-grey bg-light-grey`}
    >
      <span className="mr-[23px]">
        <IconLightTheme />
      </span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={value}
          onChange={() => toggleValue()}
        />
        <div className="w-[40px] h-[20px] bg-main-purple hover:bg-main-purple-hover peer-checked:hover:bg-main-purple-hover peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[20px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-main-purple after:rounded-full after:h-[16px] after:w-[16px] after:transition-all peer-checked:bg-main-purple"></div>
      </label>
      <span className="ml-[23px]">
        <IconDarkTheme />
      </span>
    </div>
  );
};

export default Toggle;
