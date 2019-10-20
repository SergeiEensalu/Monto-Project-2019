import React, { Component } from "react";
import AppNav from "../AppNav";
import { Container } from "reactstrap";
import Form from "react-bootstrap/Form";
import "./LoginPage.css";
import Example from "./Example";
import { UncontrolledCarousel } from "reactstrap";

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
