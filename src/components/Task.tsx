import { useRef } from "react";
import { Data } from "../App";
import { SubtaskData, TaskData } from "./Column";
import DotDropDown from "./DotDropDown";
import DropdownMenu from "./DropDownMenu";
import useCloseModal from "../assets/useCloseModal";

interface TaskProps {
  openTaskDotMenu: () => void;
  taskDotMenuOpen: boolean;
  taskData: TaskData | undefined;
  boardData: Data;
  boardId: string | null;
  onClose: () => void;
  closeDotMenu: () => void;
}

const Task = ({
  openTaskDotMenu,
  taskDotMenuOpen,
  taskData,
  boardData,
  boardId,
  onClose,
  closeDotMenu,
}: TaskProps) => {
  const openedBoard = boardData.boards.find(
    (board) => board.boardId === boardId
  );
  const modalRef = useRef<HTMLDivElement>(null);

  useCloseModal(modalRef, onClose);

  return (
    <div
      ref={modalRef}
      className={`absolute z-10 flex flex-col w-[480px] justify-center py-8 px-8 rounded-lg dark:bg-dark-grey bg-white`}
    >
      <div
        className={`dark:text-white flex flex-row justify-between w-full items-center`}
      >
        <p className="mr-6 text-heading-l w-full">{taskData?.title}</p>
        <button
          className={`relative py-2 px-2 mr-2 flex justify-center items-center rounded-full dark:hover:bg-very-dark-grey hover:bg-lines-light`}
          onClick={() => openTaskDotMenu()}
        >
          <img
            className="h-5 w-[6px]"
            src="/src/assets/images/icon-vertical-ellipsis.svg"
          ></img>
        </button>
        {taskDotMenuOpen && (
          <div className="absolute left-[353px] top-24">
            <DotDropDown
              onClose={closeDotMenu}
              topContent="Edit Task"
              bottomContent="Delete Task"
            ></DotDropDown>
          </div>
        )}
      </div>
      <span className="text-body-l text-medium-grey my-6">
        {taskData?.description ? taskData.description : "No description"}
      </span>
      <div className="flex flex-col mb-6">
        <span className="text-body-m text-medium-grey">
          Subtasks (
          {taskData?.subtasks.filter((subtask) => subtask.isCompleted).length}{" "}
          of {taskData?.subtasks.length})
        </span>
        <div>
          {taskData?.subtasks.map((subtask) => (
            <div
              className={`flex flex-row justify-start items-center py-3 px-3 my-2 rounded-md hover:bg-main-purple hover:bg-opacity-25 dark:bg-very-dark-grey dark:text-white bg-light-grey`}
            >
              <input
                type="checkbox"
                checked={subtask.isCompleted}
                className="checked:bg-main-purple rounded-sm mr-3 border-lines-light"
              ></input>
              <p
                className={`text-body-m flex flex-wrap w-full ${
                  subtask.isCompleted ? "text-medium-grey line-through" : ""
                }`}
              >
                {subtask.title}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <DropdownMenu
          label="Current Status"
          initialValue={taskData?.status}
          menuOptions={openedBoard?.columns.map((column, index) => (
            <li key={index}>
              <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                {column.name}
              </a>
            </li>
          ))}
        ></DropdownMenu>
      </div>
    </div>
  );
};

export default Task;
