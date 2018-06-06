import React, { Component } from "react";
import { connect } from "react-redux";
import TextFieldGroup from "../../common/TextFieldGroup";
import PropTypes from "prop-types";
import { Row, Col, Nav, NavItem } from "reactstrap";
import classnames from "classnames";
import Profile from "../profile/Profile";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
// import { addProduct } from "../../../actions/productsActions";
import { searchCategories } from "../../../actions/categoryActions";
import isEmpty from "../../../validation/is-empty";
import _ from "lodash";
import ImageUploader from "./ImageUploader";

class ProductForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      pictures: [],
      files: [],
      name: "",
      categoryId: "",
      desc: "",
      price: "",
      categoryList: []
    };

    this.onDrop = this.onDrop.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.searchCatTimer = this.searchCatTimer.bind(this);
  }

  onDrop(pictureFiles, pictureDataURLs) {
    this.setState({
      pictures: this.state.pictures.concat(pictureFiles),
      files: this.state.files.concat(pictureDataURLs)
    });
  }

  onToggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newProd = {
      category: this.state.catgegory,
      name: this.state.name,
      desc: this.state.desc,
      price: this.state.price
    };
    console.log(newProd);
    // this.props.addProduct(newProd);

    this.setState({
      category: "",
      name: "",
      description: "",
      price: ""
    });
    this.cancel();
  }

  cancel(e) {
    this.props.history.push("/adminportal");
  }

  searchCatTimer(e) {
    e.preventDefault();
    e.persist();
    this.setState({ [e.target.name]: e.target.value });
    const catSearch = _.debounce(e => {
      this.searchCat(e);
    }, 1);
    catSearch(e);
  }

  searchCat(e) {
    this.props.searchCategories(e.target.value);

    let list;

    if (
      !isEmpty(this.props.category.categories) &&
      !this.props.category.loading
    ) {
      const { categories } = this.props.category;
      console.log("test2");
      list = this.populate(categories);
      this.setState({
        categoryList: list.map(listItem => (
          <button className="btn"> {categories.name} </button>
        ))
      });
    }
  }

  populate(param) {
    console.log("param");
    console.log(param);
    const options = param.map(category => ({
      id: category.id,
      name: category.name
    }));
    return options;
  }

  render() {
    return (
      <div className="row">
        <div className="col-3">
          <Profile />
        </div>
        <div className="col-9">
          <Row>
            <Col>
              <Nav tabs>
                <NavItem>
                  <Link
                    to="/adminportal"
                    className={classnames(
                      "nav-link hover-w-b btn-outline-success my-2 my-sm-0",
                      {
                        active: this.state.activeTab === "1"
                      }
                    )}
                  >
                    PRODUCTS
                  </Link>
                </NavItem>
                <NavItem>
                  <Link
                    to="/adminportal"
                    className={classnames(
                      "nav-link hover-w-b btn-outline-success my-2 my-sm-0"
                    )}
                  >
                    VENDORS
                  </Link>
                </NavItem>
                <NavItem>
                  <Link
                    to="/adminportal"
                    className={classnames(
                      "nav-link hover-w-b btn-outline-success my-2 my-sm-0"
                    )}
                  >
                    CATEGORIES
                  </Link>
                </NavItem>
              </Nav>
            </Col>
          </Row>
          <div className="row-9">
            <div className="row">
              <div className="col-5">
                <ImageUploader
                  withIcon={true}
                  withPreview={true}
                  buttonText="Choose images"
                  onChange={this.onDrop}
                  imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                  maxFileSize={5242880}
                />
              </div>
              <div className="col-4">
                <form>
                  <TextFieldGroup
                    placeholder="Category"
                    name="categoryId"
                    value={this.state.categoryId}
                    onChange={this.searchCatTimer}
                  />
                  <TextFieldGroup
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  <TextFieldGroup
                    placeholder="Description"
                    name="desc"
                    value={this.state.desc}
                    onChange={this.onChange}
                  />
                  <TextFieldGroup
                    placeholder="Price"
                    name="price"
                    value={this.state.price}
                    onChange={this.onChange}
                  />
                </form>
                <button
                  className="btn more-rounded hover-w-b btn-sm my-2 my-sm-0 mr-sm-2 pr-2"
                  onClick={this.onSubmit}
                >
                  Add
                </button>
                <button
                  className="btn more-rounded hover-w-b btn-sm my-2 my-sm-0 mr-sm-2 pr-2"
                  onClick={() => this.cancel()}
                >
                  Cancel
                </button>
              </div>
              <div className="col-3">Buttons</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProductForm.propTypes = {
  // addProduct: PropTypes.func.isRequired,
  searchCategories: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  product: state.product,
  category: state.category
});

export default connect(
  mapStateToProps,
  { searchCategories }
)(withRouter(ProductForm));
