import axios from "axios";
import { authHeader } from "./auth-header";

const VITE_HOST_URL = `https://${import.meta.env.VITE_HOST_URL}/api/test/`;

class UserService {
  getPublicContent() {
    return axios.get(VITE_HOST_URL + "all");
  }

  getUserBoard() {
    return axios.get(VITE_HOST_URL + "user", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(VITE_HOST_URL + "admin", { headers: authHeader() });
  }
}

export default new UserService();
