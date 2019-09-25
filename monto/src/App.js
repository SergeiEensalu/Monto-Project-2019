import React, {Component} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginPage from "./LoginPage";
import ProtectedRoute from "./protected.route";
import Category from "./Category";
import Expenses from "./Expenses";
import MainPage from "./MainPage";
import Dashboard from "./Dashboard";

class App extends Component {
    state = {};

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact={true} component={MainPage}/>
                    <ProtectedRoute path="/dashboard" exact={true} component={Dashboard}/>
                    <ProtectedRoute path="/categories" exact={true} component={Category}/>
                    <ProtectedRoute path="/expenses" exact={true} component={Expenses}/>
                    <Route path="/login" exact={true} component={LoginPage}/>
                    <Route path="*" component={() => "404 NOT FOUND"}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
