import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextFieldGroup from '../../common/TextFieldGroup';
import isEmpty from '../../../validation/is-empty';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { addProduct } from '../../../actions/productsActions';
import {
  searchCategories,
  Update_TypeAhead
} from '../../../actions/categoryActions';
import _ from 'lodash';
import { setTimeout } from 'timers';

class CategoryTypeAhead extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      category: '',
      categoryList: [],
      cur_id: '',
      valid_cat: false
    };
    this.onChange = this.onChange.bind(this);
    this.setCategoryName = this.setCategoryName.bind(this);
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
      var list;
      setTimeout(() => {
        if (
          !isEmpty(this.props.category.categories) &&
          !this.props.category.loading
        ) {
          const { categories } = this.props.category;
          list = this.populate(categories);
          this.setState({
            categoryList: list.map(function(listItem) {
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
                <br key={listItem.id + 10000} />
              ];
            }, this)
          });
        } else {
          this.setState({
            categoryList: [
              className='btn btn-sm btn-outline-info z-index-5000 d-absolute cat-scroll-button'
              key={0}
              type="button"
              name={"No Results"}
              value={0}
              onClick={0}
              >
              {'No results found'}
              </button>
            ]
          });
        }
      }, 1000);
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
      index: 0
    }); //this.props.pageIndex});
  }

  render() {
    const catSearch = _.debounce(e => {
      this.searchCat(e);
    }, 600);
    return (
      <div className={this.props.extraClassNames}>
        <div className="d-inline-block w-100">
          <div className="cat-scroll z-index-5000 d-absolute inner-rounded-corners my-auto inner-mb-0">
          <TextFieldGroup
            placeholder={this.props.placeholder}
            name="category"
            value={this.state.category}
            autocomplete="off"
            onChange={event => {
              // DO NOT DELETE THE COMMENT BELOW
              // eslint-disable-next-line
              this.onChange(event, true), catSearch(event);
            }}
          />
          </div>
        <div className="d-absolute bg-white">{this.state.categoryList}</div>
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
  { addProduct, searchCategories, Update_TypeAhead }
)(withRouter(CategoryTypeAhead));
