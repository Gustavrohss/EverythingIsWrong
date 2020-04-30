import {connect} from 'react-redux'
import JoinGameComponent from './joinGameComponent'
import {joinLobby, setUsername} from '../actions/gameSessionActions'
import {populateNavArray} from '../actions/utilActions'

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = (dispatch, ownProps) => ({
  joinLobby: (lobbyID, name) => {
    dispatch(setUsername(name))
    dispatch(joinLobby(lobbyID))
  },
  home: populateNavArray(ownProps.home, dispatch),
  lobby: populateNavArray(ownProps.lobby, dispatch)
})

// Container for join game component
const JoinGameContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(JoinGameComponent)

export default JoinGameContainer
