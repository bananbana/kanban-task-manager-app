export type BoardData = {
  id: number;
  name: string;
};

export type CreateBoardData = {
  name: string;
  statusCodes: string[];
};

export type EditBoardData = {
  boardId: number;
  name: string;
};
