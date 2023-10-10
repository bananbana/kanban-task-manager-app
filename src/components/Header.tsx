import { useState } from "react";
import DotDropDown from "./DotDropDown";
import useBoards from "../assets/hooks/useBoards";

interface HeaderProps {
  isDarkTheme: boolean;
  sidebarHidden: boolean;
  openedBoardId: number;
  openNewTaskModal: () => void;
  openConfirmModal: () => void;
  openEditBoardModal: () => void;
  deleteOnWhat: string;
}

const Header = ({
  isDarkTheme,
  sidebarHidden,
  openedBoardId,
  openNewTaskModal,
  openConfirmModal,
  openEditBoardModal,
  deleteOnWhat,
}: HeaderProps) => {
  const [headerDotMenuOpen, setHeaderDotMenuOpen] = useState(false);
  const { data } = useBoards();

  const openedBoard = data?.find((board) => board.id === openedBoardId);

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
          className="bg-main-purple hover:bg-main-purple-hover text-[#FFFFFF] h-full font-bold rounded-full mr-6 px-6 py-4 flex items-center disabled:bg-main-purple-hover"
          disabled={!openedBoard}
          onClick={() => openedBoard && openNewTaskModal()}
        >
          + Add New Task
        </button>
        <button
          className={`py-2 px-2 flex justify-center items-center rounded-full enabled:dark:hover:bg-very-dark-grey enabled:hover:bg-lines-light`}
          onClick={() => openedBoard && setHeaderDotMenuOpen(true)}
          disabled={!openedBoard}
        >
          <img src="/src/assets/images/icon-vertical-ellipsis.svg"></img>
        </button>
        {headerDotMenuOpen && (
          <div className={`z-30 fixed top-[90px] right-4`}>
            <DotDropDown
              editContent={openEditBoardModal}
              deleteContent={openConfirmModal}
              onClose={() => setHeaderDotMenuOpen(false)}
              topContent="Edit Board"
              bottomContent="Delete Board"
              whatToDelete={deleteOnWhat}
            ></DotDropDown>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
