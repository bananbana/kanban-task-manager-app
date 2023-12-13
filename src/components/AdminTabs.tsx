import { useState } from "react";
import { Tab } from "@headlessui/react";
import { UserType } from "../types/UserType";
import { BoardData } from "../types/BoardTypes";
import DeleteUserDialog from "./DeleteUserDialog";
import useAdminMutation from "../assets/hooks/useMutateAdmin";
import DeleteBoardDialog from "./DeleteBoardDialog";
import EditRolesModal from "./EditRolesModal";
import ShareBoardAdminModal from "./ShareBoardAdminModal";
import AdminTabsUser from "./AdminTabsUsers";
import AdminTabsBoards from "./AdminTabsBoards";

interface AdminTabsProps {
  users: UserType[] | undefined;
  boards: BoardData[] | undefined;
}

export const AdminTabs = ({ users, boards }: AdminTabsProps) => {
  const { deleteBoardAdmin, deleteUserAdmin, assignAdmin, updateUserAccess } =
    useAdminMutation();

  const [deleteUserOpen, setDeleteUserOpen] = useState(false);
  const [deleteBoardOpen, setDeleteBoardOpen] = useState(false);
  const [rolesModalOpen, setRolesModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [selectedBoard, setSelectedBoard] = useState<BoardData | null>(null);

  const [categories] = useState({
    Users: [{ id: 1, username: "", roles: [], boards: [] }],
    Boards: [{ id: 1, name: "", ownerId: 1, tasks: [] }],
  });

  const roles = [
    { id: 1, name: "User" },
    { id: 2, name: "Admin" },
  ];

  const openDeleteUserDialog = () => {
    setDeleteUserOpen(true);
  };
  const closeDeleteUserDialog = () => {
    setDeleteUserOpen(false);
  };

  const openDeleteBoardDialog = () => {
    setDeleteBoardOpen(true);
  };

  const closeDeleteBoardDialog = () => {
    setDeleteBoardOpen(false);
  };

  const openRolesModal = () => {
    setRolesModalOpen(true);
  };

  const closeRolesModal = () => {
    setRolesModalOpen(false);
  };

  const openShareModal = () => {
    setShareModalOpen(true);
  };

  const closeShareModal = () => {
    setShareModalOpen(false);
  };

  const handleDeleteBoard = (boardId?: number) => {
    boardId && deleteBoardAdmin(boardId);
    closeDeleteBoardDialog();
  };

  const handleDeleteUser = (userId?: number) => {
    userId && deleteUserAdmin(userId);
    closeDeleteUserDialog();
  };

  const handleAssignAdminRole = (userId?: number) => {
    userId && assignAdmin(userId);
    closeRolesModal();
  };

  const handleShareBoard = (users: UserType[], boardId?: number) => {
    boardId && updateUserAccess({ users, boardId });
    closeShareModal();
  };

  return (
    <div className="container flex w-full">
      <div id="tab-container" className="w-3/4 h-fit px-2 mx-8 py-16 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 dark:bg-lines-dark/20 p-1 w-full">
            {Object.keys(categories).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  `w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-offset-2 ring-offset-main-purple focus:outline-none
                 ${
                   selected
                     ? "bg-white dark:bg-main-purple dark:text-white text-main-purple shadow"
                     : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                 }`
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel
              key="user-panel"
              className={`rounded-xl bg-white dark:bg-dark-grey p-3
                ring-white/60 ring-offset-2 ring-main-purple focus:outline-none focus:ring-2`}
            >
              <AdminTabsUser
                users={users}
                setSelectedUser={setSelectedUser}
                roles={roles}
                openDeleteModal={openDeleteUserDialog}
                openRolesModal={openRolesModal}
              />
            </Tab.Panel>
            <Tab.Panel
              key="board-panel"
              className={`rounded-xl bg-white dark:bg-dark-grey p-3
                ring-white/60 ring-offset-2 ring-offset-main-purple focus:outline-none focus:ring-2`}
            >
              <AdminTabsBoards
                users={users}
                boards={boards}
                setSelectedBoard={setSelectedBoard}
                openDeleteModal={openDeleteBoardDialog}
                openShareModal={openShareModal}
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      <DeleteUserDialog
        isOpen={deleteUserOpen}
        closeModal={closeDeleteUserDialog}
        username={selectedUser ? selectedUser.username : ""}
        handleDeleteUser={() => handleDeleteUser(selectedUser?.id)}
      />
      <DeleteBoardDialog
        isOpen={deleteBoardOpen}
        closeModal={closeDeleteBoardDialog}
        handleDeleteBoard={() => handleDeleteBoard(selectedBoard?.id)}
        boardName={selectedBoard ? selectedBoard.name : ""}
      />
      <EditRolesModal
        isOpen={rolesModalOpen}
        closeModal={closeRolesModal}
        assignAdminRole={() => handleAssignAdminRole(selectedUser?.id)}
      />
      <ShareBoardAdminModal
        isOpen={shareModalOpen}
        closeModal={closeShareModal}
        selectedBoard={selectedBoard}
        users={users}
        shareBoard={handleShareBoard}
      />
    </div>
  );
};
