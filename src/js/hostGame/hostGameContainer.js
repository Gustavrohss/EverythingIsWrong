import {connect} from 'react-redux'
import HostGameComponent from './hostGameComponent'
import {createLobby, setUsername, exitLobby} from '../actions/gameSessionActions'
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
      dispatch(exitLobby())
    },
    home: [
      homeLabel,
      () => {
          homeCallback()
          dispatch(exitLobby())
    }]
}}

const HostGameContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HostGameComponent)

export default HostGameContainer
