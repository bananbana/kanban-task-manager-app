import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import DeleteAccountModal from "./DeleteAccountModal";
import { BoardData } from "../types/BoardTypes";
import { UserType } from "../types/UserType";
import autoAnimate from "@formkit/auto-animate";
import IUser from "../types/user.type";
import { Form } from "react-router-dom";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  passwordModal: boolean;
  yourBoardsModal: boolean;
  sharedBoardsModal: boolean;
  boards: BoardData[] | undefined;
  users: UserType[] | undefined;
  currentUser: IUser | undefined;
}

const PrivacyModal = ({
  isOpen,
  closeModal,
  passwordModal,
  yourBoardsModal,
  sharedBoardsModal,
  boards,
  users,
  currentUser,
}: Props) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<BoardData | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const parent = useRef(null);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const openConfirmModal = () => {
    setIsConfirmOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmOpen(false);
    setSelectedBoard(null);
  };

  const selectBoard = (board: BoardData) => {
    setSelectedBoard(board);
    if (selectedBoard === board) setSelectedBoard(null);
  };

  const selectUser = (userId: number) => {
    const user = users.find((user) => user.id === userId)
    setSelectedUser(user);
    if (selectedUser === user) setSelectedUser(null);
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const validatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const validatePassword = e.target.value;
    if (currentUser && validatePassword !== currentUser.password) {
      console.log("Wrong password");
    } else if (currentUser && validatePassword === currentUser.password) {
      console.log("Git");
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25"></div>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-dark-grey p-4 text-left align-middle shadow-xl transition-all h-fit">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="h-8 w-8 flex justify-center items-center rounded-full dark:text-white hover:text-destructive-red outline-0 ring-0 focus:ring-1 focus:ring-destructive-red"
                      onClick={closeModal}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-heading-xl dark:text-white font-medium mt-2 mb-4 text-left"
                  >
                    {passwordModal && "Change your password"}{" "}
                    {yourBoardsModal &&
                      "Manage users with access to your boards"}{" "}
                    {sharedBoardsModal &&
                      "Manage your access to other users' boards"}
                  </Dialog.Title>
                  <div id="main-modal" className="flex">
                    {yourBoardsModal && (
                      <div
                        id="owned-boards-modal"
                        className="overflow-hidden text-medium-grey"
                      >
                        <p className="">
                          Select which users should no longer have access to
                          your board.
                        </p>
                        <div
                          ref={parent}
                          className="flex justify-between overflow-hidden mb-6 pt-2"
                        >
                          <ul className="w-3/4 py-4 pr-4 border border-lines-light rounded-l-2xl overflow-y-auto max-h-[300px]">
                            <p className="text-heading-s font-normal w-full pl-2 mb-2">
                              Your boards
                            </p>
                            {boards
                              ?.filter((boards) => boards.userIds.length > 1)
                              .map((board) => (
                                <li key={board.id}>
                                  <button
                                    className={`flex items-center py-2 px-3 rounded-r-full hover:bg-main-purple hover:text-white group w-full outline-0 ring-0 focus:ring-2 focus:ring-main-purple ${
                                      selectedBoard === board
                                        ? "bg-main-purple text-white"
                                        : ""
                                    }`}
                                    onClick={() => selectBoard(board)}
                                  >
                                    <svg
                                      className={`mr-2 w-4 h-4 dark:group-hover:fill-purple fill-grey group-hover:fill-white ${
                                        selectedBoard === board
                                          ? "fill-white"
                                          : ""
                                      }
                        `}
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
                                    </svg>
                                    <p>{board.name}</p>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      className="w-4 h-4 ml-auto"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                      />
                                    </svg>
                                  </button>
                                </li>
                              ))}
                          </ul>
                          {selectedBoard && (
                            <div className="w-1/2 flex flex-col items-end pl-2 py-4 border-lines-light border border-collapse rounded-r-2xl dark:border-lines-dark overflow-hidden">
                              <ul className="w-full">
                                <p className="text-heading-s font-normal w-full pl-2 mb-2">
                                  Users with access
                                </p>
                                {selectedBoard.userIds
                                  .filter((id) => selectedBoard.ownerId !== id)
                                  .map((userId) => (
                                    <li key={userId}>
                                      <button className=" rounded-l-full flex  items-center justify-between py-2 px-3 w-full hover:bg-red-hover hover:text-white hover:fill-white outline-0 ring-0 focus:ring-2 focus:ring-destructive-red" onClick={() => selectUser(userId)}>
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth={1.5}
                                          stroke="currentColor"
                                          className="w-5 h-5"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                                          />
                                        </svg>

                                        <p>
                                          {users
                                            ? users.find(
                                                (user) => user.id === userId
                                              )?.username
                                            : "There are no users with access to this board."}
                                        </p>
                                      </button>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {sharedBoardsModal && (
                      <div
                        id="shared-boards-modal"
                        className="overflow-hidden text-medium-grey"
                      >
                        <p>Which boards you no longer want shared access to?</p>
                        <div className="flex justify-between overflow-hidden mb-6 pt-2">
                          <ul className="w-3/4 mt-6 py-4 pr-4 border border-lines-light rounded-2xl overflow-y-auto max-h-[300px]">
                            <p className="text-heading-s font-normal w-full pl-2 mb-2">
                              Boards
                            </p>
                            {boards
                              ?.filter(
                                (board) => board.ownerId !== currentUser?.id
                              )
                              .map((board) => (
                                <li key={board.id}>
                                  <button className="flex items-center py-2 px-3 rounded-r-full hover:bg-red-hover hover:text-white group w-full outline-0 ring-0 focus:ring-2 focus:ring-red-hover  text-destructive-red">
                                    <svg
                                      className={`mr-2 w-4 h-4 fill-red group-hover:fill-white
                        `}
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
                                    </svg>
                                    <p>{board.name}</p>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-5 h-5 ml-auto"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                  </button>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    )}
                    {passwordModal && (
                      <div
                        id="password-main"
                        className="text-medium-grey w-full"
                      >
                        <p>This action will require you to log in again.</p>
                        <Form
                          method="put"
                          id="password-change-form"
                          className="flex flex-col  my-4"
                        >
                          <label className="pb-2 text-body-m">
                            Confirm your old password
                          </label>
                          <input
                            id="confirm_password"
                            name="oldPassword"
                            onChange={validatePassword}
                            type="password"
                            required
                            autoFocus
                            className="focus:ring-main-purple border-lines-light dark:border-lines-dark rounded-md mb-4"
                          ></input>
                          <span id="message"></span>

                          <label className="pb-2 text-body-m">
                            Your new password
                          </label>
                          <input
                            type="password"
                            className="focus:ring-main-purple border-lines-light dark:border-lines-dark rounded-md"
                            value={newPassword}
                            onChange={handlePasswordChange}
                            required
                          ></input>
                          <div
                            id="password-form-btns"
                            className="flex justify-between w-full mt-10"
                          >
                            <button
                              className="bg-main-purple text-white rounded-full py-2 px-3"
                              type="submit"
                            >
                              Confirm
                            </button>
                            <button className="bg-destructive-red text-white rounded-full px-3 py-2">
                              Cancel
                            </button>{" "}
                          </div>
                        </Form>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <span className="mt-8 flex w-1/3 justify-end px-8">
        <button
          className="py-2 px-4 rounded-full bg-destructive-red text-white hover:bg-red-hover shadow-[0px_4px_6px_0px_rgba(54,78,126,0.1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-destructive-red/50 focus-visible:ring-offset-1"
          onClick={openConfirmModal}
        >
          Delete your account
        </button>
      </span>
      <DeleteAccountModal
        isOpen={isConfirmOpen}
        closeModal={closeConfirmModal}
      />
    </>
  );
};

export default PrivacyModal;
