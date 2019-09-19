import React, { Component } from "react";
import AppNav from "./AppNav";
import Background from "./background.jpg";

class Category extends Component {
  state = {};

  render() {
    return (
      <div
        style={{
          backgroundImage: "url(" + Background + ")"
        }}
      >
        <AppNav />
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
          }}
        >
          Needs to be emplemented
        </h2>
      </div>
    );
  }
}

export default Category;
