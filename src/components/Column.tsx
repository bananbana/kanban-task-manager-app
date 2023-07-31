import { Data } from "../App";

interface ColumnProps {
  boardData: Data;
  boardId: string | null;
  isDarkTheme: boolean;
}

const Column = ({ boardData, boardId, isDarkTheme }: ColumnProps) => {
  const openedBoard = boardData.boards.find(
    (board) => board.boardId === boardId
  );

  return (
    <div className="flex-row flex overflow-auto">
      {openedBoard?.columns.map((column) => {
        return (
          <div className="w-[280px]">
            <div className="flex-row flex  overflow-scroll">
              <img
                src="/src/assets/images/icon-list-bullet.svg"
                className="pr-3"
              ></img>
              <span className="text-medium-grey text-heading-s">
                {column.name.toUpperCase()} ({column.tasks.length})
              </span>
            </div>
            {column.tasks.map((task) => (
              <div
                className={`${
                  isDarkTheme ? "bg-dark-grey" : "bg-white"
                } shadow-[0px_4px_6px_0px_rgba(54,78,126,0.1)] rounded-lg py-6 px-4 my-5 mr-6 flex flex-col`}
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
        );
      })}
    </div>
  );
};

export default Column;
