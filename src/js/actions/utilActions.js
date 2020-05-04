import {showLoader, hideLoader} from './loaderActions'

/**
 * Get an async action that show and hide the loader, and handle errors.
 * This can be dispatched with the use of the thunk middleware.
 *
 * @param {function} asyncCall - a function that performs an async action
 *     and returns a Promise
 * @param {str} errorMessage - an error message that should help the user
 *    know where the error occured
 */
export const asyncAction = (asyncCall, errorMessage) => {
  return (dispatch, getState) => {
    /*dispatch(showLoader())*/
    return asyncCall(dispatch, getState)
      .then(/*() => dispatch(hideLoader())*/) //This will hide the loader only when promise is resolved
      .catch( error => {
        console.log(errorMessage)
        console.log(error)
        throw error; //Throw it again, since we cannot do much for the user to handle the error here!
      })
      //.finally(() => dispatch(hideLoader())) /* This is executed wether or not the promise is resolved.*/
  }
}

/**
 * Perform something async. Handles errors and the loader (hide/show).
 * This will often be called inside an async action.
 *
 * @param {funciton} dispatch - the dispatch funciton for the redux store
 * @param {function} getState - the getState function for the redux store
 * @param {function} asyncCall - a function that performs an async action
 *     and returns a Promise
 * @param {str} errorMessage - an error message that should help the user
 *    know where the error occured
 */
export const performAsync = (dispatch, getState, asyncCall, errorMessage) => {
  dispatch(showLoader())
  return asyncCall(dispatch, getState)
    .then(() => dispatch(hideLoader())) //This will hide the loader only when promise is resolved
    .catch( error => {
      console.log(errorMessage)
      console.log(error)
    })
    //.finally(() => dispatch(hideLoader()))
}
