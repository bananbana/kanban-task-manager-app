import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { IconCloseModal } from "../assets/images/IconCloseModal";
import { IconEmail } from "../assets/images/IconEmail";
import { IconChevronRight } from "../assets/images/IconChevronRight";
import { IconUsername } from "../assets/images/IconUsername";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  emailModal: boolean;
  usernameModal: boolean;
  email: string | undefined;
  username: string | undefined;
  newEmail: string;
  newUsername: string;
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordValidation: (e: React.ChangeEvent<HTMLInputElement>) => void;
  password: string;
  handleSubmit: (e: React.FormEvent) => void;
}

const SettingsModal = ({
  isOpen,
  closeModal,
  emailModal,
  usernameModal,
  email,
  username,
  newEmail,
  newUsername,
  handleEmailChange,
  handleUsernameChange,
  handlePasswordValidation,
  password,
  handleSubmit,
}: Props) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const openEditMode = () => {
    setIsEditMode(true);
  };

  const exitEditMode = () => {
    setIsEditMode(false);
  };

  useEffect(() => {
    if (!isOpen) {
      setIsEditMode(false);
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
                <Dialog.Panel className="acc-modal">
                  <Dialog.Title
                    as="h3"
                    className="text-heading-xl dark:text-white font-medium px-2 mt-2 mb-4 flex justify-between"
                  >
                    {emailModal && "Email"}
                    {usernameModal && "Username"}
                    <button
                      type="button"
                      className="h-8 w-8 flex justify-center items-center rounded-full dark:text-white hover:text-destructive-red outline-0 ring-0 focus:ring-1 focus:ring-destructive-red"
                      onClick={closeModal}
                    >
                      <IconCloseModal />
                    </button>
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 px-2">
                      Manage and keep your contact information up to date.
                    </p>
                  </div>
                  {isEditMode && (
                    <Form
                      method="put"
                      id="edit-user-form"
                      className="flex flex-col pl-2 my-4"
                      onSubmit={handleSubmit}
                    >
                      {emailModal && (
                        <div id="change-email" className="flex flex-col">
                          <label className="pb-2 text-body-m text-medium-grey">
                            Your new email address:
                          </label>
                          <input
                            type="text"
                            value={newEmail}
                            onChange={handleEmailChange}
                            required
                            autoFocus
                            className="form-input"
                          ></input>
                        </div>
                      )}
                      {usernameModal && (
                        <div id="change-username" className="flex flex-col">
                          <label className="pb-2 text-body-m text-medium-grey">
                            Your new username:
                          </label>
                          <input
                            type="text"
                            value={newUsername}
                            onChange={handleUsernameChange}
                            required
                            autoFocus
                            className="form-input"
                          ></input>
                        </div>
                      )}
                      <label className="pb-2 py-4 text-body-m text-medium-grey">
                        Confirm with your password:
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={handlePasswordValidation}
                        required
                        className={`form-input`}
                      />
                      <p className="text-medium-grey text-body-m font-thin mt-4">
                        This action will require you to log into your account
                        again.
                      </p>
                      <div
                        id="form-btns"
                        className="flex justify-between w-full mt-10"
                      >
                        <button
                          className="bg-main-purple text-white rounded-full py-2 px-3"
                          type="submit"
                        >
                          Confirm
                        </button>
                        <button
                          className="bg-destructive-red text-white rounded-full px-3 py-2"
                          onClick={exitEditMode}
                        >
                          Cancel
                        </button>
                      </div>
                    </Form>
                  )}
                  {emailModal && !isEditMode && (
                    <button
                      className="my-10 p-4 w-full rounded-2xl flex hover:bg-main-purple-hover/70 hover:text-white border border-lines-light dark:border-lines-dark dark:bg-very-dark-grey dark:text-white dark:hover:bg-main-purple outline-0 ring-0 focus:ring-1 focus:ring-main-purple"
                      onClick={openEditMode}
                      title="Change email"
                    >
                      <IconEmail />
                      <p className="ml-2">{email}</p>

                      <IconChevronRight className="w-6 h-6 ml-auto" />
                    </button>
                  )}
                  {usernameModal && !isEditMode && (
                    <button
                      className="my-10 p-4 w-full rounded-2xl flex hover:bg-main-purple-hover/70 hover:text-white border border-lines-light dark:border-lines-dark dark:bg-very-dark-grey dark:text-white dark:hover:bg-main-purple outline-0 ring-0 focus:ring-1 focus:ring-main-purple"
                      onClick={openEditMode}
                      title="Change username"
                    >
                      <IconUsername />

                      <p className="ml-2">{username}</p>
                      <IconChevronRight className="w-6 h-6 ml-auto" />
                    </button>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default SettingsModal;
