export type StatusCodes = {
  id: number;
  name: string;
  boardId: number;
};

export type EditStatusData = {
  boardId: number;
  statusId: number;
  name: string;
};

export type CreateStatusData = {
  boardId: number;
  name: string;
};

export type DeleteStatusData = {
  boardId: number;
  statusId: number;
};
