import {connect} from 'react-redux'
import LoginComponent from '../components/loginComponent'
import {
    setUsername,
    setUserhash
} from '../actions/gameSessionActions'
import {populateNavArray} from '../actions/utilActions'

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    login: populateNavArray(["Log in / Create Account", ownProps.home[1]], dispatch),
    finalize_login_callback: (name, pass) => {
        dispatch(setUsername(name))
        dispatch(setUserhash(name, pass))
    }
})

// Container for login component
const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginComponent)

export default LoginContainer
