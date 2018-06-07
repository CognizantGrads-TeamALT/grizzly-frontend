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
import { searchCategories, Update_TypeAhead } from "../../../actions/categoryActions";
import _ from 'lodash';
import Loading from "../../common/Loading";
import async from 'async';
import { setTimeout } from "timers";

class CategoryTypeAhead extends Component {
    constructor(props) {
        
        super(props);
        
        this.state = {
          modal: false,
          category : "",
          categoryList: [],
          cur_id: "",
          valid_cat: false
        };
        this.onChange = this.onChange.bind(this);
        this.setCategoryName = this.setCategoryName.bind(this);
      
      }

      populate(param) {
      var options = param.map(category => ({ id: category.categoryId, name: category.name }));
           return options;
    }

    onChange(e, persist=false) {
        this.setState({ [e.target.name]: e.target.value });
        if(persist) e.persist();
      }

      searchCat(e) {
        this.setState({valid_cat: false})
        this.props.Update_TypeAhead({cur_id: "",
          valid_cat: false})
        if(isEmpty(e)){
          this.setState({categoryList: []})
        }
        else{
          this.props.searchCategories(e.target.value);
          var list;
          setTimeout(() => {if (!isEmpty(this.props.category.categories) && !this.props.category.loading){ 
            const {categories} = this.props.category;
            list = this.populate(categories);
            this.setState({categoryList : 
              list.map(function(listItem) { 
                return([<button className="btn btn-light border-dark cat-scroll-button"
             key={listItem.id} type="button" name={listItem.name} value={listItem.id} onClick={this.setCategoryName}>
              {listItem.name} </button>, <br key={listItem.id +10000} />]);}, this)})}

          }, 1000);
        }
      }
    
      setCategoryName(e){
          this.setState({category: e.target.name,
                        cur_id: e.target.value,
                        valid_cat: true,
                      categoryList: []})
                      
          this.props.Update_TypeAhead({cur_id: e.target.value,
                                        valid_cat: true})
          

      }

      render(){
        const catSearch = _.debounce((e) => {this.searchCat(e)}, 200);
          return(       
                  <div className="cat-scroll">
                      <TextFieldGroup
                        placeholder="Category"
                        name="category"
                        value={this.state.category}
                        onChange={(event) => {this.onChange(event, true), catSearch(event)}}
                      />
                      {this.state.categoryList}
                  </div>)
            


    }

    



}

const mapStateToProps = state => ({
  product: state.product,
  category: state.category
});

export default connect(mapStateToProps, { addProduct, searchCategories, Update_TypeAhead })(withRouter(CategoryTypeAhead));
