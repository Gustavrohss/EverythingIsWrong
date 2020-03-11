import {
  SET_USERNAME,
  INIT_GAME_SESSION,
  SET_PLAYERS,
  SET_PLAYER_ID,
  SET_GAME_INFO,
  SET_LOBBY_ID,
  MODIFY_PLAYER,
  SET_LOBBY_LISTENERS,
  RESET_GAME_SESSION} from '../actions/gameSessionActions'

const gameSessionReducer = function(state = {
    lobbyID: null,
    players: null,
    settings: {
        gameType: 0
    },
    self: {
      playerID: null,
      username: null
    },
    gameInfo: null,
    lobbyListeners: null
}, action) {
    switch(action.type) {
        case SET_USERNAME:
            return action.newName === state.self.username ?
              state :
              Object.assign({}, state, {
                self: Object.assign({}, state.self, {
                  username: action.newName
                })})
        case INIT_GAME_SESSION:
            return Object.assign({}, state, {
              players: action.lobby.players,
              lobbyID: action.lobby.lobbyID,
              gameInfo: action.lobby.gameInfo,
              self: Object.assign({}, state.self, {
                playerID: action.playerID
              })
            })
        case RESET_GAME_SESSION:
            return Object.assign({}, state, {
              lobbyID: null,
              players: null,
              self: {
                playerID: null,
                username: state.self.username
              },
              gameInfo: null,
              lobbyListeners: null
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
        case SET_LOBBY_LISTENERS:
            return Object.assign({}, state, {
              lobbyListeners: action.listeners
            })
        default:
            return state
    }
}

export default gameSessionReducer
