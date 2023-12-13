import { SubtaskData } from "./SubtaskTypes";

export type TaskData = {
  id: number;
  title: string;
  description: string;
  statusId: number;
  subtasks: number[];
  completedSubtasks: number[];
  boardId: number;
};

export type TaskDetails = {
  task: TaskData;
  subtasks: SubtaskData[];
};

export type EditTaskData = {
  taskId: number;
  boardId: number;
  title: string;
  description: string;
  statusId: number;
};

export type CreateTaskData = {
  boardId: number;
  title: string;
  description: string;
  statusId: number | null;
  subtaskTitles: string[];
};
