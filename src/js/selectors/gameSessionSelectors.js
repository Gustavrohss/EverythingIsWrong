import { createSelector } from 'reselect'

/**
 * All getters that should be used when reading the gameSession state in
 * the redux store.
 *
 * Selectors created by `createSelector` will keep their calculated value in
 * memory and will only update the return value whenever the specific part of
 * the state it depends on has been modified. ==> less recalculation and
 * rerendering. :)
 */

// Functions extracting the raw data from the state
const username = state => state.gameSession.self.username
const playerID = state => state.gameSession.self.playerID
const settings = state => state.gameSession.settings
const lobbyID = state => state.gameSession.lobbyID
const players = state => state.gameSession.players
const unsubscribe = state => state.gameSession.unsubscribe


// Get the username to the player
export const getUsername = createSelector(
  [username],
  name => name
)

// Get the ID of the player in the current game
export const getPlayerID = createSelector(
  [playerID],
  id => id
)

// Get the settings of the current game
export const getSettings = createSelector(
  [settings],
  s => s
)

// Get the ID to the lobby which has been joined by the player
// `null` if player hasn't joined a lobby
export const getLobbyID = createSelector(
  [lobbyID],
  id => id
)

// Get a list of all the players. Each player is represented as an
// objet on the format: {playerID, name, score}
export const getPlayerList = createSelector(
  [players],
  playersObj => {
    return playersObj ?
    Object.keys(playersObj)
      .map(pID => ({
        playerID: pID,
        name: playersObj[pID].name,
        score: playersObj[pID].score
      })) : []
  }
)

// Get a list of all the players sorted with highest score first.
// Each player is represented as an objet on the format: {playerID, name, score}
export const getPlayerListSorted = createSelector(
  [getPlayerList],
  players => {
    return players.sort((p1, p2) => p2.score - p1.score)
  }
)

// Get the unsubscribe-function which will unsubscribe to changes
// in the current lobby if called.
export const getUnsubscribe = createSelector(
  [unsubscribe],
  func => func
)
