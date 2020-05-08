import LoaderComponent from '../components/loaderComponent';
import {connect} from 'react-redux';
import {isLoading} from '../selectors/loaderSelectors';


const mapStateToProps = (state, ownProps) => ({
    showLoading : isLoading(state)
});

const loaderContainer = connect(
    mapStateToProps
)(LoaderComponent);

export default loaderContainer;




