export type TaskData = {
  id: number;
  title: string;
  description: string;
  statusId: number;
  subtasks: number[];
  boardId: number;
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
