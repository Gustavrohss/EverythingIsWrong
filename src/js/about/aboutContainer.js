import {connect} from 'react-redux'
import AboutComponent from './aboutComponent'
import {populateNavArray} from '../actions/utilActions'

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = (dispatch, ownProps) => ({
  home: populateNavArray(ownProps.home, dispatch)
})

// Container for the about page
const AboutContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AboutComponent)

export default AboutContainer
