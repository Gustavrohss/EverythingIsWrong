import {fbDatabase} from '../firebaseConfig'
import {createLobby as createLobbyBackend} from '../backend'
import {getUsername, getSettings} from '../selectors/gameSessionSelectors'
import {showLoader, hideLoader} from './loaderActions'

export const SET_USERNAME = "SET_USERNAME";

export const setUsername = function (newName) {
    return {
        type: SET_USERNAME,
        newName
    }
}

export const CREATE_LOBBY_LOCAL = "CREATE_LOBBY_LOCAL"

export const createLobbyLocal = function(hostName) {
    return {
        type: CREATE_LOBBY_LOCAL,
        hostName
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

export const createLobby = (hostName) => {
  return (dispatch, getState) => {
    dispatch(showLoader())
    dispatch(setUsername(hostName))
    createLobbyBackend(getUsername(getState()), getSettings(getState()))
        .then( lobby => {
            dispatch(setPlayerID("host"))
            dispatch(setLobbyID(lobby.lobbyID))
            dispatch(setPlayers(lobby.players))
            dispatch(setGameInfo(lobby.gameInfo))
            dispatch(hideLoader())
            console.log(getState())
        })
        .catch(error => {
          console.log("Error when creating lobby:")
          console.log(error)
          dispatch(hideLoader())
        })
  }
}
