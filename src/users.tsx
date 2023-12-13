import axios from "axios";
import { UserType } from "./types/UserType";
import { authHeader } from "./services/auth-header";
import AuthService from "./services/auth.service";

export const getUsers = async () => {
  if (AuthService.getCurrentUser()) {
    try {
      const users = await axios.get<UserType[]>(
        `http://localhost:8080/user/all`,
        { headers: authHeader() }
      );
      return users.data ?? [];
    } catch (error) {
      console.error("Error fetching users: ", error);
      throw error;
    }
  }
};

export const getUserDetails = async () => {
  try {
    const userDet = await axios.get<UserType>(
      "http://localhost:8080/user/user_details",
      { headers: authHeader() }
    );
    return userDet.data ?? [];
  } catch (error) {
    console.error("Error fetching user: ", error);
    throw error;
  }
};
