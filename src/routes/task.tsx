import React, { Fragment, useRef } from "react";
import useCloseModal from "../assets/hooks/useCloseModal";
import { Form, Outlet, useNavigate, useParams } from "react-router-dom";
import useTaskMutation from "../assets/hooks/useMutateTask";
import { getTask } from "../tasks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Menu, Transition } from "@headlessui/react";
import { IconVerticalEllipsis } from "../assets/images/IconVerticalEllipsis";

const taskQuery = (boardQ?: string, taskQ?: string) => ({
  queryKey: ["tasks", taskQ ?? ""],
  queryFn: () => getTask(boardQ, taskQ),
  enabled: !!boardQ && !!taskQ,
});

const Task = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useCloseModal(modalRef, navigate);
  const { boardId, taskId } = useParams();
  const { data, isLoading, isError } = useQuery(taskQuery(boardId, taskId));
  const { toggleSubtask, deleteTask } = useTaskMutation();

  const handleDeleteTask = (taskId: number, boardId: number) => {
    deleteTask({ taskId, boardId });
    void queryClient.invalidateQueries(["boards", boardId.toString()]);
    navigate(-1);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading task</div>;
  }
  const { task, subtasks } = data ?? {};

  const handleToggle = (
    taskId: number,
    id: number,
    title: string,
    event: React.ChangeEvent<HTMLInputElement>,
    boardId?: string
  ) => {
    const isCompleted = event.target.checked;
    toggleSubtask({ taskId, id, title, isCompleted });
    void queryClient.invalidateQueries(["boards", boardId]);
    console.log(isCompleted);
  };

  return (
    <div className="h-full w-screen backdrop-brightness-50 top-0 left-0 fixed z-40 flex justify-center items-center">
      <div
        ref={modalRef}
        id="task-modal"
        className={`flex flex-col w-[480px] justify-center py-8 px-8 rounded-lg dark:bg-dark-grey bg-white`}
      >
        <div
          className={`dark:text-white flex flex-row justify-between w-full items-center`}
        >
          <p className="mr-6 text-heading-l w-full flex justify-start items-center">
            {task?.title}
          </p>
          <div className={`flex justify-center items-center`}>
            <Menu as="div" className="relative inline-block text-left">
              <div className="w-5 h-full">
                <Menu.Button className="flex flex-col w-full justify-center items-center focus:outline-none">
                  <IconVerticalEllipsis />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute -left-16 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-very-dark-grey focus:outline-none py-2 px-4">
                  <div>
                    <Menu.Item>
                      <Form action="edit">
                        <button
                          className={`hover:bg-main-purple-hover/30
                        text-medium-grey group flex w-full items-center rounded-md py-2 text-sm`}
                          type="submit"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5 mx-2"
                          >
                            <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                            <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                          </svg>
                          Edit Task
                        </button>
                      </Form>
                    </Menu.Item>
                    <Menu.Item>
                      <button
                        className={`text-destructive-red hover:bg-destructive-red/20 group flex w-full items-center rounded-md py-2 text-sm`}
                        onClick={() => handleDeleteTask(task.id, task.boardId)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5 mx-2"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Delete Task
                      </button>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        <span className="text-body-l text-medium-grey my-6">
          {task?.description ? task.description : "No description"}
        </span>
        <div className="flex flex-col mb-6">
          <span className="text-body-m text-medium-grey">
            Subtasks (
            {subtasks?.filter((subtask) => subtask.isCompleted).length} of{" "}
            {subtasks?.length})
          </span>
          <div>
            {subtasks?.map((subtask) => (
              <div
                key={subtask.id}
                className={`flex flex-row justify-start items-center py-3 px-3 my-2 rounded-md hover:bg-main-purple hover:bg-opacity-25 dark:bg-very-dark-grey dark:text-white bg-light-grey`}
              >
                <input
                  type="checkbox"
                  checked={subtask.isCompleted || false}
                  className="checked:bg-main-purple dark:bg-dark-grey dark:border-lines-dark rounded-sm mr-3 border-lines-light focus:ring-0 active:outline-none"
                  onChange={(e) =>
                    handleToggle(
                      subtask.taskId,
                      subtask.id,
                      subtask.title,
                      e,
                      boardId
                    )
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
        <div
          id="task-outlet"
          className="relative flex justify-center items-center h-full"
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Task;
