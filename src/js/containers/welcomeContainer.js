import {connect} from 'react-redux'
import WelcomeComponent from '../components/welcomeComponent'
import {populateNavArray, navBackToGame} from '../actions/utilActions'
import {getLoggedIn, getUsername, getInLobby} from '../selectors/gameSessionSelectors'
import {resetUserHash, leaveLobby} from '../actions/gameSessionActions'

const mapStateToProps = (state, ownProps) => ({
    loggedIn: getLoggedIn(state),
    name: getUsername(state),
    inGame: getInLobby(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  join: populateNavArray(ownProps.join, dispatch),
  host: populateNavArray(ownProps.host, dispatch),
  login: populateNavArray(ownProps.login, dispatch),
  quit: ["Quit Game", () => dispatch(leaveLobby())],
  rejoin: ["Rejoin Game", () => dispatch(navBackToGame())],
  signout: () => {
    dispatch(resetUserHash())
    /*dispatch(setUsername(name))
    dispatch(setUserhash(name, pass))*/
}
})

// Container for welcome page component
const WelcomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(WelcomeComponent)

export default WelcomeContainer
