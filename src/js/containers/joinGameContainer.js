import {connect} from 'react-redux'
import JoinGameComponent from '../components/joinGameComponent'
import {joinLobby, setUsername} from '../actions/gameSessionActions'
import {getLoggedIn, getUsername} from '../selectors/gameSessionSelectors'
import {populateNavArray} from '../actions/utilActions'

const mapStateToProps = (state, ownProps) => ({
  loggedIn: getLoggedIn(state),
  name: getUsername(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  joinLobby: (lobbyID, name) => {
    dispatch(setUsername(name))
    return dispatch(joinLobby(lobbyID))
  },
  lobby: populateNavArray(ownProps.lobby, dispatch)
})

// Container for join game component
const JoinGameContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(JoinGameComponent)

export default JoinGameContainer
