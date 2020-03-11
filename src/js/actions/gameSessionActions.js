import {createLobby as createLobbyBackend, joinLobby as joinLobbyBackend} from '../backend'
import {getUsername, getSettings} from '../selectors/gameSessionSelectors'
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

export const createLobby = () => {
  return (dispatch, getState) => {
    dispatch(showLoader())
    createLobbyBackend(getUsername(getState()), getSettings(getState()))
        .then(({playerID, lobby}) => {
            dispatch(initGameSession(playerID, lobby))
            console.log(getState())
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
            console.log("pID: " + playerID + ", lobby:")
            console.log(lobby)
            dispatch(initGameSession(playerID, lobby))
            console.log(getState())
        })
        .catch(error => {
          console.log("Error when joining lobby:")
          console.log(error)
        })
        .finally(() => dispatch(hideLoader()))
  }
}
