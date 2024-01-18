import { Ref } from "react";
import { IconBoard } from "../assets/images/IconBoard";
import { IconChevronRight } from "../assets/images/IconChevronRight";
import { IconDeleteUser } from "../assets/images/IconDeleteUser";
import { BoardData } from "../types/BoardTypes";
import { UserType } from "../types/UserType";

interface ModalProps {
  ownedBoards: BoardData[] | undefined;
  removeUser: (arg1: number, arg2: number) => void;
  selectedBoard: BoardData | null;
  parent: Ref<HTMLDivElement>;
  usersList: Ref<HTMLUListElement>;
  selectBoard: (arg: BoardData) => void;
  users: UserType[] | undefined;
}

const PrivacyOwnedBoardsModal = ({
  ownedBoards,
  removeUser,
  selectedBoard,
  parent,
  usersList,
  selectBoard,
  users,
}: ModalProps) => {
  return (
    <div id="owned-boards-modal" className="text-medium-grey overflow-hidden">
      <p>Select which users should no longer have access to your board.</p>
      <div ref={parent} className="acc-boards-modal">
        <ul className="overflow-y-auto max-h-[250px] w-2/3 py-2 pr-2">
          <div>
            <p className="text-heading-s font-normal w-full px-2 mb-2">
              Your boards
            </p>
          </div>
          {ownedBoards
            ?.filter((boards) => boards.userIds.length > 1)
            .map((board) => (
              <li key={board.id}>
                <button
                  className={`flex items-center py-2 px-3 rounded-r-full hover:text-white group w-full outline-0 ring-0 focus:ring-2 focus:ring-main-purple ${
                    selectedBoard === board
                      ? "bg-main-purple text-white"
                      : "hover:bg-main-purple-hover"
                  }`}
                  onClick={() => selectBoard(board)}
                >
                  <IconBoard
                    className={`mr-2 w-4 h-4 dark:group-hover:fill-purple fill-grey group-hover:fill-white ${
                      selectedBoard === board ? "fill-white" : ""
                    }`}
                  />
                  <p>{board.name}</p>
                  <IconChevronRight className="w-4 h-4 ml-auto" />
                </button>
              </li>
            ))}
        </ul>
        {selectedBoard && (
          <ul
            ref={usersList}
            id="user-access-div"
            className="border-l-lines-light border-l max-h-[250px] overflow-y-auto w-1/3 pl-2"
          >
            {" "}
            <div className="h-1/4 pb-4">
              <p className="text-heading-s font-normal w-full">
                Users with access
              </p>
            </div>
            {selectedBoard.userIds
              .filter((id) => selectedBoard.ownerId !== id)
              .map((userId) => (
                <li key={userId}>
                  <button
                    className=" rounded-l-full flex  items-center justify-between py-2 px-3 w-full hover:bg-red-hover hover:text-white hover:fill-white outline-0 ring-0 focus:ring-2 focus:ring-destructive-red"
                    onClick={() => removeUser(userId, selectedBoard.id)}
                  >
                    <IconDeleteUser />

                    <p>
                      {users
                        ? users.find((user) => user.id === userId)?.username
                        : "There are no users with access to this board."}
                    </p>
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PrivacyOwnedBoardsModal;
