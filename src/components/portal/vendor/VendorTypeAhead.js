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
import { addProduct } from '../../../actions/productsActions';
import { setTimeout } from 'timers';

class VendorTypeAhead extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      vendor: '',
      vendorList: [],
      cur_id: '',
      valid_vendor: false
    };
    this.onChange = this.onChange.bind(this);
    this.setVendorName = this.setVendorName.bind(this);
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
      this.props.clearCurrentVendors();
    } else {
      this.props.searchVendors(e.target.value);
      var list;
      setTimeout(() => {
        if (!isEmpty(this.props.vendor.vendors) && !this.props.vendor.loading) {
          const { vendors } = this.props.vendor;
          list = this.populate(vendors);
          this.setState({
            vendorList: list.map(function(listItem) {
              return [
                <button
                  className="btn btn-sm btn-outline-info  vendor-scroll-button"
                  key={listItem.id}
                  type="button"
                  name={listItem.name}
                  value={listItem.id}
                  onClick={this.setVendorName}
                >
                  {listItem.name}
                </button>,
                <br key={listItem.id + 10000} />
              ];
            }, this)
          });
        } else {
          this.setState({
            vendorList: [
              <button
                className="btn btn-sm btn-outline-info  vendor-scroll-button"
                key={0}
                type="button"
                name={'No Results'}
                value={'No results found'}
                onClick={0}
              >
                {'No results found'}
              </button>,
              <br key={0 + 10000} />
            ]
          });
          this.props.clearCurrentVendors();
        }
      }, 1000);
    }
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
      index: 0
    });
  }
  render() {
    const vendorSearch = _.debounce(e => {
      this.searchVend(e);
    }, 900);
    return (
      <div className={this.props.extraClassNames}>
        <div className="vendor-scroll">
          <TextFieldGroup
            placeholder={this.props.placeholder}
            name="vendor"
            value={this.state.vendor}
            onChange={event => {
              // eslint-disable-next-line
              this.onChange(event, true), vendorSearch(event);
            }}
          />
        </div>
        <div className="floating-div-vendor bg-white">
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
  { addProduct, searchVendors, Vendor_Update_TypeAhead, clearCurrentVendors }
)(withRouter(VendorTypeAhead));
