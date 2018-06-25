import * as types from "../actions/types";


const initialState = {

  };

export default function(state = initialState, action) {
  switch (action.type) {
    case types.GET_ERRORS:
    var errdata
    try{
    errdata = JSON.parse(action.payload);
    }
    catch(err){
      errdata = { message: "undefined error", debugMessage : err}
    }
      return {errorMessage : errdata.message,
      errorDebug: errdata.debugMessage};
    case types.CLEAR_ERRORS:
      return {errorMessage : "",
  errorDebug: ""};
    default:
      return state;
  }
}