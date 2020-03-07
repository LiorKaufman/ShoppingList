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

// Components
import RegisterModal from "./auth/RegisterModal";
import Logout from "./auth/Logout";
import LoginModal from "./auth/LoginModal";

// redux
import { connect } from "react-redux";

// helpers
import PropTypes from "prop-types";

const propTypes = {
  auth: PropTypes.object.isRequired
};

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong>{user ? `Welcome ${user.name}` : ""}</strong>
          </span>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </>
    );

    const guestLinks = (
      <>
        <NavItem>
          <RegisterModal />
        </NavItem>

        <NavItem>
          <LoginModal />
        </NavItem>
      </>
    );
    return (
      <div>
        <Navbar expand="sm" dark color="dark" style={{ marginBottom: 5 }}>
          <Container>
            <NavbarBrand href="/">Shopping List App</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {isAuthenticated ? authLinks : guestLinks}
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

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavbar);
