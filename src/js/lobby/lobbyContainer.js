import {connect} from 'react-redux'
import LobbyComponent from './lobbyComponent'
import {getPlayerList, getLobbyID, isHost} from '../selectors/gameSessionSelectors'
import {startGameSession} from '../actions/gameSessionActions'

const mapStateToProps = (state, ownProps) => ({
  players: getPlayerList(state),
  lobbyID: getLobbyID(state),
  isHost: isHost(state)
})

const mapDispatchToProps = (dispatch, ownProps) => {
  const [gameLabel, gamePath] = ownProps.game
  return {
    game: [gameLabel, () => {
      dispatch(startGameSession()) // TODO: only the host should start the quiz and generate quesion...
    }]
  }
}

// Container for lobby component
const LobbyContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LobbyComponent)

export default LobbyContainer
