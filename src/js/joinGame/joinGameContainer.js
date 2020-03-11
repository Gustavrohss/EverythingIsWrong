import {connect} from 'react-redux'
import JoinGameComponent from './joinGameComponent'
import {joinLobby, exitLobby, setUsername} from '../actions/gameSessionActions'

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
          dispatch(exitLobby())
    }]
}}

const JoinGameContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(JoinGameComponent)

export default JoinGameContainer
