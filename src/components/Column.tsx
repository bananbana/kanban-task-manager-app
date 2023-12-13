import { useEffect, useMemo, useRef, useState } from "react";
import { TaskData } from "../types/TaskTypes";
import { SortableContext } from "@dnd-kit/sortable";
import Task from "./Task";
import { StatusCodes } from "../types/StatusTypes";
import { Link } from "react-router-dom";
import { useDroppable } from "@dnd-kit/core";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface ColumnProps {
  column: StatusCodes;
  statusName: string;
  statusCount: number | undefined;
  color: string;
  onEditColor: (newColor: string) => void;
  columnId: number;
  tasks: TaskData[] | undefined;
}

const Column = ({
  column,
  tasks,
  statusName,
  statusCount,
  color,
  columnId,
  onEditColor,
}: ColumnProps) => {
  const [animationParent] = useAutoAnimate();
  const tasksIds = useMemo(
    () => (tasks ? tasks.map((task) => task.id) : []),
    [tasks]
  );
  const { setNodeRef } = useDroppable({
    id: columnId,
    data: { type: "Column", column },
  });
  const colorPickerRef = useRef<HTMLInputElement>(null);
  const [statusColor, setStatusColor] = useState(color);
  const [colorChanged, setColorChanged] = useState(false);

  const handleColorChange = (newColor: string) => {
    setStatusColor(newColor);
    setColorChanged(true);
    console.log(statusColor);
  };
  const handleColorPicker = () => {
    colorPickerRef.current?.click();
  };

  useEffect(() => {
    const handleOutsideClick = () => {
      if (colorChanged) {
        onEditColor(statusColor);
        setColorChanged(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [colorChanged, onEditColor, statusColor]);

  return (
    <div className="h-full ml-6 w-72 flex flex-col pt-5" ref={setNodeRef}>
      <div className="flex items-center flex-row py-3">
        <div
          className={`h-4 w-4 rounded-full flex justify-center items-center cursor-pointer`}
          style={{ background: statusColor }}
          onClick={handleColorPicker}
        >
          <input
            ref={colorPickerRef}
            type="color"
            id="color-picker"
            value={statusColor || "#FF0"}
            onChange={(e) => handleColorChange(e.target.value)}
            className="hidden"
          />
        </div>
        <span className="text-medium-grey text-heading-s ml-3">
          {statusName.toUpperCase()} ({statusCount})
        </span>
      </div>
      <div id="tasks" className="h-full overflow-visible pb-6">
        <SortableContext items={tasksIds}>
          <ul ref={animationParent}>
            {tasks?.map((task) => (
              <Link to={`tasks/${task.id}`} key={task.id}>
                <Task
                  task={task}
                  taskId={task.id}
                  taskTitle={task.title}
                  completedSubtasks={task.completedSubtasks.length}
                  allSubtasks={task.subtasks.length}
                />
              </Link>
            ))}
          </ul>
        </SortableContext>
        {/* {children !== undefined ? children : ""} */}
      </div>
    </div>
  );
};

export default Column;
