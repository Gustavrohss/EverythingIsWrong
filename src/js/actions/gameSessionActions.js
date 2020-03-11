import {
  createLobby as createLobbyBackend,
  joinLobby as joinLobbyBackend,
  setListener,
  stopListener,
  leaveLobby} from '../backend'
import {
  getUsername,
  getSettings,
  getLobbyID,
  getLobbyListeners,
  getPlayerID} from '../selectors/gameSessionSelectors'
import {showLoader, hideLoader} from './loaderActions'

export const SET_USERNAME = "SET_USERNAME";

export const setUsername = function (newName) {
    return {
        type: SET_USERNAME,
        newName
    }
}

export const INIT_GAME_SESSION = "INIT_GAME_SESSION"

export const initGameSession = (playerID, lobby) => {
  return {
    type: INIT_GAME_SESSION,
    playerID,
    lobby
  }
}

export const RESET_GAME_SESSION = "RESET_GAME_SESSION"

export const resetGameSession = () => {
  return {
    type: RESET_GAME_SESSION
  }
}

export const SET_PLAYERS = "SET_PLAYERS"

export const setPlayers = (newPlayers) => {
  return {
    type: SET_PLAYERS,
    newPlayers
  }
}

export const SET_PLAYER_ID = "SET_PLAYER_ID"

export const setPlayerID = (newID) => {
  return {
    type: SET_PLAYER_ID,
    newID
  }
}

export const SET_GAME_INFO = "SET_GAME_INFO"

export const setGameInfo = (newGameInfo) => {
  return {
    type: SET_GAME_INFO,
    newGameInfo
  }
}

export const SET_LOBBY_ID = "SET_LOBBY_ID"

export const setLobbyID = (newID) => {
  return {
    type: SET_LOBBY_ID,
    newID
  }
}

export const SET_LOBBY_LISTENERS = "SET_LOBBY_LISTENERS"

export const setLobbyListeners = (listeners) => {
  return {
    type: SET_LOBBY_LISTENERS,
    listeners
  }
}

export const MODIFY_PLAYER = "MODIFY_PLAYER"

export const modifyPlayer = (playerID, player) => {
  return {
    type: MODIFY_PLAYER,
    playerID,
    player
  }
}

export const createLobby = () => {
  return (dispatch, getState) => {
    dispatch(showLoader())
    createLobbyBackend(getUsername(getState()), getSettings(getState()))
        .then(({playerID, lobby}) => {
            dispatch(initGameSession(playerID, lobby))
            setBackendListeners(dispatch, getState)
        })
        .catch(error => {
          console.log("Error when creating lobby:")
          console.log(error)
        })
        .finally(() => dispatch(hideLoader()))
  }
}

export const joinLobby = (lobbyID) => {
  return (dispatch, getState) => {
    dispatch(showLoader())
    joinLobbyBackend(lobbyID, getUsername(getState()))
        .then(({playerID, lobby}) => {
            dispatch(initGameSession(playerID, lobby))
            setBackendListeners(dispatch, getState)
        })
        .catch(error => {
          console.log("Error when joining lobby:")
          console.log(error)
        })
        .finally(() => dispatch(hideLoader()))
  }
}

const setBackendListeners = (dispatch, getState) => {
  const listeners = setListener(
    getLobbyID(getState()),
    ({gameInfo}) => dispatch(setGameInfo(gameInfo)),
    ({playerID, player}) => dispatch(modifyPlayer(playerID, player))
  )
  dispatch(setLobbyListeners(listeners))
}

export const exitLobby = () => {
  return (dispatch, getState) => {
    const state = getState()
    if (getLobbyID(state)) {
      dispatch(showLoader())
      stopListener(getLobbyID(state), getLobbyListeners(state))
      return leaveLobby(getLobbyID(state), getPlayerID(state))
        .then(() => dispatch(resetGameSession()))
        .catch(error => {
          console.log("Error when leaving lobby")
          console.log(error)
        })
        .finally(() => dispatch(hideLoader()))
    }
  }
}
