import { AuthStore } from "./AuthStore";
import { TransactionsStore } from "./TransactionsStore";
import { CategoriesStore } from "./CategoriesStore";
import { AccountsStore } from "./AccountsStore";

export class RootStore {
  constructor() {
    this.auth = new AuthStore();
    this.transactions = new TransactionsStore();
    this.categories = new CategoriesStore();
    this.accounts = new AccountsStore();
  }
}

export const rootStore = new RootStore();