import Column from "./Column";
import { Data } from "../App";
import BoardEmpty from "./BoardEmpty";
import { ColumnData, TaskData } from "./Column";

interface BoardProps {
  boardData: Data;
  boardId: string | null;
  openNewBoardModal: () => void;
  openCreateNewColumn: () => void;
  openTask: (column: ColumnData, task: TaskData) => void;
}

const Board = ({
  boardData,
  boardId,
  openNewBoardModal,
  openCreateNewColumn,
  openTask,
}: BoardProps) => {
  const openedBoard = boardData.boards.find(
    (board) => board.boardId === boardId
  );
  return (
    <div
      className={`${
        boardId ? "" : "hidden"
      } dark:text-white text-black h-full overflow-hidden`}
    >
      {openedBoard?.columns ? (
        <div className="h-full overflow-auto">
          <div className="flex-row flex h-full">
            <Column boardId={boardId} boardData={boardData} openTask={openTask}>
              <div
                className={`w-[280px] text-heading-xl text-medium-grey flex justify-center items-center group rounded-lg group hover:cursor-pointer h-full bg-gradient-to-b dark:from-dark-grey dark:to-very-dark-grey to-75% from-[rgba(233,239,250,1)] to-light-grey `}
                onClick={openCreateNewColumn}
              >
                <span className="group-hover:text-main-purple group-hover:cursor-pointer">
                  + New Column
                </span>
              </div>
            </Column>
          </div>
        </div>
      ) : (
        <BoardEmpty openBoardModal={openNewBoardModal}></BoardEmpty>
      )}
    </div>
  );
};

export default Board;
