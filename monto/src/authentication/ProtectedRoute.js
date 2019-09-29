import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthenticationService from "./AuthenticationService";

class ProtectedRoute extends Component {
  render() {
    console.log(
      "is user Authentication",
      AuthenticationService.isUserLoggedIn()
    );
    if (AuthenticationService.isUserLoggedIn()) {
      return <Route {...this.props} />;
    } else {
      return <Redirect to="/login" />;
    }
  }
}

export default ProtectedRoute;
