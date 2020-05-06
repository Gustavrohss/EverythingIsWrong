import {connect} from 'react-redux'
import {push} from 'connected-react-router'
import GameRoundComponent from './gameRoundComponent'
import {answerQuestion, startNextRound, uploadHighscore} from '../actions/gameSessionActions'
import {populateNavArray} from '../actions/utilActions'
import {
  getPlayerAnswers,
  getGameInfo,
  getRoundCount,
  getAnswerOptions,
  getQuestion,
  getRoundReason,
  allPlayersReady,
  allPlayersHaveAnswered,
  getLoggedIn
} from '../selectors/gameSessionSelectors'
import {isLoading} from '../selectors/loaderSelectors'

const mapStateToProps = (state, ownProps) => ({
  gameInfo: getGameInfo(state),
  answers: getPlayerAnswers(state),
  showResults: allPlayersHaveAnswered(state),
  round: getRoundCount(state),
  answerOptions: getAnswerOptions(state),
  question: getQuestion(state),
  nextDisabled: !allPlayersReady(state),
  isLoading: isLoading(state),
  roundReason: getRoundReason(state),
  loggedIn: getLoggedIn(state)

})

const mapDispatchToProps = (dispatch, ownProps) => {
  const [resultsLabel, resultsPath] = ownProps.results
  return {
    answerCallback: (answerOption, correct) => {
      dispatch(answerQuestion(answerOption, correct))
    },
    next: [
      "Next Question",
      () => dispatch(startNextRound())
    ],
    results: [
      resultsLabel,
      (isLoggedIn) => {
        if (isLoggedIn) dispatch(uploadHighscore())
        dispatch(push(resultsPath))
      }
    ]
  }
}

// Container for the game round component
const GameRoundContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(GameRoundComponent)

export default GameRoundContainer
