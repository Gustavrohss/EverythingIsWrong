import {
  SET_USERNAME,
  SET_USERHASH,
  INIT_GAME_SESSION,
  SET_PLAYERS,
  SET_PLAYER_ID,
  SET_GAME_INFO,
  SET_LOBBY_ID,
  MODIFY_PLAYER,
  DELETE_PLAYER,
  SET_UNSUBSCRIBE,
  RESET_GAME_SESSION,
  SET_SCORE,
  SET_HAVE_ANSWERED,
  SET_SETTINGS
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
      score: 0,
      status: null,
      hash: null
    },
    gameInfo: null,
    haveAnswered: false,
    unsubscribe: () => {}
}, action) {
  
    switch(action.type) {

        case SET_USERNAME:
            return action.newName === state.self.username ?
              state :
              Object.assign({}, state, {
                self: Object.assign({}, state.self, {
                  username: action.newName
                })
              })

        case SET_USERHASH:
          // https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
          const hashCode = s => s.split('').reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0)
          return Object.assign({}, state, {
            self: Object.assign({}, state.self, {
              hash: hashCode(action.name + action.pass)
            })
          })

        case SET_SCORE:
            return Object.assign({}, state, {
              self: Object.assign({}, state.self, {
                score: action.newScore
              })
            })

        case SET_HAVE_ANSWERED:
            return Object.assign({}, state, {
              haveAnswered: action.answered
            })

        case INIT_GAME_SESSION:
            const player = action.lobby.players[action.playerID]
            return Object.assign({}, state, {
              players: action.lobby.players,
              lobbyID: action.lobby.lobbyID,
              gameInfo: action.lobby.gameInfo,
              self: Object.assign({}, state.self, {
                playerID: action.playerID,
                score: player.score
              }),
              settings: action.lobby.settings
            })

        case RESET_GAME_SESSION:
            return Object.assign({}, state, {
              lobbyID: null,
              players: null,
              self: {
                playerID: null,
                username: state.self.username,
                score: 0,
                status: null
              },
              gameInfo: null,
              haveAnswered: false,
              unsubscribe: () => {}
            })

        case SET_SETTINGS:
            return Object.assign({}, state, {
              settings: action.settings
            })

        case SET_PLAYERS:
            return Object.assign({}, state, {
              players: action.newPlayers
            })

        case SET_PLAYER_ID:
            return Object.assign({}, state, {
              self: Object.assign({}, state.self, {
                playerID: action.newID
              })
            })

        case SET_GAME_INFO:
            const updateObj = action.newGameInfo.round !== state.gameInfo.round ?
              {gameInfo: action.newGameInfo, haveAnswered: false} :
              {gameInfo: action.newGameInfo}
            return Object.assign({}, state, updateObj)

        case SET_LOBBY_ID:
            return Object.assign({}, state, {
              lobbyID: action.newID
            })

        case MODIFY_PLAYER:
            return Object.assign({}, state, {
              players: Object.assign({}, state.players, {
                [action.playerID]: action.player
              })
            })

        case DELETE_PLAYER:
            const newPlayers = Object.assign({}, state.players)
            delete newPlayers[action.playerID]
            return Object.assign({}, state, {
              players: newPlayers
            })

        case SET_UNSUBSCRIBE:
            return Object.assign({}, state, {
              unsubscribe: action.unsubscribe
            })

        default:
            return state
    }
}

export default gameSessionReducer
