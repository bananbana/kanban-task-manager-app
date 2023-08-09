import { ReactNode } from "react";
import { Data } from "../App";

interface ColumnProps {
  boardData: Data;
  boardId: string | null;
  children: ReactNode;
  openTask: (column: ColumnData, task: TaskData) => void;
}

export interface ColumnData {
  name: string;
  tasks: TaskData[];
}

export interface TaskData {
  title: string;
  description: string;
  status: string;
  subtasks: SubtaskData[];
}

export interface SubtaskData {
  title: string;
  isCompleted: boolean;
}

const Column = ({ boardData, boardId, children, openTask }: ColumnProps) => {
  const openedBoard = boardData.boards.find(
    (board) => board.boardId === boardId
  );

  return (
    <div className="flex-row flex h-full">
      {openedBoard?.columns.map((column, columnIndex) => {
        return (
          <div className="flex flex-col pt-5">
            <div key={columnIndex} className="flex flex-row pb-6">
              <img
                src="/src/assets/images/icon-list-bullet.svg"
                className="pr-3"
              ></img>
              <span className="text-medium-grey text-heading-s">
                {column.name.toUpperCase()} ({column.tasks.length})
              </span>
            </div>
            <div
              className={`w-[280px] mb-6 mr-6 h-full ${
                column.tasks.length > 0
                  ? ""
                  : "border-dashed border-2 rounded-lg border-medium-grey"
              }`}
            >
              {column.tasks.map((task, taskIndex) => (
                <div
                  key={taskIndex}
                  className={`dark:bg-dark-grey bg-white shadow-[0px_4px_6px_0px_rgba(54,78,126,0.1)] rounded-lg py-6 px-4 mb-5 flex flex-col hover:cursor-pointer`}
                  onClick={() => openTask(column, task)}
                >
                  <p className="text-heading-m mb-2 group">{task.title}</p>
                  <p className="text-body-m text-medium-grey">
                    {
                      task.subtasks.filter((subtask) => subtask.isCompleted)
                        .length
                    }{" "}
                    of {task.subtasks.length}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
      <div className="h-full pt-[60px] overflow-visible pb-6">{children}</div>
    </div>
  );
};

export default Column;
