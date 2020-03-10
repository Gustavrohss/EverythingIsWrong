import {connect} from 'react-redux'
import HostGameComponent from './hostGameComponent'
import {createLobby} from '../actions/gameSessionActions'

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = (dispatch, ownProps) => ({
    createLobby: text => dispatch(createLobby(text))
})

const HostGameContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HostGameComponent)

export default HostGameContainer