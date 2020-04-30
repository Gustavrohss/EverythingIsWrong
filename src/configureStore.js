import { createBrowserHistory } from 'history'
import { applyMiddleware, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import ReduxThunk from 'redux-thunk'
import createRootReducer from './js/_reducers/rootReducer'

/**
 * Configure the redux store in order to use the connected-react-router package
 * https://github.com/supasate/connected-react-router
 */

// The navigation history object (this instance must be connected to the router)
export const history = createBrowserHistory()

export default function configureStore(preloadedState) {
  const middlewares = [
    routerMiddleware(history), // for dispatching history actions
    ReduxThunk  // this is what allows us to dispatch functions rather than objects
  ]

  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    applyMiddleware(...middlewares)
  )

  return store
}
