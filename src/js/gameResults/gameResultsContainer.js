import {connect} from 'react-redux'
import GameResultsComponent from './gameResultsComponent'
import {leaveLobby} from '../actions/gameSessionActions'
import {getPlayerListSorted} from '../selectors/gameSessionSelectors'

const mapStateToProps = (state, ownProps) => ({
  scores: getPlayerListSorted(state)
})

const mapDispatchToProps = (dispatch, ownProps) => {
  const [homeLabel, homeCallback] = ownProps.home
  return {
    home: [
      homeLabel,
      () => {
          // Composed function to use callback and also stop listening to database events
          homeCallback()
          dispatch(leaveLobby())
    }]
  }
}

// Container for game results component
const GameResultContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(GameResultsComponent)

export default GameResultContainer
