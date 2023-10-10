import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BoardData } from "../../types/BoardTypes";

const useBoards = (boardId?: number | null) => {
  return useQuery({
    queryKey: ["boards", boardId],
    queryFn: async () => {
      let url;
      if (boardId) {
        url = `http://localhost:8080/boards/${boardId}`;
      } else {
        url = `http://localhost:8080/boards`;
      }
      const { data } = await axios.get<BoardData[]>(url);
      return data;
    },
  });
};

export default useBoards;
