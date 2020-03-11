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

/**
 * All possible actions regarding the gameSession part of the state
 */

/* ------------------ normal actions ------------------ */

// Update the username of this player
export const SET_USERNAME = "SET_USERNAME";

export const setUsername = function (newName) {
    return {
        type: SET_USERNAME,
        newName
    }
}

// Init a new game session, with `lobby` and `playerID` from the database
export const INIT_GAME_SESSION = "INIT_GAME_SESSION"

export const initGameSession = (playerID, lobby) => {
  return {
    type: INIT_GAME_SESSION,
    playerID,
    lobby
  }
}

// Reset all elements in the gameSession-state but the username of the player
// Reset element means assigning `null`
export const RESET_GAME_SESSION = "RESET_GAME_SESSION"

export const resetGameSession = () => {
  return {
    type: RESET_GAME_SESSION
  }
}

// Assign a new value to the `players` value in the state
export const SET_PLAYERS = "SET_PLAYERS"

export const setPlayers = (newPlayers) => {
  return {
    type: SET_PLAYERS,
    newPlayers
  }
}

// Assign a new value to the `playerID` value in the state
export const SET_PLAYER_ID = "SET_PLAYER_ID"

export const setPlayerID = (newID) => {
  return {
    type: SET_PLAYER_ID,
    newID
  }
}

// Assign a new value to the `gameInfo` value in the state
export const SET_GAME_INFO = "SET_GAME_INFO"

export const setGameInfo = (newGameInfo) => {
  return {
    type: SET_GAME_INFO,
    newGameInfo
  }
}

// Assign a new value to the `lobbyID` value in the state
export const SET_LOBBY_ID = "SET_LOBBY_ID"

export const setLobbyID = (newID) => {
  return {
    type: SET_LOBBY_ID,
    newID
  }
}

// Assign a new value to the `lobbyListeners` value in the state
export const SET_LOBBY_LISTENERS = "SET_LOBBY_LISTENERS"

export const setLobbyListeners = (listeners) => {
  return {
    type: SET_LOBBY_LISTENERS,
    listeners
  }
}

// Add or modify a player element with key `playerID` in the
// `players` value in the state.
export const MODIFY_PLAYER = "MODIFY_PLAYER"

export const modifyPlayer = (playerID, player) => {
  return {
    type: MODIFY_PLAYER,
    playerID,
    player
  }
}

/* ------------------ async actions ------------------ */

// Will create and join a new lobby in the database and add listeners to it
// in order to keep the state up to date with the database
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

// Join an already existing lobby in the database and add listeners to it
// in order to keep the state up to date with the database
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

// *helpfunction* - adds listeners to the lobby in the database
// and saves them in the state, in order to be able to turn them off later on
const setBackendListeners = (dispatch, getState) => {
  const listeners = setListener(
    getLobbyID(getState()),
    ({gameInfo}) => dispatch(setGameInfo(gameInfo)),
    ({playerID, player}) => dispatch(modifyPlayer(playerID, player))
  )
  dispatch(setLobbyListeners(listeners))
}

// Makes the player leave a lobby and unsubscribe to future changes to it
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
