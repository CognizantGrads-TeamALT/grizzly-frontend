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
import Spinner from "../../common/Spinner";
import Loading from "../../common/Loading";
import async from 'async';




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
        
        console.log("param");
        console.log(param);

        //this.props.searchCategories(param);
        //const { categories, loading } = this.state.categories;//this.props.categories;
      //   const {categories} = this.props;
      //   if (!isEmpty(categories)){
      //     console.log(categories);
      //   var count = 0;
      var options = param.map(category => ({ id: category.id, name: category.name }));

     /*      var options = [];
          param.map(category => (
            options.concat(
            {id: category.id,
            name: category.name})     
        )); */
        console.log(options.length + " options Length");
           return options;
      // }
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
        const catSearch = _.debounce((e) => {this.searchCat(e)}, 1);
        catSearch(e);
      }


      searchCat(e) {
          //const makeRequest = async () => {
          this.props.searchCategories(e.target.value);
          

          var list;

          if (!isEmpty(this.props.category.categories && !this.props.category.loading)){ 
            const {categories} = this.props.category;

            list = this.populate(categories);
            this.setState({categoryList : list.map(listItem => (<button className="btn"> {categories.name} </button>,
          < br/>  ))})
          }

          
          
            
              
//<button className="btn"> {categories.name} </button>, < br/>
          

          //     this.setState({categoryList : catList});
          //   console.log(catList.length);  
          // }
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