import {HIDE_LOADER, SHOW_LOADER} from '../actions/loaderActions'

/**
 * Reducer handling loads in the app. Is something loading or not?
 */
const loaderReducer = function(state = {
  isLoading: false
}, action) {
  switch (action.type) {
    case HIDE_LOADER:
      return Object.assign({}, state, {
        isLoading: false
      })
    case SHOW_LOADER:
      return Object.assign({}, state, {
        isLoading: true
      })
    default:
      return state
  }
}

export default loaderReducer
