import { ReactNode, useState } from "react";

interface DropdownMenuProps {
  label: string;
  initialValue: string | undefined;
  menuOptions: ReactNode;
}

const DropdownMenu = ({
  label,
  initialValue,
  menuOptions,
}: DropdownMenuProps) => {
  const [isMenuDown, setIsMenuDown] = useState(false);
  const handleIsDroppedDown = (isMenuDown: boolean) => {
    setIsMenuDown(!isMenuDown);
  };

  return (
    <div className="flex flex-col pt-6 relative">
      <label className="text-body-m text-medium-grey pb-2">{label}</label>
      <button
        id="dropdownButton"
        data-dropdown-toggle="dropdown"
        className="p-4 text-body-l w-full h-[40px] border border-lines-light dark:border-lines-dark rounded-md focus:border-main-purple dark:focus:border-main-purple flex items-center justify-end"
        type="button"
        onClick={() => handleIsDroppedDown(isMenuDown)}
      >
        <p className="w-full flex justify-start text-black dark:text-white">
          {initialValue}
        </p>
        {isMenuDown ? (
          <div className="">
            <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
              <path
                stroke="#635FC7"
                strokeWidth="2"
                fill="none"
                d="M9 6 5 2 1 6"
              />
            </svg>
          </div>
        ) : (
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[10px] h-[7px]"
            >
              <path
                stroke="#635FC7"
                strokeWidth="2"
                fill="none"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </div>
        )}
      </button>
      {isMenuDown && menuOptions ? (
        <div
          id="dropdown"
          className="absolute bg-white dark:bg-very-dark-grey rounded-lg shadow-md text-body-l top-24 w-[416px]"
        >
          <ul
            className="py-2 text-sm text-black dark:text-medium-grey"
            aria-labelledby="dropdownDefaultButton"
            onClick={() => setIsMenuDown(false)}
          >
            {menuOptions}
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default DropdownMenu;
