import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import AdminPortal from "./components/portal/AdminPortal";
import VendorPortal from "./components/portal/VendorPortal";
import CustomerPortal from "./components/portal/CustomerPortal";
import ProductPortal from "./components/portal/ProductPortal";
import DetailedProduct from "./components/portal/detailedProduct/DetailedProduct";
import NotFound from "./components/not-found/NotFound";
import CategoryForm from "./components/portal/categories/CategoryForm";
import ProductForm from "./components/portal/products/ProductForm";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/adminportal" component={AdminPortal} />
                <Route exact path="/vendorportal" component={VendorPortal} />
                <Route
                  exact
                  path="/customerportal"
                  component={CustomerPortal}
                />
                <Route
                  exact
                  path="/productportal/:searchFilter/:searchParam"
                  component={ProductPortal}
                />
                <Route
                  exact
                  path="/detailedproduct/:productId"
                  component={DetailedProduct}
                />
                <Route exact path="/category/new" component={CategoryForm} />
                <Route exact path="/product/new" component={ProductForm} />
                <Route component={NotFound} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
