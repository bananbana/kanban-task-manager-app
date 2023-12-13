import { Dialog, Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { UserType } from "../types/UserType";
import { BoardData } from "../types/BoardTypes";

interface ShareBoardModalProps {
  isOpen: boolean;
  closeModal: () => void;
  selectedBoard: BoardData | null;
  users: UserType[] | undefined;
  shareBoard: (arg1: UserType[], arg2: number | undefined) => void;
}

const ShareBoardAdminModal = ({
  isOpen,
  closeModal,
  selectedBoard,
  users,
  shareBoard,
}: ShareBoardModalProps) => {
  const [usersWithAccess, setUsersWithAccess] = useState<UserType[]>([
    { id: 0, username: "", roles: [], boards: [], email: "" },
  ]);
  const [selectedUserId, setSelectedUserId] = useState<number>();

  useEffect(() => {
    if (selectedBoard && users && !selectedUserId) {
      const boardUserIds = selectedBoard.userIds || [];
      setUsersWithAccess(
        users.filter((user) => boardUserIds.includes(user.id))
      );
    } else if (selectedBoard && users && selectedUserId) {
      setUsersWithAccess((prevUsers) => {
        const updatedUserIds = new Set([
          ...prevUsers.map((user) => user.id),
          selectedUserId,
        ]);

        const updatedUsers = users.filter((user) =>
          updatedUserIds.has(user.id)
        );

        return updatedUsers;
      });
    }
  }, [selectedBoard, selectedUserId, users]);

  const removeUser = (userId: number) => {
    const deletedUser = usersWithAccess.find((user) => user.id === userId);
    deletedUser &&
      setUsersWithAccess((prevUsers) =>
        prevUsers.filter((user) => user.id !== deletedUser.id)
      );
  };

  const handleCloseModal = () => {
    closeModal();
    setSelectedUserId(undefined);
    setUsersWithAccess([
      { id: 0, username: "", roles: [], boards: [], email: "" },
    ]);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleCloseModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full h-fit max-w-md transform overflow-visible rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-heading-xl mt-6">
                  Do you want to share '{selectedBoard?.name}' board?{" "}
                </Dialog.Title>
                <div className="mt-3">
                  <p className="text-sm text-gray-500">
                    This action will grant the chosen user access to all
                    columns, tasks and subtasks in this board and will allow
                    them to change this data.
                  </p>
                  <div className="mt-2">
                    Users with access:{" "}
                    <ul key="users-list" className="mt-3">
                      {usersWithAccess?.map((user) => (
                        <li className="text-medium-grey text-heading-m font-normal flex justify-between mt-2">
                          {user.username}
                          <button
                            id="btn"
                            disabled={user.id === selectedBoard?.ownerId}
                            onClick={() => removeUser(user.id)}
                            className={`text-destructive-red hover:scale-105 disabled:hidden`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                              />
                            </svg>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <Listbox value={selectedUserId} onChange={setSelectedUserId}>
                  <div className="relative mt-6">
                    <Listbox.Button
                      className={`relative w-full cursor-default p-4 rounded-md text-body-l h-[40px] border border-lines-light dark:border-lines-dark text-left focus:outline-none focus-visible:border-main-purple dark:focus:border-main-purple flex items-center justify-between text-medium-grey hover:border-main-purple dark:hover:border-main-purple`}
                    >
                      {({ open }) => (
                        <>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2" />
                          Users
                          <div className="">
                            <svg
                              width="10"
                              height="7"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke="#635FC7"
                                strokeWidth="2"
                                fill="none"
                                d={open ? "M9 6 5 2 1 6" : "m1 1 4 4 4-4"}
                              />
                            </svg>
                          </div>
                        </>
                      )}
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        {users
                          ?.filter(
                            (user) =>
                              !selectedBoard?.userIds.includes(user.id) &&
                              !usersWithAccess.some((u) => u.id === user.id) &&
                              selectedBoard?.ownerId !== user.id // Exclude users with access and owner
                          )
                          .map((user) => (
                            <Listbox.Option
                              key={user.id}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? "bg-main-purple-hover text-white"
                                    : "text-medium-grey"
                                }`
                              }
                              value={user.id}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? "font-medium" : "font-normal"
                                    }`}
                                  >
                                    {user.username}
                                  </span>
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
                <div className="mt-6 mb-4 justify-between flex">
                  <button
                    className="h-10 bg-main-purple w-[120px] rounded-full text-white hover:bg-main-purple-hover"
                    onClick={() =>
                      shareBoard(usersWithAccess, selectedBoard?.id)
                    }
                  >
                    Share
                  </button>
                  <button
                    className="h-10 bg-light-grey w-[120px] rounded-full text-main-purple hover:bg-main-purple/25 dark:hover:bg-white"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ShareBoardAdminModal;
