import React, { Component } from "react";
import AppNav from "./AppNav";
import Logo from "../pictures/logo.png";

class Dashboard extends Component {
  state = {};
  render() {
    return (
      <div>
        <AppNav />
        <div align="center">
          <img src={Logo} alt="Logo" align="middle" />
        </div>
      </div>
    );
  }
}

export default Dashboard;
