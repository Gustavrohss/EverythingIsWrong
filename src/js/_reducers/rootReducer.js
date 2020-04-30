import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import gameSessionReducer from './gameSessionReducer'
import loaderReducer from './loaderReducer'


const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  gameSession: gameSessionReducer,
  loader: loaderReducer
})

export default createRootReducer
