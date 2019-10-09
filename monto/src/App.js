import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./authentication/ProtectedRoute";
import RegisterPage from "./pages/RegisterPage";
import Incomes from "./pages/Incomes";
import Expenses from "./pages/Expenses";
import MainPage from "./pages/MainPage";
import Dashboard from "./pages/Dashboard";
import LoginProtected from "./authentication/LoginProtected";
import FileUploader from "./fileUploading/FileUploader";
import TransactionView from "./pages/TransactionView";

class App extends Component {
  state = {};

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={MainPage} />
          <LoginProtected path="/login" exact={true} component={LoginPage} />
          <LoginProtected path="/register" exact={true} component={RegisterPage}/>
          <ProtectedRoute path="/dashboard" exact={true} component={Dashboard}/>
          <ProtectedRoute path="/incomes" exact={true} component={Incomes} />
          <ProtectedRoute path="/expenses" exact={true} component={Expenses} />
          <ProtectedRoute path="/transactions" exact={true} component={TransactionView} />
          {/*<ProtectedRoute path="/categories" exact={true} component={CategoriesView} />*/}
          {/*<ProtectedRoute path="/accounts" exact={true} component={AccountsView} />*/}
          <Route path="/fileUploader" exact={true} component={FileUploader} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
