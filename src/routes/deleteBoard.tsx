import { useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { BoardDetails } from "../types/BoardTypes";
import useCloseModal from "../assets/hooks/useCloseMenu";
import useBoardMutation from "../assets/hooks/useMutateBoard";

const DeleteBoard = () => {
  const queryClient = useQueryClient();
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { boardId } = useParams();
  const boardData = queryClient.getQueryData<BoardDetails>(["boards", boardId]);
  const { board } = boardData ?? {};
  const { deleteBoard } = useBoardMutation();

  useCloseModal(modalRef, () => navigate(-1));

  return (
    <div className="h-full w-screen backdrop-brightness-50 top-0 left-0 absolute z-10 flex justify-center items-center">
      <div
        ref={modalRef}
        className="bg-white dark:bg-dark-grey z-20 rounded-md w-[480px] flex flex-col"
      >
        <h1 className="text-heading-l text-destructive-red pt-8 pl-8">
          Delete this board?
        </h1>
        <span className="text-body-l text-medium-grey pt-6 px-8">
          {`Are you sure you want to delete the '${board?.name}' board? This actions
          will remove all columns and tasks and cannot be reversed.`}
        </span>
        <div className="flex w-full justify-evenly mb-10 mt-6">
          <button
            className="h-10 bg-destructive-red w-[200px] rounded-full text-white hover:bg-red-hover"
            onClick={() =>
              board
                ? deleteBoard(board.id.toString())
                : console.log("No board id provided")
            }
          >
            Delete
          </button>
          <button
            className="h-10 bg-light-grey w-[200px] rounded-full text-main-purple hover:bg-main-purple/25 dark:hover:bg-white"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </div>{" "}
    </div>
  );
};

export default DeleteBoard;
