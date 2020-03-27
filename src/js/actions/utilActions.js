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
    dispatch(showLoader())
    return asyncCall(dispatch, getState)
      .catch( error => {
        console.log(errorMessage)
        console.log(error)
      })
      .finally(() => dispatch(hideLoader()))
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
    .catch( error => {
      console.log(errorMessage)
      console.log(error)
    })
    .finally(() => dispatch(hideLoader()))
}
