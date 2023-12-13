import { useQueryClient } from "@tanstack/react-query";
import { Form, useNavigate, useParams } from "react-router-dom";
import { TaskDetails } from "../types/TaskTypes";
import React, { useRef } from "react";
import useCloseModal from "../assets/hooks/useCloseMenu";
import useTaskMutation from "../assets/hooks/useMutateTask";

const DeleteTask = () => {
  const { taskId } = useParams();
  const queryClient = useQueryClient();
  const modalRef = useRef<HTMLDivElement>(null);
  const taskData = queryClient.getQueryData<TaskDetails>(["tasks", taskId]);
  const { task } = taskData ?? {};
  const navigate = useNavigate();
  const { deleteTask } = useTaskMutation();

  const handleDeleteTask = (taskId: number, boardId: number) => {
    deleteTask({ taskId, boardId });
  };

  useCloseModal(modalRef, () => navigate(-1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task !== undefined) {
      handleDeleteTask(task.id, task.boardId);
    }
  };

  return (
    <div className="h-full w-screen backdrop-brightness-50 -top-56 absolute flex justify-center items-center">
      <div
        id="delete-task-modal"
        ref={modalRef}
        className="bg-white dark:bg-dark-grey z-20 rounded-md w-[480px] flex flex-col"
      >
        <h1 className="text-heading-l text-destructive-red pt-8 pl-8">
          Delete this task?
        </h1>
        <Form method="delete" id="delete-task-form" onSubmit={handleSubmit}>
          <h3 className="text-body-l text-medium-grey pt-6 px-8">
            {`Are you sure you want to delete the ${task?.title} task? This actions
          will remove all subtasks and cannot be reversed.`}
          </h3>
          <div className="flex w-full justify-evenly mb-10 mt-6">
            <button
              className="h-10 bg-destructive-red w-[200px] rounded-full text-white hover:bg-red-hover"
              type="submit"
            >
              Delete Task
            </button>
            <button
              className="h-10 bg-light-grey w-[200px] rounded-full text-main-purple hover:bg-main-purple/25 dark:hover:bg-white"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </Form>
      </div>{" "}
    </div>
  );
};

export default DeleteTask;
