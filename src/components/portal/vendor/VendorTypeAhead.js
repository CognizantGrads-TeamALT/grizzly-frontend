import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../../common/TextFieldGroup';
import _ from 'lodash';
import { searchVendors, Update_TypeAhead } from '../../../actions/vendorActions';
import isEmpty from '../../../validation/is-empty';
import { addProduct} from '../../../actions/productsActions';
import { setTimeout } from 'timers';

class VendorTypeAhead extends Component {
    constructor(props) {
        super(props);

        this.state =
            {
                modal: false,
                vendor: '',
                vendorList: [],
                cur_id: '',
                valid_vendor: false
            };
            this.onChange = this.onChange.bind(this);
            this.setVendorName = this.setVendorName.bind(this);    
        
    }

    populate(param){
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
        this.props.Update_TypeAhead({
            cur_id: '',
            valid_vendor: false
        });
        if (isEmpty(e)) {
            this.setState({ vendorList: [] });
        } else {
            this.props.searchVendors(e.target.value);
            var list;
            setTimeout(() => {

                if (
                    !isEmpty(this.props.vendor.vendors) &&
                    !this.props.vendor.loading) 
                    {
                        console.log("in the timed if statement");
                    const { vendors } = this.props.vendor;
                    list = this.populate(vendors);
                    this.setState(
                        {
                            vendorList: list.map(function(listItem) {
                                return [
                                    <button
                                        className="btn btn-sm btn-outline-info  vendor-scroll-button"
                                        key={listItem.id}
                                        type="button"
                                        name={listItem.name}
                                        value={listItem.id}
                                        onClick={this.setVendorName}>
                                        
                                        {listItem.name}
                                    </button>, <br key={listItem.id + 10000} />

                                ];
                            }, this)
                        }
                    );
                }

            }, 1000);
        }

    }

    setVendorName(e)
    {
        this.setState({
            vendor: e.target.name,
            cur_id: e.target.value,
            value_vendor: true,
            vendorList: []
        });

        this.props.onClickHandler({
            cur_id: e.target.valid_vendor,
            valid_vendor: true,
            index: 0
        });
    }


    render() {
        const vendorSearch = _.debounce(e => {
            this.searchVend(e);
        }, 200);
        return (<div className={this.props.extraClassNames}>
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
            <div className="floating-div-vendor bg-white">{this.state.vendorList}</div>
        </div> );
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
    { addProduct, searchVendors, Update_TypeAhead }
  )(withRouter(VendorTypeAhead));
  


