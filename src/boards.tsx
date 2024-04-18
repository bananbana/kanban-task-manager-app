import axios from "axios";
import { BoardData } from "./types/BoardTypes";
import { StatusCodes } from "./types/StatusTypes";
import { TaskData } from "./types/TaskTypes";
import { authHeader } from "./services/auth-header";
import AuthService from "./services/auth.service";

export const getBoardDetails = async (boardId?: string) => {
  try {
    let url;
    if (boardId) {
      url = `http://${import.meta.env.VITE_HOST_URL}/user/boards/${boardId}`;
      const board = await axios.get<BoardData>(url, {
        headers: authHeader(),
      });
      const statusCodes = await axios.get<StatusCodes[]>(
        `${url}/status_codes`,
        {
          headers: authHeader(),
        }
      );
      const tasks = await axios.get<TaskData[]>(`${url}/tasks`, {
        headers: authHeader(),
      });
      return {
        board: board.data,
        statusCodes: statusCodes.data,
        tasks: tasks.data,
      };
    }
  } catch (error) {
    console.error("Error fetching board:", error);
    throw error; // You might want to handle errors more gracefully in your application
  }
};

export const getBoards = async () => {
  if (AuthService.getCurrentUser()) {
    try {
      const boards = await axios.get<BoardData[]>(
        `http://${import.meta.env.VITE_HOST_URL}/user/boards`,
        {
          headers: authHeader(),
        }
      );
      return boards.data ?? [];
    } catch (error) {
      console.error("Error fetching boards:", error);
      throw error;
    }
  }
};

export const getAllBoards = async () => {
  if (AuthService.getCurrentUser()) {
    try {
      const boards = await axios.get<BoardData[]>(
        `http://${import.meta.env.VITE_HOST_URL}/boards`,
        {
          headers: authHeader(),
        }
      );
      return boards.data ?? [];
    } catch (error) {
      console.error("Error fetching boards:", error);
      throw error;
    }
  }
};
