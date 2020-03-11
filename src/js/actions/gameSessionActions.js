import {
  createLobby as createLobbyBackend,
  joinLobby as joinLobbyBackend,
  setListener,
  deletePlayer as deletePlayerBackend} from '../backend'
import {
  getUsername,
  getSettings,
  getLobbyID,
  getUnsubscribe,
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

// Assign a new value to the `unsubscribe` value in the state
export const SET_UNSUBSCRIBE = "SET_UNSUBSCRIBE"

export const setUnsubscribe = (func) => {
  return {
    type: SET_UNSUBSCRIBE,
    unsubscribe: func
  }
}

// Add or modify the player element with key `playerID` in the
// `players` value in the state.
export const MODIFY_PLAYER = "MODIFY_PLAYER"

export const modifyPlayer = (playerID, player) => {
  return {
    type: MODIFY_PLAYER,
    playerID,
    player
  }
}

// Delete the player element with key `playerID` in the
// `players` value in the state
export const DELETE_PLAYER = "DELETE_PLAYER"

export const deletePlayer = (playerID) => {
  return {
    type: DELETE_PLAYER,
    playerID
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
  const modifyPlayerCallback = ({playerID, player}) => dispatch(modifyPlayer(playerID, player))
  const unsubscribe = setListener(
    getLobbyID(getState()),
    ({gameInfo}) => dispatch(setGameInfo(gameInfo)),
    modifyPlayerCallback,
    modifyPlayerCallback,
    ({playerID}) => dispatch(deletePlayer(playerID))
  )
  dispatch(setUnsubscribe(unsubscribe))
}

// Makes the player leave a lobby and unsubscribe to future changes to it
export const leaveLobby = () => {
  return (dispatch, getState) => {
    const state = getState()
    if (getLobbyID(state)) {
      dispatch(showLoader())
      const unsubscribe = getUnsubscribe(state)
      unsubscribe()
      return deletePlayerBackend(getLobbyID(state), getPlayerID(state))
        .then(() => dispatch(resetGameSession()))
        .catch(error => {
          console.log("Error when leaving lobby")
          console.log(error)
        })
        .finally(() => dispatch(hideLoader()))
    }
  }
}
