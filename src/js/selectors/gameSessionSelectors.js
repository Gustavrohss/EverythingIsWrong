import { createSelector } from 'reselect'
import {STATUS} from '../actions/gameSessionActions'
import {generatePromptAndScores} from "../gameRoundGen"

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
const score = state => state.gameSession.self.score
const settings = state => state.gameSession.settings
const lobbyID = state => state.gameSession.lobbyID
const players = state => state.gameSession.players
const unsubscribe = state => state.gameSession.unsubscribe
const gameInfo = state => state.gameSession.gameInfo
const showAnswers = state => state.gameSession.showAnswers


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

// Check if the player is the host of the current game
export const isHost = createSelector(
  [playerID],
  id => id === "host"
)

// Check if the player have the status "answering" or not.
export const isAnswering = createSelector(
  [players, playerID],
  (playersObj, id) => playersObj[id].status === STATUS.answering
)

// Chech if the answers should be showed in the game component or not
export const getShowAnswers = createSelector(
  [showAnswers],
  show => show
)

// Get the score of the player in the current game
export const getScore = createSelector(
  [score],
  score => score
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

// Get the gameInfo object
export const getGameInfo = createSelector(
  [gameInfo],
  info => info
)

export const getRoundInfo = createSelector(
  [gameInfo],
  infoObj => infoObj ? infoObj.roundInfo : {}
)


// Get the number of the current game round
export const getRoundCount = createSelector(
  [gameInfo],
  infoObj => infoObj ? infoObj.round : undefined
)

export const getQuestion = createSelector(
  [getRoundInfo],
  infoObj => infoObj ? infoObj.promptString : ""
)

export const getAnswerOptions = createSelector(
  [getRoundInfo],
  infoObj => infoObj ? infoObj.outputs??[] : []
)

// Get a list of all the players. Each player is represented as an
// objet on the format: {playerID, name, score, status, answerOption}
export const getPlayerList = createSelector(
  [players],
  playersObj => {
    return playersObj ?
      Object.keys(playersObj)
        .map(pID => ({
          playerID: pID,
          name: playersObj[pID].name,
          score: playersObj[pID].score,
          status: playersObj[pID].status,
          answerOption: playersObj[pID].answerOption
        })) : []
  }
)

// Get a list of all the players sorted with highest score first.
// Each player is represented as an objet on the format:
// {playerID, name, score, status, answerOption}
export const getPlayerListSorted = createSelector(
  [getPlayerList],
  players => {
    return players.sort((p1, p2) => p2.score - p1.score)
  }
)

// Check if all players in the lobby has status "READY"
// If 0 players in lobby, this returns false
export const allPlayersReady = createSelector(
  [getPlayerList],
  players => players.reduce(
    (allReady, player) => (allReady && player.status === STATUS.ready),
    players.length > 0 // We want to return false if length = 0
  )
)

/**
 * Get a list on the form [answered0, answered1, answered2] where answeredX is a
 * list containing all players that have chosen the answer option X during
 * this game round. The players are represented as objects on the form:
 * {playerID, name, score, status, answerOption}
 */
export const getPlayerAnswers = createSelector(
  [getPlayerList],
  players => players
    .filter(player => player.status === STATUS.ready && player.answerOption > -1)
    .reduce(
      (answers, player) => {
        answers[player.answerOption].push(player)
        return answers
      },
      [[],[],[]]
    )
)

// Get the unsubscribe-function which will unsubscribe to changes
// in the current lobby if called.
export const getUnsubscribe = createSelector(
  [unsubscribe],
  func => func
)


/* --------------- testData --------------- */

// Info about a game round
export const getModelType = state => "MODEL_FOOD"
export const getImageType = state => "r/bears"
export const getImages = state =>  [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Orso_bruno_marsicano.jpg/1200px-Orso_bruno_marsicano.jpg",
  "https://www.nps.gov/glba/learn/nature/images/2Bear_2.jpg",
  "https://3c1703fe8d.site.internapcdn.net/newman/gfx/news/hires/2017/yosemitetrac.jpg"
]

export const getModelOutputs = state => {
  return [
    {
      outputs: [{
        data: {
          concepts: [
            {name: "lemon", value: 1},
            {name: "coffee", value: 0},
            {name: "candies", value: 0},
            {name: "olive oil", value: 0},
          ]
        }
      }]
    },
    {
      outputs: [{
        data: {
          concepts: [
            {name: "salmon", value: -1},
            {name: "wheat", value: 0},
            {name: "yeet", value: 0},
            {name: "banana", value: 0},
          ]
        }
      }]
    },
    {
      outputs: [{
        data: {
          concepts: [
            {name: "meat", value: 0},
            {name: "cheese", value: 0},
            {name: "fruit basket", value: 0},
            {name: "milk", value: 0},
          ]
        }
      }]
    },
  ]
}

/*
export const getOptions = state => {
  return generatePromptAndScores({
    modelType: "MODEL_FOOD",
    imageType: "r/bears",
    modelOutputs: [
      {
        outputs: [{
          data: {
            concepts: [
              {name: "lemon", value: 0},
              {name: "coffee", value: 0},
              {name: "candies", value: 0},
              {name: "olive oil", value: 0},
            ]
          }
        }]
      },
      {
        outputs: [{
          data: {
            concepts: [
              {name: "salmon", value: 0},
              {name: "wheat", value: 0},
              {name: "yeet", value: 0},
              {name: "banana", value: 0},
            ]
          }
        }]
      },
      {
        outputs: [{
          data: {
            concepts: [
              {name: "meat", value: 0},
              {name: "cheese", value: 0},
              {name: "fruit basket", value: 0},
              {name: "milk", value: 0},
            ]
          }
        }]
      },
    ],
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Orso_bruno_marsicano.jpg/1200px-Orso_bruno_marsicano.jpg",
      "https://www.nps.gov/glba/learn/nature/images/2Bear_2.jpg",
      "https://3c1703fe8d.site.internapcdn.net/newman/gfx/news/hires/2017/yosemitetrac.jpg"
    ]
  })
}
*/
