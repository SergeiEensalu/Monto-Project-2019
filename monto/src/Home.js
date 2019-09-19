import React, { Component } from "react";
import AppNav from "./AppNav";
import Background from "./background.jpg";
import Logo from "./logo.png";

class Home extends Component {
  state = {};
  render() {
    return (
      <div
        style={{
          backgroundImage: "url(" + Background + ")"
        }}
      >
        <AppNav />
        <div align="center">
          <img src={Logo} alt="Logo" align="middle" />
        </div>
      </div>
    );
  }
}

export default Home;
