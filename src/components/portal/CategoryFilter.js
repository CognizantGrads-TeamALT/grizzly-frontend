import React, { Component } from "react";

class CategoryFilter extends Component {
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
        <button
          type="button"
          className="btn btn btn-outline-success dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Filter by Category
        </button>
        <div className="dropdown-menu">
          <button className="dropdown-item" type="button">
            Category Name
          </button>
        </div>
      </div>
    );
  }
}

export default CategoryFilter;
