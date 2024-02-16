import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BoardData } from "../../types/BoardTypes";
import { authHeader } from "../../services/auth-header";
import { UserType } from "../../types/UserType";

const useAdminMutation = () => {
  const queryClient = useQueryClient();

  const deleteBoardAdminMutation = useMutation({
    mutationFn: (boardId: number) => {
      return axios.delete<BoardData>(
        `https://${process.env.REACT_APP_HOST_URL}/boards/${boardId}`,
        {
          headers: authHeader(),
        }
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries(["boards-all"]);
    },
  });

  const deleteBoardAdminHandler = (boardId: number) => {
    deleteBoardAdminMutation.mutate(boardId);
  };

  const deleteUserAdminMutation = useMutation({
    mutationFn: (userId: number) => {
      return axios.delete<UserType>(
        `https://${process.env.REACT_APP_HOST_URL}/user/${userId}`,
        {
          headers: authHeader(),
        }
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries(["users"]);
    },
  });

  const deleteUserAdminHandler = (userId: number) => {
    deleteUserAdminMutation.mutate(userId);
  };

  const assignAdminMutation = useMutation({
    mutationFn: (userId: number) => {
      return axios.put(
        `https://${process.env.REACT_APP_HOST_URL}/user/${userId}`,
        { roleId: 2 },
        {
          headers: authHeader(),
        }
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries(["users"]);
    },
  });

  const assignAdminHandler = (userId: number) => {
    assignAdminMutation.mutate(userId);
  };

  const updateUserAccessMutation = useMutation({
    mutationFn: (data: { users: UserType[]; boardId: number }) => {
      return axios.put(
        `https://${process.env.REACT_APP_HOST_URL}/boards/${data.boardId}/update_access`,
        data.users.map((user) => user.id),
        { headers: authHeader() }
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries(["boards-all"]);
    },
  });

  const updateUserHandler = (data: { users: UserType[]; boardId: number }) => {
    updateUserAccessMutation.mutate(data);
  };

  return {
    deleteBoardAdmin: deleteBoardAdminHandler,
    deleteUserAdmin: deleteUserAdminHandler,
    assignAdmin: assignAdminHandler,
    updateUserAccess: updateUserHandler,
  };
};

export default useAdminMutation;
