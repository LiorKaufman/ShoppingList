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
  Input
} from "reactstrap";

// Helpers
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import { addItem } from "../../actions/ItemActions";

const propTypes = {
  isAuthenticated: PropTypes.bool
};

class ItemModal extends Component {
  state = {
    modal: false,
    name: ""
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newItem = {
      name: this.state.name
    };

    this.props.addItem(newItem);
    this.toggle();
  };

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            color="dark"
            style={{
              marginBottom: "2rem"
            }}
            onClick={this.toggle}
          >
            Add Item
          </Button>
        ) : (
          <h4 className="mb-3 ml-4"> Please Log in to manage items</h4>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item"></Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add item to shopping list"
                  onChange={this.onChange}
                />
                <Button color="dark" className="mt-2">
                  Add Item
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
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addItem })(ItemModal);
