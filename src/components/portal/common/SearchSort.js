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
      <div className="btn-group aligned-left mt-2 mb-2">

          <form onSubmit={this.onSubmit} className="form-inline ml-0 mr-1">
            <div class="search-form-custom">
              <input class="form-control left-rounded border-right-0 border" type="search" name="search" placeholder="Search" value={this.state.search} onChange={this.onChange}/>
              <span class="input-group-append-more">
                  <button class="btn btn-outline-success right-rounded border-left-0 border" type="button">
                      <i class="fa fa-search"></i>
                  </button>
                </span>
            </div>
            
        </form>


        <button
          type="button"
          className="btn more-rounded btn-outline-success dropdown-toggle mr-sm-2"
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
