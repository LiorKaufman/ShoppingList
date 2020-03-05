import React, { Component } from "react";

import {
  Navbar,
  NavLink,
  NavItem,
  Nav,
  Collapse,
  Container,
  NavbarBrand,
  NavbarToggler
} from "reactstrap";

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <div>
        <Navbar expand="sm" dark color="dark" className="mb-5">
          <Container>
            <NavbarBrand href="/">Shopping List App</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen}>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="www.liorkaufman.com">Portfolio</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default AppNavbar;
