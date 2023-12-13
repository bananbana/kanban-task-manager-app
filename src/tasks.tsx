import axios from "axios";
import { TaskData, TaskDetails } from "./types/TaskTypes";
import { SubtaskData } from "./types/SubtaskTypes";
import { authHeader } from "./services/auth-header";

export const getTask = async (
  boardId?: string,
  taskId?: string
): Promise<TaskDetails> => {
  try {
    let url;
    if (boardId && taskId) {
      url = `http://localhost:8080/user/boards/${boardId}/tasks/${taskId}`;
      const task = await axios.get<TaskData>(url, { headers: authHeader() });
      const subtasks = await axios.get<SubtaskData[]>(
        `http://localhost:8080/user/tasks/${taskId}/subtasks`,
        { headers: authHeader() }
      );
      return {
        task: task.data,
        subtasks: subtasks.data,
      };
    }
    throw new Error("Invalid parameters for getTask");
  } catch (error) {
    console.error("Error fetching task:", error);
    throw error;
  }
};

export const getAllTasksForAdm = async () => {
  try {
    const tasks = await axios.get<TaskData[]>(
      "http://localhost:8080/boards/tasks",
      { headers: authHeader() }
    );
    return tasks.data;
  } catch (error) {
    console.error("Error fetching tasks for admin: ", error);
  }
};
