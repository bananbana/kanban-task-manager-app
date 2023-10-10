import axios from "axios";
import useSubtasks from "../assets/hooks/useSubtasks";

interface TaskProps {
  openTask: (args: number) => void;
  taskId: number;
  taskTitle: string;
}

const Task = ({ openTask, taskId, taskTitle }: TaskProps) => {
  const { data, isLoading, error } = useSubtasks(taskId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        Error fetching status codes:{" "}
        {axios.isAxiosError(error) && error.message}
      </div>
    );
  }

  return (
    <div
      key={taskId}
      className={`dark:bg-dark-grey bg-white shadow-[0px_4px_6px_0px_rgba(54,78,126,0.1)] rounded-lg py-6 px-4 mb-5 flex flex-col hover:cursor-pointer`}
      onClick={() => openTask(taskId)}
    >
      <p className="text-heading-m mb-2 group">{taskTitle}</p>
      <p className="text-body-m text-medium-grey">
        {data && data.filter((subtask) => subtask.isCompleted).length} of{" "}
        {data?.length}
      </p>
    </div>
  );
};

export default Task;
