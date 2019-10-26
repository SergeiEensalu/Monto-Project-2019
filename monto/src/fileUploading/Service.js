import axios from "axios";
import { rootStore } from "../store/RootStore";
class Service {
  constructor() {
    console.log("Service is constructed");
  }

  getRestClient() {
    if (!this.serviceInstance) {
      this.serviceInstance = axios.create({
        baseURL: "http://localhost:8383/",
        timeout: 10000,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + rootStore.auth.token
        }
      });
    }
    return this.serviceInstance;
  }
}

export default new Service();
