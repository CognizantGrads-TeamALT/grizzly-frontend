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
      errdata = { message: "Connection error, servers may be down", debugMessage : action.payload}
    }
    return {...state, 
            errorMessage : errdata.message,
            errorDebug: errdata.debugMessage};

    case types.CLEAR_ERRORS:
      return {...state, 
              errorMessage : "",
              errorDebug: ""};

    case types.STOP_WAITING:
      return{...state,
            waitForError: false}

    case types.START_WAITING:
      return{...state,
            waitForError: true}

    default:
      return state;
  }
}

