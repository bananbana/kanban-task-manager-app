import axios from "axios";
import { TaskData } from "../../types/TaskTypes";
import { UseMutationResult, useMutation } from "@tanstack/react-query";

interface TaskFormData {
  boardId: number;
  title: string;
  description: string;
  statusId: number;
  subtasks: [];
}

const createTask = async (formData: TaskFormData) => {
  const res = await axios.put<TaskData>(
    `http://localhost:8080/boards/${formData.boardId}/tasks`,
    {
      title: formData.title,
      description: formData.description,
      statusId: formData.statusId,
      subtasks: formData.subtasks,
    }
  );
  return res.data;
};

const useCreateTaskMutation = (): UseMutationResult<
  TaskData,
  unknown,
  TaskFormData,
  unknown
> => {
  return useMutation(createTask, {
    onSuccess: () => {
      // Handle success
    },
    onError: (error) => {
      console.error("Error creating task:", error);
    },
  });
};

export default useCreateTaskMutation;
