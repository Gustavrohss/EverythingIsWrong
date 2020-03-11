import {connect} from 'react-redux'
import GameRoundComponent from './gameRoundComponent'
import {increaseScore} from '../actions/gameSessionActions'

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = (dispatch, ownProps) => {
  const [resultsLabel, resultsCallback] = ownProps.results
  return {
    results: [
      resultsLabel,
      () => {
        resultsCallback()
        dispatch(increaseScore(1))
      }
    ]
  }
}

const GameRoundContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(GameRoundComponent)

export default GameRoundContainer
