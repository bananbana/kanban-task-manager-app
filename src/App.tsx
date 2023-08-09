import "./App.css";
import { useEffect, useState } from "react";
import NewTaskModal from "./components/NewTaskModal";
import NewBoardModal from "./components/NewBoardModal";
import Board from "./components/Board";
import data from "./assets/data.json";
import Wrapper from "./components/Wrapper";
import Task from "./components/Task";
import { ColumnData, TaskData } from "./components/Column";
import Toggle from "./components/Toggle";

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

  useEffect(() => {
    // Check if there is already saved theme preference
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setIsDarkTheme(true);
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkTheme]);

  const [sidebarHidden, setSidebarHidden] = useState(false);
  const [dotMenuOpen, setDotMenuOpen] = useState(false);
  // const [taskDotMenuOpen, setTaskDotMenuOpen] = useState(false);
  const [newTaskModalOpen, setNewTaskModalOpen] = useState(false);
  const [newBoardModalOpen, setNewBoardModalOpen] = useState(false);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
  const [taskOpen, setTaskOpen] = useState<TaskData>();

  const hideSidebar = (value: boolean) => {
    setSidebarHidden(!value);
  };

  const openBoard = (boardId: string) => {
    setSelectedBoardId(boardId);
  };

  const createNewColumn = () => {
    console.log("Column created");
  };

  // const openDotMenu = () => {
  //   dotMenuOpen ? setDotMenuOpen(false) : setDotMenuOpen(true);
  // };

  // const openTaskDotMenu = () => {
  //   taskDotMenuOpen ? setTaskDotMenuOpen(false) : setTaskDotMenuOpen(true);
  // };

  const handleOpenTask = (columnData: ColumnData, taskData: TaskData) => {
    setTaskModalOpen(true);

    const openedBoard = data.boards.find(
      (board) => board.boardId === selectedBoardId
    );

    const activeTask = openedBoard?.columns
      .find((column) => column === columnData)
      ?.tasks.find((task) => task === taskData);

    setTaskOpen(activeTask);
  };

  const changeTheme = () => {
    if (isDarkTheme) {
      // Change to light theme and save preference in local storage
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
      setIsDarkTheme(false);
    } else if (!isDarkTheme) {
      // Change to dark theme and save preference in local storage
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
      setIsDarkTheme(true);
    }
  };

  return (
    <div
      className={`h-full relative flex justify-center items-center dark:bg-very-dark-grey bg-light-grey`}
    >
      {newTaskModalOpen || newBoardModalOpen || taskModalOpen ? (
        <div className="h-full w-screen backdrop-brightness-50 absolute z-10"></div>
      ) : (
        ""
      )}
      <button
        className={`${
          sidebarHidden
            ? "fixed left-0 z-50 w-14 h-12 rounded-r-full bg-main-purple hover:bg-main-purple-hover bottom-8  items-center"
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
      <Wrapper
        sidebarHidden={sidebarHidden}
        boardId={selectedBoardId}
        boardData={data}
        openModal={() => setNewTaskModalOpen(true)}
        changeTheme={changeTheme}
        hideSidebar={() => hideSidebar(sidebarHidden)}
        openBoard={openBoard}
        openNewBoardModal={() => setNewBoardModalOpen(true)}
        openDotMenu={() => setDotMenuOpen(true)}
        dotMenuOpen={dotMenuOpen}
        value={isDarkTheme}
        toggleValue={changeTheme}
        isDarkTheme={isDarkTheme}
        closeHeaderDotMenu={() => setDotMenuOpen(false)}
      >
        <Board
          boardId={selectedBoardId}
          boardData={data}
          openNewBoardModal={() => setNewBoardModalOpen(true)}
          openCreateNewColumn={createNewColumn}
          openTask={handleOpenTask}
        ></Board>
      </Wrapper>
      {newTaskModalOpen && (
        <NewTaskModal
          onClose={() => setNewTaskModalOpen(false)}
          boardId={selectedBoardId}
          boardData={data}
        ></NewTaskModal>
      )}
      {newBoardModalOpen && (
        <NewBoardModal onClose={() => setNewBoardModalOpen(false)} />
      )}
      {taskModalOpen && (
        <Task
          openTaskDotMenu={() => setDotMenuOpen(true)}
          taskDotMenuOpen={dotMenuOpen}
          closeDotMenu={() => setDotMenuOpen(false)}
          taskData={taskOpen}
          boardData={data}
          boardId={selectedBoardId}
          onClose={() => setTaskModalOpen(false)}
        ></Task>
      )}
    </div>
  );
}

export default App;
