import { Dialog, Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { UserType } from "../types/UserType";
import { BoardData } from "../types/BoardTypes";
import { IconDeleteUser } from "../assets/images/IconDeleteUser";
import { IconChevronUp } from "../assets/images/IconChevronUp";
import { IconChevronDown } from "../assets/images/IconChevronDown";

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
                        <li
                          key={user.id}
                          className="text-medium-grey text-heading-m font-normal flex justify-between mt-2"
                        >
                          {user.username}
                          <button
                            id="btn"
                            disabled={user.id === selectedBoard?.ownerId}
                            onClick={() => removeUser(user.id)}
                            className={`text-destructive-red hover:scale-105 disabled:hidden`}
                          >
                            <IconDeleteUser />
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
                            {open ? <IconChevronUp /> : <IconChevronDown />}
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
                    className="btn-primary-s w-1/3"
                    onClick={() =>
                      shareBoard(usersWithAccess, selectedBoard?.id)
                    }
                  >
                    Save
                  </button>
                  <button
                    className="btn-secondary w-1/3"
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
