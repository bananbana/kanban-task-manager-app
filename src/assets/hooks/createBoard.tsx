import axios from "axios";
import { BoardData } from "../../types/BoardTypes";
import { UseMutationResult, useMutation } from "@tanstack/react-query";

interface BoardFormData {
  name: string;
  statusCodes: string[];
}

const createBoard = async (formData: BoardFormData) => {
  const res = await axios.put<BoardData>(`http://localhost:8080/boards`, {
    name: formData.name,
    statusCodes: formData.statusCodes,
  });
  return res.data;
};

const useCreateBoardMutation = (): UseMutationResult<
  BoardData,
  unknown,
  BoardFormData,
  unknown
> => {
  return useMutation(createBoard, {
    onSuccess: () => {
      // Handle success
    },
    onError: (error) => {
      console.error("Error creating board:", error);
    },
  });
};

export default useCreateBoardMutation;
