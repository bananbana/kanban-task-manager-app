import Column from "./Column";
import { Data } from "../App";
import BoardEmpty from "./BoardEmpty";

interface BoardProps {
  isDarkTheme: boolean;
  boardData: Data;
  boardId: string | null;
  openNewBoardModal: () => void;
  openCreateNewColumn: () => void;
}

const Board = ({
  boardData,
  boardId,
  isDarkTheme,
  openNewBoardModal,
  openCreateNewColumn,
}: BoardProps) => {
  const openedBoard = boardData.boards.find(
    (board) => board.boardId === boardId
  );
  return (
    <div
      className={`${
        boardId ? "overflow-auto flex justify-start items-center" : "hidden"
      } ${isDarkTheme ? "text-white" : "text-black"}`}
    >
      {openedBoard?.columns ? (
        <div>
          <div className="flex-row flex">
            <Column
              boardId={boardId}
              boardData={boardData}
              isDarkTheme={isDarkTheme}
            ></Column>
            <div
              className={`text-heading-xl text-medium-grey flex justify-center items-center group rounded-lg group hover:cursor-pointer ${
                isDarkTheme
                  ? "bg-gradient-to-b from-dark-grey to-[rgba(43,44,55,0.5)] to-25%"
                  : "bg-gradient-to-b from-[rgba(233,239,250,1)] to-[rgba(233,239,250,0.5)] to-25%"
              }`}
              onClick={openCreateNewColumn}
            >
              <span className="mx-14 group-hover:text-main-purple group-hover:cursor-pointer">
                + New Column
              </span>
            </div>
          </div>
        </div>
      ) : (
        <BoardEmpty openBoardModal={openNewBoardModal}></BoardEmpty>
      )}
    </div>
  );
};

export default Board;
