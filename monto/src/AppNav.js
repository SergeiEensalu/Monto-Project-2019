import React, { Component } from "react";
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap";
import AuthenticationService from "./authentication/AuthenticationService";
import "./index.css";

class AppNav extends Component {
  state = {};

  render() {
    if (AuthenticationService.isUserLoggedIn()) {
      return (
        <div>
          <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">Personal finance manager Monto</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/dashboard">Dashboard</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/incomes">Incomes</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/expenses">Expenses</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/fileUploader">Upload file</NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="/"
                  onClick={() => {
                    AuthenticationService.logout();
                  }}
                >
                  Logout
                </NavLink>
              </NavItem>
            </Nav>
          </Navbar>
        </div>
      );
    } else {
      return (
        <div>
          <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">Personal finance manager Monto</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/login">Login</NavLink>
              </NavItem>
            </Nav>
          </Navbar>
        </div>
      );
    }
  }
}

export default AppNav;
