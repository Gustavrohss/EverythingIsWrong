import {connect} from 'react-redux'
import LobbyComponent from './lobbyComponent'
import {getPlayerList, getLobbyID} from '../selectors/gameSessionSelectors'

const mapStateToProps = (state, ownProps) => ({
  players: getPlayerList(state),
  lobbyID: getLobbyID(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({

})

const LobbyContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LobbyComponent)

export default LobbyContainer
