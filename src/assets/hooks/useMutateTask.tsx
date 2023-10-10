import axios from "axios";
import { CreateTaskData, EditTaskData, TaskData } from "../../types/TaskTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  DeleteSubtaskData,
  EditSubtaskFormData,
  SubtaskData,
  SubtaskFormData,
} from "../../types/SubtaskTypes";

const useTaskMutation = () => {
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: async (data: CreateTaskData) => {
      const response = await axios.post<TaskData>(
        `http://localhost:8080/boards/${data.boardId}/tasks`,
        {
          title: data.title,
          description: data.description,
          statusId: data.statusId,
          subtasks: data.subtaskTitles,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries(["tasks"]);
    },
    onError: (error) => {
      console.error("Error creating task:", error);
    },
  });

  const editTaskMutation = useMutation({
    mutationFn: async (data: EditTaskData) => {
      const response = await axios.put<TaskData>(
        `http://localhost:8080/boards/${data.boardId}/tasks/${data.taskId}`,
        {
          title: data.title,
          description: data.description,
          statusId: data.statusId,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries(["tasks"]);
    },
    onError: (error) => {
      console.error("Error editing task:", error);
    },
  });

  const addSubtaskMutation = useMutation({
    mutationFn: async (data: SubtaskFormData) => {
      const response = await axios.post<SubtaskData>(
        `http://localhost:8080/tasks/${data.taskId}/subtasks`,
        {
          taskId: data.taskId,
          title: data.title,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries(["tasks"]);
    },
  });

  const editSubtaskMutation = useMutation({
    mutationFn: async (data: EditSubtaskFormData) => {
      const response = await axios.put<SubtaskData>(
        `http://localhost:8080/tasks/${data.taskId}/subtasks/${data.id}`,
        {
          title: data.title,
          taskId: data.taskId,
        }
      );
      return response.data;
    },
  });

  const deleteSubtaskMutation = useMutation({
    mutationFn: async (data: DeleteSubtaskData) => {
      await axios.delete<SubtaskData>(
        `http://localhost:8080/tasks/${data.taskId}/subtasks/${data.id}`
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries(["boards"]);
    },
  });

  const createTaskHandler = (data: CreateTaskData) => {
    createTaskMutation.mutate(data);
  };

  const editTaskHandler = (data: EditTaskData) => {
    editTaskMutation.mutate(data);
  };

  const addSubtaskHandler = (data: SubtaskFormData) => {
    addSubtaskMutation.mutate(data);
  };

  const editSubtaskHandler = (data: EditSubtaskFormData) => {
    editSubtaskMutation.mutate(data);
  };

  const deleteSubtaskHandler = (data: DeleteSubtaskData) => {
    deleteSubtaskMutation.mutate(data);
  };
  return {
    createTask: createTaskHandler,
    editTask: editTaskHandler,
    addSubtaskToTask: addSubtaskHandler,
    editSubtask: editSubtaskHandler,
    deleteSubtask: deleteSubtaskHandler,
  };
};

export default useTaskMutation;
