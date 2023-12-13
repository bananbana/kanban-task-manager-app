import React, { useEffect, useRef, useState } from "react";
import useCloseModal from "../assets/hooks/useCloseModal";
import useBoardDetails from "../assets/hooks/useBoard";
import DropdownMenu from "./DropDownMenu";
import InputAndDelete from "./InputAndDelete";
import useTaskMutation from "../assets/hooks/useMutateTask";
import useTask from "../assets/hooks/useTask";

interface NewTaskModalProps {
  onClose: () => void;
  openedBoardId: number;
  createTaskModal: boolean;
  editTaskModal: boolean;
  openedTaskId: number;
}

const NewTaskModal = ({
  onClose,
  openedBoardId,
  editTaskModal,
  createTaskModal,
  openedTaskId,
}: NewTaskModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useCloseModal(modalRef, onClose);

  const { createTask, editTask, addSubtaskToTask, editSubtask, deleteSubtask } =
    useTaskMutation();
  const { statusCodesData } = useBoardDetails(openedBoardId);
  const { taskData, subtaskData } = useTask(openedTaskId, openedBoardId);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState("");
  const [subtasks, setSubtasks] = useState([{ id: 1, value: "" }]);
  const [statusId, setStatusId] = useState(
    statusCodesData?.[0]?.id !== undefined ? statusCodesData[0].id : 0
  );

  useEffect(() => {
    if (editTaskModal && taskData && subtaskData) {
      setStatusId(taskData.statusId);
      setTitle(taskData.title);
      setDescription(taskData.description);
      setSubtasks(
        subtaskData.map((subtask) => ({ id: subtask.id, value: subtask.title }))
      );
    }
  }, [editTaskModal, subtaskData, taskData]);

  const handleCreateTask = (
    boardId: number,
    title: string,
    description: string,
    statusId: number,
    subtaskTitles: string[]
  ) => {
    createTask({ boardId, title, description, statusId, subtaskTitles });
    onClose();
  };

  const handleEditTask = (
    boardId: number,
    title: string,
    description: string,
    statusId: number,
    taskId: number
  ) => {
    editTask({ boardId, title, description, statusId, taskId });
    onClose();
  };

  const handleAddSubtask = (taskId: number, title: string) => {
    addSubtaskToTask({ taskId, title });
  };

  const handleEditSubtask = (taskId: number, id: number, title: string) => {
    editSubtask({ taskId, id, title });
  };

  const handleDeleteSubtask = (taskId: number, id: number) => {
    deleteSubtask({ taskId, id });
  };

  const addSubtask = () => {
    const newId = Math.max(...subtasks.map((subtask) => subtask.id)) + 1;
    setSubtasks([...subtasks, { id: newId, value: "" }]);
  };

  const handleSubtaskChange = (id: number, value: string) => {
    setSubtasks((prevSubtasks) =>
      prevSubtasks.map((subtask) => {
        if (subtask.id === id) {
          return { ...subtask, value };
        }
        return subtask;
      })
    );
  };

  const handleRemove = (id: number) => {
    setSubtasks((prevSubtasks) =>
      prevSubtasks.filter((subtask) => subtask.id !== id)
    );
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };
  const handleStatusChange = (id: number) => {
    setStatusId(id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subtaskTitles = subtasks
      .map((subtask) => subtask.value)
      .filter((value) => value !== "");
    if (createTaskModal) {
      handleCreateTask(
        openedBoardId,
        title,
        description,
        statusId,
        subtaskTitles
      );
    } else if (editTaskModal) {
      const newSubtasks = subtasks.filter(
        (subtask) =>
          !subtaskData?.some((subtask_) => subtask_.id === subtask.id)
      );
      const deletedSubtasks = subtaskData?.filter(
        (subtask) => !subtasks.some((subtask_) => subtask_.id === subtask.id)
      );
      handleEditTask(openedBoardId, title, description, statusId, openedTaskId);
      newSubtasks.forEach((subtask) => {
        handleAddSubtask(openedTaskId, subtask.value);
      });
      subtasks
        .filter((subtask) => !newSubtasks.includes(subtask))
        .forEach((subtask) => {
          handleEditSubtask(openedTaskId, subtask.id, subtask.value);
        });
      deletedSubtasks?.forEach((subtask) => {
        handleDeleteSubtask(openedTaskId, subtask.id);
      });
    }
  };

  return (
    <div
      ref={modalRef}
      className={`px-8 absolute z-10 rounded-lg w-[480px] overflow-visible dark:bg-dark-grey dark:text-white bg-white text-b`}
    >
      <p className="text-heading-l pt-8">
        {(editTaskModal && "Edit Task") || (createTaskModal && "Add New Task")}
      </p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col pt-6">
          <div className="pb-6">
            <label className="text-body-m text-medium-grey pb-2">Title</label>
            <input
              type="text"
              placeholder="e.g. Take coffee break"
              value={title}
              required
              autoFocus
              onChange={handleTitleChange}
              className={`border rounded-md w-full h-10 px-2 focus:border-main-purple dark:bg-dark-grey dark:border-lines-dark border-lines-light hover:border-main-purple dark:hover:border-main-purple`}
            ></input>
          </div>
          <div className="pb-6">
            <label className="text-body-m text-medium-grey pb-2">
              Description
            </label>
            <textarea
              placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
              value={description}
              onChange={handleDescriptionChange}
              className={`border rounded-md w-full h-[112px] px-2 focus:border-main-purple dark:bg-dark-grey dark:border-lines-dark border-lines-light break-all hover:border-main-purple dark:hover:border-main-purple`}
              style={{ resize: "none" }}
            ></textarea>
          </div>
          <div className="">
            <label className="text-body-m text-medium-grey pb-2">
              Subtasks
            </label>
            {subtasks.map((subtask) => (
              <InputAndDelete
                key={subtask.id}
                id={subtask.id}
                value={subtask.value}
                onChange={handleSubtaskChange}
                handleRemove={handleRemove}
              />
            ))}
            <button
              className={`w-full h-[40px] border border-none text-main-purple font-bold rounded-full text-body-l dark:bg-white bg-light-grey hover:bg-main-purple-hover hover:bg-opacity-25`}
              type="button"
              onClick={addSubtask}
            >
              + Add New Subtask
            </button>
          </div>
          {statusCodesData && (
            <DropdownMenu
              label="Status"
              initialValue={
                statusCodesData.find((status) => status.id === statusId)?.name
              }
              menuOptions={statusCodesData.map((status) => (
                <li key={status.id}>
                  <a
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => handleStatusChange(status.id)}
                  >
                    {status.name}
                  </a>
                </li>
              ))}
            ></DropdownMenu>
          )}
          <div className="w-full mb-8 mt-6">
            <button
              className="w-full h-[40px] border border-none bg-main-purple hover:bg-main-purple-hover text-white font-bold rounded-full text-body-l"
              type="submit"
            >
              {(editTaskModal && "Save Changes") ||
                (createTaskModal && "Create Task")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewTaskModal;
