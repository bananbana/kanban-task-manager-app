import { useState, useRef, useEffect } from "react";
import { Data } from "../App";
import DropdownMenu from "./DropDownMenu";
import useCloseModal from "../assets/useCloseModal";

interface NewTaskModalProps {
  onClose: () => void;
  boardData: Data;
  boardId: string | null;
}

const NewTaskModal = ({ onClose, boardData, boardId }: NewTaskModalProps) => {
  const [subtasks, setSubtasks] = useState<string[]>([""]);
  const modalRef = useRef<HTMLDivElement>(null);

  useCloseModal(modalRef, onClose);

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

  const openedBoard = boardData.boards.find(
    (board) => board.boardId === boardId
  );

  return (
    <div
      ref={modalRef}
      className={`px-8 absolute z-10 rounded-lg w-[480px] overflow-visible dark:bg-dark-grey dark:text-white bg-white text-b`}
    >
      <p className="text-heading-l pt-8">Add New Task</p>
      <div className="flex flex-col pt-6">
        <div className="pb-6">
          <label className="text-body-m text-medium-grey pb-2">Title</label>
          <input
            type="text"
            placeholder=""
            className={`border rounded-md w-full h-10 px-2 focus:outline-main-purple dark:bg-dark-grey dark:border-lines-dark border-lines-light`}
          ></input>
        </div>
        <div className="pb-6">
          <label className="text-body-m text-medium-grey pb-2">
            Description
          </label>
          <input
            type="textarea"
            placeholder=""
            className={`border rounded-md w-full h-[112px] px-2 focus:outline-main-purple dark:bg-dark-grey dark:border-lines-dark border-lines-light`}
          ></input>
        </div>
        <div className="">
          <label className="text-body-m text-medium-grey pb-2">Subtasks</label>
          {subtasks.map((subtask, index) => (
            <div className="flex flex-row items-center pb-3" key={index}>
              <input
                type="text"
                value={subtask}
                className={`border rounded-md w-full h-10 px-2 focus:outline-main-purple dark:bg-dark-grey dark:border-lines-dark border-lines-light`}
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
                    fillRule="evenodd"
                  >
                    <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                    <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
                  </g>
                </svg>
              </div>
            </div>
          ))}
          <button
            className={`w-full h-[40px] border border-none text-main-purple font-bold rounded-full text-body-l dark:bg-white bg-light-grey hover:bg-main-purple-hover hover:bg-opacity-25`}
            onClick={handleAddSubtask}
            type="button"
          >
            + Add New Subtask
          </button>
        </div>
        <DropdownMenu
          label="Status"
          initialValue={openedBoard?.columns[0].name}
          menuOptions={openedBoard?.columns.map((column, index) => (
            <li key={index}>
              <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                {column.name}
              </a>
            </li>
          ))}
        ></DropdownMenu>
        <div className="w-full mb-8 mt-6">
          <button className="w-full h-[40px] border border-none bg-main-purple hover:bg-main-purple-hover text-white font-bold rounded-full text-body-l">
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewTaskModal;
