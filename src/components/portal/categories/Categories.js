import React, { Component } from "react";
import { connect } from "react-redux";
import SearchSort from "../common/SearchSort";
import { Link } from "react-router-dom";
class Categories extends Component {
  render() {
    return (
      <div>
        <SearchSort />
        <Link
          className="btn btn-outline-success btn-sm ml-sm-2 mr-sm-2"
          to="/category/new"
        >
          Add Category
        </Link>
        <table className="table table-sm table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Category</th>
              <th scope="col">Description</th>
              <th scope="col">Description</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>
                <button
                  className="btn btn-outline-info btn-sm my-2 my-sm-0 mr-sm-2"
                  type="button"
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline-warning btn-sm my-2 my-sm-0 mr-sm-2"
                  type="button"
                >
                  Block
                </button>
                <button
                  className="btn btn-outline-danger btn-sm my-2 my-sm-0 mr-sm-2"
                  type="button"
                >
                  Delete
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>
                <button
                  className="btn btn-outline-info btn-sm my-2 my-sm-0 mr-sm-2"
                  type="button"
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline-warning btn-sm my-2 my-sm-0 mr-sm-2"
                  type="button"
                >
                  Block
                </button>
                <button
                  className="btn btn-outline-danger btn-sm my-2 my-sm-0 mr-sm-2"
                  type="button"
                >
                  Delete
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
              <td>
                <button
                  className="btn btn-outline-info btn-sm my-2 my-sm-0 mr-sm-2"
                  type="button"
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline-warning btn-sm my-2 my-sm-0 mr-sm-2"
                  type="button"
                >
                  Block
                </button>
                <button
                  className="btn btn-outline-danger btn-sm my-2 my-sm-0 mr-sm-2"
                  type="button"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default connect(null)(Categories);
