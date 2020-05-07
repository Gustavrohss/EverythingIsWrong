import {connect} from 'react-redux'
import GameResultsComponent from './gameResultsComponent'
import {getPlayerListSorted} from '../selectors/gameSessionSelectors'

const mapStateToProps = (state, ownProps) => ({
  scores: getPlayerListSorted(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  
})

// Container for game results component
const GameResultContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(GameResultsComponent)

export default GameResultContainer
