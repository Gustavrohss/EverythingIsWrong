import WelcomeComponent from './welcomeComponent'
import {connect} from 'react-redux'

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = (dispatch, ownProps) => ({

})

// Container for welcome page component
const WelcomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(WelcomeComponent)

export default WelcomeContainer