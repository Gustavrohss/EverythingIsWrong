import { createSelector } from 'reselect'

const username = state => state.gameSession.self.username
const playerID = state => state.gameSession.self.playerID
const settings = state => state.gameSession.settings
const lobbyID = state => state.gameSession.lobbyID
const players = state => state.gameSession.players

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

export const getPlayers = createSelector(
  [players],
  pList => pList 
)
