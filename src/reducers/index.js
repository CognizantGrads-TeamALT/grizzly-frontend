import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import vendorReducer from "./vendorReducer";
import categoryReducer from "./categoryReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  vendor: vendorReducer,
  category: categoryReducer
});
