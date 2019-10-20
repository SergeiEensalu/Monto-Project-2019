import React, { Component } from "react";
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap";
import "./pages/LoginPage.css";
import { inject, observer } from "mobx-react";

class AppNav extends Component {
  state = {};

  render() {
    return (
      <div>
        <Navbar className="navbar-light bg-light" expand="md">
          <NavbarBrand href="/">Monto</NavbarBrand>
          <Nav className="ml-auto" navbar>
            {this.props.auth.authenticated ? <>
              <NavItem>
                <NavLink href="/dashboard">Dashboard</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/transactions">Transactions</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/fileUploader">Upload file</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/" onClick={this.props.auth.logout}>Logout</NavLink>
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
            </>}
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default inject("auth")(observer(AppNav));




