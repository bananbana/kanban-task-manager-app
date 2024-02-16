import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubtaskData } from "../../types/SubtaskTypes";
import axios from "axios";

const useSubtaskMutation = (taskId: number) => {
  const queryClient = useQueryClient();

  const toggleSubtask = useMutation({
    mutationFn: async (data: SubtaskData) => {
      const response = await axios.put<SubtaskData>(
        `https://${import.meta.env.REACT_APP_HOST_URL}/tasks/${
          data.taskId
        }/subtasks/${data.id}`,
        {
          id: data.id,
          title: data.title,
          isCompleted: data.isCompleted,
          taskId: data.taskId,
        }
      );
      return response.data;
    },
    onMutate: async ({ id, isCompleted }) => {
      await queryClient.cancelQueries(["tasks", taskId]);
      const previousSubtasks = queryClient.getQueryData<SubtaskData[]>([
        "tasks",
        taskId,
      ]);

      queryClient.setQueryData(
        ["tasks", taskId],
        (old?: { subtasksData: SubtaskData[] }) => {
          if (!old) return { subtasksData: [] };

          const updatedSubtasks = old.subtasksData.map((subtask) =>
            subtask.id === id ? { ...subtask, isCompleted } : subtask
          );
          return { subtasksData: updatedSubtasks };
        }
      );
      return { previousSubtasks };
    },
    onError: (error, variables, context) => {
      if (context?.previousSubtasks) {
        queryClient.setQueryData(
          ["subtasks", taskId],
          context.previousSubtasks
        );
      } else {
        console.error(
          "Error occurred, but no previous subtask data available.",
          error,
          variables
        );
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries(["subtasks", taskId]);
    },
  });

  const toggleSubtaskHandler = (data: SubtaskData) => {
    toggleSubtask.mutate(data);
  };

  return { toggleSubtask: toggleSubtaskHandler };
};
export default useSubtaskMutation;
