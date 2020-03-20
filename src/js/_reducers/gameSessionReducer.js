import {
  SET_USERNAME,
  INIT_GAME_SESSION,
  SET_PLAYERS,
  SET_PLAYER_ID,
  SET_GAME_INFO,
  SET_LOBBY_ID,
  MODIFY_PLAYER,
  DELETE_PLAYER,
  SET_UNSUBSCRIBE,
  RESET_GAME_SESSION,
  SET_SCORE
} from '../actions/gameSessionActions'

/**
 * Reducer handling the gameSession part of the state and all actions to it
 */
const gameSessionReducer = function(state = {
    lobbyID: null,
    players: null,
    settings: {
        gameType: 0,
        questions: 2, // The number of questions in the session
    },
    self: {
      playerID: null,
      username: null,
      score: 0
    },
    gameInfo: null,
    unsubscribe: () => {}
}, action) {
    switch(action.type) {
        case SET_USERNAME:
            return action.newName === state.self.username ?
              state :
              Object.assign({}, state, {
                self: Object.assign({}, state.self, {
                  username: action.newName
                })})
        case SET_SCORE:
            return Object.assign({}, state, {
              self: Object.assign({}, state.self, {
                score: action.newScore
              })})
        case INIT_GAME_SESSION:
            return Object.assign({}, state, {
              players: action.lobby.players,
              lobbyID: action.lobby.lobbyID,
              gameInfo: action.lobby.gameInfo,
              self: Object.assign({}, state.self, {
                playerID: action.playerID,
                score: 0
              })
            })
        case RESET_GAME_SESSION:
            return Object.assign({}, state, {
              lobbyID: null,
              players: null,
              self: {
                playerID: null,
                username: state.self.username,
                score: 0
              },
              gameInfo: null,
              unsubscribe: () => {}
            })
        case SET_PLAYERS:
            return Object.assign({}, state, {players: action.newPlayers})
        case SET_PLAYER_ID:
            return Object.assign({}, state, {
              self: Object.assign({}, state.self, {playerID: action.newID})
            })
        case SET_GAME_INFO:
            return Object.assign({}, state, {gameInfo: action.newGameInfo})
        case SET_LOBBY_ID:
            return Object.assign({}, state, {lobbyID: action.newID})
        case MODIFY_PLAYER:
            return Object.assign({}, state, {
              players: Object.assign({}, state.players, {
                [action.playerID]: action.player
              })
            })
        case DELETE_PLAYER:
            const newPlayers = Object.assign({}, state.players)
            delete newPlayers[action.playerID]

            return Object.assign({}, state, {players: newPlayers})

        case SET_UNSUBSCRIBE:
            return Object.assign({}, state, {
              unsubscribe: action.unsubscribe
            })
        default:
            return state
    }
}

export default gameSessionReducer
