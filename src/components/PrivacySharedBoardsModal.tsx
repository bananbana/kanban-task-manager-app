import { Ref } from "react";
import { IconBoard } from "../assets/images/IconBoard";
import { IconMinus } from "../assets/images/IconMinus";
import { BoardData } from "../types/BoardTypes";
import IUser from "../types/user.type";
import { UserType } from "../types/UserType";

interface ModalProps {
  boards: BoardData[] | undefined;
  currentUser: IUser | null;
  removeBoardAccess: (args: number) => void;
  parent: Ref<HTMLDivElement>;
  users: UserType[] | undefined;
}

const PrivacySharedBoardsModal = ({
  boards,
  currentUser,
  removeBoardAccess,
  parent,
  users,
}: ModalProps) => {
  return (
    <div
      id="shared-boards-modal"
      className="overflow-hidden text-medium-grey w-full"
    >
      <p>Which boards you no longer want shared access to?</p>
      <div ref={parent} className="acc-boards-modal">
        <ul className="w-full overflow-y-auto max-h-[250px] py-2 pr-2">
          <p className="text-heading-s font-normal w-full pl-2 mb-2">Boards</p>
          {boards
            ?.filter((board) => board.ownerId !== currentUser?.id)
            .map((board) => (
              <li key={board.id}>
                <button
                  className="flex items-center py-2 px-3 rounded-r-full hover:bg-red-hover hover:text-white group w-full outline-0 ring-0 focus:ring-2 focus:ring-red-hover  text-destructive-red group"
                  onClick={() => removeBoardAccess(board.id)}
                >
                  <IconBoard className="mr-2 w-4 h-4 fill-red group-hover:fill-white" />
                  <p className="w-2/5 text-start">{board.name}</p>
                  <p className="mx-auto text-body-m font-normal text-medium-grey group-hover:text-white">
                    Owner:{" "}
                    {users?.find((user) => user.id === board.ownerId)?.username}
                  </p>
                  <IconMinus />
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default PrivacySharedBoardsModal;
