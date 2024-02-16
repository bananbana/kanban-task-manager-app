import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { StatusCodes } from "../../types/StatusTypes";
import { BoardData } from "../../types/BoardTypes";
import { authHeader } from "../../services/auth-header";
import { UserType } from "../../types/UserType";
import { useNavigate } from "react-router-dom";

const useBoardMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const editBoardNameMutation = useMutation({
    mutationFn: async (data: { boardId: string; name: string }) => {
      const res = await axios.put<BoardData>(
        `https://${import.meta.env.VITE_HOST_URL}/user/boards/${data.boardId}`,
        { name: data.name },
        { headers: authHeader() }
      );
      return res.data;
    },
  });

  const editBoardNameHandler = (data: { boardId: string; name: string }) => {
    editBoardNameMutation.mutate(data);
  };

  const editStatusMutation = useMutation({
    mutationFn: async (data: {
      boardId: string;
      statusId: number;
      name: string;
    }) => {
      const res = await axios.put<StatusCodes>(
        `https://${import.meta.env.VITE_HOST_URL}/user/boards/${
          data.boardId
        }/status_codes/${data.statusId}`,
        { name: data.name },
        { headers: authHeader() }
      );
      return res.data;
    },
  });
  const editStatusHandler = (data: {
    boardId: string;
    statusId: number;
    name: string;
  }) => {
    editStatusMutation.mutate(data);
  };

  const editStatusColorMutation = useMutation({
    mutationFn: async (data: {
      boardId: number;
      statusId: number;
      newColor: string;
    }) => {
      const res = await axios.put<StatusCodes>(
        `https://${import.meta.env.VITE_HOST_URL}/user/boards/${
          data.boardId
        }/status_codes/${data.statusId}/color`,
        { newColor: data.newColor },
        { headers: authHeader() }
      );
      return res.data;
    },
  });

  const editStatusColorHandler = (data: {
    boardId: number;
    statusId: number;
    newColor: string;
  }) => {
    editStatusColorMutation.mutate(data);
  };

  const createBoardMutation = useMutation({
    mutationFn: async (data: {
      name: string;
      statusCodes: string[];
      userIds: number[];
      ownerId: number;
    }) => {
      return await axios
        .post<BoardData>(
          `https://${import.meta.env.VITE_HOST_URL}/user/boards/create`,
          {
            name: data.name,
            statusCodes: data.statusCodes,
            userIds: data.userIds,
            ownerId: data.ownerId,
          },
          { headers: authHeader() }
        )
        .then((response) => response.data);
    },
    onSuccess: (data) => {
      const newBoardId = data.id;
      navigate(`/user/boards/${newBoardId}`);
    },
    onSettled() {
      void queryClient.invalidateQueries(["boards"]);
    },
    onError(error) {
      console.error("Error creating board:", error);
    },
  });

  const createBoardHandler = (data: {
    name: string;
    statusCodes: string[];
    userIds: number[];
    ownerId: number;
  }) => {
    void createBoardMutation.mutateAsync(data);
  };

  const addStatusMutation = useMutation({
    mutationFn: async (data: { boardId: string; name: string }) => {
      const res = await axios.post<StatusCodes>(
        `https://${import.meta.env.VITE_HOST_URL}/user/boards/${
          data.boardId
        }/status_codes`,
        {
          boardId: data.boardId,
          name: data.name,
        },
        {
          headers: authHeader(),
        }
      );
      return res.data;
    },
  });

  const addStatusHandler = (data: { boardId: string; name: string }) => {
    // addStatusMutation.mutate(data);
    addStatusMutation.mutate({ boardId: data.boardId, name: data.name });
  };

  const deleteStatusMutation = useMutation({
    mutationFn: async (data: { boardId: string; statusId: number }) => {
      await axios.delete<StatusCodes>(
        `https://${import.meta.env.VITE_HOST_URL}/user/boards/${
          data.boardId
        }/status_codes/${data.statusId}`,
        { headers: authHeader() }
      );
    },
  });

  const deleteStatusHandler = (data: { boardId: string; statusId: number }) => {
    deleteStatusMutation.mutate(data);
  };

  const deleteBoardMutation = useMutation({
    mutationFn: (boardId: string) => {
      return axios.delete<BoardData>(
        `https://${import.meta.env.VITE_HOST_URL}/user/boards/${boardId}`,
        { headers: authHeader() }
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries(["boards"]);
    },
  });

  const deleteBoardHandler = (boardId: string) => {
    deleteBoardMutation.mutate(boardId);
  };

  const shareBoardMutation = useMutation({
    mutationFn: (data: { userId: number; boardId: number }) => {
      return axios.put<UserType>(
        `https://${import.meta.env.VITE_HOST_URL}/user/boards/assign/${
          data.userId
        }`,
        { boardId: data.boardId },
        { headers: authHeader() }
      );
    },
  });

  const shareBoardHandler = (data: { userId: number; boardId: number }) => {
    shareBoardMutation.mutate(data);
  };

  return {
    editBoardName: editBoardNameHandler,
    editStatus: editStatusHandler,
    editStatusColor: editStatusColorHandler,
    createBoard: createBoardHandler,
    addStatus: addStatusHandler,
    deleteStatus: deleteStatusHandler,
    deleteBoard: deleteBoardHandler,
    shareBoard: shareBoardHandler,
  };
};

export default useBoardMutation;
