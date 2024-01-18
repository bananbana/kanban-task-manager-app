import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BoardData } from "../types/BoardTypes";
import { UserType } from "../types/UserType";
import { IconDeleteBoard } from "../assets/images/IconDeleteBoard";
import { IconAccess } from "../assets/images/IconAccess";

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
                <Popover.Button
                  className={`
                             ${
                               open
                                 ? "dark:text-white ring-main-purple ring-1"
                                 : "dark:text-white/90"
                             }
                             w-full outline-0 rounded-xl overflow-hidden hover:bg-gray-100 dark:hover:bg-lines-dark/20`}
                  onClick={() => setSelectedBoard(board)}
                >
                  <li key={board.id} className="w-full relative p-4">
                    <h3 className="text-sm font-medium leading-5 dark:hover:text-main-purple flex">
                      {board.name}
                    </h3>

                    <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-medium-grey justify-start">
                      <li className="flex w-1/4 items-center">
                        Owner:{" "}
                        {
                          users?.find((user) => user.id === board.ownerId)
                            ?.username
                        }
                      </li>
                      <li className="w-1/5 flex items-center mb-2">
                        Tasks: {board.tasks.length}
                      </li>
                      <li className="flex w-3/5 flex-wrap items-center">
                        Access:{" "}
                        {board.userIds.map((userId, index) => {
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
                            <IconDeleteBoard />
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
                            <IconAccess />
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
