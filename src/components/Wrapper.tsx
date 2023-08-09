import { ReactNode } from "react";
import { Data } from "../App";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface WrapperProps {
  sidebarHidden: boolean;
  boardId: string | null;
  boardData: Data;
  openModal: () => void;
  changeTheme: (args: boolean) => void;
  hideSidebar: () => void;
  openBoard: (args: string) => void;
  children: ReactNode;
  openNewBoardModal: () => void;
  openDotMenu: () => void;
  dotMenuOpen: boolean;
  value: boolean;
  toggleValue: () => void;
  isDarkTheme: boolean;
  closeHeaderDotMenu: () => void;
}

const Wrapper = ({
  value,
  toggleValue,
  sidebarHidden,
  boardId,
  boardData,
  openModal,
  changeTheme,
  hideSidebar,
  openBoard,
  openNewBoardModal,
  openDotMenu,
  dotMenuOpen,
  children,
  isDarkTheme,
  closeHeaderDotMenu,
}: WrapperProps) => {
  return (
    <div
      className={`flex h-full w-screen flex-col overflow-hidden absolute z-0`}
    >
      <div className={`h-24`}>
        <Header
          isDarkTheme={isDarkTheme}
          sidebarHidden={sidebarHidden}
          openModal={openModal}
          boardId={boardId}
          boardData={boardData}
          openDotMenu={openDotMenu}
          dotMenuOpen={dotMenuOpen}
          closeHeaderDotMenu={closeHeaderDotMenu}
        ></Header>
      </div>
      <div className="flex h-full flex-1 overflow-auto">
        {sidebarHidden ? (
          ""
        ) : (
          <Sidebar
            changeTheme={changeTheme}
            hideSidebar={hideSidebar}
            boardsData={boardData}
            openBoard={openBoard}
            selectedBoardId={boardId}
            openNewBoardModal={openNewBoardModal}
            value={value}
            toggleValue={toggleValue}
          ></Sidebar>
        )}
        <div className="flex-1 pl-6 overflow-auto h-full">{children}</div>
      </div>
    </div>
  );
};

export default Wrapper;
