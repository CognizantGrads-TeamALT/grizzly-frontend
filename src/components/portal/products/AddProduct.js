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
import AddProduct from "./AddProduct";
import { Link } from "react-router-dom";
import { addProduct } from "../../../actions/productsActions";


class AddProducts extends Component {
    constructor(props) {
        
        super(props);
        
        this.state = {
          modal: false,
          category : "",
          name : "",
          description: "",
          price: ""
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

          const newProd = {
            category: this.state.catgegory,
            name: this.state.name,
            description: this.state.description,
            price: this.state.price
          };
          addProduct(newProd);
          //this.props.addProduct(newProd);
        
        this.setState({
            category : "",
            name : "",
            description: "",
            price: ""
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
                    value={this.state.category}
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
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                  <TextFieldGroup
                    placeholder="Price"
                    name="price"
                    value={this.state.price}
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

AddProducts.propTypes = {
    addProduct: PropTypes.func.isRequired,
  };

  const mapStateToProps = state => ({
    addProduct: state.product
  });

export default connect(mapStateToProps, { AddProduct })(AddProducts);