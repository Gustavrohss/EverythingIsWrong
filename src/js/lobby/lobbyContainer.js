import {connect} from 'react-redux'
import LobbyComponent from './lobbyComponent'
import {getPlayerList, getLobbyID} from '../selectors/gameSessionSelectors'
import {get_images} from '../backend'
import {setStatus, STATUS} from '../actions/gameSessionActions'
import {startNextRound} from '../actions/gameSessionActions'


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
          dispatch(startNextRound()) // TODO: only the host should start the quiz and generate quesion...
      }]
  }
}

// Container for lobby component
const LobbyContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LobbyComponent)

export default LobbyContainer
