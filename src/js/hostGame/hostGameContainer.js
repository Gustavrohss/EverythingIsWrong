import {connect} from 'react-redux'
import HostGameComponent from './hostGameComponent'
import {createLobby, setUsername, leaveLobby, setSettings} from '../actions/gameSessionActions'
import {destroyLobby, imgur_galleries} from '../backend'

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = (dispatch, ownProps) => {
  const [homeLabel, homeCallback] = ownProps.home
  return {
    createLobby: (name, settings) => {
      dispatch(setUsername(name))
      dispatch(setSettings(settings))
      dispatch(createLobby())
    },
    destroyLobby: lobbyID => {
      destroyLobby(lobbyID)
      dispatch(leaveLobby())
    },
    home: [
      homeLabel,
      () => {
          // Composed function, navigation callback and stop listening to database changes
          homeCallback()
          dispatch(leaveLobby())
    }],
    galleries: ["Choose gallery:", Object.entries(imgur_galleries)],
    //modes: [clarifai_models]
}}

// Container for host game component
const HostGameContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HostGameComponent)

export default HostGameContainer
