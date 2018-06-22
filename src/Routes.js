import React from 'react';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import Portal from './components/portal/Portal';
import CustomerPortal from './components/portal/CustomerPortal';
import DetailedProduct from './components/portal/detailedProduct/DetailedProduct';
import NotFound from './components/not-found/NotFound';
import CategoryForm from './components/portal/categories/CategoryForm';
import ProductForm from './components/portal/products/ProductForm';
import CustomerDetailedProduct from './components/portal/detailedProduct/CustomerDetailedProduct';
import CategoryGridList from './components/portal/common/CategoryGridList';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Landing from './components/layout/Landing';
export default () => {
  return (
    <div className="surround-parent h-100 griz-portal">
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/:portal" component={Portal} />
        <Route exact path="/customer" component={CustomerPortal} />
        <Route
          exact
          path="/detailedproduct/:productId"
          component={DetailedProduct}
        />
        <Route
          exact
          path="/customerdetailedproduct/:productId"
          component={CustomerDetailedProduct}
        />
        <Route exact path="/category/new" component={CategoryForm} />
        <Route
          exact
          path="/category/:searchParam/:catId"
          component={CategoryGridList}
        />
        <Route exact path="/product/new" component={ProductForm} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};
