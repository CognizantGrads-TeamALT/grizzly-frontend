import * as types from "../actions/types";

const initialState = {errorMessage : "Undefined Error",
errorDebug: ""};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.GET_ERRORS:
    //TODO: Get rid of Try Catch statement once all api calls have been fixed to pass on error data correctly (payload : err.request.responce)
    var errdata
    try{
    errdata = JSON.parse(action.payload);
    }
    catch(err){
      errdata = { message: "undefined error", debug : err}
    }
      return {errorMessage : errdata.message,
      errorDebug: errdata.debug};
    case types.CLEAR_ERRORS:
      return {errorData : "Undefined Error"};
    default:
      return state;
  }
}