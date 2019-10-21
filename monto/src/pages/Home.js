import React, { Component } from "react";
import AppNav from "../AppNav";
import Example from "./Example";

class Main extends Component {
  render() {
    return (
      <div>
        <AppNav />
        <Example />
      </div>
    );
  }
}

export default Main;
