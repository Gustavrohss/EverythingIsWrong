import {connect} from 'react-redux'
import LobbyComponent from './lobbyComponent'
import {setStatus, STATUS} from '../actions/gameSessionActions'
import {getPlayerList} from '../selectors/gameSessionSelectors'

const mapStateToProps = (state, ownProps) => ({
  players: getPlayerList(state)
})

const mapDispatchToProps = (dispatch, ownProps) => {
  const [gameLabel, gameCallback] = ownProps.game
  return {
    game: [
      gameLabel,
      () => {
          gameCallback()
          dispatch(setStatus(STATUS.answering))
      }]
  }
}

// Container for lobby component
const LobbyContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LobbyComponent)

export default LobbyContainer
