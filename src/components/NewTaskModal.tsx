import { useState } from "react";

interface NewTaskModalProps {
  isOpen: boolean;
  isDarkTheme: boolean;
}

const NewTaskModal = ({ isOpen, isDarkTheme }: NewTaskModalProps) => {
  const [subtasks, setSubtasks] = useState<string[]>([""]);
  const [isMenuDown, setIsMenuDown] = useState(false);

  const handleAddSubtask = () => {
    setSubtasks([...subtasks, ""]);
  };

  const handleSubtaskChange = (index: number, value: string) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index] = value;
    setSubtasks(updatedSubtasks);
  };

  const handleRemoveSubtask = (index: number) => {
    const updatedSubtasks = subtasks.filter((_, i) => i !== index);
    setSubtasks(updatedSubtasks);
  };

  const handleIsDropedDown = (isMenuDown: boolean) => {
    setIsMenuDown(!isMenuDown);
  };

  const statusCodes = ["Todo", "Doing", "Done"];

  return (
    <div
      className={`${
        isOpen ? "" : "hidden"
      } absolute px-8 top-[175px] left-[480px] w-[480px] ${
        isDarkTheme ? "bg-dark-grey text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-heading-l pt-8">Add New Task</h1>
      <form className="flex flex-col pt-6">
        <div className="pb-6">
          <label className="text-body-m text-medium-grey pb-2">Title</label>
          <input
            type="text"
            placeholder=""
            className={`border rounded-md w-full h-10 px-2 focus:outline-main-purple ${
              isDarkTheme
                ? "bg-dark-grey border-lines-dark"
                : "border-lines-light"
            }`}
          ></input>
        </div>
        <div className="pb-6">
          <label className="text-body-m text-medium-grey pb-2">
            Description
          </label>
          <input
            type="textarea"
            placeholder=""
            className={`border rounded-md w-full h-[112px] px-2 focus:outline-main-purple ${
              isDarkTheme
                ? "bg-dark-grey border-lines-dark"
                : "border-lines-light"
            }`}
          ></input>
        </div>
        <div className="">
          <label className="text-body-m text-medium-grey pb-2">Subtasks</label>
          {subtasks.map((subtask, index) => (
            <div className="flex flex-row items-center pb-3" key={index}>
              <input
                type="text"
                value={subtask}
                className={`border rounded-md w-full h-10 px-2 focus:outline-main-purple ${
                  isDarkTheme
                    ? "bg-dark-grey border-lines-dark"
                    : "border-lines-light"
                }`}
                onChange={(e) => handleSubtaskChange(index, e.target.value)}
              ></input>
              <div className="group pl-4 hover:cursor-pointer">
                <svg
                  className="w-[14px] h-[15px]"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => handleRemoveSubtask(index)}
                >
                  <g
                    className="fill-[#828FA3] group-hover:fill-[#EA5555]"
                    fill-rule="evenodd"
                  >
                    <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                    <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
                  </g>
                </svg>
              </div>
            </div>
          ))}
          <button
            className={`w-full h-[40px] border border-none text-main-purple font-bold rounded-full text-body-l ${
              isDarkTheme
                ? "bg-white"
                : "bg-light-grey hover:bg-main-purple-hover hover:bg-opacity-25"
            }`}
            onClick={handleAddSubtask}
            type="button"
          >
            + Add New Subtask
          </button>
        </div>
        <div className="flex flex-col pt-6">
          <label className="text-body-m text-medium-grey pb-2">Status</label>
          <button
            id="dropdownButton"
            data-dropdown-toggle="dropdown"
            className="p-4 text-black text-body-l w-full h-[40px] border border-lines-light rounded-md focus:outline-main-purple flex items-center justify-between"
            type="button"
            onClick={() => handleIsDropedDown(isMenuDown)}
          >
            Todo{" "}
            {isMenuDown ? (
              <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
                <path
                  stroke="#635FC7"
                  stroke-width="2"
                  fill="none"
                  d="M9 6 5 2 1 6"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-[10px] h-[7px]"
              >
                <path
                  stroke="#635FC7"
                  stroke-width="2"
                  fill="none"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            )}
          </button>
          <div
            id="dropdown"
            className="z-10 hidden bg-white rounded-b-lg shadow-md w-full text-body-l"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              {statusCodes.map((status) => (
                <li value={status}>
                  <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    {status}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full mb-8 mt-6">
          <button className="w-full h-[40px] border border-none bg-main-purple hover:bg-main-purple-hover text-white font-bold rounded-full text-body-l">
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewTaskModal;
