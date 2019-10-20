import { action, computed, decorate, observable, reaction } from "mobx";
import { Client } from "../util/client";

const TOKEN = "authenticationToken";

export class AuthStore {
  token;

  constructor() {
    this.token = sessionStorage.getItem(TOKEN)

    reaction(() => this.token, () => {
      if (this.token === null) {
        sessionStorage.removeItem(TOKEN);
      } else {
        sessionStorage.setItem(TOKEN, this.token);
      }
    });
  }

  get authenticated() {
    return this.token !== null;
  }

  async login(email, password) {
    const {status, json} = await Client.post("/api/auth/login", {email, password});

    if (status === 200) {
      this.token = json.token;
    } else {
      return status;
    }
  }

  async register(email, password) {
    const {status, json} = await Client.post("/api/auth/register", {email, password});

    if (status === 200) {
      this.token = json.token;
    } else {
      return status;
    }
  }

  logout = async () => {
    this.token = null;
  }
}

decorate(AuthStore, {
  token: observable,
  authenticated: computed,
  login: action,
  logout: action
});