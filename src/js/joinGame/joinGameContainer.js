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
      dispatch(joinLobby(lobbyID))
    },
    home: [
      homeLabel,
      () => {
          homeCallback()
          dispatch(leaveLobby())
    }]
}}

const JoinGameContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(JoinGameComponent)

export default JoinGameContainer
