import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { StatusCodes } from "../../types/StatusTypes";
import { TaskData } from "../../types/TaskTypes";
import { BoardData } from "../../types/BoardTypes";

const useBoard = (boardId?: number) => {
  const queryClient = useQueryClient();

  const boardQuery = useQuery({
    queryKey: ["boards", boardId],
    queryFn: async () => {
      const { data } = await axios.get<BoardData>(
        `https://${process.env.HOST_URL}/boards/${boardId}`
      );
      return { boardDetail: data };
    },
  });
  const statusCodesQuery = useQuery({
    queryKey: ["statusCodes", boardId],
    queryFn: async () => {
      const { data } = await axios.get<StatusCodes[]>(
        `https://${process.env.HOST_URL}/boards/${boardId}/status_codes`
      );
      return { statusCodes: data };
    },
  });

  const tasksQuery = useQuery({
    queryKey: ["tasks", boardId],
    queryFn: async () => {
      const { data } = await axios.get<TaskData[]>(
        `https://${process.env.HOST_URL}/boards/${boardId}/tasks`
      );
      return { boardsTasks: data };
    },
  });

  return {
    boardDetail: boardQuery.data?.boardDetail,
    statusCodes: statusCodesQuery.data?.statusCodes,
    boardsTasks: tasksQuery.data?.boardsTasks,
    statusCodesLoading: statusCodesQuery.isLoading,
    tasksLoading: tasksQuery.isLoading,
    statusCodesError: statusCodesQuery.error,
    tasksError: tasksQuery.error,
    refetch: async () => {
      try {
        await queryClient.invalidateQueries(["boards", boardId]);
        await queryClient.invalidateQueries(["statusCodes", boardId]);
        await queryClient.invalidateQueries(["tasks", boardId]);
      } catch (error) {
        console.error("Error refetching queries:", error);
      }
    },
  };
};

export default useBoard;
