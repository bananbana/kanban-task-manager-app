import { NavLink } from "react-router-dom";
import Toggle from "./Toggle";
import { BoardData } from "../types/BoardTypes";
import IUser from "../types/user.type";
import AccountPopover from "./AccountPopover";
import { IconBoard } from "../assets/images/IconBoard";
import { IconHideSidebar } from "../assets/images/IconHideSidebar";

interface SidebarProps {
  value: boolean;
  hideSidebar: () => void;
  toggleValue: () => void;
  allBoards: BoardData[] | undefined;
  boardId: string | undefined;
  username: string | null | undefined;
  logOut: () => void;
  currentUser: IUser | null;
}

const Sidebar = ({
  toggleValue,
  value,
  hideSidebar,
  allBoards,
  boardId,
  username,
  logOut,
  currentUser,
}: SidebarProps) => {
  return (
    <div
      className={`z-10 bg-white dark:bg-dark-grey dark:border-lines-dark border-lines-light border-r w-[300px] tablet:w-[260px] flex flex-col tablet:min-h-max overflow-auto relative tablet:rounded-none phone:h-1/2 tablet:h-full phone:my-3 tablet:my-0 phone:border-none phone:rounded-xl`}
      id="sidebar"
    >
      {currentUser && (
        <>
          <div className={`mb-2 flex flex-col items-start`}>
            <div
              className={`text-body-m flex flex-col justify-center mb-8 text-white bg-main-purple w-full h-24`}
            >
              <h3 className="text-heading-xl pb-2 pl-8">Hello, {username}</h3>
              <AccountPopover logOut={logOut} currentUser={currentUser} />
            </div>
            <h3 className="text-medium-grey text-heading-s ml-8">
              ALL BOARDS({allBoards?.length})
            </h3>
          </div>
          <div
            id="sidebar-nav"
            className="h-full flex flex-col justify-between"
          >
            <nav>
              {allBoards?.length ? (
                <ul className="mr-6">
                  <h3 className="text-medium-grey text-heading-s tracking-wide ml-8 mt-2 mb-1">
                    YOUR BOARDS (
                    {
                      allBoards.filter(
                        (board) => board.ownerId === currentUser.id
                      ).length
                    }
                    )
                  </h3>
                  {allBoards
                    .filter((board) => board.ownerId === currentUser.id)
                    .map((board) => (
                      <li key={board.id}>
                        <NavLink
                          to={`user/boards/${board.id}`}
                          className={({ isActive }) =>
                            `h-12 group hover:cursor-pointer rounded-r-full pl-8 mb-1 flex flex-row items-center dark:hover:bg-white tablet:hover:bg-main-purple-hover  text-medium-grey fill-grey ${
                              isActive &&
                              "bg-main-purple tablet:hover:dark:bg-white fill-white text-white"
                            }`
                          }
                        >
                          <IconBoard className="w-4 h-4 tablet:dark:group-hover:fill-purple tablet:group-hover:fill-white" />
                          <h3
                            id="board-name"
                            className={`dark:group-hover:text-main-purple tablet:group-hover:text-white text-heading-m pl-4`}
                          >
                            {board.name}
                          </h3>{" "}
                        </NavLink>
                      </li>
                    ))}
                  <h3 className="text-light-pink text-heading-s ml-8 mt-2 mb-1">
                    SHARED BOARDS (
                    {
                      allBoards.filter(
                        (board) => board.ownerId !== currentUser.id
                      ).length
                    }
                    )
                  </h3>
                  {allBoards
                    .filter((board) => board.ownerId !== currentUser.id)
                    .map((board) => (
                      <li key={board.id}>
                        <NavLink
                          to={`user/boards/${board.id}`}
                          className={({ isActive }) =>
                            `h-12 group hover:cursor-pointer rounded-r-full pl-8 mb-1 flex flex-row items-center hover:bg-light-pink hover:text-white ${
                              isActive
                                ? "text-white fill-white bg-pink-500"
                                : "text-light-pink fill-light-pink"
                            }`
                          }
                        >
                          <IconBoard className="w-4 h-4 group-hover:fill-white" />
                          <h3 id="board-name" className={`text-heading-m pl-4`}>
                            {board.name}
                          </h3>{" "}
                        </NavLink>
                      </li>
                    ))}
                </ul>
              ) : (
                <div id="sidebar-nav">
                  <h3
                    id="board-name"
                    className={`text-medium-grey text-heading-s pl-4`}
                  >
                    You don't have any boards 😢. Create one to get started.
                  </h3>
                  <NavLink to={`user/boards/new`}>
                    <button
                      id="add-new-board-btn"
                      className={`disabled:hidden h-12 group mb-2 flex flex-row w-full items-center pl-8 hover:cursor-pointer`}
                    >
                      <IconBoard className="w-4 h-4 fill-purple group-hover:fill-light-purple" />
                      <h3 className="text-heading-m text-main-purple group-hover:text-main-purple-hover pt-1 pl-4">
                        + Create New Board
                      </h3>
                    </button>
                  </NavLink>
                </div>
              )}
            </nav>
            <NavLink to={`user/boards/${boardId}/new`}>
              <button
                id="add-new-board-btn"
                className={`disabled:hidden h-12 group mb-2 flex flex-row w-full items-center pl-8 hover:cursor-pointer`}
                disabled={!boardId}
              >
                <IconBoard className="w-4 h-4 fill-purple group-hover:fill-light-purple" />
                <h3 className="text-heading-m text-main-purple group-hover:text-main-purple-hover pl-4">
                  + Create New Board
                </h3>
              </button>
            </NavLink>
          </div>
        </>
      )}
      <div
        id="sidebar-toggles"
        className={`flex flex-col items-start my-8 w-full ${
          !currentUser && "absolute bottom-0"
        }`}
      >
        <div className="py-2 w-full flex justify-end">
          <Toggle value={value} toggleValue={toggleValue}></Toggle>
        </div>
        <div className="w-full pr-6 tablet:block phone:hidden">
          <button
            className={`dark:hover:bg-white hover:bg-lines-light h-12 flex items-center pl-8 mr-6 hover:cursor-pointer rounded-r-full group w-full`}
            onClick={hideSidebar}
          >
            <IconHideSidebar className=" group-hover:fill-purple fill-grey" />
            <p className="text-medium-grey text-heading-m group-hover:text-main-purple pl-4">
              Hide Sidebar
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
