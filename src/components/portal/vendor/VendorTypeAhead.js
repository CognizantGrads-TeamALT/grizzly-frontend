import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../../common/TextFieldGroup';
import _ from 'lodash';
import {
  searchVendors,
  Vendor_Update_TypeAhead,
  clearCurrentVendors
} from '../../../actions/vendorActions';
import isEmpty from '../../../validation/is-empty';
import { addProduct, clearFilteredProducts } from '../../../actions/productsActions';


class VendorTypeAhead extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      vendor: '',
      vendorList: [],
      cur_id: '',
      valid_vendor: false,
      count: 0
    };
    this.onChange = this.onChange.bind(this);
    this.setVendorName = this.setVendorName.bind(this);
    this.waitForResponse = this.waitForResponse.bind(this);
    this.vendorSearch = _.debounce(e => {
      this.searchVend(e)
    }, 350);
  }

  populate(param) {
    var options = param.map(vendor => ({
      id: vendor.vendorId,
      name: vendor.name
    }));
    return options;
  }

  onChange(e, persist = false) {
    this.setState({ [e.target.name]: e.target.value });
    if (persist) e.persist();
  }

  searchVend(e) {
    this.setState({ valid_vendor: false });
    this.props.Vendor_Update_TypeAhead({
      cur_id: '',
      valid_vendor: false
    });
    if (isEmpty(e.target.value)) {
      this.setState({ vendorList: [] });
    }
    else {
      this.props.searchVendors(e.target.value);
      this.setState({ intervalId: setInterval(this.waitForResponse, 50) });
    }
  }
  waitForResponse() {
    if (!isEmpty(this.props.vendor.vendors) && !this.props.vendor.loading) 
    {
      clearInterval(this.state.intervalId);
      var list;
      const { vendors } = this.props.vendor;
      list = this.populate(vendors);
      this.setState({
        count: 0,
        vendorList: list.map(function (listItem) {
          return [
            <button
              className="btn btn-sm btn-outline-info z-index-5000 d-absolute vendor-scroll-button"
              key={listItem.id}
              type="button"
              name={listItem.name}
              value={listItem.id}
              onClick={this.setVendorName}
            >
              {listItem.name}
            </button>,
            <br key={listItem.id + 300} />
          ];
        }, this)
      });
    } else if (this.state.count > 20) {
      clearInterval(this.state.intervalId);
      this.setState({
        count: 0,
        vendorList: [
          <button
            className="btn btn-sm btn-outline-info vendor-scroll-button"
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
      this.props.clearCurrentVendors();
    }
    else {
      this.setState({ count: this.state.count + 1 });
    }
  }

  clearTypeAhead = () => {
    this.setState(this.baseState)
    clearInterval(this.state.intervalId);
    //this shouldn't be nessessary because this.basestate should do this anyway
    //but it doesn't, don't know why, this works
    this.setState({vendorList: [],
    vendor: ''});
    this.props.clearCurrentVendors();
    this.props.clearFilteredProducts();
  }

  setVendorName(e) {
    this.setState({
      vendor: e.target.name,
      cur_id: e.target.value,
      value_vendor: true,
      vendorList: []
    });

    this.props.onClickHandler({
      cur_id: e.target.value,
      valid_vendor: true,
      index: 0,
      name: e.target.name
    });
  }
  render() {
    return (
      <div className={this.props.extraClassNames}>
        <div className="vendor-scroll d-absolute inner-mb-0">
          <TextFieldGroup
            placeholder={this.props.placeholder}
            name="vendor"
            value={this.state.vendor}
            onChange={event => {
              // eslint-disable-next-line
              this.onChange(event, true), this.vendorSearch(event);
            }}
          />
          <div className="btn pl-0 move-left d-inline z-index-600" onClick={this.clearTypeAhead}>
          <i className="far fa-times-circle d-inline"></i>
          </div>
        </div>
        <div className="vendor-typeahead-position bg-white z-index-5000">
          {this.state.vendorList}
        </div>
      </div>
    );
  }
}

VendorTypeAhead.defaultProps = {
  placeholder: '',
  extraClassNames: '',
  pageIndex: 0
};

VendorTypeAhead.prototypes = {
  placeholder: PropTypes.string,
  extraClassNames: PropTypes.string,
  onClickHandler: PropTypes.func.isRequired,
  pageIndex: PropTypes.number
};

const mapStateToProps = state => ({
  product: state.product,
  vendor: state.vendor
});
export default connect(
  mapStateToProps,
  { addProduct, searchVendors, Vendor_Update_TypeAhead, clearCurrentVendors, clearFilteredProducts }
)(withRouter(VendorTypeAhead));
