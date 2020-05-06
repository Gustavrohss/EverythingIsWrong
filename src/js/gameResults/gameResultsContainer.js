import {connect} from 'react-redux'
import GameResultsComponent from './gameResultsComponent'
import {leaveLobby} from '../actions/gameSessionActions'
import {populateNavArray} from '../actions/utilActions'
import {getPlayerListSorted} from '../selectors/gameSessionSelectors'

const mapStateToProps = (state, ownProps) => ({
  scores: getPlayerListSorted(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  home: populateNavArray(ownProps.home, dispatch, () => {
    dispatch(leaveLobby()) // stop listening to database events
  })
})

// Container for game results component
const GameResultContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(GameResultsComponent)

export default GameResultContainer
