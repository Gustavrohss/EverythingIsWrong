import {connect} from 'react-redux'
import LobbyComponent from './lobbyComponent'
import {getPlayerList, getLobbyID} from '../selectors/gameSessionSelectors'
import {startGameSession} from '../actions/gameSessionActions'

const mapStateToProps = (state, ownProps) => ({
  players: getPlayerList(state),
  lobbyID: getLobbyID(state)
})

const mapDispatchToProps = (dispatch, ownProps) => {
  const [gameLabel, gameCallback] = ownProps.game
  return {
    game: [
      gameLabel,
      () => {
          gameCallback()
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
