import {SET_USERNAME} from '../actions/gameSessionActions'

const gameSessionReducer = function(state = {
  username: "testPlayer",
  playerId: 0,
  connectionCode: "",
  quiz: {
    questions: []
  },
  settings: {}, // eg. time, number of questions
  participants: [] // list of all the participants (their name, id, score, answering status, etc.)
}, action) {
  switch (action.type) {
    case SET_USERNAME:
      return action.newName === state.username ?
        state :
        Object.assign({}, state, {
            username: action.newName
        })
    default:
      return state
  }
}

export default gameSessionReducer
