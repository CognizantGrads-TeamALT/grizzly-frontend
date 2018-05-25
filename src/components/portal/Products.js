import React, { Component } from "react";
import SearchSort from "./SearchSort";
import CategoryFilter from "./CategoryFilter";

class Products extends Component {
  render() {
    return (
      <div>
        <SearchSort />
        <CategoryFilter />
        <button
          className="btn btn-outline-success ml-sm-2 mr-sm-2"
          type="submit"
        >
          Add Product
        </button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Products Name</th>
              <th scope="col">Brand</th>
              <th scope="col">Category</th>
              <th scope="col">Rating</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>5</td>
              <td>
                <button
                  className="btn btn-outline-info my-2 my-sm-0 mr-sm-2"
                  type="button"
                >
                  View
                </button>
                <button
                  className="btn btn-outline-warning my-2 my-sm-0 mr-sm-2"
                  type="button"
                >
                  Block
                </button>
                <button
                  className="btn btn-outline-danger my-2 my-sm-0 mr-sm-2"
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
              <td>5</td>
              <td>
                <button
                  className="btn btn-outline-info my-2 my-sm-0 mr-sm-2"
                  type="button"
                >
                  View
                </button>
                <button
                  className="btn btn-outline-warning my-2 my-sm-0 mr-sm-2"
                  type="button"
                >
                  Block
                </button>
                <button
                  className="btn btn-outline-danger my-2 my-sm-0 mr-sm-2"
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
              <td>5</td>
              <td>
                <button
                  className="btn btn-outline-info my-2 my-sm-0 mr-sm-2"
                  type="button"
                >
                  View
                </button>
                <button
                  className="btn btn-outline-warning my-2 my-sm-0 mr-sm-2"
                  type="button"
                >
                  Block
                </button>
                <button
                  className="btn btn-outline-danger my-2 my-sm-0 mr-sm-2"
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
export default Products;
