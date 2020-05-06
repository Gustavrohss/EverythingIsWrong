import { createBrowserHistory } from 'history'
import { applyMiddleware, createStore } from 'redux'
import { push, routerMiddleware, LOCATION_CHANGE } from 'connected-react-router'
import ReduxThunk from 'redux-thunk'
import createRootReducer from './js/_reducers/rootReducer'
import { getInLobby } from './js/selectors/gameSessionSelectors'
import { didRedirect } from './js/actions/redirectActions'

/**
 * Configure the redux store in order to use the connected-react-router package
 * https://github.com/supasate/connected-react-router
 */

// The navigation history object (this instance must be connected to the router)
export const history = createBrowserHistory()

const inGamePaths = ["/lobby", "/game", "/results"]

// Restrict navigation
const redirectMiddleWare = store => next => action => {
  if (action.type === LOCATION_CHANGE) {
    //console.group("location change")
    const newPath = action.payload.location.pathname
    const inGame = getInLobby(store.getState())
    //console.log(`in game: ${inGame}`)
    //console.log(`new path: ${newPath}`)
    //console.log(`old path: ${getURL(store.getState())}`)

    // TODO: Add a check so that you cannot leave the game if you are in it!
    // You can check if the old path getURL(store.getState()) is from the game.
    /*
    if (inGame) {
      console.log("redirect 1")
      action = didRedirect("Navigating during a game will make you leave the game!")
    }
    */

    if (inGamePaths.includes(newPath) && !inGame) {
      console.log("redirected to home!")
      store.dispatch(push("/"))
      action = didRedirect(`Cannot navigate to '${newPath}' without being in a game`)
    }
    //console.groupEnd()
  }
  next(action)
}

export default function configureStore(preloadedState) {
  // TODO: add devTools ...

  const middlewares = [
    ReduxThunk,  // this is what allows us to dispatch functions rather than objects
    redirectMiddleWare,
    routerMiddleware(history) // for dispatching history actions
  ]

  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    applyMiddleware(...middlewares)
  )

  return store
}
