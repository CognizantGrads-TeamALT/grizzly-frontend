import React, { Component } from "react";
import SearchSort from "./SearchSort";

class Vendor extends Component {
  render() {
    return (
      <div>
        <SearchSort />
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Vendor Name</th>
              <th scope="col">Location</th>
              <th scope="col">Contact</th>
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
export default Vendor;
