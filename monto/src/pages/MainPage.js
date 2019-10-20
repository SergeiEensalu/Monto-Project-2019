import React, { Component } from "react";
import AppNav from "../AppNav";
import { Container } from "reactstrap";
import Main_page_pic from "../images/Main_page_pic.png";
import Form from "react-bootstrap/Form";
import "./LoginPage.css";

class Main extends Component {
  render() {
    return (
      <div>
        <AppNav />
        <Container>
          <Form>
            <h1 className="knockout">MONTO</h1>

            <h5 className="knockout2">
              Monto is a finance manager that helps you track your personal
              income/expenses and monitor assets and liabilities. Monto's aim is
              to make analysis and data observation as easy as possible by using
              innovative approaches and solutions
            </h5>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Main;
