class Auth {
    constructor() {
        this.authenticated = false;
    }

    login(cb) {
        console.log("login-test: "  + cb);
        this.authenticated = true;
        cb();
    }

    logout(cb) {
        console.log("logout-test: "  + cb);
        this.authenticated = false;
        cb();
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth();
