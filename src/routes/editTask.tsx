import { Fragment, useEffect, useRef, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import useCloseModal from "../assets/hooks/useCloseModal";
import InputAndDelete from "../components/InputAndDelete";
import useTaskMutation from "../assets/hooks/useMutateTask";
import { useQueryClient } from "@tanstack/react-query";
import { TaskDetails } from "../types/TaskTypes";
import { BoardDetails } from "../types/BoardTypes";
import { Listbox, Transition } from "@headlessui/react";
import { StatusCodes } from "../types/StatusTypes";
import { CheckIcon } from "@heroicons/react/20/solid";
import Linkify from "linkify-react";
import { IconBackMobile } from "../assets/images/IconBackMobile";
import { IconChevronUp } from "../assets/images/IconChevronUp";
import { IconChevronDown } from "../assets/images/IconChevronDown";

const EditTask = () => {
  const { boardId, taskId } = useParams();
  const queryClient = useQueryClient();
  const taskData = queryClient.getQueryData<TaskDetails>(["tasks", taskId]);
  const boardData = queryClient.getQueryData<BoardDetails>(["boards", boardId]);
  const { statusCodes } = boardData ?? {};
  const { task, subtasks } = taskData ?? {};

  const { editTask, addSubtaskToTask, editSubtask, deleteSubtask } =
    useTaskMutation();
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  //hold values until put into request body
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subtasksData, setSubtasksData] = useState([{ id: 1, title: "" }]);
  const [selectedStatus, setSelectedStatus] = useState<StatusCodes>(
    statusCodes
      ? statusCodes[0]
      : {
          id: 1,
          name: "",
          boardId: +location.pathname.split("boards/")[1].split("/tasks")[0],
          color: "",
        }
  );

  //set existing data as default state upon component rendering
  useEffect(() => {
    const currentStatus = statusCodes?.find(
      (status) => status.id === task?.statusId
    );
    if (currentStatus && task && subtasks) {
      setSelectedStatus(currentStatus);
      setTitle(task.title);
      setDescription(task.description);
      setSubtasksData(
        subtasks.map((subtask) => ({ id: subtask.id, title: subtask.title }))
      );
    }
  }, [statusCodes, task, subtasks]);

  useCloseModal(modalRef, navigate);

  const handleEditTask = (
    boardId: number,
    title: string,
    description: string,
    statusId: number,
    taskId: number
  ) => {
    editTask({ boardId, title, description, statusId, taskId });
    navigate(-1);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const addSubtask = () => {
    const newId = Math.max(...subtasksData.map((subtask) => subtask.id)) + 1;
    setSubtasksData([...subtasksData, { id: newId, title: "" }]);
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

  const handleSubtaskChange = (id: number, title: string) => {
    setSubtasksData((prevSubtasksData) =>
      prevSubtasksData.map((subtask) => {
        if (subtask.id === id) {
          return { ...subtask, title };
        }
        return subtask;
      })
    );
  };

  const handleRemoveSubtask = (id: number) => {
    setSubtasksData((prevSubtasksData) =>
      prevSubtasksData.filter((subtask) => subtask.id !== id)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSubtasks = subtasksData.filter(
      (subtask) => !subtasks?.some((subtask_) => subtask_.id === subtask.id)
    );
    const deletedSubtasks = subtasks?.filter(
      (subtask) => !subtasksData.some((subtask_) => subtask_.id === subtask.id)
    );

    if (boardId && taskId) {
      handleEditTask(+boardId, title, description, selectedStatus.id, +taskId);
      newSubtasks.forEach((subtask) => {
        handleAddSubtask(+taskId, subtask.title);
      });
      subtasksData
        .filter((subtask) => !newSubtasks.includes(subtask))
        .forEach((subtask) => {
          handleEditSubtask(+taskId, subtask.id, subtask.title);
        });
      deletedSubtasks?.forEach((subtask) => {
        handleDeleteSubtask(+taskId, subtask.id);
      });
    }
    void queryClient.refetchQueries(["boards", boardId]);
    void queryClient.refetchQueries(["tasks", taskId]);
    console.log(taskId);
  };

  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="backdrop-overlay" id="backdrop">
      <div
        id="edit-task-modal"
        ref={modalRef}
        className={`edit-modal relative`}
      >
        <div className="my-6 px-6 flex tablet:flex-row phone:flex-row-reverse justify-between">
          <button onClick={goBack} className="tablet:hidden phone:block">
            <IconBackMobile />
          </button>
          <h1 className="text-heading-l">Edit Task</h1>
        </div>

        <Form
          method="put"
          id="edit-task-form"
          onSubmit={handleSubmit}
          className="form px-6"
        >
          <div className="flex flex-col w-full gap-3">
            <Linkify>
              <div>
                <label className="text-body-m text-medium-grey mb-2">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Take coffee break"
                  value={title}
                  required
                  autoFocus
                  onChange={handleTitleChange}
                  className="form-input"
                />
              </div>
              <div>
                <label className="text-body-m text-medium-grey mb-2 dark:text-white">
                  Description
                </label>
                <textarea
                  placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
                  defaultValue={description}
                  name="description"
                  onChange={handleDescriptionChange}
                  className={`h-[112px] form-input`}
                  style={{ resize: "none" }}
                />
              </div>
            </Linkify>
            <div className="">
              <label className="text-body-m text-medium-grey mb-2">
                Subtasks
              </label>
              {subtasksData?.map((subtask) => (
                <InputAndDelete
                  key={subtask.id}
                  id={subtask.id}
                  value={subtask.title}
                  name="subtask"
                  onChange={handleSubtaskChange}
                  handleRemove={handleRemoveSubtask}
                />
              ))}
              <button
                className={`w-full h-[40px] btn-secondary my-3`}
                type="button"
                onClick={addSubtask}
              >
                + Add New Subtask
              </button>
            </div>
            <Listbox value={selectedStatus} onChange={setSelectedStatus}>
              <div className="relative mt-3">
                <Listbox.Label className="text-body-m text-medium-grey mb-2 dark:text-white">
                  Status
                </Listbox.Label>
                <Listbox.Button className={`listbox-button`}>
                  {({ open }) => (
                    <>
                      <span className="block truncate w-full text-black dark:text-white">
                        {selectedStatus.name}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2" />
                      <div className="">
                        {open ? <IconChevronUp /> : <IconChevronDown />}
                      </div>
                    </>
                  )}
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="listbox-options translate-x-0 top-full">
                    {statusCodes?.map((status) => (
                      <Listbox.Option
                        key={status.id}
                        className={({ active }) =>
                          `relative  cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-main-purple-hover text-white"
                              : "text-medium-grey"
                          }`
                        }
                        value={status}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {status.name}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-medium-grey">
                                <CheckIcon
                                  className="h-4 w-4"
                                  aria-hidden="true"
                                ></CheckIcon>
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
            <button
              className="w-full h-[40px] btn-primary-s my-6"
              type="submit"
            >
              Save Changes
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditTask;
