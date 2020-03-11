import {connect} from 'react-redux'
import HostGameComponent from './hostGameComponent'
import {createLobby, setUsername, leaveLobby} from '../actions/gameSessionActions'
import {destroyLobby} from '../backend'

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = (dispatch, ownProps) => {
  const [homeLabel, homeCallback] = ownProps.home
  return {
    createLobby: name => {
      dispatch(setUsername(name))
      dispatch(createLobby())
    },
    destroyLobby: lobbyID => {
      destroyLobby(lobbyID)
      dispatch(leaveLobby())
    },
    home: [
      homeLabel,
      () => {
          homeCallback()
          dispatch(leaveLobby())
    }]
}}

const HostGameContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HostGameComponent)

export default HostGameContainer
