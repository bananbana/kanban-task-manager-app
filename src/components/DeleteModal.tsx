import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BoardData } from "../types/BoardTypes";

interface DeleteModalProps {
  isOpen: boolean;
  closeModal: () => void;
  boardName: string | undefined;
  openedBoard: BoardData | undefined;
  handleDeleteBoard: (args: string) => void;
}

const DeleteModal = ({
  isOpen,
  closeModal,
  boardName,
  openedBoard,
  handleDeleteBoard,
}: DeleteModalProps) => {
  return (
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
                  className="text-heading-l text-destructive-red"
                >
                  Delete this board?{" "}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete '{boardName}' board? This
                    action will remove all columns and tasks and cannot be
                    reversed.
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    className="h-10 bg-destructive-red w-[200px] rounded-full text-white hover:bg-red-hover"
                    onClick={() =>
                      openedBoard &&
                      handleDeleteBoard(openedBoard.id.toString())
                    }
                    disabled={openedBoard === undefined}
                  >
                    Delete
                  </button>
                  <button
                    className="h-10 bg-light-grey w-[200px] rounded-full text-main-purple hover:bg-main-purple/25 dark:hover:bg-white"
                    onClick={closeModal}
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

export default DeleteModal;
