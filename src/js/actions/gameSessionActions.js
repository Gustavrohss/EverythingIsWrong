import {
  createLobby as createLobbyBackend,
  joinLobby as joinLobbyBackend,
  setListener,
  deletePlayer as deletePlayerBackend,
  updateScore as updateScoreBackend,
  updateStatus as updateStatusBackend,
  answerQuestion as answerQuestionBackend,
  nextQuestion as nextQuestionBackend} from '../backend'
import {
  getUsername,
  getSettings,
  getLobbyID,
  getUnsubscribe,
  getPlayerID,
  getScore,
  getModelType, // debug data
  getImageType  // debug data
} from '../selectors/gameSessionSelectors'
import {asyncAction, performAsync} from './utilActions'
import makePrompt from '../questionGenerationMessaround' // DEBUG DATA!!

/**
 * All possible actions regarding the gameSession part of the state
 */

/* ------------------ good constants ------------------ */

 // All possible player statuses
 export const STATUS = {
   ready: "READY",
   lobby: "LOBBY",
   fetching: "FETCHING",
   answering: "ANSWERING"
 }

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

export const setPlayers = newPlayers => {
  return {
    type: SET_PLAYERS,
    newPlayers
  }
}

// Assign a new value to the `playerID` value in the state
export const SET_PLAYER_ID = "SET_PLAYER_ID"

export const setPlayerID = newID => {
  return {
    type: SET_PLAYER_ID,
    newID
  }
}

// Assign a new value to the `gameInfo` value in the state
export const SET_GAME_INFO = "SET_GAME_INFO"

export const setGameInfo = newGameInfo => {
  return {
    type: SET_GAME_INFO,
    newGameInfo
  }
}

// Assign a new value to the `lobbyID` value in the state
export const SET_LOBBY_ID = "SET_LOBBY_ID"

export const setLobbyID = newID => {
  return {
    type: SET_LOBBY_ID,
    newID
  }
}

// Assign a new value to the `unsubscribe` value in the state
export const SET_UNSUBSCRIBE = "SET_UNSUBSCRIBE"

export const setUnsubscribe = func => {
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

export const deletePlayer = playerID => {
  return {
    type: DELETE_PLAYER,
    playerID
  }
}


// Update the points of the player
// note: will only update `self.score`, not the `players`-list
export const SET_SCORE = "SET_SCORE"

export const setScore = newScore => {
  return {
    type: SET_SCORE,
    newScore
  }
}

// Update the showAnswers value for the player
// true - gamoComponent should show answers
// false - gameComponent should not show the answers
export const SET_SHOW_ANSWERS = "SET_SHOW_ANSWERS"

export const setShowAnswers = show => {
  return {
    type: SET_SHOW_ANSWERS,
    show
  }
}

/* ------------------ async actions ------------------ */

/**
 * Will create and join a new lobby in the database and add listeners to it
 * in order to keep the state up to date with the database
 */
export const createLobby = () => {
  return asyncAction(
      (dispatch, getState) => {
        return createLobbyBackend(getUsername(getState()), getSettings(getState()))
            .then(({playerID, lobby}) => {
                dispatch(initGameSession(playerID, lobby))
                setBackendListeners(dispatch, getState)
            })
      },
      "Error when creating lobby:"
  )
}

/**
 * Join an already existing lobby in the database and add listeners to it
 * in order to keep the state up to date with the database
 */
export const joinLobby = (lobbyID) => {
  return asyncAction(
    (dispatch, getState) => {
      return joinLobbyBackend(lobbyID, getUsername(getState()))
        .then(({playerID, lobby}) => {
            dispatch(initGameSession(playerID, lobby))
            setBackendListeners(dispatch, getState)
        })
    },
    "Error when joining lobby:"
  )
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

/**
 * Makes the player leave a lobby and unsubscribe to future changes to it
 */
export const leaveLobby = () => {
  return (dispatch, getState) => {
    if (getLobbyID(getState())) {
      performAsync(
        dispatch,
        getState,
        (dispatch, getState) => {
          const state = getState()
          const unsubscribe = getUnsubscribe(state)
          unsubscribe()
          return deletePlayerBackend(getLobbyID(state), getPlayerID(state))
            .then(() => dispatch(resetGameSession()))
        },
        "Error when leaving lobby"
      )
    }
  }
}

/**
 * Increase the points of the current player in state and database
 * The score will be increased with `dx` points
 */
export const increaseScore = dx => {
  return (dispatch, getState) => {
    const newScore = getScore(getState()) + dx
    performAsync(
      dispatch,
      getState,
      (dispatch, getState) => updateScoreBackend(
        getLobbyID(getState()),
        getPlayerID(getState()),
        newScore
      ),
      "Error when updating score:"
    )
  }
}

/**
 * Register that the player answers a question. Updates the score if answer
 * was correct and register the answer in the database.
 */
export const answerQuestion = (answerOption, correct) => {
  // TODO: should probably be able to check if answer is correct by
  //       only getting the `answerOption` and looking in `gameInfo`
  return (dispatch, getState) => {
    const state = getState()
    const newScore = correct ? getScore(state) + 1 : getScore(state)
    if (correct) dispatch(setScore(newScore))
    dispatch(setShowAnswers(true))
    performAsync(
      dispatch,
      getState,
      (dispatch, getState) => answerQuestionBackend(
        getLobbyID(getState()),
        getPlayerID(getState()),
        answerOption,
        newScore),
      "Error when answering question:"
    )
  }
}

export const startNextRound = () => {
  return asyncAction(
    (dispatch, getState) => {
      const state = getState()
      return nextQuestionBackend(
        getLobbyID(state),
        makePrompt(getModelType(state), getImageType(state))
      )
    },
    "Error in startNextRound:"
  )
}

/**
 * Update the status of the player in the database
 */
export const setStatus = newStatus => {
  return asyncAction(
    (dispatch, getState) => {
      const state = getState()
      return updateStatusBackend(getLobbyID(state), getPlayerID(state), newStatus)
    },
    "Error when updating status:"
  )
}
