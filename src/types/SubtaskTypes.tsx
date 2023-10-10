export type SubtaskData = {
  id: number;
  title: string;
  isCompleted: boolean;
  taskId: number;
};

export type SubtaskFormData = {
  taskId: number;
  title: string;
};

export type EditSubtaskFormData = {
  id: number;
  taskId: number;
  title: string;
};

export type DeleteSubtaskData = {
  taskId: number;
  id: number;
};
