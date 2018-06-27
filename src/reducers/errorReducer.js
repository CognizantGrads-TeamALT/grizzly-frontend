import * as types from "../actions/types";


const initialState = {
  waitForError: true
  };

export default function(state = initialState, action) {
  switch (action.type) {
    case types.GET_ERRORS:
    var errdata
    try{
    errdata = JSON.parse(action.payload);
    }
    catch(err){
      errdata = { message: "Connection error, servers may be down", debugMessage : err}
    }
    console.log(errdata);
      return {...state, 
              errorMessage : errdata.message,
              errorDebug: errdata.debugMessage};
    case types.CLEAR_ERRORS:
    console.log("clearing errors");
      return {...state, 
              errorMessage : "",
              errorDebug: ""};
    case types.STOP_WAITING:
        console.log("stop waiting set to false");
        return{...state,
              waitForError: false}
    case types.START_WAITING:
        return{...state,
              waitForError: true}
    default:
      return state;
  }
  
}

