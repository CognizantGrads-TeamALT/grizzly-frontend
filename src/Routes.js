import React from 'react';
import PrivateRoute from './components/common/PrivateRoute';
import Payment from './components/portal/payment/Payment';
import Portal from './components/portal/Portal';
import CustomerPortal from './components/portal/CustomerPortal';
import UserSettings from './components/portal/customer/UserSettings';
import DetailedProduct from './components/portal/detailedProduct/DetailedProduct';
import NotFound from './components/not-found/NotFound';
import CategoryForm from './components/portal/categories/CategoryForm';
import ProductForm from './components/portal/products/ProductForm';
import CustomerDetailedProduct from './components/portal/detailedProduct/CustomerDetailedProduct';
import CategoryGridList from './components/portal/common/CategoryGridList';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import ShoppingCart from './components/portal/customer/ShoppingCart';
export default () => {
  return (
    <div className="surround-parent h-100 griz-portal">
      <Switch>
        <Route exact path="/" component={CustomerPortal} />
        <Route exact path="/shoppingcart" component={ShoppingCart} />
        <Route exact path="/payment" component={Payment} />
        <PrivateRoute exact path="/settings" component={UserSettings} />
        {/* Make sure the Portal route is always below other routes or they may not load */}
        <Route exact path="/:portal" component={Portal} />
        <Route
          exact
          path="/category/:searchParam/:catId"
          component={CategoryGridList}
        />
        <Route
          exact
          path="/customerdetailedproduct/:productId"
          component={CustomerDetailedProduct}
        />
        <PrivateRoute
          exact
          path="/detailedproduct/:productId"
          component={DetailedProduct}
        />
        <PrivateRoute
          exact
          path="/detailedproduct/:productId"
          component={DetailedProduct}
        />
        <PrivateRoute exact path="/category/new" component={CategoryForm} />
        <PrivateRoute exact path="/product/new" component={ProductForm} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};
