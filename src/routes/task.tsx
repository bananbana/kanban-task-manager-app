import { Fragment, useRef } from "react";
import useCloseModal from "../assets/hooks/useCloseModal";
import { Form, Outlet, useNavigate, useParams } from "react-router-dom";
import useTaskMutation from "../assets/hooks/useMutateTask";
import { getTask } from "../tasks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Menu, Transition } from "@headlessui/react";
import { IconVerticalEllipsis } from "../assets/images/IconVerticalEllipsis";
import Linkify from "linkify-react";
import { IconEdit } from "../assets/images/IconEdit";
import { IconTrashcan } from "../assets/images/IconTrashcan";

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

  const linkProps = {
    onClick: (event: MouseEvent) => {
      if (!confirm("Are you sure you want to leave this page?")) {
        event.preventDefault();
      }
    },
  };

  return (
    <div className="backdrop-overlay" id="backdrop">
      <div ref={modalRef} id="task-modal" className="task-modal">
        <div
          className={`dark:text-white flex flex-row justify-between w-full items-center mb-6`}
        >
          <Linkify
            options={{
              attributes: linkProps,
              className: "hover:underline text-main-purple",
            }}
          >
            <p className="text-heading-l w-full flex justify-start items-center">
              {task?.title}
            </p>
          </Linkify>
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
                <Menu.Items className="shadow-[0px_4px_6px_0px_rgba(54,78,126,0.1)] absolute phone:-top-4 phone:-left-36 tablet:-left-16 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-very-dark-grey focus:outline-none py-2 px-4">
                  <div>
                    <Menu.Item>
                      <Form action="edit">
                        <button
                          className={`hover:bg-main-purple-hover/30
                        text-medium-grey group flex w-full items-center rounded-md py-2 text-sm`}
                          type="submit"
                        >
                          <IconEdit className="w-5 h-5 mx-2" />
                          Edit Task
                        </button>
                      </Form>
                    </Menu.Item>
                    <Menu.Item>
                      <button
                        className={`text-destructive-red hover:bg-destructive-red/20 group flex w-full items-center rounded-md py-2 text-sm`}
                        onClick={() => handleDeleteTask(task.id, task.boardId)}
                      >
                        <IconTrashcan className="w-5 h-5 mx-2" />
                        Delete Task
                      </button>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        <Linkify
          options={{
            attributes: linkProps,
            className: "hover:underline text-main-purple",
          }}
        >
          <span className="text-body-l text-medium-grey">
            {task?.description ? task.description : "No description"}
          </span>
        </Linkify>
        <div className="flex flex-col my-6">
          <span className="text-body-m text-medium-grey">
            Subtasks (
            {subtasks?.filter((subtask) => subtask.isCompleted).length} of{" "}
            {subtasks?.length})
          </span>
          <div>
            {subtasks?.map((subtask) => (
              <div key={subtask.id} className="subtask-checkbox">
                <input
                  type="checkbox"
                  checked={subtask.isCompleted || false}
                  className="subtask-input"
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
                  className={`subtask-text ${
                    subtask.isCompleted ? "subtask-text-checked" : ""
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
