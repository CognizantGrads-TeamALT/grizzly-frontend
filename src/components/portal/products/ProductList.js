import React, { Component } from 'react';
import ConfirmModal from '../common/ConfirmModal';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  toggleBlockProduct,
  deleteProduct
} from '../../../actions/productsActions';
import isEmpty from '../../../validation/is-empty';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: this.props.location
    };
    this.onBlockClick = this.onBlockClick.bind(this);
    this.onViewClick = this.onViewClick.bind(this);
  }

  onDeleteClick(id) {
    this.props.deleteProduct(id);
  }

  onBlockClick() {
    const { product } = this.props;
    this.props.toggleBlockProduct(product.productId, !product.enabled);
  }

  onViewClick() {
    const { product } = this.props;

    this.props.history.push(`/detailedproduct/${product.productId}`);
  }

  showCatName(product) {
    const { product_category } = this.props;
    if (!isEmpty(product) && !isEmpty(product_category)) {
      const catName =
        product.categoryId === 0
          ? product.categoryId
          : product_category.filter(
              item => item.categoryId === product.categoryId
            )[0].name;
      return catName;
    }
  }

  showVendorName(product) {
    const { product_vendor } = this.props;
    if (!isEmpty(product) && !isEmpty(product_vendor)) {
      const vendName =
        product.vendorId === 0
          ? product.vendorId
          : product_vendor.filter(item => item.vendorId === product.vendorId)[0]
              .name;
      return vendName;
    }
  }

  render() {
    const { product } = this.props;
    return (
      <tr>
        <th scope="row">{product.productId}</th>
        <td>{product.name}</td>
        <td>{this.showVendorName(product)}</td>
        <td>{this.showCatName(product)}</td>
        <td>{product.rating}</td>
        <td>
          <div className="row">
            <div className="col p-0">
              <Button
                onClick={this.onViewClick}
                className="btn more-rounded blue-b btn-sm mr-sm-2 d-inline"
              >
                View
              </Button>
            </div>
            {this.props.userType === 'admin' && (
              <div className="col p-0 collapsable-block-appearance">
                <ConfirmModal
                  buttonLabel={product.enabled ? 'Block' : 'Unblock'}
                  title="Block Product"
                  confirmText={
                    (product.enabled ? 'Block' : 'Unblock') + ' ' + product.name
                  }
                  buttonClass="btn more-rounded orange-b btn-sm mr-sm-2 d-inline"
                  onSubmit={this.onBlockClick}
                />
              </div>
            )}
            <div className="col p-0">
              <ConfirmModal
                buttonLabel="Delete"
                title="Delete Product"
                confirmText={'Delete ' + product.name}
                buttonClass="btn more-rounded red-b btn-sm mr-sm-2 d-inline"
                onSubmit={this.onDeleteClick.bind(this, product.productId)}
              />
            </div>
          </div>
        </td>
      </tr>
    );
  }
}

ProductList.propTypes = {
  toggleBlockProduct: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired
};

export default connect(
  null,
  { toggleBlockProduct, deleteProduct }
)(withRouter(ProductList));
