import { useQuery } from "@tanstack/react-query";
import { SubtaskData } from "../../types/SubtaskTypes";
import axios from "axios";

const useSubtasks = (taskId: number) => {
  return useQuery({
    queryKey: ["tasks", taskId],
    queryFn: async () => {
      const { data } = await axios.get<SubtaskData[]>(
        `http://localhost:8080/tasks/${taskId}/subtasks`
      );
      return data;
    },
  });
};
export default useSubtasks;
