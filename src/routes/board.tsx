import Column from "../components/Column";
import { Link, Outlet, useParams } from "react-router-dom";
import useBoardMutation from "../assets/hooks/useMutateBoard";
import { getBoardDetails } from "../boards";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import Task from "../components/Task";
import { useState } from "react";
import { createPortal } from "react-dom";
import { TaskData } from "../types/TaskTypes";
import useTaskMutation from "../assets/hooks/useMutateTask";
import { BeatLoader } from "react-spinners";

const boardQuery = (q?: string) => ({
  queryKey: ["boards", q ?? q],
  queryFn: () => getBoardDetails(q),
});

const Board = () => {
  const queryClient = useQueryClient();
  const { boardId } = useParams();
  const { data, isLoading, isError } = useQuery(boardQuery(boardId));
  const [activeTask, setActiveTask] = useState<TaskData | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const { editStatusColor } = useBoardMutation();
  const { editStatus } = useTaskMutation();

  if (isLoading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        {" "}
        <BeatLoader color="#635FC7" />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading boards</div>;
  }

  const { statusCodes, tasks } = data ?? {};

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task as TaskData);
      return;
    }
  };

  const handleEditTask = (
    boardId: number,
    taskId: number,
    statusId?: number
  ) => {
    editStatus({ boardId, taskId, statusId });
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    if (!isActiveATask) return;
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverAColumn = over.data.current?.type === "Column";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    if (isActiveATask && isOverAColumn) {
      void queryClient.invalidateQueries(["boards", boardId]);
      activeTask &&
        handleEditTask(activeTask.boardId, activeTask.id, overId as number);
    } else if (isActiveATask && isOverATask) {
      const overColumnId = tasks?.find((task) => task.id === over.id)?.statusId;
      void queryClient.invalidateQueries(["boards", boardId]);
      activeTask &&
        handleEditTask(activeTask.boardId, activeTask.id, overColumnId);
    }
  };

  if (!statusCodes?.length) {
    return (
      <div
        className="w-full h-full flex justify-center items-center"
        id="empty-board-container"
      >
        <div
          id="board-empty"
          className="bg-none h-fit flex flex-col items-center phone:text-center phone:px-4 absolute"
        >
          <p className="text-medium-grey text-heading-l pb-4">
            This board is empty. Create a new column to get started.
          </p>
          <NavLink to={`/user/boards/${boardId}/edit`}>
            <div className="py-4 px-3 hover:bg-main-purple-hover bg-main-purple text-white rounded-full text-heading-m flex justify-center items-center">
              <h3>+ Add New Column</h3>
            </div>
          </NavLink>
        </div>
        <div id="task-detail" className="h-full flex items-start">
          <Outlet />
        </div>
      </div>
    );
  }

  const handleEditStatusColor = (
    boardId: number,
    statusId: number,
    newColor: string
  ) => {
    editStatusColor({ boardId, statusId, newColor });
  };

  return (
    <div id="board-details" className="dark:text-white text-black h-full">
      <div
        id="columns-container"
        className="h-full w-screen overflow-auto flex-1"
      >
        <div id="column" className="flex-row flex h-full w-fit">
          <DndContext
            sensors={sensors}
            onDragEnd={onDragEnd}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
          >
            {statusCodes?.map((status) => {
              return (
                <Column
                  column={status}
                  tasks={tasks?.filter((tasks) => tasks.statusId === status.id)}
                  columnId={status.id}
                  color={status.color}
                  key={status.id}
                  statusCount={
                    tasks?.filter((tasks) => tasks.statusId === status.id)
                      .length
                  }
                  statusName={status.name}
                  onEditColor={(newColor) =>
                    handleEditStatusColor(status.boardId, status.id, newColor)
                  }
                />
              );
            })}
            {createPortal(
              <DragOverlay>
                {activeTask && (
                  <Task
                    task={activeTask}
                    taskId={activeTask.id}
                    taskTitle={activeTask.title}
                    completedSubtasks={activeTask.completedSubtasks.length}
                    allSubtasks={activeTask.subtasks.length}
                  />
                )}
              </DragOverlay>,
              document.body
            )}
          </DndContext>

          <div
            id="new-column"
            className={`hover:scale-105 transition-transform duration-500 ease-in-out w-72 text-heading-xl text-medium-grey flex justify-center items-center group rounded-lg group hover:cursor-pointer h-full bg-gradient-to-b dark:from-dark-grey dark:to-very-dark-grey to-75% from-[rgba(233,239,250,1)] to-light-grey ml-6 tablet:my-[60px] phone:my-[40px]`}
          >
            <Link to={`edit`}>
              <button className="group-hover:text-main-purple group-hover:cursor-pointer">
                +New Column
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div id="board-detail" className="w-screen">
        <Outlet />
      </div>
    </div>
  );
};
export default Board;
