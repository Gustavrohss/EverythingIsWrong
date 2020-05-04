import {connect} from 'react-redux'
import HostGameComponent from './hostGameComponent'
import {createLobby, setUsername, leaveLobby, setSettings} from '../actions/gameSessionActions'
import {getLoggedIn} from '../selectors/gameSessionSelectors'

const mapStateToProps = (state, ownProps) => ({
  loggedIn: getLoggedIn(state)
})

const mapDispatchToProps = (dispatch, ownProps) => {
  const [homeLabel, homeCallback] = ownProps.home
  return {
    createLobby: (name, settings) => {
      dispatch(setUsername(name))
      dispatch(setSettings(settings))
      dispatch(createLobby())
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
