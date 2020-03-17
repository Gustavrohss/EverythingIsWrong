import {connect} from 'react-redux'
import GameResultsComponent from './gameResultsComponent'
import {leaveLobby, setStatus, STATUS} from '../actions/gameSessionActions'
import {getPlayerListSorted, allPlayersReady} from '../selectors/gameSessionSelectors'

const mapStateToProps = (state, ownProps) => ({
  scores: getPlayerListSorted(state),
  canContinue: allPlayersReady(state)
})

const mapDispatchToProps = (dispatch, ownProps) => {
  const [homeLabel, homeCallback] = ownProps.home
  const [gameLabel, gameCallback] = ownProps.game
  return {
    home: [
      homeLabel,
      () => {
          homeCallback()
          dispatch(leaveLobby())
    }],
    game: [
      gameLabel,
      () => {
          gameCallback()
          dispatch(setStatus(STATUS.answering))
      }]
  }
}

const GameResultContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(GameResultsComponent)

export default GameResultContainer
