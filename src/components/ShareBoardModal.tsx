import { Dialog, Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { BoardData } from "../types/BoardTypes";
import { CheckIcon } from "@heroicons/react/20/solid";
import useBoardMutation from "../assets/hooks/useMutateBoard";
import { getUsers } from "../users";
import { useQuery } from "@tanstack/react-query";
import authService from "../services/auth.service";
import { IconChevronDown } from "../assets/images/IconChevronDown";
import { IconChevronUp } from "../assets/images/IconChevronUp";
import { useToast } from "./ui/useToast";

interface ShareBoardModalProps {
  isOpen: boolean;
  closeModal: () => void;
  openedBoard: BoardData | undefined;
  boardName: string | undefined;
  currentUserName: string | undefined;
}

const userQuery = () => ({
  queryKey: ["users"],
  queryFn: () => getUsers(),
  enabled: !!authService.getCurrentUser(),
});

const ShareBoardModal = ({
  isOpen,
  closeModal,
  boardName,
  openedBoard,
  currentUserName,
}: ShareBoardModalProps) => {
  const [selectedUsername, setSelectedUsername] = useState<string>("");
  const { shareBoard } = useBoardMutation();
  const { data: users } = useQuery(userQuery());
  const { toast } = useToast();

  useEffect(() => {
    if (users) {
      setSelectedUsername(users[0].username);
    }
  }, [users]);

  const handleShareBoard = (userId: number, boardId: number) => {
    shareBoard({ userId, boardId });
  };
  const onBoardShare = () => {
    const selectedUserId = users?.find(
      (user) => user.username === selectedUsername
    )?.id;
    if (selectedUserId !== undefined && openedBoard) {
      handleShareBoard(selectedUserId, openedBoard.id);
      closeModal();

      toast({
        title: `You shared '${boardName}' board.`,
        description: `User ${selectedUsername} now has full access to this board.`,
        className: "toast variant-default",
      });
    }
  };
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
              <Dialog.Panel className="w-full h-fit max-w-md transform overflow-visible rounded-2xl bg-white dark:bg-dark-grey p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-heading-l text-black dark:text-white"
                >
                  Do you want to share '{boardName}' board?{" "}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-medium-grey">
                    This action will grant the chosen user access to all
                    columns, tasks and subtasks in this board and will allow
                    them to change this data.
                  </p>
                </div>
                <Listbox
                  value={selectedUsername}
                  onChange={setSelectedUsername}
                >
                  <div className="relative mt-6">
                    <Listbox.Label className="text-body-m text-medium-grey pb-2">
                      Users
                    </Listbox.Label>
                    <Listbox.Button
                      className={`relative w-full cursor-default p-4 rounded-md text-body-l h-[40px] border border-lines-light dark:border-lines-dark text-left focus:outline-none focus-visible:border-main-purple dark:focus:border-main-purple flex items-center justify-start hover:border-main-purple dark:hover:border-main-purple`}
                    >
                      {({ open }) => (
                        <>
                          <span className="block truncate w-full text-black dark:text-white">
                            {selectedUsername}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2" />
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
                      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-dark-grey dark:ring-white/5 shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        {users
                          ?.filter((user) => user.username !== currentUserName)
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
                              value={user.username}
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
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-medium-grey">
                                      <CheckIcon
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                      ></CheckIcon>
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
                <div className="mt-4 flex w-full justify-between gap-4">
                  <button
                    className="h-10 bg-main-purple w-1/2 rounded-full text-white hover:bg-main-purple-hover"
                    disabled={openedBoard === undefined}
                    onClick={onBoardShare}
                  >
                    Share
                  </button>
                  <button
                    className="h-10 bg-light-grey w-1/2 rounded-full text-main-purple hover:bg-main-purple/25 dark:hover:bg-white"
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

export default ShareBoardModal;
