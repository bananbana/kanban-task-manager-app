import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Form } from "react-router-dom";

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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-dark-grey p-6 text-left align-middle shadow-xl transition-all h-[450px]">
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
                    className="text-heading-xl dark:text-white font-medium px-2 mt-2 mb-4"
                  >
                    {emailModal && "Email"}
                    {usernameModal && "Username"}
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
                            className="focus:ring-main-purple border-lines-light dark:border-lines-dark rounded-md"
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
                            className="focus:ring-main-purple border-lines-light dark:border-lines-dark rounded-md"
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
                        className={`focus:ring-main-purple border-lines-light dark:border-lines-dark rounded-md`}
                      ></input>
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
                          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                        />
                      </svg>
                      <p className="ml-2">{email}</p>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 ml-auto"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </button>
                  )}
                  {usernameModal && !isEditMode && (
                    <button
                      className="my-10 p-4 w-full rounded-2xl flex hover:bg-main-purple-hover/70 hover:text-white border border-lines-light dark:border-lines-dark dark:bg-very-dark-grey dark:text-white dark:hover:bg-main-purple outline-0 ring-0 focus:ring-1 focus:ring-main-purple"
                      onClick={openEditMode}
                      title="Change username"
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
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                        />
                      </svg>

                      <p className="ml-2">{username}</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 ml-auto"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                      </svg>
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
