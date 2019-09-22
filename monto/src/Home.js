import React, { Component } from "react";
import AppNav from "./AppNav";
import Logo from "./logo.png";

class Home extends Component {
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

export default Home;
