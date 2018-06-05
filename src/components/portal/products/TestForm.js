import React, { Component } from "react";
import { Row, Col, Nav, NavItem } from "reactstrap";
import { Link } from "react-router-dom";
import classnames from "classnames";
import Profile from "../profile/Profile";
import TextFieldGroup from "../../common/TextFieldGroup";
import ImageUploader from "./ImageUploader";

class TestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      files: [],
      name: "",
      categoryId: "",
      desc: "",
      price: ""
    };

    this.onDrop = this.onDrop.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onDrop(pictureFiles, pictureDataURLs) {
    this.setState({
      pictures: this.state.pictures.concat(pictureFiles),
      files: this.state.files.concat(pictureDataURLs)
    });
  }

  onSubmit(e) {
    e.preventDefault();
  }

  cancel(e) {
    this.props.history.push("/adminportal");
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
                    onChange={this.onChange}
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

export default TestForm;
