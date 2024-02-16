import axios from "axios";
import { UserType } from "./types/UserType";
import { authHeader } from "./services/auth-header";

export const getUsers = async () => {
  try {
    const users = await axios.get<UserType[]>(
      `https://${process.env.HOST_URL}/user/all`,
      { headers: authHeader() }
    );
    return users.data ?? [];
  } catch (error) {
    console.error("Error fetching users: ", error);
    throw error;
  }
};

export const getUserDetails = async () => {
  try {
    const userDet = await axios.get<UserType>(
      `https://${process.env.HOST_URL}/user/user_details`,
      { headers: authHeader() }
    );
    return userDet.data ?? [];
  } catch (error) {
    console.error("Error fetching user: ", error);
    throw error;
  }
};
