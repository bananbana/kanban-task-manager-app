import { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface WrapperProps {
  sidebarHidden: boolean;
  children: ReactNode;
  value: boolean;
  toggleValue: () => void;
  isDarkTheme: boolean;
  hideSidebar: () => void;
  openedBoardId: number;
  setBoardId: (args: number) => void;
  openNewTaskModal: () => void;
  openNewBoardModal: () => void;
  openConfirmModal: () => void;
  openEditBoardModal: () => void;
  deleteOnWhat: string;
}

const Wrapper = ({
  value,
  toggleValue,
  children,
  isDarkTheme,
  hideSidebar,
  sidebarHidden,
  openedBoardId,
  setBoardId,
  openNewTaskModal,
  openNewBoardModal,
  openConfirmModal,
  openEditBoardModal,
  deleteOnWhat,
}: WrapperProps) => {
  return (
    <div
      className={`flex h-full w-screen flex-col overflow-hidden absolute z-0`}
    >
      <div className={`h-24`}>
        <Header
          openEditBoardModal={openEditBoardModal}
          isDarkTheme={isDarkTheme}
          sidebarHidden={sidebarHidden}
          openedBoardId={openedBoardId}
          openNewTaskModal={openNewTaskModal}
          openConfirmModal={openConfirmModal}
          deleteOnWhat={deleteOnWhat}
        ></Header>
      </div>
      <div className="flex h-full flex-1 overflow-auto">
        {sidebarHidden ? (
          ""
        ) : (
          <Sidebar
            hideSidebar={hideSidebar}
            value={value}
            toggleValue={toggleValue}
            setBoardId={setBoardId}
            openedBoardId={openedBoardId}
            openNewBoardModal={openNewBoardModal}
          ></Sidebar>
        )}

        <div className="flex-1 overflow-auto h-full">{children}</div>
      </div>
    </div>
  );
};

export default Wrapper;
