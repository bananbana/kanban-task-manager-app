import { ReactNode } from "react";
import { Data } from "../App";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface WrapperProps {
  isDarkTheme: boolean;
  sidebarHidden: boolean;
  boardId: string | null;
  boardData: Data;
  openModal: () => void;
  changeTheme: (args: boolean) => void;
  hideSidebar: () => void;
  openBoard: (args: string) => void;
  children: ReactNode;
  openNewBoardModal: () => void;
}

const Wrapper = ({
  isDarkTheme,
  sidebarHidden,
  boardId,
  boardData,
  openModal,
  changeTheme,
  hideSidebar,
  openBoard,
  openNewBoardModal,
  children,
}: WrapperProps) => {
  return (
    <div className={`flex h-full w-screen flex-col overflow-hidden`}>
      <div className={`h-24`}>
        <Header
          isDarkTheme={isDarkTheme}
          sidebarHidden={sidebarHidden}
          openModal={openModal}
          boardId={boardId}
          boardData={boardData}
        ></Header>
      </div>
      <div className="flex h-full flex-1 overflow-auto">
        {sidebarHidden ? (
          ""
        ) : (
          <Sidebar
            isDarkTheme={isDarkTheme}
            changeTheme={changeTheme}
            hideSidebar={hideSidebar}
            boardsData={boardData}
            openBoard={openBoard}
            selectedBoardId={boardId}
            openNewBoardModal={openNewBoardModal}
          ></Sidebar>
        )}
        <div className="flex-1 pl-6 py-5 overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default Wrapper;
