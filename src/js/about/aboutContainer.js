import AboutComponent from './aboutComponent'
import {connect} from 'react-redux'

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = (dispatch, ownProps) => ({

})

// Container for the about page
const AboutContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AboutComponent)

export default AboutContainer
