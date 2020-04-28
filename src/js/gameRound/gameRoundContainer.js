import {connect} from 'react-redux'
import GameRoundComponent from './gameRoundComponent'
import {answerQuestion, startNextRound} from '../actions/gameSessionActions'
import {
  getPlayerAnswers,
  getGameInfo,
  getRoundCount,
  getAnswerOptions,
  getQuestion,
  getRoundReason,
  allPlayersReady,
  allPlayersHaveAnswered
} from '../selectors/gameSessionSelectors'

const mapStateToProps = (state, ownProps) => ({
  gameInfo: getGameInfo(state),
  answers: getPlayerAnswers(state),
  showResults: allPlayersHaveAnswered(state),
  round: getRoundCount(state),
  answerOptions: getAnswerOptions(state),
  question: getQuestion(state),
  nextDisabled: !allPlayersReady(state),
  roundReason: getRoundReason(state)
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    answerCallback: (answerOption, correct) => {
      dispatch(answerQuestion(answerOption, correct))
    },
    next: [
      "Next Question",
      () => dispatch(startNextRound())
    ]
  }
}

// Container for the game round component
const GameRoundContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(GameRoundComponent)

export default GameRoundContainer
