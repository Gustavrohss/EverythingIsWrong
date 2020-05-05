import WelcomeComponent from './welcomeComponent'
import {connect} from 'react-redux'
import {getLoggedIn} from '../selectors/gameSessionSelectors'

const mapStateToProps = (state, ownProps) => ({
    loggedIn: getLoggedIn(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({

})

// Container for welcome page component
const WelcomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(WelcomeComponent)

export default WelcomeContainer