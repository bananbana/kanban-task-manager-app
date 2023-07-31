import { Data } from "../App";

interface HeaderProps {
  isDarkTheme: boolean;
  sidebarHidden: boolean;
  openModal: () => void;
  boardId: string | null;
  boardData: Data;
}

const Header = ({
  isDarkTheme,
  sidebarHidden,
  openModal,
  boardId,
  boardData,
}: HeaderProps) => {
  const openedBoard = boardData.boards.find(
    (board) => board.boardId === boardId
  );

  return (
    <div
      className={`flex-row flex justify-between items-center h-24 ${
        isDarkTheme
          ? "bg-dark-grey border-lines-dark"
          : "bg-white border-lines-light"
      } border-b flex`}
    >
      <div className="flex flex-row items-center h-full">
        <div
          className={`${
            sidebarHidden ? "px-8" : "pl-8 pr-[114px]"
          } h-full flex items-center border-r ${
            isDarkTheme ? "border-lines-dark" : "border-lines-light"
          }`}
        >
          <img
            src={`/src/assets/images/${
              isDarkTheme ? "logo-light" : "logo-dark"
            }.svg`}
          ></img>
        </div>
        <div className="text-heading-xl items-center ml-8">
          <p className={`${isDarkTheme ? "text-white" : "text-black"}`}>
            {openedBoard?.name}
          </p>
        </div>
      </div>
      <div className="h-12 flex items-center px-8">
        <button
          className="bg-main-purple hover:bg-main-purple-hover text-[#FFFFFF] h-full font-bold rounded-full mr-6 px-6 py-4 flex items-center"
          onClick={() => openModal()}
        >
          + Add New Task
        </button>
        <button>
          <img src="/src/assets/images/icon-vertical-ellipsis.svg"></img>
        </button>
      </div>
    </div>
  );
};

export default Header;
