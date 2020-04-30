import {connect} from 'react-redux'
import WelcomeComponent from './welcomeComponent'
import {populateNavArray} from '../actions/utilActions'


const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = (dispatch, ownProps) => ({
  about: populateNavArray(ownProps.about, dispatch),
  highScores: populateNavArray(ownProps.highScores, dispatch),
  join: populateNavArray(ownProps.join, dispatch),
  host: populateNavArray(ownProps.host, dispatch)
})

// Container for welcome page component
const WelcomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(WelcomeComponent)

export default WelcomeContainer
