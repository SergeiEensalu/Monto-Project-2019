import React, { Component } from "react";
import { Nav, NavItem, NavbarBrand, NavLink, Navbar } from "reactstrap";

class AppNav extends Component {
  state = {};
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Personal finance manager Monto</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/categories">Incomes</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/expenses">Expenses</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default AppNav;
