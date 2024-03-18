import { Fragment, useRef, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import useCloseMenu from "../assets/hooks/useCloseMenu";
import useTaskMutation from "../assets/hooks/useMutateTask";
import InputAndDelete from "../components/InputAndDelete";
import { useQueryClient } from "@tanstack/react-query";
import { BoardDetails } from "../types/BoardTypes";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { StatusCodes } from "../types/StatusTypes";
import { IconChevronUp } from "../assets/images/IconChevronUp";
import { IconChevronDown } from "../assets/images/IconChevronDown";
import { IconBackMobile } from "../assets/images/IconBackMobile";

const NewTask = () => {
  const { boardId } = useParams();
  const queryClient = useQueryClient();
  const statusData = queryClient.getQueryData<BoardDetails>([
    "boards",
    boardId,
  ]);
  const { statusCodes } = statusData ?? {};
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  useCloseMenu(modalRef, () => navigate(-1));
  const { createTask } = useTaskMutation();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState("");
  const [subtasks, setSubtasks] = useState([{ id: 1, title: "" }]);
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
  const addSubtask = () => {
    const newId = Math.max(...subtasks.map((subtask) => subtask.id)) + 1;
    setSubtasks([...subtasks, { id: newId, title: "" }]);
  };

  const handleSubtaskChange = (id: number, title: string) => {
    setSubtasks((prevSubtasks) =>
      prevSubtasks.map((subtask) => {
        if (subtask.id === id) {
          return { ...subtask, title };
        }
        return subtask;
      })
    );
  };

  const handleRemoveSubtask = (id: number) => {
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

  const handleCreateTask = (
    boardId: number,
    title: string,
    description: string,
    statusId: number,
    subtaskTitles: string[]
  ) => {
    createTask({ boardId, title, description, statusId, subtaskTitles });
    navigate(-1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subtasksTitles = subtasks
      .map((subtask) => subtask.title)
      .filter((title) => title !== "");
    if (boardId) {
      handleCreateTask(
        +boardId,
        title,
        description,
        selectedStatus.id,
        subtasksTitles
      );
    }
  };

  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="backdrop-overlay" id="backdrop">
      <div ref={modalRef} id="new-task-modal" className={`edit-modal`}>
        <div className="my-6 px-6 flex tablet:flex-row phone:flex-row-reverse justify-between">
          <button onClick={goBack} className="tablet:hidden phone:block">
            <IconBackMobile />
          </button>

          <h1 className="text-heading-l">Add New Task</h1>
        </div>
        <Form
          method="put"
          id="new-task-form"
          className="form px-6"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col w-full gap-3">
            <div className="">
              <label className="text-body-m text-medium-grey mb-2 dark:text-white">
                Title
              </label>
              <input
                type="text"
                placeholder="e.g. Take coffee break"
                value={title}
                required
                autoFocus
                onChange={handleTitleChange}
                className={`form-input`}
              ></input>
            </div>
            <div>
              <label className="text-body-m text-medium-grey mb-2 dark:text-white">
                Description
              </label>
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
                className={`h-[112px] form-input`}
                style={{ resize: "none" }}
              ></textarea>
            </div>
            <div>
              <label className="text-body-m text-medium-grey pb-2 dark:text-white">
                Subtasks
              </label>
              {subtasks.map((subtask) => (
                <InputAndDelete
                  name={subtask.title}
                  key={subtask.id}
                  id={subtask.id}
                  value={subtask.title}
                  onChange={handleSubtaskChange}
                  handleRemove={handleRemoveSubtask}
                />
              ))}
            </div>
            <button
              className={`w-full h-[40px] btn-secondary`}
              type="button"
              onClick={addSubtask}
            >
              + Add New Subtask
            </button>
            <Listbox value={selectedStatus} onChange={setSelectedStatus}>
              <div className="relative mt-6">
                <Listbox.Label className="text-body-m text-medium-grey mb-2 dark:text-white">
                  Status
                </Listbox.Label>
                <Listbox.Button className="relative listbox-button">
                  {({ open }) => (
                    <>
                      <span className="block truncate w-full text-black dark:text-white">
                        {selectedStatus.name}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"></span>
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
                  <Listbox.Options className="listbox-options">
                    {statusCodes?.map((status) => (
                      <Listbox.Option
                        key={status.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
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
            <div className="w-full mb-8 mt-6">
              <button className="w-full h-[40px] btn-primary-s" type="submit">
                Create Task
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default NewTask;
