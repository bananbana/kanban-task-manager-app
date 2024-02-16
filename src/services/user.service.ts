import axios from "axios";
import { authHeader } from "./auth-header";

const HOST_URL = `https://${process.env.HOST_URL}/api/test/`;

class UserService {
  getPublicContent() {
    return axios.get(HOST_URL + "all");
  }

  getUserBoard() {
    return axios.get(HOST_URL + "user", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(HOST_URL + "admin", { headers: authHeader() });
  }
}

export default new UserService();
