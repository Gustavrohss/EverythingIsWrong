import gameSessionReducer from './gameSessionReducer'
import loaderReducer from './loaderReducer'

const rootReducer = (state = {}, action) => ({
  gameSession: gameSessionReducer(state.gameSession, action),
  loader: loaderReducer(state.loader, action)
})

export default rootReducer
