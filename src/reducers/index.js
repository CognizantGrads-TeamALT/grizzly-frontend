import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import vendorReducer from "./vendorReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  vendor: vendorReducer
});
