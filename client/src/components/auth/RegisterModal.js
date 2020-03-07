import React, { Component } from "react";

// CSS and reactstrap
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from "reactstrap";

// Helpers
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errActions";

const propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

class RegisterModal extends Component {
  state = {
    modal: false,
    name: "",
    email: "",
    password: "",
    msg: null
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      //check for a register error
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }

  toggle = () => {
    this.props.clearErrors();
    this.setState({ modal: !this.state.modal });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { name, email, password } = this.state;
    const newUser = {
      name,
      email,
      password
    };
    this.props.register(newUser);
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Register
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  onChange={this.onChange}
                />
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="email"
                  onChange={this.onChange}
                />
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={this.onChange}
                />
                <Button color="dark" className="mt-2">
                  Register
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(
  RegisterModal
);
