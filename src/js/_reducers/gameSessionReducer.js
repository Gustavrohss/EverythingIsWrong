import {SET_USERNAME, CREATE_LOBBY_LOCAL} from '../actions/gameSessionActions'

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

const gameSessionReducer2 = function(state = {
    lobbyID: null,
    settings: null,
    players: null
}, action) {
    switch(action.type) {

        case CREATE_LOBBY_LOCAL:
            const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            let newLobbyId = ""
            for (let i = 0; i < 4; i++) { newLobbyId += CHARS.charAt(Math.floor(Math.random() * CHARS.length)) }

            return Object.assign(state, {
                lobbyID: newLobbyId,
                settings: {
                    gameType: 0
                },
                gameInfo: {
                    round: 0
                },
                players: {
                    host: {
                        hostName: action.hostName,
                        score: 0
                    }
                }
            })

        default:
            return state
    }
}

export default gameSessionReducer2
