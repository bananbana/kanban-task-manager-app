import axios from "axios";
import { CreateTaskData, EditTaskData, TaskData } from "../../types/TaskTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubtaskData } from "../../types/SubtaskTypes";
import { authHeader } from "../../services/auth-header";

const useTaskMutation = () => {
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: async (data: CreateTaskData) => {
      const response = await axios.post<TaskData>(
        `https://${process.env.REACT_APP_HOST_URL}/user/boards/${data.boardId}/tasks`,
        {
          title: data.title,
          description: data.description,
          statusId: data.statusId,
          subtasks: data.subtaskTitles,
        },
        { headers: authHeader() }
      );
      return response.data;
    },
    onSuccess: (data) => {
      void queryClient.refetchQueries(["boards", data.boardId.toString()]);
    },
    onError: (error) => {
      console.error("Error creating task:", error);
    },
  });

  const createTaskHandler = (data: CreateTaskData) => {
    createTaskMutation.mutate(data);
  };

  const editTaskMutation = useMutation({
    mutationFn: async (data: EditTaskData) => {
      const response = await axios.put<TaskData>(
        `https://${process.env.REACT_APP_HOST_URL}/user/boards/${data.boardId}/tasks/${data.taskId}`,
        {
          title: data.title,
          description: data.description,
          statusId: data.statusId,
        },
        { headers: authHeader() }
      );
      return response.data;
    },
    onError: (error) => {
      console.error("Error editing task:", error);
    },
  });

  const editTaskHandler = (data: EditTaskData) => {
    editTaskMutation.mutate(data);
  };

  const addSubtaskMutation = useMutation({
    mutationFn: async (data: { taskId: number; title: string }) => {
      const response = await axios.post<SubtaskData>(
        `https://${process.env.REACT_APP_HOST_URL}/user/tasks/${data.taskId}/subtasks`,
        {
          taskId: data.taskId,
          title: data.title,
        },
        { headers: authHeader() }
      );
      return response.data;
    },
  });

  const addSubtaskHandler = (data: { taskId: number; title: string }) => {
    addSubtaskMutation.mutate(data);
  };

  const editSubtaskMutation = useMutation({
    mutationFn: async (data: { taskId: number; id: number; title: string }) => {
      const response = await axios.put<SubtaskData>(
        `https://${process.env.REACT_APP_HOST_URL}/user/tasks/${data.taskId}/subtasks/${data.id}`,
        {
          title: data.title,
          taskId: data.taskId,
        },
        { headers: authHeader() }
      );
      return response.data;
    },
  });

  const editSubtaskHandler = (data: {
    taskId: number;
    id: number;
    title: string;
  }) => {
    editSubtaskMutation.mutate(data);
  };

  const toggleSubtaskMutation = useMutation({
    mutationFn: async (data: SubtaskData) => {
      const response = await axios.put<SubtaskData>(
        `https://${process.env.REACT_APP_HOST_URL}/user/tasks/${data.taskId}/subtasks/${data.id}`,
        {
          title: data.title,
          taskId: data.taskId,
          id: data.id,
          isCompleted: data.isCompleted,
        },
        { headers: authHeader() }
      );
      return response.data;
    },
    onSuccess: (data) => {
      void queryClient.invalidateQueries(["tasks", data.taskId.toString()]);
    },
  });

  const toggleSubtaskHandler = (data: SubtaskData) => {
    toggleSubtaskMutation.mutate(data);
  };

  const deleteSubtaskMutation = useMutation({
    mutationFn: async (data: { taskId: number; id: number }) => {
      await axios.delete<SubtaskData>(
        `https://${process.env.REACT_APP_HOST_URL}/user/tasks/${data.taskId}/subtasks/${data.id}`,
        { headers: authHeader() }
      );
    },
  });

  const deleteSubtaskHandler = (data: { taskId: number; id: number }) => {
    deleteSubtaskMutation.mutate(data);
  };

  const deleteTaskMutation = useMutation({
    mutationFn: async (data: { taskId: number; boardId: number }) => {
      await axios.delete<TaskData>(
        `https://${process.env.REACT_APP_HOST_URL}/user/boards/${data.boardId}/tasks/${data.taskId}`,
        { headers: authHeader() }
      );
    },
  });

  const deleteTaskHandler = (data: { taskId: number; boardId: number }) => {
    deleteTaskMutation.mutate(data);
  };

  const editStatusMutation = useMutation({
    mutationFn: async (data: {
      boardId: number;
      taskId: number;
      statusId?: number;
    }) => {
      const response = await axios.put(
        `https://${process.env.REACT_APP_HOST_URL}/user/boards/${data.boardId}/tasks/${data.taskId}/new_status/${data.statusId}`,
        {},
        { headers: authHeader() }
      );
      return response;
    },
  });

  const editStatusHandler = (data: {
    boardId: number;
    taskId: number;
    statusId?: number;
  }) => {
    editStatusMutation.mutate(data);
  };

  return {
    createTask: createTaskHandler,
    editTask: editTaskHandler,
    addSubtaskToTask: addSubtaskHandler,
    editSubtask: editSubtaskHandler,
    deleteSubtask: deleteSubtaskHandler,
    toggleSubtask: toggleSubtaskHandler,
    deleteTask: deleteTaskHandler,
    editStatus: editStatusHandler,
  };
};

export default useTaskMutation;
