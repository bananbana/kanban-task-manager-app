import { useEffect, useState } from "react";
import PrivacyModal from "../components/PrivacyModal";
import { useQueryClient } from "@tanstack/react-query";
import { BoardData } from "../types/BoardTypes";
import { UserType } from "../types/UserType";
import AuthService from "../services/auth.service";
import IUser from "../types/user.type";

const Privacy = () => {
  const queryClient = useQueryClient();
  const boards = queryClient.getQueryData<BoardData[]>(["boards"]);
  const users = queryClient.getQueryData<UserType[]>(["users"]);
  const [isOpen, setIsOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [yourBoardsModalOpen, setYourBoardsModalOpen] = useState(false);
  const [sharedBoardsModalOpen, setSharedBoardsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

  const openModal = (modalType: string) => {
    if (modalType === "password") {
      setPasswordModalOpen(true);
    } else if (modalType === "yourBoards") {
      setYourBoardsModalOpen(true);
    } else if (modalType === "sharedBoards") {
      setSharedBoardsModalOpen(true);
    }

    setIsOpen(true);
  };

  const closeModal = () => {
    setPasswordModalOpen(false);
    setYourBoardsModalOpen(false);
    setSharedBoardsModalOpen(false);
    setIsOpen(false);
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) setCurrentUser(user);
  }, []);

  console.log(currentUser);

  return (
    <div
      id="container"
      className="h-full w-full flex justify-start items-center flex-col"
    >
      <header
        id="privacy-header"
        className="border-b-2 border-lines-light dark:border-lines-dark w-full min-h-[140px] flex items-center text-heading-xl dark:text-white"
      >
        <h3 id="privacy-header-content" className="ml-8">
          Privacy settings
        </h3>
      </header>
      <div className="bg-white flex flex-col w-[480px] rounded-2xl border-collapse mt-10">
        <div
          className="border border-collapse rounded-t-xl border-lines-light py-6 pl-6 hover:bg-main-purple-hover/70 flex w-full justify-between pr-6 dark:border-lines-dark dark:bg-very-dark-grey dark:hover:bg-main-purple dark:text-white hover:cursor-pointer items-center hover:text-white"
          onClick={() => openModal("password")}
        >
          <span>
            <p>Password</p>
            <p className="text-body-m text-medium-grey font-normal pt-2">
              ********
            </p>
          </span>
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
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
        <div
          className="border border-collapse border-lines-light py-6 pl-6 hover:bg-main-purple-hover/70 flex w-full justify-between pr-6 dark:border-lines-dark dark:bg-very-dark-grey dark:hover:bg-main-purple dark:text-white hover:cursor-pointer items-center hover:text-white"
          onClick={() => openModal("yourBoards")}
        >
          <span>
            <p>Your shared boards</p>
            <p className="text-body-m text-medium-grey font-normal pt-2">
              Boards:{" "}
              {boards?.filter((board) => board.userIds.length > 1).length}
            </p>
          </span>
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
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
        <div
          className="border border-collapse rounded-b-xl border-lines-light py-6 pl-6 hover:bg-main-purple-hover/70 flex w-full justify-between pr-6 dark:border-lines-dark dark:bg-very-dark-grey dark:hover:bg-main-purple dark:text-white hover:cursor-pointer items-center hover:text-white"
          onClick={() => openModal("sharedBoards")}
        >
          <span>
            <p>Boards shared to you</p>
            <p className="text-body-m text-medium-grey font-normal pt-2">
              Boards:{" "}
              {
                boards?.filter((board) => board.ownerId !== currentUser?.id)
                  .length
              }
            </p>
          </span>
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
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>
      <PrivacyModal
        currentUser={currentUser}
        users={users}
        boards={boards}
        isOpen={isOpen}
        closeModal={closeModal}
        passwordModal={passwordModalOpen}
        yourBoardsModal={yourBoardsModalOpen}
        sharedBoardsModal={sharedBoardsModalOpen}
      />
    </div>
  );
};
export default Privacy;
