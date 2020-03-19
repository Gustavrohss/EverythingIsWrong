import {connect} from 'react-redux'
import highScoreComponent from './highScoresComponent'

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = (dispatch, ownProps) => ({

})

// Container for high scores component
const HighScoreContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(highScoreComponent)

export default HighScoreContainer