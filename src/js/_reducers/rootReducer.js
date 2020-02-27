import userReducer from './userReducer'

const rootReducer = (state = {}, action) => ({
  user: userReducer(state.user, action)
})

export default rootReducer
