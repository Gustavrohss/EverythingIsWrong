import {connect} from 'react-redux'
import JoinGameComponent from './joinGameComponent'
import {joinLobby, setUsername} from '../actions/gameSessionActions'

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = (dispatch, ownProps) => ({
    joinLobby: (lobbyID, name) => {
      dispatch(setUsername(name))
      dispatch(joinLobby(lobbyID))
    }
})

const JoinGameContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(JoinGameComponent)

export default JoinGameContainer
