import axios from "axios";
import { authHeader } from "./auth-header";

const REACT_APP_HOST_URL = `https://${process.env.REACT_APP_HOST_URL}/api/test/`;

class UserService {
  getPublicContent() {
    return axios.get(REACT_APP_HOST_URL + "all");
  }

  getUserBoard() {
    return axios.get(REACT_APP_HOST_URL + "user", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(REACT_APP_HOST_URL + "admin", { headers: authHeader() });
  }
}

export default new UserService();
