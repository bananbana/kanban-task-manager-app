import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SubtaskData } from "../../types/SubtaskTypes";

const useUpdateSubtask = (taskId: number) => {
  const queryClient = useQueryClient();

  const toggleSubtask = useMutation(
    async (variables: SubtaskData) => {
      const { id, title, isCompleted, taskId } = variables;
      console.log("Toggle subtask mutation called with:", variables);

      const response = await axios.put<SubtaskData>(
        `http://localhost:8080/tasks/${taskId}/subtasks/${id}`,
        {
          id,
          title,
          isCompleted,
          taskId,
        }
      );
      return response.data;
    },
    {
      onMutate: async ({ id, isCompleted }) => {
        await queryClient.cancelQueries(["subtasks", taskId]);
        const previousSubtasks = queryClient.getQueryData<SubtaskData[]>([
          "subtask",
          taskId,
        ]);

        queryClient.setQueryData(
          ["subtasks", taskId],
          (old?: { subtaskData: SubtaskData[] }) => {
            if (!old) return { subtaskData: [] };

            const updatedSubtasks = old.subtaskData.map((subtask) =>
              subtask.id === id ? { ...subtask, isCompleted } : subtask
            );

            return { subtaskData: updatedSubtasks };
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
            "Error occurred, but no previous subtask data available."
          );
        }
      },
      onSettled: async () => {
        await queryClient.invalidateQueries(["subtasks", taskId]);
      },
    }
  );

  return { toggleSubtask: toggleSubtask.mutateAsync };
};

export default useUpdateSubtask;
