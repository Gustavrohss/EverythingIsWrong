import {connect} from 'react-redux'
import GameRoundComponent from './gameRoundComponent'
import {answerQuestion, startNextRound} from '../actions/gameSessionActions'
import {
  getPlayerAnswers,
  getGameInfo,
  getShowAnswers,
  getRoundCount,
  getOptions,
  getQuestion,
  allPlayersReady
} from '../selectors/gameSessionSelectors'

const mapStateToProps = (state, ownProps) => ({
  gameInfo: getGameInfo(state),
  answers: getPlayerAnswers(state),
  showResults: getShowAnswers(state),
  round: getRoundCount(state),
  answerOptions: getOptions(state), // currently using debug data
  question: getQuestion(state),
  nextDisabled: !allPlayersReady(state)
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
