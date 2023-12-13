import { Fragment, useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import { BoardData } from "../types/BoardTypes";
import { Menu, Transition } from "@headlessui/react";
import { IconVerticalEllipsis } from "../assets/images/IconVerticalEllipsis";
import useBoardMutation from "../assets/hooks/useMutateBoard";
import DeleteModal from "./DeleteModal";
import ShareBoardModal from "./ShareBoardModal";
import IUser from "../types/user.type";
import { UserType } from "../types/UserType";

interface HeaderProps {
  isDarkTheme: boolean;
  sidebarHidden: boolean;
  openedBoard: BoardData | undefined;
  currentUserName: string | undefined;
  currentUser: IUser | undefined;
  users: UserType[] | undefined;
}

const Header = ({
  isDarkTheme,
  sidebarHidden,
  openedBoard,
  currentUserName,
  currentUser,
  users,
}: HeaderProps) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const { deleteBoard } = useBoardMutation();
  const navigate = useNavigate();

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
  };
  const openDeleteModal = () => {
    setIsDeleteOpen(true);
  };

  const closeShareModal = () => {
    setIsShareOpen(false);
  };
  const openShareModal = () => {
    setIsShareOpen(true);
  };

  const handleDeleteBoard = (boardId: string) => {
    deleteBoard(boardId);
    navigate("/");
    closeDeleteModal();
  };

  return (
    <div
      id="header"
      className={`flex-row flex justify-between items-center h-24 dark:bg-dark-grey dark:border-lines-dark bg-white border-lines-light border-b`}
    >
      <div className="flex flex-row items-center h-full">
        <div
          className={`pl-8 pr-[114px] h-full flex items-center border-r dark:border-lines-dark border-lines-light
          ${sidebarHidden ? "px-8" : ""}
          `}
        >
          <Link to="/">
            <img
              src={`/src/assets/images/${
                isDarkTheme ? "logo-light" : "logo-dark"
              }.svg`}
            ></img>
          </Link>
        </div>
        {currentUser && openedBoard !== undefined && (
          <div className="text-heading-xl items-center ml-8">
            <h3 className={`dark:text-white text-black`}>
              {openedBoard ? openedBoard.name : ""}
            </h3>
            {openedBoard.ownerId !== currentUser.id && (
              <h3 className="text-heading-s mt-1 text-medium-grey">
                {
                  users?.find((user) => user.id === openedBoard?.ownerId)
                    ?.username
                }{" "}
                shared you this board
              </h3>
            )}
          </div>
        )}
      </div>
      <div
        id="header-btns"
        className="h-fit flex flex-row justify-between w-fit items-center"
      >
        <Link to={`user/boards/${openedBoard?.id}/tasks/new`}>
          <button
            id="add-task-btn"
            className="bg-main-purple hover:bg-main-purple-hover text-[#FFFFFF] px-6 mx-2 h-12 max-h-12 font-medium rounded-full disabled:bg-main-purple-hover"
            disabled={!openedBoard}
          >
            + Add New Task
          </button>
        </Link>
        <div
          id="header-more-btn"
          className={`flex mx-2 justify-center items-center rounded-full w-fit`}
        >
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button
                disabled={!openedBoard}
                className="flex flex-col w-full justify-center dark:bg-dark-grey bg-white shadow-[0px_4px_6px_0px_rgba(54,78,126,0.1)] rounded-full px-4 py-4 hover:bg-medium-grey/20 dark:hover:bg-very-dark-grey/50 focus:outline-none"
              >
                <IconVerticalEllipsis />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-4 pb-4 px-4 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-very-dark-grey focus:outline-none">
                <div>
                  <Menu.Item>
                    <Form action={`user/boards/${openedBoard?.id}/edit`}>
                      <button
                        className={`hover:bg-main-purple-hover/30
                        text-medium-grey group flex w-full items-center rounded-md py-2 text-sm`}
                        type="submit"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5 mx-2"
                        >
                          <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                          <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                        </svg>
                        Edit Board
                      </button>
                    </Form>
                  </Menu.Item>
                  {openedBoard?.ownerId === currentUser?.id && (
                    <Menu.Item>
                      <button
                        className={`hover:bg-main-purple-hover/30
                        text-medium-grey group flex w-full items-center rounded-md py-2 text-sm`}
                        onClick={openShareModal}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5 mx-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                          />
                        </svg>
                        Share Board
                      </button>
                    </Menu.Item>
                  )}
                  <Menu.Item>
                    <button
                      className={`text-destructive-red hover:bg-destructive-red/20 group flex w-full items-center rounded-md py-2 text-sm`}
                      onClick={openDeleteModal}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5 mx-2"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Delete Board
                    </button>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      <DeleteModal
        isOpen={isDeleteOpen}
        closeModal={closeDeleteModal}
        boardName={openedBoard?.name}
        openedBoard={undefined}
        handleDeleteBoard={handleDeleteBoard}
      />
      <ShareBoardModal
        isOpen={isShareOpen}
        closeModal={closeShareModal}
        openedBoard={openedBoard}
        boardName={openedBoard?.name}
        currentUserName={currentUserName}
      />
    </div>
  );
};

export default Header;
