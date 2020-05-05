import {connect} from 'react-redux'
import highScoreComponent from './highScoresComponent'
import {getAvailable, getHighScores} from '../selectors/highScoresSelectors'
import {getHighScores as getHighScoresAction} from '../actions/highScoresActions'

const mapStateToProps = (state, ownProps) => ({
    available: getAvailable(state),
    highScores: getHighScores(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    populate: () => dispatch(getHighScoresAction())
})

// Container for high scores component
const HighScoreContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(highScoreComponent)

export default HighScoreContainer