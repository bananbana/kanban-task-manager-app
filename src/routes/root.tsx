import { Outlet, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useEffect, useRef, useState } from "react";
import { getBoards } from "../boards";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import autoAnimate from "@formkit/auto-animate";
import IUser from "../types/user.type";
import EventBus from "../common/EventBus";
import AuthService from "../services/auth.service";
import { authHeader } from "../services/auth-header";
import { UserType } from "../types/UserType";
import { currentUserSignal } from "../userSignal";
import authService from "../services/auth.service";
import { IconShowSidebar } from "../assets/images/IconShowSidebar";

const boardsListQuery = () => ({
  queryKey: ["boards"],
  queryFn: () => getBoards(),
  enabled: !!authService.getCurrentUser(),
});

const Root = () => {
  const queryClient = useQueryClient();
  const { data: boards } = useQuery(boardsListQuery());
  const { boardId } = useParams();
  const users = queryClient.getQueryData<UserType[]>(["users"]);
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);
  const [currentUserName, setCurrentUserName] = useState<string | undefined>(
    authHeader().username
  );
  const navigate = useNavigate();
  const parent = useRef(null);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
    setCurrentUserName(undefined);
    console.log("logout");
  };

  const onSetUser = (): void => {
    const user = AuthService.getCurrentUser();

    if (user && user.roles) {
      currentUserSignal.value = user;
      setCurrentUser(user);
      setCurrentUserName(user.username);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      onSetUser();
    }

    EventBus.on("login", () => {
      onSetUser();
    });

    const handleLogout = () => {
      logOut();
    };

    EventBus.on("logout", handleLogout);

    return () => {
      EventBus.remove("logout", handleLogout);
    };
  }, [currentUser]);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkTheme(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkTheme(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

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
    console.log(isDarkTheme);
  };

  const toggleSidebar = () => {
    setSidebarHidden(!sidebarHidden);
  };

  return (
    <>
      <div
        id="root-container"
        className={`h-full relative flex justify-center items-center dark:bg-very-dark-grey bg-light-grey`}
      >
        {sidebarHidden && (
          <button
            className="hidden tablet:block fixed left-0 z-50 w-14 h-12 rounded-r-full bg-main-purple hover:bg-main-purple-hover bottom-8 pl-4 items-center"
            onClick={toggleSidebar}
            id="show-sidebar-btn"
          >
            <IconShowSidebar />
          </button>
        )}

        <div id="app" className="flex h-full w-screen flex-col absolute z-0">
          <div id="header" className={`h-24 sticky z-10`}>
            <Header
              isDarkTheme={isDarkTheme}
              sidebarHidden={sidebarHidden}
              openedBoard={boards?.find(
                (board) => board.id.toString() === boardId
              )}
              currentUserName={currentUserName}
              currentUser={currentUser}
              users={users}
              toggleSidebar={toggleSidebar}
            />
          </div>
          <div className={`flex h-full overflow-auto`} ref={parent}>
            {!sidebarHidden && (
              <div
                id="sidebar"
                className={`tablet:flex phone:hidden tablet:h-full`}
              >
                <Sidebar
                  currentUser={currentUser}
                  value={isDarkTheme}
                  hideSidebar={toggleSidebar}
                  toggleValue={changeTheme}
                  allBoards={boards}
                  boardId={boardId}
                  username={currentUser?.username}
                  logOut={() => {
                    logOut();
                    navigate("/login");
                  }}
                />
              </div>
            )}
            <div
              id="detail"
              className="flex justify-start flex-1 h-full w-screen overflow-auto items-center"
            >
              {!sidebarHidden && (
                <div className="phone:flex tablet:hidden mt-16 h-full w-screen backdrop-brightness-50 top-0 left-0 fixed z-40 justify-center">
                  <Sidebar
                    currentUser={currentUser}
                    value={isDarkTheme}
                    hideSidebar={toggleSidebar}
                    toggleValue={changeTheme}
                    allBoards={boards}
                    boardId={boardId}
                    username={currentUser?.username}
                    logOut={() => {
                      logOut();
                      navigate("/login");
                    }}
                  />
                </div>
              )}
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Root;
