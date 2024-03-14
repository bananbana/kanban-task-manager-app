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
import { useLocation } from "react-router-dom";
import { authHeader } from "../services/auth-header";
import { LogoLight } from "../assets/images/LogoLight";
import { LogoDark } from "../assets/images/LogoDark";
import { LogoMobile } from "../assets/images/LogoMobile";
import { IconChevronDown } from "../assets/images/IconChevronDown";
import { IconListBullet } from "../assets/images/IconListBullet";
import { IconShareBoard } from "../assets/images/IconShareBoard";
import { IconTrashcan } from "../assets/images/IconTrashcan";
import { IconEdit } from "../assets/images/IconEdit";
import { IconCross } from "../assets/images/IconCross";
import { IconAddTaskMobile } from "../assets/images/IconAddTaskMobile";

interface HeaderProps {
  isDarkTheme: boolean;
  sidebarHidden: boolean;
  openedBoard: BoardData | undefined;
  currentUserName: string | undefined;
  currentUser: IUser | null;
  users: UserType[] | undefined;
  toggleSidebar: () => void;
}

const Header = ({
  isDarkTheme,
  sidebarHidden,
  openedBoard,
  currentUserName,
  currentUser,
  users,
  toggleSidebar,
}: HeaderProps) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const { deleteBoard } = useBoardMutation();
  const location = useLocation();

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
      className={`flex justify-between items-center tablet:h-24 phone:h-16 dark:bg-dark-grey dark:border-lines-dark bg-white border-lines-light border-b`}
    >
      <div className="flex items-center h-full">
        <div
          className={`hidden pl-8 pr-[114px] tablet:w-[260px] tablet:pl-[26px] tablet:pr-[81px] h-full tablet:flex items-center border-r dark:border-lines-dark border-lines-light
          ${sidebarHidden ? "px-8" : ""}
          `}
        >
          <Link to="/">{isDarkTheme ? <LogoLight /> : <LogoDark />}</Link>
        </div>
        <Link to="/" className="tablet:hidden mx-4">
          <LogoMobile />
        </Link>
        {currentUser && (
          <div className="text-heading-xl items-center tablet:ml-8">
            <h3
              className={`dark:text-white text-black phone:flex items-center w-full`}
            >
              {openedBoard ? openedBoard.name : ""}
              <button
                className="tablet:hidden ml-2 pt-2"
                onClick={toggleSidebar}
              >
                <IconChevronDown />
              </button>
            </h3>

            {openedBoard !== undefined &&
              openedBoard.ownerId !== currentUser.id && (
                <h3 className="text-heading-s mt-1 text-medium-grey">
                  {
                    users?.find((user) => user.id === openedBoard?.ownerId)
                      ?.username
                  }
                  s' board
                </h3>
              )}
          </div>
        )}{" "}
        {location.pathname.includes("account") &&
          authHeader().username !== "Guest" && (
            <div className="text-heading-xl items-center ml-8">
              <h3 className={`dark:text-white text-black`}>Account Settings</h3>
            </div>
          )}
        {location.pathname.includes("privacy") &&
          authHeader().username !== "Guest" && (
            <div className="text-heading-xl items-center ml-8">
              <h3 className={`dark:text-white text-black`}>Privacy Settings</h3>
            </div>
          )}
        {location.pathname.includes("admin") &&
          authHeader().username !== "Guest" && (
            <div className="text-heading-xl items-center ml-8">
              <h3 className={`dark:text-white text-black`}>Admin Dashboard</h3>
            </div>
          )}
      </div>
      <div
        id="header-btns"
        className="flex flex-row items-center w-fit mr-[30px]"
      >
        <Link
          to={`user/boards/${openedBoard?.id}/tasks/new`}
          className="h-full"
        >
          <button
            id="add-task-btn"
            className="btn-primary-l mr-4 phone:w-12 tablet:w-fit tablet:items-center"
            disabled={!openedBoard}
          >
            <span className="tablet:inline hidden px-6 py-3">
              {" "}
              + Add New Task
            </span>
            <span className="tablet:hidden px-2 py-[10px]">
              <IconAddTaskMobile />
            </span>
          </button>
        </Link>
        <div
          id="header-more-btn"
          className={`flex justify-center items-center rounded-full`}
        >
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button
                disabled={!openedBoard}
                className="flex flex-col w-full justify-center dark:bg-dark-grey bg-white shadow-[0px_4px_6px_0px_rgba(54,78,126,0.1)] rounded-full hover:bg-medium-grey/20 dark:hover:bg-very-dark-grey/50 focus:outline-none py-3 px-2"
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
              <Menu.Items className="absolute right-0 mt-4 pb-4 px-4 w-48 origin-top-right divide-y divide-gray-100 rounded-lg shadow-[0px_4px_6px_0px_rgba(54,78,126,0.1)] bg-white dark:bg-very-dark-grey focus:outline-none">
                <div>
                  <Menu.Item>
                    <Form action={`user/boards/${openedBoard?.id}/edit`}>
                      <button
                        className={`hover:bg-main-purple-hover/30
                        text-medium-grey group flex w-full items-center rounded-md py-2 text-sm`}
                        type="submit"
                      >
                        <IconEdit className="w-5 h-5 mx-2" />
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
                        <IconShareBoard className="w-5 h-5 mx-2" />
                        Share Board
                      </button>
                    </Menu.Item>
                  )}
                  <Menu.Item>
                    <button
                      className={`text-destructive-red hover:bg-destructive-red/20 group flex w-full items-center rounded-md py-2 text-sm`}
                      onClick={openDeleteModal}
                    >
                      <IconTrashcan className="w-5 h-5 mx-2" />
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
        openedBoard={openedBoard}
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
