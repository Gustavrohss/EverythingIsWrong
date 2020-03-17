import {connect} from 'react-redux'
import LobbyComponent from './lobbyComponent'
import {getPlayerList} from '../selectors/gameSessionSelectors'

const mapStateToProps = (state, ownProps) => ({
  players: getPlayerList(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({

})

// Container for lobby component
const LobbyContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LobbyComponent)

export default LobbyContainer
