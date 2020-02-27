import {SET_USERNAME} from '../actions/userActions'

const userReducer = function(state = {
  name: "player"
}, action) {
  switch (action.type) {
    case SET_USERNAME:
      return action.newName === state.name ?
        state :
        Object.assign({}, state, {
            name: action.newName
        })
    default:
      return state
  }
}

export default userReducer
