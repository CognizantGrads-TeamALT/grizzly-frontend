import * as types from "../actions/types";


const initialState = {
  waitForError: true
  };

export default function(state = initialState, action) {
  switch (action.type) {
    case types.GET_ERRORS:
    var errdata
    //if the error is one we have created, or a standard 500 error, the payload will be a json as a text
    //if so, parse the json to a usable format
    //note, this will work for 500 errors we did not create, which tend to be a bit ugly, if time permitted
    //it would be nice to implment a form of checking if it was an error message we created and having a default 
    //unexpected error message.
    try{
    errdata = JSON.parse(action.payload);
    }
    //if it's a 400 error, the parse will fail, send through a servers are down message.
    catch(err){
      errdata = { message: "Connection error, servers may be down", debugMessage : action.payload}
    }
    return {...state, 
            errorMessage : errdata.message,
            errorDebug: errdata.debugMessage};

    case types.CLEAR_ERRORS:
      //clears errors so any latent errors aren't accentially shown
      //ie: scrolling can cause an error if you run out of products, this can safely be ignored, no need to show this to the user
      return {...state, 
              errorMessage : "",
              errorDebug: ""};

    //should be used for actions where a component may need to wait to see if an error is thrown, ie: post or put requests
    //should be called when an action has been compleated with no errros
    case types.STOP_WAITING:
      return{...state,
            waitForError: false}
    //should be called once a component has finished it's actions dependant on a back end error not being thrown. wait for error should always be true
    // except when a component is waiting for a non-error responce from the server.
    case types.START_WAITING:
      return{...state,
            waitForError: true}

    default:
      return state;
  }
}

