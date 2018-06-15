import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import vendorReducer from "./vendorReducer";
import categoryReducer from "./categoryReducer";
import productReducer from "./productReducer";
import userReducer from "./userReducer";


export default combineReducers({
  user: userReducer,
  errors: errorReducer,
  vendor: vendorReducer,
  category: categoryReducer,
  product: productReducer
});
