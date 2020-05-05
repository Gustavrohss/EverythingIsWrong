import {connect} from 'react-redux'
import ErrorComponent from './errorComponent'


const mapStateToProps = (state, ownProps) => ({
    error: ownProps.error
  })




const ErrorContainer = connect(
    mapStateToProps,
    //mapDispatchToProps
)(ErrorComponent)

export default ErrorContainer