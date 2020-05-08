import {connect} from 'react-redux'
import ErrorComponent from '../components/errorComponent'


const mapStateToProps = (state, ownProps) => ({
    error: ownProps.error
  })




const ErrorContainer = connect(
    mapStateToProps,
    //mapDispatchToProps
)(ErrorComponent)

export default ErrorContainer