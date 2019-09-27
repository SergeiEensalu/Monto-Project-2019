import React, {Component} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginPage from "./LoginPage";
import ProtectedRoute from "../authentication/protected.route";
import RegisterPage from "./RegisterPage";
import Incomes from "./Incomes";
import Expenses from "./Expenses";
import MainPage from "./MainPage";
import Dashboard from "./Dashboard";
import LoginProtected from "../authentication/loginprotect";

class App extends Component {
    state = {};

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact={true} component={MainPage}/>
                    <LoginProtected path="/login" exact={true} component={LoginPage}/>
                    <LoginProtected path="/register" exact={true} component={RegisterPage}/>
                    <ProtectedRoute path="/dashboard" exact={true} component={Dashboard}/>
                    <ProtectedRoute path="/incomes" exact={true} component={Incomes}/>
                    <ProtectedRoute path="/expenses" exact={true} component={Expenses}/>
                    <Route path="*" component={() => "404 NOT FOUND"}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
