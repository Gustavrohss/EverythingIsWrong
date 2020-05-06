import {connect} from 'react-redux'
import LoginComponent from './loginComponent'
import {
    setUsername,
    setUserhash
} from '../actions/gameSessionActions'
import {populateNavArray} from '../actions/utilActions'

const mapStateToProps = (state, ownProps) => ({
    login: ["Log in / Create Account", ownProps.home[1]]
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    home: populateNavArray(ownProps.home, dispatch),
    finalize_login_callback: (name, pass) => {
        dispatch(setUsername(name))
        dispatch(setUserhash(name, pass))
    }
})

const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginComponent)

export default LoginContainer
