import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { TaskData } from "../../types/TaskTypes";
import { SubtaskData } from "../../types/SubtaskTypes";

const useTask = (taskId: number, boardId: number) => {
  const queryClient = useQueryClient();

  const taskQuery = useQuery({
    queryKey: ["tasks", taskId, boardId],
    queryFn: async () => {
      const { data } = await axios.get<TaskData>(
        `http://localhost:8080/boards/${boardId}/tasks/${taskId}`
      );
      return { taskData: data };
    },
  });

  const subtaskQuery = useQuery({
    queryKey: ["subtasks", taskId],
    queryFn: async () => {
      const { data } = await axios.get<SubtaskData[]>(
        `http://localhost:8080/tasks/${taskId}/subtasks`
      );
      return { subtaskData: data };
    },
  });

  return {
    taskData: taskQuery.data?.taskData,
    subtaskData: subtaskQuery.data?.subtaskData,
    taskLoading: taskQuery.isLoading,
    subtaskLoading: subtaskQuery.isLoading,
    taskError: taskQuery.error,
    subtaskError: subtaskQuery.error,
    refetch: async () => {
      try {
        await queryClient.invalidateQueries(["tasks", taskId, boardId]);
        await queryClient.invalidateQueries(["subtasks", taskId]);
      } catch (error) {
        console.error("Error refetching queries:", error);
      }
    },
  };
};

export default useTask;
