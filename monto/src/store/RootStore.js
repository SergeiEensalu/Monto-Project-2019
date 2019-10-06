import {AuthStore} from "./AuthStore";

export class RootStore {
  constructor() {
    this.auth = new AuthStore();
  }
}

export const rootStore = new RootStore();