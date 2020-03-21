import {connect} from 'react-redux'
import GameRoundComponent from './gameRoundComponent'
import {answerQuestion} from '../actions/gameSessionActions'
import {
  getPlayerAnswers,
  getGameInfo,
  getShowAnswers,
  getRoundCount,
  getOptions,
  getQuestion
} from '../selectors/gameSessionSelectors'

const mapStateToProps = (state, ownProps) => ({
  gameInfo: getGameInfo(state),
  answers: getPlayerAnswers(state),
  showResults: getShowAnswers(state),
  round: getRoundCount(state),
  answerOptions: getOptions(state), // currently using debug data
  question: getQuestion(state)      // currently using debug data

})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    answerCallback: (answerOption, correct) => {
      dispatch(answerQuestion(answerOption, correct))
    }
  }
}

// Container for the game round component
const GameRoundContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(GameRoundComponent)

export default GameRoundContainer
