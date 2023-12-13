import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskData } from "../types/TaskTypes";

interface TaskProps {
  task: TaskData;
  taskId: number;
  taskTitle: string;
  completedSubtasks: number;
  allSubtasks: number;
}

const Task = ({
  task,
  taskId,
  taskTitle,
  completedSubtasks,
  allSubtasks,
}: TaskProps) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: taskId,
    data: {
      type: "Task",
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
        opacity-50 dark:bg-dark-grey bg-white shadow-[0px_4px_6px_0px_rgba(54,78,126,0.1)] rounded-lg py-6 px-4 mb-5 flex flex-col
      "
      >
        <p className="w-full bg-medium-grey opacity-40 h-4 mb-2 rounded-lg"></p>
        <p className="w-1/2 bg-medium-grey opacity-40 h-4 mt-2 rounded-lg"></p>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      key={taskId}
      className={`hover:scale-105 transition-transform duration-300 ease-in-out dark:bg-dark-grey bg-white shadow-[0px_4px_6px_0px_rgba(54,78,126,0.1)] rounded-lg py-6 px-4 mb-5 flex flex-col hover:cursor-pointer`}
    >
      <p className="text-heading-m mb-2 group">{taskTitle}</p>
      <p className="text-body-m text-medium-grey">
        {completedSubtasks} of {allSubtasks} subtasks
      </p>
    </div>
  );
};

export default Task;
