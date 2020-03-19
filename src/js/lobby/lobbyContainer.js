import {connect} from 'react-redux'
import LobbyComponent from './lobbyComponent'
import {getPlayerList, getLobbyID} from '../selectors/gameSessionSelectors'
import {get_images} from '../backend'

const mapStateToProps = (state, ownProps) => ({
  players: getPlayerList(state),
  lobbyID: getLobbyID(state)
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    get_images: (subreddit, num_images) => {
      get_images(subreddit, num_images)
    }
  }
}

// Container for lobby component
const LobbyContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LobbyComponent)

export default LobbyContainer
