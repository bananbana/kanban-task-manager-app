import { useQuery } from "@tanstack/react-query";
import { SubtaskData } from "../../types/SubtaskTypes";
import axios from "axios";

const useSubtasks = (taskId: number) => {
  return useQuery({
    queryKey: ["tasks", taskId],
    queryFn: async () => {
      const { data } = await axios.get<SubtaskData[]>(
        `http://${import.meta.env.VITE_HOST_URL}/tasks/${taskId}/subtasks`
      );
      return data;
    },
  });
};
export default useSubtasks;
