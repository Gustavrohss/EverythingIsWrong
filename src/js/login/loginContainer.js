import {connect} from 'react-redux'
import LoginComponent from './loginComponent'
import {
    setUsername
} from '../actions/gameSessionActions'

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = (dispatch, ownProps) => ({

})

const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginComponent)

export default LoginContainer