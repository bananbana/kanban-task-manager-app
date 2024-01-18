import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { Form } from "react-router-dom";

interface Props {
  closeModal: () => void;
  isOpen: boolean;
  password: string;
  handlePasswordValidation: (e: React.ChangeEvent<HTMLInputElement>) => void;

  handleDeleteAccount: (e: React.FormEvent) => void;
}
const DeleteAccountModal = ({
  closeModal,
  isOpen,
  handleDeleteAccount,
  password,
  handlePasswordValidation,
}: Props) => {
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Do you really want to delete your account?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      This action will permanently delete your account and all
                      your data and cannot be reversed.
                    </p>
                  </div>

                  <Form
                    method="delete"
                    id="delete-account-form"
                    onSubmit={handleDeleteAccount}
                  >
                    <div className="mt-4 flex justify-between flex-col">
                      <label className="pb-2 py-2 text-body-m text-medium-grey">
                        Password:
                      </label>
                      <input
                        type="password"
                        onChange={handlePasswordValidation}
                        value={password}
                        required
                        autoFocus
                        className="form-input"
                      />
                      <p className="text-medium-grey text-body-m font-thin mt-2">
                        Please provide your password to validate this operation.
                      </p>
                      <div id="delete-acc-btns" className="flex gap-4 mt-10">
                        <button type="submit" className="btn-destructive w-1/2">
                          Got it, thanks!
                        </button>
                        <button
                          type="button"
                          className="btn-secondary w-1/2"
                          onClick={closeModal}
                        >
                          Changed my mind.
                        </button>
                      </div>
                    </div>
                  </Form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DeleteAccountModal;
