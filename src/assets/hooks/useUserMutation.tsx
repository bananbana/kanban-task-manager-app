import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { authHeader } from "../../services/auth-header";
import { UserType } from "../../types/UserType";

const useUserMutation = () => {
  const queryClient = useQueryClient();
  const userMutation = useMutation({
    mutationFn: async (data: {
      id: number;
      username: string;
      email: string;
      password: string;
    }) => {
      try {
        const res = await axios.put<UserType>(
          `http://${process.env.API_URL}/user/${data.id}/update`,
          {
            password: data.password,
            username: data.username,
            email: data.email,
          },
          { headers: authHeader() }
        );
        return res;
      } catch (err) {
        console.error("User mutation error ocurred: ", err);
        throw err; // rethrow the error to mark the mutation as failed
      }
    },
  });

  const userMutationHandler = async (data: {
    id: number;
    username: string;
    email: string;
    password: string;
  }) => {
    await userMutation.mutateAsync(data);
  };

  const denyUserAccessMutation = useMutation({
    mutationFn: async (data: { userId: number; boardId: number }) => {
      try {
        const res = await axios.put<UserType>(
          `http://${process.env.API_URL}/user/boards/${data.boardId}/user_access`,
          { userId: data.userId },
          { headers: authHeader() }
        );
        return res;
      } catch (error) {
        console.error("User access mutation error ocurred: ", error);
        throw error;
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries(["boards"]);
    },
  });

  const denyUserAccessHandler = (data: { userId: number; boardId: number }) => {
    denyUserAccessMutation.mutate(data);
  };

  const changeUserPasswordMutation = useMutation({
    mutationFn: async (data: {
      id: number;
      newPassword: string;
      password: string;
      username: string;
      email: string;
    }) => {
      try {
        const res = await axios.put<UserType>(
          `http://${process.env.API_URL}/user/${data.id}/password_change`,
          {
            newPassword: data.newPassword,
            userDto: {
              password: data.password,
              username: data.username,
              email: data.email,
            },
          },
          { headers: authHeader() }
        );
        return res;
      } catch (error) {
        console.error("Error changing password: ", error);
        throw error;
      }
    },
  });

  const changeUserPasswordHandler = (data: {
    id: number;
    newPassword: string;
    password: string;
    username: string;
    email: string;
  }) => {
    changeUserPasswordMutation.mutate(data);
  };

  const removeBoardAccessMutation = useMutation({
    mutationFn: async (data: { boardId: number }) => {
      try {
        const res = await axios.put<UserType>(
          `http://${process.env.API_URL}/user/boards/${data.boardId}/abandon_access`,
          {},
          { headers: authHeader() }
        );
        return res;
      } catch (error) {
        console.error("Error removing access to board: ", error);
        throw error;
      }
    },
  });

  const removeBoardAccessHandler = (data: { boardId: number }) => {
    removeBoardAccessMutation.mutate(data);
  };

  const deleteAccountMutation = useMutation({
    mutationFn: async (data: {
      userId: number;
      username: string;
      email: string;
      password: string;
    }) => {
      try {
        const res = await axios.delete<UserType>(
          `http://${process.env.API_URL}/user/${data.userId}/delete`,
          {
            data: {
              username: data.username,
              email: data.email,
              password: data.password,
            },
            headers: authHeader(),
          }
        );
        return res;
      } catch (error) {
        console.error("Error deleting account: ", error);
        throw error;
      }
    },
  });

  const deleteAccountHandler = (data: {
    userId: number;
    username: string;
    email: string;
    password: string;
  }) => {
    deleteAccountMutation.mutate(data);
  };

  return {
    editUser: userMutationHandler,
    denyUserAccess: denyUserAccessHandler,
    changePassword: changeUserPasswordHandler,
    removeBoardAccess: removeBoardAccessHandler,
    deleteAccount: deleteAccountHandler,
  };
};

export default useUserMutation;
