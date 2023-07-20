import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import BoardEmpty from "./components/BoardEmpty";
import { useEffect, useState } from "react";
import NewTaskModal from "./components/NewTaskModal";
import NewBoardModal from "./components/NewBoardModal";

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const [newTaskModalOpen, setNewTaskModalOpen] = useState(false);
  const [newBoardModalOpen, setNewBoardModalOpen] = useState(false);

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

  return (
    <div
      className={`${
        isDarkTheme ? "bg-very-dark-grey" : "bg-light-grey"
      } w-full h-[1024px] relative`}
      onClick={closeModal}
    >
      <Header
        isDarkTheme={isDarkTheme}
        sidebarHidden={sidebarHidden}
        openModal={openNewTaskModal}
      ></Header>
      <Sidebar
        changeTheme={() => changeTheme()}
        isDarkTheme={isDarkTheme}
        hideSidebar={() => hideSidebar(sidebarHidden)}
        sidebarHidden={sidebarHidden}
      ></Sidebar>
      <BoardEmpty openBoardModal={openNewBoardModal}></BoardEmpty>
      <NewTaskModal
        isOpen={newTaskModalOpen}
        isDarkTheme={isDarkTheme}
      ></NewTaskModal>
      <NewBoardModal
        isOpen={newBoardModalOpen}
        isDarkTheme={isDarkTheme}
      ></NewBoardModal>

      <button
        className={`${
          sidebarHidden
            ? "absolute bottom-8 w-14 h-12 rounded-r-full bg-main-purple flex items-center"
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
