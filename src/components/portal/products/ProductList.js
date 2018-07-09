import React, { Component } from 'react';
import ConfirmModal from '../common/ConfirmModal';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import StarRatings from 'react-star-ratings';
import { connect } from 'react-redux';
import {
  toggleBlockProduct,
  deleteProduct,
  clearFilteredProducts
} from '../../../actions/productsActions';
import isEmpty from '../../../validation/is-empty';
import ErrorComponent from '../../common/ErrorComponent';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: this.props.location,
      showError: false,
      listenForError: false,
      count: 0,
      testCount: 0
    };
    this.onBlockClick = this.onBlockClick.bind(this);
    this.onViewClick = this.onViewClick.bind(this);
    this.closeError = this.closeError.bind(this);
    this.waitForResponce = this.waitForResponce.bind(this);
  }

  componentWillMount(){
    this.props.clearFilteredProducts()
  }

  closeError() {
    this.setState({ showError: false });
  }

  onDeleteClick(id) {
    this.props.deleteProduct(id);
    this.setState({ listenForError: true });
  }

  onBlockClick() {
    const product = this.props.product.products.filter(
      prod => prod.productId === parseInt(this.props.prod.productId, 10)
    )[0];

    this.props.toggleBlockProduct(product.productId, !product.enabled);
    //sets it so that errors thrown will be shown, starts a listener to wait for a error.
    this.setState({
      listenForError: true,
      block: true,
      count: 0,
      intervalId: setInterval(this.waitForResponce, 100)
    });
  }

  onViewClick() {
    const product = this.props.product.products.filter(
      prod => prod.productId === parseInt(this.props.prod.productId, 10)
    )[0];
    this.props.history.push(`/detailedproduct/${product.productId}`);
  }

  waitForResponce = product => {
    //timed method, listens for error and displays if if there is one.
    if (this.props.errors.errorMessage !== '' && this.state.listenForError) {
      this.setState({
        showError: true,
        listenForError: false
      });
      clearInterval(this.state.intervalId);
    } else if (this.state.count > 5) {
      clearInterval(this.state.intervalId);
      this.setState({ listenForError: false });
    } else this.setState({ count: this.state.count + 1 });
  };

  showCatName(product) {
    const { product_category } = this.props.product;
    //adding in the same check to category as to vendor, this does not currently throw an error on search due to there only being 5 categories,
    //all of them are loaded, however if more categores are added this method could face the same problem
    if (!isEmpty(product) && !isEmpty(product_category)) {
      var filtered = product_category.filter(
        item => item.categoryId === product.categoryId
      );
      var catName;
      if (filtered.length !== 0) catName = filtered[0].name;
      else {
        catName = product.categoryId;
      }
      return catName;
    }
  }

  showVendorName(product) {
    const { product_vendor } = this.props.product
    if (!isEmpty(product) && !isEmpty(product_vendor)) {
      //create a filtered list of vendors that match the product vendor
      //this list should only ever have a length of 1 or 0
      var filtered = product_vendor.filter(
        item => item.vendorId === product.vendorId
      );
      var vendName;
      //if the list has a value, return the name from the list
      if (filtered.length !== 0) vendName = filtered[0].name;
      //if vendor id is 0, it's been removed
      else if (product.vendorId === 0) vendName = "None";
      //else just return the vendor id.
      else vendName = product.vendorId;
      return vendName;
    }
  }

  render() {
    const product = this.props.product.products.filter(
      prod => prod.productId === parseInt(this.props.prod.productId, 10)
    )[0];

    if (!isEmpty(product)) {
      return (
        <tr>
          <th scope="row">{product.productId}</th>
          <td>{product.name}</td>
          <td>{this.showVendorName(product)}</td>
          <td>{this.showCatName(product)}</td>
          <td>
            <StarRatings
              rating={product.rating}
              starRatedColor="#f0ca4d"
              numberOfStars={5}
              name="rating"
              starDimension="15px"
              starSpacing="1px"
            />
          </td>
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
              {this.props.role === 'admin' && (
                <div className="col p-0 collapsable-block-appearance">
                  <ConfirmModal
                    buttonLabel={product.enabled ? 'Block' : 'Unblock'}
                    title="Block Product"
                    confirmText={
                      (product.enabled ? 'Block' : 'Unblock') +
                      ' ' +
                      product.name
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
                <ErrorComponent
                  errormsg={this.props.errors.errorMessage}
                  popup={true}
                  show={this.state.showError}
                  closeError={this.closeError}
                />
              </div>
            </div>
          </td>
        </tr>
      );
    } else {
      return <tr />;
    }
  }
}

ProductList.propTypes = {
  toggleBlockProduct: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,

  errors: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  product: state.product
});

export default connect(
  mapStateToProps,
  { toggleBlockProduct, deleteProduct, clearFilteredProducts }
)(withRouter(ProductList));
