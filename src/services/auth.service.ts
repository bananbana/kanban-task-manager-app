import axios, { AxiosResponse } from "axios";
import IUser from "../types/user.type";
import eventBus from "../common/EventBus";

const API_URL = `https://${import.meta.env.VITE_HOST_URL}/api/auth/`;

class AuthService {
  login(username: string, password: string) {
    console.log(import.meta.env.VITE_HOST_URL);
    return axios
      .post(API_URL + "signin", {
        username,
        password,
      })
      .then((response: AxiosResponse<{ accessToken: string }>) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
          eventBus.dispatch("login");
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username: string, email: string, password: string) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr) as IUser;

    return null;
  }
}

export default new AuthService();
