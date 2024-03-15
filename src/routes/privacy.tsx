import { useEffect, useState } from "react";
import PrivacyModal from "../components/PrivacyModal";
import { useQueryClient } from "@tanstack/react-query";
import { BoardData } from "../types/BoardTypes";
import { UserType } from "../types/UserType";
import useUserMutation from "../assets/hooks/useUserMutation";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { currentUserSignal } from "../userSignal";
import { IconChevronRight } from "../assets/images/IconChevronRight";
import { useToast } from "../components/ui/useToast";

const Privacy = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { denyUserAccess, changePassword, removeBoardAccess } =
    useUserMutation();
  const [parent] = useAutoAnimate();
  const [list] = useAutoAnimate();
  const [isOpen, setIsOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [yourBoardsModalOpen, setYourBoardsModalOpen] = useState(false);
  const [sharedBoardsModalOpen, setSharedBoardsModalOpen] = useState(false);
  const currentUser = currentUserSignal.value;
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [ownedBoards, setOwnedBoards] = useState<BoardData[]>([]);
  const [sharedBoards, setSharedBoards] = useState<BoardData[]>([]);
  const users = queryClient.getQueryData<UserType[]>(["users"]);
  const boards = queryClient.getQueryData<BoardData[]>(["boards"]);

  useEffect(() => {
    if (currentUser !== null && boards !== undefined) {
      setOwnedBoards(
        boards.filter((board) => board.ownerId === currentUser.id)
      );
      setSharedBoards(
        boards.filter((board) => board.ownerId !== currentUser.id)
      );
    }
  }, [currentUser, boards]);

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

  const handleRemoveUser = (userId: number, boardId: number) => {
    denyUserAccess({ userId, boardId });
  };

  const handlePasswordValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleChangePassword = () => {
    const id = currentUser?.id;
    const username = currentUser?.username;
    const email = currentUser?.email;
    const password = oldPassword;
    if (id && username && email && password && newPassword) {
      changePassword({ id, newPassword, password, username, email });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void handleChangePassword();
    toast({
      title: "Password changed successfully!",
      className: "toast variant-success",
    });
    closeModal();
    setNewPassword("");
    setOldPassword("");
  };

  const handleRemoveBoardAccess = (boardId: number) => {
    removeBoardAccess({ boardId });
  };
  return (
    <div
      id="container"
      className="h-full w-full flex justify-start items-center flex-col"
    >
      <div className="acc-main">
        <div className="acc-compartment" onClick={() => openModal("password")}>
          <span>
            <p>Password</p>
            <p className="text-body-m text-medium-grey group-hover:text-white font-normal pt-2">
              ********
            </p>
          </span>
          <IconChevronRight className="h-6 w-6" />
        </div>
        <div
          className="acc-compartment"
          onClick={() => openModal("yourBoards")}
        >
          <span>
            <p>Your shared boards</p>
            <p className="text-body-m text-medium-grey group-hover:text-white font-normal pt-2">
              {"Boards: "}
              {ownedBoards &&
              ownedBoards.filter((board) => board.userIds.length > 1)
                ? ownedBoards.filter((board) => board.userIds.length > 1).length
                : "You don't share any boards"}
            </p>
          </span>
          <IconChevronRight className="h-6 w-6" />
        </div>
        <div
          className="hover:bg-light-pink/70 dark:bg-very-dark-grey dark:hover:bg-light-pink hover:text-white group acc-compartment"
          onClick={() => openModal("sharedBoards")}
        >
          <span>
            <p>Boards shared to you</p>
            <p className="text-body-m group-hover:text-white text-medium-grey font-normal pt-2">
              {"Boards: "}
              {sharedBoards.length
                ? sharedBoards.length
                : "You don't have shared access to any board"}
            </p>
          </span>
          <IconChevronRight className="h-6 w-6" />
        </div>
      </div>
      <PrivacyModal
        handleSubmit={handleSubmit}
        currentUser={currentUser}
        users={users}
        ownedBoards={ownedBoards}
        boards={boards}
        isOpen={isOpen}
        closeModal={closeModal}
        passwordModal={passwordModalOpen}
        yourBoardsModal={yourBoardsModalOpen}
        sharedBoardsModal={sharedBoardsModalOpen}
        removeUser={handleRemoveUser}
        newPassword={newPassword}
        handlePasswordValidation={handlePasswordValidation}
        handlePasswordChange={handlePasswordChange}
        removeBoardAccess={handleRemoveBoardAccess}
        parent={parent}
        usersList={list}
      />
    </div>
  );
};
export default Privacy;
