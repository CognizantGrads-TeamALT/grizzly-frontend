import React, { Component } from "react";
import { connect } from "react-redux";
import SearchSort from "../common/SearchSort";

class Inventory extends Component {
  render() {
    return (
      <div>
        <SearchSort />
        <table className="table table-sm table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Products Name</th>
              <th scope="col">In Stock</th>
              <th scope="col">Req.</th>
              <th scope="col">Buffer</th>
              <th scope="col">Price/Item</th>
              <th scope="col">Pending</th>
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
              <td>5</td>
              <td>5</td>
              <td>5</td>
              <td>
                <button
                  className="btn btn-outline-info btn-sm my-2 my-sm-0 mr-sm-2"
                  type="button"
                >
                  Edit
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>5</td>
              <td>5</td>
              <td>5</td>
              <td>5</td>
              <td>
                <button
                  className="btn btn-outline-info btn-sm my-2 my-sm-0 mr-sm-2"
                  type="button"
                >
                  Edit
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
              <td>5</td>
              <td>5</td>
              <td>5</td>
              <td>5</td>
              <td>
                <button
                  className="btn btn-outline-info btn-sm my-2 my-sm-0 mr-sm-2"
                  type="button"
                >
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default connect(null)(Inventory);
