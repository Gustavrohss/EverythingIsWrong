import {connect} from 'react-redux'
import GameRoundComponent from './gameRoundComponent'
import {answerQuestion} from '../actions/gameSessionActions'
import {getPlayerAnswers, getGameInfo} from '../selectors/gameSessionSelectors'

const mapStateToProps = (state, ownProps) => ({
  gameInfo: getGameInfo(state),
  answers: getPlayerAnswers(state)

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
