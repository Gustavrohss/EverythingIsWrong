import {connect} from 'react-redux'
import HighScoreComponent from '../components/highScoresComponent'
import {getHighScores} from '../selectors/highScoresSelectors'
import {isLoading} from '../selectors/loaderSelectors'
import {getHighScores as getHighScoresAction} from '../actions/highScoresActions'

const mapStateToProps = (state, ownProps) => ({
    isLoading: isLoading(state),
    highScores: getHighScores(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  getHighScores: () => dispatch(getHighScoresAction())
})

// Container for high scores component
const HighScoreContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HighScoreComponent)

export default HighScoreContainer
