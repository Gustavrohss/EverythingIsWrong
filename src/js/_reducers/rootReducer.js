import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import gameSessionReducer from './gameSessionReducer'
import loaderReducer from './loaderReducer'
import redirectReducer from './redirectReducer'


const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  redirect: redirectReducer,
  gameSession: gameSessionReducer,
  loader: loaderReducer
})

export default createRootReducer
