import {connect} from 'react-redux'
import JoinGameComponent from './joinGameComponent'
import {joinLobby, leaveLobby, setUsername} from '../actions/gameSessionActions'

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = (dispatch, ownProps) => {
  const [homeLabel, homeCallback] = ownProps.home
  return {
    joinLobby: (lobbyID, name) => {
      dispatch(setUsername(name))
      return dispatch(joinLobby(lobbyID))
    },
    home: [
      homeLabel,
      // Composed function, navigation callback and stop listening to database changes
      () => {
          homeCallback()
          dispatch(leaveLobby())
    }]
}}

// Container for join game component
const JoinGameContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(JoinGameComponent)

export default JoinGameContainer
