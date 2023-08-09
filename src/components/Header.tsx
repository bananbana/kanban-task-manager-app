import { Data } from "../App";
import DotDropDown from "./DotDropDown";

interface HeaderProps {
  sidebarHidden: boolean;
  openModal: () => void;
  openDotMenu: () => void;
  boardId: string | null;
  boardData: Data;
  dotMenuOpen: boolean;
  isDarkTheme: boolean;
  closeHeaderDotMenu: () => void;
}

const Header = ({
  sidebarHidden,
  openModal,
  openDotMenu,
  boardId,
  boardData,
  dotMenuOpen,
  isDarkTheme,
  closeHeaderDotMenu,
}: HeaderProps) => {
  const openedBoard = boardData.boards.find(
    (board) => board.boardId === boardId
  );

  return (
    <div
      className={`flex-row flex justify-between items-center h-24 dark:bg-dark-grey dark:border-lines-dark bg-white border-lines-light border-b`}
    >
      <div className="flex flex-row items-center h-full">
        <div
          className={`${
            sidebarHidden ? "px-8" : "pl-8 pr-[114px]"
          } h-full flex items-center border-r dark:border-lines-dark border-lines-light`}
        >
          <img
            src={`/src/assets/images/${
              isDarkTheme ? "logo-light" : "logo-dark"
            }.svg`}
          ></img>
        </div>
        <div className="text-heading-xl items-center ml-8">
          <p className={`dark:text-white text-black`}>{openedBoard?.name}</p>
        </div>
      </div>
      <div className="h-12 flex items-center px-8">
        <button
          className={`${
            openedBoard
              ? "bg-main-purple hover:bg-main-purple-hover"
              : "bg-main-purple-hover cursor-default"
          } text-[#FFFFFF] h-full font-bold rounded-full mr-6 px-6 py-4 flex items-center`}
          onClick={() => openedBoard && openModal()}
        >
          + Add New Task
        </button>
        <button
          className={`py-2 px-2 flex justify-center items-center rounded-full dark:hover:bg-very-dark-grey hover:bg-lines-light`}
          onClick={() => openedBoard && openDotMenu()}
        >
          <img src="/src/assets/images/icon-vertical-ellipsis.svg"></img>
        </button>
        {dotMenuOpen && (
          <div className={`z-30 fixed top-[90px] right-4`}>
            <DotDropDown
              onClose={closeHeaderDotMenu}
              topContent="Edit Board"
              bottomContent="Delete Board"
            ></DotDropDown>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
