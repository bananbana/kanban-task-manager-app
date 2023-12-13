import { StatusCodes } from "./StatusTypes";
import { TaskData } from "./TaskTypes";

export type BoardData = {
  id: number;
  name: string;
  userIds: number[];
  ownerId: number;
  tasks: number[];
};

export type BoardDetails = {
  board: BoardData;
  statusCodes: StatusCodes[];
  tasks: TaskData[];
};

export type CreateBoardData = {
  name: string;
  statusCodes: string[];
};

export type EditBoardData = {
  boardId: number;
  name: string;
};
