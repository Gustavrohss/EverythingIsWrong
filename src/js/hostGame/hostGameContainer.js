import {connect} from 'react-redux'
import HostGameComponent from './hostGameComponent'
import {createLobby, setUsername, setSettings} from '../actions/gameSessionActions'
import {populateNavArray} from '../actions/utilActions'

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = (dispatch, ownProps) => ({
  createLobby: (name, settings) => {
    dispatch(setUsername(name))
    dispatch(setSettings(settings))
    dispatch(createLobby())
  },
  home: populateNavArray(ownProps.home, dispatch),
  lobby: populateNavArray(ownProps.lobby, dispatch)
})

// Container for host game component
const HostGameContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HostGameComponent)

export default HostGameContainer
