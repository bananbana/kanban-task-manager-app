import { Dialog, Transition } from "@headlessui/react";
import { Fragment, Ref, useEffect, useState } from "react";
import { BoardData } from "../types/BoardTypes";
import { UserType } from "../types/UserType";
import IUser from "../types/user.type";
import { IconCloseModal } from "../assets/images/IconCloseModal";
import PrivacyOwnedBoardsModal from "./PrivacyOwnedBoardsModal";
import PrivacyPasswordModal from "./PrivacyPasswordModal";
import PrivacySharedBoardsModal from "./PrivacySharedBoardsModal";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  passwordModal: boolean;
  yourBoardsModal: boolean;
  sharedBoardsModal: boolean;
  ownedBoards: BoardData[] | undefined;
  boards: BoardData[] | undefined;
  users: UserType[] | undefined;
  currentUser: IUser | null;
  removeUser: (arg1: number, arg2: number) => void;
  newPassword: string;
  handlePasswordValidation: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  removeBoardAccess: (args: number) => void;
  parent: Ref<HTMLDivElement>;
  usersList: Ref<HTMLUListElement>;
}

const PrivacyModal = ({
  isOpen,
  closeModal,
  passwordModal,
  yourBoardsModal,
  sharedBoardsModal,
  ownedBoards,
  boards,
  users,
  currentUser,
  removeUser,
  newPassword,
  handlePasswordChange,
  handlePasswordValidation,
  handleSubmit,
  removeBoardAccess,
  parent,
  usersList,
}: Props) => {
  const [selectedBoard, setSelectedBoard] = useState<BoardData | null>(null);

  const selectBoard = (board: BoardData) => {
    setSelectedBoard(board);
    if (selectedBoard === board) {
      setSelectedBoard(null);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setSelectedBoard(null);
    }
  }, [isOpen]);
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
                <Dialog.Panel className="acc-modal">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="h-8 w-8 flex justify-center items-center rounded-full dark:text-white hover:text-destructive-red outline-0 ring-0 focus:ring-1 focus:ring-destructive-red"
                      onClick={closeModal}
                    >
                      <IconCloseModal />
                    </button>
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-heading-xl dark:text-white font-medium mt-2 mb-4 text-left flex justify-between"
                  >
                    {passwordModal && "Change your password"}
                    {yourBoardsModal &&
                      "Manage users with access to your boards"}
                    {sharedBoardsModal &&
                      "Manage your access to other users' boards"}
                  </Dialog.Title>
                  <div id="main-modal" className="flex">
                    {passwordModal && (
                      <PrivacyPasswordModal
                        newPassword={newPassword}
                        handlePasswordValidation={handlePasswordValidation}
                        handlePasswordChange={handlePasswordChange}
                        handleSubmit={handleSubmit}
                      />
                    )}
                    {yourBoardsModal && (
                      <PrivacyOwnedBoardsModal
                        ownedBoards={ownedBoards}
                        removeUser={removeUser}
                        selectedBoard={selectedBoard}
                        selectBoard={selectBoard}
                        parent={parent}
                        usersList={usersList}
                        users={users}
                      />
                    )}
                    {sharedBoardsModal && (
                      <PrivacySharedBoardsModal
                        boards={boards}
                        currentUser={currentUser}
                        removeBoardAccess={removeBoardAccess}
                        parent={parent}
                        users={users}
                      />
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default PrivacyModal;
