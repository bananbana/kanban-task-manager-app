import { useRef } from "react";
import DotDropDown from "./DotDropDown";
import useCloseModal from "../assets/hooks/useCloseModal";
import useTask from "../assets/hooks/useTask";
import axios from "axios";
import useUpdateSubtask from "../assets/hooks/useUpdateSubtask";
import { SubtaskData } from "../types/SubtaskTypes";

interface TaskModalProps {
  closeDotMenu: () => void;
  openedTaskId: number;
  openedBoardId: number;
  openTaskDotMenu: () => void;
  taskDotMenuOpen: boolean;
  onClose: () => void;
  editTask: () => void;
  openConfirmModal: () => void;
  deleteOnWhat: string;
}

const TaskModal = ({
  closeDotMenu,
  openedTaskId,
  openTaskDotMenu,
  taskDotMenuOpen,
  onClose,
  openedBoardId,
  editTask,
  openConfirmModal,
  deleteOnWhat,
}: TaskModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useCloseModal(modalRef, onClose);

  const { toggleSubtask } = useUpdateSubtask(openedTaskId);
  const handleToggleSubtask = async ({
    subtaskId,
    isCompleted,
    title,
    taskId,
  }: {
    subtaskId: number;
    isCompleted: boolean;
    title: string;
    taskId: number;
  }): Promise<void> => {
    try {
      const subtaskData: SubtaskData = {
        id: subtaskId,
        title: title,
        isCompleted,
        taskId: taskId,
      };
      await toggleSubtask(subtaskData);
    } catch (error) {
      console.error("Error toggling subtask:", error);
    }
  };

  const handleChange = (
    subtaskId: number,
    event: React.ChangeEvent<HTMLInputElement>,
    title: string,
    taskId: number
  ) => {
    const isCompleted = event.target.checked;

    handleToggleSubtask({ subtaskId, isCompleted, title, taskId }).catch(
      (error) => {
        console.error("Error toggling subtask:", error);
      }
    );
  };

  const taskDetails = useTask(openedTaskId, openedBoardId);
  const {
    taskData,
    subtaskData,
    taskLoading,
    subtaskLoading,
    taskError,
    subtaskError,
  } = taskDetails;

  if (taskLoading || subtaskLoading) {
    return <div>Loading...</div>;
  }
  if (taskError) {
    console.log(openedTaskId);

    return (
      <div>
        Error fetching task:{" "}
        {axios.isAxiosError(taskError) && taskError.message}
      </div>
    );
  }
  if (subtaskError) {
    return (
      <div>
        Error fetching subtasks:{" "}
        {axios.isAxiosError(subtaskError) && subtaskError.message}
      </div>
    );
  }

  return (
    <div
      key={openedTaskId}
      ref={modalRef}
      className={`absolute z-10 flex flex-col w-[480px] justify-center py-8 px-8 rounded-lg dark:bg-dark-grey bg-white`}
    >
      <div
        className={`dark:text-white flex flex-row justify-between w-full items-center`}
      >
        <p className="mr-6 text-heading-l w-full">{taskData?.title}</p>
        <button
          className={`relative flex justify-center items-center rounded-full`}
          onClick={openTaskDotMenu}
        >
          <img
            className="my-2 mx-2"
            src="/src/assets/images/icon-vertical-ellipsis.svg"
          ></img>
          {taskDotMenuOpen && taskData && (
            <div className="absolute top-14">
              <DotDropDown
                editContent={editTask}
                onClose={closeDotMenu}
                topContent="Edit Task"
                bottomContent="Delete Task"
                deleteContent={openConfirmModal}
                whatToDelete={deleteOnWhat}
              ></DotDropDown>
            </div>
          )}
        </button>
      </div>
      <span className="text-body-l text-medium-grey my-6">
        {taskData?.description ? taskData.description : "No description"}
      </span>
      <div className="flex flex-col mb-6">
        <span className="text-body-m text-medium-grey">
          Subtasks (
          {subtaskData?.filter((subtask) => subtask.isCompleted).length} of{" "}
          {subtaskData?.length})
        </span>
        <div>
          {subtaskData?.map((subtask) => (
            <div
              key={subtask.id}
              className={`flex flex-row justify-start items-center py-3 px-3 my-2 rounded-md hover:bg-main-purple hover:bg-opacity-25 dark:bg-very-dark-grey dark:text-white bg-light-grey`}
            >
              <input
                type="checkbox"
                checked={subtask.isCompleted}
                className="checked:bg-main-purple dark:bg-dark-grey dark:border-lines-dark rounded-sm mr-3 border-lines-light focus:ring-0 active:outline-none"
                onChange={(e) =>
                  handleChange(subtask.id, e, subtask.title, subtask.taskId)
                }
              ></input>
              <p
                className={`text-body-m flex flex-wrap w-full ${
                  subtask.isCompleted ? "text-medium-grey line-through" : ""
                }`}
              >
                {subtask.title}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default TaskModal;
