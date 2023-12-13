import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BoardData } from "../types/BoardTypes";
import { UserType } from "../types/UserType";

interface AdminTabsBoardsProps {
  users: UserType[] | undefined;
  boards: BoardData[] | undefined;
  setSelectedBoard: (args: BoardData) => void;
  openDeleteModal: () => void;
  openShareModal: () => void;
}

const AdminTabsBoards = ({
  users,
  boards,
  setSelectedBoard,
  openDeleteModal,
  openShareModal,
}: AdminTabsBoardsProps) => {
  return (
    <>
      <ul className="dark:text-white">
        {boards?.map((board) => (
          <Popover key={board.id} id="popover" className="relative">
            {({ open }) => (
              <>
                {open && setSelectedBoard(board)}
                <Popover.Button
                  className={`
                             ${
                               open
                                 ? "dark:text-white ring-main-purple ring-1"
                                 : "dark:text-white/90"
                             }
                             w-full outline-0`}
                >
                  <li
                    key={board.id}
                    className="relative rounded-md p-3 hover:bg-gray-100 dark:hover:bg-lines-dark/20"
                  >
                    <h3 className="text-sm font-medium leading-5 flex">
                      {board.name}
                    </h3>

                    <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-medium-grey justify-start">
                      <li className="flex w-1/4">
                        Owner:{" "}
                        {
                          users?.find((user) => user.id === board.ownerId)
                            ?.username
                        }
                      </li>
                      <li className="w-1/5 flex items-center">
                        Tasks: {board.tasks.length}
                      </li>
                      <li className="flex w-3/5 flex-wrap">
                        Access:{" "}
                        {board.userIds
                          // .slice(0, 3)
                          .map((userId, index) => {
                            const user = users?.find(
                              (user) => user.id === userId
                            );

                            return (
                              <div
                                key={user?.id}
                                className="flex flex-col justify-around"
                              >
                                <p className="ml-1">
                                  {user?.username}
                                  {index !== board.userIds.length - 1 && ", "}
                                </p>
                              </div>
                            );
                          })}
                        {/* {board.userIds.length > 2 && (
                                  <div className="flex flex-col justify-around">
                                    <p> ...</p>
                                  </div>
                                )} */}
                      </li>
                    </ul>
                    <a
                      href="#"
                      className={`absolute inset-0 rounded-md ring-main-purple focus:z-10 focus:outline-none focus:ring-2`}
                    />
                  </li>
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute z-10 mt-3 right-0 h-fit max-w-7/12">
                    <div className="shadow-lg ring-1 ring-black/5 rounded-lg">
                      <div className="relative flex flex-col bg-white dark:bg-very-dark-grey rounded-lg">
                        <a
                          id="board-delete"
                          onClick={openDeleteModal}
                          className="flex items-center p-2 transition duration-150 ease-in-out hover:bg-red-hover/10 dark:hover:bg-dark-grey focus:outline-none focus-visible:ring focus-visible:ring-main-purple/50 rounded-lg hover:cursor-pointer"
                        >
                          <div className="flex h-10 w-10 mr-2 shrink-0 items-center justify-center text-destructive-red sm:h-12 sm:w-12 bg-red-hover/70 dark:bg-lines-dark rounded-lg">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              Delete board
                            </p>
                            <p className="text-sm text-medium-grey font-thin">
                              This action will delete board and all its data for
                              all users with access to it.
                            </p>
                          </div>
                        </a>
                        <a
                          id="user-access"
                          className="flex items-center p-2 transition duration-150 ease-in-out hover:bg-gray-50 dark:hover:bg-dark-grey focus:outline-none focus-visible:ring focus-visible:ring-main-purple/50 rounded-lg hover:cursor-pointer"
                          onClick={openShareModal}
                        >
                          <div className="flex h-10 w-10 mr-2 shrink-0 items-center justify-center text-main-purple sm:h-12 sm:w-12 bg-lines-light dark:bg-lines-dark rounded-lg">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                              />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              User access
                            </p>
                            <p className="text-sm text-medium-grey font-thin">
                              Manage users with access to this board.
                            </p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        ))}
      </ul>
    </>
  );
};

export default AdminTabsBoards;
