import { NavLink } from "react-router-dom";
import Toggle from "./Toggle";
import { BoardData } from "../types/BoardTypes";
import IUser from "../types/user.type";
import AccountPopover from "./AccountPopover";

interface SidebarProps {
  value: boolean;
  hideSidebar: () => void;
  toggleValue: () => void;
  allBoards: BoardData[] | undefined;
  boardId: string | undefined;
  username: string | null | undefined;
  logOut: () => void;
  currentUser: IUser | undefined;
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
      className="bg-white dark:bg-dark-grey dark:border-lines-dark border-lines-light border-r w-[300px] flex flex-col min-h-max overflow-auto relative"
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
                  <h3 className="text-medium-grey text-heading-s ml-8 mt-2 mb-1">
                    Your boards (
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
                            `h-12 group hover:cursor-pointer rounded-r-full pl-8 mb-1 flex flex-row items-center dark:hover:bg-white hover:bg-main-purple-hover text-medium-grey fill-grey ${
                              isActive &&
                              "bg-main-purple hover:dark:bg-white fill-white text-white"
                            }`
                          }
                        >
                          <svg
                            className={`w-4 h-4 dark:group-hover:fill-purple group-hover:fill-white
                        `}
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
                          </svg>
                          <h3
                            id="board-name"
                            className={`dark:group-hover:text-main-purple group-hover:text-white text-heading-m pl-4`}
                          >
                            {board.name}
                          </h3>{" "}
                        </NavLink>
                      </li>
                    ))}
                  <h3 className="text-light-pink text-heading-s ml-8 mt-2 mb-1">
                    Shared boards (
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
                          <svg
                            className={`w-4 h-4 group-hover:fill-white`}
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
                          </svg>
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
                      <svg
                        className="w-4 h-4 fill-purple group-hover:fill-light-purple"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
                      </svg>
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
                <svg
                  className="w-4 h-4 fill-purple group-hover:fill-light-purple"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
                </svg>
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
        className={`flex flex-col items-start my-8 mr-6 ${
          !currentUser && "absolute bottom-0"
        }`}
      >
        <div className="py-2 w-full flex justify-end">
          <Toggle value={value} toggleValue={toggleValue}></Toggle>
        </div>
        <button
          className={`dark:hover:bg-white hover:bg-lines-light h-12 flex flex-row items-center pl-8 hover:cursor-pointer rounded-r-full group w-full`}
          onClick={hideSidebar}
        >
          <svg
            width="18"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            className="group-hover:fill-purple fill-grey"
          >
            <path d="M8.522 11.223a4.252 4.252 0 0 1-3.654-5.22l3.654 5.22ZM9 12.25A8.685 8.685 0 0 1 1.5 8a8.612 8.612 0 0 1 2.76-2.864l-.86-1.23A10.112 10.112 0 0 0 .208 7.238a1.5 1.5 0 0 0 0 1.524A10.187 10.187 0 0 0 9 13.75c.414 0 .828-.025 1.239-.074l-1-1.43A8.88 8.88 0 0 1 9 12.25Zm8.792-3.488a10.14 10.14 0 0 1-4.486 4.046l1.504 2.148a.375.375 0 0 1-.092.523l-.648.453a.375.375 0 0 1-.523-.092L3.19 1.044A.375.375 0 0 1 3.282.52L3.93.068a.375.375 0 0 1 .523.092l1.735 2.479A10.308 10.308 0 0 1 9 2.25c3.746 0 7.031 2 8.792 4.988a1.5 1.5 0 0 1 0 1.524ZM16.5 8a8.674 8.674 0 0 0-6.755-4.219A1.75 1.75 0 1 0 12.75 5v-.001a4.25 4.25 0 0 1-1.154 5.366l.834 1.192A8.641 8.641 0 0 0 16.5 8Z" />
          </svg>
          <p className="text-medium-grey text-heading-m group-hover:text-main-purple pl-4">
            Hide Sidebar
          </p>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
