import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  CreateStatusData,
  DeleteStatusData,
  EditStatusData,
  StatusCodes,
} from "../../types/StatusTypes";
import {
  BoardData,
  CreateBoardData,
  EditBoardData,
} from "../../types/BoardTypes";

const useBoardMutation = () => {
  const queryClient = useQueryClient();

  const editBoardNameMutation = useMutation({
    mutationFn: async (data: EditBoardData) => {
      const res = await axios.put<BoardData>(
        `http://localhost:8080/boards/${data.boardId}`,
        { name: data.name }
      );
      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries(["boards"]);
    },
    onError: (error) => {
      console.error("Error editing board:", error);
    },
  });

  const editStatusMutation = useMutation({
    mutationFn: async (data: EditStatusData) => {
      const res = await axios.put<StatusCodes>(
        `http://localhost:8080/boards/${data.boardId}/status_codes/${data.statusId}`,
        { name: data.name }
      );
      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries(["statusCodes"]);
    },
  });

  const createBoardMutation = useMutation({
    mutationFn: async (data: CreateBoardData) => {
      const res = await axios.post<BoardData>(`http://localhost:8080/boards`, {
        name: data.name,
        statusCodes: data.statusCodes,
      });
      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries(["statusCodes"]);
    },
  });

  const addStatusMutation = useMutation({
    mutationFn: async (data: CreateStatusData) => {
      const res = await axios.post<StatusCodes>(
        `http://localhost:8080/boards/${data.boardId}/status_codes`,
        {
          boardId: data.boardId,
          name: data.name,
        }
      );
      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries(["statusCodes"]);
    },
  });

  const deleteStatusMutation = useMutation({
    mutationFn: async (data: DeleteStatusData) => {
      await axios.delete<StatusCodes>(
        `http://localhost:8080/boards/${data.boardId}/status_codes/${data.statusId}`
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries(["statusCodes"]);
    },
  });

  const editBoardNameHandler = (data: EditBoardData) => {
    editBoardNameMutation.mutate(data);
  };

  const editStatusHandler = (data: EditStatusData) => {
    editStatusMutation.mutate(data);
  };

  const createBoardHandler = (data: CreateBoardData) => {
    createBoardMutation.mutate(data);
  };

  const addStatusHandler = (data: CreateStatusData) => {
    addStatusMutation.mutate(data);
  };

  const deleteStatusHandler = (data: DeleteStatusData) => {
    deleteStatusMutation.mutate(data);
  };

  return {
    editBoardName: editBoardNameHandler,
    editStatus: editStatusHandler,
    createBoard: createBoardHandler,
    addStatus: addStatusHandler,
    deleteStatus: deleteStatusHandler,
  };
};

export default useBoardMutation;
