import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { StatusCodes } from "../../types/StatusTypes";
import { TaskData } from "../../types/TaskTypes";

const useBoardDetails = (boardId: number) => {
  const queryClient = useQueryClient();

  const statusCodesQuery = useQuery({
    queryKey: ["statusCodes", boardId],
    queryFn: async () => {
      const { data } = await axios.get<StatusCodes[]>(
        `http://localhost:8080/boards/${boardId}/status_codes`
      );
      return { statusData: data };
    },
  });

  const tasksQuery = useQuery({
    queryKey: ["tasks", boardId],
    queryFn: async () => {
      const { data } = await axios.get<TaskData[]>(
        `http://localhost:8080/boards/${boardId}/tasks`
      );
      return { tasksData: data };
    },
  });

  return {
    statusCodesData: statusCodesQuery.data?.statusData,
    tasksData: tasksQuery.data?.tasksData,
    statusCodesLoading: statusCodesQuery.isLoading,
    tasksLoading: tasksQuery.isLoading,
    statusCodesError: statusCodesQuery.error,
    tasksError: tasksQuery.error,
    refetch: async () => {
      try {
        await queryClient.invalidateQueries(["statusCodes", boardId]);
        await queryClient.invalidateQueries(["tasks", boardId]);
      } catch (error) {
        console.error("Error refetching queries:", error);
      }
    },
  };
};

export default useBoardDetails;
