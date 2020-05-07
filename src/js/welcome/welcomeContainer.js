import {connect} from 'react-redux'
import WelcomeComponent from './welcomeComponent'
import {populateNavArray} from '../actions/utilActions'
import {getLoggedIn, getUsername} from '../selectors/gameSessionSelectors'


const mapStateToProps = (state, ownProps) => ({
    loggedIn: getLoggedIn(state),
    name: getUsername(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  join: populateNavArray(ownProps.join, dispatch),
  host: populateNavArray(ownProps.host, dispatch),
  login: populateNavArray(ownProps.login, dispatch)
})

// Container for welcome page component
const WelcomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(WelcomeComponent)

export default WelcomeContainer
