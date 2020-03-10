import {fbDatabase} from '../firebaseConfig'

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

export const createLobby = function(hostName) {
    return (dispatch, getState) => {
        dispatch(createLobbyLocal(hostName))
        const lobby = getState().gameSession
        fbDatabase.ref("/lobbies/" + lobby.lobbyID).set(lobby)
    }
}