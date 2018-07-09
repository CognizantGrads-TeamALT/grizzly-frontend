import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextFieldGroup from '../../common/TextFieldGroup';
import isEmpty from '../../../validation/is-empty';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { addProduct, clearFilteredProducts } from '../../../actions/productsActions';
import {
  searchCategories,
  Update_TypeAhead,
  clearCurrentCategories
} from '../../../actions/categoryActions';
import _ from 'lodash';

class CategoryTypeAhead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      category: '',
      categoryList: [],
      cur_id: '',
      valid_cat: false,
      count: 0
    };

    this.waitForResponse = this.waitForResponse.bind(this);
    this.onChange = this.onChange.bind(this);
    this.setCategoryName = this.setCategoryName.bind(this);
    this.catSearch = _.debounce(e => {
      this.searchCat(e)
    }, 350);
    this.baseState = this.state;
  }

  populate(param) {
    var options = param.map(category => ({
      id: category.categoryId,
      name: category.name
    }));
    return options;
  }

  onChange(e, persist = false) {
    this.setState({ [e.target.name]: e.target.value });
    if (persist) e.persist();
  }

  searchCat(e) {
    this.setState({ valid_cat: false });
    this.props.Update_TypeAhead({
      cur_id: '',
      valid_cat: false
    });
    if (isEmpty(e.target.value)) {
      this.setState({ categoryList: [] });
    } else {
      this.props.searchCategories(e.target.value);
      this.setState({ intervalId: setInterval(this.waitForResponse, 50) });
    }
  }

  waitForResponse() {
    if (
      !isEmpty(this.props.category.categories) &&
      !this.props.category.loading
    ) {
      clearInterval(this.state.intervalId);
      var list;
      const { categories } = this.props.category;
      list = this.populate(categories);
      this.setState({
        count: 0,
        categoryList: list.map(function (listItem) {
          return [
            <button
              className="btn btn-outline-info z-index-5000 d-absolute btn-sm cat-scroll-button"
              key={listItem.id}
              type="button"
              name={listItem.name}
              value={listItem.id}
              onClick={this.setCategoryName}
            >
              {listItem.name}
            </button>,
            <br key={listItem.id + 300} />
          ];
        }, this)
      });

    }
    else if (this.state.count > 20) {
      clearInterval(this.state.intervalId);
      this.setState({
        count: 0,
        categoryList: [
          <button
            className="btn btn-sm btn-outline-info cat-scroll-button"
            key={0}
            type="button"
            name={'No Results'}
            value={0}
            onClick={this.clearTypeAhead}
          >
            {'No results found'}
          </button>,
          <br key={0 + 1000} />
        ]
      });
      this.props.clearCurrentCategories();
    }
    else {
      this.setState({ count: this.state.count + 1 });
    }
  }

  setCategoryName(e) {
    this.setState({
      category: e.target.name,
      cur_id: e.target.value,
      valid_cat: true,
      categoryList: []
    });

    this.props.onClickHandler({
      cur_id: e.target.value,
      valid_cat: true,
      index: 0,
      name: e.target.name
    });
  }

  clearTypeAhead = () => {
    this.setState(this.baseState)
    clearInterval(this.state.intervalId);
        //this shouldn't be nessessary because this.basestate should do this anyway
    //but it doesn't, don't know why, this works
    this.setState({categoryList: []});
    this.props.clearCurrentCategories();
    this.props.clearFilteredProducts();
  }

  render() {
    return (
      <div className={this.props.extraClassNames}>
        <div className="d-inline-block w-100">
          <div className="cat-scroll form-inline z-index-5000 d-absolute inner-rounded-corners my-auto inner-mb-0">
          <div className="form-group w-75">
            <TextFieldGroup
              placeholder={this.props.placeholder}
              name="category"
              value={this.state.category}
              autocomplete="off"
              onChange={event => {
                // DO NOT DELETE THE COMMENT BELOW
                // eslint-disable-next-line
                this.onChange(event, true), this.catSearch(event);
              }}
            />
            <div className="btn pl-0 move-left d-inline z-index-600" onClick={this.clearTypeAhead}><i className="far fa-times-circle d-inline"></i></div>
          </div>
          </div>
          <div className="cat-typeahead-position bg-white z-index-5000">{this.state.categoryList}</div>
        </div>
      </div>
    );
  }
}

CategoryTypeAhead.defaultProps = {
  placeholder: '',
  extraClassNames: '',
  pageIndex: 0
};

CategoryTypeAhead.propTypes = {
  placeholder: PropTypes.string,
  extraClassNames: PropTypes.string,
  onClickHandler: PropTypes.func.isRequired,
  pageIndex: PropTypes.number
};

const mapStateToProps = state => ({
  product: state.product,
  category: state.category
});

export default connect(
  mapStateToProps,
  { addProduct, searchCategories, Update_TypeAhead, clearCurrentCategories, clearFilteredProducts }
)(withRouter(CategoryTypeAhead));
