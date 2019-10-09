import { AuthStore } from "./AuthStore";
import { TransactionsStore } from "./TransactionsStore";

export class RootStore {
  constructor() {
    this.auth = new AuthStore();
    this.transactions = new TransactionsStore();
  }
}

export const rootStore = new RootStore();