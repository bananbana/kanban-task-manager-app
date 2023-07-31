import "./App.css";
import { useEffect, useState } from "react";
import NewTaskModal from "./components/NewTaskModal";
import NewBoardModal from "./components/NewBoardModal";
import Board from "./components/Board";
import data from "./assets/data.json";
import Wrapper from "./components/Wrapper";

export type Data = {
  boards: {
    boardId: string;
    name: string;
    columns: {
      name: string;
      tasks: {
        title: string;
        description: string;
        status: string;
        subtasks: { title: string; isCompleted: boolean }[];
      }[];
    }[];
  }[];
};

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const [newTaskModalOpen, setNewTaskModalOpen] = useState(false);
  const [newBoardModalOpen, setNewBoardModalOpen] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);

  const localStorageTheme = localStorage.getItem("theme");
  const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

  useEffect(() => {
    const currentThemeSettings =
      localStorageTheme ?? (systemSettingDark.matches ? "dark" : "light");

    if (currentThemeSettings === "dark") {
      setIsDarkTheme(false);
    } else {
      setIsDarkTheme(true);
    }
    setIsDarkTheme(isDarkTheme);
  }, [isDarkTheme, localStorageTheme, systemSettingDark]);

  const changeTheme = () => {
    if (isDarkTheme === true) {
      setIsDarkTheme(false);
    } else {
      setIsDarkTheme(true);
    }
    console.log(isDarkTheme);
  };

  const hideSidebar = (value: boolean) => {
    setSidebarHidden(!value);
  };

  const openNewTaskModal = () => {
    setNewTaskModalOpen(true);
  };

  const openNewBoardModal = () => {
    setNewBoardModalOpen(true);
  };

  const closeModal = () => {
    if (newTaskModalOpen) {
      setNewTaskModalOpen(false);
    }
    if (newBoardModalOpen) {
      setNewBoardModalOpen(false);
    }
  };

  const openBoard = (boardId: string) => {
    setSelectedBoardId(boardId);
  };

  const createNewColumn = () => {
    console.log("Column created");
  };

  return (
    <div
      className={`h-full relative ${
        isDarkTheme ? "bg-very-dark-grey" : "bg-light-grey"
      }`}
    >
      <Wrapper
        isDarkTheme={isDarkTheme}
        sidebarHidden={sidebarHidden}
        boardId={selectedBoardId}
        boardData={data}
        openModal={openNewTaskModal}
        changeTheme={changeTheme}
        hideSidebar={() => hideSidebar(sidebarHidden)}
        openBoard={openBoard}
        openNewBoardModal={openNewBoardModal}
      >
        <Board
          boardId={selectedBoardId}
          isDarkTheme={isDarkTheme}
          boardData={data}
          openNewBoardModal={openNewBoardModal}
          openCreateNewColumn={createNewColumn}
        ></Board>
        {newTaskModalOpen ? (
          <NewTaskModal
            isOpen={newTaskModalOpen}
            isDarkTheme={isDarkTheme}
            onClose={closeModal}
          ></NewTaskModal>
        ) : (
          ""
        )}
        {newBoardModalOpen ? (
          <NewBoardModal
            isOpen={newBoardModalOpen}
            isDarkTheme={isDarkTheme}
            onClose={closeModal}
          ></NewBoardModal>
        ) : (
          ""
        )}
      </Wrapper>
      <button
        className={`${
          sidebarHidden
            ? "fixed w-14 h-12 rounded-r-full bg-main-purple hover:bg-main-purple-hover bottom-8  items-center"
            : "hidden"
        }`}
        onClick={() => setSidebarHidden(false)}
      >
        <img
          src="/src/assets/images/icon-show-sidebar.svg"
          alt="show-sidebar-btn"
          className="pl-[18px]"
        />
      </button>
    </div>
  );
}

export default App;
