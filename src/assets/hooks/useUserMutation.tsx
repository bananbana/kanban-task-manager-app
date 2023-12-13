import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { authHeader } from "../../services/auth-header";
import { UserType } from "../../types/UserType";

const useUserMutation = () => {
  // const userMutation = useMutation({
  //   mutationFn: async (data: {
  //     id: number;
  //     username: string;
  //     email: string;
  //     password: string;
  //   }) => {
  //     const res = await axios.put<UserType>(
  //       `http://localhost:8080/user/${data.id}/update`,
  //       {
  //         password: data.password,
  //         username: data.username,
  //         email: data.email,
  //       },
  //       { headers: authHeader() }
  //     );
  //     return res;
  //   },
  //   onError: (err: AxiosError) => {
  //     if (err.response?.status === 401) {
  //       setError("You provided the wrong password");
  //     } else {
  //       setError("An error occurred. Please try again.");
  //     }
  //   },
  //   onSuccess: () => {
  //     setError(null);
  //   },
  // });

  const userMutation = useMutation({
    mutationFn: async (data: {
      id: number;
      username: string;
      email: string;
      password: string;
    }) => {
      try {
        const res = await axios.put<UserType>(
          `http://localhost:8080/user/${data.id}/update`,
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

  return {
    editUser: userMutationHandler,
  };
};

export default useUserMutation;
