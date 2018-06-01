import React, { Component } from "react";
import { connect } from "react-redux";
import ProductSearchSort from "../common/ProductSearchSort";
import CategoryFilter from "../common/CategoryFilter";
import TextFieldGroup from "../../common/TextFieldGroup";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import isEmpty from "../../../validation/is-empty";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";


class AddProducts extends Component {
    constructor(props) {
        
        super(props);
        
        this.state = {
          modal: false,
          catgegory : this.props.product.category,
          name : this.props.product.name,
          description: this.props.product.description,
          price: this.props.product.price
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      }
    
      onToggle() {
        this.setState({
          modal: !this.state.modal
        });
      }

      cancel(e){
        window.location.href = '/adminportal';
      }

      onSubmit(e) {
        e.preventDefault();

          const newCat = {
            category: this.state.catgegory,
            name: this.state.name,
            description: this.state.description,
            price: this.state.price
          };
    
          this.props.addCategory(newCat);
        
        this.setState({
          name: "",
          description: ""
        });
        this.onToggle();
      }

      onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }

    render(){
        return(
        <div>
            <form>
            <TextFieldGroup
                    placeholder="Category"
                    name="category"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  <TextFieldGroup
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  <TextFieldGroup
                    placeholder="Description"
                    name="description"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  <TextFieldGroup
                    placeholder="price"
                    name="price"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  </form>
                  <Button
                className="btn more-rounded hover-w-b btn-sm my-2 my-sm-0 mr-sm-2 pr-2"
                onClick={this.onSubmit}
              >
              Add
              </Button>
              <Button
                className="btn more-rounded hover-w-b btn-sm my-2 my-sm-0 mr-sm-2 pr-2"
                onClick={this.cancel}
              >
              Cancel
              </Button>
              
            </div>
        )
        
    }
    
}
export default connect(null)(AddProducts);