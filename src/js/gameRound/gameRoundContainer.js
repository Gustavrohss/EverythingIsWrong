import {connect} from 'react-redux'
import GameRoundComponent from './gameRoundComponent'
import {increaseScore, setStatus, STATUS} from '../actions/gameSessionActions'

const mapStateToProps = (state, ownProps) => ({
  gameInfo: state.gameSession.gameInfo,
  players: state.gameSession.players
})

const mapDispatchToProps = (dispatch, ownProps) => {
  const [resultsLabel, resultsCallback] = ownProps.results
  return {
    results: [
      resultsLabel,
      () => {
        // Composed function to use callback and (placeholder) increase player score on database
        // Place holder
        resultsCallback()
        dispatch(increaseScore(1))
        dispatch(setStatus(STATUS.ready))
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
