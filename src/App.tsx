import { useState } from "react";
import "./App.css";
import Wrapper from "./components/Wrapper";
import Board from "./components/Board";
import TaskModal from "./components/TaskModal";
import NewTaskModal from "./components/NewTaskModal";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";
import BoardModal from "./components/BoardModal";

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const [openedBoardId, setOpenedBoardId] = useState<number>(0);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [openedTaskId, setOpenedTaskId] = useState<number>(0);
  const [taskDotMenuOpen, setTaskDotMenuOpen] = useState(false);
  const [newTaskModalOpen, setNewTaskModalOpen] = useState(false);
  const [newBoardModalOpen, setNewBoardModalOpen] = useState(false);
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [editBoardModalOpen, setEditBoardModalOpen] = useState(false);
  const [editTaskModalOpen, setEditTaskModalOpen] = useState(false);
  const [deleteModalType, setDeleteModalType] = useState("");

  const openBoard = (boardId: number) => {
    setOpenedBoardId(boardId);
  };

  const openNewTaskModal = () => {
    setNewTaskModalOpen(true);
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
  const hideSidebar = (value: boolean) => {
    setSidebarHidden(!value);
  };

  const handleOpenTask = (taskId: number) => {
    setTaskModalOpen(true);
    // This is very crude and not at all elegant solution to dot menu popping open
    if (taskDotMenuOpen) {
      setTaskDotMenuOpen(false);
    }
    setOpenedTaskId(taskId);
  };

  const closeTaskModal = () => {
    setTaskDotMenuOpen(false);
    setTaskModalOpen(false);
  };

  const openEditTaskModal = () => {
    setEditTaskModalOpen(true);
    console.log(openedTaskId);
    closeTaskModal();
  };

  const closeBoardModal = () => {
    if (newBoardModalOpen) {
      setNewBoardModalOpen(false);
    } else if (editBoardModalOpen) {
      setEditBoardModalOpen(false);
    }
  };

  const closeModal = () => {
    if (newTaskModalOpen) {
      setNewTaskModalOpen(false);
    } else if (editTaskModalOpen) {
      setEditTaskModalOpen(false);
      handleOpenTask(openedTaskId);
    }
  };

  const openTaskDeleteConfirmModal = () => {
    setDeleteModalType("task");
    setConfirmDeleteModalOpen(true);
  };

  const openBoardDeleteConfirmModal = () => {
    setDeleteModalType("board");
    setConfirmDeleteModalOpen(true);
  };

  const closeConfirmModal = () => {
    setConfirmDeleteModalOpen(false);
    if (openedBoardId !== 0) {
      setOpenedBoardId(0);
    }

    if (openedTaskId !== 0) {
      setOpenedTaskId(0);
    }
    closeTaskModal();
  };

  return (
    <div
      className={`h-full relative flex justify-center items-center dark:bg-very-dark-grey bg-light-grey`}
    >
      {taskModalOpen ||
      newTaskModalOpen ||
      editTaskModalOpen ||
      editBoardModalOpen ||
      newBoardModalOpen ||
      confirmDeleteModalOpen ? (
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
        openEditBoardModal={() => setEditBoardModalOpen(true)}
        sidebarHidden={sidebarHidden}
        hideSidebar={() => hideSidebar(sidebarHidden)}
        value={isDarkTheme}
        toggleValue={changeTheme}
        isDarkTheme={isDarkTheme}
        setBoardId={openBoard}
        openedBoardId={openedBoardId}
        openNewTaskModal={openNewTaskModal}
        openNewBoardModal={() => setNewBoardModalOpen(true)}
        openConfirmModal={openBoardDeleteConfirmModal}
        deleteOnWhat={deleteModalType}
      >
        {openedBoardId > 0 && (
          <Board
            openedBoardId={openedBoardId}
            openTask={handleOpenTask}
            openEditBoardModal={() => setEditBoardModalOpen(true)}
          />
        )}
      </Wrapper>
      {newTaskModalOpen || editTaskModalOpen ? (
        <NewTaskModal
          onClose={closeModal}
          openedBoardId={openedBoardId}
          editTaskModal={editTaskModalOpen}
          createTaskModal={newTaskModalOpen}
          openedTaskId={openedTaskId}
        />
      ) : (
        ""
      )}
      {taskModalOpen && (
        <TaskModal
          openConfirmModal={openTaskDeleteConfirmModal}
          editTask={openEditTaskModal}
          onClose={closeTaskModal}
          closeDotMenu={() => setTaskDotMenuOpen(false)}
          openedTaskId={openedTaskId}
          openTaskDotMenu={() => setTaskDotMenuOpen(true)}
          taskDotMenuOpen={taskDotMenuOpen}
          openedBoardId={openedBoardId}
          deleteOnWhat={deleteModalType}
        />
      )}
      {newBoardModalOpen || editBoardModalOpen ? (
        <BoardModal
          editBoardModal={editBoardModalOpen}
          createBoardModal={newBoardModalOpen}
          onClose={closeBoardModal}
          openedBoardId={openedBoardId}
        />
      ) : (
        ""
      )}
      {confirmDeleteModalOpen && openedBoardId > 0 && (
        <ConfirmDeleteModal
          openedBoardId={openedBoardId}
          onClose={closeConfirmModal}
          closeModal={() => setConfirmDeleteModalOpen(false)}
          deleteOnWhat={deleteModalType}
          openedTaskId={openedTaskId}
        />
      )}
    </div>
  );
}

export default App;
