import { Client } from "../util/client";
import { action, decorate, observable } from "mobx";

export class AccountsStore {
    accounts = [];

    async load() {
        this.accounts = (await Client.get("/api/accounts")).json;
    }

    async delete(account) {
        this.accounts.splice(this.accounts.indexOf(account), 1);
        await Client.delete(`/api/accounts/${account.id}`);
    }

    async add(name) {
        this.accounts.splice(0, 0, (await Client.post("/api/accounts", { name })).json);
    }
}

decorate(AccountsStore, {
    load: action,
    delete: action,
    accounts: observable
});