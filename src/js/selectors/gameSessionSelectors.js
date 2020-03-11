import { createSelector } from 'reselect'

const username = state => state.gameSession.self.username
const playerID = state => state.gameSession.self.playerID
const settings = state => state.gameSession.settings
const lobbyID = state => state.gameSession.lobbyID
const players = state => state.gameSession.players
const lobbyListeners = state => state.gameSession.lobbyListeners

export const getUsername = createSelector(
  [username],
  name => name
)

export const getPlayerID = createSelector(
  [playerID],
  id => id
)

export const getSettings = createSelector(
  [settings],
  s => s
)

export const getLobbyID = createSelector(
  [lobbyID],
  id => id
)

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

export const getPlayerListSorted = createSelector(
  [getPlayerList],
  players => {
    return players.sort((p1, p2) => p2.score - p1.score)
  }
)

export const getLobbyListeners = createSelector(
  [lobbyListeners],
  listeners => listeners
)
