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
import { Link } from "react-router-dom";
import { addProduct } from "../../../actions/productsActions";
import { searchCategories } from "../../../actions/categoryActions";
import _ from 'lodash';

//import { DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

class ProductForm extends Component {
    constructor(props) {
        
        super(props);
        
        this.state = {
          modal: false,
          category : "",
          name : "",
          description: "",
          price: "",
          categoryList: []
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.searchCatTimer = this.searchCatTimer.bind(this);
      }

      populate(param) {
        
        this.props.searchCategories(param);
        const { categories } = this.props.category;
        console.log(categories);
        if(isEmpty(categories))
            console.log(categories);
            return undefined;
       var options = [];
       categories.map(category => (
       options.add(
           {id: category.id,
            name: category.name})
       ));
       return options;
    }
    
      onToggle() {
        this.setState({
          modal: !this.state.modal
        });
      }

      cancel(e){
        this.props.history.push("/adminportal");
      }

      onSubmit(e) {
        e.preventDefault();
        const newProd = {
            category: this.state.catgegory,
            name: this.state.name,
            description: this.state.description,
            price: this.state.price
          };
        //   addProduct(newProd);
        this.props.addProduct(newProd);
        
        this.setState({
            category : "",
            name : "",
            description: "",
            price: ""
        });
        this.cancel();
      }

      onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }

      searchCatTimer(e){
          e.preventDefault();
          e.persist();
        this.setState({ [e.target.name]: e.target.value });
        //event.persist();
        const catSearch = _.debounce((e) => {this.searchCat(e)}, 300);
        catSearch(e);
      }

      searchCat(e) {
          console.log(e.target.value);
          var categories = this.populate(e.target.value);
          if(categories != undefined){
              console.log("categories not undefined");
            categories.forEach(this.setState(this.props.categoryList.add(
                <button className="btn"> {categories.name} </button>, < br/>
            )
            ),  [] )
            console.log(this.props.categoryLIst.length())  
          }
          //
      }



    render(){
        return(
        <div>
            <form>
                <div className="cat-scroll">
                    <TextFieldGroup
                    placeholder="Category"
                    name="category"
                    value={this.state.category}
                    onChange={this.searchCatTimer}
                    />
                    {this.state.categoryList}
                </div>
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
                onClick={() => this.cancel()}
              >
              Cancel
              </Button>
              
            </div>
        )
        
    }
    
}

ProductForm.propTypes = {
    addProduct: PropTypes.func.isRequired,
    searchCategories: PropTypes.func.isRequired
  };

  const mapStateToProps = state => ({
    product: state.product,
    category: state.category
  });

export default connect(mapStateToProps, { addProduct, searchCategories })(withRouter(ProductForm));