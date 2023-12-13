// import { useState } from "react";
// import Wrapper from "./components/Wrapper";
// import Board from "./components/Board";
// import TaskModal from "./components/TaskModal";
// import NewTaskModal from "./components/NewTaskModal";
// import ConfirmDeleteModal from "./components/ConfirmDeleteModal";
// import BoardModal from "./components/BoardModal";

// function App() {
//   const [isDarkTheme, setIsDarkTheme] = useState(false);
//   const [sidebarHidden, setSidebarHidden] = useState(false);
//   const [openedBoardId, setOpenedBoardId] = useState<number>(0);
//   const [taskModalOpen, setTaskModalOpen] = useState(false);
//   const [openedTaskId, setOpenedTaskId] = useState<number>(0);
//   const [taskDotMenuOpen, setTaskDotMenuOpen] = useState(false);
//   const [newTaskModalOpen, setNewTaskModalOpen] = useState(false);
//   const [newBoardModalOpen, setNewBoardModalOpen] = useState(false);
//   const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
//   const [editBoardModalOpen, setEditBoardModalOpen] = useState(false);
//   const [editTaskModalOpen, setEditTaskModalOpen] = useState(false);
//   const [deleteModalType, setDeleteModalType] = useState("");

//   const openBoard = (boardId: number) => {
//     setOpenedBoardId(boardId);
//   };

//   const openNewTaskModal = () => {
//     setNewTaskModalOpen(true);
//   };

//   const changeTheme = () => {
//     if (isDarkTheme) {
//       // Change to light theme and save preference in local storage
//       localStorage.theme = "light";
//       document.documentElement.classList.remove("dark");
//       setIsDarkTheme(false);
//     } else if (!isDarkTheme) {
//       // Change to dark theme and save preference in local storage
//       localStorage.theme = "dark";
//       document.documentElement.classList.add("dark");
//       setIsDarkTheme(true);
//     }
//   };
//   const hideSidebar = (value: boolean) => {
//     setSidebarHidden(!value);
//   };

//   const handleOpenTask = (taskId: number) => {
//     setTaskModalOpen(true);
//     // This is very crude and not at all elegant solution to dot menu popping open
//     if (taskDotMenuOpen) {
//       setTaskDotMenuOpen(false);
//     }
//     setOpenedTaskId(taskId);
//   };

//   const closeTaskModal = () => {
//     setTaskDotMenuOpen(false);
//     setTaskModalOpen(false);
//   };

//   const openEditTaskModal = () => {
//     setEditTaskModalOpen(true);
//     console.log(openedTaskId);
//     closeTaskModal();
//   };

//   const closeBoardModal = () => {
//     if (newBoardModalOpen) {
//       setNewBoardModalOpen(false);
//     } else if (editBoardModalOpen) {
//       setEditBoardModalOpen(false);
//     }
//   };

//   const closeModal = () => {
//     if (newTaskModalOpen) {
//       setNewTaskModalOpen(false);
//     } else if (editTaskModalOpen) {
//       setEditTaskModalOpen(false);
//       handleOpenTask(openedTaskId);
//     }
//   };

//   const openTaskDeleteConfirmModal = () => {
//     setDeleteModalType("task");
//     setConfirmDeleteModalOpen(true);
//   };

//   const openBoardDeleteConfirmModal = () => {
//     setDeleteModalType("board");
//     setConfirmDeleteModalOpen(true);
//   };

//   const closeConfirmModal = () => {
//     setConfirmDeleteModalOpen(false);
//     if (openedBoardId !== 0) {
//       setOpenedBoardId(0);
//     }

//     if (openedTaskId !== 0) {
//       setOpenedTaskId(0);
//     }
//     closeTaskModal();
//   };

//   return (
//     <div
//       className={`h-full relative flex justify-center items-center dark:bg-very-dark-grey bg-light-grey`}
//     >
//       {taskModalOpen ||
//       newTaskModalOpen ||
//       editTaskModalOpen ||
//       editBoardModalOpen ||
//       newBoardModalOpen ||
//       confirmDeleteModalOpen ? (
//         <div className="h-full w-screen backdrop-brightness-50 absolute z-10"></div>
//       ) : (
//         ""
//       )}
//       <button
//         className={`${
//           sidebarHidden
//             ? "fixed left-0 z-50 w-14 h-12 rounded-r-full bg-main-purple hover:bg-main-purple-hover bottom-8  items-center"
//             : "hidden"
//         }`}
//         onClick={() => setSidebarHidden(false)}
//       >
//         <img
//           src="/src/assets/images/icon-show-sidebar.svg"
//           alt="show-sidebar-btn"
//           className="pl-[18px]"
//         />
//       </button>
//       <Wrapper
//         openEditBoardModal={() => setEditBoardModalOpen(true)}
//         sidebarHidden={sidebarHidden}
//         hideSidebar={() => hideSidebar(sidebarHidden)}
//         value={isDarkTheme}
//         toggleValue={changeTheme}
//         isDarkTheme={isDarkTheme}
//         setBoardId={openBoard}
//         openedBoardId={openedBoardId}
//         openNewTaskModal={openNewTaskModal}
//         openNewBoardModal={() => setNewBoardModalOpen(true)}
//         openConfirmModal={openBoardDeleteConfirmModal}
//         deleteOnWhat={deleteModalType}
//       >
//         {openedBoardId > 0 && (
//           <Board
//             openedBoardId={openedBoardId}
//             openTask={handleOpenTask}
//             openEditBoardModal={() => setEditBoardModalOpen(true)}
//           />
//         )}
//       </Wrapper>
//       {newTaskModalOpen || editTaskModalOpen ? (
//         <NewTaskModal
//           onClose={closeModal}
//           openedBoardId={openedBoardId}
//           editTaskModal={editTaskModalOpen}
//           createTaskModal={newTaskModalOpen}
//           openedTaskId={openedTaskId}
//         />
//       ) : (
//         ""
//       )}
//       {taskModalOpen && (
//         <TaskModal
//           openConfirmModal={openTaskDeleteConfirmModal}
//           editTask={openEditTaskModal}
//           onClose={closeTaskModal}
//           closeDotMenu={() => setTaskDotMenuOpen(false)}
//           openedTaskId={openedTaskId}
//           openTaskDotMenu={() => setTaskDotMenuOpen(true)}
//           taskDotMenuOpen={taskDotMenuOpen}
//           openedBoardId={openedBoardId}
//           deleteOnWhat={deleteModalType}
//         />
//       )}
//       {newBoardModalOpen || editBoardModalOpen ? (
//         <BoardModal
//           editBoardModal={editBoardModalOpen}
//           createBoardModal={newBoardModalOpen}
//           onClose={closeBoardModal}
//           openedBoardId={openedBoardId}
//         />
//       ) : (
//         ""
//       )}
//       {confirmDeleteModalOpen && openedBoardId > 0 && (
//         <ConfirmDeleteModal
//           openedBoardId={openedBoardId}
//           onClose={closeConfirmModal}
//           closeModal={() => setConfirmDeleteModalOpen(false)}
//           deleteOnWhat={deleteModalType}
//           openedTaskId={openedTaskId}
//         />
//       )}
//     </div>
//   );
// }

// export default App;
import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import AuthService from "./services/auth.service";
import IUser from "./types/user.type";

import Login from "./routes/login";
import Register from "./routes/register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/UserBoard";
import BoardAdmin from "./components/AdminBoard";

import EventBus from "./common/EventBus";

const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

  const navigate = useNavigate();

  const logOut = () => {
    AuthService.logout();
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user && user.roles) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    const handleLogout = () => {
      logOut();
    };

    EventBus.on("logout", handleLogout);

    return () => {
      EventBus.remove("logout", handleLogout);
    };
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          bezKoder
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a
                href="/login"
                className="nav-link"
                onClick={() => {
                  logOut();
                  navigate("/login");
                }}
              >
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/admin" element={<BoardAdmin />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
