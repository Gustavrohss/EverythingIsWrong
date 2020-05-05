import gameSessionReducer from './gameSessionReducer'
import loaderReducer from './loaderReducer'
import highScoresReducer from './highScoresReducer'

const rootReducer = (state = {}, action) => ({
  gameSession: gameSessionReducer(state.gameSession, action),
  loader: loaderReducer(state.loader, action),
  highScores: highScoresReducer(state.highScores, action)
})

export default rootReducer
