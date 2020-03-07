import React, { Component } from "react";

// CSS and bootstrap tools
import { NavLink } from "reactstrap";
// helpers
import PropTypes from "prop-types";
//Redux
import { logout } from "../../actions/authActions";
import { connect } from "react-redux";

const propTypes = {
  logout: PropTypes.func.isRequired
};

class Logout extends Component {
  render() {
    return (
      <>
        <NavLink onClick={this.props.logout}>Logout</NavLink>
      </>
    );
  }
}

export default connect(null, {
  logout
})(Logout);
