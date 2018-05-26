import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "../../common/Input";

class SearchSort extends Component {
  constructor() {
    super();
    this.state = {
      search: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
  }
  render() {
    return (
      <div className="btn-group mt-2 mb-2">
        <Input
          type="search"
          name="search"
          placeholder="Search"
          value={this.state.search}
          onChange={this.onChange}
        />
        <button
          className="btn btn-outline-success btn-sm ml-sm-2 mr-sm-2"
          type="submit"
        >
          Search
        </button>

        <button
          type="button"
          className="btn btn-outline-success btn-sm dropdown-toggle mr-sm-2"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Sort By
        </button>
        <div className="dropdown-menu">
          <button className="dropdown-item" type="button">
            ID
          </button>
          <button className="dropdown-item" type="button">
            Name
          </button>
          <button className="dropdown-item" type="button">
            Location
          </button>
        </div>
      </div>
    );
  }
}

export default connect(null)(SearchSort);
