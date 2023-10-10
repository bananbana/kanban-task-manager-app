import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BoardData } from "../types/BoardTypes";
import axios from "axios";
import useBoards from "../assets/hooks/useBoards";
import useCloseModal from "../assets/hooks/useCloseModal";
import { useRef } from "react";
import useBoardDetails from "../assets/hooks/useBoardsDetails";
import { TaskData } from "../types/TaskTypes";

interface ConfirmDeleteModalProps {
  closeModal: () => void;
  openedBoardId: number;
  onClose: () => void;
  deleteOnWhat: string;
  openedTaskId: number;
}

const ConfirmDeleteModal = ({
  closeModal,
  openedBoardId,
  onClose,
  deleteOnWhat,
  openedTaskId,
}: ConfirmDeleteModalProps) => {
  const queryClient = useQueryClient();
  const modalRef = useRef<HTMLDivElement>(null);
  useCloseModal(modalRef, onClose);
  const { data } = useBoards();
  const { tasksData } = useBoardDetails(openedBoardId);
  const openedTask = tasksData?.find((task) => task.id === openedTaskId);
  const openedBoard = data?.find((board) => board.id === openedBoardId);

  const deleteBoard = useMutation({
    mutationFn: (boardId: number) => {
      return axios.delete<BoardData>(`http://localhost:8080/boards/${boardId}`);
    },
    onSuccess: () => {
      onClose();
      void queryClient.invalidateQueries(["boards"]);
    },
  });

  const deleteTask = useMutation({
    mutationFn: (taskId: number) => {
      return axios.delete<TaskData>(
        `http://localhost:8080/boards/${openedBoardId}/tasks/${taskId}`
      );
    },
    onSuccess: () => {
      onClose();
      void queryClient.invalidateQueries(["tasks"]);
    },
  });

  return (
    <div
      ref={modalRef}
      className="bg-white dark:bg-dark-grey z-20 rounded-md w-[480px] flex flex-col"
    >
      <h1 className="text-heading-l text-destructive-red pt-8 pl-8">
        {(deleteOnWhat === "board" && "Delete this board?") ||
          (deleteOnWhat === "task" && "Delete this task?")}
      </h1>
      <span className="text-body-l text-medium-grey pt-6 px-8">
        Are you sure you want to delete the '
        {(deleteOnWhat === "board" && openedBoard?.name) ||
          (deleteOnWhat === "task" && openedTask?.title)}
        '{" "}
        {(deleteOnWhat === "board" && "board") ||
          (deleteOnWhat === "task" && "task")}
        ? This actions will remove all columns and tasks and cannot be reversed.
      </span>
      <div className="flex w-full justify-evenly mb-10 mt-6">
        <button
          className="h-10 bg-destructive-red w-[200px] rounded-full text-white hover:bg-red-hover"
          onClick={() => {
            (deleteOnWhat === "board" && deleteBoard.mutate(openedBoardId)) ||
              (deleteOnWhat === "task" && deleteTask.mutate(openedTaskId));
          }}
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
    </div>
  );
};

export default ConfirmDeleteModal;
