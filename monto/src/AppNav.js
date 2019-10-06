import React, {Component} from "react";
import {Nav, Navbar, NavbarBrand, NavItem, NavLink} from "reactstrap";
import "./index.css";
import {inject, observer} from "mobx-react";

export default inject("auth")(observer(
  class AppNav extends Component {
    state = {};

    render() {
      return (
        <div>
          <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">Personal finance manager Monto</NavbarBrand>
            <Nav className="ml-auto" navbar>
              {this.props.auth.authenticated ? <>
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
                      this.props.auth.logout();
                    }}
                  >
                    Logout
                  </NavLink>
                </NavItem>
              </> : <>
                <NavItem>
                  <NavLink href="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/login">Log In</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/register">Sign Up</NavLink>
                </NavItem>
              </>
              }
            </Nav>
          </Navbar>
        </div>);
    }
  }
));
