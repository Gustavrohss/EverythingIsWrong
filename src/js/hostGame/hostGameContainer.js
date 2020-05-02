import {connect} from 'react-redux'
import HostGameComponent from './hostGameComponent'
import {createLobby, setUsername, leaveLobby, setSettings} from '../actions/gameSessionActions'

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = (dispatch, ownProps) => {
  const [homeLabel, homeCallback] = ownProps.home
  return {
    createLobby: (name, settings) => {
      dispatch(setUsername(name))
      dispatch(setSettings(settings))
      return dispatch(createLobby())
      //return new Promise((resolve, rejection) =>)
    },
    home: [
      homeLabel,
      () => {
          // Composed function, navigation callback and stop listening to database changes
          homeCallback()
          dispatch(leaveLobby())
    }]
}}

// Container for host game component
const HostGameContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HostGameComponent)

export default HostGameContainer
