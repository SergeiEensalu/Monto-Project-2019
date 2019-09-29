import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthenticationService from "./AuthenticationService";

//this page is only for directory ".../login" and ".../register. If user is authenticated he cant go to login or register page, so this class direct user to ".../" page. If user is not authenticated he will go to "../login" page to log in
class LoginProtected extends Component {
  render() {
    console.log(
      "is user Authentication",
      AuthenticationService.isUserLoggedIn()
    );
    if (AuthenticationService.isUserLoggedIn()) {
      return <Redirect to="/" />;
    } else {
      return <Route {...this.props} />;
    }
  }
}

export default LoginProtected;
