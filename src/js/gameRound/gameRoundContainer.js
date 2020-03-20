import {connect} from 'react-redux'
import GameRoundComponent from './gameRoundComponent'
import {answerQuestion} from '../actions/gameSessionActions'

const mapStateToProps = (state, ownProps) => ({
  gameInfo: state.gameSession.gameInfo,
  players: state.gameSession.players
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
